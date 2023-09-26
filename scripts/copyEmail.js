const emailLink = document.getElementById("email-link");

const placeforemail = document.getElementById("placeforemail")
// Define the email address
const emailAddress = emailLink.getAttribute("data-address") || "gmail@gmail.com";

// Add a click event listener to the email link
emailLink.addEventListener("click", function (event) {
    placeforemail.innerText = "Email address copied to clipboard: " + emailAddress
    placeforemail.style.padding = "5px"
    const clipboardItem = new ClipboardItem({ "text/plain": new Blob([emailAddress], { type: "text/plain" }) });

    // Write the clipboard item to the clipboard
    navigator.clipboard.write([clipboardItem]).then(function () {
        // Provide feedback to the user
    }).catch(function (error) {
        // Handle any errors that may occur
        console.error("Error copying to clipboard:", error);
    });

});

