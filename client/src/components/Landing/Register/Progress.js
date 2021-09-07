import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const Progress = ({ location: { pathname } }) => {
    const isRegisterStep = pathname === '/create-account';
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
                    <div><Link to="/create-account">1</Link></div>
                  ) : (
                    <div><p>1</p></div>
                  )}
              </div>
              <div className={`${isSecondStep ? 'step active' : 'step'}`}>
                {isThirdStep || isFourthStep || isFifthStep  || isSixthStep || isSeventhStep ? <div><Link to="/second">2</Link></div> : <div><p>2</p></div>}
              </div>
              <div className={`${pathname === '/third' ? 'step active' : 'step'}`}>
                {isFourthStep || isFifthStep || isSixthStep || isSeventhStep ? <div><Link to="/third">3</Link></div> : <div><p>3</p></div>}
              </div>
              <div className={`${pathname === '/fourth' ? 'step active' : 'step'}`}>
                {isFifthStep || isSixthStep || isSeventhStep ? <div><Link to="/fourth">4</Link></div> : <div><p>4</p></div>}
              </div>
              <div className={`${pathname === '/fifth' ? 'step active' : 'step'}`}>
                {isSixthStep || isSeventhStep ? <div><Link to="/fifth">5</Link></div> : <div><p>5</p></div>}
              </div>
              <div className={`${pathname === '/sixth' ? 'step active' : 'step'}`}>
                {isSeventhStep ? <div><Link to="/sixth">6</Link></div> : <div><p>6</p></div>}
              </div>
              <div className={`${pathname === '/seventh' ? 'step active' : 'step'}`}>
                  <div><p>7</p></div>
                  <div></div>
              </div>
            </div>) : ( <></> )}
      </React.Fragment>
    );
};

export default withRouter(Progress);