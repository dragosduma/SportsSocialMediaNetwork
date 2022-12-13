package com.dragos.sportsnetworkserver.model;

import com.dragos.sportsnetworkserver.utility.CustomMultipartFile;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.IOException;
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
    private byte[] image;

    public static UserPostDb mapToDbUserPost(MultipartFile file, String caption, int id) throws IOException {
        UserPostDb u = new UserPostDb();
        u.caption = caption;
        u.image = file.getBytes();
        u.createdAt = LocalDateTime.now();
        u.updatedAt = LocalDateTime.now();
        u.userId = id;
        return u;
    }

    public MultipartFile getFileFromByteString(byte[] bytes)
    {
        CustomMultipartFile file = new CustomMultipartFile(bytes);
        return file;
    }

    public UserPost mapToRestUserPost() {
        return UserPost
                .builder()
                .caption(this.getCaption())
                .image(getFileFromByteString(this.getImage()).getResource())
                .build();
    }
}
