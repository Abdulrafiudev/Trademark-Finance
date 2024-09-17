const form = document.querySelector(".form-contact")
form.addEventListener("submit", (event) => {
  event.preventDefault()
  $(function(){
    toastr.success("Email sent successfully")
  })
})