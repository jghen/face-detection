import React from "react";


const Rank = ({name, entries}) => {
  return (
    <div>
      <div className="white f3 ma2 mt6">
        <p className="mt0 w-70 center">{`Hei ${name}, så mange bilder har du prøvd:`}</p>
      </div>
      <div className="white f1">
        {entries}
      </div>
    </div>
  );
}

export default Rank;