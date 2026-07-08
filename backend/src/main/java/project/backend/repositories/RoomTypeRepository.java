package project.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import project.backend.entities.RoomType;

@Repository
public interface RoomTypeRepository extends JpaRepository<RoomType, Integer> {

    @Modifying
    @Query("UPDATE RoomType r SET r.basePricePerNight = :price WHERE r.id = :id")
    int updateRoomPriceOnly(@Param("id") Integer id, @Param("price") Double price);
}