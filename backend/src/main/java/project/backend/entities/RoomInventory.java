package project.backend.entities;



import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "room_inventory")
@Data
public class RoomInventory {

    @EmbeddedId
    private RoomInventoryId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("roomTypeId")
    @JoinColumn(name = "room_type_id")
    @JsonIgnore
    private RoomType roomType;

    @Column(nullable = false)
    private Integer availableCount;

    public Object getDate() {
        return id.getDate();
    }
}