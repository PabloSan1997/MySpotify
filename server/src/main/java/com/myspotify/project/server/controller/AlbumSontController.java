package com.myspotify.project.server.controller;

import com.myspotify.project.server.models.SongDto;
import com.myspotify.project.server.models.dtos.AlbumDto;
import com.myspotify.project.server.services.AlbumSongsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/album")
public class AlbumSontController {

    @Autowired
    private AlbumSongsService albumSongsService;

    @GetMapping
    public ResponseEntity<?> findAlbums(Pageable pageable) {
        return ResponseEntity.ok(albumSongsService.findAllAlbums(pageable));
    }

    @GetMapping("/songs/{idalbum}")
    public ResponseEntity<?> findSongs(@PathVariable("idalbum") Long idAlbum, Pageable pageable) {
        return ResponseEntity.ok(albumSongsService.findByIdAlbum(idAlbum, pageable));
    }

    @GetMapping("/categor/{idcategory}")
    public ResponseEntity<?> findCategory(@PathVariable("idcategory") Long idCategory, Pageable pageable) {
        return ResponseEntity.ok(albumSongsService.findAllByIdCategory(idCategory, pageable));
    }

    @GetMapping("/artist/{idartist}")
    public ResponseEntity<?> findArtist(@PathVariable("idartist") Long idArtist, Pageable pageable) {
        return ResponseEntity.ok(albumSongsService.findAllByIdCategory(idArtist, pageable));
    }

    @GetMapping("/song/{id}")
    public ResponseEntity<?> findSongById(@PathVariable Long id) {
        return ResponseEntity.ok(albumSongsService.findSongById(id));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findAlbumById(@PathVariable Long id) {
        return ResponseEntity.ok(albumSongsService.findAlbumById(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteAlbumById(@PathVariable Long id) {
        albumSongsService.deleteAlbum(id);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/song/{id}")
    public ResponseEntity<?> deleteSongById(@PathVariable Long id) {
        albumSongsService.deleteSong(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping
    public ResponseEntity<?> saveAlbum(
            @RequestParam("image") MultipartFile imagefile,
            @RequestParam("title") String title,
            @RequestParam("categorylist") List<Long> idcategories,
            @RequestParam("artistlist") List<Long> idartist
    ) {
        AlbumDto albumDto = AlbumDto.builder().idArtists(idartist).idCategories(idcategories)
                .title(title).idCategories(idcategories).build();
        return ResponseEntity.status(201).body(albumSongsService.saveAlbum(albumDto));
    }

    @PostMapping("/song/{idalbum}")
    public ResponseEntity<?> saveASong(
            @RequestParam("image") MultipartFile imagefile,
            @RequestParam("title") String title,
            @RequestParam("audio") MultipartFile audiofile,
            @PathVariable("idalbum") Long idAlbum
    ) {
        SongDto songDto = SongDto.builder().audiofile(audiofile).imagefile(imagefile).title(title).build();
        return ResponseEntity.status(201).body(albumSongsService.saveSong(songDto, idAlbum));
    }
}
