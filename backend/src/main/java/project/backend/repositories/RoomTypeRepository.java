package project.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import project.backend.entities.RoomType;

@Repository
public interface RoomTypeRepository extends JpaRepository<RoomType, Integer> {

}