import './Entry.css'

type Props = {
    entry : any,
    entries: any;
    currentTime: number;
}

export default function Entry({ entry, entries, currentTime } : Props) {
    const timestamp : number = entries[entry].timestamp;

    const timeDifference = Math.floor((currentTime - timestamp) / 1000); // <- difference in seconds

    return (
        <div className="entry">
            <h2>{entry}</h2>
            <p>{timeDifference >= 0 ? timeDifference : 0} seconds</p>
        </div>
    )
}