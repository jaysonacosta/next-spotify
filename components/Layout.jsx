// Components
import Sidebar from './Sidebar';

// Styles
import { wrapper } from '../styles/Layout.module.css';

export default function Layout({ children }) {
	return (
		<div className={wrapper}>
			<Sidebar></Sidebar>
			<main>{children}</main>
		</div>
	);
}
