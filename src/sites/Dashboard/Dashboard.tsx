import { useEffect, useState } from 'react';
import { addEntry } from '../../utils'
import { Menu } from 'lucide-react';
import { accentColor } from '../../consts';
import Entry from './components/Entry/Entry';

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
                <form>
                    <input type="text" id="add-entry-input"></input>
                    <input type="submit" onClick={(e) => {{
                        e.preventDefault();
                        try {
                            const input: HTMLInputElement | null = (document.getElementById("add-entry-input") as HTMLInputElement);
                            input !== null && input.value !== null ? addEntry(input.value, setEntries) : console.error(new Error(`Element with id "add-entry-input" is null`));
                        } catch (error) {
                            console.error(error);
                        }
                    }}} value="Add"></input>
                </form>
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