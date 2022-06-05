import { getSession } from 'next-auth/react';
import axios from 'axios';
const url = 'https://api.spotify.com/v1/me/playlists';
export default async function handler(req, res) {
	const session = await getSession({ req });
	if (session) {
		const { accessToken } = session;
		await axios
			.get(url, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
					'Content-Type': 'application/json',
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
