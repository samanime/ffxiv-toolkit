import { html, css, LitElement } from 'lit-element';
import fontAwesome from '../../utils/font-awesome';
import classNames from '../../utils/classNames';
import q from '../../utils/q';
import range from '../../utils/range';
import { sum } from '../../utils/math';
import '../common/button';
import A from '../../utils/extends/A';
import O from '../../utils/extends/O';
import N from '../../utils/extends/N';

customElements.define('cactpot-view', class CactpotView extends LitElement {
  static get properties() {
    return {
      values: { type: Object },
      picking: { type: Number }
    }
  }

  static get styles() {
    return css`
      h1 {
        margin-top: 0;
      }
      
      dt, dd {
        display: inline;
      }
      
      dt {
        font-weight: bold;
      }
      
      dt:after {
        font-weight: normal;
        content: ': ';
      }
      
      dt span {
        display: inline-block;
        margin-right: 10px;
      }
      
      span.max {
        display: inline-block;
        margin-right: 10px;
        color: #9C9;
      }
      
      span.average {
        display: inline-block;
        margin-right: 10px;
        color: #69C;
      }
      
      span.min {
        display: inline-block;
        margin-right: 10px;
        color: #C63;
      }
      
      .payouts span.max,
      .payouts span.min,
      .payouts span.average {
        margin-right: 2px;
      }
      
      dd {
        margin: 0;
      }
      
      dd:after {
        display: block;
        content: '';
      }
      
      table {
        margin: 0 auto;
      }
      
      .arrow, .number {
        --size: 50px;
        
        font-size: calc(var(--size) - 10px);
        text-align: center;
        line-height: var(--size);
      }
      
      .arrow-3 {
        text-align: right;
      }
      
      .arrow-3 .arrow-number {
        padding-right: 8px;
      }
      
      .arrow .left {
        transform: rotate(45deg);
      }
      
      .arrow .right {
        transform: rotate(-45deg);
      }

      .top-arrows .arrow-number {
        display: block;
      }
      
      .number {
        position: relative;
      }
      
      .number span {
        --color: #DC6;
        
        color: #333;
        font-size: calc(var(--size) - 20px);
        width: var(--size);
        height: var(--size);
        display: block;
        line-height: calc(var(--size) * .8);
        border-radius: calc(var(--size) / 2);
        background: #FFF;
        box-sizing: border-box;
        border: calc(var(--size) / 10) solid var(--color);
        cursor: pointer;
        position: relative;
      }
      
      .number span.empty {
        background: var(--color);
      }
      
      .number.disabled span {
        color: #666;
        background: #EEE;
        border-color: #999;
      }
      
      .number span.cell-number {
        position: absolute;
        bottom: 0;
        right: 0;
        font-size: 10px;
        width: 15px;
        height: 15px;
        line-height: 13px;
        text-align: center;
        box-sizing: border-box;
        border: 1px solid #EEE;
        background: var(--background-color);
        color: var(--primary-color);
      }
      
      .picker {
        margin: 0;
        padding: 10px;
        border: 1px solid var(--primary-color);
        display: inline-block;
        border-radius: 10px;
        width: calc(var(--size) * 3 + 22px);
        background: var(--background-color);
        position: absolute;
        z-index: 1000;
        top: -67px;
        left: -66px;
      }
      
      .picker li {
        display: inline-block;
      }
      
      my-button {
        margin: 20px 0;
      }
      
      .payouts {
        text-align: center;
        border-collapse: collapse;
        border: 1px solid var(--primary-color);
      }
      
      .payouts .mgp {
        display: block;
      }
      
      .payouts td:first-child {
        white-space: pre;
      }
      
      .mgp {
        white-space: pre;
        font-size: .6em;
      }
      
      .mgp:after {
        content: ' MGP';
      }
      
      .payouts {
        margin-bottom: 40px;
      }
      
      .payouts thead {
        border-bottom: 2px solid var(--primary-color);
        padding-bottom: 5px;
      }
      
      .payouts th {
        vertical-align: bottom;
      }
      
      .payouts th, .payouts td {
        border: solid var(--primary-color);
        border-width: 0 1px;
        padding: 5px;
        min-width: 66px;
        box-sizing: border-box;
      }
      
      .payouts tr:nth-child(2n) {
        background: var(--table-alt-background, #999);
      }
      
      .recommendations {
        text-align: center;
        margin-bottom: 40px;
      }
      
      .recommendations.line {
        margin-bottom: 0;
      }
      
      .recommendations h2 {
        margin-bottom: 10px;
      }
      
      .recommendations ul {
        list-style: none;
        display: inline-block;
        text-align: left;
        padding: 0;
        margin: 0;
      }
    `;
  }

  get allPicked() {
    return this.values.filter(Boolean).length >= 3;
  }

  constructor() {
    super();

    this.reset();
  }

  render() {
    const { renderArrow, renderNumber, reset, values, allPicked } = this;
    const { odds, max, min, average } = evaluate(values);

    return html`
      ${fontAwesome}
      <h1>Cactpot Solver</h1>
      <p>Fill in the values you've selected and it will help you select your next moves.</p>
      <dl>
        <dt><span class="fas fa-check-circle max"></span>Max Possible</dt>
        <dd>The row(s) with best chance at the maximum possible payout.</dd>
        <dt><span class="fas fa-check-circle average"></span>Max Average</dt>
        <dd>The row(s) with the best possible average payout.</dd>
        <dt><span class="fas fa-check-circle min"></span>Highest Minimum</dt>
        <dd>The row(s) with the highest minimum payout.</dd>      
      </dl>
      <table>
        <tbody>
          <tr class="top-arrows">
            ${range(3, 7).map(renderArrow)}
          </tr>
          ${range(2, 0).map(line => html`
            <tr>
              ${renderArrow(line)}
              ${range((2 - line) * 3, (2 - line) * 3 + 2).map(renderNumber)}
            </tr>
          `)}
        </tbody>
      </table>
      ${q(!allPicked, html`
        <div class="recommendations">
          <h2>Recommended Next Moves</h2>
          <ul>
            <li>
              <span class="fas fa-check-circle max"></span>
              Max Possible: ${max.next.toListString('or')}
            </li>
            <li>
              <span class="fas fa-check-circle average"></span>
              Max Average: ${average.next.toListString('or')}
            </li>
            <li>
              <span class="fas fa-check-circle min"></span>
              Highest Minimum: ${min.next.toListString('or')}
            </li>
          </ul>
          <p>
            Selecting one of the recommended cells will give you the 
            best statistical chance at the given recommendation type.
          </p>
        </div>
      `)}
      <my-button block @click=${reset}>Reset</my-button>    
      ${q(allPicked, html`      
        <div class="recommendations line">
          <h2>Recommended Lines</h2>
          <p>The payouts show your odds for a given line. Recommendations based on type are on the left.</p>
        </div>
      `)}
      <table class="payouts">
        <thead>
          <tr>
            <th>Best Choice For</th>
            <th>Line</th>
            <th>Cells in Line</th>
            <th>Max</th>
            <th>Average</th>
            <th>Min</th>
            ${PAYOUTS.entries().map(([result, payout]) => html`
              <th>
                ${result}
                <span class="mgp">${N.of(payout).withCommas()}</span>
              </th>
            `)}
          </tr>
        </thead>
        <tbody>
          ${range(0, LINES.length - 1).map(line => html`
            <tr>
              <td>${
                  q(max.lines.includes(line), html`<span class="fas fa-check-circle max"></span>`)
                }${
                  q(average.lines.includes(line), html`<span class="fas fa-check-circle average"></span>`)
                }${
                  q(min.lines.includes(line), html`<span class="fas fa-check-circle min"></span>`)
              }</td>
              <td>${line + 1}</td>
              <td>${A.from(LINES[line]).map(cell => cell + 1).toListString('')}</td>
              <td><span class="mgp">${N.of(max.values[line]).withCommas()}</span></td>
              <td><span class="mgp">${N.of(average.values[line]).withCommas()}</span></td>
              <td><span class="mgp">${N.of(min.values[line]).withCommas()}</span></td>
              ${PAYOUTS.keys().map(result => html`
                <td>${odds[line][result] ? `${(odds[line][result] * 100).toFixed(1)}%` : '-'}</td>
              `)}
            </tr>
          `)}      
        </tbody>
      </table>
    `;
  }

  renderArrow = line => html`
    <td class=${`arrow arrow-${line}`} .line="line">
      <span class="arrow-number">${line + 1}</span>
      <i class=${classNames(
        'far', {
          left: line === 7,
          right: line === 3,
          'fa-arrow-alt-circle-right': line <= 2,
          'fa-arrow-alt-circle-down': line > 2
        }
      )}></i>
    </td>
  `;

  renderNumber = index => {
    const { handleNumberClick, picking, renderPicker } = this;
    const value = this.values[index];

    return html`
      <td 
        class="number" 
        .index=${index}
        @click=${handleNumberClick}
      >
        ${q(value, html`<span>${value}</span>`)}
        ${q(!value, html`<span class="empty"></span>`)}
        ${q(picking === index, renderPicker())}
        <span class="cell-number">${index + 1}</span>
      </td>
    `;
  };

  renderPicker = () => {
    const { handlePick, values, picking } = this;

    return html`
      <table class="picker">
        ${range(0, 2).map(row => html`
          <tr>
            ${range(row * 3 + 1, (row + 1) * 3).map(value => {
              const disabled = values[picking] !== value && values.includes(value);
              
              return html`
                <td 
                  class=${classNames(
            'number',
                    { disabled }
                  )} 
                  .value=${value}
                  @click=${!disabled ? handlePick : () => {}}
                >
                  <span>${value}</span>
                </td>
              `;
            })}
          </tr>
        `)}
          <tr>
            <td></td>
            <td 
              class="number"
              @click=${handlePick}
            >
              <span
                class="empty"
              ></span>
            </td>          
          </tr>
      </table>
    `;
  };

  reset() {    
    this.values = A.from(new Array(9));
  }

  handleNumberClick(event) {
    this.picking = event.currentTarget.index;
  };

  handlePick(event) {
    event.stopPropagation();
    const number = event.currentTarget.value;
    const index = event.currentTarget.parentNode.closest('.number').index;

    this.picking = undefined;
    this.values = this.values.insertAt(index, number);
  };
});

const evaluate = (values) => {
  const odds = range(0, LINES.length - 1)
    .map(index => calculate(index, values));
  const entries = A.from(odds.map(Object.entries));

  return {
    odds,
    max: evaluateMax(values, entries),
    average: evaluateAverage(values, entries),
    min: evaluateMin(values, entries)
  };
};

const evaluateMax = (values, entries) => {
  const maximums = entries.map(entries =>
    Math.max(...entries.map(([result]) => PAYOUTS[result]))
  );

  const max = Math.max(...maximums);
  const results = PAYOUTS.filter((_, value) => value === max).keys();
  const lines = entries
    .map((entries, index) => ({ line: index, entries }))
    .filter(({ entries }) => entries.some(([key]) => results.includes(key)))
    .map(({ line }) => line);

  return { values: maximums, lines, next: getNextCells(lines, values) };
};

const evaluateMin = (values, entries) => {
  const minimums = entries.map(entries =>
    Math.min(...entries.map(([result]) => PAYOUTS[result]))
  );

  const bestMin = Math.max(...minimums);
  const lines = minimums.map((min, index) => ({ min, index }))
    .filter(({ min }) => min === bestMin)
    .map(({ index }) => index);

  return { values: minimums, lines, next: getNextCells(lines, values) };
};

const evaluateAverage = (values, entries) => {
  const averages = entries.map(entries =>
    entries.reduce((r, [result, chance]) => r + (PAYOUTS[result] * chance), 0)
  );

  const bestAverage = Math.max(...averages);
  const lines = averages.map((average, index) => ({ average, index }))
    .filter(({ average }) => average === bestAverage)
    .map(({ index }) => index);

  return { values: averages, lines, next: getNextCells(lines, values) };
};

const getNextCells = (lines, values) => {
  const cellCounts = A.from(lines)
    .flatMap(line => LINES[line])
    .countEach()
    .filter((key) => !values[key]);

  const maxCount = Math.max(...cellCounts.values());

  return cellCounts
    .filter((_, value) => value === maxCount)
    .keys()
    .map(v => parseInt(v) + 1);
};

const calculate = (lineIndex, values) => {
  const indices = LINES[lineIndex];
  const known = indices
    .map(index => values[index])
    .filter(Boolean);

  const available = range(1, 9)
    .filter(v => !values.includes(v));

  const toPick = 3 - known.length;

  const possible = calculatePossible(available, known, 1, toPick);
  const totals = A.from(possible).countEach();

  return O.of(totals).map(key =>
    ({ [key]: totals[key] / possible.length })
  );
};

const calculatePossible = (available, picks, depth, toPick) => {
  if (toPick === 0) {
    return [sum(...picks)];
  } else if (depth === toPick) {
    return available.map(pick => sum(...picks, pick));
  }

  return available.map((pick, index) =>
    calculatePossible(
      A.from(available).remove(index),
      [...picks, pick],
      depth + 1,
      toPick
    )
  ).flatMap(a => a);
};

const LINES = [
  [6, 7, 8],
  [3, 4, 5],
  [0, 1, 2],
  [0, 4, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6]
];

const PAYOUTS = O.of({
  6: 10000,
  7: 36,
  8: 720,
  9: 360,
  10: 80,
  11: 252,
  12: 108,
  13: 72,
  14: 54,
  15: 180,
  16: 72,
  17: 180,
  18: 119,
  19: 36,
  20: 306,
  21: 1080,
  22: 144,
  23: 1800,
  24: 3600
});