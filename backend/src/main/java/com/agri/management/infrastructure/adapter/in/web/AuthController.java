package com.agri.management.infrastructure.adapter.in.web;

import com.agri.management.domain.port.in.AuthUseCase;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final AuthUseCase authUseCase;

    public AuthController(AuthUseCase authUseCase) {
        this.authUseCase = authUseCase;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthUseCase.AuthResult> register(@RequestBody AuthUseCase.RegisterCommand command) {
        AuthUseCase.AuthResult result = authUseCase.register(command);
        return ResponseEntity.ok(result);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthUseCase.AuthResult> login(@RequestBody AuthUseCase.LoginCommand command) {
        AuthUseCase.AuthResult result = authUseCase.login(command);
        return ResponseEntity.ok(result);
    }
}
