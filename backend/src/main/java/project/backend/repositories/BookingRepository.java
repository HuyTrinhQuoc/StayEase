package project.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import project.backend.entities.Booking;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Integer> {
}
