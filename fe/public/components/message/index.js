import styles from './style.module.css';

export default function Message({author, name, message, likes, tips}) {
	return (
		<post class={styles.post}>
			<span>{author || name.text}</span>
			<div>{message}</div>
		</post>
	);
}