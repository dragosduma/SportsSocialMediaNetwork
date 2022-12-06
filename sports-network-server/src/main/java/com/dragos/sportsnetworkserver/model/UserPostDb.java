package com.dragos.sportsnetworkserver.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name="user_post")
public class UserPostDb {
    @Id
    private int id;

    @Column(name="message")
    private String caption;

    @Column(name="created_at")
    private LocalDateTime createdAt;

    @Column(name="updated_at")
    private LocalDateTime updatedAt;

    @Column(name="user_id")
    private int userId;

    @Column(name="image")
    private String image;

    public static UserPostDb mapToDbUserPost(MultipartFile file, String caption) {
        UserPostDb u = new UserPostDb();
        u.caption = caption;
        u.image = file.toString();
        return u;
    }

    public UserPost mapToRestUserPost() {
        return UserPost
                .builder()
                .caption(this.getCaption())
                .build();
    }
}
