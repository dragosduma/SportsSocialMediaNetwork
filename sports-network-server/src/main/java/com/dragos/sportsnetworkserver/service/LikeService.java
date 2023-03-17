package com.dragos.sportsnetworkserver.service;

import com.dragos.sportsnetworkserver.model.Like;
import com.dragos.sportsnetworkserver.model.LikeDb;
import com.dragos.sportsnetworkserver.model.RestLike;
import com.dragos.sportsnetworkserver.repository.LikeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Transactional
@Service
public class LikeService {
    @Autowired
    private LikeRepository likeRepository;
    private UserService userService;
    private UserPostService postService;

    public LikeService (LikeRepository likeRepository , UserService userService, UserPostService postService) {
        this.likeRepository = likeRepository;
        this.userService = userService;
        this.postService = postService;
    }

    public List<RestLike> getLikesByPostId(int postId) {
        List<RestLike> likes = new ArrayList<>();
        Iterable<LikeDb> likeDbs = likeRepository.findByPostId(postId);
        for(LikeDb likeDb : likeDbs) {
            likes.add(mapToRestLike(likeDb));
        }
        return likes;
    }

    public LikeDb saveLike(Like like) {
        String userEmail = userService.getUsernameFromUserDetails();
        int userId = userService.getUserIdFromEmail(userEmail);
        LikeDb likeDb = mapToDbLike(like, userId);
        return likeRepository.save(likeDb);
    }

    public void deleteLikeById(int id) {
        likeRepository.deleteById(id);
    }

    private LikeDb mapToDbLike(Like like, int userId) {
        LikeDb l = new LikeDb();
        l.setLikedBy(userId);
        l.setPostId(like.getPostId());
        return l;
    }

    private RestLike mapToRestLike(LikeDb likeDb) {
        return RestLike
                .builder()
                .id(likeDb.getId())
                .userEmail(userService.getUsernameFromId(likeDb.getLikedBy()))
                .postId(likeDb.getPostId())
                .build();
    }
}
