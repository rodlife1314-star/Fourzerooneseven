import {
  CulinaryTwinProject,
  MenuSession,
  ChefThoughtRecord,
  CrossTerrainAnalysis,
  LiveTicket,
  ServiceObservation,
  AuditRecord,
} from '@/types/culinary-twin';
import { PRODUCTION_BRIEF_4017_ENGLAND_SPAIN } from './production-brief-4017-england-spain';
import { TEACHING_EDITION_4017_ENGLAND_SPAIN } from './teaching-edition-4017-england-spain';
import { MARLOW_INTEL_4017_ENGLAND_SPAIN } from './marlow-intel-4017-england-spain';
import { SERVICE_DEBRIEFS_4017_ENGLAND_SPAIN } from './service-debrief-4017-england-spain';
import { generateHash } from './utils';

export const RAW_ENGLAND_SPAIN_BRIEF_TEXT = `PROJECT SIXES — BOX 4017
ENGLAND v SPAIN (26 SEP 2026) | 50-COVER PRODUCTION + TEACHING BLUEPRINT
Wembley National Stadium — Level 4, Box 4017 | Delaware North UK Showcase
Lead: Chef Rod (Tutor / Operator) | Brigade Learners: Rahane & Tia | Pass Controller: Adam

1. 4017 DOCTRINE:
- The domain changes. The standard does not.
- We set the standard, not the menu.
- 50 covers is the ring-fenced baseline: volume scales down, standards never scale down.
- Michelin-grade is the invariant floor.
- 13:30 Kick-Off Hard Stop: All pre-match courses (Amuse through Dessert) must clear the pass before 13:15 stadium movement.
- Pass Call Protocol: "Allergy check — Ticket count — Fire". Pass discipline is non-negotiable.
- Edge Law: 95% defined domain terrain (senior chefs); 5% high-leverage Chef Rod execution & refinement.
- Dual-Lineage Integrity: British coastal & pastoral heritage elevated through classical Iberian saucing disciplines.
- Waste becomes flavour: 100% of seafood trimmings and Jamón bones converted into aromatic finishing stocks and broths.

2. SERVICE PROGRESSION (MATCHDAY FLOW):
1. Kick-off Reception (Amuse): Crispy Jamón Ibérico & Montgomery Cheddar Croqueta, Smoked Pimentón & Quince Purée.
2. Opening Drive (Course 2 / 4017 Canon): Wild Mushroom "Risotto" with Clarified Consommé, Aged Parmesan, Shaved Melanosporum.
3. Palate Intermezzo (Course 3 / 4017 Canon): 4017 Classic Caesar Salad, Baby Gem Hearts, Confit Garlic Anchovy Dressing, Sourdough Croutons.
4. Seafood Feature (Course 4): Pan-Roasted Cornish Monkfish, Saffron Potato Mousseline, Charred Piquillo Reduction, Crispy Capers & Samphire.
5. Championship Viande (Course 5): English Hereford Beef Fillet, 72-Hour Rioja Reduction, Triple-Cooked Pont Neuf Batons, Roscoff Onion.
6. Whistle Finish (Course 6): Charred Basque Cheesecake, Wild English Blackberry & Vintage Pedro Ximénez Reduction.
7. Post-Match Tailgate (Course 7): 4017 Cumberland & Morcilla Roll, Spiced Bramley Apple Chutney, Matchday Sweets.

3. MOTHER PREPARATIONS CHECKLIST (SIGN-OFF REQUIRED BY 11:15 BEFORE 11:30 GUEST ARRIVAL):
1. Fluid Jamón & Cheddar Bechamel (Cooked out 12 mins, chilled & portioned, 1.8 kg)
2. Clarified Wild Mushroom Consommé (Double egg-white raft clarification, 4.5 L)
3. Confit Garlic & Anchovy Caesar Dressing (Classical emulsion, balanced salinity, 1.4 L)
4. Saffron Potato Mousseline (Infused La Mancha saffron, passed twice, 2.5 kg)
5. 72-Hour Rioja Beef Marrow Reduction (Mirror reduction, savoury acidity, 2.2 L)
6. Charred Piquillo Coulis & Quince Purée (Smooth, bright acid lift, 1.2 L + 500 g)

4. PROCUREMENT & YIELD TRACKING:
- Jamón Ibérico de Bellota: 1.5 kg sliced + bones → bechamel infusion → 55 croquetas.
- Acquerello Aged Carnaroli: 2.5 kg dry → 55 primi portions à 75g cooked.
- Cornish Monkfish: 6.5 kg whole loins → 55 medallions à 110g net yield.
- Hereford Beef Fillet: 7.5 kg center-cut → 55 center-cut steaks à 130g.
- Maris Piper Potatoes: 18.0 kg → 110 Pont Neuf batons + 2.5 kg saffron mousseline.`;

export const SESSION_4017_ENGLAND_SPAIN_MENU: MenuSession = {
  id: 'menu-session-4017-england-spain',
  title: 'Box 4017 — England v Spain (26 Sep 2026) | 50 Covers',
  serviceIdentifier: 'England v Spain International Match Day | 50 Covers (+10% Safety Buffer)',
  eventDate: '2026-09-26',
  currentStage: 'active_memory',
  source: {
    id: 'src-4017-england-spain-brief',
    type: 'pasted_text',
    fileName: 'Project_SIXES_England_v_Spain_26_Sep_2026_Working_Brief.pdf',
    rawContent: RAW_ENGLAND_SPAIN_BRIEF_TEXT,
    uploadedAt: '2026-09-26T08:00:00Z',
    verifiedByChef: true,
    verifiedAt: '2026-09-26T08:30:00Z',
    chefCorrectionsNote:
      'Verified in Level 4 Box 4017. 50-cover blueprint locked. 13:30 kick-off deadline ring-fenced. Pass call protocol: "Allergy check — Ticket count — Fire" enacted.',
  },
  courses: [
    {
      id: 'es-1',
      courseOrder: 1,
      courseName: 'Kick-off Reception (Amuse-Bouche)',
      dishName: 'Crispy Jamón Ibérico & Aged Cheddar Croqueta with Smoked Pimentón & Quince Purée',
      statedIngredients: [
        'Jamón Ibérico de Bellota',
        'Montgomery English Farmhouse Cheddar',
        'Bone-infused organic milk bechamel',
        'Fine panko breadcrumbs',
        'Smoked Pimentón de la Vera',
        'Quince purée',
      ],
      components: [
        'Fluid-centred jamón bechamel in delicate spherical shape',
        'Double-panéed ultra-crisp golden panko crust',
        'Tart smoked pimentón quince purée accent',
        'Micro sorrel leaf garnish',
      ],
      allergens: ['Milk/Dairy', 'Gluten/Wheat', 'Eggs'],
      dietaryNotes: ['One-bite molten contrast', 'Fast impact', 'Immediate pork and dairy savour'],
      temperatureType: 'Hot',
      estimatedPrepTimeMinutes: 3,
      station: 'Garde Manger',
    },
    {
      id: 'es-2',
      courseOrder: 2,
      courseName: 'Opening Movement (Course 2 / 4017 Canon)',
      dishName: 'Wild Mushroom "Risotto" with Clarified Consommé, Aged Parmesan & Melanosporum Truffle',
      statedIngredients: [
        'Acquerello aged Carnaroli rice',
        'Clarified wild mushroom consommé',
        'Mixed wild mushrooms (Chanterelles, Girolles)',
        '24-month Parmigiano-Reggiano',
        'Fresh black winter truffle (Melanosporum)',
        'Cold mantecato butter',
      ],
      components: [
        'All\'onda mantecato rice emulsion without cream',
        'Clarified double mushroom consommé broth base',
        'Pan-sautéed golden woodland mushrooms',
        'Tableside shaved black truffle',
      ],
      allergens: ['Milk/Dairy', 'Celery'],
      dietaryNotes: ['4017 Canon Invariant', 'Deep woodland umami', 'Vegetarian core'],
      temperatureType: 'Steaming',
      estimatedPrepTimeMinutes: 12,
      station: 'Entremetier',
    },
    {
      id: 'es-3',
      courseOrder: 3,
      courseName: 'Palate Intermezzo (Course 3 / 4017 Canon)',
      dishName: '4017 Classic Caesar Salad, Baby Gem Hearts, Confit Garlic Anchovy Dressing',
      statedIngredients: [
        'Baby Romaine hearts (ice shocked)',
        'Confit garlic & Cantabrian anchovy emulsion',
        'Cantabrian salted anchovies (Ortiz)',
        'Clarified butter sourdough croutons',
        '24-month Parmigiano ribbons',
        'Tellicherry black pepper & lemon zest',
      ],
      components: [
        'Crisp yellow-green inner Romaine leaves',
        'Velvety cold anchovy emulsion',
        'Golden crunchy sourdough croutons',
        'Split Cantabrian anchovy fillet',
      ],
      allergens: ['Fish', 'Milk/Dairy', 'Gluten/Wheat', 'Eggs', 'Mustard'],
      dietaryNotes: ['4017 Canon Invariant', 'Palate de-glazer', 'High acid & salinity reset'],
      temperatureType: 'Chilled',
      estimatedPrepTimeMinutes: 4,
      station: 'Garde Manger',
    },
    {
      id: 'es-4',
      courseOrder: 4,
      courseName: 'Seafood Feature (Course 4)',
      dishName: 'Pan-Roasted Cornish Monkfish, Saffron Potato Mousseline & Charred Piquillo Reduction',
      statedIngredients: [
        'Cornish monkfish loins (day-boat)',
        'Maris Piper potato mousseline with La Mancha saffron',
        'Charred Piquillo pepper reduction coulis',
        'Crispy salted capers',
        'Cornish samphire & sea fennel',
        'Lemon verbena oil',
      ],
      components: [
        'Brown-butter roasted monkfish medallion (54°C core)',
        'Silky golden saffron mousseline cushion',
        'Smoky sweet piquillo pepper reduction',
        'Crisp caper & samphire burst',
      ],
      allergens: ['Fish', 'Milk/Dairy'],
      dietaryNotes: ['Trans-Pyrenean dialogue', 'Atlantic fish craft', 'Shellfish-free seafood course'],
      temperatureType: 'Hot',
      estimatedPrepTimeMinutes: 11,
      station: 'Sauté',
    },
    {
      id: 'es-5',
      courseOrder: 5,
      courseName: 'Championship Viande (Course 5)',
      dishName: 'English Hereford Beef Fillet, 72-Hour Rioja Reduction & Triple-Cooked Pont Neuf Batons',
      statedIngredients: [
        'Center-cut 28-day aged Hereford beef fillet',
        'Rioja wine & roasted marrow reduction glaze',
        'Triple-cooked Maris Piper Pont Neuf batons',
        'Caramelised Roscoff onions',
        'Butter-wilted nutmeg spinach',
        'Roasted bone marrow crumb',
      ],
      components: [
        'Plancha-seared, combi-finished beef fillet (53.5°C plateau)',
        'Lacquered mirror-gloss Rioja glaze',
        'Shatteringly crisp Pont Neuf potato batons',
        'Sweet tender Roscoff onion & spinach cushion',
      ],
      allergens: ['Milk/Dairy', 'Sulphites', 'Gluten/Wheat'],
      dietaryNotes: ['Pre-match main event', 'Classical French-Iberian saucier craft', 'Precision core rest'],
      temperatureType: 'Hot',
      estimatedPrepTimeMinutes: 15,
      station: 'Grill/Rotisserie',
    },
    {
      id: 'es-6',
      courseOrder: 6,
      courseName: 'Whistle Finish (Course 6 — Dessert)',
      dishName: 'Charred Basque Cheesecake, English Blackberry & Vintage Pedro Ximénez Reduction',
      statedIngredients: [
        'Cream cheese & double cream custard',
        'Organic whole eggs & vanilla pod',
        'Wild English blackberries',
        'Pedro Ximénez vintage sherry',
        'Maldon sea salt flakes',
      ],
      components: [
        'Caramelised bitter-char top crust',
        'Velvety fluid custard center (served at 14°C)',
        'Glossy blackberry and PX reduction',
        'Maldon sea salt mineral crunch',
      ],
      allergens: ['Milk/Dairy', 'Eggs'],
      dietaryNotes: ['13:10 Pre-match wrap', 'Bittersweet contrast', 'Fluid center precision'],
      temperatureType: 'Warm',
      estimatedPrepTimeMinutes: 5,
      station: 'Garde Manger',
    },
    {
      id: 'es-7',
      courseOrder: 7,
      courseName: 'Post-Match Tailgate (Course 7)',
      dishName: '4017 Cumberland & Morcilla Roll with Spiced Bramley Apple Chutney',
      statedIngredients: [
        'Artisanal Cumberland sausage meat',
        'Spanish Morcilla de Burgos',
        'All-butter laminated puff pastry',
        'Spiced Bramley apple & cider vinegar chutney',
        'Toasted fennel & nigella seeds',
      ],
      components: [
        'Flaky golden puff pastry roll',
        'Juicy spiced sausage and blood pudding filling',
        'Sharp orchard apple chutney ramekin',
      ],
      allergens: ['Gluten/Wheat', 'Milk/Dairy', 'Eggs'],
      dietaryNotes: ['Full-time stadium return bite', 'Warm comfort', 'British-Spanish street elevation'],
      temperatureType: 'Hot',
      estimatedPrepTimeMinutes: 6,
      station: 'Garde Manger',
    },
  ],
  thoughtRecords: [
    {
      id: 'rec-es-01',
      field: 'culinary_intention',
      scope: 'MENU_LEVEL',
      promptGuidance: 'Core creative intention and arc across England v Spain matchday',
      content:
        'England v Spain is not an arbitrary fusion; it is an architectural dialogue between British pasture and coastal terroir (Cornish monkfish, Hereford beef, Montgomery cheddar) and the pinnacle of Spanish saucing, curing and viticultural discipline (Jamón Ibérico, saffron, Piquillo peppers, Rioja and Pedro Ximénez reductions). Held strictly to the 4017 Canon and the 13:30 pre-match deadline.',
      epistemicStatus: 'CHEF_INTENT',
      author: 'Chef Rod (Operator)',
      timestamp: '2026-09-26T08:15:00Z',
      version: 'v1.0-draft',
      isChefApproved: true,
      tags: ['Thematic Vision', 'Anglo-Iberian Dialogue', 'Pass Discipline'],
    },
    {
      id: 'rec-es-02',
      field: 'flavour_architecture',
      scope: 'DISH_LEVEL',
      targetDishId: 'es-1',
      targetDishName: 'Amuse-Bouche (Crispy Jamón & Cheddar Croqueta)',
      promptGuidance: 'Flavour architecture on opening bite',
      content:
        'The opening bite must trigger instant sensory arousal: high mechanical crunch from the fine panko shell, followed by a molten wave of rich, savory Jamón and cheddar bechamel, immediately cleansed by the sharp orchard fruit acidity of the quince and smoked pimentón purée.',
      epistemicStatus: 'CHEF_INTENT',
      author: 'Chef Rod (Operator)',
      timestamp: '2026-09-26T08:20:00Z',
      version: 'v1.0-draft',
      isChefApproved: true,
    },
    {
      id: 'rec-es-03',
      field: 'service_holding_constraints',
      scope: 'MENU_LEVEL',
      promptGuidance: 'Service timetable and kick-off protocol',
      content:
        'Guests seat from 11:30. Course 1 fires at 11:50; Course 2 at 12:10; Course 3 at 12:25; Course 4 at 12:40; Course 5 at 12:55; Course 6 at 13:10. All tables cleared by 13:20 for stadium bowl egress. Post-match savoury rolls fire at 90 minutes + stoppage time.',
      epistemicStatus: 'CHEF_INTENT',
      author: 'Chef Rod (Operator)',
      timestamp: '2026-09-26T08:25:00Z',
      version: 'v1.0-draft',
      isChefApproved: true,
      tags: ['Timing Hard Stop', '13:30 Kick-Off'],
    },
  ],
  crossTerrainInsights: [
    {
      id: 'ins-es-01',
      agent: 'SIXES',
      title: '13:30 Kick-Off Pass Compression Risk',
      observation:
        'Serving 50 covers of 5 plated courses between 11:50 and 13:15 leaves an average gap of only 15 minutes per course across 2 pass operators.',
      inquiryQuestion:
        'What contingency exists if guest arrival is delayed past 12:00? Do we compress course pacing or merge courses 3 & 4?',
      epistemicLabel: 'MODEL_SUGGESTION',
      riskSeverity: 'WARNING',
      suggestedAction:
        'Hold courses 3 and 4 in rapid-fire ready state; do not merge, but shorten clearing gap to 10 minutes if guests seat late.',
      chefResponse:
        'Pacing compresses; standards do not. Under no circumstances do we merge courses. Adam controls the rail with 10-minute cadence.',
      chefConfirmedIntent: true,
      chefAnsweredAt: '2026-09-26T08:35:00Z',
      status: 'CHEF_CONFIRMED',
    },
    {
      id: 'ins-es-02',
      agent: 'OCTAGON',
      title: 'Pass Call Protocol: "Allergy - Ticket - Fire"',
      observation:
        'Two guests in Table 3 have reported severe allium and crustacean allergies.',
      inquiryQuestion:
        'Is the dedicated allergen sauté station fully prepped with isolated pans, utensils, and non-allium sauce backups?',
      epistemicLabel: 'MODEL_INTERPRETATION',
      riskSeverity: 'CRITICAL',
      suggestedAction:
        'Require Chef sign-off on allergen pans and dedicated non-allium jus before firing Course 1.',
      chefResponse:
        'Verified in 11:15 mother prep sign-off. Blue-rimmed china deployed for Table 3. Pass protocol strictly enforced.',
      chefConfirmedIntent: true,
      chefAnsweredAt: '2026-09-26T08:40:00Z',
      status: 'CHEF_CONFIRMED',
    },
  ],
  chefSignOff: {
    approved: true,
    chefName: 'Chef Rod',
    signature: 'Rodney (Chef Operator & Tutor)',
    timestamp: '2026-09-26T08:45:00Z',
    version: 'v1.0-ENG-SPAIN-SIGNED-OFF',
    notes:
      'England v Spain blueprint approved for Box 4017. 50-cover baseline locked. 13:30 kick-off window ring-fenced. Adam kitchen print pack dispatched.',
  },
  createdAt: '2026-09-26T08:00:00Z',
  updatedAt: '2026-09-26T09:00:00Z',
};

export const TWIN_4017_ENGLAND_SPAIN: CulinaryTwinProject = {
  id: 'twin-4017-england-spain',
  code: '4017 — PROJECT SIXES',
  name: '4017 England v Spain (26 Sep 2026) — 50-Cover Working Brief & Blueprint',
  conceptHeadline:
    'The domain changes. The standard does not. Box 4017 50-Cover Michelin Blueprint • Anglo-Iberian Gastronomic Synthesis • 13:30 Kick-Off Window.',
  currentMode: 'intent_externalisation',
  governanceLevel: 'OPERATIONAL_COMMITTED',
  currentVersion: 'v1.0-CHEF-SIGNED-OFF',
  status: 'COMMITTED_OPERATIONAL',
  chefAuthor: 'Chef Rod (Operator & Tutor)',
  createdAt: '2026-09-26T08:00:00Z',
  updatedAt: '2026-09-26T09:00:00Z',
  productionBrief: PRODUCTION_BRIEF_4017_ENGLAND_SPAIN,
  teachingEdition: TEACHING_EDITION_4017_ENGLAND_SPAIN,
  marlowIntel: MARLOW_INTEL_4017_ENGLAND_SPAIN,
  serviceDebriefs: SERVICE_DEBRIEFS_4017_ENGLAND_SPAIN,
  activeMenuSession: SESSION_4017_ENGLAND_SPAIN_MENU,
  explorationTags: [
    {
      id: 'exp-es-1',
      type: 'HISTORICAL_LINEAGE',
      text: 'Anglo-Iberian Gastronomic Synthesis grounded in French Haute Saucier Foundations (Escoffier & Keller).',
      confidence: 0.99,
      provenanceRef: 'Project SIXES England v Spain Working Brief (26 Sep 2026)',
    },
    {
      id: 'exp-es-2',
      type: 'SPECULATIVE_PAIRING',
      text: 'Dual-Lineage Saucing: Saffron-infused mousseline paired with charred piquillo reduction and brown-butter monkfish.',
      confidence: 0.98,
      provenanceRef: 'Box 4017 Pass Architecture Lab',
    },
    {
      id: 'exp-es-3',
      type: 'HYPOTHESIS',
      text: 'Fluid bechamel croqueta core reaches optimal sensory release at 60–65°C core after 60-second rest from 185°C fry.',
      confidence: 0.97,
      provenanceRef: 'Thermodynamic Emulsion Matrix',
    },
  ],
  components: [
    {
      id: 'comp-es-monkfish',
      name: 'Cornish Monkfish Medallions',
      type: 'protein',
      description: 'Hand-trimmed Cornish monkfish loin medallions cured for 10 mins with fine sea salt, seared in brown butter to 54°C core.',
      yieldGrams: 55 * 110,
      ingredients: [
        {
          id: 'ing-es-monkfish',
          name: 'Cornish Monkfish Loins',
          quantity: 6500,
          unit: 'g',
          costPerUnit: 0.038,
          allergens: ['Fish'],
          moisturePercentage: 74.0,
          criticalTempLimit: {
            minSafeTemp: 52.0,
            maxHoldTemp: 56.0,
            denaturingTemp: 62.0,
          },
          provenance: 'Newlyn Day-Boat Fishery, Cornwall (Cert #NL-4017)',
        },
      ],
      transformations: [
        {
          id: 'tr-es-monkfish-sear',
          componentId: 'comp-es-monkfish',
          technique: 'Brown Butter Sear & Combi Precision Finish',
          mechanism: 'Gentle myosin coagulation with light surface Maillard reaction; combi steam at 135°C / 20% humidity prevents drying.',
          equipment: 'Rational iCombi Pro & Plancha',
          station: 'Sauté',
          targetTempC: 54.0,
          targetDurationMinutes: 7,
          moistureLossEstimatedPct: 5.5,
          criticalControlPoint: true,
          ccpCriteria: 'Core temperature pulled at 54°C; resting carryover to 57°C.',
          failureRisk: 'Rubbery texture if core exceeds 62°C.',
          recoveryAction: 'Baste with warm lemon-verbena brown butter to refresh surface gloss.',
        },
      ],
      holdingLimitMinutes: 6,
      holdingTempC: 54.0,
      sensoryProfile: {
        umami: 8,
        acid: 4,
        salt: 6,
        sweet: 7,
        bitter: 1,
        richness: 7,
        crunch: 6,
        herbaceous: 5,
      },
    },
    {
      id: 'comp-es-beef',
      name: 'Hereford Beef Fillet Center-Cut',
      type: 'protein',
      description: 'Center-cut dry-aged English Hereford beef tenderloin seared with marrow fat, finished to 53.5°C medium-rare plateau.',
      yieldGrams: 55 * 130,
      ingredients: [
        {
          id: 'ing-es-beef',
          name: 'Hereford Dry-Aged Beef Fillet',
          quantity: 7500,
          unit: 'g',
          costPerUnit: 0.048,
          allergens: [],
          moisturePercentage: 66.0,
          criticalTempLimit: {
            minSafeTemp: 52.0,
            maxHoldTemp: 55.0,
            denaturingTemp: 64.0,
          },
          provenance: 'Aubrey Allen / English Pasture Hereford (Cert #AA-ENG-01)',
        },
      ],
      transformations: [
        {
          id: 'tr-es-beef-sear',
          componentId: 'comp-es-beef',
          technique: 'High-Heat Plancha Sear & 6-Minute Rest Shield',
          mechanism: 'Rapid crust development on plancha; carryover heat equilibrates intracellular moisture during salamander shield rest.',
          equipment: 'Heavy Plancha & Salamander Shield',
          station: 'Grill/Rotisserie',
          targetTempC: 53.5,
          targetDurationMinutes: 10,
          moistureLossEstimatedPct: 6.0,
          criticalControlPoint: true,
          ccpCriteria: 'Internal resting plateau must reach 53.5°C ± 1°C.',
          failureRisk: 'Myoglobin bleed onto white plate if carved or served without full 6-minute rest.',
          recoveryAction: 'Dry-rest on wire rack before lacquer glaze application.',
        },
      ],
      holdingLimitMinutes: 8,
      holdingTempC: 53.5,
      sensoryProfile: {
        umami: 10,
        acid: 3,
        salt: 7,
        sweet: 3,
        bitter: 2,
        richness: 9,
        crunch: 7,
        herbaceous: 2,
      },
    },
  ],
  evidenceLedger: [
    {
      id: 'ev-es-01',
      type: 'measured_weight',
      title: 'Monkfish Portioning & Net Yield Audit',
      value: '6.5 kg gross loin → 6.05 kg portioned medallions (55 × 110g, 93.1% net yield)',
      provenance: 'Mettler Toledo Precision Balance #MT-4017 at Level 4 MEP',
      confidence: 0.99,
      recordedAt: '2026-09-26T08:20:00Z',
      author: 'Chef Rod (Operator)',
      isHypothesis: false,
    },
    {
      id: 'ev-es-02',
      type: 'temperature',
      title: 'Hereford Beef Fillet Core Rest Plateau',
      value: 53.6,
      unit: '°C',
      provenance: 'Thermapen Professional Needle Probe into fillet center',
      confidence: 0.99,
      recordedAt: '2026-09-26T12:56:00Z',
      author: 'Chef Rod (Operator)',
      isHypothesis: false,
    },
    {
      id: 'ev-es-03',
      type: 'sensory_observation',
      title: 'Basque Cheesecake Core Fluidity & Char Check',
      value: 'Fluid custard center at 14°C ambient; bitter mahogany caramelization on top ring',
      provenance: 'Chef Rod tasting spoon & digital refractometer (Brix 28.5)',
      confidence: 0.98,
      recordedAt: '2026-09-26T11:15:00Z',
      author: 'Chef Rod (Operator)',
      isHypothesis: false,
    },
  ],
  stopConditions: [
    {
      id: 'stop-es-kickoff',
      code: 'STOP-TIME-KICKOFF-1330',
      severity: 'SAFETY_CRITICAL',
      title: '13:30 Kick-Off Hard Stop Constraint',
      message: 'All 50 covers of pre-match dining must clear the pass by 13:15 to allow guest egress to stadium seats.',
      affectedEntities: ['Basque Cheesecake', 'Hereford Beef Fillet', 'Monkfish'],
      resolutionPath: 'Adam audits timing rail every 10 minutes; compress clearing gaps if seating delayed.',
      resolved: true,
      resolvedBy: 'Chef Rod (Operator)',
      resolvedAt: '2026-09-26T08:30:00Z',
      resolutionNote: '10-minute cadence enforced on pass rail; all mother preps validated at 11:15.',
    },
    {
      id: 'stop-es-pass-call',
      code: 'STOP-PASS-ALLERGY-CALL',
      severity: 'ALLERGEN_UNRESOLVED',
      title: 'Pass Call Protocol: "Allergy - Ticket - Fire"',
      message: 'Every ticket fired must begin with an explicit allergen status check before station leads call "Heard".',
      affectedEntities: ['Table 3 Allium & Crustacean exceptions', 'Entire Pass Line'],
      resolutionPath: 'Pass controller Adam calls "Table [X], covers [Y], ALLERGY CHECK, FIRE".',
      resolved: true,
      resolvedBy: 'Chef Rod (Operator)',
      resolvedAt: '2026-09-26T08:35:00Z',
      resolutionNote: 'Protocol briefed to Tia, Rahane, and Adam; blue-rimmed china deployed for exceptions.',
    },
  ],
  allergensConfirmed: true,
  haccpApproved: true,
  activeTickets: [
    {
      id: 'tkt-es-01',
      tableNumber: 'Box 4017 — VIP East Suite',
      covers: 25,
      course: 'Main',
      dietaries: ['2x Dairy-Free (no butter on monkfish)', '1x Gluten-Free'],
      orderTime: '12:00',
      fireTime: '12:45',
      stationProgress: [
        { station: 'Grill/Rotisserie', status: 'firing', timerRemainingSec: 180 },
        { station: 'Sauté', status: 'holding', timerRemainingSec: 0 },
        { station: 'Pass', status: 'pending', timerRemainingSec: 180 },
      ],
      status: 'FIRING',
    },
    {
      id: 'tkt-es-02',
      tableNumber: 'Box 4017 — FA & RFEF Delegation',
      covers: 25,
      course: 'Starter',
      dietaries: ['Blue-rimmed china deployed for allium-free'],
      orderTime: '11:45',
      fireTime: '12:00',
      stationProgress: [
        { station: 'Garde Manger', status: 'plated', timerRemainingSec: 0 },
        { station: 'Pass', status: 'plated', timerRemainingSec: 0 },
      ],
      status: 'DISPATCHED',
    },
  ],
  serviceObservations: [],
  revisions: [
    {
      version: 'v1.0-ENG-SPAIN-COMMITTED',
      timestamp: '2026-09-26T08:45:00Z',
      author: 'Chef Rod (Operator)',
      summary: 'Master 50-Cover Working Brief for England v Spain locked into digital twin system.',
      changes: [
        'Integrated England v Spain 7-course matchday progression (Amuse through Post-Match Roll).',
        'Codified 13:30 Kick-Off Hard Stop and 11:15 Mother Prep Sign-Off rules.',
        'Established "Allergy check — Ticket count — Fire" verbal pass protocol.',
        'Ring-fenced 4017 Canon (Wild Mushroom Risotto & Caesar Salad).',
      ],
      chefDecisionId: 'dec-es-01',
      status: 'COMMITTED_SERVICE',
    },
  ],
  decisions: [
    {
      id: 'dec-es-01',
      timestamp: '2026-09-26T08:45:00Z',
      chefName: 'Chef Rod (Operator)',
      action: 'COMMIT_TO_SERVICE',
      fromStatus: 'UNDER_INVESTIGATION',
      toStatus: 'COMMITTED_OPERATIONAL',
      rationale:
        'All 50-cover specs, mother preparations, and 13:30 kick-off pass protocols verified with brigade learners Rahane & Tia.',
      targetVersion: 'v1.0-ENG-SPAIN-COMMITTED',
      acknowledgedUncertainties: ['Single deep fat fryer batching speed', 'Guest arrival punctuality between 11:30 and 12:00'],
      digitalSignature: generateHash('CHEF_ROD_SIGN_ENGLAND_SPAIN_20260926'),
    },
  ],
  auditRecords: [
    {
      id: 'aud-es-01',
      timestamp: '2026-09-26T08:00:00Z',
      actor: 'Chef Rod (Operator)',
      actionType: 'SPEC_CREATED',
      details: 'Initialized Box 4017 England v Spain 50-Cover Working Production Brief & Teaching Edition.',
      previousHash: '0x000000000000',
      recordHash: generateHash('SX_ENG_SPAIN_SPEC_INIT_V1'),
      modeAtTime: 'intent_externalisation',
      epistemicTag: 'SOURCE_MENU',
    },
    {
      id: 'aud-es-02',
      timestamp: '2026-09-26T08:45:00Z',
      actor: 'Chef Rod (Operator)',
      actionType: 'CHEF_SIGN_OFF',
      details: 'Chef Rod committed England v Spain 50-cover production brief to operational status.',
      previousHash: generateHash('SX_ENG_SPAIN_SPEC_INIT_V1'),
      recordHash: generateHash('SX_ENG_SPAIN_COMMITTED_V1'),
      modeAtTime: 'intent_externalisation',
      epistemicTag: 'CHEF_DECISION',
    },
  ],
};
