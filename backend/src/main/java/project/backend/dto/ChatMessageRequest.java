package project.backend.dto;



import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record ChatMessageRequest(

        @NotNull
        Integer roomId,

        @NotNull
        Integer senderId,

        @NotBlank
        String message

) {
}