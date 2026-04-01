package com.abroadguide.service;

import com.abroadguide.dto.RecommendationMatch;
import com.abroadguide.dto.UniversityResponse;
import com.abroadguide.exception.ResourceNotFoundException;
import com.abroadguide.model.Student;
import com.abroadguide.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class RecommendationService {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private UniversityService universityService;

    public List<RecommendationMatch> getRecommendationsForStudent(Long studentId) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new ResourceNotFoundException("Student", "id", studentId));

        List<UniversityResponse> allUniversities = universityService.getAllUniversities();

        return allUniversities.stream()
                .map(uni -> calculateMatch(student, uni))
                .sorted(Comparator.comparing(RecommendationMatch::getMatchScore).reversed())
                .limit(10) // Return top 10 matches
                .collect(Collectors.toList());
    }

    private RecommendationMatch calculateMatch(Student student, UniversityResponse uni) {
        double score = 0.0;
        double maxScore = 0.0;
        List<String> matchedFactors = new ArrayList<>();
        List<String> missingFactors = new ArrayList<>();

        // 1. Budget Fit (Weight: 30)
         if (student.getTotalBudget() != null && uni.getEstimatedYearlyCost() != null) {
            maxScore += 30;
            if (student.getTotalBudget() >= uni.getEstimatedYearlyCost()) {
                score += 30;
                matchedFactors.add("Within budget (" + String.format("$%.0f", uni.getEstimatedYearlyCost()) + "/yr)");
            } else if (student.getTotalBudget() >= uni.getEstimatedYearlyCost() * 0.8) {
                // If within 20% of budget
                score += 15;
                matchedFactors.add("Slightly above budget, but manageable with part-time work or small scholarship");
            } else {
                missingFactors.add("Exceeds current budget. Requires significant financial aid.");
            }
        }

        // 2. Academic Fit & Acceptance Probability (Weight: 30)
        double acceptanceProb = calculateAcceptanceProbability(student, uni);
        if (acceptanceProb > 0) {
            maxScore += 30;
            if (acceptanceProb >= 70) {
                score += 30;
                matchedFactors.add("Strong academic profile for this university (Acceptance Prob: " + Math.round(acceptanceProb) + "%)");
            } else if (acceptanceProb >= 40) {
                score += 15;
                matchedFactors.add("Target school (Acceptance Prob: " + Math.round(acceptanceProb) + "%)");
            } else {
                score += 5;
                missingFactors.add("Reach school (Acceptance Prob: " + Math.round(acceptanceProb) + "%)");
            }
        }

        // 3. Location Preference (Weight: 20)
        if (student.getPreferredCountry() != null) {
            maxScore += 20;
            if (student.getPreferredCountry().equalsIgnoreCase(uni.getCountry())) {
                score += 20;
                matchedFactors.add("Matches preferred country (" + uni.getCountry() + ")");
            } else {
                missingFactors.add("Different country than preferred (" + uni.getCountry() + ")");
            }
        }

        // 4. Program / Language Fit (Weight: 20)
        if (student.getPreferredLanguage() != null && uni.getLanguageOfInstruction() != null) {
            maxScore += 20;
            if (uni.getLanguageOfInstruction().equalsIgnoreCase(student.getPreferredLanguage())) {
                score += 20;
                matchedFactors.add("Matches preferred medium of instruction (" + uni.getLanguageOfInstruction() + ")");
            } else {
                missingFactors.add("Instruction language is " + uni.getLanguageOfInstruction());
            }
        }

        // Final Score percentage
        double finalScorePct = (maxScore > 0) ? (score / maxScore) * 100.0 : 50.0; // Default 50% if no data

        // Financial Aid opportunities mock text
        String financialAid = "";
        if (student.getScholarshipEligibility() != null && student.getScholarshipEligibility()) {
            financialAid = "Eligible for international student merit scholarships (up to $5000/yr).";
        } else {
            financialAid = "Standard financial aid applications available post-admission.";
        }

        return RecommendationMatch.builder()
                .university(uni)
                .matchScore(Math.round(finalScorePct * 10.0) / 10.0)
                .acceptanceProbability(Math.round(acceptanceProb * 10.0) / 10.0)
                .matchedFactors(matchedFactors)
                .missingFactors(missingFactors)
                .financialAidOpportunities(financialAid)
                .applicationTimeline("Application opens Sept 1; Regular deadline: " + (uni.getApplicationDeadline() != null ? uni.getApplicationDeadline() : "January 15"))
                .build();
    }

    private double calculateAcceptanceProbability(Student student, UniversityResponse uni) {
        // Mock algorithmic calculation for acceptance probability
        double baseProb = uni.getAcceptanceRate() != null ? uni.getAcceptanceRate() : 50.0;
        
        // Adjust based on GPA (assuming 4.0 scale)
        if (student.getGpa() != null) {
            if (student.getGpa() >= 3.8) baseProb += 20;
            else if (student.getGpa() >= 3.5) baseProb += 10;
            else if (student.getGpa() < 3.0) baseProb -= 20;
        }

        // Enhance with test scores and research
        if (student.getTestScore() != null && student.getTestScore() > 1400) { // e.g. SAT
            baseProb += 10;
        }
        if (Boolean.TRUE.equals(student.getResearchExperience())) {
            baseProb += 15;
        }

        return Math.min(Math.max(baseProb, 5.0), 99.0); // Clamp between 5% and 99%
    }
}
