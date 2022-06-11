import Head from 'next/head';
import Link from 'next/link';

import Layout from '../../components/Layout';
import PlaylistItem from '../../components/PlaylistItem';
import Skeleton from '../../components/Layout/Skeleton';

import { container, itemContainer } from './Category.module.css';
import {
	textMd,
	textWhite,
	textBold,
	textXxl,
} from '../../styles/utils.module.css';

import { useSession } from 'next-auth/react';

import { useRouter } from 'next/router';

import axios from 'axios';
import useSWR from 'swr';

const fetcher = async (...args) =>
	await axios.get(...args).then((res) => res.data);

const playlistsURI = '../api/getCategoryPlaylist?category=';

const revalidate = {
	revalidateOnFocus: false,
	revalidateIfStale: false,
};

export default function Category() {
	const { data: session } = useSession();

	const router = useRouter();
	const { category, genre } = router.query;

	const { data: playlists } = useSWR(
		category ? `${playlistsURI}${category}` : null,
		fetcher,
		revalidate
	);

	if (session) {
		if (playlists) {
			return (
				<>
					<Head>
						<title>{`Next Spotify | ${genre}`}</title>
					</Head>
					<Layout>
						<div className={container}>
							<p className={`${textWhite} ${textBold} ${textXxl}`}>{genre}</p>
							<div className={itemContainer}>
								{playlists.playlists.items.map((playlist, i) => {
									return (
										<Link
											href={{
												pathname: `/playlist/${playlist.id}`,
												query: { name: playlist.name },
											}}
											key={`playlist/${i}`}
										>
											<a>
												<PlaylistItem data={playlist}></PlaylistItem>
											</a>
										</Link>
									);
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
					<title>{`Next Spotify | ${genre}`}</title>
				</Head>
				<Layout>
					<div className={container}>
						<p className={`${textWhite} ${textBold} ${textXxl}`}>{genre}</p>
						<div className={itemContainer}>
							<p className={`${textWhite} ${textBold}`}>Loading...</p>
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
