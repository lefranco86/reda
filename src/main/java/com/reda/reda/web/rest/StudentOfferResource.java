package com.reda.reda.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.reda.reda.domain.StudentOffer;
import com.reda.reda.repository.StudentOfferRepository;
import com.reda.reda.web.rest.errors.BadRequestAlertException;
import com.reda.reda.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing StudentOffer.
 */
@RestController
@RequestMapping("/api")
public class StudentOfferResource {

    private final Logger log = LoggerFactory.getLogger(StudentOfferResource.class);

    private static final String ENTITY_NAME = "studentOffer";

    private final StudentOfferRepository studentOfferRepository;

    public StudentOfferResource(StudentOfferRepository studentOfferRepository) {
        this.studentOfferRepository = studentOfferRepository;
    }

    /**
     * POST  /student-offers : Create a new studentOffer.
     *
     * @param studentOffer the studentOffer to create
     * @return the ResponseEntity with status 201 (Created) and with body the new studentOffer, or with status 400 (Bad Request) if the studentOffer has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/student-offers")
    @Timed
    public ResponseEntity<StudentOffer> createStudentOffer(@RequestBody StudentOffer studentOffer) throws URISyntaxException {
        log.debug("REST request to save StudentOffer : {}", studentOffer);
        if (studentOffer.getId() != null) {
            throw new BadRequestAlertException("A new studentOffer cannot already have an ID", ENTITY_NAME, "idexists");
        }
        StudentOffer result = studentOfferRepository.save(studentOffer);
        return ResponseEntity.created(new URI("/api/student-offers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /student-offers : Updates an existing studentOffer.
     *
     * @param studentOffer the studentOffer to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated studentOffer,
     * or with status 400 (Bad Request) if the studentOffer is not valid,
     * or with status 500 (Internal Server Error) if the studentOffer couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/student-offers")
    @Timed
    public ResponseEntity<StudentOffer> updateStudentOffer(@RequestBody StudentOffer studentOffer) throws URISyntaxException {
        log.debug("REST request to update StudentOffer : {}", studentOffer);
        if (studentOffer.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        StudentOffer result = studentOfferRepository.save(studentOffer);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, studentOffer.getId().toString()))
            .body(result);
    }

    /**
     * GET  /student-offers : get all the studentOffers.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of studentOffers in body
     */
    @GetMapping("/student-offers")
    @Timed
    public List<StudentOffer> getAllStudentOffers() {
        log.debug("REST request to get all StudentOffers");
        return studentOfferRepository.findAll();
    }

    /**
     * GET  /student-offers/:id : get the "id" studentOffer.
     *
     * @param id the id of the studentOffer to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the studentOffer, or with status 404 (Not Found)
     */
    @GetMapping("/student-offers/{id}")
    @Timed
    public ResponseEntity<StudentOffer> getStudentOffer(@PathVariable Long id) {
        log.debug("REST request to get StudentOffer : {}", id);
        Optional<StudentOffer> studentOffer = studentOfferRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(studentOffer);
    }

    /**
     * DELETE  /student-offers/:id : delete the "id" studentOffer.
     *
     * @param id the id of the studentOffer to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/student-offers/{id}")
    @Timed
    public ResponseEntity<Void> deleteStudentOffer(@PathVariable Long id) {
        log.debug("REST request to delete StudentOffer : {}", id);

        studentOfferRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
