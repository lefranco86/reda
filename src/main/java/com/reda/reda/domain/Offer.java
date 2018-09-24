package com.reda.reda.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Offer.
 */
@Entity
@Table(name = "offer")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Offer implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "weekly_hour")
    private Integer weeklyHour;

    @Column(name = "hourly_rate")
    private Float hourlyRate;

    @NotNull
    @Column(name = "description", nullable = false)
    private String description;

    @OneToMany(mappedBy = "offer")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<StudentOffer> studentOffers = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("offers")
    private Employee employee;

    @ManyToOne
    @JsonIgnoreProperties("offers")
    private OfferType type;

    @OneToMany(mappedBy = "offer")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Technology> technologies = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getWeeklyHour() {
        return weeklyHour;
    }

    public Offer weeklyHour(Integer weeklyHour) {
        this.weeklyHour = weeklyHour;
        return this;
    }

    public void setWeeklyHour(Integer weeklyHour) {
        this.weeklyHour = weeklyHour;
    }

    public Float getHourlyRate() {
        return hourlyRate;
    }

    public Offer hourlyRate(Float hourlyRate) {
        this.hourlyRate = hourlyRate;
        return this;
    }

    public void setHourlyRate(Float hourlyRate) {
        this.hourlyRate = hourlyRate;
    }

    public String getDescription() {
        return description;
    }

    public Offer description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Set<StudentOffer> getStudentOffers() {
        return studentOffers;
    }

    public Offer studentOffers(Set<StudentOffer> studentOffers) {
        this.studentOffers = studentOffers;
        return this;
    }

    public Offer addStudentOffer(StudentOffer studentOffer) {
        this.studentOffers.add(studentOffer);
        studentOffer.setOffer(this);
        return this;
    }

    public Offer removeStudentOffer(StudentOffer studentOffer) {
        this.studentOffers.remove(studentOffer);
        studentOffer.setOffer(null);
        return this;
    }

    public void setStudentOffers(Set<StudentOffer> studentOffers) {
        this.studentOffers = studentOffers;
    }

    public Employee getEmployee() {
        return employee;
    }

    public Offer employee(Employee employee) {
        this.employee = employee;
        return this;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public OfferType getType() {
        return type;
    }

    public Offer type(OfferType offerType) {
        this.type = offerType;
        return this;
    }

    public void setType(OfferType offerType) {
        this.type = offerType;
    }

    public Set<Technology> getTechnologies() {
        return technologies;
    }

    public Offer technologies(Set<Technology> technologies) {
        this.technologies = technologies;
        return this;
    }

    public Offer addTechnologies(Technology technology) {
        this.technologies.add(technology);
        technology.setOffer(this);
        return this;
    }

    public Offer removeTechnologies(Technology technology) {
        this.technologies.remove(technology);
        technology.setOffer(null);
        return this;
    }

    public void setTechnologies(Set<Technology> technologies) {
        this.technologies = technologies;
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
        Offer offer = (Offer) o;
        if (offer.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), offer.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Offer{" +
            "id=" + getId() +
            ", weeklyHour=" + getWeeklyHour() +
            ", hourlyRate=" + getHourlyRate() +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
