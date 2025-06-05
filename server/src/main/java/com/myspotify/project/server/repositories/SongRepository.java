package com.myspotify.project.server.repositories;

import com.myspotify.project.server.models.Songs;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface SongRepository extends CrudRepository<Songs, Long> {
    @Query("select s from Songs s where s.album.id = ?1")
    List<Songs> findSongsByAlbumId(Long idAlbum);
    @Query("select s from Songs s order by function('RANDOM')")
    List<Songs> findRandomSongs(Pageable pageable);

}
