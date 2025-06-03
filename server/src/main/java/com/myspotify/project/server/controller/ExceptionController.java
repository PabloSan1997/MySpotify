package com.myspotify.project.server.controller;

import com.myspotify.project.server.exceptions.MyBadRequestException;
import com.myspotify.project.server.exceptions.MyFireBaseException;
import com.myspotify.project.server.models.dtos.ErrorDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ExceptionController {

    private ResponseEntity<ErrorDto> generateError(HttpStatus status, String message){
        ErrorDto errorDto = new ErrorDto(status, message);
        return ResponseEntity.status(errorDto.getStatusCode()).body(errorDto);
    }

    @ExceptionHandler({
            MyBadRequestException.class,
            MyFireBaseException.class
    })
    public ResponseEntity<?> badRequest(Exception e){
        return generateError(HttpStatus.BAD_REQUEST, e.getMessage());
    }
}
