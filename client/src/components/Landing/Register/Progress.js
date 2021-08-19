import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const Progress = ({ location: { pathname } }) => {
    const isRegisterStep = pathname === '/Register';
    const isSecondStep = pathname === '/second';
    const isThirdStep = pathname === '/third';
    const isFourthStep = pathname === '/fourth';
  
    return (
      <React.Fragment>
        {isRegisterStep || isSecondStep || isThirdStep || isFourthStep ? ( 
           <div className="steps">
           <div className={`${isRegisterStep ? 'step active' : 'step'}`}>
             <div>1</div>
             <div>
               {isSecondStep || isThirdStep ? (
                 <Link to="/Register">Step 1</Link>
               ) : (
                 'Step 1'
               )}
             </div>
           </div>
           <div className={`${isSecondStep ? 'step active' : 'step'}`}>
             <div>2</div>
             <div>{isThirdStep ? <Link to="/second">Step 2</Link> : 'Step 2'}</div>
           </div>
           <div className={`${pathname === '/third' ? 'step active' : 'step'}`}>
             <div>3</div>
             <div>Step 3</div>
           </div>
           <div className={`${pathname === '/fourth' ? 'step active' : 'step'}`}>
             <div>4</div>
             <div>Step 4</div>
           </div>
       </div>) : ( <div></div> )}
      </React.Fragment>
    );
  };

export default withRouter(Progress);