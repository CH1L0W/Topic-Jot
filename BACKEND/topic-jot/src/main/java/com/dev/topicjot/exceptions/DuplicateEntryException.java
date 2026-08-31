package com.dev.topicjot.exceptions;

public class DuplicateEntryException extends RuntimeException {
    public  DuplicateEntryException(String message)
    {
        super(message);
    }
}
