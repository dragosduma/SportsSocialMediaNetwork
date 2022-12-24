package com.dragos.sportsnetworkserver.repository;

import com.dragos.sportsnetworkserver.model.PostCommentDb;
import org.springframework.data.repository.CrudRepository;

import java.util.Set;

public interface PostCommentRepository extends CrudRepository<PostCommentDb, Integer> {

        Set<PostCommentDb> findByPostId(int postId);
}
