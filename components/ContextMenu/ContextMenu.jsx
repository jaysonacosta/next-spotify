import { textMuted, textSm } from '../../styles/utils.module.css';
import { menu, menuItem } from './styles.module.css';

import { useSpotifyContext } from '../../context/spotifyState';

export default function ContextMenu({ data, coords }) {
	const [musicQueue, updateQueue] = useSpotifyContext();

	return (
		<div className={menu} style={{ left: coords.x, top: coords.y }}>
			<div
				className={`${menuItem} ${textMuted} ${textSm}`}
				onClick={() => updateQueue([...musicQueue, data.track.uri])}
			>
				Add to queue
			</div>
			<div className={`${menuItem} ${textMuted} ${textSm}`}>
				Save to your Liked Songs
			</div>
			<div className={`${menuItem} ${textMuted} ${textSm}`}>
				Open in Spotify
			</div>
		</div>
	);
}
