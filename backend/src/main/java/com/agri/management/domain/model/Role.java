package com.agri.management.domain.model;

public enum Role{
    ROLE_ADMIN("Quản trị viên hệ thống"),
    ROLE_USER("Nông dân "),
    ROLE_TRADER("Thương lái / Đơn vị thu mua");

    private final String description;

    Role(String description){
        this.description = description;
    }
    public String getDescription(){
        return description;
    }
}