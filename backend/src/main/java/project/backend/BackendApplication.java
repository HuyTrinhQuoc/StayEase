package project.backend;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import project.backend.entities.Hotel;
import project.backend.repositories.HotelRepository;

@SpringBootApplication
public class BackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }

    @Bean
    public CommandLineRunner testDatabase(HotelRepository hotelRepository) {
        return args -> {
            System.out.println("========== BẮT ĐẦU TEST KẾT NỐI ==========");

            // 1. Tạo đối tượng khách sạn mới
            Hotel hotel = new Hotel();
            hotel.setName("StayEase Luxury Hotel");
            hotel.setAddress("123 Nguyen Hue, Ho Chi Minh City");

            // 2. Dùng repository để lưu (An toàn, không lo thiếu Transaction)
            hotelRepository.save(hotel);

            System.out.println("========== ĐÃ LƯU THÀNH CÔNG VÀO SUPABASE! ==========");
        };
    }
}