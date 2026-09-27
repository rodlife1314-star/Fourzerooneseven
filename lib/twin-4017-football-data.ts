import {
  CulinaryTwinProject,
  MenuSession,
  ChefThoughtRecord,
  CrossTerrainAnalysis,
  LiveTicket,
  ServiceObservation,
  AuditRecord,
} from '@/types/culinary-twin';
import { PRODUCTION_BRIEF_4017_FOOTBALL } from './production-brief-4017-football';
import { TEACHING_EDITION_4017_FOOTBALL } from './teaching-edition-4017-football';
import { MARLOW_INTEL_4017_FOOTBALL } from './marlow-intel-4017-football';
import { SERVICE_DEBRIEFS_4017_FOOTBALL } from './service-debrief-4017-football';
import { generateHash } from './utils';

export const RAW_FOOTBALL_BRIEF_TEXT = `PROJECT SIXES — BOX 4017
USA COLLEGE FOOTBALL WEEKEND | 50-COVER PRODUCTION + TEACHING BLUEPRINT
Wembley National Stadium — Level 4, Box 4017 | Delaware North UK Showcase
Lead: Chef Rod (Tutor / Operator) | Brigade Learners: Rahane & Tia | Pass Controller: Adam

1. 4017 DOCTRINE:
- The domain changes. The standard does not.
- We set the standard, not the menu.
- 50 covers is the ring-fenced baseline: volume scales down, standards never scale down.
- Michelin-grade is the invariant floor.
- Edge Law: 95% defined domain terrain (senior chefs); 5% high-leverage Chef Rod execution & refinement.
- Assignment Football: Every cook knows their gap and assignment. Execution of assignment produces the result.
- Waste becomes flavour: 100% of native lobster shells extracted into roasted shell butter.
- Dual-sauce discipline: Sweet-smoky BBQ glaze on brisket surface; classical red-wine jus on plate.

2. SERVICE PROGRESSION (FOOTBALL FLOW):
1. Kick-off Reception (Amuse): Smoky BBQ Glazed Chicken Lollipop, Silky Roasted Cauliflower Purée, Crisp Chicken Skin, Smoked Pan Jus.
2. Opening Drive (Course 2 / 4017 Canon): Wild Mushroom "Risotto" with Wild Mushroom Consommé, Aged Parmesan, Shaved Black Truffle.
3. Moving the Chains (Course 3 / 4017 Canon): 4017 Classic Caesar Salad, Baby Gem, Confit Garlic Caesar Dressing, Garlic Croutons, Cantabrian Anchovies.
4. Red Zone Feature (Course 4): Native Lobster Roll, Warm Butter-Toasted Brioche, Lemon-Chive Mayonnaise, Roasted Lobster Shell Butter, Celery Heart, Lemon Zest.
5. Championship Selection A (Course 5): Kansas City-Style Beef Brisket, Kansas City BBQ Glaze Lacquer, Buttery Potato Purée, Charred Tenderstem Broccoli, Rich Red-Wine Jus.
6. Championship Selection B (Course 6): Herb-Crusted Rack of Lamb, Silky Jerusalem Artichoke Cream, Fondant Potato, Seasonal Vegetables, Minted Lamb Jus.
7. Touchdown Finish (Course 7): Fourth Quarter Chocolate Crémeux, NY Cheesecake, Jayhawk Harvest Crumble Tart.
8. Post-Match Tailgate (Course 8): 4017 All-Beef Hot Dog in Toasted Brioche, Caramelised Onions, Sharp Mustard, Smoked Ketchup, Crisp Shallots + Matchday Cookies & Spiced Popcorn.

3. MOTHER PREPARATIONS CHECKLIST (SIGN-OFF REQUIRED BEFORE SERVICE):
1. Cauliflower Purée (Silky, passed twice, 1.8 kg)
2. Wild Mushroom Consommé (Clarified, deeply aromatic, 4.5 L)
3. Caesar Dressing (Traditional emulsion, balanced acid/salinity, 1.5 L)
4. Lemon-Chive Mayonnaise (Cold-held, binding ratio, 1.2 kg)
5. Red-Wine Beef Jus (Mirror reduction, savoury acidity, 3.5 L)
6. Jerusalem Artichoke Cream + Minted Lamb Jus (Nutty & smooth, 3.0 kg + 2.5 L)

4. PROCUREMENT & YIELD TRACKING:
- Native Lobster: 10.0 kg ordered → target usable meat yield: 2.8–3.2 kg → shell butter extraction: 500 g.
- Rack of Lamb: 8.0 kg ordered → 55 French-trimmed cutlets → trimmings into minted jus.
- Peeled Jerusalem Artichokes: 3.0 kg → purée yield: 2.7 kg.
- Beef Brisket: 12.0 kg whole → 55 portions à 140 g.
- Maris Piper: 15.0 kg → 55 fondants + 4.5 kg purée.`;

export const SESSION_4017_FOOTBALL_MENU: MenuSession = {
  id: 'menu-session-4017-football',
  title: 'Box 4017 — USA College Football Weekend (50 Covers)',
  serviceIdentifier: 'USA College Football Game Day | 50 Covers (+10% Safety Buffer)',
  eventDate: '2026-09-15',
  currentStage: 'active_memory',
  source: {
    id: 'src-4017-football-brief',
    type: 'pasted_text',
    fileName: '4017_USA_College_Football_Weekend_50Covers_Blueprint.txt',
    rawContent: RAW_FOOTBALL_BRIEF_TEXT,
    uploadedAt: '2026-09-15T08:00:00Z',
    verifiedByChef: true,
    verifiedAt: '2026-09-15T08:30:00Z',
    chefCorrectionsNote:
      'Verified in Wembley 4th floor boardroom. 50-cover blueprint locked. 4017 Canon (Risotto & Caesar) ring-fenced. Teaching helix with Rahane & Tia integrated.',
  },
  courses: [
    {
      id: 'cfb-1',
      courseOrder: 1,
      courseName: 'Kick-off Reception (Amuse-Bouche)',
      dishName: 'Smoky BBQ Glazed Chicken Lollipop with Cauliflower Purée & Crispy Chicken Skin',
      statedIngredients: [
        'Chicken drumettes',
        'Smoky barbecue glaze',
        'Cauliflower purée',
        'Crispy chicken skin',
        'Smoked pan jus',
        'Thyme sea salt brine',
      ],
      components: [
        'French-trimmed drumette lacquered in clingy mahogany BBQ glaze',
        'Velvety browned-butter roasted cauliflower purée cushion',
        'Wafer-thin rendered glass-crisp chicken skin shard',
        'Concentrated smoked pan roasting jus droplets',
      ],
      allergens: ['Milk/Dairy', 'Celery'],
      dietaryNotes: ['Finger-clean or small bite spoon', 'Fast impact', 'Immediate wood smoke'],
      temperatureType: 'Hot',
      estimatedPrepTimeMinutes: 5,
      station: 'Sauté',
    },
    {
      id: 'cfb-2',
      courseOrder: 2,
      courseName: 'Opening Drive (Course 2 / 4017 Canon)',
      dishName: 'Wild Mushroom "Risotto" with Clarified Consommé & Black Truffle',
      statedIngredients: [
        'Acquerello Carnaroli rice',
        'Clarified wild mushroom consommé',
        'Sautéed wild mushrooms',
        '24-month Parmigiano-Reggiano',
        'Fresh black truffle',
        'Cultured butter',
      ],
      components: [
        'Flowing all’onda Carnaroli mantecato with al dente grain bite',
        'Crystal-clear 82°C clarified wild mushroom consommé moat',
        'Pan-roasted wild chanterelles and maitake mushrooms',
        'Tableside shaved fresh black truffle canopy',
      ],
      allergens: ['Milk/Dairy', 'Celery'],
      dietaryNotes: ['4017 Permanent Canon', 'Vegetarian adaptable', 'Deep earthy umami'],
      temperatureType: 'Steaming',
      estimatedPrepTimeMinutes: 12,
      station: 'Entremetier',
    },
    {
      id: 'cfb-3',
      courseOrder: 3,
      courseName: 'Moving the Chains (Course 3 / 4017 Canon)',
      dishName: '4017 Classic Caesar Salad with Confit Garlic Dressing & Cantabrian Anchovies',
      statedIngredients: [
        'Baby romaine inner hearts',
        'Confit garlic egg-yolk dressing',
        '24-month Parmigiano-Reggiano',
        'Sourdough garlic croutons',
        'Cantabrian anchovy fillets',
      ],
      components: [
        'Bone-dry chilled baby romaine hearts dressed à la minute',
        'Glossy yolk emulsion infused with confit garlic and anchovy paste',
        'Dry-crisp garlic-thyme butter sourdough crouton batons',
        'Translucent ribbons of Parmigiano and Ortiz anchovy fillets',
      ],
      allergens: ['Gluten/Wheat', 'Fish', 'Eggs', 'Milk/Dairy', 'Mustard'],
      dietaryNotes: ['4017 Permanent Canon', 'High salinity & acid reset', 'Cold temperature crack'],
      temperatureType: 'Chilled',
      estimatedPrepTimeMinutes: 6,
      station: 'Garde Manger',
    },
    {
      id: 'cfb-4',
      courseOrder: 4,
      courseName: 'Red Zone Feature (Course 4)',
      dishName: 'Native Lobster Roll with Roasted Shell Butter & Lemon-Chive Mayonnaise',
      statedIngredients: [
        'Native lobster',
        'Artisan brioche roll',
        'Roasted lobster shell butter',
        'Lemon & chive mayonnaise',
        'Celery heart brunoise',
        'Fresh chives & lemon zest',
      ],
      components: [
        'Sweet poached native lobster tail and claw medallions',
        'Warm top-split brioche roll griddled in roasted lobster shell butter',
        'Subordinate lemon-chive mayonnaise dressing (lobster > mayo)',
        'Fine celery heart crunch and micro chives',
      ],
      allergens: ['Crustaceans', 'Gluten/Wheat', 'Eggs', 'Milk/Dairy', 'Mustard'],
      dietaryNotes: ['Luxury American tailgate', 'Waste-to-flavour shell extraction', 'Warm/cool contrast'],
      temperatureType: 'Warm',
      estimatedPrepTimeMinutes: 8,
      station: 'Sauté',
    },
    {
      id: 'cfb-5',
      courseOrder: 5,
      courseName: 'Championship Selection A (Course 5)',
      dishName: 'Kansas City-Style Glazed Beef Brisket with Red-Wine Jus & Buttery Potato Purée',
      statedIngredients: [
        'Dry-aged beef brisket',
        'Kansas City barbecue lacquer glaze',
        'Rich red-wine veal jus',
        'Robuchon potato purée',
        'Charred tenderstem broccoli',
      ],
      components: [
        '10-hour braised brisket steak lacquered with sweet-smoky molasses glaze',
        '3-day reduced Cabernet Sauvignon veal bone jus on the plate',
        'Joël Robuchon-style 35% butter Maris Piper potato purée',
        'High-heat charred tenderstem broccoli spear',
      ],
      allergens: ['Milk/Dairy', 'Sulphites', 'Celery'],
      dietaryNotes: ['Dual Sauce Discipline (glaze on meat, jus on plate)', 'Extreme halftime holding stability'],
      temperatureType: 'Hot',
      estimatedPrepTimeMinutes: 14,
      station: 'Grill/Rotisserie',
    },
    {
      id: 'cfb-6',
      courseOrder: 6,
      courseName: 'Championship Selection B (Course 6)',
      dishName: 'Herb-Crusted Rack of Lamb with Jerusalem Artichoke Cream & Fondant Potato',
      statedIngredients: [
        'French-trimmed rack of lamb',
        'Aromatic herb crust',
        'Jerusalem artichoke cream',
        'Maris Piper fondant potato',
        'Classical minted lamb jus',
        'Glazed seasonal baby vegetables',
      ],
      components: [
        '54°C core rested rack of lamb coated in vivid green herb crust',
        'Pale ivory velvety Jerusalem artichoke purée',
        'Turned Maris Piper potato braised in duck fat, butter and stock',
        'Classical lamb reduction infused late with garden spearmint',
      ],
      allergens: ['Gluten/Wheat', 'Milk/Dairy', 'Mustard', 'Sulphites', 'Celery'],
      dietaryNotes: ['Classical French craft', 'Core temperature probed (54°C)', 'Natural spearmint infusion'],
      temperatureType: 'Hot',
      estimatedPrepTimeMinutes: 14,
      station: 'Grill/Rotisserie',
    },
    {
      id: 'cfb-7',
      courseOrder: 7,
      courseName: 'Touchdown Finish (Course 7 — Desserts)',
      dishName: 'Fourth Quarter Chocolate, New York Cheesecake & Jayhawk Harvest Tart',
      statedIngredients: [
        'Valrhona 70% Guanaja chocolate crémeux',
        'Salted butter caramel',
        'Baked cream cheese',
        'Sour cream glaze',
        'Bramley apple & pear compote',
        'Brown butter oat crumble',
      ],
      components: [
        'Fourth Quarter Chocolate: bittersweet crémeux bar with salted caramel and cocoa nibs',
        'New York Cheesecake: dense baked vanilla cream cheese wedge with berry compote',
        'Jayhawk Tart: spiced autumn fruit with brown butter crumble and bourbon maple caramel',
      ],
      allergens: ['Gluten/Wheat', 'Milk/Dairy', 'Eggs', 'Soybeans'],
      dietaryNotes: ['Closing drive indulgence', 'Carryover baking precision', 'All-American dessert trio'],
      temperatureType: 'Chilled',
      estimatedPrepTimeMinutes: 8,
      station: 'Garde Manger',
    },
    {
      id: 'cfb-8',
      courseOrder: 8,
      courseName: 'Post-Match Tailgate (Course 8)',
      dishName: '4017 All-Beef Hot Dog with Caramelised Onions, Smoked Ketchup & Matchday Sweets',
      statedIngredients: [
        'Artisanal all-beef smoked frankfurters',
        'Toasted brioche finger rolls',
        'Cider-braised caramelised onions',
        'House-smoked ketchup',
        'Sharp mustard blend',
        'Crispy shallot rings',
        'Warm chocolate chip cookies & spiced popcorn',
      ],
      components: [
        'Natural casing smoked frankfurter poached in spiced liquor with snapping bite',
        'Golden griddled brioche finger roll cradle',
        'Sweet cider-braised onions and razor-sharp condiment balance',
        'Crisp golden shallot ring crunch crown',
        'Matchday warm bakery cookies and fresh stadium spiced popcorn',
      ],
      allergens: ['Gluten/Wheat', 'Eggs', 'Milk/Dairy', 'Mustard'],
      dietaryNotes: ['Return to the stands', 'No ingredient beneath proper execution', 'Authentic tailgate celebration'],
      temperatureType: 'Hot',
      estimatedPrepTimeMinutes: 5,
      station: 'Pass',
    },
  ],
  thoughtRecords: [
    {
      id: 'th-fb-01',
      field: 'culinary_intention',
      scope: 'MENU_LEVEL',
      promptGuidance: 'Core operating philosophy and football progression grammar',
      content:
        'The USA College Football domain is not an excuse for casual stadium shortcuts. Box 4017 sets the standard, not the menu. The football matchday flow (Kick-off → Opening Drive → Moving the Chains → Red Zone → Championship → Touchdown → Post-Match) provides our narrative grammar, while 4017 execution maintains the Michelin-grade invariant floor.',
      epistemicStatus: 'CHEF_INTENT',
      author: 'Chef Rod',
      timestamp: '2026-09-15T08:35:00Z',
      version: 'v1.0-USA-FOOTBALL',
      isChefApproved: true,
    },
    {
      id: 'th-fb-02',
      field: 'production_logic',
      scope: 'MENU_LEVEL',
      promptGuidance: '50-cover blueprint and mother prep sign-offs',
      content:
        'The 50-cover blueprint is absolute. We scale production volume down, never standards. Mother preparations (cauliflower purée, consommé, Caesar dressing, lemon mayo, red-wine jus, artichoke cream + lamb jus) must be signed off prior to firing. 100% of lobster shells are extracted into butter (waste becomes flavour). Dual sauces on the brisket are strictly separated: sweet lacquer on surface, savoury jus on plate.',
      epistemicStatus: 'CHEF_INTENT',
      author: 'Chef Rod',
      timestamp: '2026-09-15T08:45:00Z',
      version: 'v1.0-USA-FOOTBALL',
      isChefApproved: true,
    },
    {
      id: 'th-fb-03',
      field: 'classical_lineage',
      scope: 'MENU_LEVEL',
      promptGuidance: '4017 Canon invariance and assignment football pedagogy',
      content:
        'Wild Mushroom Risotto and Classic Caesar Salad are designated as permanent 4017 Canon. They do not bend to changing domain themes. In addition, the assignment football pedagogy models kitchen brigades after football teams: Rahane and Tia have defined gap and route assignments.',
      epistemicStatus: 'CHEF_INTENT',
      author: 'Chef Rod',
      timestamp: '2026-09-15T08:50:00Z',
      version: 'v1.0-USA-FOOTBALL',
      isChefApproved: true,
    },
  ],
  crossTerrainInsights: [
    {
      id: 'ins-fb-01',
      agent: 'COPILOT',
      title: 'Halftime Peak 15-Minute Rush Plating Architecture',
      observation:
        '38 main courses must fire within a 12-minute window. Pan-searing proteins à la minute at the pass would produce an insurmountable 9-minute delay.',
      inquiryQuestion:
        'Has the brisket been pre-pressed and portioned cold for combi-glazing, and are heated thermos pumps staged for both jus reductions?',
      epistemicLabel: 'CHEF_DECISION',
      riskSeverity: 'CRITICAL',
      suggestedAction:
        'Commit to combi-oven re-glazing at 220°C and double-pump saucing station; eliminate all pass pan searing.',
      status: 'CHEF_CONFIRMED',
    },
    {
      id: 'ins-fb-02',
      agent: 'HERMES',
      title: 'Waste-to-Flavour Shell Extraction Protocol',
      observation:
        '10 kg of native lobster will generate over 6 kg of heads, legs, and shells. Discarding them would represent massive lost flavour equity.',
      inquiryQuestion:
        'Can all shells be roasted with shallots and Cognac into concentrated lobster butter for basting rolls and finishing sauces?',
      epistemicLabel: 'CHEF_INTENT',
      riskSeverity: 'INFO',
      suggestedAction:
        'Formalise roasted shell butter extraction into Adam’s production brief as a compulsory mother prep.',
      status: 'CHEF_CONFIRMED',
    },
  ],
  chefSignOff: {
    approved: true,
    chefName: 'Chef Rod',
    signature: 'Rodney (Chef Operator & Tutor)',
    timestamp: '2026-09-15T08:30:00Z',
    version: 'v1.0-USA-FOOTBALL',
    notes:
      'USA College Football Weekend blueprint approved. 50-cover ring-fence locked. 4017 Canon invariant. Adam execution pack ready for kitchen printing.',
  },
  createdAt: '2026-09-15T08:00:00Z',
  updatedAt: '2026-09-15T09:00:00Z',
};

export const TWIN_4017_FOOTBALL: CulinaryTwinProject = {
  id: 'twin-4017-football',
  code: '4017 — PROJECT SIXES',
  name: '4017 USA College Football Weekend — 50-Cover Production + Teaching Blueprint',
  conceptHeadline:
    'The domain changes. The standard does not. We set the standard, not the menu. 50-Cover Blueprint • 95% Defined Domain + 5% High-Leverage Execution.',
  currentMode: 'intent_externalisation',
  governanceLevel: 'OPERATIONAL_COMMITTED',
  currentVersion: 'v1.0-CHEF-SIGNED-OFF',
  status: 'COMMITTED_OPERATIONAL',
  chefAuthor: 'Chef Rod (Operator & Tutor)',
  createdAt: '2026-09-15T08:00:00Z',
  updatedAt: '2026-09-15T09:30:00Z',
  productionBrief: PRODUCTION_BRIEF_4017_FOOTBALL,
  teachingEdition: TEACHING_EDITION_4017_FOOTBALL,
  marlowIntel: MARLOW_INTEL_4017_FOOTBALL,
  serviceDebriefs: SERVICE_DEBRIEFS_4017_FOOTBALL,
  activeMenuSession: SESSION_4017_FOOTBALL_MENU,
  explorationTags: [
    {
      id: 'exp-fb-1',
      type: 'HISTORICAL_LINEAGE',
      text: 'American Barbecue & Tailgate Culture translated through Classical French Saucier Foundations (Escoffier & Keller).',
      confidence: 0.99,
      provenanceRef: 'Project SIXES Domain Translation Doctrine',
    },
    {
      id: 'exp-fb-2',
      type: 'SPECULATIVE_PAIRING',
      text: 'Dual-Sauce System: Sweet-smoky Kansas City surface lacquer paired with 3-day Cabernet Sauvignon veal bone reduction.',
      confidence: 0.98,
      provenanceRef: 'Box 4017 Pass Architecture Lab',
    },
    {
      id: 'exp-fb-3',
      type: 'HYPOTHESIS',
      text: '100% extraction of native lobster shells into roasted butter delivers volatile pyrazine aromatics directly to warm brioche crust.',
      confidence: 0.97,
      provenanceRef: 'Waste-to-Flavour Extraction Metric',
    },
  ],
  components: [
    {
      id: 'comp-fb-brisket',
      name: 'Kansas City-Style Glazed Beef Brisket',
      type: 'protein',
      description: 'Slow-braised dry-aged beef brisket, pressed cold, portioned into 140g blocks, lacquered in 220°C combi with Kansas City glaze.',
      yieldGrams: 55 * 140,
      ingredients: [
        {
          id: 'ing-fb-brisket',
          name: 'British Dry-Aged Beef Brisket',
          quantity: 12000,
          unit: 'g',
          costPerUnit: 0.016,
          allergens: [],
          moisturePercentage: 62.0,
          criticalTempLimit: {
            minSafeTemp: 74.0,
            maxHoldTemp: 75.0,
            denaturingTemp: 94.0,
          },
          provenance: 'Aubrey Allen / British Heritage Breed (Cert #AA-4017)',
        },
      ],
      transformations: [
        {
          id: 'tr-fb-brisket-braise',
          componentId: 'comp-fb-brisket',
          technique: 'Sub-Boil Collagen Braise & Cold Press',
          mechanism: 'Collagen triple-helix conversion into soluble gelatin at 92°C across 10 hours; light weighted press to stabilise slicing geometry.',
          equipment: 'Rational iCombi Pro (HACCP Logged)',
          station: 'Grill/Rotisserie',
          targetTempC: 92.0,
          targetDurationMinutes: 600,
          moistureLossEstimatedPct: 24.0,
          criticalControlPoint: true,
          ccpCriteria: 'Core temperature reaches >= 93.0°C; held above 70°C before cold shock.',
          failureRisk: 'Shredding if sliced warm without pressing; drying out if over-ventilated.',
          recoveryAction: 'Baste with warm braising liquor and re-lacquer in combi.',
        },
      ],
      holdingLimitMinutes: 45,
      holdingTempC: 68.0,
      sensoryProfile: {
        umami: 10,
        acid: 6,
        salt: 7,
        sweet: 6,
        bitter: 2,
        richness: 9,
        crunch: 4,
        herbaceous: 3,
      },
    },
    {
      id: 'comp-fb-lobster',
      name: 'Native Lobster in Shell Butter & Lemon-Chive Mayo',
      type: 'protein',
      description: 'Gently poached native lobster tail and claw medallions folded with lemon-chive mayo and basted in roasted shell butter.',
      yieldGrams: 3000,
      ingredients: [
        {
          id: 'ing-fb-lobster',
          name: 'Live Native Lobster',
          quantity: 10000,
          unit: 'g',
          costPerUnit: 0.045,
          allergens: ['Crustaceans'],
          moisturePercentage: 76.0,
          criticalTempLimit: {
            minSafeTemp: 60.0,
            maxHoldTemp: 62.0,
            denaturingTemp: 68.0,
          },
          provenance: 'Cornish Day-Boat Fishery (Cert #CB-99)',
        },
      ],
      transformations: [
        {
          id: 'tr-fb-lobster-poach',
          componentId: 'comp-fb-lobster',
          technique: 'Court-Bouillon Precision Immersion',
          mechanism: 'Myosin coagulation without actin toughening; claws poached 8 mins, tails 7 mins at 60°C.',
          equipment: 'Induction Stock Pot / Water Bath',
          station: 'Sauté',
          targetTempC: 60.0,
          targetDurationMinutes: 8,
          moistureLossEstimatedPct: 4.5,
          criticalControlPoint: true,
          ccpCriteria: 'Rapid ice shock after poaching to prevent rubbery texture.',
          failureRisk: 'Rubberiness if water exceeds 68°C.',
          recoveryAction: 'Divert any overcooked trim into warm bisque or lobster butter extraction.',
        },
      ],
      holdingLimitMinutes: 120,
      holdingTempC: 3.0,
      sensoryProfile: {
        umami: 8,
        acid: 5,
        salt: 6,
        sweet: 8,
        bitter: 1,
        richness: 7,
        crunch: 5,
        herbaceous: 4,
      },
    },
  ],
  evidenceLedger: [
    {
      id: 'ev-fb-01',
      type: 'measured_weight',
      title: 'Native Lobster Delivery & Yield Audit',
      value: '10.0 kg gross → 2.92 kg picked succulent meat (29.2% yield) + 520 g shell butter',
      provenance: 'Mettler Toledo Precision Balance #MT-4017 at Wembley Box 4017 MEP',
      confidence: 0.99,
      recordedAt: '2026-09-15T08:15:00Z',
      author: 'Chef Rod (Operator)',
      isHypothesis: false,
    },
    {
      id: 'ev-fb-02',
      type: 'temperature',
      title: 'Rack of Lamb Core Rest Plateau',
      value: 54.2,
      unit: '°C',
      provenance: 'Thermapen Professional Needle Probe into rack best end',
      confidence: 0.99,
      recordedAt: '2026-09-15T15:48:00Z',
      author: 'Chef Rod (Operator)',
      isHypothesis: false,
    },
    {
      id: 'ev-fb-03',
      type: 'historical_ref',
      title: 'Larousse Gastronomique Consommé Clarification Benchmark',
      value: 'Egg-white raft clarification of double mushroom stock at 88°C sub-boil',
      provenance: 'Larousse Gastronomique 1938, p. 344 (Consommés doubles)',
      confidence: 0.98,
      recordedAt: '2026-09-15T08:20:00Z',
      author: 'Chef Rod (Operator)',
      isHypothesis: false,
    },
  ],
  stopConditions: [
    {
      id: 'stop-fb-crustacean',
      code: 'STOP-ALLERGEN-CRUSTACEAN',
      severity: 'ALLERGEN_UNRESOLVED',
      title: 'Native Lobster Shell & Shellfish Cross-Contact Isolation',
      message: 'Ensure separate pans, cutting boards, and spoons are strictly isolated between lobster roll station and any seafood allergy orders.',
      affectedEntities: ['Native Lobster Roll', 'Roasted Lobster Shell Butter'],
      resolutionPath: 'Dedicated non-shellfish preparation area and colour-coded equipment verified by Chef Rod.',
      resolved: true,
      resolvedBy: 'Chef Rod (Operator)',
      resolvedAt: '2026-09-15T08:40:00Z',
      resolutionNote: 'Dedicated non-shellfish sauté pan and station isolated in Garde Manger backup.',
    },
  ],
  allergensConfirmed: true,
  haccpApproved: true,
  activeTickets: [
    {
      id: 'tkt-fb-01',
      tableNumber: 'Box 4017 — North Terrace',
      covers: 25,
      course: 'Main',
      dietaries: ['1x Gluten-Free (no breadcrumbs on lamb rack)'],
      orderTime: '15:30',
      fireTime: '15:45',
      stationProgress: [
        { station: 'Grill/Rotisserie', status: 'firing', timerRemainingSec: 240 },
        { station: 'Entremetier', status: 'holding', timerRemainingSec: 0 },
        { station: 'Pass', status: 'pending', timerRemainingSec: 240 },
      ],
      status: 'FIRING',
    },
    {
      id: 'tkt-fb-02',
      tableNumber: 'Box 4017 — South Suite',
      covers: 25,
      course: 'Starter',
      dietaries: [],
      orderTime: '15:00',
      fireTime: '15:10',
      stationProgress: [
        { station: 'Sauté', status: 'plated', timerRemainingSec: 0 },
        { station: 'Pass', status: 'plated', timerRemainingSec: 0 },
      ],
      status: 'DISPATCHED',
    },
  ],
  serviceObservations: [],
  revisions: [],
  decisions: [
    {
      id: 'dec-fb-01',
      timestamp: '2026-09-15T08:30:00Z',
      chefName: 'Chef Rod',
      action: 'COMMIT_TO_SERVICE',
      fromStatus: 'UNDER_INVESTIGATION',
      toStatus: 'COMMITTED_OPERATIONAL',
      rationale:
        'Formalised Wild Mushroom Risotto and Classic Caesar Salad as invariant 4017 Canon. 50-cover blueprint locked. The domain changes; the standard does not.',
      targetVersion: 'v1.0-CHEF-SIGNED-OFF',
      acknowledgedUncertainties: ['Brioche griddling batch speed on plancha during course 4'],
      digitalSignature: 'SIG-CHEF-ROD-4017-USA-FOOTBALL-V1',
    },
  ],
  auditRecords: [
    {
      id: 'aud-fb-01',
      timestamp: '2026-09-15T08:00:00Z',
      actor: 'Chef Rod (Operator & Tutor)',
      actionType: 'SPEC_CREATED',
      details: 'Initialized Box 4017 USA College Football Weekend 50-Cover Production + Teaching Blueprint in Wembley 4th Floor Boardroom.',
      previousHash: '0x000000000000',
      recordHash: generateHash('4017_USA_COLLEGE_FOOTBALL_INIT'),
      modeAtTime: 'intent_externalisation',
      epistemicTag: 'CHEF_DECISION',
    },
  ],
};
