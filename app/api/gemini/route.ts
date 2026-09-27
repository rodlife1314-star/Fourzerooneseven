import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

export async function POST(req: NextRequest) {
  try {
    const { action, prompt, twinContext, menuContext, mode } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'GEMINI_API_KEY is not configured in server environment.' },
        { status: 500 }
      );
    }

    const ai = new GoogleGenAI({ apiKey });

    const systemInstruction = `You are the Project SIXES Culinary Digital Twin Intelligence Engine, operating on the Pathfinder Digital Twin substrate.
Core Doctrine & Rules:
1. "The database suggests. Models compare and simulate. Standards inform. The Chef decides."
2. Epistemic Separation is absolute:
   - SOURCE_MENU: Direct transcript from original menu document.
   - CHEF_INTENT: Explicit thoughts, selections, and motives confirmed by the Chef.
   - CHEF_DECISION: Formal operational authorizations signed by the Chef.
   - MODEL_INTERPRETATION / MODEL_SUGGESTION: AI inferences and proposals (MUST be labelled as such).
   - HYPOTHESIS: Unproven speculative culinary theories.
   - SIMULATION: Modeled predictions (yield, thermal decay, station load).
   - SERVICE_OBSERVATION: Observed empirical kitchen reality.
3. Never claim the Chef's intention without explicit confirmation.
   - CORRECT: "SIXES interprets the repeated use of black truffle across the Amuse and Risotto as possible thematic continuity or efficient luxury procurement. Is this deliberate?"
   - INCORRECT: "The Chef used truffle to create thematic continuity."
4. Multi-Agent Cross-Terrain Roles:
   - HERMES: Provenance, classical references (e.g. Escoffier, Bocuse, Modernist Cuisine), ingredient ratios.
   - SIMON: Flavour architecture, colour harmonics, umami/acid balances, textural counterpoints.
   - ASTRA: Temporal continuity, menu lineage, memory, previous service variances.
   - COPILOT: Station production logic, MEP requirements, holding decay curves, pass bottlenecks.
   - JEMMA: Counterfactual challenger, sensory fatigue risks, allergen concentrations, safety thresholds.
   - OCTAGON: Pathfinder governance, STOP conditions, strict validation before operational commit.
   - SIXES: Executive Orchestrator.
5. Provide precise culinary terminology, temperatures in °C, chemical mechanisms (Maillard kinetics, pectin gelatinization, fat crystallization, enzymatic breakdown), and practical brigade station realities.`;

    let customPrompt = '';

    if (action === 'EXTRACT_MENU_STRUCTURE') {
      customPrompt = `${systemInstruction}

TASK: Extract raw menu text/input into a structured JSON menu representation.
Raw Input:
${prompt}

Respond strictly in valid JSON format matching this schema:
{
  "title": "The Weekend — N1, N2, N3",
  "serviceIdentifier": "N1, N2, N3",
  "eventDate": "Upcoming Weekend Service",
  "courses": [
    {
      "courseOrder": 1,
      "courseName": "Amuse-Bouche",
      "dishName": "Scallop Toast, Chicken Mousse, Oscietra Caviar, Black Truffle",
      "statedIngredients": ["Scallop", "Chicken mousse", "Oscietra caviar", "Black truffle", "Brioche toast"],
      "components": ["Crisp scallop toast", "Aerated chicken mousse", "Oscietra caviar garnish", "Shaved black truffle"],
      "allergens": ["Gluten/Wheat", "Molluscs", "Fish", "Eggs", "Milk/Dairy"],
      "temperatureType": "Warm",
      "estimatedPrepTimeMinutes": 4,
      "station": "Garde Manger"
    }
  ],
  "preliminaryNotes": "Identified 6 courses spanning Amuse through Main fillet. Truffle and chicken appear across multiple items."
}`;
    } else if (action === 'RUN_CROSS_TERRAIN_ANALYSIS') {
      customPrompt = `${systemInstruction}

TASK: Perform multi-agent Cross-Terrain Intelligence Analysis across this verified menu and Chef thoughts.
Menu & Thought Context:
${JSON.stringify(menuContext || {})}

Generate multi-agent insights from HERMES, SIMON, ASTRA, COPILOT, JEMMA, OCTAGON, and SIXES.
Include respectful, penetrating probing questions for the Chef to externalise their intention.

Respond strictly in valid JSON format:
{
  "insights": [
    {
      "agent": "SIMON",
      "title": "Truffle Thematic Arch vs Palate Saturation",
      "observation": "Black truffle is featured in both the Amuse-Bouche (Scallop toast) and Course 3 (Wild Mushroom Risotto).",
      "inquiryQuestion": "The menu repeats black truffle across the amuse and risotto. Is this deliberate thematic continuity, an available premium ingredient being used efficiently, or something you would reconsider to avoid sensory fatigue?",
      "epistemicLabel": "MODEL_INTERPRETATION",
      "riskSeverity": "INFO",
      "suggestedAction": "Seek Chef confirmation on whether risotto truffle is shaved fresh at table vs infused in stock."
    },
    {
      "agent": "JEMMA",
      "title": "Protein Duplication: Chicken Mousse & Chicken Supreme",
      "observation": "Avian poultry protein appears in Course 1 (Chicken Mousse on scallop toast) and Course 2 (Corn-Fed Chicken Supreme).",
      "inquiryQuestion": "With chicken present in the opening amuse and the second course, is this intended as a subtle textural preview, or does it risk flattening protein diversity before monkfish and beef?",
      "epistemicLabel": "MODEL_INTERPRETATION",
      "riskSeverity": "WARNING",
      "suggestedAction": "Confirm if amuse mousse can be substituted with whitefish or bone marrow emulsion."
    },
    {
      "agent": "COPILOT",
      "title": "Pass Congestion at Course 5 & 6 (Monkfish & Beef)",
      "observation": "Both Pan-Roasted Monkfish (Sauté) and Fillet of Beef (Grill/Sauté + Pont Neuf fryer) require high-heat finishing at pass within 8-minute intervals.",
      "inquiryQuestion": "What is your holding tolerance on the shellfish velouté and Bordelaise reduction during peak 40-cover rush?",
      "epistemicLabel": "MODEL_SUGGESTION",
      "riskSeverity": "WARNING",
      "suggestedAction": "Set thermal circulator bath for Bordelaise at 64°C to relieve sauté station saucier."
    },
    {
      "agent": "OCTAGON",
      "title": "Allergen Boundary Check on Shellfish Velouté",
      "observation": "Monkfish velouté incorporates Cornish clams and crustacean stock. Cross-contact risk with fish course.",
      "inquiryQuestion": "Have separate non-shellfish emulsion recovery lines been approved for guests with crustacean allergies?",
      "epistemicLabel": "MODEL_INTERPRETATION",
      "riskSeverity": "CRITICAL",
      "suggestedAction": "Mark safety stop until non-shellfish alternative (e.g. brown butter dashi) is logged."
    }
  ],
  "orchestratorSummary": "Executive summary of menu architecture strengths, tensions, and opportunities."
}`;
    } else {
      customPrompt = `${systemInstruction}

Current Operating Mode: ${mode || 'Exploration'}
Twin Context: ${JSON.stringify(twinContext || {})}
Menu Context: ${JSON.stringify(menuContext || {})}

Requested Action: ${action || 'General Culinary Inquiry'}
Chef Prompt / Task: ${prompt}`;
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: customPrompt,
      config:
        action === 'EXTRACT_MENU_STRUCTURE' || action === 'RUN_CROSS_TERRAIN_ANALYSIS'
          ? { responseMimeType: 'application/json' }
          : undefined,
    });

    return NextResponse.json({
      text: response.text,
      mode,
      action,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('Gemini API Error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error processing AI request.' },
      { status: 500 }
    );
  }
}
