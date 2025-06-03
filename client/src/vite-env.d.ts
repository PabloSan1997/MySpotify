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