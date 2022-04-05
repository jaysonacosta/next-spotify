// Styles
import { wrapper, navbarElement } from '../styles/Navbar.module.css';
import { btn } from '../styles/utils.module.css';

// NextAuth
import { useSession, signIn, signOut } from 'next-auth/react';

export default function Navbar() {
	const { data: session } = useSession();
	if (session) {
		return (
			<div className={wrapper}>
				<div className={navbarElement}>
					<button className={btn} onClick={() => signOut()}>
						Sign Out
					</button>
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
