package com.myspotify.project.server.models.dtos;

import com.myspotify.project.server.models.Album;
import com.myspotify.project.server.models.Artist;
import com.myspotify.project.server.models.Songs;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SearchDto {
    private List<Album> albums;
    private List<Songs> songs;
    private List<Artist> artists;
}
