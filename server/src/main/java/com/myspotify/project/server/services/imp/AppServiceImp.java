package com.myspotify.project.server.services.imp;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.myspotify.project.server.exceptions.MyBadRequestException;
import com.myspotify.project.server.exceptions.MyFireBaseException;
import com.myspotify.project.server.models.*;
import com.myspotify.project.server.models.dtos.AlbumDto;
import com.myspotify.project.server.models.dtos.CategoryList;
import com.myspotify.project.server.models.dtos.FileDto;
import com.myspotify.project.server.models.dtos.MainInfoDto;
import com.myspotify.project.server.repositories.*;
import com.myspotify.project.server.services.AlbumSongsService;
import com.myspotify.project.server.services.ArtistService;
import com.myspotify.project.server.services.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class AppServiceImp implements CategoryService, ArtistService, AlbumSongsService {
    @Autowired
    private AlbumRepository albumRepository;
    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    private SongRepository songRepository;
    @Autowired
    private ArtistRepository artistRepository;
    @Autowired
    private FireBaseRepository fireBaseRepository;

    @Override
    @Transactional
    public List<Category> findAll(Pageable pageable) {
        return categoryRepository.findAll(pageable);
    }

    @Override
    @Transactional
    public List<Category> findAllByIdAlbum(Long idAlbum, Pageable pageable) {
        return categoryRepository.findAllByIdAlbum(idAlbum, pageable);
    }

    @Override
    @Transactional
    public List<Category> findAllByIdArtist(Long idArtist, Pageable pageable) {
        return categoryRepository.findAllByIdArtist(idArtist, pageable);
    }

    @Override
    @Transactional
    public List<CategoryList> findCategoryListSongs(Pageable pageable) {
        List<Category> categories = categoryRepository.findAll(pageable);
        return categories.stream()
                .map(c-> {
                    var clist = CategoryList.builder()
                            .urlImage(c.getUrlImage()).id(c.getId()).title(c.getTitle()).build();
                    List<Album> albums = albumRepository.findAllByCategory(c.getId(), PageRequest.of(0,5));
                    clist.setAlbums(albums);
                    return clist;
                }).toList();
    }

    @Override
    @Transactional
    public Category saveCategory(MainInfoDto categoryDto) {
        try{
            var filedto = fireBaseRepository.saveFile(categoryDto.getFileimage(), false);
            Category category = Category.builder()
                    .title(categoryDto.getTitle())
                    .imagefilename(filedto.getIdfirebase())
                    .urlImage(filedto.getUrlfile()).build();
            return categoryRepository.save(category);
        }catch (Exception e){
            throw new MyFireBaseException(e.getMessage());
        }
    }

    @Override
    public Category updateCategoryImageName(Long id, MainInfoDto categoryDto) {
        try{
            Category category = findCategoryById(id);
            fireBaseRepository.deleteFile(category.getImagefilename(), false);
            var filedto = fireBaseRepository.saveFile(categoryDto.getFileimage(), false);
            category.setUrlImage(filedto.getUrlfile());
            category.setImagefilename(filedto.getIdfirebase());
            category.setTitle(categoryDto.getTitle());
            return categoryRepository.save(category);
        }catch (Exception e){
            throw new MyFireBaseException(e.getMessage());
        }
    }

    @Override
    @Transactional
    public Category findCategoryById(Long id) {
        return categoryRepository.findById(id).orElseThrow(()-> new MyBadRequestException("Id invalido"));
    }

    @Override
    @Transactional
    public void deleteCategoryById(Long id) {
        categoryRepository.findById(id).ifPresent(c -> {
            fireBaseRepository.deleteFile(c.getImagefilename(), false);
            categoryRepository.deleteById(c.getId());
        });
    }

    @Override
    @Transactional
    public List<Artist> findArtists(Pageable pageable) {
        return artistRepository.findAll(pageable);
    }

    @Override
    @Transactional
    public List<Artist> findArtistByIdAlbum(Long idAlbum, Pageable pageable) {
        return artistRepository.findAllByIdAlbum(idAlbum, pageable);
    }

    @Override
    @Transactional
    public List<Artist> findArtistByIdCategory(Long idCategory, Pageable pageable) {
        return artistRepository.findAllByIdCategory(idCategory, pageable);
    }

    @Override
    @Transactional
    public Artist findArtistById(Long id) {
        return artistRepository.findById(id).orElseThrow(()-> new MyBadRequestException("Id invalido"));
    }

    @Override
    @Transactional
    public Artist saveArtist(MainInfoDto mainInfoDto) {
       try{
           FileDto fileDto = fireBaseRepository.saveFile(mainInfoDto.getFileimage(), false);
           Artist artist = Artist.builder().name(mainInfoDto.getTitle())
                   .imagefilename(fileDto.getIdfirebase())
                   .urlImage(fileDto.getUrlfile()).build();
           return artistRepository.save(artist);
       }catch (Exception e){
           throw new MyFireBaseException(e.getMessage());
       }
    }

    @Override
    @Transactional
    public Artist updateArtistImageName(Long id, MainInfoDto mainInfoDto) {
       try{
           Artist artist = findArtistById(id);
           fireBaseRepository.deleteFile(artist.getImagefilename(), false);
           var filedto = fireBaseRepository.saveFile(mainInfoDto.getFileimage(), false);
           artist.setName(mainInfoDto.getTitle());
           artist.setImagefilename(filedto.getIdfirebase());
           artist.setUrlImage(filedto.getUrlfile());
           return artistRepository.save(artist);
       }catch (Exception e){
           throw new MyFireBaseException(e.getMessage());
       }
    }

    @Override
    @Transactional
    public void deleteArtistById(Long id) {
        artistRepository.findById(id).ifPresent(c -> {
            fireBaseRepository.deleteFile(c.getImagefilename(), false);
            artistRepository.deleteById(c.getId());
        });
    }

    @Override
    @Transactional
    public Songs findSongById(Long id) {
        return songRepository.findById(id).orElseThrow(()-> new MyBadRequestException("id invalid"));
    }

    @Override
    @Transactional
    public List<Songs> findOnlySongs() {
        return songRepository.findRandomSongs(PageRequest.of(0, 8));
    }

    @Override
    @Transactional
    public List<Songs> findByIdAlbum(Long id, Pageable pageable) {
        return songRepository.findSongsByAlbumId(id);
    }

    @Override
    @Transactional
    public List<Album> findAllAlbums(Pageable pageable) {
        return albumRepository.findAll(pageable);
    }

    @Override
    @Transactional
    public List<Album> findAllIdArtist(Long idArtist, Pageable pageable) {
        return albumRepository.findAllByArtist(idArtist, pageable);
    }

    @Override
    @Transactional
    public Album findAlbumById(Long id) {
        return albumRepository.findById(id)
                .orElseThrow(()-> new MyBadRequestException("id invalid"));
    }

    @Override
    @Transactional
    public List<Album> findAllByIdCategory(Long idCategory, Pageable pageable) {
        return albumRepository.findAllByCategory(idCategory, pageable);
    }

    @Override
    @Transactional
    public void deleteAlbum(Long id) {
        albumRepository.findById(id).ifPresent(c -> {
            List<Songs> songs = c.getSongs();
            songs.forEach(p -> {
                deleteSong(p.getId());
            });
            fireBaseRepository.deleteFile(c.getImagefilename(), false);
            albumRepository.deleteById(c.getId());
        });
    }

    @Override
    @Transactional
    public void deleteSong(Long id) {
        songRepository.findById(id).ifPresent(c -> {
            fireBaseRepository.deleteFile(c.getImagefilename(), false);
            fireBaseRepository.deleteFile(c.getAudiofilename(), true);
            songRepository.deleteById(c.getId());
        });
    }

    @Override
    @Transactional
    public Album saveAlbum(AlbumDto albumDto) {
        try{
            List<Long> idcategory = List.of(new ObjectMapper().readValue(albumDto.getIdCategories(), Long[].class));
            List<Long> idartist= List.of(new ObjectMapper().readValue(albumDto.getIdArtists(), Long[].class));

            FileDto fileDto = fireBaseRepository.saveFile(albumDto.getImagefile(), false);

            List<Category> categories = (List<Category>) categoryRepository.findAllById(idcategory);
            List<Artist> artists = (List<Artist>) artistRepository.findAllById(idartist);

            Album album = Album.builder()
                    .urlImage(fileDto.getUrlfile())
                    .artists(artists)
                    .title(albumDto.getTitle())
                    .categories(categories)
                    .urlImage(fileDto.getUrlfile())
                    .imagefilename(fileDto.getIdfirebase())
                    .build();
            return albumRepository.save(album);
        }catch (Exception e){
            throw new MyFireBaseException(e.getMessage());
        }
    }

    @Override
    @Transactional
    public Songs saveSong(SongDto songDto, Long idAlbum) {
        Album album = albumRepository.findById(idAlbum)
                .orElseThrow(()-> new MyBadRequestException("id invalido"));

        try{
            FileDto fileDtoAudio = fireBaseRepository.saveFile(songDto.getAudiofile(), true);
            FileDto fileDtoImage = fireBaseRepository.saveFile(songDto.getImagefile(), false);
            Songs songs = Songs.builder().title(songDto.getTitle()).album(album)
                    .urlImage(fileDtoImage.getUrlfile()).imagefilename(fileDtoImage.getIdfirebase())
                    .audiofilename(fileDtoAudio.getIdfirebase()).urlAudio(fileDtoAudio.getUrlfile())
                    .build();
            return songRepository.save(songs);
        }catch (Exception e){
            throw new MyFireBaseException(e.getMessage());
        }
    }
}
