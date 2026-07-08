package project.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import project.backend.entities.ChatRoom;

import java.util.List;
import java.util.Optional;

@Repository
public interface ChatRoomRepository extends JpaRepository<ChatRoom, Integer> {

    // Chủ động Join Fetch User để tránh lỗi Lazy khi lấy phòng theo User ID
    @Query("SELECT r FROM ChatRoom r JOIN FETCH r.user WHERE r.user.id = :userId")
    Optional<ChatRoom> findByUserIdWithUser(@Param("userId") Integer userId);

    // Dành cho Admin lấy danh sách có sẵn thông tin User, sắp xếp tin nhắn mới nhất
    @Query("SELECT r FROM ChatRoom r JOIN FETCH r.user ORDER BY r.lastMessageAt DESC")
    List<ChatRoom> findAllRoomsWithUser();

    @Query("SELECT r FROM ChatRoom r JOIN FETCH r.user WHERE r.id = :id")
    Optional<ChatRoom> findByIdWithUser(@Param("id") Integer id);
}