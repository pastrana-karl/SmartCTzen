import React from 'react'
import "./viewproposal.css"

export default function ViewProposal() {
    return (
        <div className="viewMain">
            <div className="proposalView">
                <span className="viewTitle">Hell Week</span>
                <p className="viewDesc">Hays pingalitan na naman kasi nasa harap ng lappy<br/>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sed provident quam tempore commodi eius distinctio est magnam reprehenderit libero voluptatem eligendi minus illo, reiciendis sit molestias tenetur voluptas rerum! Eius!</p>
                <span className="viewDate">When: All Day Everyday</span>
                <span className="viewLoc">Where: Sa Bahay</span>
                <img src="" alt="pics dito"></img>
                <span className="viewAuth">Proposed By: Malamang Ako</span>
            </div>
            <div className="viewVote">
                <button className="viewUp">Upvote: <p>12</p></button>
                <button className="viewDown">Downvote: <p>12</p></button>
            </div>
            <div className="viewComment">
                <form className="commentForm">
                <input type="text" placeholder="Enter Comment"></input>
                <button className="createSubmit">Submit</button>
                </form>
                <div className="comments">
                    <table>
                        <tr>
                            <td rowSpan="2"><img src="data:image/jpeg;base64,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" alt="" className="commentorImg" /></td>
                        </tr>
                        <tr>
                            <table>
                                <tr><td>Anonymous</td></tr>
                                <tr><td>Kakastress talaga</td></tr>
                            </table>
                        </tr>
                    </table>
                </div>

            </div>

        </div>
    )
}
