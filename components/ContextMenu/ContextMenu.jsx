// Styles
import {
	textWhite,
	textMuted,
	textBold,
	textSm,
} from '../../styles/utils.module.css';
import { menu, menuItem } from './styles.module.css';

export default function ContextMenu({ data, coordinates }) {
	return (
		<div className={menu} style={{ left: coordinates.x, top: coordinates.y }}>
			<div className={`${menuItem} ${textMuted} ${textSm}`}>Add to queue</div>
			<div className={`${menuItem} ${textMuted} ${textSm}`}>
				Save to your Liked Songs
			</div>
			<div className={`${menuItem} ${textMuted} ${textSm}`}>
				Open in Spotify
			</div>
		</div>
	);
}
