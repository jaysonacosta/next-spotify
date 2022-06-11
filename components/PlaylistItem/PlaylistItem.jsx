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

export default function PlaylistItem({ data }) {
	const [musicQueue, updateQueue] = useSpotifyContext();
	return (
		<Link
			href={{
				pathname: `/playlist/${data.id}`,
				query: { name: data.name },
			}}
		>
			<a>
				<div className={card}>
					<Image
						src={
							data.images.length ? data.images[0].url : '/missing-artist.jpg'
						}
						height={176}
						width={176}
						alt='Playlist Image'
					></Image>
					<p className={`${textWhite} ${textBold}`}>
						{truncateString(data.name, 15)}
					</p>
					<p className={`${textMuted} ${textBold} ${textSm}`}>
						{data.description
							? truncateString(data.description, 75)
							: truncateString(`By ${data.owner.display_name}`, 30)}
					</p>
					<div
						onClick={() => {
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
