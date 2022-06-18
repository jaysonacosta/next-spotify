import SpotifyPlayer from 'react-spotify-web-playback';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { container } from './styles.module.css';
import { useSpotifyContext } from '../../context/spotifyState';
import { useWindow } from '../../hooks/useWindow';

export default function WebPlayer() {
	const { data: session } = useSession();
	const [musicQueue, updateQueue] = useSpotifyContext();
	const windowSize = useWindow();

	const spotifyPlayerStyles =
		windowSize.innerWidth >= 1120
			? {
					bgColor: '#292424',
					color: '#fff',
					height: '80px',
					trackNameColor: '#fff',
			  }
			: {
					bgColor: '#292424d4',
					color: '#fff',
					height: '60px',
					trackNameColor: '#fff',
			  };

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
