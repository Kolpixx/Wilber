import { useNavigate, useParams } from 'react-router-dom'
import { getEntries, getTimeDifferences } from '../../utils';
import { useEffect, useState } from 'react';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import DetailCard from './components/DetailCard/DetailCard';

import './EntryDetail.css'
import { ArrowLeft } from 'lucide-react';
import { accentColor } from '../../consts';

export default function EntryDetail() {
    const [currentTime, setCurrentTime] = useState<number>(Date.now());
    const navigate = useNavigate();

    const { id }: any = useParams();
    const entries: any = getEntries();

    if (!entries[id]) {
        return <h2>Could not find entry</h2>
    }

    const name = entries[id].name;

    const timestamp : number = entries[id].attempts[0];
    const timeDifference = currentTime - timestamp > 0 ? (currentTime - timestamp) / 1000 : 0; // <- difference in seconds
    const timeDifferences: Map<string, number> = getTimeDifferences(timeDifference);
    const maximumProgressBarAmount: number = window.innerWidth > 600 ? 6 : 3;

    const progressBars: Array<any> = [];
    let timeDifferencesKeys: Array<string> = [...timeDifferences.keys()];
    timeDifferencesKeys= timeDifferencesKeys.reverse();

    for (let i = 0; i < (timeDifferencesKeys.length < maximumProgressBarAmount ? timeDifferencesKeys.length : maximumProgressBarAmount); i++) {
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
            <div id="entry-head">
                <ArrowLeft
                    size={44}
                    color={accentColor}
                    strokeWidth={2}
                    className="pointer"
                    id="entry-back-button"
                    onClick={() => navigate("/")}
                />
                <h1>{name}</h1>
                <div style={{width: "36px"}} />
            </div>
            <div id="entry-main">
                <div id="entry-tracker">
                    <h2>Tracker</h2>
                    <div id="progress-bars">
                        {progressBars}
                    </div>
                </div>
                <div id="entry-log">
                    <h2>Log</h2>
                    <div id="detail-cards">
                        {entries[id].attempts.map((_attempt : number, index: number) => {
                            return (
                                <DetailCard
                                    key={index}
                                    index={index}
                                    id={id}
                                />
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}