package com.agri.management.infrastructure.adapter.out.persistence;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 50)
    private String username;

    @Column(nullable = false, unique = true, length = 100)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(name = "full_name")
    private String fullName;

    @Column(nullable = false, length = 30)
    private String role;

    public UserEntity() {}

    public UserEntity(Long id, String username, String email, String password, String fullName, String role) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.fullName = fullName;
        this.role = role;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public static UserEntityBuilder builder() {
        return new UserEntityBuilder();
    }

    public static class UserEntityBuilder {
        private Long id;
        private String username;
        private String email;
        private String password;
        private String fullName;
        private String role;

        public UserEntityBuilder id(Long id) { this.id = id; return this; }
        public UserEntityBuilder username(String username) { this.username = username; return this; }
        public UserEntityBuilder email(String email) { this.email = email; return this; }
        public UserEntityBuilder password(String password) { this.password = password; return this; }
        public UserEntityBuilder fullName(String fullName) { this.fullName = fullName; return this; }
        public UserEntityBuilder role(String role) { this.role = role; return this; }

        public UserEntity build() {
            return new UserEntity(id, username, email, password, fullName, role);
        }
    }
}
