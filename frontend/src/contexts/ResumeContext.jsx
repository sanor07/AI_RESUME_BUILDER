import { createContext, useContext, useReducer, useCallback } from 'react';

/* ============================================================
   ResumeContext
   ------------------------------------------------------------
   This is a direct port of the state shape that lived as loose
   module-level variables in the old script.js:
     let currentTemplate, skills, experiences, educations,
         photoDataUrl, zoomLevel, expIdCounter, eduIdCounter

   Kept as ONE context (not split per-section) because the live
   preview needs to read the whole tree on every keystroke —
   splitting it would just mean prop-drilling it back together
   in <LivePreview>. If perf ever becomes an issue, memoize the
   template components instead of splitting the context.
   ============================================================ */

const initialState = {
  fields: {
    fullName: '',
    jobTitle: '',
    summary: '',
    email: '',
    phone: '',
    address: '',
    linkedin: '',
    website: '',
  },
  skills: [],
  experiences: [],
  educations: [],
  projects: [],
  photoDataUrl: '',
  currentTemplate: 1,
  zoomLevel: 1,
  // AI-generated content cache, keyed by feature — populated in Phase 5.
  ai: {
    summary: null,
    atsScore: null,
    jobMatch: null,
  },
};

let expIdCounter = 0;
let eduIdCounter = 0;
let projectIdCounter = 0;

function resumeReducer(state, action) {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, fields: { ...state.fields, [action.key]: action.value } };

    case 'SET_PHOTO':
      return { ...state, photoDataUrl: action.dataUrl };

    case 'SET_TEMPLATE':
      return { ...state, currentTemplate: action.template };

    case 'SET_ZOOM':
      return { ...state, zoomLevel: Math.min(1.5, Math.max(0.4, Math.round(action.level * 10) / 10)) };

    case 'ADD_SKILL': {
      const name = action.name.trim();
      if (!name || state.skills.includes(name)) return state;
      return { ...state, skills: [...state.skills, name] };
    }

    case 'REMOVE_SKILL':
      return { ...state, skills: state.skills.filter((_, i) => i !== action.index) };

    case 'ADD_EXPERIENCE':
      return {
        ...state,
        experiences: [
          ...state.experiences,
          { id: expIdCounter++, role: '', company: '', startDate: '', endDate: '', desc: '' },
        ],
      };

    case 'UPDATE_EXPERIENCE':
      return {
        ...state,
        experiences: state.experiences.map((exp) =>
          exp.id === action.id ? { ...exp, [action.key]: action.value } : exp
        ),
      };

    case 'REPLACE_EXPERIENCE':
      return {
        ...state,
        experiences: state.experiences.map((exp) =>
          exp.id === action.id ? { ...exp, ...action.data } : exp
        ),
      };

    case 'REMOVE_EXPERIENCE':
      return { ...state, experiences: state.experiences.filter((e) => e.id !== action.id) };

    case 'ADD_EDUCATION':
      return {
        ...state,
        educations: [
          ...state.educations,
          { id: eduIdCounter++, degree: '', school: '', year: '', desc: '' },
        ],
      };

    case 'UPDATE_EDUCATION':
      return {
        ...state,
        educations: state.educations.map((edu) =>
          edu.id === action.id ? { ...edu, [action.key]: action.value } : edu
        ),
      };

    case 'REMOVE_EDUCATION':
      return { ...state, educations: state.educations.filter((e) => e.id !== action.id) };

    case 'ADD_PROJECT':
      return {
        ...state,
        projects: [
          ...state.projects,
          { id: projectIdCounter++, name: '', techStack: '', notes: '', desc: '' },
        ],
      };

    case 'UPDATE_PROJECT':
      return {
        ...state,
        projects: state.projects.map((project) =>
          project.id === action.id ? { ...project, [action.key]: action.value } : project
        ),
      };

    case 'REMOVE_PROJECT':
      return { ...state, projects: state.projects.filter((p) => p.id !== action.id) };

    case 'SET_AI_RESULT':
      return { ...state, ai: { ...state.ai, [action.key]: action.value } };

    case 'RESET':
      expIdCounter = 0;
      eduIdCounter = 0;
      projectIdCounter = 0;
      return initialState;

    default:
      return state;
  }
}

const ResumeContext = createContext(null);

export function ResumeProvider({ children }) {
  const [state, dispatch] = useReducer(resumeReducer, initialState);

  // Action creators — components call these instead of dispatching raw
  // action objects, so the reducer's shape can change without touching
  // every component that reads/writes state.
  const actions = {
    setField: useCallback((key, value) => dispatch({ type: 'SET_FIELD', key, value }), []),
    setPhoto: useCallback((dataUrl) => dispatch({ type: 'SET_PHOTO', dataUrl }), []),
    setTemplate: useCallback((template) => dispatch({ type: 'SET_TEMPLATE', template }), []),
    setZoom: useCallback((level) => dispatch({ type: 'SET_ZOOM', level }), []),
    addSkill: useCallback((name) => dispatch({ type: 'ADD_SKILL', name }), []),
    removeSkill: useCallback((index) => dispatch({ type: 'REMOVE_SKILL', index }), []),
    addExperience: useCallback(() => dispatch({ type: 'ADD_EXPERIENCE' }), []),
    updateExperience: useCallback(
      (id, key, value) => dispatch({ type: 'UPDATE_EXPERIENCE', id, key, value }),
      []
    ),
    replaceExperience: useCallback(
      (id, data) => dispatch({ type: 'REPLACE_EXPERIENCE', id, data }),
      []
    ),
    removeExperience: useCallback((id) => dispatch({ type: 'REMOVE_EXPERIENCE', id }), []),
    addEducation: useCallback(() => dispatch({ type: 'ADD_EDUCATION' }), []),
    updateEducation: useCallback(
      (id, key, value) => dispatch({ type: 'UPDATE_EDUCATION', id, key, value }),
      []
    ),
    removeEducation: useCallback((id) => dispatch({ type: 'REMOVE_EDUCATION', id }), []),
    addProject: useCallback(() => dispatch({ type: 'ADD_PROJECT' }), []),
    updateProject: useCallback(
      (id, key, value) => dispatch({ type: 'UPDATE_PROJECT', id, key, value }),
      []
    ),
    removeProject: useCallback((id) => dispatch({ type: 'REMOVE_PROJECT', id }), []),
    setAiResult: useCallback((key, value) => dispatch({ type: 'SET_AI_RESULT', key, value }), []),
    reset: useCallback(() => dispatch({ type: 'RESET' }), []),
  };

  return (
    <ResumeContext.Provider value={{ state, actions }}>{children}</ResumeContext.Provider>
  );
}

export function useResume() {
  const ctx = useContext(ResumeContext);
  if (!ctx) throw new Error('useResume must be used within a ResumeProvider');
  return ctx;
}