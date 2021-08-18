import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const Progress = ({ location: { pathname } }) => {
    const isFirstStep = pathname === '/first';
    const isSecondStep = pathname === '/second';
    const isThirdStep = pathname === '/third';
  
    return (
      <React.Fragment>
        {isFirstStep || isSecondStep ? ( 
           <div className="steps">
           <div className={`${isFirstStep ? 'step active' : 'step'}`}>
             <div>1</div>
             <div>
               {isSecondStep || isThirdStep ? (
                 <Link to="/first">Step 1</Link>
               ) : (
                 'Step 1'
               )}
             </div>
           </div>
           <div className={`${isSecondStep ? 'step active' : 'step'}`}>
             <div>2</div>
             <div>{isThirdStep ? <Link to="/second">Step 2</Link> : 'Step 2'}</div>
           </div>
           {/* <div className={`${pathname === '/third' ? 'step active' : 'step'}`}>
             <div>3</div>
             <div>Step 3</div>
           </div> */}
       </div>) : ( <div></div> )}
      </React.Fragment>
    );
  };

export default withRouter(Progress);