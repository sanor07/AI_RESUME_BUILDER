const SECTION_FIELDS = {
  personal: ['fullName', 'jobTitle', 'summary'],
  contact: ['email', 'phone', 'address', 'linkedin', 'website'],
};

const KEYWORD_HINTS = [
  'leadership',
  'analytics',
  'collaboration',
  'automation',
  'strategy',
  'optimization',
  'communication',
  'stakeholder',
];

const hasText = (value) => Boolean(String(value || '').trim());

const countFilled = (items, keys) =>
  items.reduce(
    (total, item) => total + keys.reduce((sum, key) => sum + (hasText(item[key]) ? 1 : 0), 0),
    0
  );

export function getSectionProgress(state) {
  const personalFilled = SECTION_FIELDS.personal.filter((key) => hasText(state.fields[key])).length;
  const contactFilled = SECTION_FIELDS.contact.filter((key) => hasText(state.fields[key])).length;
  const experienceTotal = Math.max(state.experiences.length * 5, 5);
  const projectTotal = Math.max(state.projects.length * 4, 4);
  const educationTotal = Math.max(state.educations.length * 4, 4);

  return {
    personal: Math.round((personalFilled / SECTION_FIELDS.personal.length) * 100),
    contact: Math.round((contactFilled / SECTION_FIELDS.contact.length) * 100),
    skills: Math.min(100, Math.round((state.skills.length / 8) * 100)),
    experience: Math.round((countFilled(state.experiences, ['role', 'company', 'startDate', 'endDate', 'desc']) / experienceTotal) * 100),
    projects: Math.round((countFilled(state.projects, ['name', 'techStack', 'notes', 'desc']) / projectTotal) * 100),
    education: Math.round((countFilled(state.educations, ['degree', 'school', 'year', 'desc']) / educationTotal) * 100),
  };
}

export function getResumeCompletion(state) {
  const progress = getSectionProgress(state);
  const weights = {
    personal: 18,
    contact: 14,
    skills: 18,
    experience: 24,
    projects: 12,
    education: 14,
  };

  return Math.round(
    Object.entries(weights).reduce((total, [key, weight]) => total + (progress[key] / 100) * weight, 0)
  );
}

export function getAtsEstimate(state) {
  const completion = getResumeCompletion(state);
  const hasImpactWords =
    /increased|reduced|improved|launched|built|led|managed|delivered|optimized|automated|\d+%|\$|revenue/i.test(
      [
        state.fields.summary,
        ...state.experiences.map((item) => item.desc),
        ...state.projects.map((item) => item.desc),
      ].join(' ')
    );
  const keywordBonus = Math.min(12, state.skills.length * 2);
  return Math.min(98, Math.round(completion * 0.78 + keywordBonus + (hasImpactWords ? 8 : 0)));
}

export function getMissingKeywordHints(state) {
  const resumeText = [
    state.fields.summary,
    state.fields.jobTitle,
    state.skills.join(' '),
    ...state.experiences.map((item) => item.desc),
    ...state.projects.map((item) => `${item.techStack} ${item.desc}`),
  ]
    .join(' ')
    .toLowerCase();

  return KEYWORD_HINTS.filter((keyword) => !resumeText.includes(keyword)).slice(0, 4);
}
