// Next Components
import Image from 'next/image';

// Utils
import { truncateString } from '../../lib/utils';

// Styles
import { card, playButton } from './SpotifyItem.module.css';
import {
	textWhite,
	textMuted,
	textBold,
	textSm,
} from '../../styles/utils.module.css';

// FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

// Spotify State
import { useSpotifyContext } from '../../context/spotifyState';

export default function SpotifyItem({ data }) {
	const [musicQueue, updateQueue] = useSpotifyContext();
	return (
		<div className={card}>
			<Image
				src={data.album ? data.album.images[0].url : data.images[0].url}
				height={176}
				width={176}
				alt='Album Cover'
			></Image>
			<p className={`${textWhite} ${textBold}`}>
				{truncateString(data.name, 15)}
			</p>
			<p className={`${textMuted} ${textBold} ${textSm}`}>
				{data.description
					? truncateString(data.description, 75)
					: truncateString(data.artists[0].name, 20)}
			</p>
			<div
				onClick={() => {
					console.log(data);
					updateQueue([data.uri]);
				}}
				className={playButton}
			>
				<FontAwesomeIcon icon={faPlay} fontSize='25'></FontAwesomeIcon>
			</div>
		</div>
	);
}
