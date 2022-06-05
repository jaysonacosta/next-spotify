// Components
import Sidebar from './Sidebar';
import Navbar from './Navbar';

// Styles
import {
	wrapper,
	mainContent,
	navbar,
	sidebar,
	webplayer,
} from './Layout.module.css';

export default function Layout({ children, updateQuery }) {
	return (
		<div className={wrapper}>
			<header className={navbar}>
				<Navbar updateQuery={updateQuery}></Navbar>
			</header>
			<nav className={sidebar}>
				<Sidebar></Sidebar>
			</nav>
			<main className={mainContent}>{children}</main>
		</div>
	);
}
