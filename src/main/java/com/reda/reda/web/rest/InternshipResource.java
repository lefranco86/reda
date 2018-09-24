package com.reda.reda.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.reda.reda.domain.Internship;
import com.reda.reda.repository.InternshipRepository;
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

/**
 * REST controller for managing Internship.
 */
@RestController
@RequestMapping("/api")
public class InternshipResource {

    private final Logger log = LoggerFactory.getLogger(InternshipResource.class);

    private static final String ENTITY_NAME = "internship";

    private final InternshipRepository internshipRepository;

    public InternshipResource(InternshipRepository internshipRepository) {
        this.internshipRepository = internshipRepository;
    }

    /**
     * POST  /internships : Create a new internship.
     *
     * @param internship the internship to create
     * @return the ResponseEntity with status 201 (Created) and with body the new internship, or with status 400 (Bad Request) if the internship has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/internships")
    @Timed
    public ResponseEntity<Internship> createInternship(@Valid @RequestBody Internship internship) throws URISyntaxException {
        log.debug("REST request to save Internship : {}", internship);
        if (internship.getId() != null) {
            throw new BadRequestAlertException("A new internship cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Internship result = internshipRepository.save(internship);
        return ResponseEntity.created(new URI("/api/internships/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /internships : Updates an existing internship.
     *
     * @param internship the internship to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated internship,
     * or with status 400 (Bad Request) if the internship is not valid,
     * or with status 500 (Internal Server Error) if the internship couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/internships")
    @Timed
    public ResponseEntity<Internship> updateInternship(@Valid @RequestBody Internship internship) throws URISyntaxException {
        log.debug("REST request to update Internship : {}", internship);
        if (internship.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Internship result = internshipRepository.save(internship);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, internship.getId().toString()))
            .body(result);
    }

    /**
     * GET  /internships : get all the internships.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of internships in body
     */
    @GetMapping("/internships")
    @Timed
    public List<Internship> getAllInternships() {
        log.debug("REST request to get all Internships");
        return internshipRepository.findAll();
    }

    /**
     * GET  /internships/:id : get the "id" internship.
     *
     * @param id the id of the internship to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the internship, or with status 404 (Not Found)
     */
    @GetMapping("/internships/{id}")
    @Timed
    public ResponseEntity<Internship> getInternship(@PathVariable Long id) {
        log.debug("REST request to get Internship : {}", id);
        Optional<Internship> internship = internshipRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(internship);
    }

    /**
     * DELETE  /internships/:id : delete the "id" internship.
     *
     * @param id the id of the internship to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/internships/{id}")
    @Timed
    public ResponseEntity<Void> deleteInternship(@PathVariable Long id) {
        log.debug("REST request to delete Internship : {}", id);

        internshipRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
