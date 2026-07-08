package project.backend.repositories;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import project.backend.entities.Room;

@Repository

public interface RoomRepository extends JpaRepository<Room, Long> {

}


