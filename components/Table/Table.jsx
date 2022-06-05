// Next Components
import Image from 'next/image';

// Styles
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
} from '../styles/Table.module.css';
import { textSm, textMuted, textWhite } from '../styles/utils.module.css';

// Utils
import {
	convertDate,
	millisToMinutesAndSeconds,
	truncateString,
} from '../../lib/utils';

// FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faE } from '@fortawesome/free-solid-svg-icons';

export default function Table({ data }) {
	return (
		<div className={table}>
			<div className={`${tableRow} ${textMuted} ${textSm}`}>
				<div className={`${tableElement} ${firstElement}`}>#</div>
				<div className={titleElement}>TITLE</div>
				<div className={tableElement}>ALBUM</div>
				<div className={tableElement}>DATE ADDED</div>
				<div className={tableElement}>LENGTH</div>
			</div>
			<div className={body}>
				{data.map((trackElement, i) => {
					return (
						<div key={`trackElement${i}`} className={`${tableRow} ${bodyRow}`}>
							<div
								className={`${tableElement} ${textSm} ${textMuted} ${firstElement}`}
							>
								{i + 1}
							</div>
							<div className={`${titleElement} ${textWhite}`}>
								<Image
									src={trackElement.track.album.images[0].url}
									alt='Album Cover'
									height={40}
									width={40}
								></Image>
								<div className={songInfo}>
									{truncateString(trackElement.track.name, 30)}
									<div className={songArtist}>
										{trackElement.track.explicit && (
											<FontAwesomeIcon
												icon={faE}
												className={`${icon}`}
											></FontAwesomeIcon>
										)}
										<span className={`${textMuted} ${textSm}`}>
											{truncateString(
												trackElement.track.album.artists[0].name,
												20
											)}
										</span>
									</div>
								</div>
							</div>
							<div className={`${tableElement} ${textSm} ${textMuted}`}>
								{truncateString(trackElement.track.album.name, 25)}
							</div>
							<div className={`${tableElement} ${textSm} ${textMuted}`}>
								{convertDate(trackElement.added_at)}
							</div>
							<div className={`${tableElement} ${textSm} ${textMuted}`}>
								{millisToMinutesAndSeconds(trackElement.track.duration_ms)}
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
