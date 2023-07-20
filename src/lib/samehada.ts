import {homeScrape} from '@/scraper/home.js';
import got, {type Got} from 'got';

/**
 * @class Samehada
 */
export class Samehada {
	public $http: Got;

	/**
     * @constructor
     * @param baseUrl Samehadaku site
     */
	constructor(baseUrl = 'https://samehadaku.wiki') {
		this.$http = got.extend({
			prefixUrl: baseUrl,
		});
	}

	async fetchHome() {
		const response = await this.$http.get('./');
		return homeScrape(response.body);
	}
}
