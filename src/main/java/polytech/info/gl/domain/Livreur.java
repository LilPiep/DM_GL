package polytech.info.gl.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Livreur.
 */
@Entity
@Table(name = "livreur")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Livreur implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "livreur_name", nullable = false, unique = true)
    private String livreurName;

    @Column(name = "livreur_id")
    private Long livreurID;

    @ManyToOne
    @JsonIgnoreProperties(value = { "livreurs", "commercants" }, allowSetters = true)
    private Cooperative cooperative;

    @OneToMany(mappedBy = "livreur")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "zoneGeographique", "client", "livreur", "commercant" }, allowSetters = true)
    private Set<Commande> commandes = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Livreur id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLivreurName() {
        return this.livreurName;
    }

    public Livreur livreurName(String livreurName) {
        this.setLivreurName(livreurName);
        return this;
    }

    public void setLivreurName(String livreurName) {
        this.livreurName = livreurName;
    }

    public Long getLivreurID() {
        return this.livreurID;
    }

    public Livreur livreurID(Long livreurID) {
        this.setLivreurID(livreurID);
        return this;
    }

    public void setLivreurID(Long livreurID) {
        this.livreurID = livreurID;
    }

    public Cooperative getCooperative() {
        return this.cooperative;
    }

    public void setCooperative(Cooperative cooperative) {
        this.cooperative = cooperative;
    }

    public Livreur cooperative(Cooperative cooperative) {
        this.setCooperative(cooperative);
        return this;
    }

    public Set<Commande> getCommandes() {
        return this.commandes;
    }

    public void setCommandes(Set<Commande> commandes) {
        if (this.commandes != null) {
            this.commandes.forEach(i -> i.setLivreur(null));
        }
        if (commandes != null) {
            commandes.forEach(i -> i.setLivreur(this));
        }
        this.commandes = commandes;
    }

    public Livreur commandes(Set<Commande> commandes) {
        this.setCommandes(commandes);
        return this;
    }

    public Livreur addCommande(Commande commande) {
        this.commandes.add(commande);
        commande.setLivreur(this);
        return this;
    }

    public Livreur removeCommande(Commande commande) {
        this.commandes.remove(commande);
        commande.setLivreur(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Livreur)) {
            return false;
        }
        return id != null && id.equals(((Livreur) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Livreur{" +
            "id=" + getId() +
            ", livreurName='" + getLivreurName() + "'" +
            ", livreurID=" + getLivreurID() +
            "}";
    }
}
