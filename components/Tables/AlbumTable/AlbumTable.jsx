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
    lastElement
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

export default function Table({ data }) {
	const [musicQueue, updateQueue] = useSpotifyContext();

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
								updateQueue([track.track.uri]);
							}}
						>
							<div
								className={`${tableElement} ${textSm} ${textMuted} ${firstElement}`}
							>
								{i + 1}
							</div>
							<div className={`${titleElement} ${textWhite}`}>
								<div className={songInfo}>
									{truncateString(track.name, 30)}
									<div className={songArtist}>
										{track.explicit && (
											<FontAwesomeIcon
												icon={faE}
												className={`${icon}`}
											></FontAwesomeIcon>
										)}
										<span className={`${textMuted} ${textSm}`}>
											{truncateString(track.artists[0].name, 20)}
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
