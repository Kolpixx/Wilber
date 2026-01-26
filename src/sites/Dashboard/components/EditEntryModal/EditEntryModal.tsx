import { useState } from "react";
import { editEntryName, getEntries, removeEntry } from "../../../../utils";
import { Trash2, X } from "lucide-react";
import { accentColor } from "../../../../consts";

import './EditEntryModal.css'

type Props = {
    showModal: Function,
    id: number;
    setEntries: Function
}

export default function EditEntryModal({ showModal, id, setEntries } : Props) {
    const initialName = getEntries()[id].name;
    const [name, setName] = useState<string>(getEntries()[id].name);

    return (
        <div className="modal-wrapper" onClick={(e) => {(e.target as HTMLElement).classList[0] === "modal-wrapper" && showModal(false)}}>
            <div className="modal" id="edit-entry-modal">
                <div id="edit-entry-modal-head">
                    <h2>Edit Entry</h2>
                    <X
                        size={44}
                        color={accentColor}
                        className="pointer"
                        onClick={() => {showModal(false)}}
                    />
                </div>
                <div id="edit-entry-modal-options">
                    <div id="edit-entry-modal-name">
                        <h3>Name</h3>
                        <input type="text" placeholder={initialName} defaultValue={initialName} onChange={(e) => {setName(e.target.value)}} />
                    </div>
                </div>
                <div id="edit-entry-modal-buttons">
                    <Trash2
                        size={32}
                        color={accentColor}
                        strokeWidth={1.75}
                        className="pointer"
                        id="edit-entry-modal-delete"
                        onClick={() => removeEntry(id, setEntries)}
                    />
                    <button className="pointer" onClick={() => {editEntryName(id, name, setEntries); showModal(false)}}>Update</button>
                </div>
            </div>
        </div>
    )
}