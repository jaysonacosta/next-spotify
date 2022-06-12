import Image from 'next/image';

import { truncateString } from '../../lib/utils';

import { image } from './SpotifyArtist.module.css';
import {
	textWhite,
	textMuted,
	textBold,
	textSm,
	card,
	playButton,
} from '../../styles/utils.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

import { useSpotifyContext } from '../../context/spotifyState';

export default function SpotifyItem({ data, setContext }) {
	const [musicQueue, updateQueue] = useSpotifyContext();

	return (
		<div
			className={card}
			onContextMenu={(e) => {
				e.preventDefault();
				const coords = { x: e.pageX, y: e.pageY };
				setContext(data, coords);
			}}
		>
			<Image
				src={data.images[0] ? data.images[0].url : '/missing-artist.jpg'}
				height={176}
				width={176}
				className={image}
				alt='Artist Photo'
			></Image>
			<p className={`${textWhite} ${textBold}`}>
				{truncateString(data.name, 15)}
			</p>
			<p className={`${textMuted} ${textBold} ${textSm}`}>Artist</p>
			<div className={playButton}>
				<FontAwesomeIcon icon={faPlay} fontSize='25'></FontAwesomeIcon>
			</div>
		</div>
	);
}
