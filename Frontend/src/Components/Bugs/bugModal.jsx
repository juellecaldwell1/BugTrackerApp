import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState } from "react";

const BugModal = ({
  title,
  description,
  reproduce,
  classification,
  assignedToUserId,
  assignedToUserName,
  closed,
  closeModal,
}) => {
  return (
    <div className="modal">
      <Dialog open={true} onClose={closeModal} className="relative z-50">
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="max-w-lg space-y-4 border bg-white p-12">
            <DialogTitle className="font-bold">{title}</DialogTitle>

            <p>{title}</p>
            <p>{description}</p>
            <p>{reproduce}</p>
            <p>{classification}</p>
            <p>{assignedToUserId}</p>
            <p>{assignedToUserName}</p>
            <p>{closed}</p>
            <div className="flex gap-4">
              <button onClick={closeModal}>Close</button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
};

export default BugModal;
