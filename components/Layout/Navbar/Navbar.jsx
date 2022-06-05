// Styles
import {
	wrapper,
	navbarElement,
	dropdownMenu,
	icon,
	menuItem,
	iconWrapper,
	search,
} from './Navbar.module.css';
import {
	btn,
	textWhite,
	textSm,
	textBold,
} from '../../../styles/utils.module.css';

// FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';

// NextAuth
import { useSession, signIn, signOut } from 'next-auth/react';

// Hooks
import { useState } from 'react';
import { useRouter } from 'next/router';

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
						<FontAwesomeIcon
							className={icon}
							icon={faCircleUser}
							fontSize='30'
							color='white'
						/>
						<span className={`${textWhite} ${textSm} ${textBold}`}>
							{session.user.name}
						</span>
					</div>

					{isActive && (
						<div className={dropdownMenu}>
							<div className={`${menuItem} ${textWhite} ${textSm}`}>
								Profile
							</div>
							<div className={`${menuItem} ${textWhite} ${textSm}`}>
								Settings
							</div>
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
