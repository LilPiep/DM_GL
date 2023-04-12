package polytech.info.gl.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.Instant;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import polytech.info.gl.domain.enumeration.Paiement;

/**
 * A Commande.
 */
@Entity
@Table(name = "commande")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Commande implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "commande_id", nullable = false, unique = true)
    private Long commandeID;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "means_of_payment", nullable = false)
    private Paiement meansOfPayment;

    @Column(name = "deadline")
    private Instant deadline;

    @Column(name = "price")
    private Long price;

    @ManyToOne
    @JsonIgnoreProperties(value = { "commandes" }, allowSetters = true)
    private ZoneGeographique zoneGeographique;

    @ManyToOne
    @JsonIgnoreProperties(value = { "commandes" }, allowSetters = true)
    private Client client;

    @ManyToOne
    @JsonIgnoreProperties(value = { "cooperative", "commandes" }, allowSetters = true)
    private Livreur livreur;

    @ManyToOne
    @JsonIgnoreProperties(value = { "cooperative", "commandes" }, allowSetters = true)
    private Commercant commercant;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Commande id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getCommandeID() {
        return this.commandeID;
    }

    public Commande commandeID(Long commandeID) {
        this.setCommandeID(commandeID);
        return this;
    }

    public void setCommandeID(Long commandeID) {
        this.commandeID = commandeID;
    }

    public Paiement getMeansOfPayment() {
        return this.meansOfPayment;
    }

    public Commande meansOfPayment(Paiement meansOfPayment) {
        this.setMeansOfPayment(meansOfPayment);
        return this;
    }

    public void setMeansOfPayment(Paiement meansOfPayment) {
        this.meansOfPayment = meansOfPayment;
    }

    public Instant getDeadline() {
        return this.deadline;
    }

    public Commande deadline(Instant deadline) {
        this.setDeadline(deadline);
        return this;
    }

    public void setDeadline(Instant deadline) {
        this.deadline = deadline;
    }

    public Long getPrice() {
        return this.price;
    }

    public Commande price(Long price) {
        this.setPrice(price);
        return this;
    }

    public void setPrice(Long price) {
        this.price = price;
    }

    public ZoneGeographique getZoneGeographique() {
        return this.zoneGeographique;
    }

    public void setZoneGeographique(ZoneGeographique zoneGeographique) {
        this.zoneGeographique = zoneGeographique;
    }

    public Commande zoneGeographique(ZoneGeographique zoneGeographique) {
        this.setZoneGeographique(zoneGeographique);
        return this;
    }

    public Client getClient() {
        return this.client;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public Commande client(Client client) {
        this.setClient(client);
        return this;
    }

    public Livreur getLivreur() {
        return this.livreur;
    }

    public void setLivreur(Livreur livreur) {
        this.livreur = livreur;
    }

    public Commande livreur(Livreur livreur) {
        this.setLivreur(livreur);
        return this;
    }

    public Commercant getCommercant() {
        return this.commercant;
    }

    public void setCommercant(Commercant commercant) {
        this.commercant = commercant;
    }

    public Commande commercant(Commercant commercant) {
        this.setCommercant(commercant);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Commande)) {
            return false;
        }
        return id != null && id.equals(((Commande) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Commande{" +
            "id=" + getId() +
            ", commandeID=" + getCommandeID() +
            ", meansOfPayment='" + getMeansOfPayment() + "'" +
            ", deadline='" + getDeadline() + "'" +
            ", price=" + getPrice() +
            "}";
    }
}
