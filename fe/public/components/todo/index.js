/*
TODO:

* Allow adding columns for: users, search terms, etc.
* Host on public internet (need HTTP/S and WS/S hosting)
* Buttons/links for replying
* Show tips/likes
* Write posts to file(s)
*/

import styles from './style.module.css';

const ToDo = ({ query }) => (
	<section class={styles.todo}>
		<pre>
			.
			TODO:

			* Allow adding columns for: users, search terms, word cloud/index, etc.
			* Host on public internet (need HTTP/S and WS/S hosting)
			* Buttons/links for replying
			* Show tips/likes
			* Write posts to file(s)
		</pre>
	</section>
);

export default ToDo;