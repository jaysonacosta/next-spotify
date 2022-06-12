import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import {
	wrapper,
	sidebarElement,
	playlistElement,
	icon,
} from './Sidebar.module.css';

import {
	textWhite,
	textBold,
	textMuted,
	textSm,
} from '../../../styles/utils.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faHouseChimney,
	faMagnifyingGlass,
	faMusic,
} from '@fortawesome/free-solid-svg-icons';

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

const spotifyBranding = '/spotify-icons-logos/logos';

export default function Sidebar() {
	const { data: session } = useSession();
	const { data: playlists } = useSWR(playlistsURI, fetcher, revalidate);

	const router = useRouter();
	const query = router.query;

	if (session) {
		return (
			<div className={wrapper}>
				<div className={sidebarElement}>
					<Image
						src={`${spotifyBranding}/Spotify_Logo_RGB_White.png`}
						alt='Spotify Logo'
						width={131}
						height={40}
						onClick={() => window.open('https://spotify.com')}
					/>
				</div>
				<Link href='/'>
					<a className={router.pathname == '/' ? textWhite : textMuted}>
						<div className={sidebarElement}>
							<FontAwesomeIcon
								className={icon}
								icon={faHouseChimney}
								fontSize='25'
							></FontAwesomeIcon>
							<span className={textBold}>Home</span>
						</div>
					</a>
				</Link>
				<Link href='/search'>
					<a
						className={
							router.pathname.includes('/search') ? textWhite : textMuted
						}
					>
						<div className={sidebarElement}>
							<FontAwesomeIcon
								className={icon}
								icon={faMagnifyingGlass}
								fontSize='25'
							></FontAwesomeIcon>
							<span className={textBold}>Search</span>
						</div>
					</a>
				</Link>
				<Link href='/library'>
					<a className={router.pathname == '/library' ? textWhite : textMuted}>
						<div className={sidebarElement}>
							<FontAwesomeIcon
								className={icon}
								icon={faMusic}
								fontSize='25'
							></FontAwesomeIcon>
							<span className={textBold}>My Library</span>
						</div>
					</a>
				</Link>
				<hr />
				{playlists &&
					playlists.items.map((playlist, i) => {
						return (
							<Link
								href={{
									pathname: `/playlist/${playlist.id}`,
									query: { name: playlist.name },
								}}
								key={`playlist-${i}`}
							>
								<a
									className={
										query.playlist == playlist.id ? textWhite : textMuted
									}
								>
									<div className={playlistElement}>
										<span className={`${textSm}`}>{playlist.name}</span>
									</div>
								</a>
							</Link>
						);
					})}
			</div>
		);
	}
	return (
		<div className={wrapper}>
			<div className={sidebarElement}>
				<Image
					src={`${spotifyBranding}/Spotify_Logo_RGB_White.png`}
					alt='Spotify Logo'
					width={131}
					height={40}
				/>
			</div>
			<Link href='/'>
				<a className={router.pathname == '/' ? textWhite : textMuted}>
					<div className={sidebarElement}>
						<FontAwesomeIcon
							className={icon}
							icon={faHouseChimney}
							fontSize='25'
						></FontAwesomeIcon>
						<span className={textBold}>Home</span>
					</div>
				</a>
			</Link>
			<Link href='/search'>
				<a className={router.pathname == '/search' ? textWhite : textMuted}>
					<div className={sidebarElement}>
						<FontAwesomeIcon
							className={icon}
							icon={faMagnifyingGlass}
							fontSize='25'
						></FontAwesomeIcon>
						<span className={textBold}>Search</span>
					</div>
				</a>
			</Link>
		</div>
	);
}
