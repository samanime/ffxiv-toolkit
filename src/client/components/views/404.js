import { html, css, LitElement } from 'lit-element';

customElements.define('error404-view', class HomeView extends LitElement {
  render() {
    return html`<p>404 Not Found</p>`;
  }
});