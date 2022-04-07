// Next Components
import Image from 'next/image';

// Utils
import { truncateString } from '../lib/utils';

// Styles
import { card, playButton, image } from '../styles/SpotifyArtist.module.css';
import {
	textWhite,
	textMuted,
	textBold,
	textSm,
} from '../styles/utils.module.css';

// FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

export default function SpotifyItem({ data }) {
	return (
		<div className={card}>
			<Image
				src={
					data.images[0] ? data.images[0].url : '/missing-artist.jpg'
				}
				height={176}
				width={176}
				className={image}
				alt='Artist Photo'
			></Image>
			<p className={`${textWhite} ${textBold}`}>{truncateString(data.name)}</p>
			<p className={`${textMuted} ${textBold} ${textSm}`}>Artist</p>
			<div className={playButton}>
				<FontAwesomeIcon icon={faPlay} fontSize='25'></FontAwesomeIcon>
			</div>
		</div>
	);
}
