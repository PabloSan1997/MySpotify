import { createAsyncThunk, type ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { urlbase } from "./userExtraReducer";

export const initialStateApp: InitialStateApp = {
    songs: [],
    onesong: undefined,
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
    async ({ jwt, id }: { jwt: string, id: number }): Promise<{ category: Category, albums: Album[] }> => {

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

        const data = { fetch1: await ft1, fetch2: await ft2 };
        if (!data.fetch1.ok || !data.fetch2.ok) throw { message: 'Problemas al cargar los elementos' };
        const category = await data.fetch1.json();
        const albums = await data.fetch2.json();
        return { category, albums };
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
    })
}



