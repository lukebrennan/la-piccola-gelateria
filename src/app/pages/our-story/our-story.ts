import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Seo } from '../../core/seo';
import { PageHead } from '../../shared/page-head';

@Component({
  selector: 'lp-our-story',
  imports: [RouterLink, PageHead],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './our-story.html',
  styleUrl: './our-story.scss',
})
export class OurStory {
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
