import { X } from "lucide-react";
import { getCurrentTheme, switchTheme } from "../../../../utils";
import { useEffect, useState } from "react";
import type { Themes } from "../../../../consts";

import './SettingsModal.css'

type Props = {
    showModal: Function
}

export default function SettingsModal({ showModal } : Props) {
    const [selectedTheme, selectTheme] = useState<Themes>(getCurrentTheme());

    useEffect(() => {
        switchTheme(selectedTheme);
    }, [selectedTheme]);

    return (
        <div className="modal-wrapper" onClick={(e) => {e.stopPropagation(); (e.target as HTMLElement).classList[0] === "modal-wrapper" && showModal(false)}}>
            <div id="settings-modal" className="modal">
                <div className="modal-head">
                    <h2>Settings</h2>
                    <button className="icon-button" onClick={() => showModal(false)}>
                        <X
                            size={44}
                            className="pointer"
                        />
                    </button>
                </div>
                <div id="settings-modal-options">
                    <div id="settings-themes">
                        <h3>Theme</h3>
                        <div id="settings-theme-selector-wrapper">
                            <button id={selectedTheme === "system" ? "selected-theme" : ""} onClick={() => selectTheme("system")}>System</button>
                            <button id={selectedTheme === "light" ? "selected-theme" : ""} onClick={() => selectTheme("light")}>Light</button>
                            <button id={selectedTheme === "dark" ? "selected-theme" : ""} onClick={() => selectTheme("dark")}>Dark</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}