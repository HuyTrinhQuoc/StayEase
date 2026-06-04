package project.backend.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import project.backend.services.RoomInventoryService;

import java.time.LocalDate;

@RestController
@RequestMapping("/api/v1/availability")
@RequiredArgsConstructor
public class AvailabilityController {

    private final RoomInventoryService roomInventoryService;

    @GetMapping
    public Integer getAvailableRooms(
            @RequestParam Integer roomTypeId,
            @RequestParam LocalDate checkIn,
            @RequestParam LocalDate checkOut
    ) {
        return roomInventoryService.getAvailableRooms(
                roomTypeId,
                checkIn,
                checkOut
        );
    }
}