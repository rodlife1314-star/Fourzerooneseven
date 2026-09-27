// 4017 Project SIXES — Six-Chapter Teaching Edition
// Sourced from Chef Rod & Alice's architectural breakthrough session
// Epistemic coordinate: C0 = (t0, x0, a0, o0)

export interface TeachingChapter {
  number: string;
  title: string;
  subtitle: string;
  arcTheme: string;
  arcSummary: string;
  identity: string;
  why: string;
  larousse: string;
  escoffier: string;
  edgeFixed: string;
  edgeAdaptive: string;
  middleConstruction: string;
  geometry: string;
  palateConclusion: string;
  questions: string[];
  positiveDelta: string;
}

export interface TeachingEdition4017 {
  title: string;
  subtitle: string;
  operatingDoctrine: string;
  epistemicFormula: string;
  epistemicHierarchy: {
    authority: string;
    role: string;
    principle: string;
  }[];
  doubleHelixFormula: string;
  couplingEquation: string;
  startingCoordinate: {
    id: string;
    t0: string;
    description: string;
    actors: string[];
    operationalOutcome: string;
    verificationHash: string;
  };
  chapters: TeachingChapter[];
  menuArc: {
    stage: string;
    chapterNumber: string;
    dish: string;
    description: string;
  }[];
  skeletonDoctrine: string[];
}

export const TEACHING_EDITION_4017: TeachingEdition4017 = {
  "title": "4017 — PROJECT SIXES",
  "subtitle": "Six-Chapter Teaching + Service Architecture | Tier 1 | 50 Covers",
  "operatingDoctrine": "Tier 1 sets the standard. The menu conforms to the standard. 4017 does not teach recipes in isolation. It teaches: Heritage → Why → Ingredient Truth → Technique → Refinement → Service → Reflection. The cultural domain may change. The skeleton does not.",
  "epistemicFormula": "Y_4017 = S_4017 + D_domain",
  "epistemicHierarchy": [
    {
      "authority": "Indian Tradition",
      "role": "Primary Cultural Authority",
      "principle": "Flavour lineage, spice sequence, authentic heritage, and cultural respect."
    },
    {
      "authority": "Larousse Gastronomique",
      "role": "Comparative Technical Lens",
      "principle": "Canonical ingredient truth, classical culinary science, and physical properties."
    },
    {
      "authority": "Thomas Keller / French Laundry",
      "role": "Precision & Refinement Lens",
      "principle": "Restraint, geometric clarity, plate stability, and palate balance."
    },
    {
      "authority": "Chef Rod / 4017",
      "role": "Execution & Teaching Architecture",
      "principle": "Brigade order, 95/5 rule, live pass discipline, and pedagogical transmission."
    }
  ],
  "doubleHelixFormula": "H_4017(D) = P(θ) ⊕ T(θ)",
  "couplingEquation": "O = f(P, T, D, F)  ⟹  F ⟶ ΔP + ΔT  ⟹  (P_{n+1}, T_{n+1}) = (P_n, T_n) + Δ(F_n)",
  "startingCoordinate": {
    "id": "COORD-SIXES-C0",
    "t0": "2026-09-10T05:31:00Z / 08:30 BST Meeting",
    "description": "The moment Project SIXES entered the physical human chain as a verified operational artifact.",
    "actors": [
      "Chef Rod",
      "Adam (Head of Food / Production)",
      "Harry (Operations / Director)"
    ],
    "operationalOutcome": "Adam printed two physical copies of the Project SIXES 50-Cover Brief. Chef Rod placed one copy in front of Harry during the sit-down meeting, converting the digital twin into an active operational contract.",
    "verificationHash": "0x4017_C0_ORIGIN_WEMBLEY_SIXES_ALPHA"
  },
  "chapters": [
    {
      "number": "I",
      "title": "SEEKH KEBAB",
      "subtitle": "Mint Raita • Chilli & Coriander Chutney",
      "arcTheme": "Fire",
      "arcSummary": "The guest enters through char, spice and freshness.",
      "identity": "This chapter establishes the vocabulary immediately:\n\n**meat • spice • char • yoghurt • herb • chilli**\n\nSeekh kebab carries a direct relationship with fire.\n\nThe opening plate should therefore feel confident rather than decorative.\n\nThe kebab leads.\n\nThe sauces support.\n\n---",
      "why": "Seekh-style cookery depends upon seasoned minced meat formed around a skewer and exposed to intense heat.\n\nIts identity comes from:\n\n- spice\n- fat\n- seasoning\n- smoke\n- browning\n- juiciness\n\nThe teaching question is therefore:\n\n**How do we create a strongly seasoned exterior while protecting moisture inside?**\n\nThe accompaniments provide contrast rather than competition.\n\n---",
      "larousse": "Minced meat behaves differently from an intact muscle.\n\nTexture depends upon:\n\n- meat-to-fat ratio\n- degree of working\n- temperature\n- seasoning\n- skewer adhesion\n- cooking intensity\n\nOverworking creates density.\n\nInsufficient working creates poor cohesion.\n\nThe cook must understand the physical structure before considering presentation.\n\n---",
      "escoffier": "For 50 covers:\n\n- kebabs must be portioned consistently\n- seasoning must be batch-controlled\n- skewers must be uniform\n- firing sequence must be established\n- raita and chutney must be produced ahead and held cold\n- service quantities must be predetermined\n\nThe two sauces have separate jobs.\n\nThe mint raita is cooling and extending.\n\nThe chilli-coriander chutney is sharp and lifting.\n\nThe brief deliberately defines them as two separate functions rather than two generic sauces. fileciteturn3file0L52-L81\n\n---",
      "edgeFixed": "- kebab remains dominant\n- clean char\n- moist interior\n- defined seasoning\n- mint-led raita\n- bright coriander chutney\n- no watery yoghurt\n- no bitter herb purée\n- controlled sauce placement",
      "edgeAdaptive": "- final chilli intensity\n- exact char\n- acid balance\n- sauce quantity\n- garnish placement\n- firing sequence\n\n\\[\n\\boxed{\\text{Speed never becomes authority}}\n\\]\n\n---",
      "middleConstruction": "THE MIDDLE — CONSTRUCTION\n\n### Mint Raita\n\nIts purpose is not decoration.\n\nIt performs cooling, lubrication and palate extension.\n\nThe cucumber must be squeezed dry so excess water does not destabilise the yoghurt.\n\nMint leads.\n\nCumin sits behind it.\n\nLime provides freshness rather than sourness.\n\n### Chilli & Coriander Chutney\n\nThis provides:\n\n- fresh herb character\n- chilli\n- ginger\n- acidity\n- aromatic lift\n\nIt must remain vivid green and smooth.\n\nThe chutney should sharpen the mouth after the richness of the kebab.\n\n---\n\n##",
      "geometry": "\\[\n\\boxed{\n\\text{Kebab focal point}\n\\rightarrow\n\\text{Raita}\n\\rightarrow\n\\text{Chutney}\n\\rightarrow\n\\text{fresh finish}\n}\n\\]\n\nThe guest reads the meat first.\n\n---",
      "palateConclusion": "\\[\n\\text{Char}\n\\rightarrow\n\\text{spice}\n\\rightarrow\n\\text{richness}\n\\rightarrow\n\\text{cooling}\n\\rightarrow\n\\text{herbal lift}\n\\]\n\nThe chapter concludes cleanly enough to invite the next plate.\n\n---",
      "questions": [
        "Why is the dish structured with this specific sequence?",
        "Why does this refinement preserve the dish rather than Westernise it?",
        "Why is this cooking medium and heat level selected for this cut?"
      ],
      "positiveDelta": "\\[\n\\boxed{\n\\text{Kebab + sauces}\n\\rightarrow\n\\text{defined fire, cooling and freshness architecture}\n}\n\\]\n\n---"
    },
    {
      "number": "II",
      "title": "TANDOORI-SPICED SCALLOP",
      "subtitle": "Pea & Mint Purée • Tamarind Reduction • Crispy Curry Leaf • Sorrel",
      "arcTheme": "Precision",
      "arcSummary": "Fire becomes controlled delicacy.",
      "identity": "The first impression:\n\n**sweet scallop → tandoori aroma → caramelised surface**\n\nThe scallop remains the principal ingredient.\n\nThe Indian domain enters through flavour architecture.\n\nIt must never bury the shellfish.\n\n---",
      "why": "Tandoori flavour traditionally draws power from:\n\n- intense heat\n- yoghurt\n- aromatic spice\n- char\n- smoke\n- dry surface cookery\n\nBut the scallop is structurally delicate.\n\nTherefore:\n\n\\[\n\\boxed{\n\\text{Preserve flavour identity}\n\\neq\n\\text{copy process literally}\n}\n\\]\n\n---",
      "larousse": "Scallop requires:\n\n- dryness\n- very high heat\n- short cooking\n- caramelisation\n- retained moisture\n- translucent centre\n\nThe ingredient dictates the cook.\n\n---",
      "escoffier": "For 50 covers:\n\n- 55 scallops\n- uniform grading\n- controlled marinade\n- 20–30 minute maximum contact\n- excess marinade removed\n- defined presentation face\n- controlled firing batches\n\nThe production brief specifically establishes this short marinade and high-heat sear. fileciteturn3file0L82-L110\n\n---",
      "edgeFixed": "- scallop remains focal\n- short marinade\n- dry cooking surface\n- strong caramelisation\n- succulent centre\n- vivid pea purée\n- sharp tamarind\n- crisp curry leaf\n- controlled geometry",
      "edgeAdaptive": "- scallop size\n- pan heat\n- firing duration\n- final acid\n- purée quantity\n- micro-herb placement\n\n---\n\n# THE MIDDLE — CONSTRUCTION",
      "middleConstruction": "THE MIDDLE — CONSTRUCTION\n\n## Tandoori Scallop\n\nToo much wet marinade produces steam.\n\n\\[\n\\text{wet surface}\n\\rightarrow\n\\text{steam}\n\\rightarrow\n\\text{poor browning}\n\\]\n\nWhereas:\n\n\\[\n\\text{dry surface}\n+\n\\text{high heat}\n\\rightarrow\n\\text{caramelisation}\n\\]\n\n## Pea & Mint Purée\n\nFunction:\n\n- sweetness\n- freshness\n- colour\n- plate stability\n- moisture\n\nMint is added late.\n\nAcid controls sweetness.\n\n## Tamarind Reduction\n\nFunction:\n\n\\[\n\\text{acid}\n+\n\\text{fruit depth}\n\\rightarrow\n\\text{balance}\n\\]\n\nIt cuts through both scallop and pea sweetness.\n\nIt must never become jam.\n\n## Crispy Curry Leaf\n\nAroma.\n\nTexture.\n\nIdentity.\n\nPunctuation.\n\n---\n\n##",
      "geometry": "\\[\n\\boxed{\n\\text{Purée}\n\\rightarrow\n\\text{Scallop}\n\\rightarrow\n\\text{Tamarind}\n\\rightarrow\n\\text{Curry leaf}\n}\n\\]\n\n---",
      "palateConclusion": "\\[\n\\text{Sweet}\n\\rightarrow\n\\text{Spiced}\n\\rightarrow\n\\text{Fresh}\n\\rightarrow\n\\text{Acid}\n\\rightarrow\n\\text{Aromatic resolution}\n\\]\n\n---",
      "questions": [
        "Why is the dish structured with this specific sequence?",
        "Why does this refinement preserve the dish rather than Westernise it?",
        "Why is this cooking medium and heat level selected for this cut?"
      ],
      "positiveDelta": "\\[\n\\boxed{\n\\text{Indian-spiced scallop}\n\\rightarrow\n\\text{technically controlled tandoori expression}\n}\n\\]\n\n---"
    },
    {
      "number": "III",
      "title": "PUNJABI MURG MAKHANI",
      "subtitle": "Basmati • Mango Chutney • Mint Raita",
      "arcTheme": "Comfort",
      "arcSummary": "Tomato, butter and char deepen the experience.",
      "identity": "This chapter introduces:\n\n**char • tomato • butter • fenugreek • warmth**\n\nThe chicken must remain identifiable inside the sauce.\n\nThe starting proposition is not:\n\n**chicken submerged in butter sauce.**\n\nIt is:\n\n\\[\n\\boxed{\n\\text{Charred chicken}\n+\n\\text{Makhani support}\n}\n\\]\n\nThe 50-cover brief explicitly describes this as a **protein-first architecture**. fileciteturn3file0L188-L215\n\n---",
      "why": "Murg makhani belongs to the Punjabi restaurant tradition.\n\nThe defining relationship is between:\n\n- grilled or tandoor-style chicken\n- tomato\n- butter\n- cream\n- aromatic spice\n- kasuri methi\n\nThe important teaching distinction is between **grilled protein** and **finished sauce**.\n\nThe sauce should complete the chicken rather than erase the work already done to it.\n\n---",
      "larousse": "Chicken thigh is chosen because it tolerates:\n\n- marinade\n- high heat\n- char\n- finishing in sauce\n\nbetter than a leaner cut.\n\nThe cook must understand carryover and moisture retention.\n\n---",
      "escoffier": "- marinade produced by weight\n- protein portioned evenly\n- excess marinade removed\n- grill colour established before sauce\n- makhani cooked and passed separately\n- sauce held safely and refreshed\n- chicken introduced close to service\n\n---",
      "edgeFixed": "- chicken identity preserved\n- strong colour\n- smooth tomato sauce\n- no visible onion\n- no raw spice\n- controlled sweetness\n- kasuri methi defined\n- restrained cream\n- controlled sauce quantity",
      "edgeAdaptive": "- sweetness\n- chilli\n- final butter\n- final cream\n- sauce viscosity\n- final acid\n\n---\n\n# THE MIDDLE — CONSTRUCTION",
      "middleConstruction": "THE MIDDLE — CONSTRUCTION\n\n## Chicken\n\nMarination provides flavour.\n\nHigh heat creates char.\n\nSauce finishes the dish.\n\nThree distinct stages.\n\nThey must not collapse into one another.\n\n## Makhani Sauce\n\nThe sauce begins with tomato, onion, ginger, garlic and spice.\n\nCooking must remove raw acidity.\n\nBlending and passing establishes refinement.\n\nButter, cream and kasuri methi complete the flavour.\n\nThe brief specifies a silky, tomato-led sauce rather than excessive sweetness. fileciteturn3file0L217-L240\n\n## Mango Chutney\n\nNot a large sweet spoonful.\n\nA controlled palate-reset component.\n\nDefined mango dice, acidity and warm spice matter more than sugar. fileciteturn3file0L160-L187\n\n---\n\n##",
      "geometry": "\\[\n\\boxed{\n\\text{Chicken}\n\\rightarrow\n\\text{Makhani}\n\\rightarrow\n\\text{Rice}\n\\rightarrow\n\\text{Mango / Raita accents}\n}\n\\]\n\nChicken first.\n\nSauce second.\n\n---",
      "palateConclusion": "\\[\n\\text{Char}\n\\rightarrow\n\\text{tomato}\n\\rightarrow\n\\text{butter}\n\\rightarrow\n\\text{fenugreek}\n\\rightarrow\n\\text{mango acid}\n\\rightarrow\n\\text{mint reset}\n\\]\n\n---",
      "questions": [
        "Why is the dish structured with this specific sequence?",
        "Why does this refinement preserve the dish rather than Westernise it?",
        "Why is this cooking medium and heat level selected for this cut?"
      ],
      "positiveDelta": "\\[\n\\boxed{\n\\text{Chicken in sauce}\n\\rightarrow\n\\text{charred protein supported by makhani}\n}\n\\]\n\n---"
    },
    {
      "number": "IV",
      "title": "BORN TO SHINE RAAN OF LAMB",
      "subtitle": "Lamb Rump • Dal Makhani • Bombay Saag Potato",
      "arcTheme": "Depth",
      "arcSummary": "The menu reaches its richest and most intellectually important point.",
      "identity": "This is the structural heart of the menu.\n\nThe name **Raan** brings expectations of deep spice and slow-cooked lamb.\n\nBut the ingredient presented to us is lamb rump.\n\nThat creates the teaching moment.\n\n---",
      "why": "Traditional Raan is associated with a larger leg treatment and long cooking.\n\nBut:\n\n\\[\n\\boxed{\n\\text{Cultural identity}\n\\neq\n\\text{mandatory cooking method}\n}\n\\]\n\nWe retain the Raan spice language.\n\nWe change the thermal treatment because the cut has changed.\n\nThe 4017 brief explicitly identifies this as a key SIXES decision: **Raan flavour identity, rump-specific cooking technique.** fileciteturn3file0L268-L274\n\n---",
      "larousse": "Lamb rump is tender.\n\nIt benefits from:\n\n- hard initial colour\n- controlled roasting\n- resting\n- clean slicing\n- pink interior\n\nIt does not require the collagen-breaking cook that a whole lamb leg may demand.\n\n---",
      "escoffier": "- rumps trimmed consistently\n- marinade batched\n- core temperatures controlled\n- hard sear established\n- roasting monitored\n- resting protected\n- slicing done deliberately\n\nThe brief targets removal around 48–50°C for a rested medium-rare result around 54–56°C. fileciteturn3file0L241-L264\n\n---",
      "edgeFixed": "- aromatic exterior\n- clean char\n- pink interior\n- adequate rest\n- clean slicing\n- dal remains recognisably dal\n- potato retains structure\n- spinach stays fresh\n- no heavy sauce drowning the lamb",
      "edgeAdaptive": "- exact pull temperature\n- resting duration\n- slice thickness\n- glaze intensity\n- final acid\n- service sequencing\n\n---\n\n# THE MIDDLE — CONSTRUCTION",
      "middleConstruction": "THE MIDDLE — CONSTRUCTION\n\n## Lamb Rump\n\nIdentity:\n\nRaan spice.\n\nTechnique:\n\nrump cookery.\n\nThis distinction is the lesson.\n\n## Dal Makhani\n\nDal provides depth.\n\nIts structure must remain visible.\n\nIt should be rich and silky without becoming purée.\n\nSlow cooking develops integration rather than merely softness.\n\n## Bombay Saag Potato\n\nThe potato provides body.\n\nThe spinach brings freshness.\n\nCumin and mustard seeds create aromatic structure.\n\nThe brief specifically rejects overcooked khaki saag in favour of fresh green spinach. fileciteturn3file0L298-L326\n\n---\n\n##",
      "geometry": "\\[\n\\boxed{\n\\text{Dal}\n\\rightarrow\n\\text{Lamb}\n\\rightarrow\n\\text{Saag potato}\n\\rightarrow\n\\text{restrained glaze}\n}\n\\]\n\nThe lamb remains the visual authority.\n\n---",
      "palateConclusion": "\\[\n\\text{Char}\n\\rightarrow\n\\text{warm spice}\n\\rightarrow\n\\text{lamb richness}\n\\rightarrow\n\\text{dal depth}\n\\rightarrow\n\\text{green freshness}\n\\]\n\n---",
      "questions": [
        "Why is the dish structured with this specific sequence?",
        "Why does this refinement preserve the dish rather than Westernise it?",
        "Why is this cooking medium and heat level selected for this cut?"
      ],
      "positiveDelta": "\\[\n\\boxed{\n\\text{Traditional name}\n\\rightarrow\n\\text{ingredient-appropriate technique}\n}\n\\]\n\nThis chapter teaches perhaps the most important rule in the handbook:\n\n\\[\n\\boxed{\n\\text{Respect tradition}\n\\neq\n\\text{imitate technique blindly}\n}\n\\]\n\n---"
    },
    {
      "number": "V",
      "title": "KERALA MONKFISH MOILEE",
      "subtitle": "Coconut • Ginger • Curry Leaf • Basmati",
      "arcTheme": "Release",
      "arcSummary": "Coconut, lime and coastal aromatics lighten the field.",
      "identity": "The menu now shifts geographically and aromatically.\n\nThe flavour field becomes:\n\n**coconut • ginger • curry leaf • mustard seed • green chilli • lime**\n\nThis should feel lighter than the Punjabi chapters before it.\n\n---",
      "why": "Moilee belongs to the coastal South Indian flavour vocabulary.\n\nThe sauce relies on fragrance rather than density.\n\nIts power comes from:\n\n- coconut\n- curry leaf\n- mustard seed\n- ginger\n- green chilli\n- turmeric\n- acidity\n\nThe fish should therefore remain visible, textural and clean.\n\n---",
      "larousse": "Monkfish is firm.\n\nIt can tolerate a hard initial sear.\n\nBut extended cooking creates a dry, cottony texture.\n\nTherefore:\n\n\\[\n\\text{colour first}\n\\rightarrow\n\\text{gentle finish}\n\\rightarrow\n\\text{short sauce contact}\n\\]\n\nThe brief specifically instructs against prolonged holding in sauce. fileciteturn3file0L327-L347\n\n---",
      "escoffier": "- fish membrane removed\n- even 110–120 g portions\n- short seasoning period\n- fish kept dry\n- sauce prepared independently\n- fish fired close to service\n- sauce and fish united only at the end\n\n---",
      "edgeFixed": "- monkfish remains focal\n- firm succulent texture\n- coconut remains restrained\n- ginger defined\n- curry leaf fresh\n- lime perceptible\n- sauce fluid\n- no aggressive boiling\n- no prolonged fish hold",
      "edgeAdaptive": "- chilli\n- lime\n- sauce reduction\n- exact fish firing\n- garnish\n- coconut intensity\n\n---\n\n# THE MIDDLE — CONSTRUCTION",
      "middleConstruction": "THE MIDDLE — CONSTRUCTION\n\n## Monkfish\n\nDry.\n\nSeasoned briefly.\n\nSear.\n\nFinish gently.\n\nThe technique remains simple because the sauce carries complexity.\n\n## Moilee Sauce\n\nMustard seed is tempered in coconut oil.\n\nCurry leaves release aroma.\n\nShallot, ginger, garlic and chilli soften without colour.\n\nCoconut milk enters after the aromatics are established.\n\nThe brief defines the final sauce as ivory-gold, ginger-forward, coconut-led but not sweet, with fresh lime. fileciteturn3file0L348-L375\n\n---\n\n##",
      "geometry": "\\[\n\\boxed{\n\\text{Moilee sauce}\n\\rightarrow\n\\text{Monkfish}\n\\rightarrow\n\\text{compact rice}\n\\rightarrow\n\\text{fresh aromatic finish}\n}\n\\]\n\nThe sauce becomes the field.\n\nThe fish becomes the object within it.\n\n---",
      "palateConclusion": "\\[\n\\text{Fish}\n\\rightarrow\n\\text{coconut}\n\\rightarrow\n\\text{ginger}\n\\rightarrow\n\\text{green chilli}\n\\rightarrow\n\\text{lime}\n\\rightarrow\n\\text{curry leaf}\n\\]\n\nA lighter resolution after the lamb chapter.\n\n---",
      "questions": [
        "Why is the dish structured with this specific sequence?",
        "Why does this refinement preserve the dish rather than Westernise it?",
        "Why is this cooking medium and heat level selected for this cut?"
      ],
      "positiveDelta": "\\[\n\\boxed{\n\\text{Fish curry}\n\\rightarrow\n\\text{fish-led coastal composition}\n}\n\\]\n\n---"
    },
    {
      "number": "VI",
      "title": "PUNJAB VEGETABLE TIAN",
      "subtitle": "Punjabi Curry Sauce",
      "arcTheme": "Resolution",
      "arcSummary": "Vegetable structure, colour and spice conclude the savoury sequence.",
      "identity": "The final savoury chapter makes an important statement:\n\n**vegetarian food receives equal architectural status.**\n\nThis is not an alternative assembled after the main menu.\n\nIt is a composed dish.\n\n---",
      "why": "The chapter deliberately combines two languages.\n\n### Structural language\n\n**Tian**\n\nLayered vegetable cookery.\n\nRepetition.\n\nUniform slicing.\n\nGeometry.\n\n### Flavour language\n\n**Punjab**\n\nTomato.\n\nGinger.\n\nGarlic.\n\nCumin.\n\nCoriander.\n\nTurmeric.\n\nGaram masala.\n\nKasuri methi.\n\nThe technique belongs to one culinary vocabulary.\n\nThe flavour domain belongs to another.\n\nNeither needs to pretend to be the other.\n\n---",
      "larousse": "Different vegetables cook at different rates.\n\nTherefore:\n\n- firmer vegetables may require pre-cooking\n- aubergine moisture must be controlled\n- slices must be consistent\n- layering must allow even cooking\n- structure must survive reheating\n\nThe brief calls for 3–4 mm slicing and pre-cooking firmer elements so the complete tian finishes together. fileciteturn4file0L9-L21\n\n---",
      "escoffier": "This dish exposes poor mise en place immediately.\n\nUniformity matters.\n\nEvery vegetable must be:\n\n- consistently cut\n- consistently seasoned\n- deliberately ordered\n- cooked to the correct stage\n- portioned cleanly\n\nGeometry is operational discipline made visible.\n\n---",
      "edgeFixed": "- uniform slices\n- clear repeating geometry\n- vegetables fully tender\n- no watery base\n- structure retained\n- curry sauce completely smooth\n- no grainy spice\n- no raw onion\n- equal-status presentation",
      "edgeAdaptive": "- vegetable sequence\n- seasoning\n- final acid\n- sauce quantity\n- herb finish\n- seasonal substitution where authorised\n\n---\n\n# THE MIDDLE — CONSTRUCTION",
      "middleConstruction": "THE MIDDLE — CONSTRUCTION\n\n## Vegetable Tian\n\nThe visual pattern is functional.\n\nUniformity allows the vegetables to cook together.\n\nTherefore:\n\n\\[\n\\boxed{\n\\text{Geometry}\n=\n\\text{presentation}\n+\n\\text{thermal control}\n}\n\\]\n\n## Punjabi Curry Sauce\n\nOnion is cooked until sweet.\n\nGinger, garlic and spice are developed without burning.\n\nTomato cooks until rawness disappears.\n\nThe sauce is blended and passed.\n\nThe brief specifies a deeply aromatic, tomato-led sauce with no grainy spice or greasy finish. fileciteturn4file0L22-L50\n\n---\n\n##",
      "geometry": "\\[\n\\boxed{\n\\text{Punjabi sauce foundation}\n\\rightarrow\n\\text{Tian standing proud}\n\\rightarrow\n\\text{fresh finish}\n}\n\\]\n\nThis time the geometry itself becomes the focal element.\n\n---",
      "palateConclusion": "\\[\n\\text{roasted vegetable}\n\\rightarrow\n\\text{tomato}\n\\rightarrow\n\\text{warm spice}\n\\rightarrow\n\\text{sweetness}\n\\rightarrow\n\\text{freshness}\n\\]\n\n---",
      "questions": [
        "Why is the dish structured with this specific sequence?",
        "Why does this refinement preserve the dish rather than Westernise it?",
        "Why is this cooking medium and heat level selected for this cut?"
      ],
      "positiveDelta": "\\[\n\\boxed{\n\\text{Vegetarian option}\n\\rightarrow\n\\text{equal-status composed main course}\n}\n\\]\n\n---"
    }
  ],
  "menuArc": [
    {
      "stage": "Fire",
      "chapterNumber": "I",
      "dish": "Seekh Kebab",
      "description": "The guest enters through char, spice and freshness."
    },
    {
      "stage": "Precision",
      "chapterNumber": "II",
      "dish": "Tandoori-Spiced Scallop",
      "description": "Fire becomes controlled delicacy."
    },
    {
      "stage": "Comfort",
      "chapterNumber": "III",
      "dish": "Punjabi Murg Makhani",
      "description": "Tomato, butter and char deepen the experience."
    },
    {
      "stage": "Depth",
      "chapterNumber": "IV",
      "dish": "Born to Shine Raan of Lamb",
      "description": "The menu reaches its richest and most intellectually important point."
    },
    {
      "stage": "Release",
      "chapterNumber": "V",
      "dish": "Kerala Monkfish Moilee",
      "description": "Coconut, lime and coastal aromatics lighten the field."
    },
    {
      "stage": "Resolution",
      "chapterNumber": "VI",
      "dish": "Punjab Vegetable Tian",
      "description": "Vegetable structure, colour and spice conclude the savoury sequence."
    }
  ],
  "skeletonDoctrine": [
    "1. Beginning — What identity enters the plate?",
    "2. Origin — Where does the culinary idea come from?",
    "3. Why — Why does the original technique exist?",
    "4. Larousse Lens — What does classical ingredient knowledge tell us?",
    "5. Escoffier Lens — What must be controlled operationally?",
    "6. 4017 Edge — What is 95% fixed, and what is 5% adaptive?",
    "7. Middle — How do the physical components interact?",
    "8. Geometry — How does the guest read the plate visually?",
    "9. Conclusion — How does the palate resolve in sequence?",
    "10. Teaching Questions — Can the chef explain why, not just what?",
    "11. Positive Delta — What is the transformational gain?"
  ]
};
