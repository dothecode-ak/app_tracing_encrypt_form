 
import trackData from "./track";
//button tracking
$("#button1").on("click", function () {
  let dataObj = { saveType: "start" };
  trackData(dataObj);
});

//form data tracking
$("#button2").on("click", function () {
  const username = String(document.getElementById("username").value);
  const password = String(document.getElementById("password").value);
  const resetID = document.getElementById("myForm");
  let dataObj = {
    saveType: "userData",
    username: username,
    password: password,
  };
  trackData(dataObj);
  resetID.reset();
});
