import SpotifyPlayer from 'react-spotify-web-playback';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { container } from './styles.module.css';
import { useSpotifyContext } from '../../context/spotifyState';

const spotifyPlayerStyles = {
	bgColor: '#292424',
	color: '#fff',
	height: 80,
	trackNameColor: '#fff',
};

export default function WebPlayer() {
	const { data: session } = useSession();
	const [musicQueue, updateQueue] = useSpotifyContext();
	if (session) {
		if (musicQueue.length == 0) {
			return null;
		}
		return (
			<div className={container}>
				<SpotifyPlayer
					token={session.accessToken}
					uris={musicQueue}
					styles={spotifyPlayerStyles}
					autoPlay={false}
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
