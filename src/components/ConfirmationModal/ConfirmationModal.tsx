import './ConfirmationModal.css'

type Props = {
    showModal: Function,
    text: string,
    confirmFunction: Function,
}

export default function ConfirmationModal({ showModal, text, confirmFunction } : Props) {
    return (
        <div className="modal-wrapper" onClick={(e) => {(e.target as HTMLElement).classList[0] === "modal-wrapper" && showModal(false)}}>
            <div className="modal" id="confirmation-modal">
                <span>{text}</span>
                <div id="confirmation-buttons">
                    <button id="confirmation-buttons-abort" className="pointer" onClick={() => showModal(false)}>Abort</button>
                    <button id="confirmation-buttons-confirm" className="pointer" onClick={() => {confirmFunction(); showModal(false)}}>Confirm</button>
                </div>
            </div>
        </div>
    )
}