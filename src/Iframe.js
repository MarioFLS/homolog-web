/* eslint-disable no-use-before-define */
import PropTypes from "prop-types"
import './styles.css';

function Iframe({ source, setShowModal }) {
	if (!source) return <div>Loading...</div>;

	const src = source;
	window.addEventListener('message', subscribe);
	document.addEventListener('message', subscribe);

	function subscribe(event) {
		const json = parse(event);

		if (json?.source !== 'readyplayerme') {
			return;
		}

		if (json.eventName === 'v1.avatar.exported') {
			const avatar_id = json.data.url.slice(30, 54);

			if (avatar_id) {
				window.localStorage.setItem('avatar_id', avatar_id);
			}

			document.querySelector('#readyplayerme').hidden = true;

			const readyPlayerMeAvatarPreviewContainer = document.querySelector(
				'#readyplayerme_avatar_preview img',
			);

			if (!readyPlayerMeAvatarPreviewContainer) {
				const avatarPreview = document.createElement('img');
				avatarPreview.src = `https://api.readyplayer.me/v1/avatars/${avatar_id}.png?scene=fullbody-portrait-v1`;
				document
					.querySelector('#readyplayerme_avatar_preview')
					.appendChild(avatarPreview);

				setShowModal(false);
				document.querySelector('#voce-no-metaverso').remove();
				document.querySelector('#voce-no-metaversoBtn').remove();
			}
		}

		// Susbribe to all events sent from Ready Player Me once frame is ready
		if (json.eventName === 'v1.frame.ready') {
			document.querySelector('#readyplayerme').contentWindow.postMessage(
				JSON.stringify({
					target: 'readyplayerme',
					type: 'subscribe',
					eventName: 'v1.**',
				}),
				'*',
			);
		}
	}

	function parse(event) {
		try {
			return JSON.parse(event.data);
		} catch (error) {
			return null;
		}
	}

	return (
		<div className="iframe-container">
			<iframe
				title="readyplayerme"
				id="readyplayerme"
				allow="camera *; microphone *"
				className="readyplayerme"
				src={src}
			/>
		</div>
	);
}

Iframe.propTypes = {
	setShowModal: PropTypes.func.isRequired,
	source: PropTypes.any.isRequired
}

export default Iframe;
