package project.backend.dto;

import java.util.Map;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RoomMatrixResponse {
    private Integer roomTypeId;
    private String roomTypeName;
    // Chứa danh sách cặp dữ liệu: {"2026-07-07": 4, "2026-07-08": 2}
    private Map<String, Integer> inventoryMap;
}