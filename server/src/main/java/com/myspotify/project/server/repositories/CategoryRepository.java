package com.myspotify.project.server.repositories;

import com.myspotify.project.server.models.Category;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface CategoryRepository extends CrudRepository<Category, Long> {
    List<Category> findAll(Pageable pageable);
    @Query("select c from Category c join c.albums a where a.id = ?1")
    List<Category> findAllByIdAlbum(Long idAlbum, Pageable pageable);
    @Query("select c from Category c join c.albums a join a.artists art where art.id = ?1")
    List<Category> findAllByIdArtist(Long idartist, Pageable pageable);
}
