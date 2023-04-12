package polytech.info.gl.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import polytech.info.gl.domain.Livreur;

/**
 * Spring Data JPA repository for the Livreur entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LivreurRepository extends JpaRepository<Livreur, Long> {}
