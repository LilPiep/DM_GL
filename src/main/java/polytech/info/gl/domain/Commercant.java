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
 * A Commercant.
 */
@Entity
@Table(name = "commercant")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Commercant implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "commercant_id", nullable = false, unique = true)
    private Long commercantID;

    @Column(name = "commercant_type")
    private String commercantType;

    @Column(name = "shop_url")
    private String shopUrl;

    @ManyToOne
    @JsonIgnoreProperties(value = { "livreurs", "commercants" }, allowSetters = true)
    private Cooperative cooperative;

    @OneToMany(mappedBy = "commercant")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "zoneGeographique", "client", "livreur", "commercant" }, allowSetters = true)
    private Set<Commande> commandes = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Commercant id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getCommercantID() {
        return this.commercantID;
    }

    public Commercant commercantID(Long commercantID) {
        this.setCommercantID(commercantID);
        return this;
    }

    public void setCommercantID(Long commercantID) {
        this.commercantID = commercantID;
    }

    public String getCommercantType() {
        return this.commercantType;
    }

    public Commercant commercantType(String commercantType) {
        this.setCommercantType(commercantType);
        return this;
    }

    public void setCommercantType(String commercantType) {
        this.commercantType = commercantType;
    }

    public String getShopUrl() {
        return this.shopUrl;
    }

    public Commercant shopUrl(String shopUrl) {
        this.setShopUrl(shopUrl);
        return this;
    }

    public void setShopUrl(String shopUrl) {
        this.shopUrl = shopUrl;
    }

    public Cooperative getCooperative() {
        return this.cooperative;
    }

    public void setCooperative(Cooperative cooperative) {
        this.cooperative = cooperative;
    }

    public Commercant cooperative(Cooperative cooperative) {
        this.setCooperative(cooperative);
        return this;
    }

    public Set<Commande> getCommandes() {
        return this.commandes;
    }

    public void setCommandes(Set<Commande> commandes) {
        if (this.commandes != null) {
            this.commandes.forEach(i -> i.setCommercant(null));
        }
        if (commandes != null) {
            commandes.forEach(i -> i.setCommercant(this));
        }
        this.commandes = commandes;
    }

    public Commercant commandes(Set<Commande> commandes) {
        this.setCommandes(commandes);
        return this;
    }

    public Commercant addCommande(Commande commande) {
        this.commandes.add(commande);
        commande.setCommercant(this);
        return this;
    }

    public Commercant removeCommande(Commande commande) {
        this.commandes.remove(commande);
        commande.setCommercant(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Commercant)) {
            return false;
        }
        return id != null && id.equals(((Commercant) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Commercant{" +
            "id=" + getId() +
            ", commercantID=" + getCommercantID() +
            ", commercantType='" + getCommercantType() + "'" +
            ", shopUrl='" + getShopUrl() + "'" +
            "}";
    }
}
