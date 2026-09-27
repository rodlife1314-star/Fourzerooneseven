import { ServiceObservationDebrief } from '@/types/culinary-twin';

export const SERVICE_DEBRIEFS_4017_FOOTBALL: ServiceObservationDebrief[] = [
  {
    id: 'debrief-fb-50covers-01',
    serviceDate: '2026-09-15',
    coversServed: 50,
    menuVersion: 'v1.0-USA-FOOTBALL-COMMITTED',
    operatorNotes:
      'Wembley Stadium Box 4017 — USA College Football Game Day. 50 covers seated. High-intensity 15-minute halftime rush (38 main courses fired between minutes 15:45 and 16:00). 2 operators at pass (Chef Rod + Pass Assistant), Rahane on Entremetier/Risotto, Tia on Sauté/Lobster & Sauces.',
    whatHeldWell:
      'The pre-pressed, cold-portioned beef brisket blocks reheated and lacquered in the 220°C combi oven in 3.5 minutes with 100% moisture retention and zero structural tearing. The Robuchon potato purée held at 68°C in the insulated thermos dispenser without a trace of skinning, grain, or butter separation.',
    whatSlowedUsDown:
      'Toasting the top-split brioche rolls on a single 30cm plancha during the Red Zone lobster course created a minor 2-minute queuing delay; we were able to toast only 6 rolls at a time, requiring 9 consecutive batches.',
    whatChefsStruggledWith:
      'Tia initially hesitated on the lobster butter temperature when basting rolls, worrying about scorching; after Chef Rod demonstrated the foaming stage, confidence surged. Rahane needed coaching on the final mantecato agitation off the flame to avoid over-thickening the Carnaroli risotto.',
    whatWorkedBetterThanExpected:
      'The dual sauce system on the Kansas City Brisket (surface barbecue lacquer vs plate red-wine jus) was universally praised by guests; zero sauce muddying occurred because the barbecue lacquer had formed a clingy shell in the combi before the jus was poured.',
    whatChangedUnderPressure:
      'Under the halftime rush, the brigade abandoned individual saucing ladles and switched exclusively to the heated thermos pump for both the red-wine beef jus and the minted lamb jus. Saucing speed increased by 3.5x with zero plate rim splatters.',
    whatCustomerActuallyReceived:
      'Plates served within 3 minutes of finishing exhibited bubbling hot glazes, silky warm purées, and distinct temperature contrasts (warm brioche against cool sweet native lobster). Post-match hot dogs were received with genuine delight as the narrative shifted seamlessly back to American game-day tailgate roots.',
    candidateAdjustments: [
      {
        component: 'Brioche Roll Griddling Capacity',
        observedFailureOrGain: 'Single 30cm plancha caused a 2-minute bottleneck on Course 4 (Lobster Roll).',
        proposedHypothesis:
          'Utilize a double-wide cast iron plancha across two induction hobs to griddle 14 brioche rolls simultaneously, cutting batch cycles in half.',
        trialStatus: 'VALIDATED_BY_CHEF',
      },
      {
        component: 'Carnaroli Risotto Par-Cook Timing',
        observedFailureOrGain: '11-minute par-cook left slightly too much starch hydration during 3-minute finish under rush.',
        proposedHypothesis:
          'Adjust par-cook to exactly 10.5 minutes and shock on blast chiller trays in 1.2kg gastro sheets.',
        trialStatus: 'IN_TRIAL',
      },
      {
        component: 'Thermos Pump Standardisation',
        observedFailureOrGain: 'Pump saucing eliminated all pass rim spills and accelerated service during halftime rush.',
        proposedHypothesis:
          'Mandate heated thermos pumps as permanent 4017 Canon equipment for all primary reductions and emulsions.',
        trialStatus: 'VALIDATED_BY_CHEF',
      },
    ],
    recordedBy: 'Chef Rod (Operator & Tutor)',
    chefSignedOff: true,
    chefSignOffDate: '2026-09-15T19:30:00Z',
  },
];
