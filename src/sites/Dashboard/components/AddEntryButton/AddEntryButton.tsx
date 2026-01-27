import { Plus } from 'lucide-react'

import './AddEntryButton.css'

type Sizes = "big" | "small";

type Props = {
    size: Sizes;
    onClick: () => void;
}

export default function AddEntryButton({ size, onClick } : Props) {
    return (
        <button id={`add-entry-button${size === "big" ? "-big" : ""}`} className="pointer" onClick={onClick}>
            <Plus
                size={size === "big" ? 92 : 64}
                strokeWidth={size === "big" ? 1 : 1.3}
            />
        </button>
    )
}