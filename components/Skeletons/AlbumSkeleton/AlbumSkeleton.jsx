import Image from 'next/image';

import {
	albumHeader,
	albumCoverSkeleton,
	albumInfoSkeleton,
	loading,
	thin,
	thick,
} from './styles.module.css';

export default function AlbumSkeleton() {
	return (
		<>
			<div className={albumHeader}>
				<div className={`${albumCoverSkeleton} ${loading}`}></div>
				<div className={albumInfoSkeleton}>
					<div className={`${loading} ${thin}`}></div>
					<div className={`${loading} ${thick}`}></div>
					<div className={`${loading} ${thin}`}></div>
				</div>
			</div>
			<hr />
		</>
	);
}
