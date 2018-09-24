package com.reda.reda.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import com.reda.reda.domain.enumeration.StudentOfferStatus;

/**
 * A StudentOffer.
 */
@Entity
@Table(name = "student_offer")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class StudentOffer implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private StudentOfferStatus status;

    @OneToMany(mappedBy = "studentOffer")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Interview> interviews = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("studentOffers")
    private Offer offer;

    @ManyToOne
    @JsonIgnoreProperties("studentOffers")
    private Student student;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public StudentOfferStatus getStatus() {
        return status;
    }

    public StudentOffer status(StudentOfferStatus status) {
        this.status = status;
        return this;
    }

    public void setStatus(StudentOfferStatus status) {
        this.status = status;
    }

    public Set<Interview> getInterviews() {
        return interviews;
    }

    public StudentOffer interviews(Set<Interview> interviews) {
        this.interviews = interviews;
        return this;
    }

    public StudentOffer addInterview(Interview interview) {
        this.interviews.add(interview);
        interview.setStudentOffer(this);
        return this;
    }

    public StudentOffer removeInterview(Interview interview) {
        this.interviews.remove(interview);
        interview.setStudentOffer(null);
        return this;
    }

    public void setInterviews(Set<Interview> interviews) {
        this.interviews = interviews;
    }

    public Offer getOffer() {
        return offer;
    }

    public StudentOffer offer(Offer offer) {
        this.offer = offer;
        return this;
    }

    public void setOffer(Offer offer) {
        this.offer = offer;
    }

    public Student getStudent() {
        return student;
    }

    public StudentOffer student(Student student) {
        this.student = student;
        return this;
    }

    public void setStudent(Student student) {
        this.student = student;
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
        StudentOffer studentOffer = (StudentOffer) o;
        if (studentOffer.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), studentOffer.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "StudentOffer{" +
            "id=" + getId() +
            ", status='" + getStatus() + "'" +
            "}";
    }
}
