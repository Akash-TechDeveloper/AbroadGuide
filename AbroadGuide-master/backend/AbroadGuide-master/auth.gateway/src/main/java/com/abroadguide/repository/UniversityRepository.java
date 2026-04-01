package com.abroadguide.repository;

import com.abroadguide.model.University;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UniversityRepository extends JpaRepository<University, Long> {

    List<University> findByCountryIgnoreCase(String country);

    List<University> findByCityIgnoreCase(String city);

    List<University> findByNameContainingIgnoreCase(String name);

    List<University> findByAverageTuitionUsdLessThanEqual(Double maxTuition);

    List<University> findByRankingLessThanEqual(Integer maxRanking);

    @Query("SELECT u FROM University u WHERE " +
           "(:country IS NULL OR LOWER(u.country) = LOWER(:country)) AND " +
           "(:name IS NULL OR LOWER(u.name) LIKE LOWER(CONCAT('%', :name, '%'))) AND " +
           "(:maxTuition IS NULL OR u.averageTuitionUsd <= :maxTuition) AND " +
           "(:maxRanking IS NULL OR u.ranking <= :maxRanking)")
    List<University> searchUniversities(
            @Param("country") String country,
            @Param("name") String name,
            @Param("maxTuition") Double maxTuition,
            @Param("maxRanking") Integer maxRanking);

    boolean existsByNameAndCountry(String name, String country);
}
