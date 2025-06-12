package com.myspotify.project.server.repositories;

import com.myspotify.project.server.models.Artist;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ArtistRepository extends CrudRepository<Artist, Long> {
    List<Artist> findAll(Pageable pageable);
    @Query("select a from Artist a join a.albums m where m.id = ?1")
    List<Artist> findAllByIdAlbum(Long idAlbum, Pageable pageable);
    @Query("select a from Artist a join a.albums m join m.categories c where c.id = ?1")
    List<Artist> findAllByIdCategory(Long idCategory, Pageable pageable);

    @Query("select a from Artist a where a.name ilike %?1%")
    List<Artist> findBySearch(String name, Pageable pageable);
}
