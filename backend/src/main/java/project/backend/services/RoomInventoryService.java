package project.backend.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import project.backend.repositories.RoomInventoryRepository;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class RoomInventoryService {

    private final RoomInventoryRepository roomInventoryRepository;

    public Integer getAvailableRooms(
            Integer roomTypeId,
            LocalDate checkIn,
            LocalDate checkOut
    ) {

        Integer available =
                roomInventoryRepository.getMinAvailableRooms(
                        roomTypeId,
                        checkIn,
                        checkOut
                );

        return available == null ? 0 : available;
    }
}