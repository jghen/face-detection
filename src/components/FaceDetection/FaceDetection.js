import React from "react";
import './FaceDetection.css';

const FaceDetection = ({imgUrl, dataArray}) => {

  const dataArraySliced = dataArray.slice(0,15);

  return (
    <div className="center">
      <div className="faceDetectionModal hide">
        <ul className="img-data-list">
          <li className="list-item">
            <h3 className="list-item-data">Konsept:</h3>
            <h3 className="list-item-data">Sannsynlighet:</h3>
          </li>
          {
            dataArraySliced.map((concept, i)=> {
              const conceptName = concept.name;
              const probability = concept.value * 100;
              return(
                <li className="list-item" key={concept.id}>
                  <p className="list-item-data">{i+1} {conceptName}</p>
                  <p className="list-item-data">{probability.toFixed(0)} %</p>  
                </li>
              );
            })
          }
        </ul>
        <img className="ma0 pa0" src={imgUrl} width='350px' height='auto' alt="face" />
      </div>
    </div>
  );
}

export default FaceDetection;