package project.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.web.bind.annotation.*;
import project.backend.dto.ChatMessageDto;
import project.backend.services.ChatService;

@RestController
@RequestMapping("/api/chat")
@CrossOrigin("*")
public class ChatController {

    @Autowired
    private ChatService chatService;

    @MessageMapping("/chat.send")
    public void sendMessage(ChatMessageDto messageDto) {
        chatService.processAndSendMessage(messageDto);
    }

    @GetMapping("/my-room/{userId}")
    public ResponseEntity<?> getMyRoom(@PathVariable Integer userId) {
        return ResponseEntity.ok(chatService.getOrInitRoom(userId));
    }

    @GetMapping("/room/{roomId}/messages")
    public ResponseEntity<?> getRoomMessages(@PathVariable Integer roomId) {
        return ResponseEntity.ok(chatService.getMessages(roomId));
    }

    @GetMapping("/admin/rooms")
    public ResponseEntity<?> getAllRooms() {
        return ResponseEntity.ok(chatService.getAllRoomsForAdmin());
    }
}