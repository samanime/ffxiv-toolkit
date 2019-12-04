import { html, LitElement } from 'lit-element';

class App extends LitElement {
  render() {
    return html`<div>Woot woot</div>`;
  }
}

customElements.define('ffxiv-toolkit', App);