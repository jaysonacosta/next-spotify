import '../styles/globals.css';

import { SessionProvider } from 'next-auth/react';

import { SpotifyState } from '../context/spotifyState';
import WebPlayer from '../components/WebPlayer';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
	return (
		<SessionProvider session={session}>
			<SpotifyState>
				<Component {...pageProps} />
				<WebPlayer></WebPlayer>
			</SpotifyState>
		</SessionProvider>
	);
}

export default MyApp;
