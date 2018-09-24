package com.reda.reda.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Document.
 */
@Entity
@Table(name = "document")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Document implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    
    @Lob
    @Column(name = "target", nullable = false)
    private byte[] target;

    @Column(name = "target_content_type", nullable = false)
    private String targetContentType;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @ManyToOne
    @JsonIgnoreProperties("documents")
    private Internship internship;

    @ManyToOne
    @JsonIgnoreProperties("documents")
    private DocumentType type;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public byte[] getTarget() {
        return target;
    }

    public Document target(byte[] target) {
        this.target = target;
        return this;
    }

    public void setTarget(byte[] target) {
        this.target = target;
    }

    public String getTargetContentType() {
        return targetContentType;
    }

    public Document targetContentType(String targetContentType) {
        this.targetContentType = targetContentType;
        return this;
    }

    public void setTargetContentType(String targetContentType) {
        this.targetContentType = targetContentType;
    }

    public String getName() {
        return name;
    }

    public Document name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Internship getInternship() {
        return internship;
    }

    public Document internship(Internship internship) {
        this.internship = internship;
        return this;
    }

    public void setInternship(Internship internship) {
        this.internship = internship;
    }

    public DocumentType getType() {
        return type;
    }

    public Document type(DocumentType documentType) {
        this.type = documentType;
        return this;
    }

    public void setType(DocumentType documentType) {
        this.type = documentType;
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
        Document document = (Document) o;
        if (document.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), document.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Document{" +
            "id=" + getId() +
            ", target='" + getTarget() + "'" +
            ", targetContentType='" + getTargetContentType() + "'" +
            ", name='" + getName() + "'" +
            "}";
    }
}
