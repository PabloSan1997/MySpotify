package com.myspotify.project.server.services;

import com.myspotify.project.server.models.Category;
import com.myspotify.project.server.models.dtos.MainInfoDto;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface CategoryService {
    List<Category> findAll(Pageable pageable);
    List<Category> findAllByIdAlbum(Long idAlbum, Pageable pageable);
    List<Category> findAllByIdArtist(Long idArtist, Pageable pageable);
    Category saveCategory(MainInfoDto categoryDto);
    Category updateCategoryImageName(Long id, MainInfoDto categoryDto);
    Category findCategoryById(Long id);
    void deleteCategoryById(Long id);
}
