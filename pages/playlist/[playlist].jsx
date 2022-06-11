import Head from 'next/head';

import Layout from '../../components/Layout';
import Table from '../../components/Table';

import { container, itemContainer } from './Playlist.module.css';
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

const playlistURI = '../api/getPlaylistItems?id=';
const revalidate = {
	revalidateOnFocus: false,
	revalidateIfStale: false,
};

export default function Playlist() {
	const { data: session } = useSession();

	const router = useRouter();
	const { playlist: id, name } = router.query;
	
	const { data: playlistData } = useSWR(
		id ? `${playlistURI}${id}` : null,
		fetcher,
		revalidate
	);

	if (session) {
		if (playlistData) {
			return (
				<>
					<Head>
						<title>{`Next Spotify | ${name}`}</title>
					</Head>
					<Layout>
						<div className={container}>
							<p className={`${textWhite} ${textBold} ${textSm}`}>PLAYLIST</p>
							<p className={`${textWhite} ${textBold} ${mt0} ${textXxl}`}>
								{name}
							</p>
							<hr />
							<Table data={playlistData.items}></Table>
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
						<p className={`${textWhite} ${textBold} ${textSm}`}>PLAYLIST</p>
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
