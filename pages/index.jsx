import { useState } from 'react';
import Head from 'next/head';

import Layout from '../components/Layout';
import ItemTrack from '../components/ItemTrack';
import ContextMenu from '../components/ContextMenu';
import Skeleton from '../components/Layout/Skeleton';

import { container, tracksContainer } from '../styles/Home.module.css';
import { textMd, textWhite, textBold } from '../styles/utils.module.css';

import { useSession } from 'next-auth/react';
import axios from 'axios';
import useSWR from 'swr';
import ArtistTrack from '../components/ArtistTrack/ArtistTrack';

const fetcher = async (...args) =>
	await axios.get(...args).then((res) => res.data);

const recentTracksURI = 'api/getRecentlyPlayed';
const recommendedURI = 'api/getRecommendations';
const topArtistsURI = 'api/getTopArtists';
const topTracksURI = 'api/getTopTracks';
const revalidate = { revalidateOnFocus: false, revalidateIfStale: false };

export default function Home() {
	const { data: session } = useSession();
	const [isContextActive, setContextActive] = useState(false);
	const [contextData, setContextData] = useState({});
	const [contextCoords, setContextCoords] = useState({});

	const { data: recentTracks } = useSWR(recentTracksURI, fetcher, revalidate);
	const { data: recommendations } = useSWR(recommendedURI, fetcher, revalidate);
	const { data: topArtists } = useSWR(topArtistsURI, fetcher, revalidate);
	const { data: topTracks } = useSWR(topTracksURI, fetcher, revalidate);

	const setContext = (track, coords) => {
		setContextData(track);
		setContextCoords(coords);
		setContextActive(true);
	};

	const preventScroll = () => (isContextActive ? { overflow: 'hidden' } : null);

	if (session) {
		if (recentTracks && recommendations && topArtists && topTracks) {
			return (
				<div
					onContextMenu={(e) => e.preventDefault()}
					onClick={() => setContextActive(false)}
				>
					<Head>
						<title>Next Spotify | Home</title>
					</Head>
					<Layout>
						<div className={container} style={{ overflowX: 'none' }}>
							<div className={tracksContainer}>
								<ItemTrack data={recentTracks.items} setContext={setContext}>
									Recently Played
								</ItemTrack>
								<ItemTrack
									data={recommendations.tracks}
									setContext={setContext}
								>
									Songs you might like
								</ItemTrack>
								<ItemTrack data={topTracks.items} setContext={setContext}>
									Your top tracks
								</ItemTrack>
								<ArtistTrack data={topArtists.items} setContext={setContext}>
									Your top artists
								</ArtistTrack>
							</div>
						</div>
					</Layout>
					{isContextActive ? (
						<ContextMenu data={contextData} coords={contextCoords} />
					) : null}
				</div>
			);
		}
		return (
			<>
				<Head>
					<title>Next Spotify | Home</title>
				</Head>
				<Layout>
					<div className={container}>
						<div className={tracksContainer}>
							<Skeleton />
						</div>
					</div>
				</Layout>
			</>
		);
	}
	return (
		<>
			<Head>
				<title>Next Spotify | Login</title>
			</Head>
			<Layout>
				<div className={container}>
					<h1 className={`${textMd} ${textWhite} ${textBold}`}>
						Please Sign In
					</h1>
				</div>
			</Layout>
		</>
	);
}
