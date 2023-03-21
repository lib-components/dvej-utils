import { LitElement } from 'lit-element';

class Page extends LitElement {
  static get properties() {
    return {
      active: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.active = false;
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('location-changed', this._handleLocationChanged.bind(this));
    this.active = true;
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('location-changed', this._handleLocationChanged.bind(this));
    this.active = false;
  }

  _handleLocationChanged() {
    this.requestUpdate();
  }

  shouldUpdate(changedProps) {
    const oldPath = changedProps.get('path');
    const newPath = this.getParams().path;
    return oldPath !== newPath;
  }

  update() {
    super.update();
    if (this.active) {
      // Realizar alguna acción cuando la página se actualiza y está activa
    }
  }

  navigateTo(url, params) {
    let queryString = '';
    if (params) {
      Object.keys(params).forEach((key, index) => {
        const separator = index === 0 ? '?' : '&';
        queryString += `${separator}${key}=${params[key]}`;
      });
    }
    window.history.pushState({}, '', url + queryString);
    window.dispatchEvent(new CustomEvent('location-changed'));
  }

  navigateBack() {
    window.history.back();
  }

  getParams() {
    const params = new URLSearchParams(window.location.search);
    const obj = {};
    for (const [key, value] of params) {
      obj[key] = value;
    }
    return obj;
  }
}

export { Page };