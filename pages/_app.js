import '../styles/globals.css';

import { SessionProvider } from 'next-auth/react';

import { SpotifyState } from '../context/spotifyState';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
	return (
		<SessionProvider session={session}>
			<SpotifyState>
				<Component {...pageProps} />
			</SpotifyState>
		</SessionProvider>
	);
}

export default MyApp;
