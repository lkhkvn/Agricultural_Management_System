package com.agri.management.domain.port.in;

import com.agri.management.domain.model.User;

public interface AuthUseCase {
    AuthResult register(RegisterCommand command);
    AuthResult login(LoginCommand command);

    record RegisterCommand(String username, String email, String password, String fullName, String role){} 
    record LoginCommand(String username, String password){}
    record AuthResult(String token, User user) {}
}



