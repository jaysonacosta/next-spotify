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
				<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 384 512' height='25' width='25'>
					<path d='M361 215C375.3 223.8 384 239.3 384 256C384 272.7 375.3 288.2 361 296.1L73.03 472.1C58.21 482 39.66 482.4 24.52 473.9C9.377 465.4 0 449.4 0 432V80C0 62.64 9.377 46.63 24.52 38.13C39.66 29.64 58.21 29.99 73.03 39.04L361 215z' />
				</svg>
			</div>
		</div>
	);
}
