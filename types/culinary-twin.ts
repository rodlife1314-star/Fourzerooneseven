import { TeachingEdition4017 } from '@/lib/teaching-edition-4017';

export type OperatingMode =
  | 'intent_externalisation'
  | 'exploration'
  | 'investigation'
  | 'simulation'
  | 'validation'
  | 'service'
  | 'ledger';

export type GovernanceLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'OPERATIONAL_COMMITTED';

export type EpistemicLabel =
  | 'SOURCE_MENU'
  | 'CHEF_OBSERVATION'
  | 'CHEF_INTENT'
  | 'CHEF_DECISION'
  | 'MODEL_INTERPRETATION'
  | 'MODEL_SUGGESTION'
  | 'HYPOTHESIS'
  | 'SIMULATION'
  | 'SERVICE_OBSERVATION'
  | 'UNKNOWN';

export type StopSeverity =
  | 'SAFETY_CRITICAL'
  | 'ALLERGEN_UNRESOLVED'
  | 'UNSUPPORTED_CLAIM'
  | 'SIMULATION_AS_FACT'
  | 'LACK_OF_SIGN_OFF'
  | 'EQUIPMENT_CAPACITY_EXCEEDED';

export interface StopCondition {
  id: string;
  code: string;
  severity: StopSeverity;
  title: string;
  message: string;
  affectedEntities: string[];
  triggerEvidence?: string;
  resolutionPath: string;
  resolved: boolean;
  resolvedBy?: string;
  resolvedAt?: string;
  resolutionNote?: string;
}

export type EvidenceType =
  | 'measured_weight'
  | 'temperature'
  | 'time'
  | 'salinity_ph'
  | 'sensory_observation'
  | 'production_note'
  | 'service_outcome'
  | 'supplier_spec'
  | 'historical_ref'
  | 'scientific_dataset'
  | 'chef_observation'
  | 'model_inference';

export interface EvidenceRecord {
  id: string;
  type: EvidenceType;
  title: string;
  value: string | number;
  unit?: string;
  provenance: string; // e.g. "Thermocouple probe Model TC-800", "Larousse Gastronomique 1938, p. 412"
  confidence: number; // 0.0 to 1.0
  recordedAt: string;
  author: string;
  isHypothesis?: boolean;
  notes?: string;
}

export type AllergenType =
  | 'Gluten/Wheat'
  | 'Crustaceans'
  | 'Eggs'
  | 'Fish'
  | 'Peanuts'
  | 'Soybeans'
  | 'Milk/Dairy'
  | 'Tree Nuts'
  | 'Celery'
  | 'Mustard'
  | 'Sesame'
  | 'Sulphites'
  | 'Lupin'
  | 'Molluscs';

export interface Ingredient {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  bakersPercentage?: number; // % relative to base
  costPerUnit?: number;
  allergens: AllergenType[];
  moisturePercentage: number;
  criticalTempLimit?: {
    minSafeTemp?: number;
    maxHoldTemp?: number;
    denaturingTemp?: number;
  };
  provenance: string;
  speculative?: boolean; // if in exploration mode
}

export interface TransformationStep {
  id: string;
  componentId: string;
  technique: string; // e.g. "Maillard Sear", "Lactic Fermentation", "Sub-Boil Poach", "Shear Emulsification"
  mechanism: string; // chemical / physical explanation
  equipment: string;
  station: 'Garde Manger' | 'Sauté' | 'Grill/Rotisserie' | 'Entremetier' | 'Pastry' | 'Pass';
  targetTempC: number;
  targetDurationMinutes: number;
  moistureLossEstimatedPct: number;
  criticalControlPoint: boolean;
  ccpCriteria?: string;
  failureRisk: string;
  recoveryAction: string;
}

export interface CulinaryComponent {
  id: string;
  name: string;
  type: 'protein' | 'sauce' | 'puree' | 'garnish' | 'oil' | 'crisp' | 'infusion' | 'base';
  description: string;
  yieldGrams: number;
  ingredients: Ingredient[];
  transformations: TransformationStep[];
  holdingLimitMinutes: number;
  holdingTempC: number;
  sensoryProfile: {
    umami: number; // 1-10
    acid: number;
    salt: number;
    sweet: number;
    bitter: number;
    richness: number;
    crunch: number;
    herbaceous: number;
  };
}

export interface CulinarySimulation {
  id: string;
  timestamp: string;
  coversCount: number;
  batchMultiplier: number;
  totalRawWeightKg: number;
  estimatedFinishedWeightKg: number;
  projectedMoistureLossPct: number;
  thermalDecayCurve: { minutes: number; coreTempC: number; sensoryScore: number }[];
  stationLoads: {
    station: string;
    peakPrepTimeMins: number;
    equipmentBottleneck: string;
    loadPercentage: number;
  }[];
  projectedCostPerCover: number;
  recoveryRiskScore: 'LOW' | 'MEDIUM' | 'HIGH';
  assumptions: string[];
}

export interface LiveTicket {
  id: string;
  tableNumber: string;
  covers: number;
  course: 'Starter' | 'Fish' | 'Main' | 'Pre-Dessert' | 'Dessert';
  dietaries: string[];
  orderTime: string;
  fireTime?: string;
  stationProgress: {
    station: string;
    status: 'pending' | 'firing' | 'holding' | 'plated' | 'delayed';
    timerRemainingSec: number;
  }[];
  status: 'QUEUED' | 'FIRING' | 'AT_PASS' | 'DISPATCHED' | 'HELD_ALERT';
}

export interface ServiceObservation {
  id: string;
  timestamp: string;
  ticketId?: string;
  station: string;
  metricType: 'yield' | 'temperature' | 'timing' | 'sensory' | 'waste' | 'recovery';
  targetValue: string;
  actualObservedValue: string;
  variance: string;
  notes: string;
  actionTaken?: string;
  recordedBy: string;
}

export interface ChefDecision {
  id: string;
  timestamp: string;
  chefName: string;
  action: 'ACCEPT' | 'REJECT' | 'REVISE' | 'DEFER' | 'COMMIT_TO_SERVICE' | 'STOP_OVERRIDE';
  fromStatus: string;
  toStatus: string;
  rationale: string;
  targetVersion: string;
  acknowledgedUncertainties: string[];
  digitalSignature: string;
}

export interface TwinRevision {
  version: string;
  timestamp: string;
  author: string;
  summary: string;
  changes: string[];
  chefDecisionId: string;
  status: 'DRAFT' | 'VALIDATED' | 'COMMITTED_SERVICE' | 'ARCHIVED';
}

export interface AuditRecord {
  id: string;
  timestamp: string;
  actor: string;
  actionType:
    | 'SPEC_CREATED'
    | 'HYPOTHESIS_ADDED'
    | 'SIMULATION_RUN'
    | 'STOP_TRIGGERED'
    | 'STOP_RESOLVED'
    | 'CHEF_SIGN_OFF'
    | 'COMMITTED_TO_SERVICE'
    | 'SERVICE_VARIANCE_RECORDED'
    | 'REVISION_INCREMENTED'
    | 'CHEF_INTENT_EXTERNALIZED'
    | 'MENU_TRANSCRIPTION_VERIFIED'
    | 'CROSS_TERRAIN_ANALYZED'
    | 'THOUGHT_RECORD_COMMITTED';
  details: string;
  previousHash: string;
  recordHash: string;
  modeAtTime: OperatingMode;
  epistemicTag?: EpistemicLabel;
}

// ----------------------------------------------------
// CHEF INTENT EXTERNALISATION SPECIFIC TYPES
// ----------------------------------------------------

export type ChefThoughtField =
  | 'culinary_intention'
  | 'flavour_architecture'
  | 'colour_visual_intention'
  | 'classical_lineage'
  | 'ingredient_relationships'
  | 'technical_transformation'
  | 'menu_progression'
  | 'guest_experience'
  | 'production_logic'
  | 'service_holding_constraints'
  | 'alternatives_considered'
  | 'rejected_options'
  | 'operational_compromises'
  | 'unresolved_questions'
  | 'observed_service_result'
  | 'later_reflection';

export interface MenuSource {
  id: string;
  type: 'image' | 'pdf' | 'pasted_text' | 'manual';
  fileName?: string;
  rawContent: string;
  fileDataUrl?: string;
  uploadedAt: string;
  verifiedByChef: boolean;
  verifiedAt?: string;
  chefCorrectionsNote?: string;
}

export interface MenuItemCourse {
  id: string;
  courseOrder: number;
  courseName: string; // e.g. "Amuse-Bouche", "Entrée", "Poisson", "Viande"
  dishName: string; // e.g. "Corn-Fed Chicken Supreme"
  statedIngredients: string[];
  components: string[];
  allergens: AllergenType[];
  dietaryNotes: string[];
  temperatureType: 'Chilled' | 'Room Temp' | 'Warm' | 'Hot' | 'Steaming';
  estimatedPrepTimeMinutes: number;
  station: 'Garde Manger' | 'Sauté' | 'Grill/Rotisserie' | 'Entremetier' | 'Pastry' | 'Pass';
}

export interface ChefThoughtRecord {
  id: string;
  field: ChefThoughtField;
  scope: 'MENU_LEVEL' | 'DISH_LEVEL';
  targetDishId?: string; // empty if whole menu
  targetDishName?: string;
  promptGuidance: string;
  content: string;
  epistemicStatus: EpistemicLabel;
  author: string;
  timestamp: string;
  version: string;
  isVoiceTranscribed?: boolean;
  isChefApproved: boolean;
  provenanceRef?: string;
  previousVersionId?: string;
  tags?: string[];
}

export type CrossTerrainAgent =
  | 'HERMES' // Provenance, historical lineage, ratios
  | 'SIMON' // Sensory, flavour architecture, progression, colour
  | 'ASTRA' // Memory, version continuity, past service records
  | 'COPILOT' // Production logic, MEP, pass sequencing, station load
  | 'JEMMA' // Counterfactual challenge, repetition fatigue, safety/holding risks
  | 'OCTAGON' // Governance, Hard Stop, commitment gatekeeping
  | 'SIXES'; // Orchestrator

export interface CrossTerrainAnalysis {
  id: string;
  agent: CrossTerrainAgent;
  title: string;
  observation: string;
  inquiryQuestion: string;
  epistemicLabel: EpistemicLabel;
  riskSeverity: 'INFO' | 'WARNING' | 'CRITICAL';
  suggestedAction?: string;
  chefResponse?: string;
  chefConfirmedIntent?: boolean;
  chefAnsweredAt?: string;
  status: 'PENDING_CHEF_REVIEW' | 'CHEF_CONFIRMED' | 'CHEF_CORRECTED' | 'CHEF_REJECTED';
}

export interface MenuSession {
  id: string;
  title: string;
  serviceIdentifier: string; // e.g. "The Weekend — N1, N2, N3"
  eventDate: string;
  currentStage:
    | 'intake'
    | 'verified_transcription'
    | 'thought_capture'
    | 'thought_map'
    | 'cross_terrain'
    | 'chef_review'
    | 'active_memory';
  source: MenuSource;
  courses: MenuItemCourse[];
  thoughtRecords: ChefThoughtRecord[];
  crossTerrainInsights: CrossTerrainAnalysis[];
  chefSignOff: {
    approved: boolean;
    chefName: string;
    signature: string;
    timestamp: string;
    version: string;
    notes?: string;
  } | null;
  createdAt: string;
  updatedAt: string;
}

export interface CulinaryTwinProject {
  id: string;
  code: string; // e.g. "SX-DUCK-01", "SX-WEEKEND-MENU-01"
  name: string;
  conceptHeadline: string;
  currentMode: OperatingMode;
  governanceLevel: GovernanceLevel;
  currentVersion: string;
  status: 'DRAFT_EXPLORING' | 'UNDER_INVESTIGATION' | 'SIMULATED' | 'VALIDATED_PENDING_CHEF' | 'COMMITTED_OPERATIONAL';
  chefAuthor: string;
  createdAt: string;
  updatedAt: string;

  // Active Menu Externalisation Session
  activeMenuSession?: MenuSession;
  
  // Core Exploration & Hypotheses
  explorationTags: {
    id: string;
    type: 'IDEA' | 'HYPOTHESIS' | 'SPECULATIVE_PAIRING' | 'HISTORICAL_LINEAGE';
    text: string;
    confidence: number;
    provenanceRef?: string;
  }[];
  
  // Components & Formulations
  components: CulinaryComponent[];
  
  // Evidence Base
  evidenceLedger: EvidenceRecord[];
  
  // Safety & Stop Triggers
  stopConditions: StopCondition[];
  allergensConfirmed: boolean;
  haccpApproved: boolean;
  
  // Active Simulation
  latestSimulation?: CulinarySimulation;
  
  // Live Service Operational Data
  activeTickets: LiveTicket[];
  serviceObservations: ServiceObservation[];
  
  // Working Production Brief & Tier 1 Specs (50 Covers)
  productionBrief?: ProductionBrief;

  // Six-Chapter Teaching Edition (Invariant 4017 Skeleton + Domain)
  teachingEdition?: TeachingEdition4017;

  // Marlow Intelligence & Kerridge ↔ 4017 Translation Matrix
  marlowIntel?: MarlowIntelDossier;

  // D — Observation of Systems & Service Debriefs (Design → Cook → Watch → Learn → Improve → Repeat)
  serviceDebriefs?: ServiceObservationDebrief[];

  // Provenance & Audit
  revisions: TwinRevision[];
  decisions: ChefDecision[];
  auditRecords: AuditRecord[];
}

export type EpistemicState = 'O_OBSERVATION' | 'H_HYPOTHESIS' | 'T_TRIAL' | 'V_VALIDATED_DOCTRINE';

export type ProvenanceWeight =
  | 'CHEF_FIRSTHAND' // Chef Rod observed/worked/experienced
  | 'ALICE_INFERRED' // Alice inferred from menu architecture or culinary twin patterns
  | 'EXTERNAL_SYSTEM_INPUT' // Kerridge / Hand & Flowers / The Coach precedent
  | 'SERVICE_FEEDBACK_DATA'; // Real 50-cover matchday log

export interface QualityDegradationCurve {
  initialQualityScore: number; // e.g. 100
  holdingWindowMinutes: number; // e.g. 15
  curveEquation: string; // Q(t) = Q_0 - \Delta Q(t)
  criticalLossVectors: {
    vector: 'AROMA' | 'CRUST_TEXTURE' | 'TEMPERATURE_CONTRAST' | 'SAUCE_GLOSS' | 'MOISTURE';
    description: string;
    halfLifeMinutes: number;
  }[];
  peakWindow: string; // e.g. "0–8 mins"
  failureThresholdMinutes: number; // e.g. 20 mins
}

export interface ServicePressureQuantification {
  covers: number; // e.g. 50 covers (or 20-40)
  operatorsAtPass: number; // e.g. 2
  firingWindowMinutes: number; // e.g. 15 mins (halftime rush)
  equipment: string[]; // ['220°C Combi', 'Thermos sauce pump', 'Heated holding drawer']
  targetPlateOutRatePerMin: number; // e.g. 3.3 plates/min
  pressureIndex: 'LOW' | 'MEDIUM' | 'HIGH' | 'EXTREME_HALFTIME';
}

export interface ServiceObservationDebrief {
  id: string;
  serviceDate: string;
  coversServed: number;
  menuVersion: string;
  operatorNotes: string;
  // The 6 Real-World Questions (Design → Cook → Watch → Learn → Improve → Repeat):
  whatHeldWell: string;
  whatSlowedUsDown: string;
  whatChefsStruggledWith: string;
  whatWorkedBetterThanExpected: string;
  whatChangedUnderPressure: string;
  whatCustomerActuallyReceived: string;
  candidateAdjustments: {
    component: string;
    observedFailureOrGain: string;
    proposedHypothesis: string;
    trialStatus: 'SCHEDULED' | 'IN_TRIAL' | 'VALIDATED_BY_CHEF' | 'DISMISSED';
  }[];
  recordedBy: string;
  chefSignedOff: boolean;
  chefSignOffDate?: string;
}

export interface MarlowMatrixEntry {
  id: string;
  dishName: string;
  establishment: 'The Hand & Flowers' | 'The Coach' | 'The Shed' | 'Marlow Classics';
  menuTier: string;
  britishAnchor: string;
  onePowerfulIdea: string;
  hero: string;
  sauce: string;
  acid: string;
  texture: string;
  starchOrPuree: string;
  serviceRisk: string;
  holdingPotential: 'FLASH_FINISH' | 'HOT_HELD_STABLE' | 'COLD_PLATED' | 'SALAMANDER_GLAZE' | 'ORDER_ASSEMBLED';
  holdingNotes: string;
  wembleyParallel4017: string;
  translationDoctrine: string;

  // Epistemic Refinements D = {O, H, T, V}
  epistemicState: EpistemicState;
  provenance: ProvenanceWeight;
  isAuthoritative: boolean; // false by default for external observations / AI inference
  degradationCurve: QualityDegradationCurve;
  servicePressure: ServicePressureQuantification;
  chefTrialValidation?: {
    status: 'PROPOSED_HYPOTHESIS' | 'TRIAL_ACTIVE' | 'VALIDATED_DOCTRINE' | 'ADAPTED' | 'DISMISSED';
    chefNotes?: string;
    testedDate?: string;
  };
}

export interface MarlowIntelDossier {
  code: string;
  title: string;
  investigator: string;
  targetFocus: string;
  lastUpdated: string;
  chefProvenanceNote: string;
  coreThesis: string;
  fivePartFormula: {
    stage: string;
    title: string;
    rule: string;
    example: string;
  }[];
  operationalRules20to40: {
    headline: string;
    stadiumChallenge: string;
    kerridgePrecedent: string;
    box4017Resolution: string;
  }[];
  visualDoctrine: string[];
  matrixEntries: MarlowMatrixEntry[];
}

export interface ProductionRecipeIngredient {
  ingredient: string;
  quantity: string;
  notes?: string;
}

export interface ProductionRecipeSpec {
  id: string;
  name: string;
  category: 'sauce' | 'protein' | 'puree' | 'garnish' | 'accompaniment' | 'composed_main';
  productionTarget: string;
  serviceState: 'Cold-held' | 'Hot-held / refreshed' | 'Fired / finished to order' | 'Last-second garnish';
  station: 'Garde Manger' | 'Sauté' | 'Grill/Rotisserie' | 'Entremetier' | 'Pass';
  ingredients: ProductionRecipeIngredient[];
  method: string[];
  tier1Standard: string;
  servicePlateRule?: string;
  positiveDelta?: string;
  isReferenceOnly?: boolean;
}

export interface ProductionBrief {
  code: string;
  title: string;
  tier: string;
  serviceCovers: number;
  productionBuffer: string;
  primaryStandard: string;
  operatingDoctrine: string;
  tier1DoctrineRules: string[];
  positiveDeltas: { from: string; to: string }[];
  specs: ProductionRecipeSpec[];
  serviceStateChecklist: {
    state: string;
    componentsAndRules: string;
  }[];
  passRule: string;
}
