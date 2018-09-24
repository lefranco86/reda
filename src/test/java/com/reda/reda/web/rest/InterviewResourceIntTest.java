package com.reda.reda.web.rest;

import com.reda.reda.RedaApp;

import com.reda.reda.domain.Interview;
import com.reda.reda.repository.InterviewRepository;
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
 * Test class for the InterviewResource REST controller.
 *
 * @see InterviewResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = RedaApp.class)
public class InterviewResourceIntTest {

    private static final LocalDate DEFAULT_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_RESULT = "AAAAAAAAAA";
    private static final String UPDATED_RESULT = "BBBBBBBBBB";

    @Autowired
    private InterviewRepository interviewRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restInterviewMockMvc;

    private Interview interview;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final InterviewResource interviewResource = new InterviewResource(interviewRepository);
        this.restInterviewMockMvc = MockMvcBuilders.standaloneSetup(interviewResource)
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
    public static Interview createEntity(EntityManager em) {
        Interview interview = new Interview()
            .date(DEFAULT_DATE)
            .result(DEFAULT_RESULT);
        return interview;
    }

    @Before
    public void initTest() {
        interview = createEntity(em);
    }

    @Test
    @Transactional
    public void createInterview() throws Exception {
        int databaseSizeBeforeCreate = interviewRepository.findAll().size();

        // Create the Interview
        restInterviewMockMvc.perform(post("/api/interviews")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(interview)))
            .andExpect(status().isCreated());

        // Validate the Interview in the database
        List<Interview> interviewList = interviewRepository.findAll();
        assertThat(interviewList).hasSize(databaseSizeBeforeCreate + 1);
        Interview testInterview = interviewList.get(interviewList.size() - 1);
        assertThat(testInterview.getDate()).isEqualTo(DEFAULT_DATE);
        assertThat(testInterview.getResult()).isEqualTo(DEFAULT_RESULT);
    }

    @Test
    @Transactional
    public void createInterviewWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = interviewRepository.findAll().size();

        // Create the Interview with an existing ID
        interview.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restInterviewMockMvc.perform(post("/api/interviews")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(interview)))
            .andExpect(status().isBadRequest());

        // Validate the Interview in the database
        List<Interview> interviewList = interviewRepository.findAll();
        assertThat(interviewList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = interviewRepository.findAll().size();
        // set the field null
        interview.setDate(null);

        // Create the Interview, which fails.

        restInterviewMockMvc.perform(post("/api/interviews")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(interview)))
            .andExpect(status().isBadRequest());

        List<Interview> interviewList = interviewRepository.findAll();
        assertThat(interviewList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllInterviews() throws Exception {
        // Initialize the database
        interviewRepository.saveAndFlush(interview);

        // Get all the interviewList
        restInterviewMockMvc.perform(get("/api/interviews?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(interview.getId().intValue())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())))
            .andExpect(jsonPath("$.[*].result").value(hasItem(DEFAULT_RESULT.toString())));
    }
    
    @Test
    @Transactional
    public void getInterview() throws Exception {
        // Initialize the database
        interviewRepository.saveAndFlush(interview);

        // Get the interview
        restInterviewMockMvc.perform(get("/api/interviews/{id}", interview.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(interview.getId().intValue()))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()))
            .andExpect(jsonPath("$.result").value(DEFAULT_RESULT.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingInterview() throws Exception {
        // Get the interview
        restInterviewMockMvc.perform(get("/api/interviews/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateInterview() throws Exception {
        // Initialize the database
        interviewRepository.saveAndFlush(interview);

        int databaseSizeBeforeUpdate = interviewRepository.findAll().size();

        // Update the interview
        Interview updatedInterview = interviewRepository.findById(interview.getId()).get();
        // Disconnect from session so that the updates on updatedInterview are not directly saved in db
        em.detach(updatedInterview);
        updatedInterview
            .date(UPDATED_DATE)
            .result(UPDATED_RESULT);

        restInterviewMockMvc.perform(put("/api/interviews")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedInterview)))
            .andExpect(status().isOk());

        // Validate the Interview in the database
        List<Interview> interviewList = interviewRepository.findAll();
        assertThat(interviewList).hasSize(databaseSizeBeforeUpdate);
        Interview testInterview = interviewList.get(interviewList.size() - 1);
        assertThat(testInterview.getDate()).isEqualTo(UPDATED_DATE);
        assertThat(testInterview.getResult()).isEqualTo(UPDATED_RESULT);
    }

    @Test
    @Transactional
    public void updateNonExistingInterview() throws Exception {
        int databaseSizeBeforeUpdate = interviewRepository.findAll().size();

        // Create the Interview

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restInterviewMockMvc.perform(put("/api/interviews")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(interview)))
            .andExpect(status().isBadRequest());

        // Validate the Interview in the database
        List<Interview> interviewList = interviewRepository.findAll();
        assertThat(interviewList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteInterview() throws Exception {
        // Initialize the database
        interviewRepository.saveAndFlush(interview);

        int databaseSizeBeforeDelete = interviewRepository.findAll().size();

        // Get the interview
        restInterviewMockMvc.perform(delete("/api/interviews/{id}", interview.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Interview> interviewList = interviewRepository.findAll();
        assertThat(interviewList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Interview.class);
        Interview interview1 = new Interview();
        interview1.setId(1L);
        Interview interview2 = new Interview();
        interview2.setId(interview1.getId());
        assertThat(interview1).isEqualTo(interview2);
        interview2.setId(2L);
        assertThat(interview1).isNotEqualTo(interview2);
        interview1.setId(null);
        assertThat(interview1).isNotEqualTo(interview2);
    }
}
