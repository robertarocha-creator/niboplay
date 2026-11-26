/*
 * Nibo Play · inscrição pelo HubSpot
 * Formulário "Marketing | Conteúdos - Contador Curso de IA para contadores"
 * (portal 1554114 · form aa01c83e-e333-4c60-8f3a-688b3631685d)
 *
 * - Landing page: depois do envio, leva para /plataforma (no domínio em que o site estiver).
 * - Plataforma (convite de quem chegou por link compartilhado): não redireciona,
 *   mostra a confirmação ali mesmo.
 * - Em ambos, marca a pessoa como inscrita neste navegador, para o convite não aparecer de novo.
 */
(function () {
  var PORTAL = '1554114';
  var FORM = 'aa01c83e-e333-4c60-8f3a-688b3631685d';
  var REGION = 'na1';
  var KEY = 'niboPlay.inscrito';
  var loading = null;

  function load() {
    if (window.hbspt && window.hbspt.forms) return Promise.resolve();
    if (loading) return loading;
    loading = new Promise(function (resolve, reject) {
      var s = document.createElement('script');
      s.src = 'https://js.hsforms.net/forms/embed/v2.js';
      s.charset = 'utf-8';
      s.onload = resolve;
      s.onerror = reject;
      document.head.appendChild(s);
    });
    return loading;
  }

  function mark() {
    try { window.localStorage.setItem(KEY, '1'); } catch (e) {}
  }

  window.niboInscricao = function (target, opts) {
    opts = opts || {};
    if (window.__PRERENDER) return;
    var el = document.querySelector(target);
    if (!el || el.getAttribute('data-hs')) return;
    el.setAttribute('data-hs', '1');
    load().then(function () {
      var cfg = {
        region: REGION,
        portalId: PORTAL,
        formId: FORM,
        target: target,
        onFormSubmitted: function () {
          mark();
          if (typeof opts.onDone === 'function') opts.onDone();
        }
      };
      if (opts.redirect) cfg.redirectUrl = opts.redirect;
      window.hbspt.forms.create(cfg);
    }).catch(function () {
      el.removeAttribute('data-hs');
      el.innerHTML = '<p class="np-hs-erro">Não foi possível carregar o formulário agora. Atualize a página ou tente de novo em instantes.</p>';
    });
  };
})();
