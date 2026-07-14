/**
 * contact-form.js
 * Handles async submission of the contact form via Web3Forms
 * https://web3forms.com — no server / Cloudflare Function required
 */

(function () {
  var form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    var btn     = document.getElementById('form-submit-btn');
    var success = document.getElementById('form-success');
    var errBox  = document.getElementById('form-error');
    var errMsg  = document.getElementById('form-error-msg');
    var lang    = sessionStorage.getItem('elexons_lang') || 'de';

    // -- Collect all named form fields (including hidden access_key + subject) --
    var data = Object.fromEntries(new FormData(form).entries());

    // -- Client-side validation --
    if (!data.name || !data.name.trim() || !data.email || !data.email.trim()) {
      errBox.style.display = 'block';
      errMsg.textContent = lang === 'en'
        ? ' Please fill in your name and email address.'
        : ' Bitte Name und E-Mail-Adresse ausfüllen.';
      success.style.display = 'none';
      return;
    }

    // -- Loading state --
    var origText = btn.textContent;
    btn.disabled = true;
    btn.textContent = lang === 'en' ? 'Sending…' : 'Wird gesendet…';
    success.style.display = 'none';
    errBox.style.display  = 'none';

    try {
      var response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data)
      });

      var result = await response.json();

      if (result.success) {
        // Show success, reset form
        success.style.display = 'block';
        form.reset();
        success.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      } else {
        errBox.style.display = 'block';
        errMsg.textContent = ' ' + (result.message || (lang === 'en'
          ? 'An error occurred. Please try again.'
          : 'Ein Fehler ist aufgetreten. Bitte erneut versuchen.'));
      }
    } catch {
      // Network / parse error
      errBox.style.display = 'block';
      errMsg.innerHTML = lang === 'en'
        ? ' Network error. Please write to us directly at <a href="mailto:info@elexons.com" style="color:inherit;">info@elexons.com</a>.'
        : ' Netzwerkfehler. Bitte schreiben Sie direkt an <a href="mailto:info@elexons.com" style="color:inherit;">info@elexons.com</a>.';
    } finally {
      btn.disabled = false;
      btn.textContent = origText;
    }
  });
})();
