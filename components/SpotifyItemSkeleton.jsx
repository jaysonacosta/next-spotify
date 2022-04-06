// Styles
import {
	card,
	loadingImage,
	loadingText,
	first,
	second,
} from '../styles/SpotifyItemSkeleton.module.css';

export default function SpotifyItemSkeleton() {
	return (
		<div className={card}>
			<div className={loadingImage}></div>
			<div className={loadingText}></div>
			<div className={loadingText}></div>
		</div>
	);
}
