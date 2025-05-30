package com.myspotify.project.server.repositories;

import com.google.cloud.storage.Blob;
import com.google.cloud.storage.BlobId;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;
import com.google.firebase.cloud.StorageClient;
import com.myspotify.project.server.exceptions.MyFireBaseException;
import com.myspotify.project.server.models.dtos.FileDto;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

@Repository
public class FireBaseRepository {
    private final String imagefolder = "musica/images/";
    private final String audiofolder = "musica/audio/";
    @Value("${bucket.name}")
    private String bucketname;

    private Storage getStorage(){
        return StorageClient.getInstance().bucket().getStorage();
    }

    public FileDto saveImage(MultipartFile imagefile, boolean isaudio){
        String imageName = UUID.randomUUID()+imagefile.getOriginalFilename();
        String filename = (isaudio?audiofolder:imagefolder) + viewlenght(imageName);
        System.out.println(filename+"\n\n");
        Storage storage = getStorage();
        BlobId blobId = BlobId.of(bucketname, filename);
        BlobInfo blobInfo = BlobInfo.newBuilder(blobId)
                .setContentType(imagefile.getContentType()).build();

        try{
            storage.create(blobInfo, imagefile.getBytes());
            String urlimage = "https://firebasestorage.googleapis.com/v0/b/"
                    +bucketname+
                    "/o/"
                    +filename.replace("/", "%2F")+
                    "?alt=media";
            return FileDto.builder().urlfile(urlimage).idfirebase(imageName).build();
        }catch (Exception e){
            throw  new MyFireBaseException(e.getMessage());
        }
    }

    public void deleteImage(String idname, boolean isaudio){
        String filename = (isaudio?audiofolder:imagefolder)+ idname;
        Storage storage = getStorage();

        BlobId blobId = BlobId.of(bucketname, filename);
        Blob blob = storage.get(blobId);

        if(blob != null){
            blob.delete();
        }
    }

    private String viewlenght(String name){
        if(name.length()<6)
            return name;
        return name.substring(name.length() - 6);
    }
}
