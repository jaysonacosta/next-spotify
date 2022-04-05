// Components
import Sidebar from './Sidebar';

// Styles
import { wrapper, mainContent, navigation } from '../styles/Layout.module.css';

export default function Layout({ children }) {
	return (
		<div className={wrapper}>
			<nav>
				<Sidebar></Sidebar>
			</nav>
			<main className={mainContent}>{children}</main>
		</div>
	);
}
