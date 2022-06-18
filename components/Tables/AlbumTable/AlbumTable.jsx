import Image from 'next/image';

import {
	table,
	tableRow,
	titleElement,
	tableElement,
	bodyRow,
	songInfo,
	firstElement,
	body,
	icon,
	songArtist,
	lastElement,
} from './styles.module.css';
import { textSm, textMuted, textWhite } from '../../../styles/utils.module.css';

import {
	convertDate,
	millisToMinutesAndSeconds,
	truncateString,
} from '../../../lib/utils';

import { useSpotifyContext } from '../../../context/spotifyState';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faE } from '@fortawesome/free-solid-svg-icons';
import { useWindow } from '../../../hooks/useWindow';

export default function AlbumTable({ data }) {
	const [musicQueue, updateQueue] = useSpotifyContext();
	const windowSize = useWindow();

	return (
		<div className={table}>
			<div className={`${tableRow} ${textMuted} ${textSm}`}>
				<>
					<div className={`${tableElement} ${firstElement}`}>#</div>
					<div className={titleElement}>TITLE</div>
				</>
				<div className={lastElement}>LENGTH</div>
			</div>
			<div className={body}>
				{data.map((track, i) => {
					return (
						<div
							key={`trackElement${i}`}
							className={`${tableRow} ${bodyRow}`}
							onClick={() => {
								updateQueue([track.uri]);
							}}
						>
							<div
								className={`${tableElement} ${textSm} ${textMuted} ${firstElement}`}
							>
								{i + 1}
							</div>
							<div className={`${titleElement} ${textWhite}`}>
								<div className={songInfo}>
									{truncateString(
										track.name,
										windowSize.innerWidth >= 1120 ? 75 : 35
									)}
									<div className={songArtist}>
										{track.explicit && (
											<FontAwesomeIcon
												icon={faE}
												className={`${icon}`}
											></FontAwesomeIcon>
										)}
										<span className={`${textMuted} ${textSm}`}>
											{truncateString(track.artists[0].name, 40)}
										</span>
									</div>
								</div>
							</div>
							<div className={`${lastElement} ${textSm} ${textMuted}`}>
								{millisToMinutesAndSeconds(track.duration_ms)}
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
