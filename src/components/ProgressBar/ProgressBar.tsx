import './ProgressBar.css'

type Props = {
    progressState: number,
    htmlWidth: string;
    id: string,
    text?: string,
    leadingZero?: boolean,
    leadingZeroAmount?: number
}

export default function ProgressBar({ progressState, htmlWidth, id, text, leadingZero, leadingZeroAmount } : Props) {
    return (
        <div className="progress-bar-wrapper">
            <span className="progress-bar-text progress-bar-text-1 progress-bar-text-back"><span className="number-font">{leadingZero ? String(progressState).padStart(leadingZeroAmount || 2, '0') : progressState}</span> {text}</span>
            <div id={id} className="progress-bar" style={{width: htmlWidth}}>
                <span className="progress-bar-text progress-bar-text-1 progress-bar-text-front"><span className="number-font">{leadingZero ? String(progressState).padStart(leadingZeroAmount || 2, '0') : progressState}</span> {text}</span>
            </div>
        </div>
    )
}