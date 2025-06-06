import { createAsyncThunk, type ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { urlbase } from "./userExtraReducer";

export const initialStateApp: InitialStateApp = {
    songs: [],
    onesong: {
        id: 0,
        title: "",
        urlImage: "",
        urlAudio: "",
        album: {
            id: 0,
            title: "",
            urlImage: "",
            artists: [],
            categories: []
        }
    },
    albums: [],
    category: [],
    categoryList: [],
    oneCategory: {
        id: 0,
        title: "",
        urlImage: ""
    },
    oneAlbum: {
        id: 0,
        title: "",
        urlImage: "",
        artists: [],
        categories: []
    },
    artists: [],
    oneArtist: {
        id: 0,
        name: "",
        urlImage: ""
    }
}



export const findListCategoryExtraReducer = createAsyncThunk(
    'extrareducer/listcategory',
    async ({ jwt }: { jwt: string }): Promise<CategoryList[]> => {
        const ft = await fetch(`${urlbase}/category/album/list`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${jwt}`
            }
        });
        if (!ft.ok) throw { message: 'Problemas con la lista de categorias' };
        return ft.json();
    }
);

export const findCategoriesExtraReducer = createAsyncThunk(
    'extrareducer/categories',
    async ({ jwt }: { jwt: string }): Promise<Category[]> => {
        const ft = await fetch(`${urlbase}/category`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${jwt}`
            }
        });
        if (!ft.ok) throw { message: 'Problemas con la lista de categorias' };
        return ft.json();
    }
);

export const findArtistsExtraReducer = createAsyncThunk(
    'extrareducer/artists',
    async ({ jwt }: { jwt: string }): Promise<Artist[]> => {
        const ft = await fetch(`${urlbase}/artist`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${jwt}`
            }
        });
        if (!ft.ok) throw { message: 'Problemas con la lista de artistas' };
        return ft.json();
    }
);

export const findOneCategory = createAsyncThunk(
    'extrareducer/onecategory',
    async ({ jwt, id }: { jwt: string, id: number }): Promise<{ category: Category, albums: Album[], artists: Artist[] }> => {

        const ft1 = fetch(`${urlbase}/category/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${jwt}`
            }
        });
        const ft2 = fetch(`${urlbase}/album/category/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${jwt}`
            }
        });
        const ft3 = fetch(`${urlbase}/artist/album/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${jwt}`
            }
        });

        const data = { fetch1: await ft1, fetch2: await ft2, fetch3: await ft3 };

        if (!data.fetch1.ok || !data.fetch2.ok || !data.fetch3.ok)
            throw { message: 'Problemas al cargar los elementos' };

        const category = await data.fetch1.json();
        const albums = await data.fetch2.json();
        return { category, albums, artists: await data.fetch3.json() };
    }
);

export const findOneArtistExtraReducer = createAsyncThunk(
    'extrareducer/oneartist',
    async ({ jwt, id }: { jwt: string, id: number }): Promise<{ artist: Artist, albums: Album[] }> => {
        const ft1 = fetch(`${urlbase}/artist/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${jwt}`
            }
        });
        const ft2 = fetch(`${urlbase}/album/artist/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${jwt}`
            }
        });
        const data = { fetch1: await ft1, fetch2: await ft2 };
        if (!data.fetch1.ok || !data.fetch2.ok)
            throw { message: 'No se pudo cargar la lista' }

        return { artist: await data.fetch1.json(), albums: await data.fetch2.json() }
    }
);

export const findSongByAlbumExtraReducer = createAsyncThunk(
    'extrareducer/albumbyprop',
    async ({ jwt, id }: { jwt: string, id: number}): Promise<{song:Song[], album:Album}> => {
        const ft = await fetch(`${urlbase}/album/song/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${jwt}`
            }
        });
        const ft2 = await fetch(`${urlbase}/album/${id}`, {
             method: 'GET',
            headers: {
                'Authorization': `Bearer ${jwt}`
            }
        });
        if (!ft.ok || !ft2.ok) throw { message: 'Problemas con la lista de artistas' };
        return {song: await ft.json(), album: await ft2.json()}
    }
);

export const findSongsExtraReducer = createAsyncThunk(
    'extrareducer/songs',
    async({jwt}:{jwt:string}):Promise<Song[]>=>{
         const ft = await fetch(`${urlbase}/album/song/random`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${jwt}`
            }
        });

        if (!ft.ok) throw { message: 'Problemas con la lista de canciones' };
        return ft.json();
    }
);

export const findOneSongExtraReducer = createAsyncThunk(
    'extrareducer/onesong',
    async ({jwt, id}:{jwt:string, id:number}):Promise<Song>=>{
        const ft = await fetch(`${urlbase}/album/song/onesong/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${jwt}`
            }
        });

        if (!ft.ok) throw { message: 'Problemas con la lista de canciones' };
        return ft.json();
    }
);

export function appExtraReducer(builder: ActionReducerMapBuilder<InitialStateApp>) {
    builder.addCase(findListCategoryExtraReducer.fulfilled, (state, action) => {
        state.albums = initialStateApp.albums;
        state.category = initialStateApp.category;
        state.oneCategory = initialStateApp.oneCategory;
        state.oneAlbum = initialStateApp.oneAlbum;
        state.artists = initialStateApp.artists;
        state.oneArtist = initialStateApp.oneArtist;

        state.categoryList = action.payload;
    });
    builder.addCase(findCategoriesExtraReducer.fulfilled, (state, action) => {
        state.albums = initialStateApp.albums;
        state.category = initialStateApp.category;
        state.oneCategory = initialStateApp.oneCategory;
        state.oneAlbum = initialStateApp.oneAlbum;
        state.artists = initialStateApp.artists;
        state.oneArtist = initialStateApp.oneArtist;

        state.category = action.payload;
    });
    builder.addCase(findArtistsExtraReducer.fulfilled, (state, action) => {
        state.albums = initialStateApp.albums;
        state.category = initialStateApp.category;
        state.oneCategory = initialStateApp.oneCategory;
        state.oneAlbum = initialStateApp.oneAlbum;
        state.artists = initialStateApp.artists;
        state.oneArtist = initialStateApp.oneArtist;

        state.artists = action.payload;
    });
    builder.addCase(findOneCategory.fulfilled, (state, action) => {
        state.albums = initialStateApp.albums;
        state.category = initialStateApp.category;
        state.oneCategory = initialStateApp.oneCategory;
        state.oneAlbum = initialStateApp.oneAlbum;
        state.artists = initialStateApp.artists;
        state.oneArtist = initialStateApp.oneArtist;


        state.albums = action.payload.albums;
        state.oneCategory = action.payload.category;
        state.artists = action.payload.artists;
    });

    builder.addCase(findOneArtistExtraReducer.fulfilled, (state, action) => {
        state.albums = initialStateApp.albums;
        state.category = initialStateApp.category;
        state.oneCategory = initialStateApp.oneCategory;
        state.oneAlbum = initialStateApp.oneAlbum;
        state.artists = initialStateApp.artists;
        state.oneArtist = initialStateApp.oneArtist;


        state.albums = action.payload.albums;
        state.oneArtist = action.payload.artist;
    });
    builder.addCase(findSongByAlbumExtraReducer.fulfilled, (state, action) => {
        state.albums = initialStateApp.albums;
        state.category = initialStateApp.category;
        state.oneCategory = initialStateApp.oneCategory;
        state.oneAlbum = initialStateApp.oneAlbum;
        state.artists = initialStateApp.artists;
        state.oneArtist = initialStateApp.oneArtist;


        state.songs = action.payload.song;
        state.oneAlbum = action.payload.album;
    });
    builder.addCase(findSongsExtraReducer.fulfilled, (state, action)=>{
        state.songs = action.payload;
    });
    builder.addCase(findOneSongExtraReducer.fulfilled, (state, action)=>{
        state.onesong = action.payload;
    });
}



