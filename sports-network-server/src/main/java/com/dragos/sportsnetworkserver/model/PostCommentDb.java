package com.dragos.sportsnetworkserver.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name="post_comments")
public class PostCommentDb {
    @Id
    private int id;

    private String text;

    @Column(name="user_id")
    private int postedBy;

    @Column(name="user_post_id")
    private int postId;

    @Column(name="created_at")
    private LocalDateTime createdAt;
}
