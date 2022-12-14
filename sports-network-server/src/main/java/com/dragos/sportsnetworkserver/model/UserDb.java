package com.dragos.sportsnetworkserver.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "user")
public class UserDb {
    @Id
    private int id;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(name = "password_hash")
    private String passwordHash;

    @Column(name = "registered_at")
    private LocalDateTime registeredAt;

    @Column(name = "last_login")
    private LocalDateTime lastLogin;

    private String profile;

    private String email;

    @Column(name = "user_image")
    private String userImage;

    public User mapToRestUser() {
        return User
                .builder()
                .id(this.getId())
                .firstName(this.getFirstName())
                .lastName(this.getLastName())
                .email(this.getEmail())
                .password(this.getPasswordHash())
                .phoneNumber(this.getPhoneNumber())
                .registeredAt(this.getRegisteredAt().atOffset(ZoneOffset.UTC))
                .userImage(this.getUserImage())
                .build();
    }
}
