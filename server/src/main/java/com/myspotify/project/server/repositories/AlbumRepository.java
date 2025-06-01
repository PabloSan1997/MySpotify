package com.myspotify.project.server.repositories;

import com.myspotify.project.server.models.Album;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface AlbumRepository extends CrudRepository<Album, Long> {
    List<Album> findAll(Pageable pageable);
    @Query("select a Album a join a.categories c where c.id = ?1")
    List<Album> findAllByCategory(Long idCategory, Pageable pageable);
    @Query("select a Album a join a.artists c where c.id = ?1")
    List<Album> findAllByArtist(Long idArtist, Pageable pageable);
}
