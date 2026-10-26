package org.example.server.dto.Response;

import org.example.server.entity.Role;

public record LoginResponse(
        String username,
//        String token
        Role role
) {}
