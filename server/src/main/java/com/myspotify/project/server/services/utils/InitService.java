package com.myspotify.project.server.services.utils;


import com.myspotify.project.server.models.Roles;
import com.myspotify.project.server.repositories.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class InitService {

    @Value("${server.port}")
    private String serverport;

    @Autowired
    private RoleRepository roleRepository;

    public void init(){
        String[] rolesnames = {"USER", "ADMIN"};
        List<Roles> roles = new ArrayList<>();
        for(String name:rolesnames){
            if(roleRepository.findByName(name).isEmpty())
                roles.add(Roles.builder().users(new ArrayList<>())
                        .name(name).build());
        }

        if(roles.size()>0)
            roleRepository.saveAll(roles);

        System.out.println("Everything is ready\n"+"Port: "+serverport+"\n");
    }
}
