export type AnimeStatus = 'ongoing' | 'completed' | 'movie';

export type Anime = {
	href: string;
	thumbnail: string;
	type: string;
	rating: number;
	name: string;
	/**
     * Extracted from .details.status
     */
	status: AnimeStatus;
	synopsis: string;
	genres: string[];
	details: Record<string, string | {
		value: string;
		href: string;
	}>;
};

export type OngoingAnime = Omit<Anime, 'details' | 'synopsis' | 'genres'> & {
	status: 'ongoing';
};

export type UpdatesAnime = Omit<OngoingAnime, 'status'> & {
	postedBy: string;
	episode: number | number[];
	releasedOn: string;
};

export type UpdatesBatchAnime = UpdatesAnime & {
	episode: string;
};

export type Comic = {
	url: string;
	name: string;
	image: string;
};

export type ComicUpdate = Comic & {
	chapter: number; // Floated
};
