import { getSession } from 'next-auth/react';
const url = 'https://api.spotify.com/v1/me/player/recently-played';
export default async function handler(req, res) {
	const session = await getSession({ req });
	if (session) {
		const { accessToken } = session;
		fetch(url, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${accessToken}`,
				'Content-Type': 'application/json',
			},
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error('Something went wrong.');
				}
				return response.json();
			})
			.then((response) => {
				res.status(200).json(response);
			})
			.catch((err) => {
				res.status(403).json({ error: 'Something went wrong.' });
			});
	} else {
		res.status(401).json({ message: 'Unauthorized' });
	}
}
