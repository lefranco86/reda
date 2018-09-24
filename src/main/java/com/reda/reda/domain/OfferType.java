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
 * A OfferType.
 */
@Entity
@Table(name = "offer_type")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class OfferType implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "description", nullable = false)
    private String description;

    @OneToMany(mappedBy = "offerType")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Offer> offers = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public OfferType description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Set<Offer> getOffers() {
        return offers;
    }

    public OfferType offers(Set<Offer> offers) {
        this.offers = offers;
        return this;
    }

    public OfferType addOffer(Offer offer) {
        this.offers.add(offer);
        offer.setOfferType(this);
        return this;
    }

    public OfferType removeOffer(Offer offer) {
        this.offers.remove(offer);
        offer.setOfferType(null);
        return this;
    }

    public void setOffers(Set<Offer> offers) {
        this.offers = offers;
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
        OfferType offerType = (OfferType) o;
        if (offerType.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), offerType.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "OfferType{" +
            "id=" + getId() +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
