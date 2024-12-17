import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState } from "react";
// givenName: "John Doe",
// familyName: "vegeta doe",
// email: "john.doe@example.com",
// password: "password123",
// role: "father",
const Modal = ({ givenName, familyName, email, password,role, closeModal }) => {
  return (
    <div className="modal">
      <Dialog open={true} onClose={closeModal} className="relative z-50">
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="max-w-lg space-y-4 border bg-white p-12">
            <DialogTitle className="font-bold">{givenName}</DialogTitle>
         
            <p>{email}</p>
            <p>{password}</p>
            <p>{role}</p>
            <p>{givenName}</p>
            <p>{familyName}</p>
           
            <div className="flex gap-4">
              <button onClick={closeModal}>Close</button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
};

export default Modal;
