import styles from './style.module.css';
import { Component, createRef } from 'preact';
import { signal } from '@preact/signals';

import MessageColumn from '../../components/message-column';

export default class SearchColumn extends Component {
	state = {
		query: '',
		messages: []
	};

	query = signal('');

	onQuery(t, event) { 
		console.log('query', event.target.value);
		t.query.value = event.target.value; 
		t.state.query = event.target.value;
		t.setState(t.state);
	}

	componentWillUpdate({messages}, {query}) {
		console.log('will update', messages, query);
		this.state.messages = query !== undefined &&
							  query !== null &&
							  query !== '' 
							  	? messages.filter(m => (m.message || '').toLowerCase().indexOf(query.toLowerCase()) !== -1)
							  	: [];
		this.setState(this.state);
		console.log(this.state);
	}

	render(_, {query, messages}) {
		return (
			<search-column>
					<input placeholder="Search..." value={query} onInput={event => this.onQuery(this, event)} />
				    <MessageColumn messages={messages} />
			</search-column>
		);
	}
}