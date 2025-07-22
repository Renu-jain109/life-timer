let isDobOpen = false;
var dateOfBirth;

let settingCogEl = document.getElementById("settingIcon");
let settingsContentEl = document.getElementById("settingsContent");
let initialTextEl = document.getElementById("initialText");
let afterDobBtnTextEl = document.getElementById("afterDobBtnText");
let dobInputEl = document.getElementById("dobInput");
let buttonEl = document.getElementById("btn");

let yearEl = document.querySelector(".year");
let monthEl = document.querySelector(".month");
let dayEl = document.querySelector(".day");
let hourEl = document.querySelector(".hour");
let minuteEl = document.querySelector(".minute");
let secondEl = document.querySelector(".second");

let makeTwoDigitNumber = (number) => {
    return number > 9 ? number : `0${number}`;
}


let toggleDateOfBirthSelector = () => {
    if(isDobOpen){
        settingsContentEl.classList.add("hide");
    } else {
        settingsContentEl.classList.remove("hide");
    }
    isDobOpen = !isDobOpen;
}


let updateAge = () => {

    if (!dateOfBirth) return;

    let currentDate = new Date();
    let dateDiff = currentDate - dateOfBirth;

    // let year = Math.floor(dateDiff / (1000 * 60 * 60 * 24 * 365));
    // let month = Math.floor((dateDiff / (1000 * 60 * 60 * 24 * 365))% 12);
    // let day = Math.floor(dateDiff / (1000 * 60 * 60 * 24))% 30;
    // let hour = Math.floor(dateDiff / (1000 * 60 * 60))% 24;
    // let minute = Math.floor(dateDiff / (1000 * 60))% 60;
    // let second = Math.floor(dateDiff / (1000))% 60;


    let year = Math.floor(dateDiff / (1000 * 60 * 60 * 24 * 365.25)); 
    let month = Math.floor((dateDiff % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24 * 30.44));
    let day = Math.floor((dateDiff % (1000 * 60 * 60 * 24 * 30.44)) / (1000 * 60 * 60 * 24));
    let hour = Math.floor((dateDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minute = Math.floor((dateDiff % (1000 * 60 * 60)) / (1000 * 60));
    let second = Math.floor((dateDiff % (1000)) / 1000);


    yearEl.innerHTML = makeTwoDigitNumber(year);
    monthEl.innerHTML = makeTwoDigitNumber(month);
    dayEl.innerHTML = makeTwoDigitNumber(day);
    hourEl.innerHTML = makeTwoDigitNumber(hour);
    minuteEl.innerHTML = makeTwoDigitNumber(minute);
    secondEl.innerHTML = makeTwoDigitNumber(second);  
};

const localStorageGetter = () => {
    const year = localStorage.getItem("year");
    const month = localStorage.getItem("month");
    const date = localStorage.getItem("date");
    if (year && month && date) {
      dateOfBirth = new Date(year, month, date);
    }  
    updateAge();
  };

const contentToggler = () => {
    updateAge();
    if (dateOfBirth) {
      initialTextEl.classList.add("hide");
      afterDobBtnTextEl.classList.remove("hide");
    } else {
        afterDobBtnTextEl.classList.add("hide");
      initialTextEl.classList.remove("hide");
    }
  };


let setDOBHandler = () => {
    let dateString = dobInputEl.value;
    dateOfBirth =  dateString ? new Date(dateString) : null;

    if(dateOfBirth){
        localStorage.setItem("year",dateOfBirth.getFullYear());
        localStorage.setItem("month", dateOfBirth.getMonth());
        localStorage.setItem("date", dateOfBirth.getDate());
console.log(dateOfBirth);
};
contentToggler();
setInterval(updateAge, 1000);

};

localStorageGetter();
contentToggler();

settingCogEl.addEventListener("click",toggleDateOfBirthSelector);
buttonEl.addEventListener("click",setDOBHandler,updateAge);







// // buttonClick.addEventListener("click",() => {
// //     let div = document.querySelector(".container");

// //     let dob = new Date(dateInput.value);
// //     let now = new Date;
// //     let diff = now-dob;

// // let seconds = Math.floor(diff/1000);
// // let minutes = Math.floor(seconds/60);
// // let hours = Math.floor(minutes/60);
// // let days = Math.floor(hours/24);

// // //     console.log(seconds,minutes,hours,days)
// //     let years = now.getFullYear() - dob.getFullYear();
// //     let months = now.getMonth() - dob.getMonth();

// // if(months < 0) {
// //         years--;
// //         months += 12;
// //     }

// //     let dobDate = new Date(dob.getFullYear(),dob.getMonth(), dob.getDate());

// // // console.log(dobDate);

// //     let correctDiff = now - dobDate;
// //     let correctDays = Math.floor(correctDiff / (1000 * 60 * 60 * 24));
// //     let correctHours = Math.floor((correctDiff %(1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
// //     let correctMinutes = Math.floor((correctDiff % (1000 * 60 * 60)) / (1000 * 60));
// //     let correctSeconds = Math.floor((correctDiff % (1000 * 60))/1000);

// //     // let result = `
// //     //     <div>
// //     //         <span>${years}</span>
// //     //         <span>Years</span>
// //     //     </div>
// //     //     <div>
// //     //         <span>${months}</span>
// //     //         <span>Months</span>
// //     //     </div>
// //     //     <div>
// //     //         <span>${correctDays}</span>
// //     //         <span>Days</span>
// //     //     </div>
// //     //     <div>
// //     //         <span>${correctHours}</span>
// //     //         <span>Hours</span>
// //     //     </div>
// //     //     <div>
// //     //         <span>${correctMinutes}</span>
// //     //         <span>Minutes</span>
// //     //     </div>
// //     //     <div>
// //     //         <span>${correctSeconds}</span>
// //     //         <span>Seconds</span>
// //     //     </div>
// //     // `;
// //     let result = `
// //         <p style = "font-size:25px; text-weight:bold";>
// //             ${years} ${months} ${correctDays} ${correctHours} ${correctMinutes} ${correctSeconds}
// //         </p>
// //         <p style = "font-size:25px; text-weight:bold";>
// //             Years Months Days Hours Minutes Seconds
// //         </p>
// //     `;

// //     // let result = `<p>${years} ${months} ${correctDays} ${correctHours} ${correctMinutes} ${correctSecond}</p> `
// //     // console.log(result);
    
// //    let resultDiv = document.querySelector(".result")
// //    let heading = document.querySelector("h1");
// //    let createHead = document.createElement("h1");
// //    div.appendChild(createHead)

// //    createHead.textContent = `How Much Life Journey Covered,Till Now`
// //    resultDiv.innerHTML = result;

// //    heading.replaceWith(createHead);

    
// // })









