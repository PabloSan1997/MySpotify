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
@Table(name = "category")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(length = 60)
    private String title;
    @Column(length = 800, name = "url_image")
    private String urlImage;
    @Column(length = 200)
    @JsonIgnore
    private String imagefilename;

    @ManyToMany(mappedBy = "categories")
    @JsonIgnore
    private List<Album> albums;
}
