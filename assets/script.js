(function(){
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  const form = document.getElementById('order-form');
  const msg = document.getElementById('form-msg');
  const submitBtn = document.getElementById('submit-btn');
  const endpoint = form && typeof form.getAttribute === 'function' ? (form.getAttribute('data-endpoint') || '').trim() : '';

  function setMsg(text, ok) {
    if (!msg) return;
    msg.textContent = text;
    msg.classList.remove('form__msg--ok', 'form__msg--err');
    msg.classList.add(ok ? 'form__msg--ok' : 'form__msg--err');
  }

  function isValidMoroccoPhone(value) {
    if (!value) return false;
    const v = value.replace(/\s|-/g, '');
    // Accept: 0XXXXXXXXX (10 digits starting with 0), +212XXXXXXXXX (country code)
    const local = /^0[5-7][0-9]{8}$/; // common mobile prefixes 05/06/07
    const intl = /^\+212[5-7][0-9]{8}$/;
    return local.test(v) || intl.test(v);
  }

  function serializeForm(formEl) {
    const data = new FormData(formEl);
    return {
      name: (data.get('name') || '').toString().trim(),
      city: (data.get('city') || '').toString().trim(),
      phone: (data.get('phone') || '').toString().trim()
    };
  }

  async function postWithTimeout(url, options, timeoutMs = 10000) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const res = await fetch(url, { ...options, signal: controller.signal });
      clearTimeout(timer);
      return res;
    } catch (e) {
      clearTimeout(timer);
      throw e;
    }
  }

  if (form && submitBtn) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const { name, city, phone } = serializeForm(form);
      const honeypot = (new FormData(form).get('website') || '').toString().trim();

      if (!name || name.length < 3) {
        setMsg('Veuillez saisir votre nom complet.', false);
        return;
      }
      if (!city || city.length < 2) {
        setMsg('Veuillez saisir votre ville.', false);
        return;
      }
      if (!isValidMoroccoPhone(phone)) {
        setMsg('Numéro de téléphone marocain invalide. Exemple: 06 12 34 56 78', false);
        return;
      }

      // If honeypot is filled, pretend success without sending
      if (honeypot) {
        setMsg('Merci ! Votre commande est bien reçue. Nous vous appellerons pour confirmer.', true);
        try {
          sessionStorage.setItem('order', JSON.stringify({ name, city, phone }));
        } catch(_) {}
        form.reset();
        return;
      }

      submitBtn.disabled = true;
      submitBtn.textContent = 'Envoi...';
      setMsg('', true);

      try {
        const urlParams = new URLSearchParams(window.location.search);
        const payload = {
          product: 'Lunettes intelligentes',
          price: 249,
          currency: 'MAD',
          name, city, phone,
          utm_source: urlParams.get('utm_source') || '',
          utm_medium: urlParams.get('utm_medium') || '',
          utm_campaign: urlParams.get('utm_campaign') || '',
          referrer: document.referrer || '',
          page: window.location.href,
          createdAt: new Date().toISOString()
        };

        if (endpoint) {
          const res = await postWithTimeout(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          }, 12000);
          if (!res.ok) throw new Error('Bad response: ' + res.status);
        } else {
          // No endpoint configured: simulate fast response
          await new Promise((resolve) => setTimeout(resolve, 600));
        }

        try {
          sessionStorage.setItem('order', JSON.stringify({ name, city, phone }));
        } catch(_) {}
        window.location.href = '/merci.html';
      } catch (err) {
        setMsg('Une erreur est survenue. Veuillez réessayer.', false);
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Confirmer la commande';
      }
    });
  }
})();

