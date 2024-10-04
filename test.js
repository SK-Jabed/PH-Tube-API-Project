// const isVerified = "";

// if (isVerified === true) {
//   console.log("user is verified");
// } else {
//   console.log("user is not  verified");
// }
// console.log(
//   `${isVerified === true ? "user is verified" : "user is not  verified"}`
// );


// function getTimeString(time) {
    // Get Hour and Rest Seconds 
//     const hour = parseInt(time / 3600);
//     let remainingSeconds = time % 3600;
//     const minute = parseInt(remainingSeconds / 60);
//     remainingSeconds = remainingSeconds % 60;
//     return `${hour} hour ${minute} minute ${remainingSeconds} seconds ago`;
// }

// console.log(getTimeString(45433));


function getTimeString(time) {
    // Get Hour, Minute and Seconds 
    const hour = parseInt(time / 3600);
    let remainingSeconds = time % 3600;
    const minute = parseInt(remainingSeconds / 60);
    remainingSeconds = remainingSeconds % 60;

    return `${hour} hour ${minute} minute ${remainingSeconds} seconds ago`
}

console.log(getTimeString(180));