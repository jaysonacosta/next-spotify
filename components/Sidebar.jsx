// Next Components
import Link from 'next/link';

// Hooks
import { useRouter } from 'next/router';

// Styles
import {
	wrapper,
	elementWrapper,
	sidebarElement,
	btn,
	icon,
} from '../styles/Sidebar.module.css';

import { textWhite, textBold, textMuted } from '../styles/utils.module.css';

// FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faHouseChimney,
	faMagnifyingGlass,
	faMusic,
} from '@fortawesome/free-solid-svg-icons';

// NextAuth
import { useSession } from 'next-auth/react';

export default function Sidebar() {
	const { data: session } = useSession();
	const router = useRouter();
	if (session) {
		return (
			<div className={wrapper}>
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
			</div>
		);
	}
	return (
		<div className={wrapper}>
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
