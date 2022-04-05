// Components
import Sidebar from './Sidebar';
import Navbar from './Navbar';

// Styles
import {
	wrapper,
	mainContent,
	navbar,
	sidebar,
} from '../styles/Layout.module.css';

export default function Layout({ children }) {
	return (
		<div className={wrapper}>
			<header className={navbar}>
				<Navbar></Navbar>
			</header>
			<nav className={sidebar}>
				<Sidebar></Sidebar>
			</nav>
			<main className={mainContent}>{children}</main>
		</div>
	);
}
