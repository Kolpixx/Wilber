import { Hourglass, Play, TimerReset } from 'lucide-react';
import { accentColor } from '../../../../consts';
import { getEntries, getTimeDifferences } from '../../../../utils';

import './DetailCard.css'

type Props = {
    id: number,
    index: number
}

export default function DetailCard({ index, id } : Props) {
    const attemptStart = new Date(getEntries()[id].attempts[index]);
    const nextAttemptStart = new Date(getEntries()[id].attempts[index + 1] || 0);
    const currentTime = new Date();
    const timeDifferences: Map<string, number> = nextAttemptStart.toString() !== new Date(0).toString() ? getTimeDifferences(getEntries()[id].attempts[index] / 1000 - getEntries()[id].attempts[index + 1] / 1000 || 0) : getTimeDifferences(currentTime.getTime() / 1000 - getEntries()[id].attempts[0] / 1000);
    let timeDifferencesKeys: Array<string> = [...timeDifferences.keys()];
    timeDifferencesKeys = timeDifferencesKeys.reverse();

    return (
        <div className="detail-card">
            <h3>Attempt #{Number(index + 1)}</h3>
            <div className="detail-card-stats number-font">
                <div className="detail-card-start">
                    <Play
                        size={28}
                        color={accentColor}
                        strokeWidth={2}
                    />
                    {attemptStart.toLocaleDateString([], {year: "numeric", month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit"})}
                </div>
                <div className="detail-card-reset">
                    <TimerReset
                        size={28}
                        color={accentColor}
                        strokeWidth={2}
                    />
                    {nextAttemptStart.toString() !== new Date(0).toString() ? nextAttemptStart.toLocaleDateString([], {year: "numeric", month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit"}) : "Still going!"}
                </div>
                <div className="detail-card-time">
                    <Hourglass
                        size={28}
                        color={accentColor}
                        strokeWidth={2}
                    />
                    {timeDifferencesKeys.map((key: string, iterator: number) => {
                        const keys: Map<string, string> = new Map([["seconds", "s"], ["minutes", "m"], ["hours", "h"], ["days", "D"] , ["months", "M"], ["years", "Y"]]);
                        return (
                            <span key={iterator}><span>{timeDifferences.get(key)}</span><span className="">{keys.get(key)}</span></span>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}