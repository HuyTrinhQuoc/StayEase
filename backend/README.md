StayEase
├── backend
│   ├── src
│   │   ├── main
│   │   │   ├── java
│   │   │   │   └── project
│   │   │   │       └── backend
│   │   │   │           ├── BackendApplication.java  <-- File chạy chính (Chứa CommandLineRunner)
│   │   │   │           │
│   │   │   │           ├── entities (hoặc models)
│   │   │   │           │   └── Hotel.java           <-- File thực thể (Map với bảng DB)
│   │   │   │           │
│   │   │   │           ├── repositories
│   │   │   │           │   └── HotelRepository.java <-- Nơi viết câu lệnh CUD/Read (Nếu có)
│   │   │   │           │
│   │   │   │           ├── services
│   │   │   │           │   └── HotelService.java    <-- Nơi xử lý logic nghiệp vụ
│   │   │   │           │
│   │   │   │           └── controllers
│   │   │   │               └── HotelController.java <-- Nơi tạo API (Get, Post) cho Frontend gọi
│   │   │   │
│   │   │   └── resources
│   │   │       └── application.properties           <-- File cấu hình kết nối Supabase
│   │   │
│   │   └── test (Thư mục chứa code test, tạm thời chưa dùng)
│   │
│   └── pom.xml (File quản lý thư viện Maven)