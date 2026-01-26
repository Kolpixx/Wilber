import { ChartArea, History, SquarePen } from 'lucide-react';
import { accentColor } from '../../../../consts';
import { getTimeDifferences, newAttempt } from '../../../../utils';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ConfirmationModal from '../../../../components/ConfirmationModal/ConfirmationModal';
import EditEntryModal from '../EditEntryModal/EditEntryModal';

import './Entry.css'

type Props = {
    id: number;
    entries: any;
    currentTime: number;
    setEntries: Function;
}

export default function Entry({ id, entries, currentTime, setEntries } : Props) {
    const navigate = useNavigate();

    const [showingNewAttemptConfirmationModal, showNewAttemptConfirmationModal] = useState<boolean>(false);
    const [showingEditEntryModal, showEditEntryModal] = useState<boolean>(false);

    const timestamp : number = entries[id].attempts[0];
    const timeDifference = currentTime - timestamp > 0 ? (currentTime - timestamp) / 1000 : 0; // <- difference in seconds
    const timeDifferences: Map<string, number> = getTimeDifferences(timeDifference);

    return (
        <div className="entry">
            {showingNewAttemptConfirmationModal && <ConfirmationModal confirmFunction={() => newAttempt(id, setEntries)} showModal={showNewAttemptConfirmationModal} text="Are you sure you want to start a new attempt?" />}
            {showingEditEntryModal && <EditEntryModal id={id} setEntries={setEntries} showModal={showEditEntryModal} />}
            <div className="entry-left">
                <h2 title={entries[id].name}>{entries[id].name}</h2>
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
                <button className="icon-button">
                    <ChartArea
                        size={32}
                        color={accentColor}
                        strokeWidth={1.75}
                        onClick={() => navigate(`/entry/${id}`)}
                    />
                </button>
                <button className="icon-button">
                    <History
                        size={32}
                        color={accentColor}
                        strokeWidth={1.75}
                        onClick={() => {showNewAttemptConfirmationModal(true)}}
                    />
                </button>
                <button className="icon-button">
                    <SquarePen
                        size={32}
                        color={accentColor}
                        strokeWidth={1.75}
                        onClick={() => {showEditEntryModal(true)}}
                    />
                </button>
            </div>
        </div>
    )
}