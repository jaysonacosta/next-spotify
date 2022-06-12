import { getSession } from 'next-auth/react';
import axios from 'axios';

export default async function handler(req, res) {
	const session = await getSession({ req });
	if (session) {
		const { id } = req.query;
		const url = `https://api.spotify.com/v1/albums/${id}`;
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
