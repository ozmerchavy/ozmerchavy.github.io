const emailLink = document.getElementById("email-link");
const emailAddress = emailLink.getAttribute("data-address") || "ozmerchavy2@gmail.com";

const placeforemail = document.getElementById("placeforemail")

emailLink.addEventListener("click", () => {
    const clipboardItem = new ClipboardItem({ "text/plain": new Blob([emailAddress], { type: "text/plain" }) });

    navigator.clipboard.write([clipboardItem])
    .then(() => {
        placeforemail.innerText = "Copied to Clipboard: " + emailAddress
    })
    .catch(() => {
        placeforemail.innerText = "ozmerchavy2@gmail.com"
    })
    .finally(() => {
        placeforemail.style.padding = "10px"
        // scroll to bottom
        // window.scrollTo(0, document.body.scrollHeight);
    });
});

