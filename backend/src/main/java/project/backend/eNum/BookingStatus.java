package project.backend.eNum;

public enum BookingStatus { pending, confirmed, checked_in, checked_out, PAID, COMPLETED, cancelled;
    public static BookingStatus paid;
}