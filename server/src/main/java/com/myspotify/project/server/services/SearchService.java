package com.myspotify.project.server.services;


import com.myspotify.project.server.models.dtos.SearchDto;
import org.springframework.data.domain.Pageable;

public interface SearchService {
    SearchDto searchData(String searchtext, Pageable pageable);
}
