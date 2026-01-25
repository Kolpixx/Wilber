type Props = {
    showModal: Function,
    text: string,
    confirmFunction: Function,
}

export default function ConfirmationModal({ showModal, text, confirmFunction } : Props) {
    return (
        <div className="modal-wrapper" onClick={(e) => {(e.target as HTMLElement).classList[0] === "modal-wrapper" && showModal(false)}}>
            <div className="modal">
                <div>{text}</div>
                <div id="confirmation-buttons">
                    <button onClick={() => {confirmFunction(); showModal(false)}}>Confirm</button>
                    <button onClick={() => showModal(false)}>Abort</button>
                </div>
            </div>
        </div>
    )
}