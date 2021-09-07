import React from 'react'
import "./createproposal.css"
export default function CreateProposal() {
    return (
        <div className="createMain">
            <form className="createForm">
                <label for="proposalTitle">Proposal Title</label>
                <input type="text" id="proposalTitle"className="createInput" placeholder=""/>
                <label for ="proposalDesc">Description</label>
                <input type="text" id="proposalDesc" className="createInput" placeholder="" /> 
                <label for="proposalDate">When</label>
                <input type="text" id="proposalDate" className="createInput" placeholder="" />
                <label for ="proposalLoc">Where</label>
                <input type="text" id="proposalLoc" className="createInput" placeholder="" /> 
                <label for="proposalImg">Photo</label>
                <input type="file" id="proposalImg" className="createInput" placeholder="" />  
                <button className="createSubmit">Submit</button>
                <button className="createCancel">Cancel</button>
            </form>
            
        </div>
    )
}
