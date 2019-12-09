import 'autotrack/lib/plugins/url-change-tracker';
import { html, css, LitElement } from 'lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';
import routes, { defaultRoute } from '../routes';
import store from '../store';
import connect from '../utils/connect';
import updateMeta from '../utils/updateMeta';
import q from '../utils/q';
import { pageSelector } from '../actions/app';
import findUnknownElements from '../utils/findUnknownElements';
import './header';
import './footer';

customElements.define('ffxiv-toolkit', class App extends connect(store)(LitElement) {
  static get properties() {
    return {
      page: { type: String }
    };
  }

  static get styles() {
    return css`
      :host {
        display: block;
        width: 100%;
        height: 100%;
        overflow: auto;
        font-family: Arial, Helvetica, sans-serif;
        background: var(--background-color);
        color: var(--primary-color);
      }
      
      main {
        padding: 10px;
      }

      main :not([active]) {
        display: none;
      }
    `;
  }

  updated(_) {
    const unknown = findUnknownElements(document, '[lazy]');

    if (unknown.length) {
      console.error('Found the following unknown elements', unknown);
    }
  }

  render() {
    const { page } = this;

    return html`
      <app-header page=${page}></app-header>
      <main>
        ${Object.entries(routes).map(([key, route]) => html`
          ${unsafeHTML(`
             <${route.element} 
               ${q(page === key, 'active')} 
               lazy
             ></${route.element}>
          `)}
        `)}
      </main>
      <app-footer></app-footer>
    `;
  }

  stateChanged(state) {
    this.page = pageSelector(state);

    if (this.page) {
      updateMeta(routes[this.page].meta);
    }
  }
});
