package com.myspotify.project.server.models.dtos;

import lombok.Data;
import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;

@Data
public class ErrorDto {
    private Integer statusCode;
    private String error;
    private String message;
    private LocalDateTime timestamp;

    public ErrorDto(HttpStatus status, String message){
        this.statusCode = status.value();
        this.error = status.getReasonPhrase();
        this.message = message;
        this.timestamp = LocalDateTime.now();
    }
}
