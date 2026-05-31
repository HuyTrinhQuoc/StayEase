package project.backend.entities;

// File: RoomInventoryId.java (Khóa chính phức hợp)


import jakarta.persistence.Embeddable;
import lombok.Data;
import java.io.Serializable;
import java.time.LocalDate;

@Embeddable
@Data
public class RoomInventoryId implements Serializable {
    private Integer roomTypeId;
    private LocalDate date;
}