// The booking form hands the enquiry to web3forms, which mails it on. Posting it here rather
// than letting the form navigate keeps the visitor on the page, where the answer is written
// underneath the button.

const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';
const FALLBACK_ADDRESS = 'ozmerchavy2@gmail.com';

document.querySelectorAll('.booking-form').forEach((form) => {
  const status = form.querySelector('.form-status');
  const button = form.querySelector('.submit-button');
  const buttonLabel = button.querySelector('.label');

  function say(text, kind) {
    status.textContent = text;
    status.className = 'form-status' + (kind ? ' ' + kind : '');
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (button.disabled) return; // a second click while the first send is in the air


    button.disabled = true;
    buttonLabel.textContent = 'Sending\u2026';
    say('');

    try {
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok || !result.success) throw new Error(result.message || 'send failed');

      form.reset();
      say('Thank you, your message is on its way. Oz will get back to you shortly.', 'success');
    } catch {
      say('That did not go through. Please email ' + FALLBACK_ADDRESS + ' instead.', 'error');
    } finally {
      // a token is only good for the one send, spent or not
      button.disabled = false;
      buttonLabel.textContent = 'Send';
    }
  });
});
