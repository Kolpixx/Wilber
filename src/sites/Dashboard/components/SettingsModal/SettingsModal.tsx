import { X } from "lucide-react";
import { downloadEntries, getCurrentTheme, getThemeIds, importEntries, switchTheme } from "../../../../utils";
import { useEffect, useState } from "react";
import { themeMap, type Theme } from "../../../../consts";

import './SettingsModal.css'

type Props = {
    showModal: Function,
    setEntries: Function
}

export default function SettingsModal({ showModal, setEntries } : Props) {
    const [selectedTheme, selectTheme] = useState<Theme>(getCurrentTheme());

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
                            {
                                getThemeIds().map((theme, index) => {
                                    return <button key={index} id={selectedTheme === theme ? "selected-theme" : ""} onClick={() => selectTheme(theme)}>{themeMap.get(theme)}</button>
                                })
                            }
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