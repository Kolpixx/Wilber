export function addEntry(setEntries: Function, name: string, startDate?: Date) {
    const entries = getEntries();
    const id = Object.keys(entries).length;

    if (entries[id]) {
        throw new Error(`An entry with the id "${name}" already exists`);        
    } else {
        entries[id] = {name: name, attempts: [startDate?.getTime() || Date.now()]};
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

export function getTimeDifferences(timeDifference: number) {
    const timeDifferences: Map<string, number> = new Map([]);

    timeDifferences.set("seconds", Math.floor((timeDifference) % 60));
    timeDifference >= 60 && timeDifferences.set("minutes", Math.floor((timeDifference / 60) % 60));
    timeDifference >= 3600 && timeDifferences.set("hours", Math.floor((timeDifference / (60 * 60)) % 24));
    timeDifference >= 86400 && timeDifferences.set("days", Math.floor((timeDifference / (60 * 60 * 24)) % 30.4583));
    timeDifference >= 2631597.1200 && timeDifferences.set("months", Math.floor((timeDifference / (60 * 60 * 24 * 30.4583) % 12)));
    timeDifference >= 31579165.44 && timeDifferences.set("years", Math.floor(timeDifference / (60 * 60 * 24 * 30.4583 * 12)));

    return timeDifferences;
}