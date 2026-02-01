import { useNavigate } from 'react-router-dom'

import './NotFound.css'

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <div id="not-found">
            <span>404 Not Found :c</span>
            <button onClick={() => navigate("/")}>Return to Dashboard</button>
        </div>
    )
}