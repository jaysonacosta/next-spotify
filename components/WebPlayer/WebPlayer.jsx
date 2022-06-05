// Styles
import { container } from './styles.module.css';
const spotifyPlayerStyles = {
	bgColor: '#292424',
	color: '#fff',
	height: 80,
	trackNameColor: '#fff',
};

// Spotify Player SDK
import SpotifyPlayer from 'react-spotify-web-playback';

// NextAuth
import { useSession } from 'next-auth/react';

// Hooks
import { useEffect } from 'react';

// Spotify State
import { useSpotifyContext } from '../../context/spotifyState';

export default function WebPlayer() {
	const { data: session } = useSession();
	const [musicQueue, updateQueue] = useSpotifyContext();
	if (session) {
		// if (musicQueue.length == 0) {
		// 	return null;
		// }
		return (
			<div className={container}>
				<SpotifyPlayer
					token={session.accessToken}
					uris={musicQueue}
					styles={spotifyPlayerStyles}
					autoPlay={true}
					syncExternalDevice={true}
					persistDeviceSelection={true}
					name={'Next Spotify'}
					showSaveIcon={true}
				></SpotifyPlayer>
			</div>
		);
	}
	return null;
}
