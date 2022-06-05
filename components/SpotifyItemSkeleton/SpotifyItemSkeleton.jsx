// Styles
import {
	card,
	loadingImage,
	loadingText,
	pulse,
} from './SpotifyItemSkeleton.module.css';

export default function SpotifyItemSkeleton() {
	return (
		<div className={card}>
			<div className={`${loadingImage} ${pulse}`}></div>
			<div className={`${loadingText} ${pulse}`}></div>
			<div className={`${loadingText} ${pulse}`}></div>
		</div>
	);
}
