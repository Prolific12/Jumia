const email = document.getElementById("signInput");
const password = document.getElementById("password");
const cpassword = document.getElementById("cpassword");
const spaneye = document.getElementById("spaneye");
let cools;
// const type = password.getAttribute("type") === "password" ? "text" : "password";
// const ctype = cpassword.getAttribute("type") === "password" ? "text" : "password";

const create = ()=>{
    if (email.value || password.value || cpassword.value) {
        const account = {
            email: email.value,
            password: password.value,
            cpassword: cpassword.value
        }
        fetch('http://localhost:1300/accounts',{
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(account)
        }).then(()=>{
            cools = false ;
            // sessionStorage(email);
            alert("You have successfully created your account");
            console.log(account);
            // window.location.href = "account.html";
        })
    }else{
        alert("Please Input your Details");
        return
    }
}

// spaneye.addEventListener('click', function() {   
//     const type = password.getAttribute("type") === "password" ? "text" : "password";
//     password.setAttribute("type", type);
//     // toggle the icon
//     this.classList.toggle("fa-eye-slash");
//   });
// const visibility = () =>{
//     if (cpassword.type === "password") {
//         cpassword.type = "text";
//         togglePassword.classList.remove("fa-eye");
//         togglePassword.classList.add("fa-eye-slash");
//     } else{
//         cpassword.type = "password";
//         togglePassword.classList.remove("fa-eye-slash");
//         togglePassword.classList.add("fa-eye");
//     }
// } 

