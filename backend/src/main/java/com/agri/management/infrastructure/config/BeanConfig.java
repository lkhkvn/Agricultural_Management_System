package com.agri.management.infrastructure.config;

import com.agri.management.domain.port.in.AuthUseCase;
import com.agri.management.domain.port.out.PasswordEncoderPort;
import com.agri.management.domain.port.out.TokenProviderPort;
import com.agri.management.domain.port.out.UserRepositoryPort;
import com.agri.management.usecase.AuthUseCaseImpl;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class BeanConfig {

    @Bean
    public AuthUseCase authUseCase(UserRepositoryPort userRepositoryPort,
                                   PasswordEncoderPort passwordEncoderPort,
                                   TokenProviderPort tokenProviderPort) {
        return new AuthUseCaseImpl(userRepositoryPort, passwordEncoderPort, tokenProviderPort);
    }
}
