package org.example.server.service;

import lombok.RequiredArgsConstructor;
import org.example.server.dto.Request.LoginRequest;
import org.example.server.dto.Response.LoginResponse;
import org.example.server.dto.Request.RegisterRequest;
import org.example.server.dto.Request.RegisterResponse;
import org.example.server.entity.AppUser;
import org.example.server.exception.InvalidCredentialsException;
import org.example.server.repository.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    public LoginResponse login(LoginRequest loginRequest) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.username(),
                            loginRequest.password()
                    ));
        } catch (AuthenticationException e) {
            throw new InvalidCredentialsException(("Invalid username or password"));
        }
        AppUser appUser = userRepository.findUserByUsername(loginRequest.username())
                .orElseThrow(() -> new InvalidCredentialsException("Invalid username or password"));
        return new LoginResponse(appUser.getUsername(), appUser.getRole());
    }

    public RegisterResponse register(RegisterRequest registerRequest) {
        AppUser appUser = new AppUser();
        appUser.setUsername(registerRequest.username());
        appUser.setPasswordHash(passwordEncoder.encode(registerRequest.password()));
        appUser.setEmail(registerRequest.email());
        userRepository.save(appUser);

        return new RegisterResponse(appUser.getUsername());
    }
}