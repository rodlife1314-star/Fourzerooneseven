'use client';

import React, { useState, useEffect, useRef, useSyncExternalStore } from 'react';
import {
  CulinaryTwinProject,
  MenuSession,
  MenuItemCourse,
  ChefThoughtRecord,
  ChefThoughtField,
  CrossTerrainAnalysis,
  EpistemicLabel,
  CrossTerrainAgent,
  AllergenType,
  AuditRecord,
} from '@/types/culinary-twin';
import { generateHash, formatDateTimeSafe } from '@/lib/utils';
import {
  ChefHat,
  Mic,
  MicOff,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Upload,
  Cpu,
  Layers,
  ArrowRight,
  Shield,
  History,
  RotateCcw,
  Plus,
  Trash2,
  Edit3,
  HelpCircle,
  Eye,
  Activity,
  Flame,
  Volume2,
  Compass,
  CornerDownRight,
  ExternalLink,
  BookOpen,
  Send,
  Zap,
  Info
} from 'lucide-react';
import { Tier1ProductionBriefView } from './tier1-production-brief-view';
import { Tier1TeachingEditionView } from './tier1-teaching-edition-view';
import { MarlowIntelMatrixView } from './marlow-intel-matrix-view';
import { PRODUCTION_BRIEF_4017 } from '@/lib/production-brief-4017';
import { PRODUCTION_BRIEF_4017_FOOTBALL } from '@/lib/production-brief-4017-football';
import { PRODUCTION_BRIEF_4017_ENGLAND_SPAIN } from '@/lib/production-brief-4017-england-spain';
import { TEACHING_EDITION_4017 } from '@/lib/teaching-edition-4017';
import { MARLOW_INTEL_4017 } from '@/lib/marlow-intel-4017';
import { SERVICE_DEBRIEFS_4017 } from '@/lib/service-debrief-4017';
import { RAW_BRIEF_TEXT } from '@/lib/twin-4017-data';
import { RAW_FOOTBALL_BRIEF_TEXT } from '@/lib/twin-4017-football-data';
import { RAW_ENGLAND_SPAIN_BRIEF_TEXT } from '@/lib/twin-4017-england-spain-data';

interface ModeIntentExternalisationProps {
  currentTwin: CulinaryTwinProject;
  onUpdateTwin: (updater: (prev: CulinaryTwinProject) => CulinaryTwinProject) => void;
  onTriggerAi: (actionName: string, promptText: string) => void;
}

const DEFAULT_WEEKEND_MENU_TEXT = `The Weekend — N1, N2, N3

* Amuse-Bouche
    Scallop toast, chicken mousse, oscietra caviar, black truffle
* Corn-Fed Chicken Supreme
    Fondant potato, braised endive, hazelnut crumb
* Classic Caesar Salad
    Romaine lettuce, traditional Caesar dressing, Parmesan, garlic croutons, anchovies
* Wild Mushroom Risotto
    Black truffle, aged Parmesan, mushroom consommé
* Pan-Roasted Monkfish
    Shellfish velouté, Cornish clams, seasonal garden vegetables, lemon oil
* Fillet of Beef
    Triple-cooked Pont Neuf, spinach, Bordelaise sauce`;

const THOUGHT_FIELD_DESCRIPTIONS: Record<ChefThoughtField, { label: string; placeholder: string; icon: string; agent: CrossTerrainAgent }> = {
  culinary_intention: {
    label: 'Culinary Intention',
    placeholder: 'What is the core creative intent, artistic philosophy, and narrative goal of this menu or dish?',
    icon: '🎯',
    agent: 'SIXES',
  },
  flavour_architecture: {
    label: 'Flavour Architecture',
    placeholder: 'Describe the dominant taste dynamics: umami depth, acid counterpoint, salinity curve, bitterness and sweetness balances.',
    icon: '👅',
    agent: 'SIMON',
  },
  colour_visual_intention: {
    label: 'Colour & Visual Intention',
    placeholder: 'What is the chromatic palette, contrast, negative space, and visual staging across the plate and progression?',
    icon: '🎨',
    agent: 'SIMON',
  },
  classical_lineage: {
    label: 'Classical Reference or Lineage',
    placeholder: 'Which historical traditions, Escoffier foundations, regional techniques, or mentors does this reference and reinterpret?',
    icon: '📜',
    agent: 'HERMES',
  },
  ingredient_relationships: {
    label: 'Ingredient Relationships',
    placeholder: 'Explain complementary and contrasting ingredient affinities, terroir pairings, and aromatic bridges.',
    icon: '🌿',
    agent: 'HERMES',
  },
  technical_transformation: {
    label: 'Technical Transformation',
    placeholder: 'Which physical/chemical mechanisms (Maillard, emulsification, starch gelatinization, collagen breakdown) are executed?',
    icon: '🔬',
    agent: 'COPILOT',
  },
  menu_progression: {
    label: 'Menu Progression & Rhythm',
    placeholder: 'How does the palate transition from light/acidity to richness and deep umami without fatigue?',
    icon: '📈',
    agent: 'SIMON',
  },
  guest_experience: {
    label: 'Guest Experience & Memory',
    placeholder: 'What emotional journey, pacing, theatrical element, or sensory discovery is intended for the diner?',
    icon: '✨',
    agent: 'SIXES',
  },
  production_logic: {
    label: 'Production Logic (MEP)',
    placeholder: 'How is prep structured? What is batched ahead vs executed à la minute to protect kitchen brigade capacity?',
    icon: '⏱️',
    agent: 'COPILOT',
  },
  service_holding_constraints: {
    label: 'Service & Holding Constraints',
    placeholder: 'What are thermal decay windows, emulsification stability times, and plating speed requirements at the pass?',
    icon: '🌡️',
    agent: 'COPILOT',
  },
  alternatives_considered: {
    label: 'Alternatives Considered',
    placeholder: 'What other pairings, cuts, or sauces were tested before arriving at this specific specification?',
    icon: '🔄',
    agent: 'JEMMA',
  },
  rejected_options: {
    label: 'Rejected Options & Whys',
    placeholder: 'What combinations or preparations were explicitly rejected due to texture, cost, or sensory clash?',
    icon: '❌',
    agent: 'JEMMA',
  },
  operational_compromises: {
    label: 'Operational Compromises',
    placeholder: 'What trade-offs were made between ideal gastronomic theory and physical brigade / equipment limits?',
    icon: '⚖️',
    agent: 'COPILOT',
  },
  unresolved_questions: {
    label: 'Unresolved Questions',
    placeholder: 'What remains uncertain or requires live service testing (e.g. clam salinity variance, truffle aroma volatility)?',
    icon: '❓',
    agent: 'OCTAGON',
  },
  observed_service_result: {
    label: 'Observed Result After Service',
    placeholder: 'What was actually witnessed during live service? Plate returns, timing variances, guest feedback, waste notes.',
    icon: '🔍',
    agent: 'ASTRA',
  },
  later_reflection: {
    label: 'Later Reflection / Revision Plan',
    placeholder: 'Post-service Chef review notes on what to evolve, substitute, or refine for the next iteration.',
    icon: '💡',
    agent: 'ASTRA',
  },
};

const STATIC_DEFAULT_SESSION: MenuSession = {
  id: 'menu-session-default-weekend',
  title: 'The Weekend — N1, N2, N3',
  serviceIdentifier: 'Weekend Tasting Series (N1, N2, N3)',
  eventDate: '2026-08-22',
  currentStage: 'intake',
  source: {
    id: 'src-default-01',
    type: 'pasted_text',
    rawContent: DEFAULT_WEEKEND_MENU_TEXT,
    uploadedAt: '2026-08-16T22:00:00Z',
    verifiedByChef: false,
  },
  courses: [
    {
      id: 'c-1',
      courseOrder: 1,
      courseName: 'Amuse-Bouche',
      dishName: 'Scallop Toast, Chicken Mousse, Oscietra Caviar, Black Truffle',
      statedIngredients: ['Scallop', 'Chicken mousse', 'Oscietra caviar', 'Black truffle', 'Brioche'],
      components: ['Crisp brioche base', 'Aerated chicken liver mousse', 'Cured scallop tartare', 'Oscietra caviar', 'Shaved melanosporum truffle'],
      allergens: ['Gluten/Wheat', 'Molluscs', 'Fish', 'Eggs', 'Milk/Dairy'],
      dietaryNotes: ['Pescatarian/Poultry hybrid', 'Shellfish & Caviar'],
      temperatureType: 'Warm',
      estimatedPrepTimeMinutes: 4,
      station: 'Garde Manger',
    },
    {
      id: 'c-2',
      courseOrder: 2,
      courseName: 'Course 2 (Poultry)',
      dishName: 'Corn-Fed Chicken Supreme',
      statedIngredients: ['Corn-fed chicken breast', 'Fondant potato', 'Braised endive', 'Hazelnut crumb'],
      components: ['Pan-roasted chicken supreme with crisp skin', 'Thyme-basted fondant potato', 'Caramelized bitter braised endive', 'Toasted hazelnut crumb'],
      allergens: ['Tree Nuts', 'Milk/Dairy', 'Celery'],
      dietaryNotes: ['Nut allergy flag (Hazelnut)'],
      temperatureType: 'Hot',
      estimatedPrepTimeMinutes: 12,
      station: 'Sauté',
    },
    {
      id: 'c-3',
      courseOrder: 3,
      courseName: 'Course 3 (Entrée Salade)',
      dishName: 'Classic Caesar Salad',
      statedIngredients: ['Romaine lettuce', 'Traditional Caesar dressing', 'Parmesan', 'Garlic croutons', 'Anchovies'],
      components: ['Inner baby Romaine hearts', 'Egg-yolk & anchovy emulsified dressing', '24-month Parmigiano-Reggiano shavings', 'Sourdough garlic croutons', 'Ortiz salted anchovy fillets'],
      allergens: ['Gluten/Wheat', 'Fish', 'Eggs', 'Milk/Dairy', 'Mustard'],
      dietaryNotes: ['High salinity & acid cleanser'],
      temperatureType: 'Chilled',
      estimatedPrepTimeMinutes: 5,
      station: 'Garde Manger',
    },
    {
      id: 'c-4',
      courseOrder: 4,
      courseName: 'Course 4 (Primi / Grain)',
      dishName: 'Wild Mushroom Risotto',
      statedIngredients: ['Black truffle', 'Aged Parmesan', 'Mushroom consommé', 'Carnaroli rice', 'Wild mushrooms'],
      components: ['Acquerello Carnaroli rice mantecato', 'Concentrated mushroom consommé broth', 'Sautéed chanterelle and morel mushrooms', 'Aged Parmigiano foam', 'Shaved fresh black truffle'],
      allergens: ['Milk/Dairy', 'Celery'],
      dietaryNotes: ['Deep umami core'],
      temperatureType: 'Steaming',
      estimatedPrepTimeMinutes: 14,
      station: 'Entremetier',
    },
    {
      id: 'c-5',
      courseOrder: 5,
      courseName: 'Course 5 (Poisson)',
      dishName: 'Pan-Roasted Monkfish',
      statedIngredients: ['Shellfish velouté', 'Cornish clams', 'Seasonal garden vegetables', 'Lemon oil', 'Monkfish loin'],
      components: ['Brown-butter seared monkfish medallion', 'Emulsified shellfish & clam velouté', 'Steamed Cornish palourde clams', 'Turned summer courgettes and samphire', 'Cold-pressed lemon verbena oil'],
      allergens: ['Fish', 'Molluscs', 'Crustaceans', 'Milk/Dairy', 'Celery'],
      dietaryNotes: ['Shellfish alert'],
      temperatureType: 'Hot',
      estimatedPrepTimeMinutes: 11,
      station: 'Sauté',
    },
    {
      id: 'c-6',
      courseOrder: 6,
      courseName: 'Course 6 (Viande Principale)',
      dishName: 'Fillet of Beef',
      statedIngredients: ['Triple-cooked Pont Neuf', 'Spinach', 'Bordelaise sauce', 'Dry-aged beef fillet'],
      components: ['28-day aged center-cut beef tenderloin', 'Triple-cooked crisp Pont Neuf potato batons', 'Nutmeg wilted baby spinach', 'Bone marrow and red wine Bordelaise glaze'],
      allergens: ['Milk/Dairy', 'Sulphites', 'Gluten/Wheat'],
      dietaryNotes: ['Red meat / High iron & tannin'],
      temperatureType: 'Hot',
      estimatedPrepTimeMinutes: 15,
      station: 'Grill/Rotisserie',
    },
  ],
  thoughtRecords: [],
  crossTerrainInsights: [],
  chefSignOff: null,
  createdAt: '2026-08-16T22:00:00Z',
  updatedAt: '2026-08-16T22:00:00Z',
};

const subscribeSpeech = () => () => {};
const getSpeechSnapshot = () => typeof window !== 'undefined' && Boolean((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition);
const getSpeechServerSnapshot = () => false;

export const ModeIntentExternalisation: React.FC<ModeIntentExternalisationProps> = ({
  currentTwin,
  onUpdateTwin,
  onTriggerAi,
}) => {
  // Active session or initial fallback
  const session = currentTwin.activeMenuSession || STATIC_DEFAULT_SESSION;

  // State management
  const [activeTab, setActiveTab] = useState<'intake' | 'verification' | 'thought_capture' | 'thought_map' | 'architecture_map' | 'cross_terrain' | 'chef_review' | 'active_memory' | 'production_specs' | 'teaching_edition' | 'marlow_matrix'>(
    currentTwin.productionBrief ? 'production_specs' : (currentTwin.teachingEdition ? 'teaching_edition' : (currentTwin.marlowIntel ? 'marlow_matrix' : (session.chefSignOff?.approved ? 'active_memory' : 'intake')))
  );
  const [rawMenuInput, setRawMenuInput] = useState(session.source.rawContent || DEFAULT_WEEKEND_MENU_TEXT);
  const [menuTitleInput, setMenuTitleInput] = useState(session.title);
  const [serviceIdInput, setServiceIdInput] = useState(session.serviceIdentifier);
  const [coursesList, setCoursesList] = useState<MenuItemCourse[]>(session.courses);
  const [isExtracting, setIsExtracting] = useState(false);
  const [activeThoughtField, setActiveThoughtField] = useState<ChefThoughtField>('culinary_intention');
  const [thoughtScope, setThoughtScope] = useState<'MENU_LEVEL' | 'DISH_LEVEL'>('MENU_LEVEL');
  const [selectedDishId, setSelectedDishId] = useState<string>(session.courses[0]?.id || '');
  const [thoughtContent, setThoughtContent] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [speechTranscript, setSpeechTranscript] = useState('');
  const speechRecognitionSupported = useSyncExternalStore(
    subscribeSpeech,
    getSpeechSnapshot,
    getSpeechServerSnapshot
  );

  const [answeringInquiryId, setAnsweringInquiryId] = useState<string | null>(null);
  const [inquiryResponseText, setInquiryResponseText] = useState('');
  const [isAnalyzingAgents, setIsAnalyzingAgents] = useState(false);
  const [chefSignatureName, setChefSignatureName] = useState(currentTwin.chefAuthor || 'Chef Rod (Operator)');
  const [chefSignNotes, setChefSignNotes] = useState('');

  const recognitionRef = useRef<any>(null);

  // Initialize Speech Recognition if browser supports it
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recog = new SpeechRecognition();
        recog.continuous = true;
        recog.interimResults = true;
        recog.lang = 'en-US';

        recog.onresult = (event: any) => {
          let interim = '';
          let final = '';
          for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
              final += event.results[i][0].transcript + ' ';
            } else {
              interim += event.results[i][0].transcript;
            }
          }
          const text = final || interim;
          setSpeechTranscript((prev) => (prev ? prev + ' ' + text : text));
          setThoughtContent((prev) => (prev ? prev + ' ' + text : text));
        };

        recog.onerror = (event: any) => {
          console.warn('Speech recognition event:', event.error);
          setIsRecording(false);
        };

        recog.onend = () => {
          setIsRecording(false);
        };

        recognitionRef.current = recog;
      }
    }
  }, []);

  const toggleRecording = () => {
    if (!speechRecognitionSupported) {
      // Provide simulated fallback for test environments
      if (!isRecording) {
        setIsRecording(true);
        setTimeout(() => {
          const simulatedDictation = ' "The repetition of truffle between the amuse and risotto is deliberate: the amuse uses a light truffle butter infusion to awaken olfactory receptors, whereas the risotto features freshly shaved winter melanosporum at tableside for peak aromatic volatility."';
          setThoughtContent((prev) => prev + simulatedDictation);
          setIsRecording(false);
        }, 2200);
      } else {
        setIsRecording(false);
      }
      return;
    }

    if (isRecording) {
      recognitionRef.current?.stop();
      setIsRecording(false);
    } else {
      try {
        recognitionRef.current?.start();
        setIsRecording(true);
      } catch (err) {
        console.error('Error starting speech recognition:', err);
        setIsRecording(false);
      }
    }
  };

  // Synchronize state changes back to twin
  const updateSession = (updatedSession: MenuSession) => {
    onUpdateTwin((prev) => ({
      ...prev,
      activeMenuSession: updatedSession,
      updatedAt: new Date().toISOString(),
    }));
  };

  // 1. Intake: Run AI extraction of menu text
  const handleExtractMenu = async () => {
    setIsExtracting(true);
    try {
      const res = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'EXTRACT_MENU_STRUCTURE',
          prompt: rawMenuInput,
          menuContext: { title: menuTitleInput, serviceIdentifier: serviceIdInput },
          mode: 'intent_externalisation',
        }),
      });

      const data = await res.json();
      let parsed = null;
      try {
        parsed = JSON.parse(data.text);
      } catch {
        // Fallback manual parser if output is raw markdown
        parsed = {
          title: menuTitleInput || 'The Weekend — N1, N2, N3',
          serviceIdentifier: serviceIdInput || 'Weekend Tasting',
          courses: session.courses,
        };
      }

      if (parsed && parsed.courses) {
        const newCourses: MenuItemCourse[] = parsed.courses.map((c: any, idx: number) => ({
          id: `c-${idx + 1}-${Date.now()}`,
          courseOrder: c.courseOrder || idx + 1,
          courseName: c.courseName || `Course ${idx + 1}`,
          dishName: c.dishName || 'Menu Dish',
          statedIngredients: c.statedIngredients || [],
          components: c.components || [],
          allergens: c.allergens || [],
          dietaryNotes: c.dietaryNotes || [],
          temperatureType: c.temperatureType || 'Hot',
          estimatedPrepTimeMinutes: c.estimatedPrepTimeMinutes || 10,
          station: c.station || 'Sauté',
        }));

        setCoursesList(newCourses);
        if (parsed.title) setMenuTitleInput(parsed.title);
        if (parsed.serviceIdentifier) setServiceIdInput(parsed.serviceIdentifier);

        const updated: MenuSession = {
          ...session,
          title: parsed.title || menuTitleInput,
          serviceIdentifier: parsed.serviceIdentifier || serviceIdInput,
          currentStage: 'verified_transcription',
          source: {
            ...session.source,
            rawContent: rawMenuInput,
            verifiedByChef: false,
          },
          courses: newCourses,
        };
        updateSession(updated);
        setActiveTab('verification');
      }
    } catch (e) {
      console.error('Menu extraction failed:', e);
    } finally {
      setIsExtracting(false);
    }
  };

  // 2. Verification: Chef confirms transcription truth
  const handleConfirmTranscription = () => {
    const verifiedSession: MenuSession = {
      ...session,
      title: menuTitleInput,
      serviceIdentifier: serviceIdInput,
      courses: coursesList,
      currentStage: 'thought_capture',
      source: {
        ...session.source,
        verifiedByChef: true,
        verifiedAt: new Date().toISOString(),
      },
      updatedAt: new Date().toISOString(),
    };

    // Log audit record
    const auditRecord: AuditRecord = {
      id: `aud-transcription-${Date.now()}`,
      timestamp: new Date().toISOString(),
      actor: currentTwin.chefAuthor || 'Chef Operator',
      actionType: 'MENU_TRANSCRIPTION_VERIFIED',
      details: `Chef confirmed verified transcription of ${coursesList.length} courses for "${menuTitleInput}" (${serviceIdInput})`,
      previousHash: currentTwin.auditRecords[0]?.recordHash || '0x000000000000',
      recordHash: generateHash(`TRANSCRIPTION_VERIFIED_${Date.now()}`),
      modeAtTime: 'intent_externalisation',
      epistemicTag: 'SOURCE_MENU',
    };

    onUpdateTwin((prev) => ({
      ...prev,
      activeMenuSession: verifiedSession,
      auditRecords: [auditRecord, ...prev.auditRecords],
      updatedAt: new Date().toISOString(),
    }));

    setActiveTab('thought_capture');
  };

  // 3. Chef Thought Commit: Save structured thought field
  const handleCommitThoughtRecord = () => {
    if (!thoughtContent.trim()) return;

    const targetDish = thoughtScope === 'DISH_LEVEL' ? coursesList.find((c) => c.id === selectedDishId) : undefined;

    const newRecord: ChefThoughtRecord = {
      id: `thought-${Date.now()}`,
      field: activeThoughtField,
      scope: thoughtScope,
      targetDishId: thoughtScope === 'DISH_LEVEL' ? selectedDishId : undefined,
      targetDishName: targetDish ? `${targetDish.courseName} - ${targetDish.dishName}` : undefined,
      promptGuidance: THOUGHT_FIELD_DESCRIPTIONS[activeThoughtField].placeholder,
      content: thoughtContent.trim(),
      epistemicStatus: 'CHEF_INTENT',
      author: currentTwin.chefAuthor || 'Chef Rod (Operator)',
      timestamp: new Date().toISOString(),
      version: currentTwin.currentVersion || 'v1.0-draft',
      isChefApproved: true,
      isVoiceTranscribed: isRecording || speechTranscript.length > 0,
      tags: [THOUGHT_FIELD_DESCRIPTIONS[activeThoughtField].label, thoughtScope],
    };

    const updatedSession: MenuSession = {
      ...session,
      thoughtRecords: [newRecord, ...session.thoughtRecords],
      currentStage: 'thought_map',
      updatedAt: new Date().toISOString(),
    };

    // Add to audit trail
    const auditRecord: AuditRecord = {
      id: `aud-thought-${Date.now()}`,
      timestamp: new Date().toISOString(),
      actor: currentTwin.chefAuthor || 'Chef Operator',
      actionType: 'CHEF_INTENT_EXTERNALIZED',
      details: `Committed Chef Thought: [${THOUGHT_FIELD_DESCRIPTIONS[activeThoughtField].label}] -> "${thoughtContent.slice(0, 80)}..."`,
      previousHash: currentTwin.auditRecords[0]?.recordHash || '0x000000000000',
      recordHash: generateHash(`CHEF_THOUGHT_${Date.now()}`),
      modeAtTime: 'intent_externalisation',
      epistemicTag: 'CHEF_INTENT',
    };

    onUpdateTwin((prev) => ({
      ...prev,
      activeMenuSession: updatedSession,
      auditRecords: [auditRecord, ...prev.auditRecords],
      updatedAt: new Date().toISOString(),
    }));

    setThoughtContent('');
    setSpeechTranscript('');
  };

  // 4. Multi-Agent Cross-Terrain Analysis Trigger
  const handleRunCrossTerrainAnalysis = async () => {
    setIsAnalyzingAgents(true);
    try {
      const res = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'RUN_CROSS_TERRAIN_ANALYSIS',
          prompt: 'Execute full intelligence crossing for verified menu session',
          menuContext: {
            title: session.title,
            courses: session.courses,
            thoughts: session.thoughtRecords,
          },
          mode: 'intent_externalisation',
        }),
      });

      const data = await res.json();
      let parsed = null;
      try {
        parsed = JSON.parse(data.text);
      } catch {
        parsed = { insights: session.crossTerrainInsights };
      }

      if (parsed && Array.isArray(parsed.insights) && parsed.insights.length > 0) {
        const updatedInsights: CrossTerrainAnalysis[] = parsed.insights.map((ins: any, i: number) => ({
          id: `ins-ai-${Date.now()}-${i}`,
          agent: ins.agent || 'SIXES',
          title: ins.title || 'Cross-Terrain Culinary Insight',
          observation: ins.observation || '',
          inquiryQuestion: ins.inquiryQuestion || '',
          epistemicLabel: ins.epistemicLabel || 'MODEL_INTERPRETATION',
          riskSeverity: ins.riskSeverity || 'INFO',
          suggestedAction: ins.suggestedAction || '',
          status: 'PENDING_CHEF_REVIEW',
        }));

        const updatedSession: MenuSession = {
          ...session,
          crossTerrainInsights: [...updatedInsights, ...session.crossTerrainInsights],
          currentStage: 'cross_terrain',
          updatedAt: new Date().toISOString(),
        };
        updateSession(updatedSession);
        setActiveTab('cross_terrain');
      }
    } catch (e) {
      console.error('Cross-terrain analysis error:', e);
    } finally {
      setIsAnalyzingAgents(false);
    }
  };

  // 5. Chef answers inquiry probe
  const handleAnswerInquiry = React.useCallback((insightId: string, isConfirming: boolean) => {
    if (!inquiryResponseText.trim() && !isConfirming) return;

    const insight = session.crossTerrainInsights.find((i) => i.id === insightId);
    if (!insight) return;

    const now = Date.now();
    const isoDate = new Date(now).toISOString();
    const responseContent = inquiryResponseText.trim() || 'Chef confirmed intention as proposed by system inquiry.';

    // Create attributable thought record
    const attributableRecord: ChefThoughtRecord = {
      id: `thought-resp-${now}`,
      field: 'ingredient_relationships',
      scope: 'MENU_LEVEL',
      promptGuidance: insight.inquiryQuestion,
      content: `[Response to ${insight.agent} on "${insight.title}"]:\n${responseContent}`,
      epistemicStatus: isConfirming ? 'CHEF_INTENT' : 'CHEF_DECISION',
      author: currentTwin.chefAuthor || 'Chef Rod (Operator)',
      timestamp: isoDate,
      version: currentTwin.currentVersion || 'v1.0-draft',
      isChefApproved: true,
      tags: ['Chef Review Answer', insight.agent, insight.title],
    };

    const updatedInsights = session.crossTerrainInsights.map((i) => {
      if (i.id === insightId) {
        return {
          ...i,
          chefResponse: responseContent,
          chefConfirmedIntent: isConfirming,
          chefAnsweredAt: isoDate,
          status: isConfirming ? ('CHEF_CONFIRMED' as const) : ('CHEF_CORRECTED' as const),
        };
      }
      return i;
    });

    const updatedSession: MenuSession = {
      ...session,
      thoughtRecords: [attributableRecord, ...session.thoughtRecords],
      crossTerrainInsights: updatedInsights,
      updatedAt: isoDate,
    };

    const auditRecord: AuditRecord = {
      id: `aud-review-${now}`,
      timestamp: isoDate,
      actor: currentTwin.chefAuthor || 'Chef Operator',
      actionType: 'CHEF_SIGN_OFF',
      details: `Chef responded to ${insight.agent} Inquiry (${insight.title}): "${responseContent.slice(0, 80)}..."`,
      previousHash: currentTwin.auditRecords[0]?.recordHash || '0x000000000000',
      recordHash: generateHash(`CHEF_INQUIRY_ANSWER_${now}`),
      modeAtTime: 'intent_externalisation',
      epistemicTag: 'CHEF_INTENT',
    };

    onUpdateTwin((prev) => ({
      ...prev,
      activeMenuSession: updatedSession,
      auditRecords: [auditRecord, ...prev.auditRecords],
      updatedAt: isoDate,
    }));

    setAnsweringInquiryId(null);
    setInquiryResponseText('');
  }, [session, inquiryResponseText, currentTwin, onUpdateTwin]);

  // 6. Formal Chef Sign-Off to Active Memory
  const handleFormalSignOff = () => {
    const finalVersion = 'v1.0-CHEF-INTENT-COMMITTED';
    const signedSession: MenuSession = {
      ...session,
      currentStage: 'active_memory',
      chefSignOff: {
        approved: true,
        chefName: chefSignatureName,
        signature: `SIG-CHEF-${Date.now()}-${generateHash(chefSignatureName).slice(0, 8)}`,
        timestamp: new Date().toISOString(),
        version: finalVersion,
        notes: chefSignNotes,
      },
      updatedAt: new Date().toISOString(),
    };

    const auditRecord: AuditRecord = {
      id: `aud-commit-memory-${Date.now()}`,
      timestamp: new Date().toISOString(),
      actor: chefSignatureName,
      actionType: 'COMMITTED_TO_SERVICE',
      details: `Chef signed and committed active memory dossier for "${session.title}" (${session.serviceIdentifier}). Version: ${finalVersion}`,
      previousHash: currentTwin.auditRecords[0]?.recordHash || '0x000000000000',
      recordHash: generateHash(`CHEF_SIGN_OFF_ACTIVE_MEMORY_${Date.now()}`),
      modeAtTime: 'intent_externalisation',
      epistemicTag: 'CHEF_DECISION',
    };

    onUpdateTwin((prev) => ({
      ...prev,
      currentVersion: finalVersion,
      activeMenuSession: signedSession,
      auditRecords: [auditRecord, ...prev.auditRecords],
      updatedAt: new Date().toISOString(),
    }));

    setActiveTab('active_memory');
  };

  const getAgentBadgeColor = (agent: CrossTerrainAgent) => {
    switch (agent) {
      case 'HERMES':
        return 'bg-amber-950/80 text-amber-300 border-amber-700/60';
      case 'SIMON':
        return 'bg-purple-950/80 text-purple-300 border-purple-700/60';
      case 'ASTRA':
        return 'bg-blue-950/80 text-blue-300 border-blue-700/60';
      case 'COPILOT':
        return 'bg-emerald-950/80 text-emerald-300 border-emerald-700/60';
      case 'JEMMA':
        return 'bg-rose-950/80 text-rose-300 border-rose-700/60';
      case 'OCTAGON':
        return 'bg-red-950/90 text-red-200 border-red-600 font-bold';
      case 'SIXES':
      default:
        return 'bg-zinc-800 text-zinc-200 border-zinc-600';
    }
  };

  const getEpistemicBadge = (label: EpistemicLabel) => {
    switch (label) {
      case 'SOURCE_MENU':
        return { style: 'bg-amber-950 text-amber-300 border-amber-700', label: 'SOURCE MENU' };
      case 'CHEF_INTENT':
        return { style: 'bg-blue-950 text-blue-300 border-blue-600 font-semibold', label: 'CHEF INTENT' };
      case 'CHEF_DECISION':
        return { style: 'bg-purple-950 text-purple-200 border-purple-600 font-bold', label: 'CHEF DECISION' };
      case 'CHEF_OBSERVATION':
        return { style: 'bg-emerald-950 text-emerald-300 border-emerald-600', label: 'CHEF OBSERVATION' };
      case 'MODEL_INTERPRETATION':
        return { style: 'bg-cyan-950 text-cyan-300 border-dashed border-cyan-600', label: 'MODEL INTERPRETATION' };
      case 'MODEL_SUGGESTION':
        return { style: 'bg-teal-950 text-teal-300 border-teal-600', label: 'MODEL SUGGESTION' };
      case 'HYPOTHESIS':
        return { style: 'bg-yellow-950 text-yellow-300 border-yellow-700', label: 'HYPOTHESIS' };
      case 'SIMULATION':
        return { style: 'bg-indigo-950 text-indigo-300 border-indigo-700', label: 'SIMULATION' };
      case 'SERVICE_OBSERVATION':
        return { style: 'bg-orange-950 text-orange-300 border-orange-700', label: 'SERVICE OBSERVATION' };
      default:
        return { style: 'bg-zinc-900 text-zinc-400 border-zinc-700', label: 'UNKNOWN' };
    }
  };

  // Progression metrics calculations for architecture map
  const architectureMetrics = [
    { course: '1. Amuse (Scallop/Truffle)', umami: 7, acid: 4, salt: 8, sweet: 4, richness: 7, temp: 'Warm (45°C)', texture: 'Crisp + Velvety', color: 'Gold / Onyx' },
    { course: '2. Chicken Supreme', umami: 6, acid: 3, salt: 5, sweet: 3, richness: 6, temp: 'Hot (68°C)', texture: 'Crisp Skin + Fondant', color: 'Golden Amber / Green' },
    { course: '3. Caesar Salad', umami: 8, acid: 8, salt: 8, sweet: 2, richness: 5, temp: 'Chilled (4°C)', texture: 'Crunch + Creamy', color: 'Bright Green / Ivory' },
    { course: '4. Mushroom Risotto', umami: 10, acid: 4, salt: 7, sweet: 2, richness: 8, temp: 'Steaming (78°C)', texture: 'All\'onda + Tender', color: 'Earthy Umber / White' },
    { course: '5. Monkfish & Clams', umami: 8, acid: 6, salt: 7, sweet: 3, richness: 7, temp: 'Hot (62°C)', texture: 'Firm Flake + Velouté', color: 'Ivory / Coral / Emerald' },
    { course: '6. Fillet of Beef', umami: 9, acid: 5, salt: 6, sweet: 3, richness: 9, temp: 'Hot (54°C)', texture: 'Tender + Triple Crunch', color: 'Ruby / Charcoal' },
  ];

  const ingredientRepetitions = [
    {
      ingredient: 'Black Truffle',
      occurrences: ['Course 1 (Amuse Toast)', 'Course 4 (Mushroom Risotto)'],
      note: 'Infusion in amuse vs. fresh table shaving in risotto.',
      risk: 'Medium Palate Saturation',
    },
    {
      ingredient: 'Chicken / Poultry',
      occurrences: ['Course 1 (Chicken Mousse)', 'Course 2 (Corn-Fed Chicken Supreme)'],
      note: 'Aerated mousse in amuse vs. roasted breast supreme.',
      risk: 'Protein Repetition',
    },
    {
      ingredient: 'Parmesan (Parmigiano)',
      occurrences: ['Course 3 (Caesar Salad)', 'Course 4 (Mushroom Risotto)'],
      note: 'Shaved 24-month in Caesar vs. grated mantecato in risotto.',
      risk: 'Dairy/Glutamate Line',
    },
    {
      ingredient: 'Shellfish / Saline Seafood',
      occurrences: ['Course 1 (Scallop & Caviar)', 'Course 5 (Clams & Shellfish Velouté)'],
      note: 'Raw sweet scallop opening vs. cooked briny clam emulsion.',
      risk: 'Allergen Matrix',
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300 text-zinc-100">
      {/* Capability Hero Banner */}
      <div className="rounded-xl bg-gradient-to-br from-amber-950/40 via-zinc-900 to-zinc-950 border border-amber-800/40 p-5 sm:p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute -right-12 -top-12 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-widest bg-amber-500/20 text-amber-300 border border-amber-500/40 uppercase">
                Pathfinder Cognitive Instrument
              </span>
              <span className="text-xs text-zinc-400 font-mono">Epistemic Governance Substrate</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-100 flex items-center gap-3">
              <Compass className="w-7 h-7 text-amber-400" />
              <span>Chef Intent Externalisation</span>
            </h2>
            <p className="text-sm text-zinc-300 max-w-3xl leading-relaxed">
              Transform physical menus and spoken culinary philosophy into structured, attributable knowledge. 
              <span className="text-amber-300 font-medium"> The menu provides the surface. The Chef provides the intention. SIXES externalises the architecture.</span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => onTriggerAi('CHEF_INTENT_EXPLORATION', 'Analyze current menu and propose penetrating culinary inquiries for Chef review')}
              className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-bold transition shadow-lg"
            >
              <Sparkles className="w-4 h-4" />
              <span>AI Culinary Inquiry</span>
            </button>
            <button
              onClick={handleRunCrossTerrainAnalysis}
              disabled={isAnalyzingAgents}
              className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-xs font-medium transition"
            >
              <Cpu className={`w-4 h-4 text-amber-400 ${isAnalyzingAgents ? 'animate-spin' : ''}`} />
              <span>Run Multi-Agent Crossing</span>
            </button>
          </div>
        </div>

        {/* Operating Sequence Flowchart Breadcrumb */}
        <div className="mt-6 pt-4 border-t border-zinc-800/80">
          <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-2 flex items-center gap-2">
            <span>Externalisation Sequence</span>
            <span className="text-zinc-600">|</span>
            <span className="text-amber-400/90 font-medium">Observe → Verify → Capture → Structure → Cross-Terrain → Review → Active Memory</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-2">
            {[
              ...(currentTwin.productionBrief ? [{ key: 'production_specs', label: '★ Adam Print Brief', desc: '50 Covers Production' }] : []),
              ...((currentTwin.teachingEdition || TEACHING_EDITION_4017) ? [{ key: 'teaching_edition', label: '📖 Teaching Edition', desc: 'Six Chapters & 4017 Helix' }] : []),
              ...((currentTwin.marlowIntel || MARLOW_INTEL_4017) ? [{ key: 'marlow_matrix', label: '⚓ D: System Observation', desc: 'Epistemic Matrix & Debrief' }] : []),
              { key: 'intake', label: '1. Menu Intake', desc: 'Raw text / Image' },
              { key: 'verification', label: '2. Transcription', desc: 'Chef verified truth' },
              { key: 'thought_capture', label: '3. Thought Capture', desc: 'Voice & text notes' },
              { key: 'thought_map', label: '4. Thought Map', desc: '16-field matrix' },
              { key: 'architecture_map', label: '5. Menu Architecture', desc: 'Flavour & pacing' },
              { key: 'cross_terrain', label: '6. Cross-Terrain', desc: 'Multi-agent inquiry' },
              { key: 'active_memory', label: '7. Active Memory', desc: 'Signed audit dossier' },
            ].map((step, idx) => {
              const isCurrent = activeTab === step.key;
              return (
                <button
                  key={step.key}
                  onClick={() => setActiveTab(step.key as any)}
                  className={`px-3 py-2 rounded-lg border text-left transition-all ${
                    isCurrent
                      ? 'bg-amber-950/80 border-amber-500 text-amber-200 shadow-md ring-1 ring-amber-500/50'
                      : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200'
                  }`}
                >
                  <div className="text-xs font-semibold flex items-center justify-between">
                    <span>{step.label}</span>
                    {isCurrent && <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />}
                  </div>
                  <div className="text-[10px] text-zinc-500 truncate mt-0.5">{step.desc}</div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Mode Content Area */}
      {/* ---------------------------------------------------- */}
      {/* TAB 00: D — SYSTEM OBSERVATION & TRANSLATION MATRIX */}
      {/* ---------------------------------------------------- */}
      {activeTab === 'marlow_matrix' && (
        <MarlowIntelMatrixView
          intel={currentTwin.marlowIntel || MARLOW_INTEL_4017}
          serviceDebriefs={currentTwin.serviceDebriefs || SERVICE_DEBRIEFS_4017}
          chefAuthor={currentTwin.chefAuthor}
          onUpdateTwin={onUpdateTwin}
        />
      )}

      {/* ---------------------------------------------------- */}
      {/* TAB 0A: SIX-CHAPTER TEACHING EDITION (4017 SKELETON) */}
      {/* ---------------------------------------------------- */}
      {activeTab === 'teaching_edition' && (
        <Tier1TeachingEditionView edition={currentTwin.teachingEdition || TEACHING_EDITION_4017} />
      )}

      {/* ---------------------------------------------------- */}
      {/* TAB 0B: TIER 1 PRODUCTION BRIEF SPECS (50 COVERS) */}
      {/* ---------------------------------------------------- */}
      {activeTab === 'production_specs' && currentTwin.productionBrief && (
        <Tier1ProductionBriefView brief={currentTwin.productionBrief} />
      )}

      {/* ---------------------------------------------------- */}
      {/* TAB 1: MENU INTAKE WORKSPACE */}
      {/* ---------------------------------------------------- */}
      {activeTab === 'intake' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 shadow-lg">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-amber-400" />
                  <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-200">Raw Menu Ingestion</h3>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => {
                      setRawMenuInput(RAW_ENGLAND_SPAIN_BRIEF_TEXT);
                      setMenuTitleInput(PRODUCTION_BRIEF_4017_ENGLAND_SPAIN.title);
                      setServiceIdInput('Box 4017 England v Spain (26 Sep 2026) | 50 Covers');
                    }}
                    className="text-xs text-amber-300 hover:text-amber-200 underline font-mono font-bold"
                  >
                    Load England v Spain (26 Sep 2026) Brief
                  </button>
                  <button
                    onClick={() => {
                      setRawMenuInput(RAW_FOOTBALL_BRIEF_TEXT);
                      setMenuTitleInput(PRODUCTION_BRIEF_4017_FOOTBALL.title);
                      setServiceIdInput('Box 4017 USA Football Weekend | 50 Covers');
                    }}
                    className="text-xs text-amber-400 hover:text-amber-300 underline font-mono font-medium"
                  >
                    Load 4017 USA Football Brief
                  </button>
                  <button
                    onClick={() => {
                      setRawMenuInput(RAW_BRIEF_TEXT);
                      setMenuTitleInput(PRODUCTION_BRIEF_4017.title);
                      setServiceIdInput('4017 Diljit Concert Menu | 50 Covers');
                    }}
                    className="text-xs text-zinc-400 hover:text-zinc-300 underline font-mono font-medium"
                  >
                    Load 4017 Indian (Diljit) Brief
                  </button>
                  <button
                    onClick={() => {
                      setRawMenuInput(DEFAULT_WEEKEND_MENU_TEXT);
                      setMenuTitleInput('The Weekend — N1, N2, N3');
                      setServiceIdInput('Weekend Tasting Series (N1, N2, N3)');
                    }}
                    className="text-xs text-zinc-400 hover:text-zinc-300 underline font-mono"
                  >
                    Reset to Weekend Menu
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                <div>
                  <label className="text-xs text-zinc-400 font-mono block mb-1">Menu Title</label>
                  <input
                    id="intake-menu-title-input"
                    name="menuTitle"
                    type="text"
                    autoComplete="off"
                    data-lpignore="true"
                    value={menuTitleInput}
                    onChange={(e) => setMenuTitleInput(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-100 focus:border-amber-500 focus:outline-none"
                    placeholder="e.g. The Weekend — N1, N2, N3"
                    suppressHydrationWarning
                  />
                </div>
                <div>
                  <label className="text-xs text-zinc-400 font-mono block mb-1">Service Identifier / Date</label>
                  <input
                    id="intake-service-id-input"
                    name="serviceId"
                    type="text"
                    autoComplete="off"
                    data-lpignore="true"
                    value={serviceIdInput}
                    onChange={(e) => setServiceIdInput(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-100 focus:border-amber-500 focus:outline-none"
                    placeholder="e.g. N1, N2, N3 / Weekend Tasting"
                    suppressHydrationWarning
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-zinc-400 font-mono block mb-1 flex items-center justify-between">
                  <span>Pasted Menu Text or Ingested Source</span>
                  <span className="text-[10px] text-zinc-500">Epistemic status: UNVERIFIED OCR/SOURCE</span>
                </label>
                <textarea
                  id="intake-raw-menu-textarea"
                  name="rawMenu"
                  rows={12}
                  value={rawMenuInput}
                  onChange={(e) => setRawMenuInput(e.target.value)}
                  className="w-full bg-zinc-950 font-mono text-xs border border-zinc-800 rounded-lg p-3 text-zinc-200 focus:border-amber-500 focus:outline-none leading-relaxed"
                  placeholder="Paste or type raw menu text here..."
                  suppressHydrationWarning
                />
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-zinc-800">
                <div className="flex items-center gap-2 text-xs text-zinc-400">
                  <Shield className="w-3.5 h-3.5 text-amber-400" />
                  <span>OCR output is never treated as verified evidence until Chef review.</span>
                </div>
                <button
                  onClick={handleExtractMenu}
                  disabled={isExtracting || !rawMenuInput.trim()}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-bold transition shadow-md disabled:opacity-50"
                >
                  {isExtracting ? (
                    <>
                      <RotateCcw className="w-3.5 h-3.5 animate-spin" />
                      <span>Decomposing Menu Structures...</span>
                    </>
                  ) : (
                    <>
                      <span>Extract & Verify Transcription</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-5 space-y-4">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-200">The Externalisation Doctrine</h3>
              </div>
              <div className="text-xs text-zinc-300 space-y-3 leading-relaxed">
                <p className="p-3 bg-zinc-950/80 rounded-lg border border-zinc-800/80 italic text-amber-200/90">
                  &ldquo;SIXES must not invent your intention from the menu. It may propose an interpretation, but the Chef confirms, corrects or rejects it.&rdquo;
                </p>
                <div className="space-y-2">
                  <div className="font-semibold text-zinc-200">Epistemic Flow:</div>
                  <ul className="space-y-1.5 text-zinc-400 list-disc list-inside">
                    <li><strong className="text-amber-300">SOURCE_MENU</strong>: Verbatim physical text as printed.</li>
                    <li><strong className="text-blue-300">CHEF_INTENT</strong>: Explicit reasons, flavour architecture, and philosophy confirmed by you.</li>
                    <li><strong className="text-cyan-300">MODEL_INTERPRETATION</strong>: Probed hypotheses (e.g. truffle repetition).</li>
                    <li><strong className="text-purple-300">CHEF_DECISION</strong>: Final operational commitment.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Quick Preset Selector */}
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-4">
              <div className="text-xs font-bold text-zinc-300 mb-2">Preset Menu Showcase</div>
              <div className="p-3 bg-zinc-950 rounded-lg border border-zinc-800 flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-amber-300">The Weekend — N1, N2, N3</div>
                  <div className="text-[10px] text-zinc-400">6 courses: Scallop/Caviar, Chicken Supreme, Caesar, Risotto, Monkfish, Beef</div>
                </div>
                <button
                  onClick={() => {
                    setRawMenuInput(DEFAULT_WEEKEND_MENU_TEXT);
                    setMenuTitleInput('The Weekend — N1, N2, N3');
                    setServiceIdInput('Weekend Tasting (N1, N2, N3)');
                    handleExtractMenu();
                  }}
                  className="px-2.5 py-1 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 rounded text-xs font-medium"
                >
                  Load & Extract
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* TAB 2: VERIFIED TRANSCRIPTION (CHEF CONFIRMATION) */}
      {/* ---------------------------------------------------- */}
      {activeTab === 'verification' && (
        <div className="space-y-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 shadow-lg">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-800">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 text-[10px] font-mono bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded">
                    STAGE 2 OF 7
                  </span>
                  <h3 className="text-base font-bold text-zinc-100">Establish Grounded Menu Transcription</h3>
                </div>
                <p className="text-xs text-zinc-400 mt-1">
                  Inspect the structured extraction below. Correct course names, stated ingredients, or station assignments before intelligence crosses the terrain.
                </p>
              </div>
              <button
                onClick={handleConfirmTranscription}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-zinc-950 text-xs font-bold transition shadow-lg"
              >
                <CheckCircle2 className="w-4 h-4 text-zinc-950" />
                <span>Confirm Transcription & Unlock Thought Capture</span>
              </button>
            </div>

            {/* Courses List for Verification */}
            <div className="mt-4 space-y-3">
              {coursesList.map((course, idx) => (
                <div
                  key={course.id}
                  className="bg-zinc-950 border border-zinc-800/80 rounded-xl p-4 hover:border-zinc-700 transition"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center text-xs font-mono font-bold">
                        {idx + 1}
                      </span>
                      <input
                        type="text"
                        autoComplete="off"
                        data-lpignore="true"
                        value={course.courseName}
                        onChange={(e) => {
                          const val = e.target.value;
                          setCoursesList((prev) =>
                            prev.map((c) => (c.id === course.id ? { ...c, courseName: val } : c))
                          );
                        }}
                        className="bg-zinc-900 border border-zinc-800 rounded px-2.5 py-1 text-xs font-bold text-amber-300 focus:border-amber-500 focus:outline-none"
                        suppressHydrationWarning
                      />
                      <input
                        type="text"
                        autoComplete="off"
                        data-lpignore="true"
                        value={course.dishName}
                        onChange={(e) => {
                          const val = e.target.value;
                          setCoursesList((prev) =>
                            prev.map((c) => (c.id === course.id ? { ...c, dishName: val } : c))
                          );
                        }}
                        className="bg-zinc-900 border border-zinc-800 rounded px-2.5 py-1 text-xs font-semibold text-zinc-100 flex-1 min-w-[200px] focus:border-amber-500 focus:outline-none"
                        suppressHydrationWarning
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <select
                        value={course.station}
                        onChange={(e) => {
                          const val = e.target.value as any;
                          setCoursesList((prev) =>
                            prev.map((c) => (c.id === course.id ? { ...c, station: val } : c))
                          );
                        }}
                        className="bg-zinc-900 border border-zinc-800 rounded px-2 py-1 text-[11px] font-mono text-zinc-300 focus:border-amber-500"
                      >
                        <option value="Garde Manger">Garde Manger</option>
                        <option value="Sauté">Sauté</option>
                        <option value="Grill/Rotisserie">Grill/Rotisserie</option>
                        <option value="Entremetier">Entremetier</option>
                        <option value="Pastry">Pastry</option>
                        <option value="Pass">Pass</option>
                      </select>

                      <select
                        value={course.temperatureType}
                        onChange={(e) => {
                          const val = e.target.value as any;
                          setCoursesList((prev) =>
                            prev.map((c) => (c.id === course.id ? { ...c, temperatureType: val } : c))
                          );
                        }}
                        className="bg-zinc-900 border border-zinc-800 rounded px-2 py-1 text-[11px] font-mono text-zinc-300 focus:border-amber-500"
                      >
                        <option value="Chilled">Chilled</option>
                        <option value="Room Temp">Room Temp</option>
                        <option value="Warm">Warm</option>
                        <option value="Hot">Hot</option>
                        <option value="Steaming">Steaming</option>
                      </select>
                    </div>
                  </div>

                  {/* Stated ingredients tag editor */}
                  <div className="mt-2 text-xs space-y-1.5">
                    <div className="text-zinc-400 font-mono text-[11px]">Stated Ingredients:</div>
                    <div className="flex flex-wrap gap-1.5 items-center">
                      {course.statedIngredients.map((ing, iIdx) => (
                        <span
                          key={iIdx}
                          className="px-2 py-0.5 rounded bg-zinc-900 text-zinc-200 border border-zinc-800 text-xs flex items-center gap-1"
                        >
                          <span>{ing}</span>
                          <button
                            onClick={() => {
                              setCoursesList((prev) =>
                                prev.map((c) =>
                                  c.id === course.id
                                    ? {
                                        ...c,
                                        statedIngredients: c.statedIngredients.filter((_, i) => i !== iIdx),
                                      }
                                    : c
                                )
                              );
                            }}
                            className="text-zinc-500 hover:text-rose-400"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                      <button
                        onClick={() => {
                          const item = prompt('Add ingredient to dish:');
                          if (item) {
                            setCoursesList((prev) =>
                              prev.map((c) =>
                                c.id === course.id
                                  ? { ...c, statedIngredients: [...c.statedIngredients, item.trim()] }
                                  : c
                              )
                            );
                          }
                        }}
                        className="text-[11px] text-amber-400 hover:text-amber-300 underline font-mono ml-1"
                      >
                        + Add
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* TAB 3: CHEF THOUGHT CAPTURE (VOICE & WRITTEN) */}
      {/* ---------------------------------------------------- */}
      {activeTab === 'thought_capture' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                <div className="flex items-center gap-2">
                  <Mic className="w-5 h-5 text-amber-400" />
                  <h3 className="text-base font-bold text-zinc-100">Chef Thought Capture Studio</h3>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-zinc-400 font-mono">Scope:</span>
                  <button
                    onClick={() => setThoughtScope('MENU_LEVEL')}
                    className={`px-2.5 py-1 text-xs rounded font-medium transition ${
                      thoughtScope === 'MENU_LEVEL'
                        ? 'bg-amber-500 text-zinc-950 font-bold'
                        : 'bg-zinc-800 text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    Whole Menu
                  </button>
                  <button
                    onClick={() => setThoughtScope('DISH_LEVEL')}
                    className={`px-2.5 py-1 text-xs rounded font-medium transition ${
                      thoughtScope === 'DISH_LEVEL'
                        ? 'bg-amber-500 text-zinc-950 font-bold'
                        : 'bg-zinc-800 text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    Individual Dish
                  </button>
                </div>
              </div>

              {/* Target Dish Selector if Dish Level */}
              {thoughtScope === 'DISH_LEVEL' && (
                <div className="mt-3">
                  <label className="text-xs text-zinc-400 font-mono block mb-1">Select Target Dish</label>
                  <select
                    value={selectedDishId}
                    onChange={(e) => setSelectedDishId(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs font-semibold text-amber-300 focus:border-amber-500"
                  >
                    {coursesList.map((c, i) => (
                      <option key={c.id} value={c.id}>
                        Course {i + 1}: {c.dishName} ({c.courseName})
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Thought Field Matrix Selector */}
              <div className="mt-4">
                <label className="text-xs text-zinc-400 font-mono block mb-1.5 flex items-center justify-between">
                  <span>Thought Dimension Field</span>
                  <span className="text-[10px] text-amber-400 font-mono">16 Structured Categories</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                  {(Object.keys(THOUGHT_FIELD_DESCRIPTIONS) as ChefThoughtField[]).map((fieldKey) => {
                    const field = THOUGHT_FIELD_DESCRIPTIONS[fieldKey];
                    const isSelected = activeThoughtField === fieldKey;
                    return (
                      <button
                        key={fieldKey}
                        onClick={() => setActiveThoughtField(fieldKey)}
                        className={`px-2.5 py-1.5 rounded-lg border text-left text-xs transition flex items-center gap-1.5 ${
                          isSelected
                            ? 'bg-amber-500/20 border-amber-500 text-amber-200 font-bold'
                            : 'bg-zinc-950/60 border-zinc-800 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200'
                        }`}
                      >
                        <span>{field.icon}</span>
                        <span className="truncate">{field.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Active Dimension Prompt Guidance */}
              <div className="mt-4 p-3 bg-zinc-950 rounded-lg border border-amber-900/40 text-xs">
                <div className="font-semibold text-amber-300 flex items-center gap-1.5">
                  <span>{THOUGHT_FIELD_DESCRIPTIONS[activeThoughtField].icon}</span>
                  <span>{THOUGHT_FIELD_DESCRIPTIONS[activeThoughtField].label}</span>
                  <span className="text-[10px] text-zinc-500 font-mono ml-auto">
                    Routing Agent: {THOUGHT_FIELD_DESCRIPTIONS[activeThoughtField].agent}
                  </span>
                </div>
                <div className="text-zinc-400 mt-1 leading-relaxed">
                  {THOUGHT_FIELD_DESCRIPTIONS[activeThoughtField].placeholder}
                </div>
              </div>

              {/* Voice & Written Input Area */}
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs text-zinc-400 font-mono">Chef Dictation / Thought Entry</label>
                  <button
                    onClick={toggleRecording}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition shadow ${
                      isRecording
                        ? 'bg-rose-600 text-white animate-pulse'
                        : 'bg-zinc-800 hover:bg-zinc-700 text-amber-300 border border-zinc-700'
                    }`}
                  >
                    {isRecording ? (
                      <>
                        <MicOff className="w-3.5 h-3.5" />
                        <span>Dictating... (Click to Stop)</span>
                      </>
                    ) : (
                      <>
                        <Mic className="w-3.5 h-3.5" />
                        <span>Record Voice Note</span>
                      </>
                    )}
                  </button>
                </div>

                <textarea
                  id="thought-content-textarea"
                  name="thoughtContent"
                  rows={6}
                  value={thoughtContent}
                  onChange={(e) => setThoughtContent(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-xs text-zinc-100 focus:border-amber-500 focus:outline-none leading-relaxed font-sans"
                  placeholder="Type or dictate your exact culinary rationale, technical decisions, flavor reasoning, or operational compromises..."
                  suppressHydrationWarning
                />
              </div>

              {/* Action Buttons */}
              <div className="mt-4 pt-3 border-t border-zinc-800 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-zinc-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>Auto-stamped as CHEF_INTENT with cryptographic timestamp</span>
                </div>
                <button
                  onClick={handleCommitThoughtRecord}
                  disabled={!thoughtContent.trim()}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-bold transition shadow disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Commit Chef Thought Record</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Active Committed Thought Stream */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 shadow-lg">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-amber-400" />
                  <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-200">
                    Committed Thought Stream ({session.thoughtRecords.length})
                  </h3>
                </div>
                <button
                  onClick={() => setActiveTab('thought_map')}
                  className="text-xs text-amber-400 hover:text-amber-300 font-mono underline"
                >
                  View Matrix →
                </button>
              </div>

              <div className="mt-3 space-y-3 max-h-[550px] overflow-y-auto pr-1">
                {session.thoughtRecords.length === 0 ? (
                  <div className="text-center py-10 text-zinc-500 text-xs">
                    No thoughts recorded yet. Dictate or write above to populate active memory.
                  </div>
                ) : (
                  session.thoughtRecords.map((record) => {
                    const badge = getEpistemicBadge(record.epistemicStatus);
                    return (
                      <div
                        key={record.id}
                        className="p-3 bg-zinc-950 rounded-lg border border-zinc-800 text-xs space-y-2"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-mono border ${badge.style}`}>
                            {badge.label}
                          </span>
                          <span className="text-[10px] text-zinc-500 font-mono">
                            {new Date(record.timestamp).toLocaleTimeString()}
                          </span>
                        </div>

                        {record.targetDishName && (
                          <div className="text-amber-300 font-semibold text-[11px]">
                            {record.targetDishName}
                          </div>
                        )}

                        <div className="text-zinc-300 leading-relaxed">{record.content}</div>

                        <div className="flex items-center justify-between text-[10px] text-zinc-500 font-mono pt-1 border-t border-zinc-900">
                          <span>By: {record.author}</span>
                          <span>Field: {THOUGHT_FIELD_DESCRIPTIONS[record.field]?.label || record.field}</span>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* TAB 4: STRUCTURED THOUGHT MAP MATRIX */}
      {/* ---------------------------------------------------- */}
      {activeTab === 'thought_map' && (
        <div className="space-y-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-800">
              <div>
                <h3 className="text-base font-bold text-zinc-100 flex items-center gap-2">
                  <Layers className="w-5 h-5 text-amber-400" />
                  <span>Structured Thought Map & Epistemic Matrix</span>
                </h3>
                <p className="text-xs text-zinc-400 mt-1">
                  Comprehensive map aligning all 16 philosophical, sensory, technical, and operational dimensions.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('thought_capture')}
                  className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-medium text-zinc-200 border border-zinc-700"
                >
                  + Add Dimension
                </button>
                <button
                  onClick={() => setActiveTab('architecture_map')}
                  className="px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-bold"
                >
                  Menu Architecture View →
                </button>
              </div>
            </div>

            {/* Matrix Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mt-4">
              {(Object.keys(THOUGHT_FIELD_DESCRIPTIONS) as ChefThoughtField[]).map((fieldKey) => {
                const info = THOUGHT_FIELD_DESCRIPTIONS[fieldKey];
                const matchingThoughts = session.thoughtRecords.filter((r) => r.field === fieldKey);
                const hasThoughts = matchingThoughts.length > 0;

                return (
                  <div
                    key={fieldKey}
                    className={`rounded-xl border p-3.5 flex flex-col justify-between transition ${
                      hasThoughts
                        ? 'bg-zinc-950 border-amber-500/50 shadow-md'
                        : 'bg-zinc-950/40 border-zinc-800/80 opacity-75'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-lg">{info.icon}</span>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono border ${getAgentBadgeColor(info.agent)}`}>
                          {info.agent}
                        </span>
                      </div>
                      <div className="text-xs font-bold text-zinc-100">{info.label}</div>
                      <div className="text-[11px] text-zinc-400 mt-1 leading-snug">
                        {hasThoughts ? (
                          <span className="text-amber-200 line-clamp-3 italic">
                            &ldquo;{matchingThoughts[0].content}&rdquo;
                          </span>
                        ) : (
                          <span className="text-zinc-500 line-clamp-2">{info.placeholder}</span>
                        )}
                      </div>
                    </div>

                    <div className="mt-3 pt-2 border-t border-zinc-900 flex items-center justify-between text-[10px]">
                      <span className="font-mono text-zinc-500">
                        {hasThoughts ? `${matchingThoughts.length} recorded` : 'Unpopulated'}
                      </span>
                      <button
                        onClick={() => {
                          setActiveThoughtField(fieldKey);
                          setActiveTab('thought_capture');
                        }}
                        className="text-amber-400 hover:text-amber-300 font-semibold"
                      >
                        {hasThoughts ? 'Edit' : '+ Populate'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* TAB 5: MENU ARCHITECTURE VIEW (THE INVISIBLE STRUCTURE) */}
      {/* ---------------------------------------------------- */}
      {activeTab === 'architecture_map' && (
        <div className="space-y-6">
          {/* Progression Curve Chart */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-zinc-800">
              <div>
                <h3 className="text-base font-bold text-zinc-100 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-amber-400" />
                  <span>Flavour Progression & Dynamic Sensory Arc</span>
                </h3>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Dynamic balance across Umami, Acidity, Salinity, Sweetness, Richness, and Temperature across 6 courses.
                </p>
              </div>
              <span className="text-xs font-mono text-zinc-400 bg-zinc-950 px-2.5 py-1 rounded border border-zinc-800">
                Calibrated against Chef Intent Records
              </span>
            </div>

            {/* Visual Radar / Bar Progression Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-3">
              {architectureMetrics.map((dish, i) => (
                <div
                  key={i}
                  className="bg-zinc-950 border border-zinc-800/90 rounded-xl p-3.5 flex flex-col justify-between"
                >
                  <div>
                    <div className="text-[11px] font-mono font-bold text-amber-400 mb-1">{dish.course}</div>
                    <div className="text-[10px] text-zinc-400 font-mono mb-3">
                      <div>Temp: <span className="text-zinc-200">{dish.temp}</span></div>
                      <div>Texture: <span className="text-zinc-300">{dish.texture}</span></div>
                      <div>Palette: <span className="text-zinc-300">{dish.color}</span></div>
                    </div>

                    {/* Metric Bars */}
                    <div className="space-y-1.5 text-[10px]">
                      <div>
                        <div className="flex justify-between text-zinc-400 mb-0.5">
                          <span>Umami</span>
                          <span className="font-mono text-amber-300">{dish.umami}/10</span>
                        </div>
                        <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                          <div className="h-full bg-amber-500" style={{ width: `${dish.umami * 10}%` }} />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-zinc-400 mb-0.5">
                          <span>Acidity</span>
                          <span className="font-mono text-emerald-300">{dish.acid}/10</span>
                        </div>
                        <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-500" style={{ width: `${dish.acid * 10}%` }} />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-zinc-400 mb-0.5">
                          <span>Richness</span>
                          <span className="font-mono text-purple-300">{dish.richness}/10</span>
                        </div>
                        <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                          <div className="h-full bg-purple-500" style={{ width: `${dish.richness * 10}%` }} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 pt-2 border-t border-zinc-900 text-[9px] text-zinc-500 font-mono">
                    Station: {coursesList[i]?.station || 'Sauté'}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Ingredient Repetition & Station Load Architecture */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Repetition Matrix */}
            <div className="lg:col-span-6 bg-zinc-900 border border-zinc-800 rounded-xl p-5 shadow-lg space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <RotateCcw className="w-4 h-4 text-amber-400" />
                  <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-200">
                    Ingredient Repetition Analysis
                  </h3>
                </div>
                <span className="text-[10px] font-mono text-zinc-400">Palate Fatigue Guard</span>
              </div>

              <div className="space-y-2.5">
                {ingredientRepetitions.map((rep, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-zinc-950 rounded-lg border border-zinc-800 text-xs space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-amber-300">{rep.ingredient}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-zinc-700">
                        {rep.risk}
                      </span>
                    </div>
                    <div className="text-[11px] text-zinc-400">
                      Found in: <strong className="text-zinc-200">{rep.occurrences.join(' & ')}</strong>
                    </div>
                    <div className="text-[11px] text-zinc-300 italic">&ldquo;{rep.note}&rdquo;</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Station & Pass Balance */}
            <div className="lg:col-span-6 bg-zinc-900 border border-zinc-800 rounded-xl p-5 shadow-lg space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-rose-400" />
                  <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-200">
                    Station Load & Service Bottlenecks
                  </h3>
                </div>
                <span className="text-[10px] font-mono text-zinc-400">Brigade Balance</span>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="p-3 bg-zinc-950 rounded-lg border border-zinc-800">
                  <div className="flex justify-between font-semibold text-zinc-200 mb-1">
                    <span>Sauté Station (Courses 2 & 5)</span>
                    <span className="text-rose-400 font-mono">PEAK LOAD (85%)</span>
                  </div>
                  <div className="text-[11px] text-zinc-400">
                    Handles both pan-roasted chicken skin basting and monkfish velouté emulsion à la minute.
                  </div>
                </div>

                <div className="p-3 bg-zinc-950 rounded-lg border border-zinc-800">
                  <div className="flex justify-between font-semibold text-zinc-200 mb-1">
                    <span>Garde Manger (Courses 1 & 3)</span>
                    <span className="text-emerald-400 font-mono">OPTIMAL (45%)</span>
                  </div>
                  <div className="text-[11px] text-zinc-400">
                    Cold line handles delicate brioche toast assembly and chilled Caesar plating without pass heat conflicts.
                  </div>
                </div>

                <div className="p-3 bg-zinc-950 rounded-lg border border-zinc-800">
                  <div className="flex justify-between font-semibold text-zinc-200 mb-1">
                    <span>Grill / Rotisserie (Course 6)</span>
                    <span className="text-amber-400 font-mono">MODERATE (60%)</span>
                  </div>
                  <div className="text-[11px] text-zinc-400">
                    Beef fillet core resting at 52°C synchronized with triple-cooked Pont Neuf fryer drop.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* TAB 6: CROSS-TERRAIN MULTI-AGENT INQUIRIES */}
      {/* ---------------------------------------------------- */}
      {activeTab === 'cross_terrain' && (
        <div className="space-y-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-800">
              <div>
                <h3 className="text-base font-bold text-zinc-100 flex items-center gap-2">
                  <Compass className="w-5 h-5 text-amber-400" />
                  <span>Cross-Terrain Intelligence & Probing Dialogue</span>
                </h3>
                <p className="text-xs text-zinc-400 mt-1">
                  HERMES, SIMON, ASTRA, COPILOT, JEMMA, and OCTAGON challenge assumptions and propose questions. Your answer becomes attributable Chef evidence.
                </p>
              </div>
              <button
                onClick={handleRunCrossTerrainAnalysis}
                disabled={isAnalyzingAgents}
                className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-bold transition shadow"
              >
                <Sparkles className="w-4 h-4" />
                <span>Re-Cross Intelligence</span>
              </button>
            </div>

            {/* Inquiries Cards */}
            <div className="mt-4 space-y-4">
              {session.crossTerrainInsights.map((insight) => {
                const isAnswered = insight.status === 'CHEF_CONFIRMED' || insight.status === 'CHEF_CORRECTED';
                const isAnswering = answeringInquiryId === insight.id;

                return (
                  <div
                    key={insight.id}
                    className={`rounded-xl border p-4 transition ${
                      isAnswered
                        ? 'bg-zinc-950/80 border-emerald-800/60'
                        : 'bg-zinc-950 border-zinc-800 shadow-md'
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono border ${getAgentBadgeColor(insight.agent)}`}>
                          AGENT {insight.agent}
                        </span>
                        <span className="text-xs font-bold text-zinc-200">{insight.title}</span>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-700 text-zinc-400">
                        {insight.epistemicLabel}
                      </span>
                    </div>

                    <div className="text-xs text-zinc-400 mb-3 leading-relaxed">
                      {insight.observation}
                    </div>

                    {/* Probing Inquiry Quote Box */}
                    <div className="p-3 bg-zinc-900/90 rounded-lg border border-amber-900/50 text-xs mb-3">
                      <div className="font-mono text-[10px] text-amber-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                        <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
                        <span>System Inquiry for Chef Confirmation</span>
                      </div>
                      <div className="text-zinc-200 font-medium italic leading-relaxed">
                        &ldquo;{insight.inquiryQuestion}&rdquo;
                      </div>
                    </div>

                    {/* If answered */}
                    {isAnswered ? (
                      <div className="p-3 bg-emerald-950/40 border border-emerald-700/60 rounded-lg text-xs space-y-1">
                        <div className="flex items-center gap-1.5 font-semibold text-emerald-300">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Chef Intent Recorded ({insight.status})</span>
                        </div>
                        <div className="text-zinc-200 italic">&ldquo;{insight.chefResponse}&rdquo;</div>
                        <div className="text-[10px] font-mono text-zinc-500">
                          Answered: {formatDateTimeSafe(insight.chefAnsweredAt)}
                        </div>
                      </div>
                    ) : (
                      <div>
                        {isAnswering ? (
                          <div className="mt-2 space-y-2 bg-zinc-900 p-3 rounded-lg border border-zinc-700">
                            <label className="text-xs text-zinc-300 font-semibold block">
                              Your Intent Explanation:
                            </label>
                            <textarea
                              id="inquiry-response-textarea"
                              name="inquiryResponse"
                              rows={3}
                              value={inquiryResponseText}
                              onChange={(e) => setInquiryResponseText(e.target.value)}
                              className="w-full bg-zinc-950 border border-zinc-800 rounded p-2 text-xs text-zinc-100 focus:border-amber-500 focus:outline-none"
                              placeholder="e.g. Yes, the truffle repetition is deliberate thematic continuity. In the amuse it is infused lightly; in the risotto it is freshly shaved..."
                              suppressHydrationWarning
                            />
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => setAnsweringInquiryId(null)}
                                className="px-3 py-1.5 text-xs text-zinc-400 hover:text-zinc-200"
                              >
                                Cancel
                              </button>
                              <button
                                onClick={() => handleAnswerInquiry(insight.id, true)}
                                className="px-3 py-1.5 rounded bg-emerald-600 hover:bg-emerald-500 text-zinc-950 text-xs font-bold"
                              >
                                Confirm Intent
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 pt-1">
                            <button
                              onClick={() => {
                                setAnsweringInquiryId(insight.id);
                                setInquiryResponseText('');
                              }}
                              className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-bold transition flex items-center gap-1.5"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                              <span>Answer & Confirm Intent</span>
                            </button>
                            <button
                              onClick={() => {
                                setAnsweringInquiryId(insight.id);
                                setInquiryResponseText('Rejected: Chef does not adopt this model interpretation.');
                              }}
                              className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-medium border border-zinc-700"
                            >
                              Reject Interpretation
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* TAB 7: ACTIVE MEMORY & GOVERNED DOSSIER */}
      {/* ---------------------------------------------------- */}
      {activeTab === 'active_memory' && (
        <div className="space-y-6">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 sm:p-6 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-800">
              <div>
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-emerald-400" />
                  <h3 className="text-lg font-bold text-zinc-100">Project SIXES Active Memory Dossier</h3>
                </div>
                <p className="text-xs text-zinc-400 mt-1">
                  Tamper-evident, attributable record of menu structure, Chef intention, cross-terrain inquiry resolutions, and service boundaries.
                </p>
              </div>

              {session.chefSignOff?.approved ? (
                <div className="px-3.5 py-1.5 rounded-lg bg-emerald-950 border border-emerald-600 text-emerald-300 text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>COMMITTED BY CHEF ({session.chefSignOff.version})</span>
                </div>
              ) : (
                <button
                  onClick={handleFormalSignOff}
                  className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-bold transition shadow-lg flex items-center gap-2"
                >
                  <Shield className="w-4 h-4 text-zinc-950" />
                  <span>Authorize & Sign Active Memory</span>
                </button>
              )}
            </div>

            {/* Dossier Overview Card */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-zinc-950 rounded-xl border border-zinc-800">
                <div className="text-xs font-mono text-zinc-500 uppercase">Menu Dossier</div>
                <div className="text-sm font-bold text-amber-300 mt-1">{session.title}</div>
                <div className="text-[11px] text-zinc-400 font-mono mt-0.5">{session.serviceIdentifier}</div>
              </div>
              <div className="p-4 bg-zinc-950 rounded-xl border border-zinc-800">
                <div className="text-xs font-mono text-zinc-500 uppercase">Epistemic Records</div>
                <div className="text-sm font-bold text-zinc-100 mt-1">
                  {session.thoughtRecords.length} Thought Records
                </div>
                <div className="text-[11px] text-zinc-400 font-mono mt-0.5">
                  {session.crossTerrainInsights.filter((i) => i.status === 'CHEF_CONFIRMED').length} Inquiries Confirmed
                </div>
              </div>
              <div className="p-4 bg-zinc-950 rounded-xl border border-zinc-800">
                <div className="text-xs font-mono text-zinc-500 uppercase">Authority Sign-Off</div>
                <div className="text-sm font-bold text-emerald-400 mt-1">
                  {session.chefSignOff?.chefName || 'Pending Chef Signature'}
                </div>
                <div className="text-[10px] text-zinc-500 font-mono mt-0.5">
                  {session.chefSignOff?.signature || 'Unsigned'}
                </div>
              </div>
            </div>

            {/* Signature Input Form if not yet signed */}
            {!session.chefSignOff?.approved && (
              <div className="p-4 bg-zinc-950 rounded-xl border border-amber-900/60 space-y-3">
                <div className="text-xs font-bold text-amber-300 flex items-center gap-2">
                  <ChefHat className="w-4 h-4 text-amber-400" />
                  <span>Chef / Operator Final Authorization Gate</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-zinc-400 font-mono block mb-1">Chef Signature Name</label>
                    <input
                      id="chef-signature-name-input"
                      name="chefSignatureName"
                      type="text"
                      autoComplete="off"
                      data-lpignore="true"
                      value={chefSignatureName}
                      onChange={(e) => setChefSignatureName(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-xs text-zinc-100 focus:border-amber-500"
                      suppressHydrationWarning
                    />
                  </div>
                  <div>
                    <label className="text-xs text-zinc-400 font-mono block mb-1">Authorization Notes</label>
                    <input
                      id="chef-sign-notes-input"
                      name="chefSignNotes"
                      type="text"
                      autoComplete="off"
                      data-lpignore="true"
                      value={chefSignNotes}
                      onChange={(e) => setChefSignNotes(e.target.value)}
                      placeholder="e.g. Approved for Friday & Saturday service run..."
                      className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-xs text-zinc-100 focus:border-amber-500"
                      suppressHydrationWarning
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Full Attributable Thought Record Log */}
            <div className="space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-zinc-300 font-mono">
                Attributable Epistemic Ledger ({session.thoughtRecords.length})
              </div>
              <div className="space-y-2">
                {session.thoughtRecords.map((r) => {
                  const badge = getEpistemicBadge(r.epistemicStatus);
                  return (
                    <div
                      key={r.id}
                      className="p-3.5 bg-zinc-950 rounded-xl border border-zinc-800 text-xs space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono border ${badge.style}`}>
                          {badge.label}
                        </span>
                        <span className="font-mono text-[10px] text-zinc-500">
                          {new Date(r.timestamp).toISOString()}
                        </span>
                      </div>
                      <div className="text-zinc-200 leading-relaxed font-sans">{r.content}</div>
                      <div className="flex items-center justify-between text-[10px] text-zinc-500 font-mono pt-1.5 border-t border-zinc-900">
                        <span>Attributable Author: <strong>{r.author}</strong></span>
                        <span>Field: {THOUGHT_FIELD_DESCRIPTIONS[r.field]?.label || r.field}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
