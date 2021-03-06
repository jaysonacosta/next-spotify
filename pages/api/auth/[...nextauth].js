import NextAuth from 'next-auth/next';
import SpotifyProvider from 'next-auth/providers/spotify';

const SPOTIFY_AUTHORIZATION_URL =
	'https://accounts.spotify.com/authorize/' +
	new URLSearchParams({
		prompt: 'consent',
		access_type: 'offline',
		response_type: 'code',
	});

const scope = [
	'user-read-email',
	'user-read-recently-played',
	'user-top-read',
	'streaming',
	'user-read-private',
	'user-read-playback-state',
	'user-modify-playback-state',
	'user-library-read',
	'user-library-modify',
	'user-read-currently-playing',
];

async function refreshAccessToken(token) {
	try {
		const url =
			'https://accounts.spotify.com/api/token?' +
			new URLSearchParams({
				client_id: process.env.SPOTIFY_CLIENT_ID,
				client_secret: process.env.SPOTIFY_CLIENT_SECRET,
				grant_type: 'refresh_token',
				refresh_token: token.refreshToken,
			});

		const response = await fetch(url, {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			method: 'POST',
		});

		const refreshedTokens = await response.json();

		if (!response.ok) {
			throw refreshedTokens;
		}

		return {
			...token,
			accessToken: refreshedTokens.access_token,
			accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
			refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
		};
	} catch (error) {
		return {
			...token,
			error: 'RefreshAccessTokenError',
		};
	}
}

export default NextAuth({
	providers: [
		SpotifyProvider({
			clientId: process.env.SPOTIFY_CLIENT_ID,
			clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
			authorization: { params: { scope } },
		}),
	],
	callbacks: {
		async jwt({ token, user, account }) {
			// Initial sign in
			if (account && user) {
				return {
					accessToken: account.access_token,
					accessTokenExpires: Date.now() + account.expires_in * 1000,
					refreshToken: account.refresh_token,
					user,
				};
			}

			// Return previous token if the access token has not expired yet
			if (Date.now() < token.accessTokenExpires) {
				return token;
			}

			// Access token has expired, try to update it
			return refreshAccessToken(token);
		},
		async session({ session, token }) {
			session.user = token.user;
			session.accessToken = token.accessToken;
			session.error = token.error;

			return session;
		},
	},
	secret: process.env.JWT_SECRET,
});
