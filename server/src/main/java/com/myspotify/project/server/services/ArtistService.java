package com.myspotify.project.server.services;

import com.myspotify.project.server.models.Artist;
import com.myspotify.project.server.models.dtos.MainInfoDto;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ArtistService {
    List<Artist> findArtists(Pageable pageable);
    List<Artist> findArtistByIdAlbum(Long idAlbum, Pageable pageable);
    List<Artist> findArtistByIdCategory(Long idCategory, Pageable pageable);
    Artist findArtistById(Long id);
    Artist saveArtist(MainInfoDto mainInfoDto);
    void deleteArtistById(Long id);
}
