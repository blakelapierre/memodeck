import styles from './style.module.css';
import { useState, useCallback } from 'preact/hooks';
import { Component, createRef } from 'preact';

import Data from '../../test_data/data.js';

import Message from '../../components';

export default class Home extends Component {
	state = {
		posts: []
	};

	ref = createRef();

	componentDidMount() {
		const ws = new WebSocket('ws://localhost:8081');

		ws.addEventListener('message', event => {
			console.log('ws event', event);
			try {
				const data = JSON.parse(event.data);

				this.setState({posts: data.concat(this.state.posts)});
			}
			catch (e) {}
		});
	}

	render(_, {posts}) {
		return (
			<>
				<section class={styles.home}>
				    {posts.length} posts
					{posts.map(Message)}
				</section>
			</>
		);
	}
}

// export default function Home() {
// 	const [state, setState] = useState({posts:[], nonce: 0});

// 	const ws = new WebSocket('ws://localhost:8081');

// 	ws.addEventListener('message', event => {
// 		console.log('ws event', event);
// 		try {
// 			const data = JSON.parse(event.data);

// 			state.posts = state.posts.concat(data);
// 			state.nonce++;
// 			setState(state);
// 			console.log(state);
// 		}
// 		catch (e) {}
// 	});

// 	return (
// 		<>
// 			<section class={styles.home}>
// 			    {state.posts.length} posts
// 				{state.posts.map(Message)}
// 			</section>
// 		</>
// 	);
// }
