package com.agri.management.domain.port.out;
import com.agri.management.domain.model.User;

public interface TokenProviderPort {
    String generateToken(User user);
    String getUsernameFromToken(String token);
    boolean validateToken(String token);
    
}
