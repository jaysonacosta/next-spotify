import { useState } from 'react';

import Head from 'next/head';
import Image from 'next/image';

import Layout from '../../components/Layout';
import AlbumTable from '../../components/Tables/AlbumTable';
import AlbumSkeleton from '../../components/Skeletons/AlbumSkeleton';

import { prominent, average } from 'color.js';

import { dateToString } from '../../lib/utils';

import {
	container,
	albumName,
	albumHeader,
	albumInfo,
	albumArtist,
	albumFooter,
} from './styles.module.css';
import {
	textSm,
	textMd,
	textWhite,
	textBold,
	textXxl,
	mt0,
	textMuted,
} from '../../styles/utils.module.css';

import { useSession } from 'next-auth/react';

import { useRouter } from 'next/router';

import axios from 'axios';

import useSWR from 'swr';
const fetcher = async (...args) =>
	await axios.get(...args).then((res) => res.data);

const albumURI = '../api/getAlbum?id=';
const revalidate = {
	revalidateOnFocus: false,
	revalidateIfStale: false,
};

export default function Album() {
	const { data: session } = useSession();
	const [albumColor, setColor] = useState('');

	const router = useRouter();
	const { album: id } = router.query;

	const { data: album } = useSWR(
		id ? `${albumURI}${id}` : null,
		fetcher,
		revalidate
	);

	const getColor = async (url) => {
		const color = await average(url, { amount: 1, format: 'hex' });
		setColor(color);
	};

	if (album) {
		getColor(album.images[0].url);
	}

	if (session) {
		if (album) {
			return (
				<>
					<Head>
						<title>{`Next Spotify | ${album.name}`}</title>
					</Head>
					<Layout>
						<div
							className={container}
							style={{
								background: `linear-gradient(${albumColor} 0%, #ffffff00 450px)`,
							}}
						>
							<div className={albumHeader}>
								<Image
									src={album.images[0].url}
									height={350}
									width={350}
									alt={`${album.name} album cover`}
								/>
								<div className={albumInfo}>
									<span className={`${textWhite} ${textSm} ${textBold}`}>
										{album.album_type.toUpperCase()}
									</span>
									<span
										className={`${textWhite} ${textXxl} ${textBold} ${albumName}`}
									>
										{album.name}
									</span>
									<div className={`${albumArtist} ${textWhite}`}>
										<span className={` ${textSm} ${textBold}`}>
											{album.artists[0].name}
										</span>
										&nbsp; &bull; &nbsp;
										<span className={` ${textSm}`}>
											{album.release_date.substring(0, 4)}
										</span>
										&nbsp; &bull; &nbsp;
										<span className={` ${textSm}`}>
											{album.total_tracks} songs
										</span>
									</div>
								</div>
							</div>
							<hr />
							<AlbumTable data={album.tracks.items} />
							<div className={albumFooter}>
								<span className={`${textSm} ${textMuted} ${textBold}`}>
									{dateToString(album.release_date)}
								</span>
								<span className={`${textSm} ${textMuted}`}>{album.label}</span>
							</div>
						</div>
					</Layout>
				</>
			);
		}
		return (
			<>
				<Head>
					<title>{`Next Spotify | Album`}</title>
				</Head>
				<Layout>
					<div className={container}>
						<AlbumSkeleton />
					</div>
				</Layout>
			</>
		);
	}
	return (
		<>
			<Head>
				<title>{'Next Spotify | Login'}</title>
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
