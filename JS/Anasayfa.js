// Dropdown Menu Start
let dropMenu = document.getElementById("dropMenu");
function toogleMenu() {
  dropMenu.classList.toggle("open-menu");
}
//Dropdown Menu End
//SideBar Start
let btn = document.querySelector("#btn");
let sidebar = document.querySelector(".sidebar");
//SideBar End
btn.onclick = function () {
  sidebar.classList.toggle("active");
};
// Tweet Start
const tweet = document.querySelector(".tweet"),
  editableInput = tweet.querySelector(".editable"),
  readonlyInput = tweet.querySelector(".readonly"),
  placeholder = tweet.querySelector(".placeholder"),
  counter = tweet.querySelector(".counter"),
  button = tweet.querySelector("button");

editableInput.onkeyup = (e) => {
  let element = e.target;
  validated(element);
};
editableInput.onkeypress = (e) => {
  let element = e.target;
  validated(element);
  placeholder.style.display = "none";
};
function validated(element) {
  let text;
  let maxLength = 60;
  let currentlength = element.innerText.length;
  if (currentlength <= 0) {
    placeholder.style.display = "block";
    counter.style.display = "none";
    button.classList.remove("active");
  } else {
    placeholder.style.display = "none";
    counter.style.display = "block";
    button.classList.add("active");
  }
  counter.innerText = maxLength - currentlength;
  if (currentlength > maxLength) {
    let overText = element.innerText.substr(maxLength); //extracting over texts
    overText = `<span class="highlight">${overText}</span>`; //creating new span and passing over texts
    text = element.innerText.substr(0, maxLength) + overText; //passing overText value in textTag variable
    readonlyInput.style.zIndex = "1";
    counter.style.color = "#e0245e";
    button.classList.remove("active");
  } else {
    readonlyInput.style.zIndex = "-1";
    counter.style.color = "#333";
  }
  readonlyInput.innerHTML = text; //replacing innerHTML of readonly div with textTag value
}
// Tweet End
// Tweet-Dropdown Start Start
function selectItem(item) {
  document.getElementById("selectedItem").innerText = item;
}
// Tweet-Dropdown End Start
// Content-Content Start

document.getElementById("clicker1").addEventListener("click", function () {
  this.classList.toggle("active");
});
document.getElementById("clicker2").addEventListener("click", function () {
  this.classList.toggle("active");
});

// Content-content End

// Date Picker Functionality
const datePickerButton = document.getElementById("date-picker-button");
const datePicker = document.getElementById("date-picker");

datePickerButton.addEventListener("click", () => {
  datePicker.style.display = "block";
  datePicker.focus();
});

datePicker.addEventListener("blur", () => {
  datePicker.style.display = "none";
});

// Disable dates before today in date picker
const today = new Date();
const year = today.getFullYear();
let month = today.getMonth() + 1;
let day = today.getDate();

// Add leading zero to month and day if needed
if (month < 10) {
  month = "0" + month;
}
if (day < 10) {
  day = "0" + day;
}

const minDate = `${year}-${month}-${day}`;
datePicker.min = minDate;
