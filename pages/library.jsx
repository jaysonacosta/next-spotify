import Head from 'next/head';

import Layout from '../components/Layout';
import PlaylistItem from '../components/PlaylistItem';

import { container, playlistGrid } from '../styles/Library.module.css';
import { textMd, textWhite, textBold } from '../styles/utils.module.css';

import { useSession } from 'next-auth/react';

import axios from 'axios';

import useSWR from 'swr';
const fetcher = async (...args) =>
	await axios.get(...args).then((res) => res.data);

const playlistsURI = '/api/getPlaylists';

const revalidate = {
	revalidateOnFocus: false,
	revalidateIfStale: false,
};

export default function Library() {
	const { data: session } = useSession();
	const { data: playlists } = useSWR(playlistsURI, fetcher, revalidate);

	if (session) {
		if (playlists) {
			return (
				<>
					<Head>
						<title>Next Spotify | My Library</title>
					</Head>
					<Layout>
						<div className={container}>
							<p className={`${textWhite} ${textBold} ${textMd}`}>My Library</p>
							<div className={playlistGrid}>
								{playlists.items.map((playlist) => {
									return <PlaylistItem key={playlist.id} data={playlist} />;
								})}
							</div>
						</div>
					</Layout>
				</>
			);
		}
		return (
			<>
				<Head>
					<title>Next Spotify | My Library</title>
				</Head>
				<Layout>
					<div className={container}>
						<p className={`${textMd} ${textWhite} ${textBold}`}>Loading...</p>
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
