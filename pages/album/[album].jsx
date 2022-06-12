import Head from 'next/head';
import Image from 'next/image';

import Layout from '../../components/Layout';
import AlbumTable from '../../components/Tables/AlbumTable';

import {
	container,
	itemContainer,
	albumHeader,
	albumInfo,
	albumArtist,
} from './styles.module.css';
import {
	textSm,
	textMd,
	textWhite,
	textBold,
	textXxl,
	mt0,
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

	const router = useRouter();
	const { album: id, name } = router.query;

	const { data: album } = useSWR(
		id ? `${albumURI}${id}` : null,
		fetcher,
		revalidate
	);

	if (session) {
		if (album) {
			return (
				<>
					<Head>
						<title>{`Next Spotify | ${name}`}</title>
					</Head>
					<Layout>
						<div className={container}>
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
									<span className={`${textWhite} ${textXxl} ${textBold}`}>
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
						</div>
					</Layout>
				</>
			);
		}
		return (
			<>
				<Head>
					<title>{`Next Spotify | ${name}`}</title>
				</Head>
				<Layout>
					<div className={container}>
						<p className={`${textWhite} ${textBold} ${textSm}`}>ALBUM</p>
						<p className={`${textWhite} ${textBold} ${textXxl} ${mt0}`}>
							{name}
						</p>
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
