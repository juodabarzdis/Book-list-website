import React, { useEffect, useRef, useCallback } from "react";
import "./Modal.css";

const Modal = ({ showModal, setShowModal, data }) => {
  const modalRef = useRef();

  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      setShowModal(false);
    }
  };

  return (
    <>
      {showModal ? (
        <div className="modal-wrapper" ref={modalRef} onClick={closeModal}>
          <div className="modal">
            <div className="modal-left">
              <div className="modal-img-container">
                <img src={data.image} alt="" />
              </div>
            </div>
            <div className="modal-right">
              <div
                onClick={() => setShowModal((prev) => !prev)}
                className="modal-exit"
              >
                X
              </div>
              <div className="modal-content">
                <div className="modal-title">
                  <h3>{data.title}</h3>
                  <h6>{data.author}</h6>
                </div>
                <p>{data.description}</p>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Modal;
