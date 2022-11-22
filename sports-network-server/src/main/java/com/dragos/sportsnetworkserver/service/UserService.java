package com.dragos.sportsnetworkserver.service;

import com.dragos.sportsnetworkserver.model.User;
import com.dragos.sportsnetworkserver.model.UserDb;
import com.dragos.sportsnetworkserver.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class UserService implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserDb saveUser(User user) {
        UserDb userDb = UserDb.mapToDbUser(user);
        return userRepository.save(userDb);
    }

    public List<User> findAll() {
        List<User> allUsers = new ArrayList<>();
        Iterable<UserDb> users = userRepository.findAll();
        for(UserDb userDb : users){
            allUsers.add(userDb.mapToRestUser());
        }
        return allUsers;
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

    @Override
    public UserDetails loadUserByUsername(String username) {
        Optional<UserDb> userDb = userRepository.findByEmail(username);
        User user = userDb.get().mapToRestUser();
        if(userDb == null)
            throw new UsernameNotFoundException(username);
        return new org.springframework.security.core.userdetails.User(user.getEmail(),user.getPasswordHash(),new ArrayList<>());
    }
}

