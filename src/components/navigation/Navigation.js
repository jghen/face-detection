import React from "react";

const Navigation = ({onRouteChange, isSignedIn}) => {
  if (isSignedIn) {
    return (
      <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
        <p onClick={()=>onRouteChange('signout')} className="f3 light-gray link dim black underline pa3 pointer white-90">Logg ut</p>
      </nav>
    );
    
  } else {
    return (
        <nav style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'flex-end'}}>
          <p onClick={()=>onRouteChange('signin')} className="f3 light-gray link dim black underline ph3 pointer white-90">Logg inn</p>
          <p onClick={()=>onRouteChange('register')} className="f3 ma0 mb4 light-gray link dim black underline ph3 pointer white-90">Registrer</p>
        </nav>
    );
  } 
}

export default Navigation;