package com.myspotify.project.server.models;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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

    @ManyToMany
    @JsonIgnoreProperties({"albums"})
    @JoinTable(
            name = "artista_album",
            joinColumns = @JoinColumn(name = "id_album"),
            inverseJoinColumns = @JoinColumn(name = "id_artista"),
            uniqueConstraints = {@UniqueConstraint(columnNames = {"id_album", "id_artista"})}
    )
    private List<Artist> artists;

    @ManyToMany
    @JsonIgnoreProperties({"albums"})
    @JoinTable(
            name = "category_album",
            joinColumns = @JoinColumn(name = "id_album"),
            inverseJoinColumns = @JoinColumn(name = "id_category"),
            uniqueConstraints = @UniqueConstraint(columnNames = {"id_album", "id_category"})
    )
    private List<Category> categories;

    @OneToMany(mappedBy = "album", orphanRemoval = true, cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Songs> songs;
}
