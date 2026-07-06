import axios from "axios"; // Thay vì import từ "./api", hãy dùng thẳng axios gốc ở đây

export interface MonthlyRevenue {
    month: number;
    revenue: number;
}

export const getMonthlyRevenue = async (year: number): Promise<MonthlyRevenue[]> => {
    // Gọi trực tiếp tới cổng port backend của bạn
    const response = await axios.get<MonthlyRevenue[]>(`http://localhost:8080/api/admin/dashboard/revenue`, {
        params: { year }
    });
    return response.data;
};