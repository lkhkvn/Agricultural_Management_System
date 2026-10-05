package com.agri.management.usecase;

import com.agri.management.domain.model.User;
import com.agri.management.domain.port.in.AuthUseCase;
import com.agri.management.domain.port.out.PasswordEncoderPort;
import com.agri.management.domain.port.out.TokenProviderPort;
import com.agri.management.domain.port.out.UserRepositoryPort;

public class AuthUseCaseImpl implements AuthUseCase {

    private final UserRepositoryPort userRepositoryPort;
    private final PasswordEncoderPort passwordEncoderPort;
    private final TokenProviderPort tokenProviderPort;

    public AuthUseCaseImpl(UserRepositoryPort userRepositoryPort,
                           PasswordEncoderPort passwordEncoderPort,
                           TokenProviderPort tokenProviderPort) {
        this.userRepositoryPort = userRepositoryPort;
        this.passwordEncoderPort = passwordEncoderPort;
        this.tokenProviderPort = tokenProviderPort;
    }

    @Override
    public AuthResult register(RegisterCommand command) {
        if (userRepositoryPort.existsByUsername(command.username())) {
            throw new IllegalArgumentException("Tên đăng nhập đã tồn tại.");
        }
        if (userRepositoryPort.existsByEmail(command.email())) {
            throw new IllegalArgumentException("Email đã được sử dụng.");
        }

     
        String encodedPassword = passwordEncoderPort.encode(command.password());

          String userRole = (command.role() != null && command.role().equalsIgnoreCase("ROLE_TRADER")) 
                ? "ROLE_TRADER" 
                : "ROLE_USER";

        User newUser = new User(
                null,
                command.username(),
                command.email(),
                encodedPassword,
                command.fullName(),
                userRole
        );

        User savedUser = userRepositoryPort.save(newUser);
        String token = tokenProviderPort.generateToken(savedUser);

        return new AuthResult(token, savedUser);
    }

    @Override
    public AuthResult login(LoginCommand command) {
        User user = userRepositoryPort.findByUsername(command.username())
                .orElseThrow(() -> new IllegalArgumentException("Tên đăng nhập hoặc mật khẩu không chính xác."));

        if (!passwordEncoderPort.matches(command.password(), user.getPassword())) {
            throw new IllegalArgumentException("Tên đăng nhập hoặc mật khẩu không chính xác.");
        }

        String token = tokenProviderPort.generateToken(user);
        return new AuthResult(token, user);
    }
}
