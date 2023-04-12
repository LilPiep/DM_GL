package polytech.info.gl.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import polytech.info.gl.IntegrationTest;
import polytech.info.gl.domain.ZoneGeographique;
import polytech.info.gl.repository.ZoneGeographiqueRepository;

/**
 * Integration tests for the {@link ZoneGeographiqueResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class ZoneGeographiqueResourceIT {

    private static final String DEFAULT_ZONE_ADDRESS = "AAAAAAAAAA";
    private static final String UPDATED_ZONE_ADDRESS = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/zone-geographiques";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ZoneGeographiqueRepository zoneGeographiqueRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restZoneGeographiqueMockMvc;

    private ZoneGeographique zoneGeographique;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ZoneGeographique createEntity(EntityManager em) {
        ZoneGeographique zoneGeographique = new ZoneGeographique().zoneAddress(DEFAULT_ZONE_ADDRESS);
        return zoneGeographique;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ZoneGeographique createUpdatedEntity(EntityManager em) {
        ZoneGeographique zoneGeographique = new ZoneGeographique().zoneAddress(UPDATED_ZONE_ADDRESS);
        return zoneGeographique;
    }

    @BeforeEach
    public void initTest() {
        zoneGeographique = createEntity(em);
    }

    @Test
    @Transactional
    void createZoneGeographique() throws Exception {
        int databaseSizeBeforeCreate = zoneGeographiqueRepository.findAll().size();
        // Create the ZoneGeographique
        restZoneGeographiqueMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(zoneGeographique))
            )
            .andExpect(status().isCreated());

        // Validate the ZoneGeographique in the database
        List<ZoneGeographique> zoneGeographiqueList = zoneGeographiqueRepository.findAll();
        assertThat(zoneGeographiqueList).hasSize(databaseSizeBeforeCreate + 1);
        ZoneGeographique testZoneGeographique = zoneGeographiqueList.get(zoneGeographiqueList.size() - 1);
        assertThat(testZoneGeographique.getZoneAddress()).isEqualTo(DEFAULT_ZONE_ADDRESS);
    }

    @Test
    @Transactional
    void createZoneGeographiqueWithExistingId() throws Exception {
        // Create the ZoneGeographique with an existing ID
        zoneGeographique.setId(1L);

        int databaseSizeBeforeCreate = zoneGeographiqueRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restZoneGeographiqueMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(zoneGeographique))
            )
            .andExpect(status().isBadRequest());

        // Validate the ZoneGeographique in the database
        List<ZoneGeographique> zoneGeographiqueList = zoneGeographiqueRepository.findAll();
        assertThat(zoneGeographiqueList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllZoneGeographiques() throws Exception {
        // Initialize the database
        zoneGeographiqueRepository.saveAndFlush(zoneGeographique);

        // Get all the zoneGeographiqueList
        restZoneGeographiqueMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(zoneGeographique.getId().intValue())))
            .andExpect(jsonPath("$.[*].zoneAddress").value(hasItem(DEFAULT_ZONE_ADDRESS)));
    }

    @Test
    @Transactional
    void getZoneGeographique() throws Exception {
        // Initialize the database
        zoneGeographiqueRepository.saveAndFlush(zoneGeographique);

        // Get the zoneGeographique
        restZoneGeographiqueMockMvc
            .perform(get(ENTITY_API_URL_ID, zoneGeographique.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(zoneGeographique.getId().intValue()))
            .andExpect(jsonPath("$.zoneAddress").value(DEFAULT_ZONE_ADDRESS));
    }

    @Test
    @Transactional
    void getNonExistingZoneGeographique() throws Exception {
        // Get the zoneGeographique
        restZoneGeographiqueMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingZoneGeographique() throws Exception {
        // Initialize the database
        zoneGeographiqueRepository.saveAndFlush(zoneGeographique);

        int databaseSizeBeforeUpdate = zoneGeographiqueRepository.findAll().size();

        // Update the zoneGeographique
        ZoneGeographique updatedZoneGeographique = zoneGeographiqueRepository.findById(zoneGeographique.getId()).get();
        // Disconnect from session so that the updates on updatedZoneGeographique are not directly saved in db
        em.detach(updatedZoneGeographique);
        updatedZoneGeographique.zoneAddress(UPDATED_ZONE_ADDRESS);

        restZoneGeographiqueMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedZoneGeographique.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedZoneGeographique))
            )
            .andExpect(status().isOk());

        // Validate the ZoneGeographique in the database
        List<ZoneGeographique> zoneGeographiqueList = zoneGeographiqueRepository.findAll();
        assertThat(zoneGeographiqueList).hasSize(databaseSizeBeforeUpdate);
        ZoneGeographique testZoneGeographique = zoneGeographiqueList.get(zoneGeographiqueList.size() - 1);
        assertThat(testZoneGeographique.getZoneAddress()).isEqualTo(UPDATED_ZONE_ADDRESS);
    }

    @Test
    @Transactional
    void putNonExistingZoneGeographique() throws Exception {
        int databaseSizeBeforeUpdate = zoneGeographiqueRepository.findAll().size();
        zoneGeographique.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restZoneGeographiqueMockMvc
            .perform(
                put(ENTITY_API_URL_ID, zoneGeographique.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(zoneGeographique))
            )
            .andExpect(status().isBadRequest());

        // Validate the ZoneGeographique in the database
        List<ZoneGeographique> zoneGeographiqueList = zoneGeographiqueRepository.findAll();
        assertThat(zoneGeographiqueList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchZoneGeographique() throws Exception {
        int databaseSizeBeforeUpdate = zoneGeographiqueRepository.findAll().size();
        zoneGeographique.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restZoneGeographiqueMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(zoneGeographique))
            )
            .andExpect(status().isBadRequest());

        // Validate the ZoneGeographique in the database
        List<ZoneGeographique> zoneGeographiqueList = zoneGeographiqueRepository.findAll();
        assertThat(zoneGeographiqueList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamZoneGeographique() throws Exception {
        int databaseSizeBeforeUpdate = zoneGeographiqueRepository.findAll().size();
        zoneGeographique.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restZoneGeographiqueMockMvc
            .perform(
                put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(zoneGeographique))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the ZoneGeographique in the database
        List<ZoneGeographique> zoneGeographiqueList = zoneGeographiqueRepository.findAll();
        assertThat(zoneGeographiqueList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateZoneGeographiqueWithPatch() throws Exception {
        // Initialize the database
        zoneGeographiqueRepository.saveAndFlush(zoneGeographique);

        int databaseSizeBeforeUpdate = zoneGeographiqueRepository.findAll().size();

        // Update the zoneGeographique using partial update
        ZoneGeographique partialUpdatedZoneGeographique = new ZoneGeographique();
        partialUpdatedZoneGeographique.setId(zoneGeographique.getId());

        partialUpdatedZoneGeographique.zoneAddress(UPDATED_ZONE_ADDRESS);

        restZoneGeographiqueMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedZoneGeographique.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedZoneGeographique))
            )
            .andExpect(status().isOk());

        // Validate the ZoneGeographique in the database
        List<ZoneGeographique> zoneGeographiqueList = zoneGeographiqueRepository.findAll();
        assertThat(zoneGeographiqueList).hasSize(databaseSizeBeforeUpdate);
        ZoneGeographique testZoneGeographique = zoneGeographiqueList.get(zoneGeographiqueList.size() - 1);
        assertThat(testZoneGeographique.getZoneAddress()).isEqualTo(UPDATED_ZONE_ADDRESS);
    }

    @Test
    @Transactional
    void fullUpdateZoneGeographiqueWithPatch() throws Exception {
        // Initialize the database
        zoneGeographiqueRepository.saveAndFlush(zoneGeographique);

        int databaseSizeBeforeUpdate = zoneGeographiqueRepository.findAll().size();

        // Update the zoneGeographique using partial update
        ZoneGeographique partialUpdatedZoneGeographique = new ZoneGeographique();
        partialUpdatedZoneGeographique.setId(zoneGeographique.getId());

        partialUpdatedZoneGeographique.zoneAddress(UPDATED_ZONE_ADDRESS);

        restZoneGeographiqueMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedZoneGeographique.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedZoneGeographique))
            )
            .andExpect(status().isOk());

        // Validate the ZoneGeographique in the database
        List<ZoneGeographique> zoneGeographiqueList = zoneGeographiqueRepository.findAll();
        assertThat(zoneGeographiqueList).hasSize(databaseSizeBeforeUpdate);
        ZoneGeographique testZoneGeographique = zoneGeographiqueList.get(zoneGeographiqueList.size() - 1);
        assertThat(testZoneGeographique.getZoneAddress()).isEqualTo(UPDATED_ZONE_ADDRESS);
    }

    @Test
    @Transactional
    void patchNonExistingZoneGeographique() throws Exception {
        int databaseSizeBeforeUpdate = zoneGeographiqueRepository.findAll().size();
        zoneGeographique.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restZoneGeographiqueMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, zoneGeographique.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(zoneGeographique))
            )
            .andExpect(status().isBadRequest());

        // Validate the ZoneGeographique in the database
        List<ZoneGeographique> zoneGeographiqueList = zoneGeographiqueRepository.findAll();
        assertThat(zoneGeographiqueList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchZoneGeographique() throws Exception {
        int databaseSizeBeforeUpdate = zoneGeographiqueRepository.findAll().size();
        zoneGeographique.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restZoneGeographiqueMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(zoneGeographique))
            )
            .andExpect(status().isBadRequest());

        // Validate the ZoneGeographique in the database
        List<ZoneGeographique> zoneGeographiqueList = zoneGeographiqueRepository.findAll();
        assertThat(zoneGeographiqueList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamZoneGeographique() throws Exception {
        int databaseSizeBeforeUpdate = zoneGeographiqueRepository.findAll().size();
        zoneGeographique.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restZoneGeographiqueMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(zoneGeographique))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the ZoneGeographique in the database
        List<ZoneGeographique> zoneGeographiqueList = zoneGeographiqueRepository.findAll();
        assertThat(zoneGeographiqueList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteZoneGeographique() throws Exception {
        // Initialize the database
        zoneGeographiqueRepository.saveAndFlush(zoneGeographique);

        int databaseSizeBeforeDelete = zoneGeographiqueRepository.findAll().size();

        // Delete the zoneGeographique
        restZoneGeographiqueMockMvc
            .perform(delete(ENTITY_API_URL_ID, zoneGeographique.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ZoneGeographique> zoneGeographiqueList = zoneGeographiqueRepository.findAll();
        assertThat(zoneGeographiqueList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
