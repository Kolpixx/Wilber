import { addEntry, getEntries, removeEntry } from '../../utils'

import './Dashboard.css'

export default function Dashboard() {
    return (
        <>
            <form>
                <input type="text" id="add-entry-input"></input>
                <input type="submit" onClick={(e) => {{
                    e.preventDefault();
                    try {
                        const input: HTMLInputElement | null = (document.getElementById("add-entry-input") as HTMLInputElement);
                        input !== null && input.value !== null ? addEntry(input.value) : console.error(new Error(`Element with id "add-entry-input" is null`));
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
                        input !== null && input.value !== null ? removeEntry(input.value) : console.error(new Error(`Element with id "remove-entry-input" is null`));
                    } catch (error) {
                        console.error(error);
                    }
                }}} value="Remove"></input>
            </form>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Timestamp</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(getEntries()).map((entry, i) => 
                        <tr key={i}>
                            <td>{entry}</td>
                            <td>{getEntries()[entry].timestamp}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>
    )
}