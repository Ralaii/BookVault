package org.example.server.dto;

import org.example.server.entity.Role;

public record LoginResponse(
        String username,
//        String token
        Role role
) {}
