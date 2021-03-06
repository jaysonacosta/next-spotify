import Image from 'next/image';
import Link from 'next/link';

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

import { useSpotifyContext } from '../../context/spotifyState';

export default function SpotifyItem({ data, setContext }) {
	const [musicQueue, updateQueue] = useSpotifyContext();

	return (
		<Link href={`/album/${data.album.id}`}>
			<a>
				<div
					className={card}
					onContextMenu={(e) => {
						e.preventDefault();
						const coords = { x: e.pageX, y: e.pageY };
						setContext(data, coords);
					}}
				>
					<Image
						src={data.album.images[0].url}
						height={176}
						width={176}
						alt='Track album cover'
					></Image>
					<p className={`${textWhite} ${textBold}`}>
						{truncateString(data.name, 15)}
					</p>
					<p className={`${textMuted} ${textBold} ${textSm}`}>
						{truncateString(data.album.artists[0].name, 20)}
					</p>
					<div
						onClick={(e) => {
							e.preventDefault();
							updateQueue([data.uri]);
						}}
						className={playButton}
					>
						<FontAwesomeIcon icon={faPlay} fontSize='25'></FontAwesomeIcon>
					</div>
				</div>
			</a>
		</Link>
	);
}
