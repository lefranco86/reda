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
 * A Internship.
 */
@Entity
@Table(name = "internship")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Internship implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "hourly_rate")
    private Integer hourlyRate;

    @Column(name = "weekly_hour")
    private Integer weeklyHour;

    @Column(name = "special_rate")
    private Integer specialRate;

    @NotNull
    @Column(name = "jhi_start", nullable = false)
    private LocalDate start;

    @NotNull
    @Column(name = "jhi_end", nullable = false)
    private LocalDate end;

    @OneToMany(mappedBy = "internship")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Document> documents = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("internships")
    private Interview interview;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getHourlyRate() {
        return hourlyRate;
    }

    public Internship hourlyRate(Integer hourlyRate) {
        this.hourlyRate = hourlyRate;
        return this;
    }

    public void setHourlyRate(Integer hourlyRate) {
        this.hourlyRate = hourlyRate;
    }

    public Integer getWeeklyHour() {
        return weeklyHour;
    }

    public Internship weeklyHour(Integer weeklyHour) {
        this.weeklyHour = weeklyHour;
        return this;
    }

    public void setWeeklyHour(Integer weeklyHour) {
        this.weeklyHour = weeklyHour;
    }

    public Integer getSpecialRate() {
        return specialRate;
    }

    public Internship specialRate(Integer specialRate) {
        this.specialRate = specialRate;
        return this;
    }

    public void setSpecialRate(Integer specialRate) {
        this.specialRate = specialRate;
    }

    public LocalDate getStart() {
        return start;
    }

    public Internship start(LocalDate start) {
        this.start = start;
        return this;
    }

    public void setStart(LocalDate start) {
        this.start = start;
    }

    public LocalDate getEnd() {
        return end;
    }

    public Internship end(LocalDate end) {
        this.end = end;
        return this;
    }

    public void setEnd(LocalDate end) {
        this.end = end;
    }

    public Set<Document> getDocuments() {
        return documents;
    }

    public Internship documents(Set<Document> documents) {
        this.documents = documents;
        return this;
    }

    public Internship addDocuments(Document document) {
        this.documents.add(document);
        document.setInternship(this);
        return this;
    }

    public Internship removeDocuments(Document document) {
        this.documents.remove(document);
        document.setInternship(null);
        return this;
    }

    public void setDocuments(Set<Document> documents) {
        this.documents = documents;
    }

    public Interview getInterview() {
        return interview;
    }

    public Internship interview(Interview interview) {
        this.interview = interview;
        return this;
    }

    public void setInterview(Interview interview) {
        this.interview = interview;
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
        Internship internship = (Internship) o;
        if (internship.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), internship.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Internship{" +
            "id=" + getId() +
            ", hourlyRate=" + getHourlyRate() +
            ", weeklyHour=" + getWeeklyHour() +
            ", specialRate=" + getSpecialRate() +
            ", start='" + getStart() + "'" +
            ", end='" + getEnd() + "'" +
            "}";
    }
}
