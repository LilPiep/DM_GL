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
import polytech.info.gl.domain.Commercant;
import polytech.info.gl.repository.CommercantRepository;

/**
 * Integration tests for the {@link CommercantResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class CommercantResourceIT {

    private static final Long DEFAULT_COMMERCANT_ID = 1L;
    private static final Long UPDATED_COMMERCANT_ID = 2L;

    private static final String DEFAULT_COMMERCANT_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_COMMERCANT_TYPE = "BBBBBBBBBB";

    private static final String DEFAULT_SHOP_URL = "AAAAAAAAAA";
    private static final String UPDATED_SHOP_URL = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/commercants";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private CommercantRepository commercantRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restCommercantMockMvc;

    private Commercant commercant;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Commercant createEntity(EntityManager em) {
        Commercant commercant = new Commercant()
            .commercantID(DEFAULT_COMMERCANT_ID)
            .commercantType(DEFAULT_COMMERCANT_TYPE)
            .shopUrl(DEFAULT_SHOP_URL);
        return commercant;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Commercant createUpdatedEntity(EntityManager em) {
        Commercant commercant = new Commercant()
            .commercantID(UPDATED_COMMERCANT_ID)
            .commercantType(UPDATED_COMMERCANT_TYPE)
            .shopUrl(UPDATED_SHOP_URL);
        return commercant;
    }

    @BeforeEach
    public void initTest() {
        commercant = createEntity(em);
    }

    @Test
    @Transactional
    void createCommercant() throws Exception {
        int databaseSizeBeforeCreate = commercantRepository.findAll().size();
        // Create the Commercant
        restCommercantMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(commercant)))
            .andExpect(status().isCreated());

        // Validate the Commercant in the database
        List<Commercant> commercantList = commercantRepository.findAll();
        assertThat(commercantList).hasSize(databaseSizeBeforeCreate + 1);
        Commercant testCommercant = commercantList.get(commercantList.size() - 1);
        assertThat(testCommercant.getCommercantID()).isEqualTo(DEFAULT_COMMERCANT_ID);
        assertThat(testCommercant.getCommercantType()).isEqualTo(DEFAULT_COMMERCANT_TYPE);
        assertThat(testCommercant.getShopUrl()).isEqualTo(DEFAULT_SHOP_URL);
    }

    @Test
    @Transactional
    void createCommercantWithExistingId() throws Exception {
        // Create the Commercant with an existing ID
        commercant.setId(1L);

        int databaseSizeBeforeCreate = commercantRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restCommercantMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(commercant)))
            .andExpect(status().isBadRequest());

        // Validate the Commercant in the database
        List<Commercant> commercantList = commercantRepository.findAll();
        assertThat(commercantList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkCommercantIDIsRequired() throws Exception {
        int databaseSizeBeforeTest = commercantRepository.findAll().size();
        // set the field null
        commercant.setCommercantID(null);

        // Create the Commercant, which fails.

        restCommercantMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(commercant)))
            .andExpect(status().isBadRequest());

        List<Commercant> commercantList = commercantRepository.findAll();
        assertThat(commercantList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllCommercants() throws Exception {
        // Initialize the database
        commercantRepository.saveAndFlush(commercant);

        // Get all the commercantList
        restCommercantMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(commercant.getId().intValue())))
            .andExpect(jsonPath("$.[*].commercantID").value(hasItem(DEFAULT_COMMERCANT_ID.intValue())))
            .andExpect(jsonPath("$.[*].commercantType").value(hasItem(DEFAULT_COMMERCANT_TYPE)))
            .andExpect(jsonPath("$.[*].shopUrl").value(hasItem(DEFAULT_SHOP_URL)));
    }

    @Test
    @Transactional
    void getCommercant() throws Exception {
        // Initialize the database
        commercantRepository.saveAndFlush(commercant);

        // Get the commercant
        restCommercantMockMvc
            .perform(get(ENTITY_API_URL_ID, commercant.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(commercant.getId().intValue()))
            .andExpect(jsonPath("$.commercantID").value(DEFAULT_COMMERCANT_ID.intValue()))
            .andExpect(jsonPath("$.commercantType").value(DEFAULT_COMMERCANT_TYPE))
            .andExpect(jsonPath("$.shopUrl").value(DEFAULT_SHOP_URL));
    }

    @Test
    @Transactional
    void getNonExistingCommercant() throws Exception {
        // Get the commercant
        restCommercantMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingCommercant() throws Exception {
        // Initialize the database
        commercantRepository.saveAndFlush(commercant);

        int databaseSizeBeforeUpdate = commercantRepository.findAll().size();

        // Update the commercant
        Commercant updatedCommercant = commercantRepository.findById(commercant.getId()).get();
        // Disconnect from session so that the updates on updatedCommercant are not directly saved in db
        em.detach(updatedCommercant);
        updatedCommercant.commercantID(UPDATED_COMMERCANT_ID).commercantType(UPDATED_COMMERCANT_TYPE).shopUrl(UPDATED_SHOP_URL);

        restCommercantMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedCommercant.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedCommercant))
            )
            .andExpect(status().isOk());

        // Validate the Commercant in the database
        List<Commercant> commercantList = commercantRepository.findAll();
        assertThat(commercantList).hasSize(databaseSizeBeforeUpdate);
        Commercant testCommercant = commercantList.get(commercantList.size() - 1);
        assertThat(testCommercant.getCommercantID()).isEqualTo(UPDATED_COMMERCANT_ID);
        assertThat(testCommercant.getCommercantType()).isEqualTo(UPDATED_COMMERCANT_TYPE);
        assertThat(testCommercant.getShopUrl()).isEqualTo(UPDATED_SHOP_URL);
    }

    @Test
    @Transactional
    void putNonExistingCommercant() throws Exception {
        int databaseSizeBeforeUpdate = commercantRepository.findAll().size();
        commercant.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCommercantMockMvc
            .perform(
                put(ENTITY_API_URL_ID, commercant.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(commercant))
            )
            .andExpect(status().isBadRequest());

        // Validate the Commercant in the database
        List<Commercant> commercantList = commercantRepository.findAll();
        assertThat(commercantList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchCommercant() throws Exception {
        int databaseSizeBeforeUpdate = commercantRepository.findAll().size();
        commercant.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCommercantMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(commercant))
            )
            .andExpect(status().isBadRequest());

        // Validate the Commercant in the database
        List<Commercant> commercantList = commercantRepository.findAll();
        assertThat(commercantList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamCommercant() throws Exception {
        int databaseSizeBeforeUpdate = commercantRepository.findAll().size();
        commercant.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCommercantMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(commercant)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Commercant in the database
        List<Commercant> commercantList = commercantRepository.findAll();
        assertThat(commercantList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateCommercantWithPatch() throws Exception {
        // Initialize the database
        commercantRepository.saveAndFlush(commercant);

        int databaseSizeBeforeUpdate = commercantRepository.findAll().size();

        // Update the commercant using partial update
        Commercant partialUpdatedCommercant = new Commercant();
        partialUpdatedCommercant.setId(commercant.getId());

        partialUpdatedCommercant.commercantID(UPDATED_COMMERCANT_ID).commercantType(UPDATED_COMMERCANT_TYPE).shopUrl(UPDATED_SHOP_URL);

        restCommercantMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCommercant.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedCommercant))
            )
            .andExpect(status().isOk());

        // Validate the Commercant in the database
        List<Commercant> commercantList = commercantRepository.findAll();
        assertThat(commercantList).hasSize(databaseSizeBeforeUpdate);
        Commercant testCommercant = commercantList.get(commercantList.size() - 1);
        assertThat(testCommercant.getCommercantID()).isEqualTo(UPDATED_COMMERCANT_ID);
        assertThat(testCommercant.getCommercantType()).isEqualTo(UPDATED_COMMERCANT_TYPE);
        assertThat(testCommercant.getShopUrl()).isEqualTo(UPDATED_SHOP_URL);
    }

    @Test
    @Transactional
    void fullUpdateCommercantWithPatch() throws Exception {
        // Initialize the database
        commercantRepository.saveAndFlush(commercant);

        int databaseSizeBeforeUpdate = commercantRepository.findAll().size();

        // Update the commercant using partial update
        Commercant partialUpdatedCommercant = new Commercant();
        partialUpdatedCommercant.setId(commercant.getId());

        partialUpdatedCommercant.commercantID(UPDATED_COMMERCANT_ID).commercantType(UPDATED_COMMERCANT_TYPE).shopUrl(UPDATED_SHOP_URL);

        restCommercantMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCommercant.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedCommercant))
            )
            .andExpect(status().isOk());

        // Validate the Commercant in the database
        List<Commercant> commercantList = commercantRepository.findAll();
        assertThat(commercantList).hasSize(databaseSizeBeforeUpdate);
        Commercant testCommercant = commercantList.get(commercantList.size() - 1);
        assertThat(testCommercant.getCommercantID()).isEqualTo(UPDATED_COMMERCANT_ID);
        assertThat(testCommercant.getCommercantType()).isEqualTo(UPDATED_COMMERCANT_TYPE);
        assertThat(testCommercant.getShopUrl()).isEqualTo(UPDATED_SHOP_URL);
    }

    @Test
    @Transactional
    void patchNonExistingCommercant() throws Exception {
        int databaseSizeBeforeUpdate = commercantRepository.findAll().size();
        commercant.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCommercantMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, commercant.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(commercant))
            )
            .andExpect(status().isBadRequest());

        // Validate the Commercant in the database
        List<Commercant> commercantList = commercantRepository.findAll();
        assertThat(commercantList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchCommercant() throws Exception {
        int databaseSizeBeforeUpdate = commercantRepository.findAll().size();
        commercant.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCommercantMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(commercant))
            )
            .andExpect(status().isBadRequest());

        // Validate the Commercant in the database
        List<Commercant> commercantList = commercantRepository.findAll();
        assertThat(commercantList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamCommercant() throws Exception {
        int databaseSizeBeforeUpdate = commercantRepository.findAll().size();
        commercant.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCommercantMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(commercant))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the Commercant in the database
        List<Commercant> commercantList = commercantRepository.findAll();
        assertThat(commercantList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteCommercant() throws Exception {
        // Initialize the database
        commercantRepository.saveAndFlush(commercant);

        int databaseSizeBeforeDelete = commercantRepository.findAll().size();

        // Delete the commercant
        restCommercantMockMvc
            .perform(delete(ENTITY_API_URL_ID, commercant.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Commercant> commercantList = commercantRepository.findAll();
        assertThat(commercantList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
