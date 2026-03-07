document.getElementById("login-btn").addEventListener("click", function(){
    // console.log("login button clicked");
    // get username input
    const usernameInput = document.getElementById("input-username");
    const username = usernameInput.value;
    console.log(username);
    
    // get password input
    const passwordInput = document.getElementById("input-password");
    const password = passwordInput.value;
    console.log(password);
    
    // match username and password
    if(username == "admin" && password == "admin123"){
        // true > success alert > homepage
        alert("Login successfully");
        // home page loading
        window.location.assign("./home.html");
    }
    else {
        // false > confirmation alert > return
        alert("Incorrect Username or Password.");
        return;
    }

    
})