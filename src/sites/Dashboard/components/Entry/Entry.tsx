import { Ellipsis, History, ScrollText } from 'lucide-react';
import { accentColor } from '../../../../consts';
import { getTimeDifferences, newAttempt } from '../../../../utils';
import { useNavigate } from 'react-router-dom';

import './Entry.css'

type Props = {
    id: number;
    entries: any;
    currentTime: number;
    setEntries: Function;
}

export default function Entry({ id, entries, currentTime, setEntries } : Props) {
    const navigate = useNavigate();

    const timestamp : number = entries[id].attempts[0];
    const timeDifference = currentTime - timestamp > 0 ? (currentTime - timestamp) / 1000 : 0; // <- difference in seconds
    const timeDifferences: Map<string, number> = getTimeDifferences(timeDifference);

    return (
        <div className="entry" onClick={() => navigate(`/entry/${id}`)}>
            <div className="entry-left">
                <h2>{entries[id].name}</h2>
                <div className="entry-time-data">
                    <div>
                        <p><span className="number-font">{timeDifferences.get("years") || "0"}</span> years</p>
                        <p><span className="number-font">{timeDifferences.get("months") || "0"}</span> months</p>
                        <p><span className="number-font">{timeDifferences.get("days") || "0"}</span> days</p>
                    </div>
                    <div>
                        <p><span className="number-font">{timeDifferences.get("hours") || "0"}</span> hours</p>
                        <p><span className="number-font">{timeDifferences.get("minutes") || "0"}</span> minutes</p>
                        <p><span className="number-font">{timeDifferences.get("seconds") || "0"}</span> seconds</p>
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
                    onClick={(e) => {e.stopPropagation(); newAttempt(id, setEntries)}}
                />
            </div>
        </div>
    )
}