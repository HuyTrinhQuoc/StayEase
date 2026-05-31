package project.backend.entities;



import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "room_inventory")
@Data
public class RoomInventory {

    @EmbeddedId
    private RoomInventoryId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("roomTypeId") // Map field roomTypeId của RoomInventoryId với Object RoomType
    @JoinColumn(name = "room_type_id")
    private RoomType roomType;

    @Column(nullable = false)
    private Integer availableCount;
}