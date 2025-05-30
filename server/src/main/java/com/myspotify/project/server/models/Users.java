package com.myspotify.project.server.models;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "users")
public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(length = 60, unique = true, nullable = false)
    private String username;
    @Column(length = 60, nullable = false)
    private String nickname;
    @Column(length = 800, name = "url_image")
    private String urlImage;
    @Column(length = 500, nullable = false)
    private String password;
    @Column(length = 200, unique = true)
    private String imagefilename;
    @ManyToMany
    @JoinTable(
            name = "user_role",
            joinColumns = @JoinColumn(name = "id_user"),
            inverseJoinColumns = @JoinColumn(name = "id_role")
    )
    @JsonIgnore
    private List<Roles> roles;
}
