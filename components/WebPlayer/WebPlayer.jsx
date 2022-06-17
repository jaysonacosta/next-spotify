import SpotifyPlayer from 'react-spotify-web-playback';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { container } from './styles.module.css';
import { useSpotifyContext } from '../../context/spotifyState';

const spotifyPlayerStyles = {
	bgColor: '#292424',
	color: '#fff',
	height: '80px',
	trackNameColor: '#fff',
};

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
					autoPlay={true}
					syncExternalDevice={true}
					persistDeviceSelection={true}
					name={'Next Spotify'}
					showSaveIcon={true}
				/>
			</div>
		);
	}
	return null;
}
