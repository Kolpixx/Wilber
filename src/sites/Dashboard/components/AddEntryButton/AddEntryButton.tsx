import { Plus } from 'lucide-react'
import { accentColor } from '../../../../consts'

import './AddEntryButton.css'

type Sizes = "big" | "small";

type Props = {
    size: Sizes;
}

export default function AddEntryButton({ size } : Props) {
    return (
        <button id={`add-entry-button${size === "big" ? "-big" : ""}`} className="pointer">
            <Plus
                size={size === "big" ? 92 : 64}
                color={accentColor}
                strokeWidth={size === "big" ? 1 : 1.3}
            />
        </button>
    )
}