package project.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import project.backend.entities.Payment;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Integer> {

    // Optional<Payment> findByTransactionNo(String transactionNo);

}