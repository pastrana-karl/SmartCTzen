import "./projects.css"
import "../Bars/catbar.css"
import React from 'react'

export default function Projects() {
    return (
        <div className="projectsMain">
            <div className="category">
                <ul className="categoryList">
                <   li className="categoryItem">All</li>
                    <li className="categoryItem">Accomplished</li>
                    <li className="categoryItem">Ongoing</li>
                </ul>
            </div>
            <div className="projectShort">
                <div className="projectShortInfo">
                    <h2>Hell Week</h2>
                    <table>
                        <tr>
                            <td><img src="" alt="Author Pic" className="projectAuth" /></td>
                            <td><p>Author Name</p></td>
                        </tr>
                    </table>
                    <p>Basta ayun nashotgun ako sa utak tapos pinapatigil ako sa paggawa sa comp kasi di raw ako nag aaral pag sa harap ng lappy</p>
                    <table>
                        <tr>
                            <td>Status:</td>
                            <td>Ongoing</td>
                            <td>Mata na icon</td>
                            <td>#</td>
                        </tr>
                    </table>
                </div>
                <img src="https://static1.srcdn.com/wordpress/wp-content/uploads/2020/05/Elmo-Flames-Meme.jpg" alt="" className="projectImg" />
            </div>
        </div>
    )
}
