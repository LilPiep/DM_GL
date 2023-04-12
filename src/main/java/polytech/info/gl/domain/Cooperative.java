package polytech.info.gl.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Cooperative.
 */
@Entity
@Table(name = "cooperative")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Cooperative implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "cooperative_name")
    private String cooperativeName;

    @OneToMany(mappedBy = "cooperative")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "cooperative", "commandes" }, allowSetters = true)
    private Set<Livreur> livreurs = new HashSet<>();

    @OneToMany(mappedBy = "cooperative")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "cooperative", "commandes" }, allowSetters = true)
    private Set<Commercant> commercants = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Cooperative id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCooperativeName() {
        return this.cooperativeName;
    }

    public Cooperative cooperativeName(String cooperativeName) {
        this.setCooperativeName(cooperativeName);
        return this;
    }

    public void setCooperativeName(String cooperativeName) {
        this.cooperativeName = cooperativeName;
    }

    public Set<Livreur> getLivreurs() {
        return this.livreurs;
    }

    public void setLivreurs(Set<Livreur> livreurs) {
        if (this.livreurs != null) {
            this.livreurs.forEach(i -> i.setCooperative(null));
        }
        if (livreurs != null) {
            livreurs.forEach(i -> i.setCooperative(this));
        }
        this.livreurs = livreurs;
    }

    public Cooperative livreurs(Set<Livreur> livreurs) {
        this.setLivreurs(livreurs);
        return this;
    }

    public Cooperative addLivreur(Livreur livreur) {
        this.livreurs.add(livreur);
        livreur.setCooperative(this);
        return this;
    }

    public Cooperative removeLivreur(Livreur livreur) {
        this.livreurs.remove(livreur);
        livreur.setCooperative(null);
        return this;
    }

    public Set<Commercant> getCommercants() {
        return this.commercants;
    }

    public void setCommercants(Set<Commercant> commercants) {
        if (this.commercants != null) {
            this.commercants.forEach(i -> i.setCooperative(null));
        }
        if (commercants != null) {
            commercants.forEach(i -> i.setCooperative(this));
        }
        this.commercants = commercants;
    }

    public Cooperative commercants(Set<Commercant> commercants) {
        this.setCommercants(commercants);
        return this;
    }

    public Cooperative addCommercant(Commercant commercant) {
        this.commercants.add(commercant);
        commercant.setCooperative(this);
        return this;
    }

    public Cooperative removeCommercant(Commercant commercant) {
        this.commercants.remove(commercant);
        commercant.setCooperative(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Cooperative)) {
            return false;
        }
        return id != null && id.equals(((Cooperative) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Cooperative{" +
            "id=" + getId() +
            ", cooperativeName='" + getCooperativeName() + "'" +
            "}";
    }
}
