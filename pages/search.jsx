import Head from 'next/head';
import Layout from '../components/Layout';
import ItemTrack from '../components/ItemTrack';
import ArtistTrack from '../components/ArtistTrack/ArtistTrack';
import AlbumTrack from '../components/AlbumTrack';
import CategoryGrid from '../components/CategoryGrid/CategoryGrid';
import Skeleton from '../components/Layout/Skeleton';

import { useState } from 'react';

import { container, itemContainer } from '../styles/Search.module.css';
import { textMd, textWhite, textBold } from '../styles/utils.module.css';

import { useSession } from 'next-auth/react';

import axios from 'axios';
import useSWR from 'swr';

const fetcher = async (...args) =>
	await axios.get(...args).then((res) => res.data);

const searchURI = 'api/search?query=';
const categoriesURI = 'api/getSeveralBrowseCategories';
const revalidate = { revalidateOnFocus: false, revalidateIfStale: false };

export default function Search() {
	const { data: session } = useSession();
	const [query, updateQuery] = useState('');

	const { data: search } = useSWR(`${searchURI}${query}`, fetcher, revalidate);
	const { data: categories } = useSWR(categoriesURI, fetcher, revalidate);

	if (session) {
		if (categories) {
			return (
				<div onContextMenu={(e) => e.preventDefault()}>
					<Head>
						<title>Next Spotify | Search</title>
					</Head>

					<Layout updateQuery={updateQuery}>
						<div className={container}>
							{query && (
								<p className={`${textWhite} ${textBold} ${textMd}`}>
									Search Results
								</p>
							)}
							{!search && query && <Skeleton />}

							{search && (
								<ItemTrack data={search.tracks.items}>Tracks</ItemTrack>
							)}
							{search && (
								<AlbumTrack data={search.albums.items}>Albums</AlbumTrack>
							)}
							{search && (
								<ArtistTrack data={search.artists.items}>Artists</ArtistTrack>
							)}
							{!query && (
								<p className={`${textWhite} ${textBold} ${textMd}`}>
									Browse all
								</p>
							)}
							<div className={itemContainer}>
								{!query && categories && (
									<CategoryGrid data={categories}></CategoryGrid>
								)}
							</div>
						</div>
					</Layout>
				</div>
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
