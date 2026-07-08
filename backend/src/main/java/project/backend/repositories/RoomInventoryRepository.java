package project.backend.repositories;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import project.backend.entities.RoomInventory;
import project.backend.entities.RoomInventoryId;

import java.time.LocalDate;

@Repository
public interface RoomInventoryRepository
        extends JpaRepository<RoomInventory, RoomInventoryId> {
    @Modifying
    @Query("UPDATE RoomInventory r SET r.availableCount = r.availableCount - :quantity " +
            "WHERE r.id.roomTypeId = :roomTypeId " +    // Sửa thành r.id.roomTypeId
            "AND r.id.date >= :checkIn " +              // Sửa thành r.id.date
            "AND r.id.date < :checkOut " +              // Sửa thành r.id.date
            "AND r.availableCount >= :quantity")
    int deductInventory(@Param("roomTypeId") Integer roomTypeId,
                        @Param("checkIn") LocalDate checkIn,
                        @Param("checkOut") LocalDate checkOut,
                        @Param("quantity") Integer quantity);

    @Query("SELECT MIN(r.availableCount) FROM RoomInventory r " +
            "WHERE r.id.roomTypeId = :roomTypeId " +    // Sửa thành r.id.roomTypeId
            "AND r.id.date >= :checkIn " +              // Sửa thành r.id.date
            "AND r.id.date < :checkOut")                // Sửa thành r.id.date
    Integer getMinAvailableRooms(@Param("roomTypeId") Integer roomTypeId,
                                 @Param("checkIn") LocalDate checkIn,
                                 @Param("checkOut") LocalDate checkOut);

}