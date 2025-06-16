package com.myspotify.project.server.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "cancion")
public class Songs {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(length = 60)
    private String title;
    @Column(name = "url_image", length = 800)
    private String urlImage;
    @Column(name = "url_audio", length = 800)
    private String urlAudio;
    @Column(length = 200, unique = true)
    @JsonIgnore
    private String audiofilename;

    @ManyToOne
    private Album album;
}
