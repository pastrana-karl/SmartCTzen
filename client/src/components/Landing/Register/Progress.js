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
             <div>1</div>
             <div>
               {isSecondStep || isThirdStep || isFourthStep || isFifthStep || isSixthStep || isSeventhStep? (
                 <Link to="/Register">Step 1</Link>
               ) : (
                 'Step 1'
               )}
             </div>
           </div>
           <div className={`${isSecondStep ? 'step active' : 'step'}`}>
             <div>2</div>
             <div>{isThirdStep || isFourthStep || isFifthStep  || isSixthStep || isSeventhStep ? <Link to="/second">Step 2</Link> : 'Step 2'}</div>
           </div>
           <div className={`${pathname === '/third' ? 'step active' : 'step'}`}>
             <div>3</div>
             <div>{isFourthStep || isFifthStep || isSixthStep || isSeventhStep ? <Link to="/third">Step 3</Link> : 'Step 3'}</div>
           </div>
           <div className={`${pathname === '/fourth' ? 'step active' : 'step'}`}>
             <div>4</div>
             <div>{isFifthStep || isSixthStep || isSeventhStep ? <Link to="/fourth">Step 4</Link> : 'Step 4'}</div>
           </div>
           <div className={`${pathname === '/fifth' ? 'step active' : 'step'}`}>
             <div>5</div>
             <div>{isSixthStep || isSeventhStep ? <Link to="/fifth">Step 5</Link> : 'Step 5'}</div>
           </div>
           <div className={`${pathname === '/sixth' ? 'step active' : 'step'}`}>
             <div>6</div>
             <div>{isSeventhStep ? <Link to="/sixth">Step 6</Link> : 'Step 6'}</div>
           </div>
           <div className={`${pathname === '/seventh' ? 'step active' : 'step'}`}>
              <div>7</div>
              <div>Step 7</div>
            </div>
       </div>) : ( <div></div> )}
      </React.Fragment>
    );
  };

export default withRouter(Progress);