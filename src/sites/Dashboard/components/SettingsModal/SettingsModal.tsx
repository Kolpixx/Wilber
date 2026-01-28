import { X } from "lucide-react";
import { downloadEntries, getCurrentTheme, importEntries, switchTheme } from "../../../../utils";
import { useEffect, useState } from "react";
import type { Themes } from "../../../../consts";

import './SettingsModal.css'

type Props = {
    showModal: Function,
    setEntries: Function
}

export default function SettingsModal({ showModal, setEntries } : Props) {
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
                            <button id={selectedTheme === "catppuccin-mocha" ? "selected-theme" : ""} onClick={(() => selectTheme("catppuccin-mocha"))}>Catppuccin</button>
                        </div>
                    </div>
                    <div id="settings-import-and-export">
                        <h3>Import & Export</h3>
                        <div id="settings-import-and-export-buttons">
                            <button onClick={() => importEntries(setEntries)}>Import</button>
                            <button onClick={() => downloadEntries()}>Export</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}