// Next Components
import Image from 'next/image';

// Utils
import { truncateString } from '../lib/utils';

// Styles
import { card, playButton } from '../styles/SpotifyItem.module.css';
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
				src={data.album.images[0].url}
				height={640}
				width={640}
				alt='Album Cover'
			></Image>
			<p className={`${textWhite} ${textBold}`}>{truncateString(data.name)}</p>
			<p className={`${textMuted} ${textBold} ${textSm}`}>
				{data.artists[0].name}
			</p>
			<div className={playButton}>
				<FontAwesomeIcon icon={faPlay} fontSize='25'></FontAwesomeIcon>
			</div>
		</div>
	);
}
