import { useLocation } from 'preact-iso';

export default function Header() {
	const { url } = useLocation();
	return (
		<header>
			<nav>
				<a href="/">Home</a>
				<a href="/todo">To do</a>
			</nav>
			<span>bitcoincash:qqqgc2jy07ltnz4ygemcec05jtentqnleu3hjmy2j0</span>
			<label>
				URL:
				<input readonly value={url} ref={c => c && (c.size = c.value.length)} />
			</label>
		</header>
	);
}
