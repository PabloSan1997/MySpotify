package com.myspotify.project.server.repositories;

import com.myspotify.project.server.models.Songs;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface SongRepository extends CrudRepository<Songs, Long> {
    @Query("select s from Songs s where s.album.id = ?1")
    List<Songs> findSongsByAlbumId(Long idAlbum);

}
