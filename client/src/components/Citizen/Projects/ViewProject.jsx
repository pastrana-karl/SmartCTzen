import React from 'react'
import "./viewproject.css"

export default function ViewProject() {
    return (
        <div className="viewMain">
            <div className="projectView">
                <table>
                    <tr>
                        <td><span className="viewTitle">Hell Week</span></td>
                        <td>Mata: #</td>
                    </tr>
                   
                </table>
                <p className="viewDesc">Hays pingalitan na naman kasi nasa harap ng lappy<br/>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sed provident quam tempore commodi eius distinctio est magnam reprehenderit libero voluptatem eligendi minus illo, reiciendis sit molestias tenetur voluptas rerum! Eius!</p>
                <span className="viewDate">Date Started: Kahapon Lang</span>
                <span className="viewLoc">Where: Sa labas ng bahay</span>
                <img src="https://united-architects.org/assets/files/files/n659----construction.jpg" alt="pics dito"/>
                
            </div>
        </div>
    )
}
