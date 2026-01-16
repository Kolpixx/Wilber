import { useParams } from 'react-router-dom'
import { getEntries, getTimeDifferences } from '../../utils';
import { useEffect, useState } from 'react';
import ProgressBar from '../../components/ProgressBar/ProgressBar';

import './EntryDetail.css'

export default function EntryDetail() {
    const [currentTime, setCurrentTime] = useState<number>(Date.now());

    const { id }: any = useParams();
    const entries: any = getEntries();

    if (!entries[id]) {
        return <h2>Could not find entry</h2>
    }

    const name = entries[id].name;

    const timestamp : number = entries[id].attempts[0];
    const timeDifference = currentTime - timestamp > 0 ? (currentTime - timestamp) / 1000 : 0; // <- difference in seconds
    const timeDifferences: Map<string, number> = getTimeDifferences(timeDifference);

    const progressBars: Array<any> = [];
    let timeDifferencesKeys: Array<string> = [...timeDifferences.keys()];
    timeDifferencesKeys= timeDifferencesKeys.reverse();

    for (let i = 0; i < (timeDifferencesKeys.length < 3 ? timeDifferencesKeys.length : 3); i++) {
        const key: string = timeDifferencesKeys[i];
        const value: number = timeDifferences.get(timeDifferencesKeys[i]) || 0;
        const divider: number = key === "seconds" ? 60 : key === "minutes" ? 60 : key === "hours" ? 24 : key === "days" ? 30.4583 : key === "months" ? 12 : 0;

        progressBars.push(
            <ProgressBar
                key={i}
                id={`progress-bar-${i + 1}`}
                progressState={value}
                htmlWidth={`${key === "years" ? 100 : (value / divider) * 100}%`}
                text={key}
                leadingZero={true}
            />
        );
    }

    useEffect(() => {
        setInterval(() => {
            setCurrentTime(Date.now());
        }, 1000);
    }, []);

    return (
        <div id="entry-detail">
            <h1>{name}</h1>
            <div id="entry-tracker">
                <h2>Tracker</h2>
                {progressBars}
            </div>
            <div id="entry-log">
                <h2>Log</h2>
            </div>
        </div>
    )
}