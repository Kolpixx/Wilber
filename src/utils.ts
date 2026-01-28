import type { Themes } from "./consts";

export function addEntry(setEntries: Function, name: string, startDate?: Date) {
    const entries = getEntries();

    entries.push({name: name, attempts: [startDate?.getTime() || Date.now()]});
    setEntries(entries);
}

export function removeEntry(id: number, setEntries: Function) {
    const entries = getEntries();
    console.log(entries);

    if (entries[id]) {
        entries.splice(id, 1);
        setEntries(entries);
    } else {
        throw new Error(`An entry with the id ${id} does not exist`);
    }
}

export function editEntryName(id: number, newName: string, setEntries: Function) {
    const entries = getEntries();

    if (entries[id]) {
        entries[id].name = newName;
        setEntries(entries);
    } else {
        throw new Error(`An entry with the id ${id} does not exist`);
    }
}

export function getEntries() {
    return (
        JSON.parse(localStorage.getItem("entries") || "[]")
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

export function switchTheme(chosenTheme: Themes) {
    const preferences = JSON.parse(localStorage.getItem("preferences") || "{}");
    preferences.theme = chosenTheme;
    localStorage.setItem("preferences", JSON.stringify(preferences));

    document.body.setAttribute("data-theme", chosenTheme === "system" ? getSystemTheme() : chosenTheme);
}

export function getSystemTheme() {
    const darkModeMq = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');
    if (darkModeMq && darkModeMq.matches) {
        return "dark";
    } else {
        return "light";
    }
}

export function getCurrentTheme() {
    const preferences = JSON.parse(localStorage.getItem("preferences") || '{"theme": "light"}');
    const theme: Themes = preferences.theme;

    return theme;
}

export function downloadEntries() {
    const entries: string = JSON.stringify(getEntries(), null, 2);
    const entriesBlob: Blob = new Blob([entries], { type: "application/json" });
    const downloadElement: HTMLAnchorElement = document.createElement("a");

    downloadElement.href = window.URL.createObjectURL(entriesBlob);
    downloadElement.download = "entries.json";
    downloadElement.click();
}

export function importEntries(setEntries: Function) {
    const inputElement: HTMLInputElement = document.createElement("input");
    inputElement.type = "file";
    inputElement.accept = "application/json";

    inputElement.addEventListener("change", () => {
        if (inputElement.files !== null) {
            const file = inputElement.files[0];
            const reader = new FileReader();
            const regex = /\[.*\{.*"name":.*".*",.*"attempts":.*\[.*\d.*\].*\}.*\]/i;

            reader.addEventListener("load", () => {
                let result = reader.result;

                try {
                    result = JSON.stringify(JSON.parse(result as string)); // to make it one line lol
                } catch {
                    throw new Error("It's not even a valid JSON");
                }

                if (regex.test(result as string)) {
                    const importedArray: Array<Object> = JSON.parse(result);
                    const entries = getEntries();

                    importedArray.forEach((entryObject) => {
                        entries.push(entryObject);
                    });
                    
                    setEntries(entries);
                } else {
                    throw new Error("Input file doesn't match regex");
                }
            });
            reader.readAsText(file);
        }
    });
    
    inputElement.click();
}