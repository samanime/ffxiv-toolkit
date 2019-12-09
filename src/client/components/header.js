import { html, css, LitElement } from 'lit-element';
import routes, { defaultRoute } from '../routes';

customElements.define('app-header', class AppHeader extends LitElement {
  static get properties() {
    return {
      page: { type: String }
    }
  }

  static get styles() {
    return css`
      nav {
        padding: 10px;
        border-bottom: 1px solid var(--primary-color);
      }

      span {
        font-weight: bold;
        font-size: 1.2em;
        padding-right: 20px;
        border-right: 1px solid var(--primary-color);
      }

      ul {
        display: inline-block;
        list-style: none;
        margin: 0 0 0 10px;
        padding: 0;
      }

      li {
        display: inline-block;
        margin-left: 10px;
      }

      a {
        color: var(--primary-color);
        text-decoration: none;
      }
      
      a:hover {
        color: var(--pop-color);
      }

      [active] a {
        text-decoration: underline;
      }
    `;
  }

  render() {
    const { page } = this;

    return html`
      <header>
        <nav>
          <span>
            <a href="/">Xazure's FFXIV Toolkit</a>
          </span>
          <ul>
            ${Object.entries(routes)
              .filter(([_, { navLabel }]) => navLabel)
              .map(([key, { navLabel }]) => html`
                <li ?active=${page === key}>
                  <a href=${`/${key === defaultRoute ? '' : key}`}>${navLabel}</a>
                </li>
            `)}
          </ul>        
        </nav>        
      </header>
    `;
  }
});