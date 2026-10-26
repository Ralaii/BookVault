package org.example.server.dto;

public record ApiError(
        int status,
        String message
) {}
