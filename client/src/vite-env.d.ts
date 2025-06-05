/// <reference types="vite/client" />


interface UserInfo {
	username: string,
	nickname: string,
	urlImage: string;
}
interface UserInitialState {
	jwt: string;
	userinfo: UserInfo;
	message: string;
}

interface LoginDto {
	username: string;
	password: string;
}

interface ErrorDto {
	message: string,
	statusCode: number,
	error: string,
	timestamp: string;
}

interface RegisterDto {
	username: string,
	password: string,
	nickname: string;
}

// procesos

interface Category {
	id: number;
	title: string;
	urlImage: string;
}
interface Artist {
	id: number,
	name: string,
	urlImage: string;
}

interface Album {
	id: number;
	title: string;
	urlImage: string;
	artists: Artist[];
	categories: Category[];
}

interface Song {
	id: number;
	title: string;
	urlImage: string;
	urlAudio: string;
	album: Album;
}
interface CategoryList extends Category {
	albums: {
		id: number,
		title: string,
		urlImage: string;
	}[];
}

interface InitialStateApp{
	songs:Song[],
	onesong:Song;
	albums:Album[],
	category:Category[],
	categoryList:CategoryList[],
	oneCategory:Category;
	oneAlbum:Album;
	artists:Artist[];
	oneArtist:Artist;
}