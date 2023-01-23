import styles from './style.module.css';
import { useState } from 'preact/hooks';

export default function Home() {
	const [count, setCount] = useState(0);

	return (
		<>
			<section class={styles.home}>
				<iframe src="https://memo.cash/posts/new" />
			</section>
		</>
	);
}
