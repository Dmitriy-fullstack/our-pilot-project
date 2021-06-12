import './AuthModal.scss';

const AuthModal = ({active, setActive, children}) => {
    return (
        <div className={active ? 'modal active' : 'modal'} onClick={() => setActive(false)}>
            <div className='content' onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}

export default AuthModal;