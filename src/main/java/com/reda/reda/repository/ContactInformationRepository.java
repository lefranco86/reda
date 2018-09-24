package com.reda.reda.repository;

import com.reda.reda.domain.ContactInformation;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ContactInformation entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ContactInformationRepository extends JpaRepository<ContactInformation, Long> {

}
