import {homeScrape} from '@/scraper/home.js';
import {FetchPrefixUrl} from 'fetch-baseurl';

/**
 * @class Samehada
 */
export class Samehada {
	public $http: FetchPrefixUrl;

	/**
     * @constructor
     * @param baseUrl Samehadaku site
     */
	constructor(baseUrl = 'https://samehadaku.skin') {
		this.$http = new FetchPrefixUrl(baseUrl);
	}

	async fetchHome() {
		const response = await this.$http.get('./', {});
		return homeScrape(await response.text());
	}
}
