// Styles
import { container } from './styles.module.css';
const spotifyPlayerStyles = {
	bgColor: '#292424',
	color: '#fff',
	height: 80,
	trackNameColor: '#fff',
	activeColor: '#fff',
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
		return (
			<div className={container}>
				<SpotifyPlayer
					token={session.accessToken}
					uris={musicQueue}
					styles={spotifyPlayerStyles}
					callback={(state) => {
						console.log(state);
					}}
					autoPlay={true}
					syncExternalDevice={true}
					persistDeviceSelection={true}
					name={"Next Spotify"}
				></SpotifyPlayer>
			</div>
		);
	}
	return null;
}
