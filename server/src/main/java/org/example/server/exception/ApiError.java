package org.example.server.exception;

public record ApiError(
        int status,
        String message
) {}
