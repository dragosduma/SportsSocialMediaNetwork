package com.dragos.sportsnetworkserver.repository;

import com.dragos.sportsnetworkserver.model.PostCommentDb;
import org.springframework.data.repository.CrudRepository;

public interface PostCommentRepository extends CrudRepository<PostCommentDb, Integer> {

}
