import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Seo } from '../../core/seo';
import { PHOTOS } from '../../core/photos';
import { Reveal } from '../../core/reveal';
import { PhotoComponent } from '../../shared/photo';
import { IconComponent } from '../../shared/icon';
import { PageHead } from '../../shared/page-head';
import { INGREDIENTS } from '../../data/ingredients';
import { FLAVOURS, IconName } from '../../data/flavours';

const ICON: Record<string, IconName> = {
  'amalfi-lemons': 'lemon',
  'sicilian-pistachios': 'leaf',
  'italian-milk': 'cup',
  'seasonal-fruit': 'sun',
  'dark-chocolate': 'cone',
  'fresh-cream': 'flower',
};

@Component({
  selector: 'lp-ingredients',
  imports: [RouterLink, PhotoComponent, IconComponent, PageHead, Reveal],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './ingredients.html',
  styleUrl: './ingredients.scss',
})
export class Ingredients {
  protected readonly photos = PHOTOS;
  protected readonly items = INGREDIENTS;
  protected readonly icon = ICON;

  protected readonly promises = [
    { lead: 'Local first.', text: 'Milk, fruit and lemons from as close to the shop as they come.' },
    { lead: 'Italian always.', text: 'When it cannot be local, it is from Italy, from people we know.' },
    { lead: 'Seasonal only.', text: 'We stop making a flavour when its ingredient is no longer at its best.' },
  ];

  constructor() {
    inject(Seo).set({
      title: 'Ingredients: Amalfi Lemons & Pistachios',
      description:
        'Where our gelato comes from: Amalfi lemons, Sicilian pistachios, fresh Italian milk, seasonal fruit and dark chocolate. Simple ingredients, sourced with care.',
      path: '/ingredients',
      crumbs: [{ name: 'Ingredients', path: '/ingredients' }],
    });
  }

  /** Slug for a flavour name so "used in" chips can link to the menu. */
  protected slugFor(name: string): string | null {
    return FLAVOURS.find((f) => f.name === name)?.slug ?? null;
  }
}
