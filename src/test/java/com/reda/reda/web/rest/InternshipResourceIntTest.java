package com.reda.reda.web.rest;

import com.reda.reda.RedaApp;

import com.reda.reda.domain.Internship;
import com.reda.reda.domain.Document;
import com.reda.reda.repository.InternshipRepository;
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
 * Test class for the InternshipResource REST controller.
 *
 * @see InternshipResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = RedaApp.class)
public class InternshipResourceIntTest {

    private static final Integer DEFAULT_HOURLY_RATE = 1;
    private static final Integer UPDATED_HOURLY_RATE = 2;

    private static final Integer DEFAULT_WEEKLY_HOUR = 1;
    private static final Integer UPDATED_WEEKLY_HOUR = 2;

    private static final Integer DEFAULT_SPECIAL_RATE = 1;
    private static final Integer UPDATED_SPECIAL_RATE = 2;

    private static final LocalDate DEFAULT_START = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_START = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_END = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_END = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private InternshipRepository internshipRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restInternshipMockMvc;

    private Internship internship;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final InternshipResource internshipResource = new InternshipResource(internshipRepository);
        this.restInternshipMockMvc = MockMvcBuilders.standaloneSetup(internshipResource)
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
    public static Internship createEntity(EntityManager em) {
        Internship internship = new Internship()
            .hourlyRate(DEFAULT_HOURLY_RATE)
            .weeklyHour(DEFAULT_WEEKLY_HOUR)
            .specialRate(DEFAULT_SPECIAL_RATE)
            .start(DEFAULT_START)
            .end(DEFAULT_END);
        // Add required entity
        Document document = DocumentResourceIntTest.createEntity(em);
        em.persist(document);
        em.flush();
        internship.getDocuments().add(document);
        return internship;
    }

    @Before
    public void initTest() {
        internship = createEntity(em);
    }

    @Test
    @Transactional
    public void createInternship() throws Exception {
        int databaseSizeBeforeCreate = internshipRepository.findAll().size();

        // Create the Internship
        restInternshipMockMvc.perform(post("/api/internships")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(internship)))
            .andExpect(status().isCreated());

        // Validate the Internship in the database
        List<Internship> internshipList = internshipRepository.findAll();
        assertThat(internshipList).hasSize(databaseSizeBeforeCreate + 1);
        Internship testInternship = internshipList.get(internshipList.size() - 1);
        assertThat(testInternship.getHourlyRate()).isEqualTo(DEFAULT_HOURLY_RATE);
        assertThat(testInternship.getWeeklyHour()).isEqualTo(DEFAULT_WEEKLY_HOUR);
        assertThat(testInternship.getSpecialRate()).isEqualTo(DEFAULT_SPECIAL_RATE);
        assertThat(testInternship.getStart()).isEqualTo(DEFAULT_START);
        assertThat(testInternship.getEnd()).isEqualTo(DEFAULT_END);
    }

    @Test
    @Transactional
    public void createInternshipWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = internshipRepository.findAll().size();

        // Create the Internship with an existing ID
        internship.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restInternshipMockMvc.perform(post("/api/internships")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(internship)))
            .andExpect(status().isBadRequest());

        // Validate the Internship in the database
        List<Internship> internshipList = internshipRepository.findAll();
        assertThat(internshipList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkStartIsRequired() throws Exception {
        int databaseSizeBeforeTest = internshipRepository.findAll().size();
        // set the field null
        internship.setStart(null);

        // Create the Internship, which fails.

        restInternshipMockMvc.perform(post("/api/internships")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(internship)))
            .andExpect(status().isBadRequest());

        List<Internship> internshipList = internshipRepository.findAll();
        assertThat(internshipList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkEndIsRequired() throws Exception {
        int databaseSizeBeforeTest = internshipRepository.findAll().size();
        // set the field null
        internship.setEnd(null);

        // Create the Internship, which fails.

        restInternshipMockMvc.perform(post("/api/internships")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(internship)))
            .andExpect(status().isBadRequest());

        List<Internship> internshipList = internshipRepository.findAll();
        assertThat(internshipList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllInternships() throws Exception {
        // Initialize the database
        internshipRepository.saveAndFlush(internship);

        // Get all the internshipList
        restInternshipMockMvc.perform(get("/api/internships?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(internship.getId().intValue())))
            .andExpect(jsonPath("$.[*].hourlyRate").value(hasItem(DEFAULT_HOURLY_RATE)))
            .andExpect(jsonPath("$.[*].weeklyHour").value(hasItem(DEFAULT_WEEKLY_HOUR)))
            .andExpect(jsonPath("$.[*].specialRate").value(hasItem(DEFAULT_SPECIAL_RATE)))
            .andExpect(jsonPath("$.[*].start").value(hasItem(DEFAULT_START.toString())))
            .andExpect(jsonPath("$.[*].end").value(hasItem(DEFAULT_END.toString())));
    }
    
    @Test
    @Transactional
    public void getInternship() throws Exception {
        // Initialize the database
        internshipRepository.saveAndFlush(internship);

        // Get the internship
        restInternshipMockMvc.perform(get("/api/internships/{id}", internship.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(internship.getId().intValue()))
            .andExpect(jsonPath("$.hourlyRate").value(DEFAULT_HOURLY_RATE))
            .andExpect(jsonPath("$.weeklyHour").value(DEFAULT_WEEKLY_HOUR))
            .andExpect(jsonPath("$.specialRate").value(DEFAULT_SPECIAL_RATE))
            .andExpect(jsonPath("$.start").value(DEFAULT_START.toString()))
            .andExpect(jsonPath("$.end").value(DEFAULT_END.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingInternship() throws Exception {
        // Get the internship
        restInternshipMockMvc.perform(get("/api/internships/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateInternship() throws Exception {
        // Initialize the database
        internshipRepository.saveAndFlush(internship);

        int databaseSizeBeforeUpdate = internshipRepository.findAll().size();

        // Update the internship
        Internship updatedInternship = internshipRepository.findById(internship.getId()).get();
        // Disconnect from session so that the updates on updatedInternship are not directly saved in db
        em.detach(updatedInternship);
        updatedInternship
            .hourlyRate(UPDATED_HOURLY_RATE)
            .weeklyHour(UPDATED_WEEKLY_HOUR)
            .specialRate(UPDATED_SPECIAL_RATE)
            .start(UPDATED_START)
            .end(UPDATED_END);

        restInternshipMockMvc.perform(put("/api/internships")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedInternship)))
            .andExpect(status().isOk());

        // Validate the Internship in the database
        List<Internship> internshipList = internshipRepository.findAll();
        assertThat(internshipList).hasSize(databaseSizeBeforeUpdate);
        Internship testInternship = internshipList.get(internshipList.size() - 1);
        assertThat(testInternship.getHourlyRate()).isEqualTo(UPDATED_HOURLY_RATE);
        assertThat(testInternship.getWeeklyHour()).isEqualTo(UPDATED_WEEKLY_HOUR);
        assertThat(testInternship.getSpecialRate()).isEqualTo(UPDATED_SPECIAL_RATE);
        assertThat(testInternship.getStart()).isEqualTo(UPDATED_START);
        assertThat(testInternship.getEnd()).isEqualTo(UPDATED_END);
    }

    @Test
    @Transactional
    public void updateNonExistingInternship() throws Exception {
        int databaseSizeBeforeUpdate = internshipRepository.findAll().size();

        // Create the Internship

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restInternshipMockMvc.perform(put("/api/internships")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(internship)))
            .andExpect(status().isBadRequest());

        // Validate the Internship in the database
        List<Internship> internshipList = internshipRepository.findAll();
        assertThat(internshipList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteInternship() throws Exception {
        // Initialize the database
        internshipRepository.saveAndFlush(internship);

        int databaseSizeBeforeDelete = internshipRepository.findAll().size();

        // Get the internship
        restInternshipMockMvc.perform(delete("/api/internships/{id}", internship.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Internship> internshipList = internshipRepository.findAll();
        assertThat(internshipList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Internship.class);
        Internship internship1 = new Internship();
        internship1.setId(1L);
        Internship internship2 = new Internship();
        internship2.setId(internship1.getId());
        assertThat(internship1).isEqualTo(internship2);
        internship2.setId(2L);
        assertThat(internship1).isNotEqualTo(internship2);
        internship1.setId(null);
        assertThat(internship1).isNotEqualTo(internship2);
    }
}
