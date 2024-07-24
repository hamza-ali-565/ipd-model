import Swal from "sweetalert2";
export const SuccessAlert = ({ text, timer }) => {
  Swal.fire({
    title: "Success!",
    text: text,
    icon: "success",
    timer: timer,
  });
};

export const ErrorAlert = ({ text, timer }) => {
  Swal.fire({
    title: "Oops!",
    text: text,
    icon: "error",
    timer: timer,
    allowOutsideClick: false,
  });
};

export const AskingAlert = ({ text }) => {
  return Swal.fire({
    title: "Are you sure?",
    text: text,
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, Print it!",
  }).then((result) => {
    return result.isConfirmed;
  });
};
