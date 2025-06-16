package com.myspotify.project.server.models;

import com.myspotify.project.server.models.dtos.MainInfoDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SongDto {
    private String title;
    private MultipartFile audiofile;
}
