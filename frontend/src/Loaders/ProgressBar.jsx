import { useProgress } from '../Contexts/ProgressContext'
import './ProgressBar.css'

export default function ProgressBar(){
    const {isProgressVisible} = useProgress();
    // console.log("Checking for Progress Bar",isProgressVisible)
    if(!isProgressVisible)return null;
    return(
        <div className="progress-bar">
            <div className="progress-value">
            </div>
        </div>
    )
}