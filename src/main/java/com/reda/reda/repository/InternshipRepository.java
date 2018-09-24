package com.reda.reda.repository;

import com.reda.reda.domain.Internship;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Internship entity.
 */
@SuppressWarnings("unused")
@Repository
public interface InternshipRepository extends JpaRepository<Internship, Long> {

}
