import styles from './style.module.css';
import { Component, createRef } from 'preact';

import Data from '../../test_data/data.js';

import MessageColumn from '../../components/message-column';
import SearchColumn from '../../components/search-column';

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
				    <MessageColumn messages={posts} />
				    <SearchColumn messages={posts} />
				</section>
			</>
		);
	}
}