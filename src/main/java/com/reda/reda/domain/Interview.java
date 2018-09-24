package com.reda.reda.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Interview.
 */
@Entity
@Table(name = "interview")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Interview implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "jhi_date", nullable = false)
    private LocalDate date;

    @Column(name = "result")
    private String result;

    @OneToMany(mappedBy = "interview")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Internship> internships = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("interviews")
    private StudentOffer studentOffer;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDate() {
        return date;
    }

    public Interview date(LocalDate date) {
        this.date = date;
        return this;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getResult() {
        return result;
    }

    public Interview result(String result) {
        this.result = result;
        return this;
    }

    public void setResult(String result) {
        this.result = result;
    }

    public Set<Internship> getInternships() {
        return internships;
    }

    public Interview internships(Set<Internship> internships) {
        this.internships = internships;
        return this;
    }

    public Interview addInternship(Internship internship) {
        this.internships.add(internship);
        internship.setInterview(this);
        return this;
    }

    public Interview removeInternship(Internship internship) {
        this.internships.remove(internship);
        internship.setInterview(null);
        return this;
    }

    public void setInternships(Set<Internship> internships) {
        this.internships = internships;
    }

    public StudentOffer getStudentOffer() {
        return studentOffer;
    }

    public Interview studentOffer(StudentOffer studentOffer) {
        this.studentOffer = studentOffer;
        return this;
    }

    public void setStudentOffer(StudentOffer studentOffer) {
        this.studentOffer = studentOffer;
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
        Interview interview = (Interview) o;
        if (interview.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), interview.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Interview{" +
            "id=" + getId() +
            ", date='" + getDate() + "'" +
            ", result='" + getResult() + "'" +
            "}";
    }
}
