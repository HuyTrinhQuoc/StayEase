# StayEase
# StayEase - Hotel Booking System

## Tech Stack
- Frontend: React + Tailwind CSS
- Backend: Spring Boot
- Database: PostgreSQL (Supabase)

## 🚀 Hướng dẫn cài đặt & Chạy dự án (Getting Started)

### 1. Yêu cầu hệ thống (Prerequisites)
Đảm bảo máy tính của bạn đã cài đặt sẵn Node.js và NPM IntelliJ IDEA.

### 2. Cài đặt thư viện (Install Dependencies)
Mở Terminal, trỏ vào thư mục `frontend` và chạy lệnh sau để tải các gói thư viện:
```bash
npm install
```

### 3. Khởi chạy Website
Dùng lệnh sau để khởi chạy máy chủ phát triển Vite:
```bash
npm run dev
```
Giao diện trang web của bạn sẽ được mở tại: 👉 **http://localhost:5173**

---

## Project Backend Structure
```text
StayEase
├── backend
│   ├── src
│   │   ├── main
│   │   │   ├── java
│   │   │   │   └── project
│   │   │   │       └── backend
│   │   │   │           ├── BackendApplication.java
│   │   │   │           │   └── File chạy chính Spring Boot
│   │   │   │
│   │   │   │           ├── entities
│   │   │   │           │   └── Hotel.java
│   │   │   │           │       └── Entity ánh xạ với bảng Database
│   │   │   │
│   │   │   │           ├── repositories
│   │   │   │           │   └── HotelRepository.java
│   │   │   │           │       └── Tầng truy cập dữ liệu (CRUD)
│   │   │   │
│   │   │   │           ├── services
│   │   │   │           │   └── HotelService.java
│   │   │   │           │       └── Xử lý logic nghiệp vụ
│   │   │   │
│   │   │   │           └── controllers
│   │   │   │               └── HotelController.java
│   │   │   │                   └── REST API cho Frontend
│   │   │   │
│   │   │   └── resources
│   │   │       └── application.properties
│   │   │           └── Cấu hình Database, JWT, Server,...
│   │   │
│   │   └── test
│   │       └── Chứa các lớp kiểm thử
│   │
│   └── pom.xml
│       └── Quản lý dependencies Maven
```
## 📁 Project Frontend Structure
```text
frontend/
├── src/
│   ├── components/         # Các mảnh ghép giao diện dùng chung (Header, Footer, Navbar...)
│   ├── pages/              # Các trang chính của Website (Home, Cart, Checkout, Lenses...)
│   ├── context/            # Nơi lưu trữ trạng thái toàn cục (Giỏ hàng, Đăng nhập...)
│   ├── routes/             # Cấu hình các đường dẫn (URL) của Website
│   ├── styles/             # Toàn bộ CSS cho dự án
│   └── main.tsx            # Điểm bắt đầu (Entry point) của ứng dụng React
```


