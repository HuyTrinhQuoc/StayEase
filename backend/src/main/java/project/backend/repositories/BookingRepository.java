package project.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import project.backend.entities.Booking;

public interface BookingRepository extends JpaRepository<Booking, Integer> {
}
