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
 * A Entreprise.
 */
@Entity
@Table(name = "entreprise")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Entreprise implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @OneToMany(mappedBy = "entreprise")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<ContactInformation> contactInformations = new HashSet<>();

    @OneToMany(mappedBy = "entreprise")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Employee> employees = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Entreprise name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<ContactInformation> getContactInformations() {
        return contactInformations;
    }

    public Entreprise contactInformations(Set<ContactInformation> contactInformations) {
        this.contactInformations = contactInformations;
        return this;
    }

    public Entreprise addContactInformations(ContactInformation contactInformation) {
        this.contactInformations.add(contactInformation);
        contactInformation.setEntreprise(this);
        return this;
    }

    public Entreprise removeContactInformations(ContactInformation contactInformation) {
        this.contactInformations.remove(contactInformation);
        contactInformation.setEntreprise(null);
        return this;
    }

    public void setContactInformations(Set<ContactInformation> contactInformations) {
        this.contactInformations = contactInformations;
    }

    public Set<Employee> getEmployees() {
        return employees;
    }

    public Entreprise employees(Set<Employee> employees) {
        this.employees = employees;
        return this;
    }

    public Entreprise addEmployees(Employee employee) {
        this.employees.add(employee);
        employee.setEntreprise(this);
        return this;
    }

    public Entreprise removeEmployees(Employee employee) {
        this.employees.remove(employee);
        employee.setEntreprise(null);
        return this;
    }

    public void setEmployees(Set<Employee> employees) {
        this.employees = employees;
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
        Entreprise entreprise = (Entreprise) o;
        if (entreprise.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), entreprise.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Entreprise{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
