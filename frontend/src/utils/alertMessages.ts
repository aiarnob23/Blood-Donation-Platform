import Swal from "sweetalert2";

export const successMessage = (message: any) => {
    Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: `${message}`,
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true
    });
}
//error message
export const errorMessage = (message:any)=>{
  Swal.fire({
    toast:true,
    position:"bottom-end",
    icon:"error",
    title:`${message}`,
    showConfirmButton:false,
    timer:1500,
  })
}