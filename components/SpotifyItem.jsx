// Next Components
import Image from 'next/image';

// Utils
import { truncateString } from '../lib/utils';

// Styles
import { card } from '../styles/SpotifyItem.module.css';
import { textWhite, textBold } from '../styles/utils.module.css';

export default function SpotifyItem({ children, data }) {
	const { track } = data;
	return (
		<div className={card}>
			<Image
				src={track.album.images[0].url}
				height={640}
				width={640}
				alt='Album Cover'
			></Image>
			<p className={`${textWhite} ${textBold}`}>{truncateString(track.name)}</p>
		</div>
	);
}
