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
@Table(name="user_message")
public class UserMessageDb {
    @Id
    private int id;

    private String message;

    @Column(name="target_id")
    private int targetId;

    @Column(name="created_at")
    private OffsetDateTime createdAt;

    @Column(name="updated_at")
    private OffsetDateTime updatedAt;

    private int userId;

    public static UserMessageDb mapToDbUserMessage(UserMessage userMessage) {
        UserMessageDb u = new UserMessageDb();
        u.id = userMessage.getId();
        u.message = userMessage.getMessage();
        u.targetId = userMessage.getTargetId();
        u.createdAt = userMessage.getCreatedAt();
        u.updatedAt = userMessage.getUpdatedAt();
        u.userId = userMessage.getUserId();
        return u;
    }

    public UserMessage mapToRestUserMessage() {
        return UserMessage
                .builder()
                .id(this.getId())
                .message(this.getMessage())
                .targetId(this.getTargetId())
                .createdAt(this.getCreatedAt())
                .updatedAt(this.getUpdatedAt())
                .userId(this.getUserId())
                .build();
    }
}
