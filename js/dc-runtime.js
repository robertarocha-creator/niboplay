/*
 * Nibo Play · runtime das páginas
 * Lê o modelo da página (<template id="dc-tpl">) e o desenha com Preact,
 * mantendo a interatividade (vídeos, abas, progresso, pop-ups).
 * Sintaxe suportada: {{caminho}}, <sc-if value="">, <sc-for list="" as="">, onClick/onChange/onSubmit.
 */
(function () {
  var h = preact.h;

  function literal(p) {
    if (p === 'true') return { ok: true, v: true };
    if (p === 'false') return { ok: true, v: false };
    if (p === 'null') return { ok: true, v: null };
    if (/^-?\d+(\.\d+)?$/.test(p)) return { ok: true, v: Number(p) };
    if (/^(['"]).*\1$/.test(p)) return { ok: true, v: p.slice(1, -1) };
    return { ok: false };
  }

  function resolve(path, scope) {
    var p = path.trim();
    var lit = literal(p);
    if (lit.ok) return lit.v;
    var parts = p.split('.');
    var cur = scope;
    for (var i = 0; i < parts.length; i++) {
      if (cur == null) return undefined;
      cur = cur[parts[i]];
    }
    return cur;
  }

  var WHOLE = /^\s*\{\{([^}]+)\}\}\s*$/;
  var ANY = /\{\{([^}]+)\}\}/g;

  function interp(str, scope) {
    return str.replace(ANY, function (_, p) {
      var v = resolve(p, scope);
      return v == null ? '' : String(v);
    });
  }

  function attrValue(raw, scope) {
    var m = WHOLE.exec(raw);
    if (m) return resolve(m[1], scope);
    if (raw.indexOf('{{') > -1) return interp(raw, scope);
    return raw;
  }

  function child(scope, base) {
    var s = Object.create(base);
    for (var k in scope) s[k] = scope[k];
    return s;
  }

  function renderNodes(nodes, scope) {
    var out = [];
    for (var i = 0; i < nodes.length; i++) {
      var r = renderNode(nodes[i], scope);
      if (r == null) continue;
      if (Array.isArray(r)) out.push.apply(out, r); else out.push(r);
    }
    return out;
  }

  function renderNode(node, scope) {
    if (node.nodeType === 3) {
      var t = node.nodeValue;
      return t.indexOf('{{') > -1 ? interp(t, scope) : t;
    }
    if (node.nodeType !== 1) return null;
    var tag = node.localName;

    if (tag === 'sc-if') {
      var cond = attrValue(node.getAttribute('value') || '', scope);
      return cond ? renderNodes(node.childNodes, scope) : null;
    }
    if (tag === 'sc-for') {
      var list = attrValue(node.getAttribute('list') || '', scope) || [];
      var as = node.getAttribute('as') || 'item';
      var out = [];
      for (var i = 0; i < list.length; i++) {
        var extra = {}; extra[as] = list[i]; extra.$index = i;
        var kids = renderNodes(node.childNodes, child(extra, scope));
        out.push(h(preact.Fragment, { key: i }, kids));
      }
      return out;
    }
    if (tag === 'helmet') return null;

    var props = {};
    var attrs = node.attributes;
    for (var a = 0; a < attrs.length; a++) {
      var name = attrs[a].name;
      if (name.indexOf('hint-') === 0) continue;
      var val = attrValue(attrs[a].value, scope);
      if (name.indexOf('on') === 0 && name.length > 2) {
        if (typeof val !== 'function') continue;
        var ev = name.slice(2);
        // Campos de texto atualizam a cada tecla (como no React)
        if (ev === 'change' && (tag === 'input' || tag === 'textarea')) ev = 'input';
        props['on' + ev] = val;
        continue;
      }
      if (name === 'value' && (tag === 'input' || tag === 'select' || tag === 'textarea')) {
        props.value = val == null ? '' : val;
        continue;
      }
      props[name] = val;
    }
    var children = node.localName === 'template' ? [] : renderNodes(node.childNodes, scope);
    return h(tag, props, children);
  }

  function DCLogic(props) { preact.Component.call(this, props); }
  DCLogic.prototype = Object.create(preact.Component.prototype);
  DCLogic.prototype.constructor = DCLogic;
  DCLogic.prototype.render = function () {
    var vals = this.renderVals ? this.renderVals() : {};
    return h(preact.Fragment, null, renderNodes(window.__dcTemplate.childNodes, vals));
  };
  window.DCLogic = DCLogic;

  window.NiboDC = {
    mount: function (Component, props) {
      window.__dcTemplate = document.getElementById('dc-tpl').content;
      var root = document.getElementById('root');
      root.textContent = '';
      preact.render(h(Component, props || {}), root);
      document.documentElement.setAttribute('data-ready', '1');
    }
  };
})();
