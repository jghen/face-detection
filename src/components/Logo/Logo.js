import React from "react";
import Tilt from 'react-parallax-tilt';
import face from './face-detection.png';
import './Logo.css';

const Logo = () => {
  return (
    <div className="ma4 logo-wrapper">
      <Tilt tiltMaxAngleX={40} tiltMaxAngleY={40} className="tilt br2 shadow-4" style={{ height: '100px', width:'100px'}}>
        <div className="pa3">
          <img src={face} alt="face-detection" style={{paddingTop: '2px'}}/>
       </div>
      </Tilt>
    </div>
  );
}

export default Logo;