package project.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import project.backend.dto.ChatMessageDto;
import project.backend.dto.ChatRoomDto;
import project.backend.entities.ChatMessage;
import project.backend.entities.ChatRoom;
import project.backend.entities.User;
import project.backend.repositories.ChatMessageRepository;
import project.backend.repositories.ChatRoomRepository;
import project.backend.repositories.UserRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ChatService {
    @Autowired
    private ChatMessageRepository messageRepository;
    @Autowired
    private ChatRoomRepository roomRepository;
    @Autowired
    private SimpMessagingTemplate messagingTemplate;
    @Autowired
    private UserRepository userRepository;

    @Transactional
    public ChatMessageDto processAndSendMessage(ChatMessageDto dto) {
        ChatRoom room = roomRepository.findByIdWithUser(dto.getChatRoomId())
                .orElseThrow(() -> new RuntimeException("Room not found"));

        ChatMessage msg = new ChatMessage();
        msg.setChatRoom(room);
        msg.setSenderId(dto.getSenderId());
        msg.setMessage(dto.getMessage());
        msg.setMessageType(dto.getMessageType() != null ? dto.getMessageType() : "TEXT");
        msg = messageRepository.save(msg);

        room.setLastMessage(dto.getMessage());
        room.setLastMessageAt(LocalDateTime.now());
        room.setUpdatedAt(LocalDateTime.now());
        roomRepository.save(room);

        dto.setId(msg.getId());
        dto.setCreatedAt(msg.getCreatedAt());

        messagingTemplate.convertAndSend("/topic/room." + room.getId(), dto);

        try {
            messagingTemplate.convertAndSend("/topic/admin.rooms", mapToRoomDto(room));
        } catch (Exception e) {
            System.err.println("Lỗi gửi thông báo cho Admin: " + e.getMessage());
        }

        return dto;
    }

    @Transactional
    public ChatRoomDto getOrInitRoom(Integer userId) {
        ChatRoom room = roomRepository.findByUserIdWithUser(userId).orElseGet(() -> {
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new RuntimeException("User not found"));
            ChatRoom newRoom = new ChatRoom();
            newRoom.setUser(user);
            newRoom.setLastMessage("Bắt đầu cuộc trò chuyện");
            newRoom.setLastMessageAt(LocalDateTime.now());
            return roomRepository.save(newRoom);
        });
        return mapToRoomDto(room);
    }

    // Trả về List DTO thay vì List Entity
    public List<ChatMessageDto> getMessages(Integer roomId) {
        List<ChatMessage> messages = messageRepository.findByChatRoomIdOrderByCreatedAtAsc(roomId);
        return messages.stream().map(msg -> {
            ChatMessageDto dto = new ChatMessageDto();
            dto.setId(msg.getId());
            dto.setChatRoomId(msg.getChatRoom().getId());
            dto.setSenderId(msg.getSenderId());
            dto.setMessage(msg.getMessage());
            dto.setMessageType(msg.getMessageType());
            dto.setCreatedAt(msg.getCreatedAt());
            return dto;
        }).collect(Collectors.toList());
    }

    // Trả về List DTO cho Admin
    public List<ChatRoomDto> getAllRoomsForAdmin() {
        List<ChatRoom> rooms = roomRepository.findAllRoomsWithUser();
        return rooms.stream().map(this::mapToRoomDto).collect(Collectors.toList());
    }

    // Hàm chuyển đổi Entity sang DTO
    private ChatRoomDto mapToRoomDto(ChatRoom room) {
        ChatRoomDto dto = new ChatRoomDto();
        dto.setId(room.getId());
        dto.setLastMessage(room.getLastMessage());
        dto.setLastMessageAt(room.getLastMessageAt());

        if (room.getUser() != null) {
            ChatRoomDto.UserDto userDto = new ChatRoomDto.UserDto();
            userDto.setId(room.getUser().getId());
            userDto.setName(room.getUser().getName());
            userDto.setEmail(room.getUser().getEmail());
            dto.setUser(userDto);
        }
        return dto;
    }
}