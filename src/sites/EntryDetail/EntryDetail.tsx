import { useParams } from 'react-router-dom'
import { getEntries } from '../../utils';

import './EntryDetail.css'

export default function EntryDetail() {
    const { id }: any = useParams();
    const entries: any = getEntries();

    if (!entries[id]) {
        return <h2>Could not find entry</h2>
    }

    const name = entries[id].name;

    return (
        <div id="entry-detail">
            <p>{name}</p>
        </div>
    )
}