import { getSession } from 'next-auth/react';
import axios from 'axios';
const recommendationsURL = 'https://api.spotify.com/v1/recommendations';
const recentlyPlayedURL =
	'https://api.spotify.com/v1/me/player/recently-played';
export default async function handler(req, res) {
	const session = await getSession({ req });
	if (session) {
		const { accessToken } = session;
		const seedArtists = [];
		await axios
			.get(recentlyPlayedURL, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
					'Content-Type': 'application/json',
				},
				params: {
					limit: 5,
				},
			})
			.then(({ data }) => {
				data.items.forEach((item) => {
					const artistId = item.track.artists[0].id;
					seedArtists.push(artistId);
				});
			})
			.catch((error) => {
				res.status(403).json(error);
			});
		console.log(JSON.stringify(seedArtists));
		await axios
			.get(recommendationsURL, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
					'Content-Type': 'application/json',
				},
				params: {
					seed_artists: seedArtists[0],
				},
			})
			.then(({ data }) => {
				res.status(200).json(data);
			})
			.catch((error) => {
				res.status(403).json(error);
			});
	} else {
		res.status(401).json({ message: 'Unauthorized' });
	}
}
