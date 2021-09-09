import "./reports.css"
import "../Bars/catbar.css"
import React from 'react'

const CitizenReports = () => (
        <div className="reportsMain">
            <div className="category">
                <ul className="categoryList">
                <   li className="categoryItem">All</li>
                    <li className="categoryItem">Confirmed</li>
                    <li className="categoryItem">Cancelled</li>
                    <li className="categoryItem">Resolved</li>
                </ul>
            </div>
            <div className="submitReport">
                <button className="reportCreate">Create A Report</button>
                <button className="reportChat">Chat Icon</button>
            </div>
            <div className="reportShort">
                <img className="reportImg" alt="IDK"src="https://venngage-wordpress.s3.amazonaws.com/uploads/2018/09/Monochrome-Type-Simple-Background-Image.jpg"/>
                <span className="reportTitle">Variant</span>
                <div className="reportDets">
                    <span className="reportInfo">Where</span>
                    <span className="reportInfo">Reported by</span>
                    <span className="reportInfo">Date Submitted</span>
                    <span className="reportInfo">Status</span>
                </div>
            </div>
        </div>
    )

export default CitizenReports;