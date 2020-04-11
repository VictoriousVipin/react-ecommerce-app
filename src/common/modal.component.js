import ReactDOM from "react-dom";

function Modal(props) {
  return ReactDOM.createPortal(props.JSX_MODAL, document.querySelector("#modal"));
}


export default Modal;