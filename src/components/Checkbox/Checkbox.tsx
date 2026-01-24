import { Check } from 'lucide-react'
import { accentColor } from '../../consts'

import './Checkbox.css'

type Props = {
    ticked: boolean,
    setTicked: Function,
    size?: number,
    strokeWidth?: number,
    borderWidth?: number,
    borderRadius?: number
}

export default function Checkbox({ ticked, setTicked, size, strokeWidth, borderWidth, borderRadius } : Props) {
    return (
        <div className="checkbox pointer" data-checked={ticked} onClick={() => {setTicked(!ticked)}} style={{width: `${size || 36}px`, height: `${size || 36}px`, borderWidth: `${borderWidth}px`, borderRadius: `${borderRadius}px`}}>
            {ticked && <Check size={(size || 0) - 4} color={accentColor} strokeWidth={strokeWidth || 2} />}
        </div>
    )
}