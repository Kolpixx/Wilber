import { Ellipsis, History, ScrollText } from 'lucide-react';
import { accentColor } from '../../../../consts';

import './Entry.css'
import { newAttempt } from '../../../../utils';

type Props = {
    entry : any,
    entries: any;
    currentTime: number;
    setEntries: Function;
}

export default function Entry({ entry, entries, currentTime, setEntries } : Props) {
    const timestamp : number = entries[entry].attempts[0];

    const timeDifference = currentTime - timestamp > 0 ? (currentTime - timestamp) / 1000 : 0; // <- difference in seconds

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
            <div className="entry-left">
                <h2>{entry}</h2>
                <div className="entry-time-data">
                    <div>
                        <p><span className="number-font">{timeDifferences.get("years")}</span> years</p>
                        <p><span className="number-font">{timeDifferences.get("months")}</span> months</p>
                        <p><span className="number-font">{timeDifferences.get("days")}</span> days</p>
                    </div>
                    <div>
                        <p><span className="number-font">{timeDifferences.get("hours")}</span> hours</p>
                        <p><span className="number-font">{timeDifferences.get("minutes")}</span> minutes</p>
                        <p><span className="number-font">{timeDifferences.get("seconds")}</span> seconds</p>
                    </div>
                </div>
            </div>
            <div className="entry-right">
                <Ellipsis
                    size={32}
                    color={accentColor}
                    strokeWidth={1.75}
                />
                <ScrollText
                    size={32}
                    color={accentColor}
                    strokeWidth={1.75}
                />
                <History
                    size={32}
                    color={accentColor}
                    strokeWidth={1.75}
                    onClick={() => newAttempt(entry, setEntries)}
                />
            </div>
        </div>
    )
}