import React from "react";
import { MdEmail, MdAttachFile, MdFormatSize } from "react-icons/md";
import { IoMdSend } from "react-icons/io";

const EmailModal = () => {
  return (
    <div
      className="modal fade"
      id="emailModal"
      tabIndex="-1"
      aria-labelledby="emailModalLabel"
      aria-hidden="true"
      marginRight="35px"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          {/* Header */}
          <div className="modal-header" style={{ backgroundColor: "#d6f2fd" }}>
            <h5 className="modal-title" id="emailModalLabel">
              New Message
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          {/* Body */}
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control border-0 border-bottom"
                  placeholder="Recipients"
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control border-0 border-bottom"
                  placeholder="Subject"
                />
              </div>
              <div className="mb-3">
                <textarea
                  className="form-control border-0 border-bottom"
                  placeholder="Message"
                  cols="10"
                  rows="10"
                ></textarea>
              </div>
            </form>
          </div>

          {/* Footer */}
          <div className="modal-footer d-flex justify-content-between">
            <div>
              <button type="button" className="btn btn-primary me-2">
                <IoMdSend />
              </button>
              {/* Formatting Button */}
              <button type="button" className="btn btn-secondary me-2">
                <MdFormatSize />
              </button>
              {/* File Upload Button */}
              <button type="button" className="btn btn-warning me-2">
                <MdAttachFile />
              </button>
            </div>

            {/* Send Button */}
            <button type="button" className="btn btn-success">
              <MdEmail />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailModal;
