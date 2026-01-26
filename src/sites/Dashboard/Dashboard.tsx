import { useEffect, useState } from 'react';
import { Menu } from 'lucide-react';
import { accentColor } from '../../consts';
import { removeEntry } from '../../utils';
import Entry from './components/Entry/Entry';
import AddEntryButton from './components/AddEntryButton/AddEntryButton';
import AddEntryModal from './components/AddEntryButton/components/AddEntryModal/AddEntryModal';

import './Dashboard.css'

export default function Dashboard() {
    const [entries, setEntries] = useState<Array<Object>>(JSON.parse(localStorage.getItem("entries") || "[]"));
    const [currentTime, setCurrentTime] = useState<number>(Date.now());
    const [showingAddEntryModal, showAddEntryModal] = useState<boolean>(false);

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
            <header>
                <h1>Wilber</h1>
                <Menu
                    size={36}
                    color={accentColor}
                    strokeWidth={2.5}
                />
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