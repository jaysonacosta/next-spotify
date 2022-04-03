// Components
import SpotifyItem from './SpotifyItem';

// Styles
import { itemTrack } from '../styles/ItemTrack.module.css';
import { textMd, textWhite, textBold } from '../styles/utils.module.css';

export default function ItemTrack({ children, userData }) {
	return (
		<>
			<p className={`${textMd} ${textWhite} ${textBold}`}>{children}</p>
			<div className={itemTrack}>
				{userData.items.map((spotifyElement, i) => {
					return (
						<SpotifyItem
							key={`spotifyElement${i}`}
							data={spotifyElement}
						></SpotifyItem>
					);
				})}
			</div>
		</>
	);
}
