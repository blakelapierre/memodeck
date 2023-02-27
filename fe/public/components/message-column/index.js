import styles from './style.module.css';

import Message from '../../components';

export default function MessageColumn({messages}) {
	return (
		<message-column class={styles.column}>
			{messages.length} posts
			{messages.map(Message)}
		</message-column>
	);
}