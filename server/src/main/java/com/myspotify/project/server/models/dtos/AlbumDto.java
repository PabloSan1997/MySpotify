package com.myspotify.project.server.models.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AlbumDto {
    private String title;
    private MultipartFile imagefile;
    private List<Long> idArtists;
    private List<Long> idCategories;
}
