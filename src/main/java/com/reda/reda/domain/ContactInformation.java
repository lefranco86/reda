package com.reda.reda.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A ContactInformation.
 */
@Entity
@Table(name = "contact_information")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ContactInformation implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "street", nullable = false)
    private String street;

    @NotNull
    @Column(name = "civic_number", nullable = false)
    private Integer civicNumber;

    @NotNull
    @Column(name = "city", nullable = false)
    private String city;

    @NotNull
    @Column(name = "postal_code", nullable = false)
    private String postalCode;

    @Column(name = "apartment")
    private String apartment;

    @NotNull
    @Column(name = "phone_number", nullable = false)
    private Integer phoneNumber;

    @Column(name = "phone_post")
    private Integer phonePost;

    @Column(name = "fax_number")
    private Integer faxNumber;

    @Column(name = "fax_post")
    private Integer faxPost;

    @OneToOne(mappedBy = "contactInformation")
    @JsonIgnore
    private Student student;

    @OneToOne(mappedBy = "contactInformation")
    @JsonIgnore
    private Country country;

    @OneToOne(mappedBy = "contactInformation")
    @JsonIgnore
    private Entreprise entreprise;

    @OneToOne(mappedBy = "contactInformation")
    @JsonIgnore
    private Employee employee;

    @OneToOne(mappedBy = "contactInformation")
    @JsonIgnore
    private Teacher teacher;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStreet() {
        return street;
    }

    public ContactInformation street(String street) {
        this.street = street;
        return this;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public Integer getCivicNumber() {
        return civicNumber;
    }

    public ContactInformation civicNumber(Integer civicNumber) {
        this.civicNumber = civicNumber;
        return this;
    }

    public void setCivicNumber(Integer civicNumber) {
        this.civicNumber = civicNumber;
    }

    public String getCity() {
        return city;
    }

    public ContactInformation city(String city) {
        this.city = city;
        return this;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getPostalCode() {
        return postalCode;
    }

    public ContactInformation postalCode(String postalCode) {
        this.postalCode = postalCode;
        return this;
    }

    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }

    public String getApartment() {
        return apartment;
    }

    public ContactInformation apartment(String apartment) {
        this.apartment = apartment;
        return this;
    }

    public void setApartment(String apartment) {
        this.apartment = apartment;
    }

    public Integer getPhoneNumber() {
        return phoneNumber;
    }

    public ContactInformation phoneNumber(Integer phoneNumber) {
        this.phoneNumber = phoneNumber;
        return this;
    }

    public void setPhoneNumber(Integer phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public Integer getPhonePost() {
        return phonePost;
    }

    public ContactInformation phonePost(Integer phonePost) {
        this.phonePost = phonePost;
        return this;
    }

    public void setPhonePost(Integer phonePost) {
        this.phonePost = phonePost;
    }

    public Integer getFaxNumber() {
        return faxNumber;
    }

    public ContactInformation faxNumber(Integer faxNumber) {
        this.faxNumber = faxNumber;
        return this;
    }

    public void setFaxNumber(Integer faxNumber) {
        this.faxNumber = faxNumber;
    }

    public Integer getFaxPost() {
        return faxPost;
    }

    public ContactInformation faxPost(Integer faxPost) {
        this.faxPost = faxPost;
        return this;
    }

    public void setFaxPost(Integer faxPost) {
        this.faxPost = faxPost;
    }

    public Student getStudent() {
        return student;
    }

    public ContactInformation student(Student student) {
        this.student = student;
        return this;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    public Country getCountry() {
        return country;
    }

    public ContactInformation country(Country country) {
        this.country = country;
        return this;
    }

    public void setCountry(Country country) {
        this.country = country;
    }

    public Entreprise getEntreprise() {
        return entreprise;
    }

    public ContactInformation entreprise(Entreprise entreprise) {
        this.entreprise = entreprise;
        return this;
    }

    public void setEntreprise(Entreprise entreprise) {
        this.entreprise = entreprise;
    }

    public Employee getEmployee() {
        return employee;
    }

    public ContactInformation employee(Employee employee) {
        this.employee = employee;
        return this;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public Teacher getTeacher() {
        return teacher;
    }

    public ContactInformation teacher(Teacher teacher) {
        this.teacher = teacher;
        return this;
    }

    public void setTeacher(Teacher teacher) {
        this.teacher = teacher;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        ContactInformation contactInformation = (ContactInformation) o;
        if (contactInformation.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), contactInformation.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ContactInformation{" +
            "id=" + getId() +
            ", street='" + getStreet() + "'" +
            ", civicNumber=" + getCivicNumber() +
            ", city='" + getCity() + "'" +
            ", postalCode='" + getPostalCode() + "'" +
            ", apartment='" + getApartment() + "'" +
            ", phoneNumber=" + getPhoneNumber() +
            ", phonePost=" + getPhonePost() +
            ", faxNumber=" + getFaxNumber() +
            ", faxPost=" + getFaxPost() +
            "}";
    }
}
