package project.backend.dto;

import java.time.LocalDateTime;

public class ChatRoomDto {
    private Integer id;
    private UserDto user;
    private String lastMessage;
    private LocalDateTime lastMessageAt;

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }
    public UserDto getUser() { return user; }
    public void setUser(UserDto user) { this.user = user; }
    public String getLastMessage() { return lastMessage; }
    public void setLastMessage(String lastMessage) { this.lastMessage = lastMessage; }
    public LocalDateTime getLastMessageAt() { return lastMessageAt; }
    public void setLastMessageAt(LocalDateTime lastMessageAt) { this.lastMessageAt = lastMessageAt; }

    // Inner class chứa thông tin User thu gọn
    public static class UserDto {
        private Integer id;
        private String name;
        private String email;

        public Integer getId() { return id; }
        public void setId(Integer id) { this.id = id; }
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
    }
}