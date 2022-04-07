import { getSession } from 'next-auth/react';
import axios from 'axios';
const url = 'https://api.spotify.com/v1/search?include_external=audio';
export default async function handler(req, res) {
	const session = await getSession({ req });
	const { query } = req.query;
	if (query.length === 0) {
		res.status(204).send(null);
	}
	if (session) {
		const { accessToken } = session;
		await axios
			.get(url, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
					'Content-Type': 'application/json',
				},
				params: {
					q: query,
					type: 'artist,track,album',
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
