package polytech.info.gl.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import polytech.info.gl.web.rest.TestUtil;

class ZoneGeographiqueTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ZoneGeographique.class);
        ZoneGeographique zoneGeographique1 = new ZoneGeographique();
        zoneGeographique1.setId(1L);
        ZoneGeographique zoneGeographique2 = new ZoneGeographique();
        zoneGeographique2.setId(zoneGeographique1.getId());
        assertThat(zoneGeographique1).isEqualTo(zoneGeographique2);
        zoneGeographique2.setId(2L);
        assertThat(zoneGeographique1).isNotEqualTo(zoneGeographique2);
        zoneGeographique1.setId(null);
        assertThat(zoneGeographique1).isNotEqualTo(zoneGeographique2);
    }
}
