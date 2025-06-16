import { createAsyncThunk, type ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { urlbase } from "./userExtraReducer";
import { routesname } from "../../routes/routesname";


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
    },
    message: "",
    loading: false
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
        const ft3 = fetch(`${urlbase}/artist/category/${id}`, {
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
    async ({ jwt, id }: { jwt: string, id: number }): Promise<{ song: Song[], album: Album }> => {
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
        return { song: await ft.json(), album: await ft2.json() }
    }
);

export const findSongsExtraReducer = createAsyncThunk(
    'extrareducer/songs',
    async ({ jwt }: { jwt: string }): Promise<Song[]> => {
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
    async ({ jwt, id }: { jwt: string, id: number }): Promise<Song> => {
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



// ---------Admin extrareducers--------------------

export const createDataExtraReducer = createAsyncThunk(
    'extrareducer/createcategory',
    async ({ jwt, formdata, option }: { jwt: string, formdata: FormData, option: string }): Promise<void> => {
        const ft = await fetch(`${urlbase}/${option}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${jwt}`
            },
            body: formdata
        });

        if (!ft.ok) throw { message: 'Problemas con la lista de canciones' };
        return ft.json();
    }
);

export const createSongsExtraReducer = createAsyncThunk(
    'extrareducer/createsongs',
    async ({ id, data, jwt }: { id: number, data: FormData[], jwt: string }): Promise<{ id: number }> => {
        const urlbsesong = `${urlbase}/album/song/${id}`
        await Promise.all(data.map(async p => {
            const ft = await fetch(urlbsesong, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${jwt}`
                },
                body: p
            });
            if (!ft.ok) throw { message: 'Problemas con la lista de canciones' };
        }))
        return { id };
    }
);

export const findArtistAndCategoryListExtraReducer = createAsyncThunk(
    'extrareducer/artistAndCategory',
    async ({ jwt }: { jwt: string }): Promise<{ artistas: Artist[], categories: Category[] }> => {
        const ft = await fetch(`${urlbase}/artist`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${jwt}`
            }
        });
        if (!ft.ok) throw { message: 'Problemas con la lista de artistas' };

        const ft2 = await fetch(`${urlbase}/category`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${jwt}`
            }
        });
        if (!ft2.ok) throw { message: 'Problemas con la lista de categorias' };
        return {
            artistas: await ft.json(),
            categories: await ft2.json()
        }
    }
);


export const deleteOneElementExtraReducer = createAsyncThunk(
    'extrareducer/deleteOneElement',
    async ({ id, option, jwt }: { id: number, option: OptionsApi, jwt: string }): Promise<{ id: number, option: OptionsApi }> => {
        const ft = await fetch(`${urlbase}/${option}/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${jwt}`
            }
        });
        if (!ft.ok) throw { message: 'Error para eliminar elemento' };
        return { option, id }
    }
);

export const searchDataExtraReducer = createAsyncThunk(
    'extrareducer/searchdata',
    async ({ jwt, title }: { jwt: string, title: string }): Promise<{ albums: Album[], songs: Song[], artists: Artist[] }> => {
        const ft = await fetch(`${urlbase}/search/${title}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${jwt}`
            }
        });
        if (!ft.ok) throw { message: 'Error para eliminar elemento' };
        return ft.json();
    }
);

export function appExtraReducer(builder: ActionReducerMapBuilder<InitialStateApp>) {
    builder.addCase(findListCategoryExtraReducer.pending, (state) => {
        state.loading = true;
    });
    builder.addCase(findListCategoryExtraReducer.fulfilled, (state, action) => {
        restartApp(state);

        state.categoryList = action.payload;
    });
    builder.addCase(findListCategoryExtraReducer.rejected, (state) => {
        restartApp(state);
    });


    builder.addCase(findCategoriesExtraReducer.pending, (state) => {
        state.loading = true;
    });
    builder.addCase(findCategoriesExtraReducer.fulfilled, (state, action) => {
        restartApp(state);

        state.category = action.payload;
    });
    builder.addCase(findCategoriesExtraReducer.rejected, (state) => {
        restartApp(state);
    });


    builder.addCase(findArtistsExtraReducer.pending, (state) => {
        state.loading = true;
    });
    builder.addCase(findArtistsExtraReducer.fulfilled, (state, action) => {
        restartApp(state);

        state.artists = action.payload;
    });
    builder.addCase(findArtistsExtraReducer.rejected, (state) => {
        restartApp(state);
    });


    builder.addCase(findOneCategory.pending, (state) => {
        state.loading = true;
    });
    builder.addCase(findOneCategory.fulfilled, (state, action) => {
        restartApp(state);


        state.albums = action.payload.albums;
        state.oneCategory = action.payload.category;
        state.artists = action.payload.artists;
    });
    builder.addCase(findOneCategory.rejected, (state) => {
        restartApp(state);
    });


    builder.addCase(findOneArtistExtraReducer.pending, (state) => {
        state.loading = true;
    });
    builder.addCase(findOneArtistExtraReducer.fulfilled, (state, action) => {
        restartApp(state);


        state.albums = action.payload.albums;
        state.oneArtist = action.payload.artist;
    });
    builder.addCase(findOneArtistExtraReducer.rejected, (state) => {
        restartApp(state);
    });


    builder.addCase(findSongByAlbumExtraReducer.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(findSongByAlbumExtraReducer.fulfilled, (state, action) => {
        restartApp(state);


        state.songs = action.payload.song;
        state.oneAlbum = action.payload.album;
    });
    builder.addCase(findSongByAlbumExtraReducer.rejected, (state) => {
        restartApp(state);
    });


    builder.addCase(findSongsExtraReducer.fulfilled, (state, action) => {
        state.songs = action.payload;
    });


    builder.addCase(findOneSongExtraReducer.fulfilled, (state, action) => {
        state.onesong = action.payload;
    });


    builder.addCase(createDataExtraReducer.pending, (state) => {
        state.loading = true;
    });
    builder.addCase(createDataExtraReducer.fulfilled, (state) => {
        state.loading = false;
        window.location.reload();
    });
     builder.addCase(createDataExtraReducer.rejected, (state, action) => {
        state.loading = false;
        state.message = action.error.message ?? 'Error al agregar datos'
    });


    builder.addCase(findArtistAndCategoryListExtraReducer.fulfilled, (state, action) => {
        state.artists = action.payload.artistas;
        state.category = action.payload.categories;
    });


    builder.addCase(createSongsExtraReducer.fulfilled, (state, action) => {
        state.loading = false;
        window.location.href = `${routesname.onealbum}?id=${action.payload.id}`;
    }); 
    builder.addCase(createSongsExtraReducer.pending, (state) => {
        state.loading = true;
    });
    builder.addCase(createSongsExtraReducer.rejected, (state, action) => {
       state.loading = false;
       state.message = action.error.message ?? 'Error al agregar canciones';
    });


    builder.addCase(deleteOneElementExtraReducer.fulfilled, () => {
        window.location.href = `/#${routesname.home}`;
    });


    builder.addCase(searchDataExtraReducer.pending, (state) => {
       state.loading = true;
    });
    builder.addCase(searchDataExtraReducer.fulfilled, (state, action) => {
        restartApp(state);
        const { artists, albums, songs } = action.payload;
        state.albums = albums;
        state.artists = artists;
        state.songs = songs;
        state.loading = false;
    });
    builder.addCase(searchDataExtraReducer.rejected, (state) => {
       restartApp(state);
    });

}

function restartApp(state: InitialStateApp) {
    state.albums = initialStateApp.albums;
    state.artists = initialStateApp.artists;
    state.category = initialStateApp.category;
    state.categoryList = initialStateApp.categoryList;
    state.oneAlbum = initialStateApp.oneAlbum;
    state.oneArtist = initialStateApp.oneArtist;
    state.loading = false;
}