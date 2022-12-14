import React from "react";

const Navigation = ({onRouteChange, isSignedIn, route}) => {
  if (isSignedIn) {
    return (
      <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
        <p onClick={()=>onRouteChange('signout')} className="f3 mt-0 light-gray link dim black underline pa2 pointer white-90">Logg ut</p>
      </nav>
    ); 
  } else if (!isSignedIn && (route === 'signin' || route === 'signout')) {
    return (
      <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
          <p onClick={()=>onRouteChange('register')} className="f3 mt-0 light-gray link dim black underline ph2 pointer white-90">Registrer</p>
        </nav>
    );
  } else {
    return (
      <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
          <p onClick={()=>onRouteChange('signin')} className="f3 mt-0 light-gray link dim black underline ph2 pointer white-90">Logg inn</p>
        </nav>
    );
  }
}

export default Navigation;