import React from "react";
import './ImageLinkForm.css';

const ImageLinkForm = ({inputChange, inputSubmit}) => {
  return (
    <div>
      <p className="gray f3 center w-70">
        {'Prøv face-detection! Maskinlærings-algoritmen kjenner igjen fjes, stemninger og "konsepter" fra bilder. Lim inn en bildelink og sjekk det ut!'}
      </p>
      <div className="center">
        <div className="form center pa4 br3 shadow-2">
          <input onChange={inputChange} placeholder="lim inn link her.." type="text" name="" id="" className="f4 bg-light-gray pa bw0 w-70 center" />
          <button onClick={inputSubmit} className="shadow-0 w-30 ba f4 link grow ph3 pv2 dib white bg-dark-gray ">Prøv!</button>
        </div>
      </div>
    </div>
  );
}

export default ImageLinkForm;