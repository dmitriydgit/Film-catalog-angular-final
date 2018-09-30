import { Injectable, Inject } from '@angular/core';
import { Film } from '../models/film';
import { SortOption } from '../models/sort-option';
import { HttpClient } from '@angular/common/http';
import { DEFAULT_SETTINGS } from '../configs/config';
import { forkJoin, Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})

export class FilmService {

	//new apiKey c0fc670dfde05caa51eb0f657644c313
	// request token d375a3974d26d8a07d941b4f3c776ec22bfb2b70
	//session id 8b657e0fd4287934e391f615323eef104c21cd54
	//user id 8009507

	// apiUrl: string = "https://api.themoviedb.org/3"
	// apiKey: string = '0994e7679a856150aadcecf7de489bce'
	// apiKeyAct: string = '434343434'

	movieUrl: string = `${this.settings.APIs.apiUrl}/movie`
	searchUrl: string = `${this.settings.APIs.apiUrl}/search`
	personUrl: string = `${this.settings.APIs.apiUrl}/person`
	paramsFilms: string = `&api_key=${this.settings.APIs.apiKey}&language=ru-RU`
	paramsActors: string = `&api_key=${this.settings.APIs.apiKey}&language=ru-RU`
	paramsFilmsSearch: string = `?api_key=${this.settings.APIs.apiKey}&language=en`

	apiURLSingle: string = 'https://api.themoviedb.org/3/movie/299536?api_key=0994e7679a856150aadcecf7de489bce&language=en-US'


	// imgPath: string = 'https://image.tmdb.org/t/p'
	midImgPath: string = `${this.settings.APIs.imgPath}/w500`
	smallImgPath: string = `${this.settings.APIs.imgPath}/w185`
	bigBackPath: string = `${this.settings.APIs.imgPath}/w1280`
	midBackPath: string = `${this.settings.APIs.imgPath}/w780`
	smallBackPath: string = `${this.settings.APIs.imgPath}/w300`

	constructor(
		@Inject(DEFAULT_SETTINGS) private settings: any,
		private http: HttpClient,
	) { }

	getDataFromApi(page: number, dataCategory: string) {
		return dataCategory === "films"
			? this.getPopularFilms(page, dataCategory)
			: this.getPopularActors(page, dataCategory)
	}

	searchData(srchStr: string, dataCategory: string, page: number) {
		return dataCategory === "films"
			? this.searchPopularFilms(srchStr, dataCategory, page)
			: this.searchPopularActors(srchStr, dataCategory, page)
	}

	getFilmById(id, dataCategory): Observable<any[]> {
		//let film = 
		//let filmActors = this.http.get(`${this.movieUrl}/${id}/credits${this.paramsFilmsSearch}`)
		//let filmImages = this.http.get(`${this.movieUrl}/${id}/images${this.paramsFilmsSearch}`)
		//let filmVideos = this.http.get(`${this.movieUrl}/${id}/videos${this.paramsFilmsSearch}`)
		return forkJoin([
			this.http.get(`${this.movieUrl}/${id}${this.paramsFilmsSearch}`),
			this.http.get(`${this.movieUrl}/${id}/credits${this.paramsFilmsSearch}`),
			this.http.get(`${this.movieUrl}/${id}/images${this.paramsFilmsSearch}`),
			this.http.get(`${this.movieUrl}/${id}/videos${this.paramsFilmsSearch}`)
		]);
	}

	// `${this.apiConfig.movieUrl}/${filmId}/images?${this.apiConfig.apiKey}&language=en`)


	getActorById(id, dataCategory) {
		return dataCategory === "films"
			? this.http.get(`${this.movieUrl}/${id}${this.paramsFilmsSearch}`)
			: this.http.get(`${this.personUrl}/${id}${this.paramsFilmsSearch}`)
	}


	getPopularFilms(page: number, dataCategory: string) {
		return this.http.get(`${this.movieUrl}/popular?page=${page}${this.paramsFilms}`)
	}

	getPopularActors(page: number, dataCategory: string) {
		return this.http.get(`${this.personUrl}/popular?page=${page}${this.paramsActors}`)
	}

	searchPopularFilms(srchStr: string, dataCategory: string, page: number) {
		return this.http.get(`${this.searchUrl}/movie${this.paramsFilmsSearch}&query=${srchStr}&page=${page}`)
	}

	searchPopularActors(srchStr: string, dataCategory: string, page: number) {
		return this.http.get(`${this.searchUrl}/person${this.paramsFilmsSearch}&query=${srchStr}&page=${page}`)
	}



	///movie/{movie_id}/videos
	///movie/{movie_id}/images
	///movie/{movie_id}/credits   cast











	// searchActors(srchStr: string) {
	// 	console.log("searching")
	// 	return this.http.get(`${this.searchUrl}/person${this.paramsFilmsSearch}&query=${srchStr}`)
	// }


	// getFilmById(id?): Observable<any> {
	// 	// return this.http.get()


	// 	// .pipe(
	// 		// 	map((dataList: Array<any>) => {
	// 		// 		return dataList.filter(el => el.id === id)[0];
	// 		// 	})
	// 		// )
	// }






}

//https://api.themoviedb.org/3/movie/search/movie?api_key=0994e7679a856150aadcecf7de489bce&language=ru-RU&query=%D1%82%D0%BE%D1%80

//https://api.themoviedb.org/3/search/movie?api_key=0994e7679a856150aadcecf7de489bce&language=ru-RU&query=тор&page=1&include_adult=false
//https://api.themoviedb.org/3/search/movie?api_key=0994e7679a856150aadcecf7de489bce&language=en-US&query=tor&page=1&include_adult=false
//https://api.themoviedb.org/3/movie/popular?page=1&api_key=0994e7679a856150aadcecf7de489bce&language=ru-RU`


// getFilms() {
// 	return this.films.slice(0, 3);
// }

// films: Film[] = [
	// 	{ id: 1, favorite: false, name: "Тор: Рагнарёк", year: "2017", imgUrl: "https://image.tmdb.org/t/p/w300_and_h450_bestv2/2NEzIdBAgm4kSYXF4OH86qs3a0u.jpg", description: "Вернувшись в Асгард в поисках таинственного врага, ведущего охоту на Камни Бесконечности, Тор обнаруживает, что действия его брата Локи, захватившего трон Асгарда, привели к приближению наиболее страшного события — Рагнарёка." },
// 	{ id: 2, favorite: false, name: "Чудо-женщина ", year: "2017", imgUrl: "https://image.tmdb.org/t/p/w300_and_h450_bestv2/fMnMonAyK3nzp1P1odIFzYoSvYe.jpg", description: "Перед тем как стать Чудо-Женщиной, она была Дианой — принцессой амазонок, обученной быть непобедимой воительницей. И когда на берегах огражденного ото внешнего мира райского острова, который служил ей родиной, терпит крушение американский пилот и рассказывает о серьезном конфликте, бушующем во внешнем мире, Диана покидает свой дом, чтобы справиться с этой угрозой" },
// 	{ id: 3, favorite: false, name: "Звёздные Войны: Последние джеда", year: "2017", imgUrl: "https://image.tmdb.org/t/p/w300_and_h450_bestv2/qP4gdqvE4KsFqkeY9EdVRCA8ahj.jpg", description: "Баланс Силы снова нарушен, и события развиваются с невероятной скоростью! Рей, Финну, вездесущему дроиду BB-8 и другим героям предстоит опасная схватка с могущественным Первым Орденом." },
// 	{ id: 4, favorite: false, name: "Бегущий по лезвию 2049", year: "2017", imgUrl: "https://image.tmdb.org/t/p/w300_and_h450_bestv2/lxFTHZHBHRXcuzR9ygpMGP1kEKr.jpg", description: "В недалеком будущем мир населен людьми и репликантами, созданными выполнять самую тяжелую работу. Работа офицера полиции Кей - держать репликантов под контролем в условиях нарастающего напряжения" },
// 	{ id: 5, favorite: false, name: "Лига справедливости", year: "2017", imgUrl: "https://image.tmdb.org/t/p/w300_and_h450_bestv2/e2f1GaWLkk5Sj7cZMi38mUPXYdt.jpg", description: "Понимая, что существуют угрозы, с которыми невозможно справиться в одиночку, Бэтмен и Супермен создают совершенно новую команду, собрав в ней самых могущественных защитников человечества. " },
// 	{ id: 6, favorite: false, name: "Чужой. Завет", year: "2017", imgUrl: "https://image.tmdb.org/t/p/w300_and_h450_bestv2/5ff1DVsSL7CP5zIjr8ayHaaHScP.jpg", description: "Выжившие члены команды «Прометея» Элизабет и андроид Дэвид сделали первый шаг навстречу разгадке тайны инженеров. Теперь пришло время узнать остальную правду, которая укрыта на родной планете белесых великанов — Рай." },
// 	{ id: 7, favorite: false, name: "Хан Соло: Звёздные Войны. Истории", year: "2018", imgUrl: "https://image.tmdb.org/t/p/w300_and_h450_bestv2/k7sOpf0TeBPUIix8IL5MGCQMFev.jpg", description: "Фильм расскажет о похождениях юного космического сорвиголовы Хана Соло и его верного напарника Чубакки и о том, как они стали самыми быстрыми пилотами и самыми хитрыми контрабандистами далёкой Галактики." },
// 	{ id: 8, favorite: false, name: "Дэдпул 2", year: "2018", imgUrl: "https://image.tmdb.org/t/p/w300_and_h450_bestv2/ukbLruQbrchScy3jTXgeAz9IWDL.jpg", description: "Выжив после смертоносной атаки быков, изуродованный шеф-повар кафетерия пытается исполнить свою мечту - стать самым горячим барменом в Мэйберри - и в то же время справиться с потерянными вкусовыми ощущениями. Чтобы восстановить остроту чувств, а еще и потоковый накопитель, Уэйд должен будет сразиться с ниндзями, якудзой и стаей сексуально агрессивных собачек, в то время как он объедет весь земной шар и поймет важность семьи, дружбы и вкуса - а заодно обнаружит новую тягу к приключениям и заработает желанную надпись на кружке «Лучший любовник в мире»." },
// 	{ id: 9, favorite: false, name: "Tomb Raider: Лара Крофт", year: "2018", imgUrl: "https://image.tmdb.org/t/p/w300_and_h450_bestv2/6NUZPCujVGbewamFAnRfBKy4F4C.jpg", description: "Лара Крофт - весьма самостоятельная дочь эксцентричного искателя приключений, который пропал, едва она стала подростком. Теперь ей двадцать один, она бесцельно проживает свою жизнь, курьером рассекая на байке по забитым улицам восточного Лондона, а ее заработка едва хватает на оплату квартиры и занятий в колледже. Решительно настроенная пробиться сама, она отказывается брать на себя руководство глобальной империей отца, столь же категорично отвергая мысль о том, что он действительно пропал." },
// 	{ id: 10, favorite: false, name: "Стражи Галактики", year: "2014", imgUrl: "https://image.tmdb.org/t/p/w300_and_h450_bestv2/L6U6zH3N39toWXIjvfPjxgRXuG.jpg", description: "Отважному путешественнику Питеру Квиллу попадает в руки таинственный артефакт, принадлежащий могущественному и безжалостному злодею Ронану, строящему коварные планы по захвату Вселенной. Питер оказывается в центре межгалактической охоты, где жертва — он сам." },
// 	{ id: 11, favorite: false, name: "Тихоокеанский рубеж 2", year: "2018", imgUrl: "https://image.tmdb.org/t/p/w300_and_h450_bestv2/hAR6AdEKMVQXrcTt1hnaEU7YvSX.jpg", description: "Команда пилотируемых роботов-защитников остановила вторжение гигантских инопланетных монстров. Великая битва за Тихоокеанский рубеж ознаменовала новую главу в истории человечества. Однако война только начинается… Пришло время нового поколения отстаивать своё право на Землю." },
// 	{ id: 12, favorite: false, name: "Интерстеллар ", year: "2014", imgUrl: "https://image.tmdb.org/t/p/w300_and_h450_bestv2/5IGqQ86P8dfpNShocqz8rx38mv0.jpg", description: "Наше время на Земле подошло к концу, команда исследователей берет на себя самую важную миссию в истории человечества; путешествуя за пределами нашей галактики, чтобы узнать есть ли у человечества будущее среди звезд." },
// ];