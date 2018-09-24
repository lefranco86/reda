package com.reda.reda.web.rest;

import com.reda.reda.RedaApp;

import com.reda.reda.domain.ContactInformation;
import com.reda.reda.domain.Country;
import com.reda.reda.repository.ContactInformationRepository;
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

/**
 * Test class for the ContactInformationResource REST controller.
 *
 * @see ContactInformationResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = RedaApp.class)
public class ContactInformationResourceIntTest {

    private static final String DEFAULT_STREET = "AAAAAAAAAA";
    private static final String UPDATED_STREET = "BBBBBBBBBB";

    private static final Integer DEFAULT_CIVIC_NUMBER = 1;
    private static final Integer UPDATED_CIVIC_NUMBER = 2;

    private static final String DEFAULT_CITY = "AAAAAAAAAA";
    private static final String UPDATED_CITY = "BBBBBBBBBB";

    private static final String DEFAULT_POSTAL_CODE = "AAAAAAAAAA";
    private static final String UPDATED_POSTAL_CODE = "BBBBBBBBBB";

    private static final String DEFAULT_APARTMENT = "AAAAAAAAAA";
    private static final String UPDATED_APARTMENT = "BBBBBBBBBB";

    private static final Integer DEFAULT_PHONE_NUMBER = 1;
    private static final Integer UPDATED_PHONE_NUMBER = 2;

    private static final Integer DEFAULT_PHONE_POST = 1;
    private static final Integer UPDATED_PHONE_POST = 2;

    private static final Integer DEFAULT_FAX_NUMBER = 1;
    private static final Integer UPDATED_FAX_NUMBER = 2;

    private static final Integer DEFAULT_FAX_POST = 1;
    private static final Integer UPDATED_FAX_POST = 2;

    @Autowired
    private ContactInformationRepository contactInformationRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restContactInformationMockMvc;

    private ContactInformation contactInformation;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ContactInformationResource contactInformationResource = new ContactInformationResource(contactInformationRepository);
        this.restContactInformationMockMvc = MockMvcBuilders.standaloneSetup(contactInformationResource)
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
    public static ContactInformation createEntity(EntityManager em) {
        ContactInformation contactInformation = new ContactInformation()
            .street(DEFAULT_STREET)
            .civicNumber(DEFAULT_CIVIC_NUMBER)
            .city(DEFAULT_CITY)
            .postalCode(DEFAULT_POSTAL_CODE)
            .apartment(DEFAULT_APARTMENT)
            .phoneNumber(DEFAULT_PHONE_NUMBER)
            .phonePost(DEFAULT_PHONE_POST)
            .faxNumber(DEFAULT_FAX_NUMBER)
            .faxPost(DEFAULT_FAX_POST);
        // Add required entity
        Country country = CountryResourceIntTest.createEntity(em);
        em.persist(country);
        em.flush();
        contactInformation.setCountry(country);
        return contactInformation;
    }

    @Before
    public void initTest() {
        contactInformation = createEntity(em);
    }

    @Test
    @Transactional
    public void createContactInformation() throws Exception {
        int databaseSizeBeforeCreate = contactInformationRepository.findAll().size();

        // Create the ContactInformation
        restContactInformationMockMvc.perform(post("/api/contact-informations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(contactInformation)))
            .andExpect(status().isCreated());

        // Validate the ContactInformation in the database
        List<ContactInformation> contactInformationList = contactInformationRepository.findAll();
        assertThat(contactInformationList).hasSize(databaseSizeBeforeCreate + 1);
        ContactInformation testContactInformation = contactInformationList.get(contactInformationList.size() - 1);
        assertThat(testContactInformation.getStreet()).isEqualTo(DEFAULT_STREET);
        assertThat(testContactInformation.getCivicNumber()).isEqualTo(DEFAULT_CIVIC_NUMBER);
        assertThat(testContactInformation.getCity()).isEqualTo(DEFAULT_CITY);
        assertThat(testContactInformation.getPostalCode()).isEqualTo(DEFAULT_POSTAL_CODE);
        assertThat(testContactInformation.getApartment()).isEqualTo(DEFAULT_APARTMENT);
        assertThat(testContactInformation.getPhoneNumber()).isEqualTo(DEFAULT_PHONE_NUMBER);
        assertThat(testContactInformation.getPhonePost()).isEqualTo(DEFAULT_PHONE_POST);
        assertThat(testContactInformation.getFaxNumber()).isEqualTo(DEFAULT_FAX_NUMBER);
        assertThat(testContactInformation.getFaxPost()).isEqualTo(DEFAULT_FAX_POST);
    }

    @Test
    @Transactional
    public void createContactInformationWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = contactInformationRepository.findAll().size();

        // Create the ContactInformation with an existing ID
        contactInformation.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restContactInformationMockMvc.perform(post("/api/contact-informations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(contactInformation)))
            .andExpect(status().isBadRequest());

        // Validate the ContactInformation in the database
        List<ContactInformation> contactInformationList = contactInformationRepository.findAll();
        assertThat(contactInformationList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkStreetIsRequired() throws Exception {
        int databaseSizeBeforeTest = contactInformationRepository.findAll().size();
        // set the field null
        contactInformation.setStreet(null);

        // Create the ContactInformation, which fails.

        restContactInformationMockMvc.perform(post("/api/contact-informations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(contactInformation)))
            .andExpect(status().isBadRequest());

        List<ContactInformation> contactInformationList = contactInformationRepository.findAll();
        assertThat(contactInformationList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCivicNumberIsRequired() throws Exception {
        int databaseSizeBeforeTest = contactInformationRepository.findAll().size();
        // set the field null
        contactInformation.setCivicNumber(null);

        // Create the ContactInformation, which fails.

        restContactInformationMockMvc.perform(post("/api/contact-informations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(contactInformation)))
            .andExpect(status().isBadRequest());

        List<ContactInformation> contactInformationList = contactInformationRepository.findAll();
        assertThat(contactInformationList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCityIsRequired() throws Exception {
        int databaseSizeBeforeTest = contactInformationRepository.findAll().size();
        // set the field null
        contactInformation.setCity(null);

        // Create the ContactInformation, which fails.

        restContactInformationMockMvc.perform(post("/api/contact-informations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(contactInformation)))
            .andExpect(status().isBadRequest());

        List<ContactInformation> contactInformationList = contactInformationRepository.findAll();
        assertThat(contactInformationList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPostalCodeIsRequired() throws Exception {
        int databaseSizeBeforeTest = contactInformationRepository.findAll().size();
        // set the field null
        contactInformation.setPostalCode(null);

        // Create the ContactInformation, which fails.

        restContactInformationMockMvc.perform(post("/api/contact-informations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(contactInformation)))
            .andExpect(status().isBadRequest());

        List<ContactInformation> contactInformationList = contactInformationRepository.findAll();
        assertThat(contactInformationList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPhoneNumberIsRequired() throws Exception {
        int databaseSizeBeforeTest = contactInformationRepository.findAll().size();
        // set the field null
        contactInformation.setPhoneNumber(null);

        // Create the ContactInformation, which fails.

        restContactInformationMockMvc.perform(post("/api/contact-informations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(contactInformation)))
            .andExpect(status().isBadRequest());

        List<ContactInformation> contactInformationList = contactInformationRepository.findAll();
        assertThat(contactInformationList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllContactInformations() throws Exception {
        // Initialize the database
        contactInformationRepository.saveAndFlush(contactInformation);

        // Get all the contactInformationList
        restContactInformationMockMvc.perform(get("/api/contact-informations?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(contactInformation.getId().intValue())))
            .andExpect(jsonPath("$.[*].street").value(hasItem(DEFAULT_STREET.toString())))
            .andExpect(jsonPath("$.[*].civicNumber").value(hasItem(DEFAULT_CIVIC_NUMBER)))
            .andExpect(jsonPath("$.[*].city").value(hasItem(DEFAULT_CITY.toString())))
            .andExpect(jsonPath("$.[*].postalCode").value(hasItem(DEFAULT_POSTAL_CODE.toString())))
            .andExpect(jsonPath("$.[*].apartment").value(hasItem(DEFAULT_APARTMENT.toString())))
            .andExpect(jsonPath("$.[*].phoneNumber").value(hasItem(DEFAULT_PHONE_NUMBER)))
            .andExpect(jsonPath("$.[*].phonePost").value(hasItem(DEFAULT_PHONE_POST)))
            .andExpect(jsonPath("$.[*].faxNumber").value(hasItem(DEFAULT_FAX_NUMBER)))
            .andExpect(jsonPath("$.[*].faxPost").value(hasItem(DEFAULT_FAX_POST)));
    }
    
    @Test
    @Transactional
    public void getContactInformation() throws Exception {
        // Initialize the database
        contactInformationRepository.saveAndFlush(contactInformation);

        // Get the contactInformation
        restContactInformationMockMvc.perform(get("/api/contact-informations/{id}", contactInformation.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(contactInformation.getId().intValue()))
            .andExpect(jsonPath("$.street").value(DEFAULT_STREET.toString()))
            .andExpect(jsonPath("$.civicNumber").value(DEFAULT_CIVIC_NUMBER))
            .andExpect(jsonPath("$.city").value(DEFAULT_CITY.toString()))
            .andExpect(jsonPath("$.postalCode").value(DEFAULT_POSTAL_CODE.toString()))
            .andExpect(jsonPath("$.apartment").value(DEFAULT_APARTMENT.toString()))
            .andExpect(jsonPath("$.phoneNumber").value(DEFAULT_PHONE_NUMBER))
            .andExpect(jsonPath("$.phonePost").value(DEFAULT_PHONE_POST))
            .andExpect(jsonPath("$.faxNumber").value(DEFAULT_FAX_NUMBER))
            .andExpect(jsonPath("$.faxPost").value(DEFAULT_FAX_POST));
    }

    @Test
    @Transactional
    public void getNonExistingContactInformation() throws Exception {
        // Get the contactInformation
        restContactInformationMockMvc.perform(get("/api/contact-informations/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateContactInformation() throws Exception {
        // Initialize the database
        contactInformationRepository.saveAndFlush(contactInformation);

        int databaseSizeBeforeUpdate = contactInformationRepository.findAll().size();

        // Update the contactInformation
        ContactInformation updatedContactInformation = contactInformationRepository.findById(contactInformation.getId()).get();
        // Disconnect from session so that the updates on updatedContactInformation are not directly saved in db
        em.detach(updatedContactInformation);
        updatedContactInformation
            .street(UPDATED_STREET)
            .civicNumber(UPDATED_CIVIC_NUMBER)
            .city(UPDATED_CITY)
            .postalCode(UPDATED_POSTAL_CODE)
            .apartment(UPDATED_APARTMENT)
            .phoneNumber(UPDATED_PHONE_NUMBER)
            .phonePost(UPDATED_PHONE_POST)
            .faxNumber(UPDATED_FAX_NUMBER)
            .faxPost(UPDATED_FAX_POST);

        restContactInformationMockMvc.perform(put("/api/contact-informations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedContactInformation)))
            .andExpect(status().isOk());

        // Validate the ContactInformation in the database
        List<ContactInformation> contactInformationList = contactInformationRepository.findAll();
        assertThat(contactInformationList).hasSize(databaseSizeBeforeUpdate);
        ContactInformation testContactInformation = contactInformationList.get(contactInformationList.size() - 1);
        assertThat(testContactInformation.getStreet()).isEqualTo(UPDATED_STREET);
        assertThat(testContactInformation.getCivicNumber()).isEqualTo(UPDATED_CIVIC_NUMBER);
        assertThat(testContactInformation.getCity()).isEqualTo(UPDATED_CITY);
        assertThat(testContactInformation.getPostalCode()).isEqualTo(UPDATED_POSTAL_CODE);
        assertThat(testContactInformation.getApartment()).isEqualTo(UPDATED_APARTMENT);
        assertThat(testContactInformation.getPhoneNumber()).isEqualTo(UPDATED_PHONE_NUMBER);
        assertThat(testContactInformation.getPhonePost()).isEqualTo(UPDATED_PHONE_POST);
        assertThat(testContactInformation.getFaxNumber()).isEqualTo(UPDATED_FAX_NUMBER);
        assertThat(testContactInformation.getFaxPost()).isEqualTo(UPDATED_FAX_POST);
    }

    @Test
    @Transactional
    public void updateNonExistingContactInformation() throws Exception {
        int databaseSizeBeforeUpdate = contactInformationRepository.findAll().size();

        // Create the ContactInformation

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restContactInformationMockMvc.perform(put("/api/contact-informations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(contactInformation)))
            .andExpect(status().isBadRequest());

        // Validate the ContactInformation in the database
        List<ContactInformation> contactInformationList = contactInformationRepository.findAll();
        assertThat(contactInformationList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteContactInformation() throws Exception {
        // Initialize the database
        contactInformationRepository.saveAndFlush(contactInformation);

        int databaseSizeBeforeDelete = contactInformationRepository.findAll().size();

        // Get the contactInformation
        restContactInformationMockMvc.perform(delete("/api/contact-informations/{id}", contactInformation.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ContactInformation> contactInformationList = contactInformationRepository.findAll();
        assertThat(contactInformationList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ContactInformation.class);
        ContactInformation contactInformation1 = new ContactInformation();
        contactInformation1.setId(1L);
        ContactInformation contactInformation2 = new ContactInformation();
        contactInformation2.setId(contactInformation1.getId());
        assertThat(contactInformation1).isEqualTo(contactInformation2);
        contactInformation2.setId(2L);
        assertThat(contactInformation1).isNotEqualTo(contactInformation2);
        contactInformation1.setId(null);
        assertThat(contactInformation1).isNotEqualTo(contactInformation2);
    }
}
