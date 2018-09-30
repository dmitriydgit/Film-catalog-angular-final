import { InjectionToken } from '@angular/core';
import { FilmService } from '../services/film.service';


export const constantes = {
	user: {
		login: 'ddd@gmail.com',
		password: '12345678'
	},

	APIs: {
		apiUrl: "https://api.themoviedb.org/3",
		apiKey: 'c0fc670dfde05caa51eb0f657644c313',
		apiKeyAct: '434343434',
		reqToken: 'd375a3974d26d8a07d941b4f3c776ec22bfb2b70',
		imgPath: 'https://image.tmdb.org/t/p',
	}

	// apiKey: '0994e7679a856150aadcecf7de489bce',
}

export const DEFAULT_SETTINGS = new InjectionToken<FilmService>('qwerty');