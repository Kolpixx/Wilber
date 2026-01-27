import { useState } from "react";
import { editEntryName, getEntries, removeEntry } from "../../../../utils";
import { Trash2, X } from "lucide-react";

import './EditEntryModal.css'
import ConfirmationModal from "../../../../components/ConfirmationModal/ConfirmationModal";

type Props = {
    showModal: Function,
    id: number;
    setEntries: Function
}

export default function EditEntryModal({ showModal, id, setEntries } : Props) {
    const initialName = getEntries()[id].name;
    const [name, setName] = useState<string>(getEntries()[id].name);
    const [showingRemoveConfirmationModal, showRemoveConfirmationModal] = useState<boolean>(false);

    return (
        <div className="modal-wrapper" onClick={(e) => {e.stopPropagation(); (e.target as HTMLElement).classList[0] === "modal-wrapper" && showModal(false)}}>
            <div className="modal" id="edit-entry-modal">
                {showingRemoveConfirmationModal && <ConfirmationModal confirmFunction={() => removeEntry(id, setEntries)} showModal={showRemoveConfirmationModal} text={`Are you sure you want to remove the entry "${initialName}"permanently?`} />}
                <div className="modal-head">
                    <h2>Edit Entry</h2>
                    <button className="icon-button" onClick={() => showModal(false)}>
                        <X
                            size={44}
                        />
                    </button>
                </div>
                <div id="edit-entry-modal-options">
                    <div id="edit-entry-modal-name">
                        <h3>Name</h3>
                        <input type="text" placeholder={initialName} defaultValue={initialName} onChange={(e) => {setName(e.target.value)}} />
                    </div>
                </div>
                <div id="edit-entry-modal-buttons">
                    <button className="icon-button" onClick={() => showRemoveConfirmationModal(true)}>
                        <Trash2
                            size={32}
                            strokeWidth={1.75}
                            id="edit-entry-modal-delete"
                        />
                    </button>
                    <button className="pointer" id="edit-entry-modal-button-update" onClick={() => {editEntryName(id, name, setEntries); showModal(false)}}>Update</button>
                </div>
            </div>
        </div>
    )
}