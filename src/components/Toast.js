/* eslint-disable no-unused-expressions */
import React, { useContext } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GlobalContext } from "Store/GlobalState";

toast.configure();

// if toastMsg is not empty then only run notify function and after notify function run resetError function for make toastMsg again null

function Toast() {
  const { toastMsg, resetToast, toastType } = useContext(GlobalContext);
  const notify = () => {
    if (toastType === "success") toast.success(toastMsg, { toastId: "success" });
    else toast.error(toastMsg, { toastId: "error" });
    resetToast();
  };
  toastMsg !== "" ? notify() : <></>;
  return <></>;
}

export default Toast;
