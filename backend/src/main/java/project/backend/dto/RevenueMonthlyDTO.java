package project.backend.dto;

public class RevenueMonthlyDTO {
    private int month;
    private double revenue;

    // Ép kiểu từ Object để nhận diện an toàn mọi kiểu dữ liệu số từ Postgres
    public RevenueMonthlyDTO(Object month, Object revenue) {
        this.month = month != null ? ((Number) month).intValue() : 0;
        this.revenue = revenue != null ? ((Number) revenue).doubleValue() : 0.0;
    }

    // Các hàm Getter và Setter giữ nguyên như cũ
    public int getMonth() { return month; }
    public void setMonth(int month) { this.month = month; }
    public double getRevenue() { return revenue; }
    public void setRevenue(double revenue) { this.revenue = revenue; }
}