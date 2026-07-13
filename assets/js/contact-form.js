/**
 * contact-form.js
 * Handles async submission of the contact form on kontakt.html
 * POSTs JSON to /api/contact (Cloudflare Pages Function)
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

    // -- Collect all named form fields into a plain object --
    var data = {};
    new FormData(form).forEach(function (val, key) { data[key] = val; });

    // -- Client-side validation (required fields) --
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
      var response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      var result = await response.json();

      if (result.ok) {
        // Show success, clear form
        success.style.display = 'block';
        form.reset();
        success.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      } else {
        // Show server-side error message
        errBox.style.display = 'block';
        errMsg.textContent = ' ' + (result.error || (lang === 'en'
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
