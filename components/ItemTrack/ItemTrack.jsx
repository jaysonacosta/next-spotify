import SpotifyItem from '../SpotifyItem';

import { itemTrack } from './ItemTrack.module.css';
import { textMd, textWhite, textBold } from '../../styles/utils.module.css';

export default function ItemTrack({ children, data, setContext }) {
	if (data.length === 0) {
		return null;
	}
	return (
		<>
			<p className={`${textMd} ${textWhite} ${textBold}`}>{children}</p>
			<div className={itemTrack}>
				{data.map((track, i) => {
					return (
						<SpotifyItem
							key={`track-${i}`}
							data={track.track ? track.track : track}
							setContext={setContext}
						></SpotifyItem>
					);
				})}
			</div>
		</>
	);
}
