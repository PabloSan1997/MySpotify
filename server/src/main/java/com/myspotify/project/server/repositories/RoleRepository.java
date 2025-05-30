package com.myspotify.project.server.repositories;

import com.myspotify.project.server.models.Roles;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface RoleRepository extends CrudRepository<Roles, Long> {
    Optional<Roles> findByName(String name);
}
