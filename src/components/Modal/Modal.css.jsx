import style from 'styled-components'

const Overlay = style.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
`
const ModalContainer = style.div`
  max-width: calc(100vw - 48px);
  max-height: calc(100vh - 24px);
  background-color: white;
`

export { Overlay, ModalContainer };