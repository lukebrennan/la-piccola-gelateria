import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Seo } from '../../core/seo';
import { SITE } from '../../core/site';
import { PHOTOS } from '../../core/photos';
import { Reveal } from '../../core/reveal';
import { PhotoComponent } from '../../shared/photo';
import { PageHead } from '../../shared/page-head';
import { MapEmbed } from '../../shared/map';
import { Hours } from '../../shared/hours';

const FAQ = [
  {
    q: 'Do you have dairy-free gelato?',
    a: 'Yes. Every fruit sorbetto and our dark chocolate are made without milk. Filter the menu by "Senza Latte" to see them all.',
  },
  {
    q: 'Is there somewhere to sit?',
    a: 'There are a few stools by the window and a stone ledge outside. Most people take their scoop for a walk, which is rather the point of Amalfi.',
  },
  {
    q: 'Can I order ahead?',
    a: 'Ordering ahead for tubs and boxes is coming soon. Until then, the counter is open every day from 10:00am to midnight and there is rarely a long wait.',
  },
  {
    q: 'Do you take cards?',
    a: 'Yes, cards and contactless are welcome, and so is cash.',
  },
];

@Component({
  selector: 'lp-visit',
  imports: [RouterLink, PhotoComponent, PageHead, MapEmbed, Hours, Reveal],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './visit.html',
  styleUrl: './visit.scss',
})
export class Visit {
  protected readonly site = SITE;
  protected readonly photos = PHOTOS;
  protected readonly faq = FAQ;
  protected readonly phoneHref = 'tel:' + SITE.phone.replace(/\s/g, '');

  protected readonly ways = [
    {
      how: 'On foot',
      text: 'We are a two-minute walk from the Duomo steps. Head up the main street, take the first narrow turning past the lemon stall and look for the blue and yellow sign.',
    },
    {
      how: 'By bus',
      text: 'Regional buses along the coast stop near the harbour, a five-minute walk away. In summer, arrive early for the best views from the window seats.',
    },
    {
      how: 'By ferry',
      text: 'Ferries run to Amalfi from nearby ports in season. The pier is close enough that you can smell the lemons before you reach us.',
    },
    {
      how: 'By car',
      text: 'Parking in the centre is limited and fills up quickly in summer. We would suggest leaving the car outside town and enjoying the walk.',
    },
  ];

  protected readonly nearby = [
    { name: 'Amalfi Duomo', note: 'The cathedral and its striped steps, two minutes away.' },
    { name: 'Valle dei Mulini', note: 'The old paper mills, a shady walk uphill.' },
    { name: 'Atrani', note: 'The neighbouring village, ten minutes along the coast path.' },
  ];

  constructor() {
    const seo = inject(Seo);
    seo.set({
      title: 'Visit Us in Amalfi: Hours & Directions',
      description:
        'Find La Piccola Gelateria at Via dei Limoni 18, Amalfi. Open every day from 10am to midnight. Opening hours, map, directions and how to get here.',
      path: '/visit-amalfi',
      crumbs: [{ name: 'Visit Us', path: '/visit-amalfi' }],
      jsonLd: [
        seo.localBusiness(),
        {
          '@type': 'FAQPage',
          mainEntity: FAQ.map((f) => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a },
          })),
        },
      ],
    });
  }
}
