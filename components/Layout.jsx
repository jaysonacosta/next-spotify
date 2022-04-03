// Components
import Sidebar from './Sidebar';

// Styles
import { wrapper, mainContent } from '../styles/Layout.module.css';

export default function Layout({ children }) {
	return (
		<div className={wrapper}>
			<Sidebar></Sidebar>
			<main className={mainContent}>{children}</main>
		</div>
	);
}
