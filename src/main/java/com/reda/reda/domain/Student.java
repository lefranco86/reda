package com.reda.reda.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Student.
 */
@Entity
@Table(name = "student")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Student implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Size(min = 7, max = 7)
    @Column(name = "registration_number", length = 7, nullable = false)
    private String registrationNumber;

    @NotNull
    @Column(name = "firstname", nullable = false)
    private String firstname;

    @NotNull
    @Column(name = "lastname", nullable = false)
    private String lastname;

    @NotNull
    @Column(name = "email", nullable = false)
    private String email;

    @NotNull
    @Column(name = "active", nullable = false)
    private Boolean active;

    @OneToOne
    @JoinColumn(unique = true)
    private ContactInformation contactInformation;

    @OneToMany(mappedBy = "student")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Cohort> cohorts = new HashSet<>();

    @OneToMany(mappedBy = "student")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<StudentOffer> studentOffers = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRegistrationNumber() {
        return registrationNumber;
    }

    public Student registrationNumber(String registrationNumber) {
        this.registrationNumber = registrationNumber;
        return this;
    }

    public void setRegistrationNumber(String registrationNumber) {
        this.registrationNumber = registrationNumber;
    }

    public String getFirstname() {
        return firstname;
    }

    public Student firstname(String firstname) {
        this.firstname = firstname;
        return this;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public Student lastname(String lastname) {
        this.lastname = lastname;
        return this;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getEmail() {
        return email;
    }

    public Student email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Boolean isActive() {
        return active;
    }

    public Student active(Boolean active) {
        this.active = active;
        return this;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public ContactInformation getContactInformation() {
        return contactInformation;
    }

    public Student contactInformation(ContactInformation contactInformation) {
        this.contactInformation = contactInformation;
        return this;
    }

    public void setContactInformation(ContactInformation contactInformation) {
        this.contactInformation = contactInformation;
    }

    public Set<Cohort> getCohorts() {
        return cohorts;
    }

    public Student cohorts(Set<Cohort> cohorts) {
        this.cohorts = cohorts;
        return this;
    }

    public Student addCohort(Cohort cohort) {
        this.cohorts.add(cohort);
        cohort.setStudent(this);
        return this;
    }

    public Student removeCohort(Cohort cohort) {
        this.cohorts.remove(cohort);
        cohort.setStudent(null);
        return this;
    }

    public void setCohorts(Set<Cohort> cohorts) {
        this.cohorts = cohorts;
    }

    public Set<StudentOffer> getStudentOffers() {
        return studentOffers;
    }

    public Student studentOffers(Set<StudentOffer> studentOffers) {
        this.studentOffers = studentOffers;
        return this;
    }

    public Student addStudentOffer(StudentOffer studentOffer) {
        this.studentOffers.add(studentOffer);
        studentOffer.setStudent(this);
        return this;
    }

    public Student removeStudentOffer(StudentOffer studentOffer) {
        this.studentOffers.remove(studentOffer);
        studentOffer.setStudent(null);
        return this;
    }

    public void setStudentOffers(Set<StudentOffer> studentOffers) {
        this.studentOffers = studentOffers;
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
        Student student = (Student) o;
        if (student.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), student.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Student{" +
            "id=" + getId() +
            ", registrationNumber='" + getRegistrationNumber() + "'" +
            ", firstname='" + getFirstname() + "'" +
            ", lastname='" + getLastname() + "'" +
            ", email='" + getEmail() + "'" +
            ", active='" + isActive() + "'" +
            "}";
    }
}
