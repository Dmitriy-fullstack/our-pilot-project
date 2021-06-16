import { useEffect } from 'react';

import s from '../../components/Modal/index';

function Modal({onClose, children}) {

	useEffect(() => {
		const onKeyDown = event => {
			if (event.code === 'Escape') {
				onClose();
			}
		};
		
		window.addEventListener('keydown', onKeyDown);
		return () => {
			window.removeEventListener('keydown', onKeyDown);
		}
	}, [onClose]);

	const onkBackdropClick = ({ target, currentTarget }) => {
		if (target === currentTarget) {
			onClose();
		}
	}

	return (
		<div className={s.overlay} onClick={onkBackdropClick}>
			<div className={s.modalContainer}>
				{children}
			</div>
		</div>
	)

}

export default Modal;