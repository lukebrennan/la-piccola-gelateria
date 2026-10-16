import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Seo } from '../../core/seo';
import { PHOTOS } from '../../core/photos';
import { Reveal } from '../../core/reveal';
import { PhotoComponent } from '../../shared/photo';
import { PageHead } from '../../shared/page-head';

@Component({
  selector: 'lp-our-story',
  imports: [RouterLink, PhotoComponent, PageHead, Reveal],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './our-story.html',
  styleUrl: './our-story.scss',
})
export class OurStory {
  protected readonly photos = PHOTOS;

  protected readonly morning = [
    { time: '6:00', text: 'Lemons and milk arrive at the back door.' },
    { time: '7:30', text: 'Bases are made and left to rest, because patience is an ingredient.' },
    { time: '9:00', text: 'The first batch is churned, slowly, and tasted twice.' },
    { time: '10:00', text: 'The shutters go up and the counter opens.' },
    { time: 'All day', text: 'Small batches are churned as they are needed, never in advance.' },
    { time: 'Midnight', text: 'The last scoop goes out, the counter is cleaned and the notebook is closed.' },
  ];

  protected readonly beliefs = [
    { lead: 'Fresh beats fancy.', text: 'A simple recipe made this morning will always beat a clever one made last week.' },
    { lead: 'Seasonal or not at all.', text: 'If the fruit is not at its best, the flavour is not on the counter.' },
    { lead: 'Slow is a flavour.', text: 'A gentle churn and a patient rest give gelato its silk. We do not hurry it.' },
  ];

  constructor() {
    inject(Seo).set({
      title: 'Our Story: A Family Gelateria in Amalfi',
      description:
        'La Piccola Gelateria began with a seafront cart and a notebook of family recipes. Meet the small team making fresh gelato in Amalfi every morning.',
      path: '/our-story',
      image: undefined,
      crumbs: [{ name: 'Our Story', path: '/our-story' }],
    });
  }
}
