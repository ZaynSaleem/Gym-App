function formValidation(e) {
  let letter = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

  // e.preventDefault()
  let username = document.getElementById("username").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let confirm_pass = document.getElementById("confirm_pass").value;
  let gender = document.getElementsByName("gender");
  let gender_value;
  let user = [];

  for (let i = 0; i < gender.length; i++) {
    if (gender[i].checked) {
      gender_value = gender[i].value;
      // return false;
    }
  }

  if (username.length <= 3) {
    Swal.fire({
      title: "Error!",
      text: "Username Should not Be Empty & Must be 4 Characters long",
      icon: "error",
      confirmButtonText: "OK",
    });
    return false;
  } else if (email.length === 0) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Email Should not be Empty!",
    });
    return false;
  } else if (password.length < 6) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Password Should not be Empty! //Length Should be greater than 6",
    });
    return false;
  } else if (!letter.test(password)) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Must have aplhanumeric characters and Numbers",
    });
    return false;
  } else if (confirm_pass != password || confirm_pass.length === 0) {
    Swal.fire({
      title: "Error!",
      text: "Confirm Password Should be Same as Password",
      icon: "error",
      confirmButtonText: "OK",
    });
    return false;
  } 
  
  else if (gender_value == null) {
    Swal.fire({
      title: "Error!",
      text: "Gender Should Be Selected",
      icon: "error",
      confirmButtonText: "OK",
    });
    return false;
  }
  
  else {
    console.log("===================");

    let userData = { 
        username, 
        email, 
        password, 
        gender_value 
    };

    user.push(userData);
    let ls = JSON.parse(localStorage.getItem("User"));


    
    if (ls && ls.length) {
      for (let i = 0; i < ls.length; i++) {
        if(ls[i].email === userData.email){
            console.log("");
            Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: 'You are already Registered !!',
                footer: '<a href="login.html">Want to Login?</a>'
              })
            
            return false;

        }   
    }
      let conc = ls.concat(user);
      localStorage.setItem("User", JSON.stringify(conc));

    } else {
      
      localStorage.setItem("User", JSON.stringify(user));
    }

    window.location.href = "login.html";
  }

  //  alert(email + username + password + gender);
}

function formLogin(){

let login_username = document.getElementById('login_username').value;
let login_pass = document.getElementById('login_password').value;

let local = JSON.parse(localStorage.getItem('User'));



if(login_username === ""){
  Swal.fire({
    title: "Error!",
    text: "Username Should not Be Empty",
    icon: "error",
    confirmButtonText: "OK",
  });
  return false;
}
else if(login_pass === ""){
  Swal.fire({
    title: "Error!",
    text: "Password Should not Be Empty",
    icon: "error",
    confirmButtonText: "OK",
  });
  return false;
}



if(local || local.length){
  for (let i = 0; i < local.length; i++) {
    if(local[i].email === login_username){
 
      if(local[i].password === login_pass){ 
        window.location.href = "Home.html";
      }
      else{
        Swal.fire({
          title: "Error!",
          text: "Incorrect Email Or Password",
          icon: "error",
          confirmButtonText: "OK",
        });
        return false;
      }
    }
    else{
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'You are not Registered User!!',
        footer: '<a href="index.html">Want to Sign-up?</a>'
      });
    }

    
  }
}


}
