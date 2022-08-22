
const Modal = ({ children, onModalClose, showModal, onSaveHandler }) => {


  return (
    <div
      style={{
        opacity: showModal ? 99 : 0,
        pointerEvents: showModal ? 'all' : 'none',
      }}
      className="modalWrapper"
    >
      <div
        onClick={onModalClose}
        role='button'
        className=''
        style={{
          display: showModal ? 'flex' : 'none',
        }}
      />
      <div className='modal'>
        {children}
      </div>
    </div>
  )
}

export default Modal
