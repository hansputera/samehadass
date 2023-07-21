import type {ComicUpdate, OngoingAnime, UpdatesAnime} from '@/types/index.js';
import DOM from '@mojojs/dom';

const ongoingScrape = (input: DOM): OngoingAnime[] => {
	const doms = input.find('.animeongoing .animposx');
	return doms.filter(dom => dom instanceof DOM)
		.map(dom => ({
			thumbnail: dom.at('img')?.attr.src ?? '',
			href: dom.at('a')?.attr.href ?? '',
			name: dom.at('a')?.attr.title ?? '',
			rating: parseFloat(dom.at('.score')?.text().trim() ?? ''),
			status: 'ongoing',
			type: dom.at('.type')?.text() ?? '',
		}));
};

const comicScrape = (input: DOM): ComicUpdate[] => {
	const doms = input.find('.animepost .animposx a');
	return doms.filter(dom => dom instanceof DOM && !dom.attr.rel)
		.map(dom => ({
			name: dom.at('.title')?.text().trim() ?? '',
			url: dom.attr.href,
			image: dom.at('img')?.attr.src ?? '',
			chapter: parseFloat(dom.at('.type')?.text().match(/([0-9]+(?:\.[0-9])?)/g)?.at(0) ?? '0'),
		}));
};

const latestAnimeScrape = (input: DOM): Array<Omit<UpdatesAnime, 'rating' | 'type'>> => {
	const doms = input.find('.post-show li[itemscope]');
	const extractEpisode = (dom: DOM): number | number[] => {
		const episodes = dom.at('.dtla author')?.text().trim().match(/([0-9]+)/g) ?? ['0'];
		return Array.isArray(episodes) && episodes.length > 1 ? episodes.map(x => parseFloat(x)) : parseFloat(episodes[0]);
	};

	return doms.map(dom => ({
		thumbnail: dom.at('.npws')?.attr.src ?? '',
		name: dom.at('.entry-title a')?.text().trim() ?? '',
		episode: extractEpisode(dom),
		href: dom.at('a')?.attr.href ?? '',
		postedBy: dom.at('.vcard author[itemprop="name"]')?.text().trim() ?? '',
		releasedOn: dom.find('.dtla span').at(-1)?.text().replace(/(released on|:)/gi, '').trim() ?? '',
	}));
};

export const homeScrape = async (html: string) => {
	const dom = new DOM(html);

	// 1. ongoing updates
	// 2. comic/manga updates
	// 3. latest uploaded videos
	return {
		ongoing: ongoingScrape(dom),
		comics: comicScrape(dom),
		latest: latestAnimeScrape(dom),
	};
};
