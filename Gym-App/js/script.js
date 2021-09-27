var globalId = null;

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
  } else if (gender_value == null) {
    Swal.fire({
      title: "Error!",
      text: "Gender Should Be Selected",
      icon: "error",
      confirmButtonText: "OK",
    });
    return false;
  } else {
    console.log("===================");

    let userData = {
      username,
      email,
      password,
      gender_value,
    };

    user.push(userData);
    let ls = JSON.parse(localStorage.getItem("User"));

    if (ls && ls.length) {
      for (let i = 0; i < ls.length; i++) {
        if (ls[i].email === userData.email) {
          console.log("");
          Swal.fire({
            icon: "warning",
            title: "Oops...",
            text: "You are already Registered !!",
            footer: '<a href="login.html">Want to Login?</a>',
          });

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

function formLogin() {
  let login_username = document.getElementById("login_username").value;
  let login_pass = document.getElementById("login_password").value;

  let local = JSON.parse(localStorage.getItem("User"));

  if (login_username === "") {
    Swal.fire({
      title: "Error!",
      text: "Username Should not Be Empty",
      icon: "error",
      confirmButtonText: "OK",
    });
    return false;
  } else if (login_pass === "") {
    Swal.fire({
      title: "Error!",
      text: "Password Should not Be Empty",
      icon: "error",
      confirmButtonText: "OK",
    });
    return false;
  }

  if (local || local.length) {
    for (let i = 0; i < local.length; i++) {
      if (local[i].email === login_username) {
        if (local[i].password === login_pass) {
          window.location.href = "Home.html";
          localStorage.setItem("email", JSON.stringify(local[i].email));
        } else {
          Swal.fire({
            title: "Error!",
            text: "Incorrect Email Or Password",
            icon: "error",
            confirmButtonText: "OK",
          });
          return false;
        }
      } else {
        Swal.fire({
          icon: "warning",
          title: "Oops...",
          text: "You are not Registered User!!",
          footer: '<a href="index.html">Want to Sign-up?</a>',
        });
      }
    }
  }
}


  


function addExercise() {
  let arr = [];
  let value_text = document.getElementById("addExerciseForm").value;
  let current_email = JSON.parse(localStorage.getItem("email"));
  let timer = "";
  let rest = "";
  let exercise = {
    id: Math.floor(Math.random() * 100),
    value_text,
    current_email,
    timer,
    rest,
  };

  // let table = document.getElementById("table");
  // let row = table.insertRow();

  // let r1 = row.insertCell();
  // let r2 = row.insertCell();

  arr.push(exercise);

  let get = JSON.parse(localStorage.getItem("Exercise"));

  if (value_text === "") {
    Swal.fire({
      position: "top-end",
      icon: "error",
      title: "Exercise Wont be Empty",
      showConfirmButton: false,
      timer: 1500,
    });
    return false;
  }

  // console.log(get)
  if (get && get.length) {
    for (let i = 0; i < get.length; i++) {
      if (
        get[i].value_text === exercise.value_text &&
        current_email === exercise.current_email
      ) {
        alert("Exercise Already Added !");
        return;
      }
    }
    let combine = get.concat(arr);
    localStorage.setItem("Exercise", JSON.stringify(combine));
    // createTable();
  } else {
    let local = localStorage.setItem("Exercise", JSON.stringify(arr));

    // for (let j = 0; j < arr.length; j++) {
    //   r1.innerHTML = arr[j].value_text;
    //   r2.innerHTML = "<input type='button' value='ADD' id='addBtn' class='addBtn'> <input type='button' value='DELETE' id='dltBtn' class='dltBtn'>";

    // }
  }
  createTable();
}

function redirect() {
  window.location.href = "addExercise.html";
}

function addTimer() {
  let input = document.getElementById("addTimerForm").value;
  let id = JSON.parse(localStorage.getItem("storeId"));
  let get = JSON.parse(localStorage.getItem("Exercise"));
  let checkBox = document.getElementById("checkedValue");
  let rest_time = document.getElementById("restForm").value;
  if (input == "") {
    alert("Exercise Time Won't be empty");
    return false;
  }
  if (checkBox.checked == true && rest_time == "") {
    alert("Rest Timer Won't be empty");
  } else {
    let index = get.findIndex((x) => x.id === id);
    console.log(index);
    console.log(get[index].timer);
    get[index].timer = input;

    localStorage.setItem("Exercise", JSON.stringify(get));
    //  let redirect = window.location.href = "addExercise.html";
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Timer Updated",
      showConfirmButton: false,
      timer: 1500,
    });
    setTimeout(redirect, 2000);
    restTime();
  }
}

function restchecked() {
  let checkBox = document.getElementById("checkedValue");
  let input = document.getElementById("restForm");
  let btn = document.getElementById("btn-rest");
  if (checkBox.checked == true) {
    input.style.display = "block";
    btn.style.display = "block";
  } else {
    btn.style.display = "none";
    input.style.display = "none";
  }
}

function restTime() {
  let input = document.getElementById("restForm").value;
  let id = JSON.parse(localStorage.getItem("storeId"));
  let get = JSON.parse(localStorage.getItem("Exercise"));

  let index = get.findIndex((x) => x.id === id);

  get[index].rest = input;

  localStorage.setItem("Exercise", JSON.stringify(get));
  // Swal.fire({
  //   position: 'top-end',
  //   icon: 'success',
  //   title: 'Timer Updated',
  //   showConfirmButton: false,
  //   timer: 1500,

  // })
  // setTimeout(redirect,2000);
  // console.log(input);
}

function deletedArr(s) {
  let updatedList = JSON.parse(localStorage.getItem("Exercise"));
  let selected = JSON.parse(localStorage.getItem("selectedExercise"));


  if (updatedList && updatedList.length) {
    let filteredData = updatedList.filter((item) => {
      return s.id !== item.id
      
    })
 
    localStorage.setItem("Exercise", JSON.stringify(filteredData));
  }

  if (selected && selected.length) {
    let selectedData = selected.filter((data) =>  {

      return s.id !== data.id;

    })
    localStorage.setItem("selectedExercise", JSON.stringify(selectedData));

  }

  createTable();


}

function onCheck(id) {
  // let updatedList = JSON.parse(localStorage.getItem("Exercise"));
  console.log(id);
}

function startExercise() {
  let get = JSON.parse(localStorage.getItem("Exercise"));


  let exercise_id = JSON.parse(localStorage.getItem("selectedExercise"));
  if (exercise_id && exercise_id.length) {
    
    for (let i = 0; i < exercise_id.length; i++) {
      
      let filt =  get.filter((x) =>x.id === exercise_id[i].id);
      filt.map((y)=>console.log("Exercise Time : "+y.timer,y.value_text));
    }
    
    window.location.href = "customExercise.html";
  }
  else{
    if (get && get.length) {
      
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "PLEASE SELECT EXERCISE !!",
        showConfirmButton: false,
        timer: 1500,
      });
      return false;

    }
    else{
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "PLEASE ADD EXERCISE FIRST ",
        showConfirmButton: false,
        timer: 1500,
      });
      return false;
      
    }
  }
}






// customCountdown();



