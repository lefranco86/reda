package com.reda.reda.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.reda.reda.domain.ContactInformation;
import com.reda.reda.repository.ContactInformationRepository;
import com.reda.reda.web.rest.errors.BadRequestAlertException;
import com.reda.reda.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * REST controller for managing ContactInformation.
 */
@RestController
@RequestMapping("/api")
public class ContactInformationResource {

    private final Logger log = LoggerFactory.getLogger(ContactInformationResource.class);

    private static final String ENTITY_NAME = "contactInformation";

    private final ContactInformationRepository contactInformationRepository;

    public ContactInformationResource(ContactInformationRepository contactInformationRepository) {
        this.contactInformationRepository = contactInformationRepository;
    }

    /**
     * POST  /contact-informations : Create a new contactInformation.
     *
     * @param contactInformation the contactInformation to create
     * @return the ResponseEntity with status 201 (Created) and with body the new contactInformation, or with status 400 (Bad Request) if the contactInformation has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/contact-informations")
    @Timed
    public ResponseEntity<ContactInformation> createContactInformation(@Valid @RequestBody ContactInformation contactInformation) throws URISyntaxException {
        log.debug("REST request to save ContactInformation : {}", contactInformation);
        if (contactInformation.getId() != null) {
            throw new BadRequestAlertException("A new contactInformation cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ContactInformation result = contactInformationRepository.save(contactInformation);
        return ResponseEntity.created(new URI("/api/contact-informations/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /contact-informations : Updates an existing contactInformation.
     *
     * @param contactInformation the contactInformation to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated contactInformation,
     * or with status 400 (Bad Request) if the contactInformation is not valid,
     * or with status 500 (Internal Server Error) if the contactInformation couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/contact-informations")
    @Timed
    public ResponseEntity<ContactInformation> updateContactInformation(@Valid @RequestBody ContactInformation contactInformation) throws URISyntaxException {
        log.debug("REST request to update ContactInformation : {}", contactInformation);
        if (contactInformation.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ContactInformation result = contactInformationRepository.save(contactInformation);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, contactInformation.getId().toString()))
            .body(result);
    }

    /**
     * GET  /contact-informations : get all the contactInformations.
     *
     * @param filter the filter of the request
     * @return the ResponseEntity with status 200 (OK) and the list of contactInformations in body
     */
    @GetMapping("/contact-informations")
    @Timed
    public List<ContactInformation> getAllContactInformations(@RequestParam(required = false) String filter) {
        if ("country-is-null".equals(filter)) {
            log.debug("REST request to get all ContactInformations where country is null");
            return StreamSupport
                .stream(contactInformationRepository.findAll().spliterator(), false)
                .filter(contactInformation -> contactInformation.getCountry() == null)
                .collect(Collectors.toList());
        }
        log.debug("REST request to get all ContactInformations");
        return contactInformationRepository.findAll();
    }

    /**
     * GET  /contact-informations/:id : get the "id" contactInformation.
     *
     * @param id the id of the contactInformation to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the contactInformation, or with status 404 (Not Found)
     */
    @GetMapping("/contact-informations/{id}")
    @Timed
    public ResponseEntity<ContactInformation> getContactInformation(@PathVariable Long id) {
        log.debug("REST request to get ContactInformation : {}", id);
        Optional<ContactInformation> contactInformation = contactInformationRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(contactInformation);
    }

    /**
     * DELETE  /contact-informations/:id : delete the "id" contactInformation.
     *
     * @param id the id of the contactInformation to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/contact-informations/{id}")
    @Timed
    public ResponseEntity<Void> deleteContactInformation(@PathVariable Long id) {
        log.debug("REST request to delete ContactInformation : {}", id);

        contactInformationRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
