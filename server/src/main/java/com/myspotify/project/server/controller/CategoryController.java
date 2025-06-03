package com.myspotify.project.server.controller;

import com.myspotify.project.server.models.dtos.MainInfoDto;
import com.myspotify.project.server.services.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/category")
public class CategoryController {
    @Autowired
    private CategoryService categoryService;

    @GetMapping
    public ResponseEntity<?> findAll(Pageable pageable){
        return ResponseEntity.ok(categoryService.findAll(pageable));
    }

    @GetMapping("/album/list")
    public ResponseEntity<?> findAllCategoryList(Pageable pageable){
        return ResponseEntity.ok(categoryService.findCategoryListSongs(pageable));
    }


    @GetMapping("/album/{idalbum}")
    public ResponseEntity<?> findAllByIdAlbum(@PathVariable("idalbum") Long idAlbum, Pageable pageable){
        return ResponseEntity.ok(categoryService.findAllByIdAlbum(idAlbum, pageable));
    }

    @GetMapping("/artist/{idartist}")
    public ResponseEntity<?> findAllByIdArtist(@PathVariable("idartist") Long idArtist, Pageable pageable){
        return ResponseEntity.ok(categoryService.findAllByIdArtist(idArtist, pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findAllByIdAlbum(@PathVariable Long id){
        return ResponseEntity.ok(categoryService.findCategoryById(id));
    }
    @PostMapping
    public ResponseEntity<?> saveCategory(
            @RequestParam("image") MultipartFile imagefile, @RequestParam("title") String title
    ){
        MainInfoDto categoryDto = new MainInfoDto(imagefile, title);
        return ResponseEntity.status(201).body(categoryService.saveCategory(categoryDto));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteById(@PathVariable Long id){
        categoryService.deleteCategoryById(id);
        return ResponseEntity.noContent().build();
    }
}
