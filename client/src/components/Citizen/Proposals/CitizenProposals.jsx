import "./proposals.css";
import "../Bars/catbar.css";
import React from 'react';
import NavigationItem from '../../UI/Navigation/NavigationItems/NavigationItem/NavigationItem';
import NavigationItems from '../../UI/Navigation/NavigationItems/NavigationItems';
import Toolbar from '../../UI/Navigation/Toolbar/Toolbar';


const CitizenProposals = () => (
        <div className="proposalsMain">
            <div>
                    <React.Fragment>
                        <Toolbar>
                            <NavigationItems>
                                <NavigationItem link="/citizen-proposals-all" >All</NavigationItem>
                                <NavigationItem link="/citizen-proposals-approved" >Approved</NavigationItem>
                                <NavigationItem link="/citizen-proposals-rejected" >Rejected</NavigationItem>
                                <NavigationItem link="/citizen-proposals-mine" >My Proposals</NavigationItem>
                            </NavigationItems>
                        </Toolbar>        
                    </React.Fragment>
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

export default CitizenProposals;