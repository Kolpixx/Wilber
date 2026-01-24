import { useEffect, useState } from 'react'
import { addEntry } from '../../../../../../utils';

import './AddEntryModal.css'
import Checkbox from '../../../../../../components/Checkbox/Checkbox';

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
        <div className="modal-wrapper" onClick={(e) => {(e.target as HTMLElement).classList[0] === "modal-wrapper" && showAddEntryModal(false)}}>
            <div className="modal" id="add-entry-modal">
                <h2>Add Entry</h2>
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
                                <span>Now</span>
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
                    {error}
                </div>
            </div>
        </div>
    )
}