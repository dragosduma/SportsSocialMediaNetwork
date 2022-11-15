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
@Table(name="user_post")
public class UserPostDb {
    @Id
    private int id;

    private String message;

    private String title;

    @Column(name="created_at")
    private LocalDateTime createdAt;

    @Column(name="updated_at")
    private LocalDateTime updatedAt;

    @Column(name="user_id")
    private int userId;

    public static UserPostDb mapToDbUserPost(UserPost userPost) {
        UserPostDb u = new UserPostDb();
        u.id = userPost.getId();
        u.message = userPost.getMessage();
        u.title = userPost.getTitle();
        u.createdAt = userPost.getCreatedAt().toLocalDateTime();
        u.updatedAt = userPost.getUpdatedAt().toLocalDateTime();
        u.userId = userPost.getUserId();
        return u;
    }

    public UserPost mapToRestUserPost() {
        return UserPost
                .builder()
                .id(this.getId())
                .message(this.getMessage())
                .title(this.getTitle())
                .createdAt(this.getCreatedAt().atOffset(ZoneOffset.UTC))
                .updatedAt(this.getUpdatedAt().atOffset(ZoneOffset.UTC))
                .userId(this.getUserId())
                .build();
    }
}
