import React from 'react'
import "./createreport.css"
export default function CreateReport() {
    return (
        <div className="createMain">
            <form className="createForm">
                <label for="reportTitle">Report Title</label>
                <input type="text" id="reportTitle"className="createInput" placeholder=""/>
                <label for ="reportDesc">Description</label>
                <input type="text" id="reportDesc" className="createInput" placeholder="" /> 
                <label for ="reportLoc">Where</label>
                <input type="text" id="reportLoc" className="createInput" placeholder="" /> 
                <label for="reportImg">Photo</label>
                <input type="file" id="reportImg" className="createInput" placeholder="" />  
                <table>
                    <tr>
                        <td><button className="createSubmit">Submit</button></td>
                        <td><button className="createCancel">Cancel</button></td>
                    </tr>
                </table>
                
            </form>
            
        </div>
    )
}
