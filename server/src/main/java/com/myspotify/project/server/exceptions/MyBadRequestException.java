package com.myspotify.project.server.exceptions;

public class MyBadRequestException extends RuntimeException{
    public MyBadRequestException() {
    }

    public MyBadRequestException(String message) {
        super(message);
    }
}
