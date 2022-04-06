// Next Components
import Head from 'next/head';
import Image from 'next/image';

// Components
import Layout from '../components/Layout';
import ItemTrack from '../components/ItemTrack';

// Hooks
import { useEffect, useState } from 'react';

// Styles
import { container, tracksContainer } from '../styles/Library.module.css';
import { textMd, textWhite, textBold } from '../styles/utils.module.css';

// NextAuth
import { useSession } from 'next-auth/react';

// Axios
import axios from 'axios';

// SWR

import useSWR from 'swr';
const fetcher = async (...args) =>
	await axios.get(...args).then((res) => res.data);

export default function Home() {
	const { data: session, status } = useSession();
	// const { data: recentlyPlayedData, error: recentlyPlayedError } = useSWR(
	// 	'/api/getRecentlyPlayed',
	// 	fetcher,
	// 	{
	// 		revalidateOnFocus: false,
	// 		revalidateIfStale: false,
	// 	}
	// );
	if (!session) {
		return (
			<>
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
	if (session) {
		return (
			<>
				<Head>
					<title>Next Spotify | My Library</title>
					<meta name='description' content='Generated by create next app' />
					<link rel='icon' href='/favicon.ico' />
				</Head>

				<Layout>
					<div className={container}>
						<p className={`${textWhite} ${textBold} ${textMd}`}>My Library</p>
					</div>
				</Layout>
			</>
		);
	}
	return (
		<Layout>
			<div className={container}>
				<p className={`${textMd} ${textWhite} ${textBold}`}>Loading...</p>
			</div>
		</Layout>
	);
}
