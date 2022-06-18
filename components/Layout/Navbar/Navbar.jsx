import Link from 'next/link';
import Image from 'next/image';

import {
	wrapper,
	navbarElement,
	dropdownMenu,
	icon,
	menuItem,
	iconWrapper,
	search,
	image,
} from './Navbar.module.css';
import {
	btn,
	textWhite,
	textSm,
	textBold,
} from '../../../styles/utils.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';

import { useSession, signIn, signOut } from 'next-auth/react';

import { useState } from 'react';
import { useRouter } from 'next/router';
import { useWindow } from '../../../hooks/useWindow';

export default function Navbar({ updateQuery }) {
	const [isActive, setState] = useState(false);
	const { data: session } = useSession();
	const router = useRouter();

	if (session) {
		return (
			<div className={wrapper}>
				<div className={navbarElement}>
					{router.pathname == '/search' && (
						<input
							className={search}
							type='text'
							placeholder='Artists, songs, or podcasts'
							onChange={(stroke) => {
								updateQuery(stroke.target.value);
							}}
						/>
					)}
				</div>
				<div className={navbarElement}>
					<div
						className={iconWrapper}
						onClick={() => {
							setState(!isActive);
						}}
					>
						{session.user.image ? (
							<span className={icon}>
								<Image
									className={image}
									src={session.user.image}
									height={30}
									width={30}
									alt={'Profile image'}
								/>
							</span>
						) : (
							<FontAwesomeIcon
								className={icon}
								icon={faCircleUser}
								fontSize='30'
								color='white'
							/>
						)}

						<span className={`${textWhite} ${textSm} ${textBold}`}>
							{session.user.name}
						</span>
					</div>

					{isActive && (
						<div className={dropdownMenu}>
							<Link href={'/profile'}>
								<a>
									<div className={`${menuItem} ${textWhite} ${textSm}`}>
										Profile
									</div>
								</a>
							</Link>
							<div
								className={`${menuItem} ${textWhite} ${textSm}`}
								onClick={() => signOut()}
							>
								Sign Out
							</div>
						</div>
					)}
				</div>
			</div>
		);
	}
	return (
		<div className={wrapper}>
			<div className={navbarElement}>
				<button className={btn} onClick={() => signIn()}>
					Sign In
				</button>
			</div>
		</div>
	);
}
