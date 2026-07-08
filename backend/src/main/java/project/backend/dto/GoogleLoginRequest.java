package project.backend.dto;



import lombok.Data;

@Data
public class GoogleLoginRequest {
    private String token; // ID Token do Google trả về cho Frontend
}