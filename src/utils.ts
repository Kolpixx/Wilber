export function addEntry(name: string) {
    const entries = getEntries();

    if (entries[name]) {
        throw new Error(`An entry with the name "${name}" already exists`);        
    } else {
        entries[name] = {timestamp: Date.now()};
        localStorage.setItem("entries", JSON.stringify(entries));
    }
}

export function removeEntry(name: string) {
    const entries = getEntries();

    if (entries[name]) {
        delete entries[name];
        localStorage.setItem("entries", JSON.stringify(entries));
    } else {
        throw new Error(`An entry with the name ${name} doesn't exist`);
    }
}

export function getEntries() {
    return (
        JSON.parse(localStorage.getItem("entries") || "{}")
    )
}