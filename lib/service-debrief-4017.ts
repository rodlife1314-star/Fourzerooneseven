import { ServiceObservationDebrief } from '@/types/culinary-twin';

export const SERVICE_DEBRIEFS_4017: ServiceObservationDebrief[] = [
  {
    id: 'debrief-4017-01',
    serviceDate: '2026-08-15',
    coversServed: 50,
    menuVersion: 'v1.0-TIER1-COMMITTED',
    operatorNotes:
      'Saturday Wembley Matchday — Kick-off 15:00. High-pressure 15-minute halftime rush (15:45–16:00) with 38 main courses fired in a 12-minute window. 2 operators at the pass.',
    whatHeldWell:
      'The 36-hour cured & pressed lamb belly held at 64°C in vacuum bath retained 100% of internal moisture and collagen silkiness across 90 minutes. Jerusalem artichoke purée in the thermos pump stayed at 68°C with zero skinning or separation.',
    whatSlowedUsDown:
      'Garnishing the tandoori scallop with micro-coriander and pomegranate arils with tweezers cost 35–45 seconds per plate, creating an 8-ticket backlog at the pass between minutes 15:51 and 15:55.',
    whatChefsStruggledWith:
      'Commis chef on the salamander station hesitated on the glaze height for the braised beef bonbons; two trays took 5 minutes instead of the planned 3 minutes due to opening the salamander door repeatedly.',
    whatWorkedBetterThanExpected:
      'The pressed lamb-fat Boulangère potato terrine re-crisped in the 220°C combi in 4.5 minutes with exceptional structural rigidity, allowing clean spatula transfer without a single broken edge.',
    whatChangedUnderPressure:
      'Under the peak halftime rush, operators abandoned saucing spoons and switched strictly to the heated insulated thermos pump. Sauce distribution was 4x faster and eliminated all errant splatters on plate rims.',
    whatCustomerActuallyReceived:
      'Plates dispatched in windows 0–6 minutes had crisp exterior crust, 58°C core temperature, and mirror-gloss jus. Four plates held in the staging lane for >11 minutes suffered noticeable crust softening and loss of volatile rosemary aroma (Q(t) degradation ~30%).',
    candidateAdjustments: [
      {
        component: 'Scallop Garnish Assembly',
        observedFailureOrGain: 'Individual herb tweezing at the pass created a 40-second bottleneck during halftime.',
        proposedHypothesis:
          'Pre-mount the herb and spice crunch onto a warm toasted brioche wafer during prep; place wafer with a single thumb-and-finger movement at the pass.',
        trialStatus: 'VALIDATED_BY_CHEF',
      },
      {
        component: 'Combi-Oven Glaze Protocol',
        observedFailureOrGain: 'Salamander opening caused temperature drops and inconsistent bonbon caramelization.',
        proposedHypothesis:
          'Move all bonbon and rillette re-glazing into the 220°C combi-oven on speed-rack trays with ladle-applied glaze, bypassing the salamander station entirely.',
        trialStatus: 'IN_TRIAL',
      },
      {
        component: 'Sauce Dispensing Method',
        observedFailureOrGain: 'Spoon saucing resulted in rim drips and slow plating speed.',
        proposedHypothesis:
          'Mandate heated thermos pump dispensers for 100% of Tier 1 sauces at the Wembley pass.',
        trialStatus: 'VALIDATED_BY_CHEF',
      },
    ],
    recordedBy: 'Chef Rod (Operator)',
    chefSignedOff: true,
    chefSignOffDate: '2026-08-15T18:45:00Z',
  },
];
