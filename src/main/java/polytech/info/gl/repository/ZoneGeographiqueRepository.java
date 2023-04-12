package polytech.info.gl.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import polytech.info.gl.domain.ZoneGeographique;

/**
 * Spring Data JPA repository for the ZoneGeographique entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ZoneGeographiqueRepository extends JpaRepository<ZoneGeographique, Long> {}
