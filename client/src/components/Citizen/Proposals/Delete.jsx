import React from 'react'
import "./viewproposal.css"
export default function Delete() {
    return (
        <div className="deleteMain">
            <div className="proposalView">
                <span className="viewTitle">Hell Week</span>
                <p className="viewDesc">Hays pingalitan na naman kasi nasa harap ng lappy<br/>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sed provident quam tempore commodi eius distinctio est magnam reprehenderit libero voluptatem eligendi minus illo, reiciendis sit molestias tenetur voluptas rerum! Eius!</p>
                <span className="viewDate">When: All Day Everyday</span>
                <span className="viewLoc">Where: Sa Bahay</span>
                <table>
                    <tr>
                        <td><span className="viewUp">Upvote: 1</span></td>
                        <td><span className="viewDown">Downvote: 1</span></td>
                    </tr>
                </table>
                <button className="viewDelete">Delete ME </button>
            </div>
        </div>
    )
}
