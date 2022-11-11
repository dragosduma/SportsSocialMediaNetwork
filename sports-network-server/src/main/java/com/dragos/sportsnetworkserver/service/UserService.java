package com.dragos.sportsnetworkserver.service;

import com.dragos.sportsnetworkserver.model.UserDb;
import com.dragos.sportsnetworkserver.model.User;
import com.dragos.sportsnetworkserver.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Objects;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserDb saveUser(User user) {
        UserDb userDb = UserDb.mapToDbUser(user);
        return userRepository.save(userDb);
    }

    public User findById(int id) {
        return userRepository.findById(id).get().mapToRestUser();
    }

    public Optional<UserDb> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public UserDb updateUser(User user, int id) {
        UserDb userDb = userRepository.findById(id).get();
        if (Objects.nonNull(user.getFirstName()) && !"".equalsIgnoreCase(user.getFirstName())) {
            userDb.setFirstName(user.getFirstName());
        }
        return userRepository.save(userDb);
    }

    public void deleteUserById(int id) {
        userRepository.deleteById(id);
    }


}