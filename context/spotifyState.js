import { createContext, useContext, useState } from 'react';

const SpotifyContext = createContext();

export function SpotifyState({ children }) {
	const [musicQueue, updateQueue] = useState([]);

	return (
		<SpotifyContext.Provider value={[musicQueue, updateQueue]}>
			{children}
		</SpotifyContext.Provider>
	);
}

export function useSpotifyContext() {
	return useContext(SpotifyContext);
}
