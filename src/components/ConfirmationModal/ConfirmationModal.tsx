import './ConfirmationModal.css'

type Props = {
    showModal: Function,
    text: string,
    confirmFunction: Function,
}

export default function ConfirmationModal({ showModal, text, confirmFunction } : Props) {
    return (
        <div className="modal-wrapper" onClick={(e) => {(e.target as HTMLElement).classList[0] === "modal-wrapper" && showModal(false)}}>
            <div className="modal confirmation-modal">
                <span>{text}</span>
                <div className="confirmation-buttons">
                    <button className="confirmation-buttons-abort pointer" onClick={() => showModal(false)}>Abort</button>
                    <button className="confirmation-buttons-confirm pointer" onClick={() => {confirmFunction(); showModal(false)}}>Confirm</button>
                </div>
            </div>
        </div>
    )
}