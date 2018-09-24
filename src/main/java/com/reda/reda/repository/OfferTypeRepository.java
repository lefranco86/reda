package com.reda.reda.repository;

import com.reda.reda.domain.OfferType;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the OfferType entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OfferTypeRepository extends JpaRepository<OfferType, Long> {

}
