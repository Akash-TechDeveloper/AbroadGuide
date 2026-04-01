package com.abroadguide.service;

import com.abroadguide.dto.BudgetRequest;
import com.abroadguide.dto.BudgetResponse;
import com.abroadguide.exception.DuplicateResourceException;
import com.abroadguide.exception.ResourceNotFoundException;
import com.abroadguide.model.Budget;
import com.abroadguide.model.Student;
import com.abroadguide.repository.BudgetRepository;
import com.abroadguide.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedHashMap;
import java.util.Map;

@Service
public class BudgetService {

    @Autowired
    private BudgetRepository budgetRepository;

    @Autowired
    private StudentRepository studentRepository;

    // Default allocation percentages (when no custom values are provided)
    private static final double DEFAULT_TUITION_PCT = 0.35;
    private static final double DEFAULT_RENT_PCT = 0.25;
    private static final double DEFAULT_FOOD_PCT = 0.15;
    private static final double DEFAULT_TRANSPORT_PCT = 0.05;
    private static final double DEFAULT_UTILITIES_PCT = 0.05;
    private static final double DEFAULT_INSURANCE_PCT = 0.05;
    private static final double DEFAULT_MISC_PCT = 0.10;

    @Transactional
    public BudgetResponse createBudget(Long studentId, BudgetRequest request) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new ResourceNotFoundException("Student", "id", studentId));

        if (budgetRepository.existsByStudentId(studentId)) {
            throw new DuplicateResourceException("Budget already exists for this student");
        }

        Double total = request.getTotalBudget();

        Budget budget = Budget.builder()
                .student(student)
                .totalBudget(total)
                .currency(request.getCurrency() != null ? request.getCurrency() : "USD")
                .tuitionAllocation(resolveAllocation(request.getTuitionAllocation(), total, DEFAULT_TUITION_PCT))
                .rentAllocation(resolveAllocation(request.getRentAllocation(), total, DEFAULT_RENT_PCT))
                .foodAllocation(resolveAllocation(request.getFoodAllocation(), total, DEFAULT_FOOD_PCT))
                .transportAllocation(resolveAllocation(request.getTransportAllocation(), total, DEFAULT_TRANSPORT_PCT))
                .utilitiesAllocation(resolveAllocation(request.getUtilitiesAllocation(), total, DEFAULT_UTILITIES_PCT))
                .insuranceAllocation(resolveAllocation(request.getInsuranceAllocation(), total, DEFAULT_INSURANCE_PCT))
                .miscAllocation(resolveAllocation(request.getMiscAllocation(), total, DEFAULT_MISC_PCT))
                .notes(request.getNotes())
                .build();

        budget = budgetRepository.save(budget);
        return mapToResponse(budget);
    }

    public BudgetResponse getBudgetByStudentId(Long studentId) {
        Budget budget = budgetRepository.findByStudentId(studentId)
                .orElseThrow(() -> new ResourceNotFoundException("Budget", "studentId", studentId));
        return mapToResponse(budget);
    }

    public BudgetResponse getBudgetById(Long id) {
        Budget budget = budgetRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Budget", "id", id));
        return mapToResponse(budget);
    }

    @Transactional
    public BudgetResponse updateBudget(Long id, BudgetRequest request) {
        Budget budget = budgetRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Budget", "id", id));

        if (request.getTotalBudget() != null) budget.setTotalBudget(request.getTotalBudget());
        if (request.getCurrency() != null) budget.setCurrency(request.getCurrency());
        if (request.getTuitionAllocation() != null) budget.setTuitionAllocation(request.getTuitionAllocation());
        if (request.getRentAllocation() != null) budget.setRentAllocation(request.getRentAllocation());
        if (request.getFoodAllocation() != null) budget.setFoodAllocation(request.getFoodAllocation());
        if (request.getTransportAllocation() != null) budget.setTransportAllocation(request.getTransportAllocation());
        if (request.getUtilitiesAllocation() != null) budget.setUtilitiesAllocation(request.getUtilitiesAllocation());
        if (request.getInsuranceAllocation() != null) budget.setInsuranceAllocation(request.getInsuranceAllocation());
        if (request.getMiscAllocation() != null) budget.setMiscAllocation(request.getMiscAllocation());
        if (request.getNotes() != null) budget.setNotes(request.getNotes());

        budget = budgetRepository.save(budget);
        return mapToResponse(budget);
    }

    /**
     * Generate affordability suggestions based on the budget.
     */
    public Map<String, String> generateSuggestions(Long budgetId) {
        Budget budget = budgetRepository.findById(budgetId)
                .orElseThrow(() -> new ResourceNotFoundException("Budget", "id", budgetId));

        Map<String, String> suggestions = new LinkedHashMap<>();
        Double total = budget.getTotalBudget();

        if (total < 10000) {
            suggestions.put("overall", "Your budget is tight. Consider countries with lower tuition such as Germany, Norway, or Taiwan.");
            suggestions.put("accommodation", "Look into shared housing or university dormitories to reduce rent costs.");
            suggestions.put("food", "Cooking at home and using student meal plans can save 30-50% on food.");
        } else if (total < 30000) {
            suggestions.put("overall", "Your budget is moderate. Countries like Canada, Netherlands, and Australia offer good value.");
            suggestions.put("accommodation", "A mix of shared apartments near campus could balance cost and comfort.");
            suggestions.put("scholarships", "Apply for merit-based scholarships to supplement your budget.");
        } else {
            suggestions.put("overall", "Your budget is comfortable. You have access to top universities in the US, UK, and Switzerland.");
            suggestions.put("investment", "Consider setting aside 10% for emergency funds and travel.");
            suggestions.put("lifestyle", "You can afford on-campus housing and premium meal plans.");
        }

        Double totalAllocated = sumAllocations(budget);
        if (totalAllocated > total) {
            suggestions.put("warning", "Your allocations exceed your total budget by " +
                    String.format("%.2f", totalAllocated - total) + " " + budget.getCurrency() + ". Consider adjusting.");
        }

        return suggestions;
    }

    private Double resolveAllocation(Double customValue, Double total, double defaultPct) {
        return customValue != null ? customValue : Math.round(total * defaultPct * 100.0) / 100.0;
    }

    private Double sumAllocations(Budget b) {
        double sum = 0;
        if (b.getTuitionAllocation() != null) sum += b.getTuitionAllocation();
        if (b.getRentAllocation() != null) sum += b.getRentAllocation();
        if (b.getFoodAllocation() != null) sum += b.getFoodAllocation();
        if (b.getTransportAllocation() != null) sum += b.getTransportAllocation();
        if (b.getUtilitiesAllocation() != null) sum += b.getUtilitiesAllocation();
        if (b.getInsuranceAllocation() != null) sum += b.getInsuranceAllocation();
        if (b.getMiscAllocation() != null) sum += b.getMiscAllocation();
        return sum;
    }

    private BudgetResponse mapToResponse(Budget b) {
        Double totalAllocated = sumAllocations(b);
        Double remaining = b.getTotalBudget() - totalAllocated;

        return BudgetResponse.builder()
                .id(b.getId())
                .studentId(b.getStudent().getId())
                .studentName(b.getStudent().getFullName())
                .totalBudget(b.getTotalBudget())
                .currency(b.getCurrency())
                .tuitionAllocation(b.getTuitionAllocation())
                .rentAllocation(b.getRentAllocation())
                .foodAllocation(b.getFoodAllocation())
                .transportAllocation(b.getTransportAllocation())
                .utilitiesAllocation(b.getUtilitiesAllocation())
                .insuranceAllocation(b.getInsuranceAllocation())
                .miscAllocation(b.getMiscAllocation())
                .totalAllocated(totalAllocated)
                .remaining(remaining)
                .notes(b.getNotes())
                .createdAt(b.getCreatedAt())
                .updatedAt(b.getUpdatedAt())
                .build();
    }
}
