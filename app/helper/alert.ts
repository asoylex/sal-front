import Swal from "sweetalert2";

export const successAlert = (message: string) => {
  return Swal.fire({
    title: "Éxito",
    text: message,
    icon: "success",
    confirmButtonText: "OK",
    confirmButtonColor: "#00a63e",
  });
};

export const errorAlert = (message: string) => {
  return Swal.fire({
    title: "Error",
    text: message,
    icon: "error",
    confirmButtonText: "Cerrar",

    confirmButtonColor: "#00a63e",
  });
};

export const warningAlert = (message: string) => {
  return Swal.fire({
    title: "Advertencia",
    text: message,
    icon: "warning",
    confirmButtonText: "Entendido",
    confirmButtonColor: "#00a63e",
  });
};
