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
@Table(name = "album")
public class Album {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(length = 60)
    private String title;
    @Column(name = "url_image", length = 800)
    private String urlImage;
    @Column(length = 200, unique = true)
    @JsonIgnore
    private String imagefilename;

    @ManyToMany(mappedBy = "albums")
    @JsonIgnore
    private List<Artist> artists;

    @ManyToMany(mappedBy = "albums")
    @JsonIgnore
    private List<Category> categories;

    @OneToMany(mappedBy = "album", orphanRemoval = true, cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Songs> songs;
}
