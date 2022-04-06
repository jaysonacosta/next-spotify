// Components
import SpotifyItemSkeleton from './SpotifyItemSkeleton';

// Styles
import { itemTrack } from '../styles/ItemTrackSkeleton.module.css';
import { textMd, textWhite, textBold } from '../styles/utils.module.css';

export default function ItemTrackSkeleton({ children }) {
	return (
		<>
			<p className={`${textMd} ${textWhite} ${textBold}`}>{children}</p>
			<div className={itemTrack}>
                <SpotifyItemSkeleton></SpotifyItemSkeleton>
                <SpotifyItemSkeleton></SpotifyItemSkeleton>
                <SpotifyItemSkeleton></SpotifyItemSkeleton>
                <SpotifyItemSkeleton></SpotifyItemSkeleton>
                <SpotifyItemSkeleton></SpotifyItemSkeleton>
                <SpotifyItemSkeleton></SpotifyItemSkeleton>
                <SpotifyItemSkeleton></SpotifyItemSkeleton>
                <SpotifyItemSkeleton></SpotifyItemSkeleton>
            </div>
		</>
	);
}
