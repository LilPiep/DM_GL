package polytech.info.gl.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import polytech.info.gl.domain.ZoneGeographique;
import polytech.info.gl.repository.ZoneGeographiqueRepository;
import polytech.info.gl.web.rest.errors.BadRequestAlertException;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link polytech.info.gl.domain.ZoneGeographique}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ZoneGeographiqueResource {

    private final Logger log = LoggerFactory.getLogger(ZoneGeographiqueResource.class);

    private static final String ENTITY_NAME = "zoneGeographique";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ZoneGeographiqueRepository zoneGeographiqueRepository;

    public ZoneGeographiqueResource(ZoneGeographiqueRepository zoneGeographiqueRepository) {
        this.zoneGeographiqueRepository = zoneGeographiqueRepository;
    }

    /**
     * {@code POST  /zone-geographiques} : Create a new zoneGeographique.
     *
     * @param zoneGeographique the zoneGeographique to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new zoneGeographique, or with status {@code 400 (Bad Request)} if the zoneGeographique has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/zone-geographiques")
    public ResponseEntity<ZoneGeographique> createZoneGeographique(@RequestBody ZoneGeographique zoneGeographique)
        throws URISyntaxException {
        log.debug("REST request to save ZoneGeographique : {}", zoneGeographique);
        if (zoneGeographique.getId() != null) {
            throw new BadRequestAlertException("A new zoneGeographique cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ZoneGeographique result = zoneGeographiqueRepository.save(zoneGeographique);
        return ResponseEntity
            .created(new URI("/api/zone-geographiques/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /zone-geographiques/:id} : Updates an existing zoneGeographique.
     *
     * @param id the id of the zoneGeographique to save.
     * @param zoneGeographique the zoneGeographique to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated zoneGeographique,
     * or with status {@code 400 (Bad Request)} if the zoneGeographique is not valid,
     * or with status {@code 500 (Internal Server Error)} if the zoneGeographique couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/zone-geographiques/{id}")
    public ResponseEntity<ZoneGeographique> updateZoneGeographique(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody ZoneGeographique zoneGeographique
    ) throws URISyntaxException {
        log.debug("REST request to update ZoneGeographique : {}, {}", id, zoneGeographique);
        if (zoneGeographique.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, zoneGeographique.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!zoneGeographiqueRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        ZoneGeographique result = zoneGeographiqueRepository.save(zoneGeographique);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, zoneGeographique.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /zone-geographiques/:id} : Partial updates given fields of an existing zoneGeographique, field will ignore if it is null
     *
     * @param id the id of the zoneGeographique to save.
     * @param zoneGeographique the zoneGeographique to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated zoneGeographique,
     * or with status {@code 400 (Bad Request)} if the zoneGeographique is not valid,
     * or with status {@code 404 (Not Found)} if the zoneGeographique is not found,
     * or with status {@code 500 (Internal Server Error)} if the zoneGeographique couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/zone-geographiques/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<ZoneGeographique> partialUpdateZoneGeographique(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody ZoneGeographique zoneGeographique
    ) throws URISyntaxException {
        log.debug("REST request to partial update ZoneGeographique partially : {}, {}", id, zoneGeographique);
        if (zoneGeographique.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, zoneGeographique.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!zoneGeographiqueRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<ZoneGeographique> result = zoneGeographiqueRepository
            .findById(zoneGeographique.getId())
            .map(existingZoneGeographique -> {
                if (zoneGeographique.getZoneAddress() != null) {
                    existingZoneGeographique.setZoneAddress(zoneGeographique.getZoneAddress());
                }

                return existingZoneGeographique;
            })
            .map(zoneGeographiqueRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, zoneGeographique.getId().toString())
        );
    }

    /**
     * {@code GET  /zone-geographiques} : get all the zoneGeographiques.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of zoneGeographiques in body.
     */
    @GetMapping("/zone-geographiques")
    public List<ZoneGeographique> getAllZoneGeographiques() {
        log.debug("REST request to get all ZoneGeographiques");
        return zoneGeographiqueRepository.findAll();
    }

    /**
     * {@code GET  /zone-geographiques/:id} : get the "id" zoneGeographique.
     *
     * @param id the id of the zoneGeographique to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the zoneGeographique, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/zone-geographiques/{id}")
    public ResponseEntity<ZoneGeographique> getZoneGeographique(@PathVariable Long id) {
        log.debug("REST request to get ZoneGeographique : {}", id);
        Optional<ZoneGeographique> zoneGeographique = zoneGeographiqueRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(zoneGeographique);
    }

    /**
     * {@code DELETE  /zone-geographiques/:id} : delete the "id" zoneGeographique.
     *
     * @param id the id of the zoneGeographique to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/zone-geographiques/{id}")
    public ResponseEntity<Void> deleteZoneGeographique(@PathVariable Long id) {
        log.debug("REST request to delete ZoneGeographique : {}", id);
        zoneGeographiqueRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
