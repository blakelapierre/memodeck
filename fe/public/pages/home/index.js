import styles from './style.module.css';
import { useState } from 'preact/hooks';

import Data from '../../test_data/data.js';

import Message from '../../components';

export default function Home() {
	const [count, setCount] = useState(0);

	return (
		<>
			<section class={styles.home}>
				{Data.posts.map(Message)}
			</section>
		</>
	);
}
