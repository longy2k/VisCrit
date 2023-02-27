import CommentBox from './CommentBox'

export default function CritiqueBox(){
    return (
        <div className="critiqueSection">
            <header>Critique Detail Entry</header>
            <ul className="category-items">
                <li>
                    NAME
                </li>
                <li>
                    BUTTON
                </li>
                <li>
                    RATING
                </li>
            </ul>
            <div>
                <CommentBox />
            </div>
        </div>
    )
}