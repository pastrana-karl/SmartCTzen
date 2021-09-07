import React from 'react'
import "./viewreport.css"

export default function ViewReport() {
    return (
        <div className="viewMain">
            <div className="reportView">
                <span className="viewTitle">Hell Week</span>
                <span className="viewAuth">Reported By: Malamang Ako</span>
                <span className="viewStat">Status: Walang sumasagot</span>
                <p className="viewDesc">Hays pingalitan na naman kasi nasa harap ng lappy<br/>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sed provident quam tempore commodi eius distinctio est magnam reprehenderit libero voluptatem eligendi minus illo, reiciendis sit molestias tenetur voluptas rerum! Eius!</p>
                <span className="viewLoc">Where: Sa Bahay</span>
                <span className="viewDate">Date Submitted: Ngayon ngayon lang</span>
                <img src="" alt="pics dito"></img>  
            </div>
        </div>
    )
}
