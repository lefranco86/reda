package com.reda.reda.web.rest;

import com.reda.reda.RedaApp;

import com.reda.reda.domain.StudentOffer;
import com.reda.reda.repository.StudentOfferRepository;
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
import java.util.List;


import static com.reda.reda.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.reda.reda.domain.enumeration.StudentOfferStatus;
/**
 * Test class for the StudentOfferResource REST controller.
 *
 * @see StudentOfferResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = RedaApp.class)
public class StudentOfferResourceIntTest {

    private static final StudentOfferStatus DEFAULT_STATUS = StudentOfferStatus.PENDING;
    private static final StudentOfferStatus UPDATED_STATUS = StudentOfferStatus.ACCEPTED;

    @Autowired
    private StudentOfferRepository studentOfferRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restStudentOfferMockMvc;

    private StudentOffer studentOffer;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final StudentOfferResource studentOfferResource = new StudentOfferResource(studentOfferRepository);
        this.restStudentOfferMockMvc = MockMvcBuilders.standaloneSetup(studentOfferResource)
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
    public static StudentOffer createEntity(EntityManager em) {
        StudentOffer studentOffer = new StudentOffer()
            .status(DEFAULT_STATUS);
        return studentOffer;
    }

    @Before
    public void initTest() {
        studentOffer = createEntity(em);
    }

    @Test
    @Transactional
    public void createStudentOffer() throws Exception {
        int databaseSizeBeforeCreate = studentOfferRepository.findAll().size();

        // Create the StudentOffer
        restStudentOfferMockMvc.perform(post("/api/student-offers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(studentOffer)))
            .andExpect(status().isCreated());

        // Validate the StudentOffer in the database
        List<StudentOffer> studentOfferList = studentOfferRepository.findAll();
        assertThat(studentOfferList).hasSize(databaseSizeBeforeCreate + 1);
        StudentOffer testStudentOffer = studentOfferList.get(studentOfferList.size() - 1);
        assertThat(testStudentOffer.getStatus()).isEqualTo(DEFAULT_STATUS);
    }

    @Test
    @Transactional
    public void createStudentOfferWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = studentOfferRepository.findAll().size();

        // Create the StudentOffer with an existing ID
        studentOffer.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restStudentOfferMockMvc.perform(post("/api/student-offers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(studentOffer)))
            .andExpect(status().isBadRequest());

        // Validate the StudentOffer in the database
        List<StudentOffer> studentOfferList = studentOfferRepository.findAll();
        assertThat(studentOfferList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllStudentOffers() throws Exception {
        // Initialize the database
        studentOfferRepository.saveAndFlush(studentOffer);

        // Get all the studentOfferList
        restStudentOfferMockMvc.perform(get("/api/student-offers?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(studentOffer.getId().intValue())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())));
    }
    
    @Test
    @Transactional
    public void getStudentOffer() throws Exception {
        // Initialize the database
        studentOfferRepository.saveAndFlush(studentOffer);

        // Get the studentOffer
        restStudentOfferMockMvc.perform(get("/api/student-offers/{id}", studentOffer.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(studentOffer.getId().intValue()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingStudentOffer() throws Exception {
        // Get the studentOffer
        restStudentOfferMockMvc.perform(get("/api/student-offers/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateStudentOffer() throws Exception {
        // Initialize the database
        studentOfferRepository.saveAndFlush(studentOffer);

        int databaseSizeBeforeUpdate = studentOfferRepository.findAll().size();

        // Update the studentOffer
        StudentOffer updatedStudentOffer = studentOfferRepository.findById(studentOffer.getId()).get();
        // Disconnect from session so that the updates on updatedStudentOffer are not directly saved in db
        em.detach(updatedStudentOffer);
        updatedStudentOffer
            .status(UPDATED_STATUS);

        restStudentOfferMockMvc.perform(put("/api/student-offers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedStudentOffer)))
            .andExpect(status().isOk());

        // Validate the StudentOffer in the database
        List<StudentOffer> studentOfferList = studentOfferRepository.findAll();
        assertThat(studentOfferList).hasSize(databaseSizeBeforeUpdate);
        StudentOffer testStudentOffer = studentOfferList.get(studentOfferList.size() - 1);
        assertThat(testStudentOffer.getStatus()).isEqualTo(UPDATED_STATUS);
    }

    @Test
    @Transactional
    public void updateNonExistingStudentOffer() throws Exception {
        int databaseSizeBeforeUpdate = studentOfferRepository.findAll().size();

        // Create the StudentOffer

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restStudentOfferMockMvc.perform(put("/api/student-offers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(studentOffer)))
            .andExpect(status().isBadRequest());

        // Validate the StudentOffer in the database
        List<StudentOffer> studentOfferList = studentOfferRepository.findAll();
        assertThat(studentOfferList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteStudentOffer() throws Exception {
        // Initialize the database
        studentOfferRepository.saveAndFlush(studentOffer);

        int databaseSizeBeforeDelete = studentOfferRepository.findAll().size();

        // Get the studentOffer
        restStudentOfferMockMvc.perform(delete("/api/student-offers/{id}", studentOffer.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<StudentOffer> studentOfferList = studentOfferRepository.findAll();
        assertThat(studentOfferList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(StudentOffer.class);
        StudentOffer studentOffer1 = new StudentOffer();
        studentOffer1.setId(1L);
        StudentOffer studentOffer2 = new StudentOffer();
        studentOffer2.setId(studentOffer1.getId());
        assertThat(studentOffer1).isEqualTo(studentOffer2);
        studentOffer2.setId(2L);
        assertThat(studentOffer1).isNotEqualTo(studentOffer2);
        studentOffer1.setId(null);
        assertThat(studentOffer1).isNotEqualTo(studentOffer2);
    }
}
