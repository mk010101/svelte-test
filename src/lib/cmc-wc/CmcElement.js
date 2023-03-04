export class CmcElement extends HTMLElement {
  _pendingAttributes = [];
  _connected = false;
  _initialised = false;
  _template = null;
  _slot = null;
  _inputElement;
  _listeners = [];
  constructor() {
    super();
  }
  attributeChangedCallback(_name, _, _newValue) {
    // console.log(_name, _newValue);
    if (!this._initialised) {
      this._pendingAttributes.push([_name, _newValue]);
    }
  }
  connectedCallback() {
    //requestAnimationFrame(() => {
    if (this._template && !this._initialised) {
      const children = Array.from(this.childNodes);
      this.innerHTML = this._template;
      this._slot = this.querySelector('.cmc-slot');
      if (this._slot) this._slot.append(...children);
      //this._applyPendingAttributes();
    }
    this._initialised = true;
    // });
  }
  disconnectedCallback() {
    this._unregisterAll();
    this._connected = false;
  }
  appendChild(node) {
    if (this._slot) {
      this._slot.appendChild(node);
    } else {
      super.appendChild(node);
    }
    return node;
  }
  removeChild(child) {
    if (this._slot) {
      this._slot.removeChild(child);
    } else {
      super.removeChild(child);
    }
    return child;
  }
  append(...nodes) {
    if (this._slot) {
      this._slot.append(...nodes);
    } else {
      super.append(...nodes);
    }
  }
  _setConnected() {
    this._connected = true;
    this._applyPendingAttributes();
  }
  _registerListener(el, type, listener) {
    if (!el) return;
    listener = listener.bind(this);
    el.addEventListener(type, listener);
    this._listeners.push({ el, type, listener });
  }
  _unregisterListener(el, type, listener) {
    for (let i = 0; i < this._listeners.length; i++) {
      const { el: e, type: t, listener: l } = this._listeners[i];
      if (e === el && t === type && l === listener) {
        e?.removeEventListener(t, l);
        this._listeners.splice(i, 1);
        break;
      }
    }
  }
  _unregisterAll() {
    for (let i = 0; i < this._listeners.length; i++) {
      const { el, type, listener } = this._listeners[i];
      el?.removeEventListener(type, listener);
    }
    this._listeners = [];
  }
  _applyPendingAttributes() {
    //console.log(this._pendingAttributes);
    this._pendingAttributes.forEach((a) => {
      this.setAttribute(a[0], a[1]);
      this.attributeChangedCallback(a[0], '', a[1]);
    });
  }

  _checkAttr(attr, val, el) {
    console.log(attr, val);
  }
  _setInputEl(el) {
    this._inputElement = el;
  }
}
