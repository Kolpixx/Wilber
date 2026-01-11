export function addEntry(name: string, setEntries: Function) {
    const entries = getEntries();
    const id = Object.keys(entries).length;

    if (entries[id]) {
        throw new Error(`An entry with the id "${name}" already exists`);        
    } else {
        entries[id] = {name: name, attempts: [Date.now()]};
        setEntries(entries);
    }
}

export function removeEntry(id: number, setEntries: Function) {
    const entries = getEntries();

    if (entries[id]) {
        delete entries[id];
        setEntries(entries);
    } else {
        throw new Error(`An entry with the id ${id} does not exist`);
    }
}

export function getEntries() {
    return (
        JSON.parse(localStorage.getItem("entries") || "{}")
    )
}

export function newAttempt(id: number, setEntries: Function) {
    const entries = getEntries();

    if (entries[id]) {
        entries[id].attempts.splice(0, 0, Date.now());
        setEntries(entries);
    } else {
        throw new Error(`An entry with the id ${id} does not exist`);
    }
}