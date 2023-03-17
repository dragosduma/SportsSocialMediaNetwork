package com.dragos.sportsnetworkserver.repository;

import com.dragos.sportsnetworkserver.model.LikeDb;
import org.springframework.data.repository.CrudRepository;

import java.util.List;


public interface LikeRepository extends CrudRepository<LikeDb, Integer> {
    List<LikeDb> findByPostId(int postId);
}
