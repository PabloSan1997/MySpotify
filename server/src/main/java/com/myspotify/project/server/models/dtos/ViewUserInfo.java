package com.myspotify.project.server.models.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ViewUserInfo {
    private String username;
    private String nickname;
    private String urlImage;
}
