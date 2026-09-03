document.querySelectorAll('.email-link').forEach((emailLink) => {
  const emailAddress = emailLink.dataset.address;
  const placeForEmail = emailLink.closest('.contact').querySelector('.my-email');

  emailLink.addEventListener('click', () => {
    const clipboardItem = new ClipboardItem({ "text/plain": new Blob([emailAddress], { type: "text/plain" }) });

    navigator.clipboard.write([clipboardItem])
      .then(() => {
        placeForEmail.innerText = "Copied to Clipboard: " + emailAddress
      })
      .catch(() => {
        placeForEmail.innerText = emailAddress
      })
      .finally(() => {
        placeForEmail.style.padding = "10px 20px"
      });
  });
});
