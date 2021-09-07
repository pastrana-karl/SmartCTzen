import "./proposals.css"
import "../Bars/catbar.css"
import React from 'react'

export default function Proposals() {
    return (
        <div className="proposalsMain">
            <div className="category">
                <ul className="categoryList">
                <   li className="categoryItem">All</li>
                    <li className="categoryItem">Approved</li>
                    <li className="categoryItem">Rejected</li>
                    <li className="categoryItem">My Proposals</li>
                </ul>
            </div>
            <button className="proposalCreate">Create Proposal</button>
            <div className="proposalShort">
                <div className="proposalShortInfo">
                    <h2>Hell Week</h2>
                    <img src="" alt="Author" className="proposalAuth" /><p>Author Name</p>
                    <p>Basta ayun nashotgun ako sa utak tapos pinapatigil ako sa paggawa sa comp kasi di raw ako nag aaral pag sa harap ng lappy</p>
                    <p>Upvote: #</p><p>Downvote: #</p>
                </div>
                <img src="https://static1.srcdn.com/wordpress/wp-content/uploads/2020/05/Elmo-Flames-Meme.jpg" alt="" className="proposalImg" />
            </div>
        </div>
    )
}
