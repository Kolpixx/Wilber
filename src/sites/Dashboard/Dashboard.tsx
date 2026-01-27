import { useEffect, useState } from 'react';
import { Cog } from 'lucide-react';
import Entry from './components/Entry/Entry';
import AddEntryButton from './components/AddEntryButton/AddEntryButton';
import AddEntryModal from './components/AddEntryButton/components/AddEntryModal/AddEntryModal';
import SettingsModal from './components/SettingsModal/SettingsModal';

import './Dashboard.css'

export default function Dashboard() {
    const [entries, setEntries] = useState<Array<Object>>(JSON.parse(localStorage.getItem("entries") || "[]"));
    const [currentTime, setCurrentTime] = useState<number>(Date.now());
    const [showingAddEntryModal, showAddEntryModal] = useState<boolean>(false);
    const [showingSettingsModal, showSettingsModal] = useState<boolean>(false);

    useEffect(() => {
        localStorage.setItem("entries", JSON.stringify(entries));
    }, [entries]);

    useEffect(() => {
        setInterval(() => {
            setCurrentTime(Date.now());
        }, 1000);
    }, []);

    return (
        <div id="dashboard">
            {showingAddEntryModal && <AddEntryModal showAddEntryModal={showAddEntryModal} setEntries={setEntries} />}
            {showingSettingsModal && <SettingsModal showModal={showSettingsModal} />}
            <header>
                <h1>Wilber</h1>
                <button id="settings-button" className="icon-button" onClick={() => showSettingsModal(true)}>
                    <Cog
                        size={42}
                        strokeWidth={2}
                    />
                </button>
            </header>
            <main>
                <AddEntryButton size={entries.length === 0 ? "big" : "small"} onClick={() => showAddEntryModal(true)} />
                {entries.map((_key, i) => 
                    <Entry
                        key={i}
                        id={i}
                        entries={entries}
                        currentTime={currentTime}
                        setEntries={setEntries}
                    />
                )}
            </main>
        </div>
    )
}