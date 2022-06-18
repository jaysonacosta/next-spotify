import { useEffect, useState } from 'react';

export function useWindow() {
	const [windowSize, setWindowSize] = useState({
		innerWidth: 0,
		innerHeight: 0,
	});

	useEffect(() => {
		const dimensions = {
			innerWidth: window.innerWidth,
			innerHeight: window.innerHeight,
		};
		setWindowSize(dimensions);
	}, []);

	return windowSize;
}
