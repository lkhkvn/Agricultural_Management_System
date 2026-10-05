package com.agri.management.domain.port.out;

public interface PasswordEncoderPort {
    String encode(String rawPasword);
    boolean matches(String rawPasword,String encodedPassword);
}
