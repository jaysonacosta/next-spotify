// Components
import SpotifyItem from '../SpotifyItem';
import SpotifyArtist from '../SpotifyArtist';

// Styles
import { itemTrack } from './ItemTrack.module.css';
import { textMd, textWhite, textBold } from '../../styles/utils.module.css';

// Spotify State
import { useSpotifyContext } from '../../context/spotifyState';

export default function ItemTrack({
	children,
	spotifyData,
	artists,
	isContextMenuActive,
	updateContextMenu,
	setContextMenuData,
	setContextMenuCoordinates,
}) {
	if (spotifyData.length === 0) {
		return (
			<>
				<p className={`${textMd} ${textWhite} ${textBold}`}>{children}</p>
				<div className={itemTrack}>
					<p className={`${textMd} ${textWhite} ${textBold}`}>
						No results found.
					</p>
				</div>
			</>
		);
	}
	if (artists) {
		return (
			<>
				<p className={`${textMd} ${textWhite} ${textBold}`}>{children}</p>
				<div className={itemTrack}>
					{spotifyData.map((spotifyElement, i) => {
						return (
							<SpotifyArtist
								key={`spotifyArtist${i}`}
								data={spotifyElement}
							></SpotifyArtist>
						);
					})}
				</div>
			</>
		);
	}
	return (
		<>
			<p className={`${textMd} ${textWhite} ${textBold}`}>{children}</p>
			<div
				className={itemTrack}
				style={{ overflow: isContextMenuActive ? 'hidden' : null }}
			>
				{spotifyData.map((spotifyElement, i) => {
					return (
						<SpotifyItem
							key={`spotifyElement${i}`}
							data={
								spotifyElement.track ? spotifyElement.track : spotifyElement
							}
							isContextMenuActive={isContextMenuActive}
							updateContextMenu={updateContextMenu}
							setContextMenuData={setContextMenuData}
							setContextMenuCoordinates={setContextMenuCoordinates}
						></SpotifyItem>
					);
				})}
			</div>
		</>
	);
}
