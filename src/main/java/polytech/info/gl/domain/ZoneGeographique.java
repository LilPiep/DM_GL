package polytech.info.gl.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A ZoneGeographique.
 */
@Entity
@Table(name = "zone_geographique")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class ZoneGeographique implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "zone_address")
    private String zoneAddress;

    @OneToMany(mappedBy = "zoneGeographique")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "zoneGeographique", "client", "livreur", "commercant" }, allowSetters = true)
    private Set<Commande> commandes = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public ZoneGeographique id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getZoneAddress() {
        return this.zoneAddress;
    }

    public ZoneGeographique zoneAddress(String zoneAddress) {
        this.setZoneAddress(zoneAddress);
        return this;
    }

    public void setZoneAddress(String zoneAddress) {
        this.zoneAddress = zoneAddress;
    }

    public Set<Commande> getCommandes() {
        return this.commandes;
    }

    public void setCommandes(Set<Commande> commandes) {
        if (this.commandes != null) {
            this.commandes.forEach(i -> i.setZoneGeographique(null));
        }
        if (commandes != null) {
            commandes.forEach(i -> i.setZoneGeographique(this));
        }
        this.commandes = commandes;
    }

    public ZoneGeographique commandes(Set<Commande> commandes) {
        this.setCommandes(commandes);
        return this;
    }

    public ZoneGeographique addCommande(Commande commande) {
        this.commandes.add(commande);
        commande.setZoneGeographique(this);
        return this;
    }

    public ZoneGeographique removeCommande(Commande commande) {
        this.commandes.remove(commande);
        commande.setZoneGeographique(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ZoneGeographique)) {
            return false;
        }
        return id != null && id.equals(((ZoneGeographique) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ZoneGeographique{" +
            "id=" + getId() +
            ", zoneAddress='" + getZoneAddress() + "'" +
            "}";
    }
}
