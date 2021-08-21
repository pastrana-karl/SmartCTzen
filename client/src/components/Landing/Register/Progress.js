import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const Progress = ({ location: { pathname } }) => {
    const isRegisterStep = pathname === '/Register';
    const isSecondStep = pathname === '/second';
    const isThirdStep = pathname === '/third';
    const isFourthStep = pathname === '/fourth';
    const isFifthStep = pathname === '/fifth';
    const isSixthStep = pathname === '/sixth';
    const isSeventhStep = pathname === '/seventh';
  
    return (
      <React.Fragment>
        {isRegisterStep || isSecondStep || isThirdStep || isFourthStep || isFifthStep || isSixthStep || isSeventhStep ? ( 
           <div className="steps">
           <div className={`${isRegisterStep ? 'step active' : 'step'}`}>
             {isSecondStep || isThirdStep || isFourthStep || isFifthStep || isSixthStep || isSeventhStep ? (
                 <div><Link to="/Register">1</Link></div>
               ) : (
                <div>1</div>
               )}
           </div>
           <div className={`${isSecondStep ? 'step active' : 'step'}`}>
            {isThirdStep || isFourthStep || isFifthStep  || isSixthStep || isSeventhStep ? <div><Link to="/second">2</Link></div> : <div>2</div>}
           </div>
           <div className={`${pathname === '/third' ? 'step active' : 'step'}`}>
            {isFourthStep || isFifthStep || isSixthStep || isSeventhStep ? <div><Link to="/third">3</Link></div> : <div>3</div>}
           </div>
           <div className={`${pathname === '/fourth' ? 'step active' : 'step'}`}>
            {isFifthStep || isSixthStep || isSeventhStep ? <div><Link to="/fourth">4</Link></div> : <div>4</div>}
           </div>
           <div className={`${pathname === '/fifth' ? 'step active' : 'step'}`}>
            {isSixthStep || isSeventhStep ? <div><Link to="/fifth">5</Link></div> : <div>5</div>}
           </div>
           <div className={`${pathname === '/sixth' ? 'step active' : 'step'}`}>
            {isSeventhStep ? <div><Link to="/sixth">6</Link></div> : <div>6</div>}
           </div>
           <div className={`${pathname === '/seventh' ? 'step active' : 'step'}`}>
              <div>7</div>
              <div></div>
            </div>
       </div>) : ( <div></div> )}
      </React.Fragment>
    );
  };

export default withRouter(Progress);