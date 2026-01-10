import './Entry.css'

type Props = {
    entry : any,
    entries: any;
    currentTime: number;
}

export default function Entry({ entry, entries, currentTime } : Props) {
    const timestamp : number = entries[entry].timestamp;

    const timeDifference = (currentTime - timestamp) / 1000; // <- difference in seconds

    const timeDifferences: Map<string, number> = new Map([
        ["seconds", Math.floor((timeDifference) % 60)],
        ["minutes", Math.floor((timeDifference / 60) % 60)],
        ["hours", Math.floor((timeDifference / (60 * 60)) % 24)],
        ["days", Math.floor((timeDifference / (60 * 60 * 24)) % 30.4583)],
        ["months", Math.floor((timeDifference / (60 * 60 * 24 * 30.4583) % 12))],
        ["years", Math.floor(timeDifference / (60 * 60 * 24 * 30.4583 * 12))]
    ]);

    return (
        <div className="entry">
            <h2>{entry}</h2>
            <p>{timeDifferences.get("years")} years</p>
            <p>{timeDifferences.get("months")} months</p>
            <p>{timeDifferences.get("days")} days</p>
            <p>{timeDifferences.get("hours")} hours</p>
            <p>{timeDifferences.get("minutes")} minutes</p>
            <p>{timeDifferences.get("seconds")} seconds</p>
        </div>
    )
}