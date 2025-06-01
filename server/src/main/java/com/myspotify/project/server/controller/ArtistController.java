package com.myspotify.project.server.controller;


import com.myspotify.project.server.models.dtos.MainInfoDto;
import com.myspotify.project.server.services.ArtistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/artist")
public class ArtistController {
    @Autowired
    private ArtistService artistService;

    @GetMapping
    public ResponseEntity<?> findAll(Pageable pageable) {
        return ResponseEntity.ok(artistService.findArtists(pageable));
    }

    @GetMapping("/album/{idalbum}")
    public ResponseEntity<?> findByAlbum(@PathVariable("idalbum") Long idAlbum, Pageable pageable) {
        return ResponseEntity.ok(artistService.findArtistByIdAlbum(idAlbum, pageable));
    }

    @GetMapping("/category/{idcategory}")
    public ResponseEntity<?> findByCategory(
            @PathVariable("idcategory") Long idCategory,
            Pageable pageable
    ) {
        return ResponseEntity.ok(artistService.findArtistByIdCategory(idCategory, pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@PathVariable Long id) {
        return ResponseEntity.ok(artistService.findArtistById(id));
    }

    @PostMapping
    public ResponseEntity<?> saveArtist(
            @RequestParam("name") String name,
            @RequestParam("image") MultipartFile fileimage
    ){
        MainInfoDto mainInfoDto = new MainInfoDto(fileimage, name);
        return ResponseEntity.ok(artistService.saveArtist(mainInfoDto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteById(@PathVariable Long id){
        artistService.deleteArtistById(id);
        return ResponseEntity.noContent().build();
    }
}
