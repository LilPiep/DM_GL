package polytech.info.gl.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import polytech.info.gl.domain.Commercant;

/**
 * Spring Data JPA repository for the Commercant entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CommercantRepository extends JpaRepository<Commercant, Long> {}
