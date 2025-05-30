package com.myspotify.project.server.exceptions;

public class MyFireBaseException extends RuntimeException{
    public MyFireBaseException() {
    }

    public MyFireBaseException(String message) {
        super(message);
    }
}
