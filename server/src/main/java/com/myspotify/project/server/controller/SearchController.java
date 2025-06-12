package com.myspotify.project.server.controller;

import com.myspotify.project.server.services.SearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/search")
public class SearchController {
    @Autowired
    private SearchService searchService;

    @GetMapping("/{title}")
    public ResponseEntity<?> findSearch(@PathVariable String title, Pageable pageable){
        return ResponseEntity.ok(searchService.searchData(title, pageable));
    }
}
