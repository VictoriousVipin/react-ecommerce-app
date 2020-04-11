import React from "react";
import ReactDOM from "react-dom";

function Loader() {
  return ReactDOM.createPortal(<div className="my-loader">
      <div className="loader-image">
        <img src="../images/loader.gif"/>
      </div>
  </div>, document.querySelector("#loader"));
}


export default Loader;