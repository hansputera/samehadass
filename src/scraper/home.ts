import type {OngoingAnime} from '@/types/index.js';
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

export const homeScrape = async (html: string) => {
	const dom = new DOM(html);

	// 1. index 0 = ongoing updates
	// 2. index 1 = comic/manga updates
	// 3. index 2 = latest uploaded videos
	return {
		ongoing: ongoingScrape(dom),
	};
};
