import { ServiceObservationDebrief } from '@/types/culinary-twin';

export const SERVICE_DEBRIEFS_4017_ENGLAND_SPAIN: ServiceObservationDebrief[] = [
  {
    id: 'debrief-eng-spain-50covers-01',
    serviceDate: '2026-09-26',
    coversServed: 50,
    menuVersion: 'v1.0-ENG-SPAIN-COMMITTED',
    operatorNotes:
      'Wembley Stadium Box 4017 — England v Spain Matchday. 50 covers seated between 11:30 and 12:00. Pre-match deadline 13:30 strictly adhered to; all 5 pre-match courses cleared pass by 13:12 before guests entered stadium seats. Pass controlled by Adam with "Allergy - Ticket - Fire" cadence; Chef Rod on pass sign-off; Rahane on Entremetier/Risotto; Tia on Sauté/Monkfish & Sauces.',
    whatHeldWell:
      'The clarified mushroom consommé held at 82°C in the vacuum pump dispenser dispensed instantly into Rahane\'s risotto pans with zero temperature drop. The saffron potato mousseline held under parchment at 66°C remained ultra-silky without graining or skinning.',
    whatSlowedUsDown:
      'During Course 1, the single double-basket fryer required 3 separate frying cycles for the 50 Jamón croquetas (18 croquetas per cycle at 2.5 minutes), stretching the amuse dispatch across 8 minutes.',
    whatChefsStruggledWith:
      'Tia initially hesitated on the monkfish sear timing, worrying the high brown butter heat would burn the milk solids before the crust formed. Chef Rod showed her the tilt-and-swirl basting motion to control butter foam temperature.',
    whatWorkedBetterThanExpected:
      'The "Allergy check — Ticket count — Fire" verbal pass protocol prevented two near-miss cross-contact incidents with guest shellfish and dairy exceptions; the dedicated allergen sauté line functioned flawlessly.',
    whatChangedUnderPressure:
      'At 12:45 when 20 main courses dropped simultaneously, Chef Rod moved Adam to ticket call only and took over direct plating of the Pont Neuf batons to ensure zero sauce touched the crispy potato edges.',
    whatCustomerActuallyReceived:
      'All 50 VIP guests received bubbling hot proteins, velvety purées, and crisp garnishes within 2 minutes of plating. Zero delays to 13:30 kick-off. Post-match Cumberland-Morcilla rolls were greeted with standing praise upon their return.',
    candidateAdjustments: [
      {
        component: 'Croqueta Fryer Capacity',
        observedFailureOrGain:
          '3-cycle frying of croquetas created an 8-minute window across 50 guests.',
        proposedHypothesis:
          'Utilize both commercial deep fat fryers simultaneously for Amuse drop to execute all 50 covers in a single 2.5-minute wave.',
        trialStatus: 'VALIDATED_BY_CHEF',
      },
      {
        component: 'Pont Neuf Staging Rack',
        observedFailureOrGain:
          'Placing Pont Neuf potatoes onto warm ceramic before beef was rested caused slight bottom steam condensation on 3 plates.',
        proposedHypothesis:
          'Rest Pont Neuf batons on wire grids above salamander heat until the exact second beef is set down, then cross them on top.',
        trialStatus: 'VALIDATED_BY_CHEF',
      },
      {
        component: 'Allergen Station Marking',
        observedFailureOrGain:
          'Coloured ramekins for non-dairy mousseline eliminated pass confusion during peak main rush.',
        proposedHypothesis:
          'Codify blue-rimmed china as permanent 4017 standard for all allergen-modified modifications.',
        trialStatus: 'VALIDATED_BY_CHEF',
      },
    ],
    recordedBy: 'Chef Rod (Operator & Tutor)',
    chefSignedOff: true,
    chefSignOffDate: '2026-09-26T17:45:00Z',
  },
];
