import SpotifyArtist from '../SpotifyArtist';

import { itemTrack } from './styles.module.css';
import { textMd, textWhite, textBold } from '../../styles/utils.module.css';

export default function ArtistTrack({ children, data, setContext }) {
	if (data.length === 0) {
		return null;
	}
	return (
		<>
			<p className={`${textMd} ${textWhite} ${textBold}`}>{children}</p>
			<div className={itemTrack}>
				{data.map((track, i) => {
					return (
						<SpotifyArtist
							key={`artist-${i}`}
							data={track}
							setContext={setContext}
						></SpotifyArtist>
					);
				})}
			</div>
		</>
	);
}
