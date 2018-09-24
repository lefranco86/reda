package com.reda.reda.repository;

import com.reda.reda.domain.StudentOffer;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the StudentOffer entity.
 */
@SuppressWarnings("unused")
@Repository
public interface StudentOfferRepository extends JpaRepository<StudentOffer, Long> {

}
