export function addEntry(name: string, setEntries: Function) {
    const entries = getEntries();

    if (entries[name]) {
        throw new Error(`An entry with the name "${name}" already exists`);        
    } else {
        entries[name] = {attempts: [Date.now()]};
        setEntries(entries);
    }
}

export function removeEntry(name: string, setEntries: Function) {
    const entries = getEntries();

    if (entries[name]) {
        delete entries[name];
        setEntries(entries);
    } else {
        throw new Error(`An entry with the name ${name} doesn't exist`);
    }
}

export function getEntries() {
    return (
        JSON.parse(localStorage.getItem("entries") || "{}")
    )
}

export function newAttempt(name: string, setEntries: Function) {
    const entries = getEntries();

    if (entries[name]) {
        entries[name].attempts.splice(0, 0, Date.now());
        setEntries(entries);
    } else {
        throw new Error(`An entry with the name ${name} doesn't exist`);
    }
}