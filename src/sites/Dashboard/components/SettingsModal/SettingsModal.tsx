import { X } from "lucide-react";
import { switchTheme } from "../../../../utils";

type Props = {
    showModal: Function
}

export default function SettingsModal({ showModal } : Props) {
    return (
        <div className="modal-wrapper" onClick={(e) => {e.stopPropagation(); (e.target as HTMLElement).classList[0] === "modal-wrapper" && showModal(false)}}>
            <div id="settings-modal" className="modal">
                <div className="modal-head">
                    <h2>Add Entry</h2>
                    <button className="icon-button" onClick={() => showModal(false)}>
                        <X
                            size={44}
                            className="pointer"
                        />
                    </button>
                </div>
                <div id="settings-modal-options">
                    <div id="settings-theme-selector-wrapper">
                        <button onClick={() => switchTheme("system")}>System</button>
                        <button onClick={() => switchTheme("light")}>Light</button>
                        <button onClick={() => switchTheme("dark")}>Dark</button>
                    </div>
                </div>
            </div>
        </div>
    )
}