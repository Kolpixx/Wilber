import { useEffect, useState } from 'react';
import { addEntry, removeEntry } from '../../utils'
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
            console.log("Update");
            setCurrentTime(Date.now());
        }, 1000);
    }, []);

    return (
        <>
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
            <form>
                <input type="text" id="remove-entry-input"></input>
                <input type="submit" onClick={(e) => {{
                    e.preventDefault();
                    try {
                        const input: HTMLInputElement | null = (document.getElementById("remove-entry-input") as HTMLInputElement);
                        input !== null && input.value !== null ? removeEntry(input.value, setEntries) : console.error(new Error(`Element with id "remove-entry-input" is null`));
                    } catch (error) {
                        console.error(error);
                    }
                }}} value="Remove"></input>
            </form>
            {Object.keys(entries).map((entry, i) => 
                <Entry
                    key={i}
                    entry={entry}
                    entries={entries}
                    currentTime={currentTime}
                />
            )}
        </>
    )
}