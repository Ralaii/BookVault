package org.example.server.security;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.example.server.dto.LoginRequest;
import org.example.server.dto.LoginResponse;
import org.example.server.dto.RegisterRequest;
import org.example.server.dto.RegisterResponse;
import org.example.server.entity.User;
import org.example.server.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public LoginResponse login(@Valid LoginRequest loginRequest) {
        User user = userRepository.findUserByUsername(loginRequest.username())
                .orElseThrow(() -> new RuntimeException("Invalid username or password"));

        if (!passwordEncoder.matches(loginRequest.password(), user.getPasswordHash())) {
            throw new RuntimeException("Invalid username or password");
        }
        return new LoginResponse(user.getUsername(), user.getRole());
    }

    public RegisterResponse register(@Valid RegisterRequest registerRequest) {
        User user = new User();
        user.setUsername(registerRequest.username());
        user.setPasswordHash(passwordEncoder.encode(registerRequest.password()));
        user.setRole("USER");
        userRepository.save(user);

        return new RegisterResponse(user.getUsername());
    }
}