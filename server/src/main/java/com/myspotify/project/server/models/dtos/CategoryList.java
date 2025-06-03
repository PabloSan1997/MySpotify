package com.myspotify.project.server.models.dtos;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.myspotify.project.server.models.Album;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CategoryList {
    private Long id;
    private String title;
    private String urlImage;
    @JsonIgnoreProperties({"categories", "artists"})
    private List<Album> albums;
}
