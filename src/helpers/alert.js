import Swal from "sweetalert2";

export const createAlert = ({ title, icon = "error", position = "center" }) => {
  Swal.fire({
    position: position,
    icon: icon,
    title: title,
    showConfirmButton: false,
    timer: 1500,
  });
};
