import Swal from "sweetalert2";

//success message
export const successMessage = (message:any) => {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: `${message}`,
      showConfirmButton: false,
      timer: 1500,
    });
}
//error message
export const errorMessage = (message:any)=>{
  Swal.fire({
    position:"bottom-end",
    icon:"error",
    title:`${message}`,
    showConfirmButton:false,
    timer:1500,
  })
}