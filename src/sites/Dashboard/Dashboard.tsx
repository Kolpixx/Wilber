import { useEffect, useState } from 'react';
import { Menu } from 'lucide-react';
import { accentColor } from '../../consts';
import Entry from './components/Entry/Entry';
import AddEntryButton from './components/AddEntryButton/AddEntryButton';

import './Dashboard.css'

export default function Dashboard() {
    const [entries, setEntries] = useState<Object>(JSON.parse(localStorage.getItem("entries") || "{}"));
    const [currentTime, setCurrentTime] = useState<number>(Date.now());

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
            <header>
                <h1>Wilber</h1>
                <Menu
                    size={36}
                    color={accentColor}
                    strokeWidth={2.5}
                />
            </header>
            <main>
                <AddEntryButton size={Object.keys(entries).length === 0 ? "big" : "small"} />
                {Object.keys(entries).map((_key, i) => 
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