import Head from 'next/head';
import Image from 'next/image';

import Layout from '../components/Layout';

import { useSession } from 'next-auth/react';
import axios from 'axios';
import useSWR from 'swr';

import {
	container,
	profileHeader,
	image,
	profileInfo,
	profileItem,
} from '../styles/Profile.module.css';
import {
	textLg,
	textMd,
	textWhite,
	textBold,
	textMuted,
	ml1,
	mb1,
} from '../styles/utils.module.css';

const fetcher = async (...args) =>
	await axios.get(...args).then((res) => res.data);

const profileURI = 'api/getProfile';
const revalidate = { revalidateOnFocus: false, revalidateIfStale: false };

export default function Profile() {
	const { data: session } = useSession();

	const { data: profile } = useSWR(profileURI, fetcher, revalidate);

	if (session) {
		if (profile) {
			return (
				<>
					<Head>
						<title>Next Spotify | Profile</title>
					</Head>
					<Layout>
						<div className={container}>
							<div className={profileHeader}>
								{profile.images[0] ? (
									<Image
										src={profile.images[0].url}
										width={150}
										height={150}
										alt={'Profile image'}
										className={image}
									/>
								) : null}
								<h1 className={`${textLg} ${textWhite} ${textBold} ${ml1}`}>
									Welcome, {profile.display_name}
								</h1>
							</div>
							<span className={`${textMd} ${textWhite} ${textBold} ${mb1}`}>
								Profile
							</span>
							<div className={profileInfo}>
								<div className={profileItem}></div>
								<span className={`${profileItem} ${textMuted} ${textBold}`}>
									<span>Display Name:</span>
									<span className={textWhite}>{profile.display_name}</span>
								</span>
								<hr className={mb1} />
								<span className={`${profileItem} ${textMuted} ${textBold}`}>
									<span>Country:</span>
									<span className={textWhite}>{profile.country}</span>
								</span>
								<hr className={mb1} />
								<span className={`${profileItem} ${textMuted} ${textBold}`}>
									<span>Account Type:</span>
									<span className={textWhite}>{profile.product}</span>
								</span>
								<hr className={mb1} />
								<span className={`${profileItem} ${textMuted} ${textBold}`}>
									<span>Email:</span>
									<span className={textWhite}>{profile.email}</span>
								</span>
								<hr />
							</div>
						</div>
					</Layout>
				</>
			);
		}
		return (
			<>
				<Head>
					<title>Next Spotify | Profile</title>
				</Head>
				<Layout>
					<div className={container}>
						<h1 className={`${textMd} ${textWhite} ${textBold}`}>Loading...</h1>
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
