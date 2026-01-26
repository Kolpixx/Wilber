import { useEffect, useState } from 'react'
import { addEntry } from '../../../../../../utils';
import { X } from 'lucide-react';
import { accentColor } from '../../../../../../consts';
import Checkbox from '../../../../../../components/Checkbox/Checkbox';

import './AddEntryModal.css'

type Props = {
    showAddEntryModal: any;
    setEntries: any;
}

export default function AddEntryModal({ showAddEntryModal, setEntries }: Props) {
    const [startDate, setStartDate] = useState<Date | null>();
    const [name, setName] = useState<string | null>(null);
    const [useCurrentTime, setUseCurrentTime] = useState<boolean>(true);
    const [error, setError] = useState<string>();

    function submitEntry() {
        if (name !== null && startDate !== null) {
            addEntry(setEntries, name, startDate);
            showAddEntryModal(false);
        } else if (name !== null && useCurrentTime) {
            addEntry(setEntries, name);
            showAddEntryModal(false);
        } else {
            setError("Please fill out all fields")
        }
    }

    useEffect(() => {
        useCurrentTime && setStartDate(null);
    }, [useCurrentTime]);

    return (
        <div className="modal-wrapper" onClick={(e) => {e.stopPropagation(); (e.target as HTMLElement).classList[0] === "modal-wrapper" && showAddEntryModal(false)}}>
            <div className="modal" id="add-entry-modal">
                <div id="add-entry-modal-head">
                    <h2>Add Entry</h2>
                    <X
                        size={44}
                        color={accentColor}
                        className="pointer"
                        onClick={() => {showAddEntryModal(false)}}
                    />
                </div>
                <div id="add-entry-modal-options">
                    <div id="add-entry-name">
                        <h3>Name</h3>
                        <input
                            type="text"
                            placeholder="xyz..."
                            id="add-entry-name-input"
                            onChange={(e) => {setName((e.target as HTMLInputElement).value)}}
                        />
                    </div>
                    <div id="add-entry-time-start">
                        <h3>Starting time</h3>
                        <div id="add-entry-time-start-wrapper">
                            <div id="add-entry-begin-now-button-wrapper">
                                <Checkbox
                                    ticked={useCurrentTime}
                                    setTicked={setUseCurrentTime}
                                    size={32}
                                    strokeWidth={2}
                                    borderWidth={2}
                                    borderRadius={5}
                                />
                                <span>Use Current Time</span>
                            </div>
                            <input
                                id="add-entry-time-start-input"
                                type="datetime-local"
                                disabled={useCurrentTime}
                                onChange={(e) => {setStartDate(new Date((e.target as HTMLInputElement).value) || new Date(0))}}
                            />
                        </div>
                    </div>
                    <button id="add-entry-submit" className="pointer" onClick={() => {submitEntry()}}>Add Entry</button>
                    <span className="error">{error}</span>
                </div>
            </div>
        </div>
    )
}