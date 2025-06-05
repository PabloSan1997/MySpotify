package com.myspotify.project.server.services;

import com.myspotify.project.server.models.Album;
import com.myspotify.project.server.models.SongDto;
import com.myspotify.project.server.models.Songs;
import com.myspotify.project.server.models.dtos.AlbumDto;
import com.myspotify.project.server.models.dtos.MainInfoDto;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface AlbumSongsService {
    Songs findSongById(Long id);
    List<Songs> findOnlySongs();
    List<Songs> findByIdAlbum(Long id, Pageable pageable);
    List<Album> findAllAlbums(Pageable pageable);
    List<Album> findAllIdArtist(Long idArtist, Pageable pageable);
    Album findAlbumById(Long id);
    List<Album> findAllByIdCategory(Long idCategory, Pageable pageable);
    void deleteAlbum(Long id);
    void deleteSong(Long id);
    Album saveAlbum(AlbumDto albumDto);
    Songs saveSong(SongDto songDto, Long idAlbum);
}
