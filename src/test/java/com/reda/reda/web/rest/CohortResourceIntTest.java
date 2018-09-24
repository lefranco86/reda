package com.reda.reda.web.rest;

import com.reda.reda.RedaApp;

import com.reda.reda.domain.Cohort;
import com.reda.reda.repository.CohortRepository;
import com.reda.reda.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;


import static com.reda.reda.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the CohortResource REST controller.
 *
 * @see CohortResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = RedaApp.class)
public class CohortResourceIntTest {

    private static final LocalDate DEFAULT_START_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_START_DATE = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private CohortRepository cohortRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restCohortMockMvc;

    private Cohort cohort;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CohortResource cohortResource = new CohortResource(cohortRepository);
        this.restCohortMockMvc = MockMvcBuilders.standaloneSetup(cohortResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Cohort createEntity(EntityManager em) {
        Cohort cohort = new Cohort()
            .startDate(DEFAULT_START_DATE);
        return cohort;
    }

    @Before
    public void initTest() {
        cohort = createEntity(em);
    }

    @Test
    @Transactional
    public void createCohort() throws Exception {
        int databaseSizeBeforeCreate = cohortRepository.findAll().size();

        // Create the Cohort
        restCohortMockMvc.perform(post("/api/cohorts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cohort)))
            .andExpect(status().isCreated());

        // Validate the Cohort in the database
        List<Cohort> cohortList = cohortRepository.findAll();
        assertThat(cohortList).hasSize(databaseSizeBeforeCreate + 1);
        Cohort testCohort = cohortList.get(cohortList.size() - 1);
        assertThat(testCohort.getStartDate()).isEqualTo(DEFAULT_START_DATE);
    }

    @Test
    @Transactional
    public void createCohortWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = cohortRepository.findAll().size();

        // Create the Cohort with an existing ID
        cohort.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCohortMockMvc.perform(post("/api/cohorts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cohort)))
            .andExpect(status().isBadRequest());

        // Validate the Cohort in the database
        List<Cohort> cohortList = cohortRepository.findAll();
        assertThat(cohortList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkStartDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = cohortRepository.findAll().size();
        // set the field null
        cohort.setStartDate(null);

        // Create the Cohort, which fails.

        restCohortMockMvc.perform(post("/api/cohorts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cohort)))
            .andExpect(status().isBadRequest());

        List<Cohort> cohortList = cohortRepository.findAll();
        assertThat(cohortList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllCohorts() throws Exception {
        // Initialize the database
        cohortRepository.saveAndFlush(cohort);

        // Get all the cohortList
        restCohortMockMvc.perform(get("/api/cohorts?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(cohort.getId().intValue())))
            .andExpect(jsonPath("$.[*].startDate").value(hasItem(DEFAULT_START_DATE.toString())));
    }
    
    @Test
    @Transactional
    public void getCohort() throws Exception {
        // Initialize the database
        cohortRepository.saveAndFlush(cohort);

        // Get the cohort
        restCohortMockMvc.perform(get("/api/cohorts/{id}", cohort.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(cohort.getId().intValue()))
            .andExpect(jsonPath("$.startDate").value(DEFAULT_START_DATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingCohort() throws Exception {
        // Get the cohort
        restCohortMockMvc.perform(get("/api/cohorts/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCohort() throws Exception {
        // Initialize the database
        cohortRepository.saveAndFlush(cohort);

        int databaseSizeBeforeUpdate = cohortRepository.findAll().size();

        // Update the cohort
        Cohort updatedCohort = cohortRepository.findById(cohort.getId()).get();
        // Disconnect from session so that the updates on updatedCohort are not directly saved in db
        em.detach(updatedCohort);
        updatedCohort
            .startDate(UPDATED_START_DATE);

        restCohortMockMvc.perform(put("/api/cohorts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCohort)))
            .andExpect(status().isOk());

        // Validate the Cohort in the database
        List<Cohort> cohortList = cohortRepository.findAll();
        assertThat(cohortList).hasSize(databaseSizeBeforeUpdate);
        Cohort testCohort = cohortList.get(cohortList.size() - 1);
        assertThat(testCohort.getStartDate()).isEqualTo(UPDATED_START_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingCohort() throws Exception {
        int databaseSizeBeforeUpdate = cohortRepository.findAll().size();

        // Create the Cohort

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCohortMockMvc.perform(put("/api/cohorts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cohort)))
            .andExpect(status().isBadRequest());

        // Validate the Cohort in the database
        List<Cohort> cohortList = cohortRepository.findAll();
        assertThat(cohortList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCohort() throws Exception {
        // Initialize the database
        cohortRepository.saveAndFlush(cohort);

        int databaseSizeBeforeDelete = cohortRepository.findAll().size();

        // Get the cohort
        restCohortMockMvc.perform(delete("/api/cohorts/{id}", cohort.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Cohort> cohortList = cohortRepository.findAll();
        assertThat(cohortList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Cohort.class);
        Cohort cohort1 = new Cohort();
        cohort1.setId(1L);
        Cohort cohort2 = new Cohort();
        cohort2.setId(cohort1.getId());
        assertThat(cohort1).isEqualTo(cohort2);
        cohort2.setId(2L);
        assertThat(cohort1).isNotEqualTo(cohort2);
        cohort1.setId(null);
        assertThat(cohort1).isNotEqualTo(cohort2);
    }
}
