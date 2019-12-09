import { html, css, LitElement } from 'lit-element';

customElements.define('my-button', class Button extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
      }
      
      .button {
        text-align: center;
      }
      
      button {
        outline: 0;
        text-align: center;
        font-size: 2em;
        border-radius: 5px;
        border: 0;
        margin: 0;
        padding: 10px 20px;
        
        color: var(--button-color, #000);
        background: var(--button-background, #CCC);
        cursor: pointer;
      }

      button:hover {
        margin: -1px 1px 1px -1px;
        color: var(--button-hover-color, #FFF);
        box-shadow: 1px 1px 4px -2px var(--button-hover-shadow-color, #FFF);
        background: var(--button-hover-background, #333);
      }
      
      button:active {
        margin: 0;
        color: var(--button-down-color, var(--button-hover-color, #FFF));
        background: var(--button-down-background, var(--button-hover-background, #333));
      }
    `;
  }

  render() {
    const { block } = this;

    return html`
      <div class="button">
        <button>
          <slot></slot>
        </button>
      </div>
    `;
  }
});