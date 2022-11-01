package com.dragos.sportsnetworkserver.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.time.OffsetDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "user")
public class UserDb {
    @Id
    private int id;

    @Column(name="first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(name = "password_hash")
    private String passwordHash;

    @Column(name = "registered_at")
    private OffsetDateTime registeredAt;

    @Column(name = "last_login")
    private OffsetDateTime lastLogin;

    private String profile;

    private String email;

//    public void setRegisteredAt(String odtString) {
//        final String pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSxx";
//        DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern(pattern);
//        this.lastLogin = OffsetDateTime.parse(odtString, dateTimeFormatter);
//    }

    public static UserDb mapToDbUser(User user) {
        UserDb u = new UserDb();
        u.setFirstName(user.getFirstName());
        u.setLastName(user.getLastName());
        u.setEmail(user.getEmail());
        u.setPasswordHash(user.getPasswordHash());
        u.setPhoneNumber(user.getPhoneNumber());
        u.setRegisteredAt(user.getRegisteredAt());
        return u;
    }

    public User mapToRestUser() {
        return User
                .builder()
                .firstName(this.getFirstName())
                .lastName(this.getLastName())
                .email(this.getEmail())
                .passwordHash(this.getPasswordHash())
                .phoneNumber(this.getPhoneNumber())
                .registeredAt(this.getRegisteredAt())
                .build();

    }
}
