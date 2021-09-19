import React from "react";
import "./styles.css";

export default function DeleteConfirmModal(props) {
  return (
    <div id="myModal" class="modal" style={{ display: props.display }}>
      <div class="modal-content">
        <div class="modal-body">
          <p className="delete_confirm">
            Are you sure you want to delete your friend ?
          </p>
          <button
            onClick={() => {
              props.deleteFriend();
            }}
          >
            Yes
          </button>
          <button
            onClick={() => {
              props.closeModal();
            }}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}
