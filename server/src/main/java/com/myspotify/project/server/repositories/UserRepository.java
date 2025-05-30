package com.myspotify.project.server.repositories;

import com.myspotify.project.server.models.Users;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface UserRepository extends CrudRepository<Users, Long> {
    Optional<Users> findByUsername(String username);
}
