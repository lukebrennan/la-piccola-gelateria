import { isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  PLATFORM_ID,
  afterNextRender,
  inject,
  signal,
} from '@angular/core';
import { openStatus } from '../core/open-status';
import { WEEK } from '../core/site';

/** Weekly opening hours. Today's row is highlighted once running in the browser. */
@Component({
  selector: 'lp-hours',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <table>
      <caption class="sr-only">Opening hours</caption>
      <tbody>
        @for (d of week; track d; let i = $index) {
          <tr [class.is-today]="i === today()">
            <th scope="row">
              {{ d }}
              @if (i === today()) {
                <span class="pill">Today</span>
              }
            </th>
            <td>10:00am to midnight</td>
          </tr>
        }
      </tbody>
    </table>
  `,
  styles: [
    `
      :host {
        display: block;
        max-width: 28rem;
      }
      table {
        width: 100%;
        border-collapse: collapse;
      }
      th,
      td {
        padding: 0.6rem 0.5rem;
        border-bottom: 1px solid var(--line);
        text-align: left;
        font-weight: 400;
      }
      th {
        font-weight: 500;
      }
      td {
        text-align: right;
        color: var(--ink-soft);
      }
      tr:first-child th,
      tr:first-child td {
        border-top: 1px solid var(--line);
      }
      .is-today th,
      .is-today td {
        background-color: var(--lemon-wash);
        color: var(--ink);
        font-weight: 600;
      }
      .pill {
        margin-left: 0.5rem;
        padding: 0.1rem 0.5rem;
        border-radius: 99px;
        background-color: var(--navy);
        color: var(--cream);
        font-size: 0.7rem;
        font-weight: 600;
        letter-spacing: 0.04em;
        vertical-align: 0.1em;
      }
    `,
  ],
})
export class Hours {
  protected readonly week = WEEK;
  protected readonly today = signal(-1);
  private readonly platform = inject(PLATFORM_ID);

  constructor() {
    afterNextRender(() => {
      if (isPlatformBrowser(this.platform)) this.today.set(openStatus().dayIndex);
    });
  }
}
