// Styles
import {
	wrapper,
	elementWrapper,
	sidebarElement,
	btn,
} from '../styles/Sidebar.module.css';

// NextAuth
import { useSession, signIn, signOut } from 'next-auth/react';

export default function Sidebar() {
	const { data: session } = useSession();
	if (session) {
		return (
			<div className={wrapper}>
				<div className={sidebarElement}>Home</div>
				<div className={sidebarElement}>Search</div>
				<div className={sidebarElement}>Your Library</div>
				<div className={sidebarElement}>
					<button className={btn} onClick={() => signOut()}>
						Sign Out
					</button>
				</div>
			</div>
		);
	}
	return (
		<div className={wrapper}>
			<div className={sidebarElement}>
				<button className={btn} onClick={() => signIn()}>
					Sign In
				</button>
			</div>
		</div>
	);
}
