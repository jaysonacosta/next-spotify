import Link from 'next/link';
import Image from 'next/image';

import { truncateString } from '../../lib/utils';

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

export default function SpotifyAlbum({ data, setContext }) {
	return (
		// <Link>
		// 	<a>
		<div
			className={card}
			onContextMenu={(e) => {
				e.preventDefault();
				const coords = { x: e.pageX, y: e.pageY };
				setContext(data, coords);
			}}
		>
			<Image
				src={data.images.length ? data.images[0].url : '/missing-artist.jpg'}
				height={176}
				width={176}
				alt='Playlist Image'
			></Image>
			<p className={`${textWhite} ${textBold}`}>
				{truncateString(data.name, 15)}
			</p>
			<p className={`${textMuted} ${textBold} ${textSm}`}>
				{truncateString(data.artists[0].name, 15)}
			</p>
			<div className={playButton}>
				<FontAwesomeIcon icon={faPlay} fontSize='25'></FontAwesomeIcon>
			</div>
		</div>
		// 	</a>
		// </Link>
	);
}
