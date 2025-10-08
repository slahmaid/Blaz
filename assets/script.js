(function(){
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  const form = document.getElementById('order-form');
  const msg = document.getElementById('form-msg');
  const submitBtn = document.getElementById('submit-btn');

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

  async function fakeSubmit(payload) {
    // Replace this with your real endpoint (Google Sheet, webhook, etc.)
    // For now, we simulate a fast network call.
    return new Promise((resolve) => setTimeout(resolve, 700));
  }

  if (form && submitBtn) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const { name, city, phone } = serializeForm(form);

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

      submitBtn.disabled = true;
      submitBtn.textContent = 'Envoi...';
      setMsg('', true);

      try {
        await fakeSubmit({ name, city, phone });
        setMsg('Merci ! Votre commande est bien reçue. Nous vous appellerons pour confirmer.', true);
        form.reset();
      } catch (err) {
        setMsg('Une erreur est survenue. Veuillez réessayer.', false);
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Confirmer la commande';
      }
    });
  }
})();

