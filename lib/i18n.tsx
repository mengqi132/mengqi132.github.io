'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export type Lang = 'en' | 'zh';

const dict = {
  en: {
    name: 'Yizhou Zhang',
    zhName: '章一舟',
    role1: 'Incoming Ph.D. Student',
    role2: 'Tsinghua University',
    nav: { about: 'About', publications: 'Publications', education: 'Education', awards: 'Awards', contact: 'Contact' },
    heroLines: [
      'Pretraining foundation models',
      'that can sense, reason about,',
      'and predict the physical world.',
    ],
    heroBio:
      'I am an incoming Ph.D. student at the Vanke School of Public Health, Tsinghua University, currently completing my undergraduate studies at the School of Mathematical Sciences, Ocean University of China. My research centers on the pretraining of physics foundation models, with particular emphasis on representation learning and generalization across physical systems. In parallel, I am exploring agentic reinforcement learning, studying how physical intelligence can emerge in agents through interaction with real world physical trajectories. I am currently seeking an internship in agent reinforcement learning post training.',
    facts: [
      { label: 'Now', value: 'Incoming Ph.D. student, Vanke School of Public Health, Tsinghua University', link: 'https://www.tsinghua.edu.cn', linkText: 'Tsinghua University' },
      { label: 'Focus', value: 'Pretraining of physics foundation models; Agentic RL', link: null, linkText: null },
      { label: 'Before', value: 'Undergraduate, School of Mathematical Sciences, Ocean University of China', link: 'https://www.ouc.edu.cn', linkText: 'Ocean University of China' },
    ] as { label: string; value: string; link: string | null; linkText: string | null }[],
    pubTitle: 'Publications',
    pubSearch: 'Search title, author, venue…',
    pubFilters: { all: 'All', journal: 'Journal', conference: 'Conference', workshop: 'Workshop' },
    pubEmpty: 'No matching publications. Try a different keyword or filter.',
    bibtex: 'BibTeX',
    copy: 'Copy',
    copied: 'Copied',
    linkLabels: { page: 'Page', pdf: 'PDF', doi: 'DOI', code: 'Code' },
    figureHint: 'Representative figure',
    figureHintPath: 'drop an image at /public',
    statusPublished: 'Published',
    statusAccepted: 'Accepted',
    eduTitle: 'Education',
    edu: [
      {
        period: '2027 — 2032',
        school: 'Tsinghua University',
        url: 'https://www.tsinghua.edu.cn',
        detail: 'Ph.D. student, Vanke School of Public Health',
        tag: 'Incoming',
      },
      {
        period: '2023 — 2027',
        school: 'Ocean University of China',
        url: 'https://www.ouc.edu.cn',
        detail: 'Undergraduate, School of Mathematical Sciences',
        tag: 'Expected 2027',
      },
    ],
    awardTitle: 'Awards',
    awards: [
      { year: '2025', title: 'National Scholarship' },
      { year: '2025', title: 'Gold Medal — iGEM International Genetically Engineered Machine Competition' },
      { year: '2025', title: 'First Prize, National Final — Shenzhen Cup National Undergraduate Mathematical Modeling Challenge' },
    ] as { year: string; title: string }[],
    contactTitle: 'Contact',
    contactNote:
      'I am actively seeking research collaborations on Physical AI and agentic RL, as well as internship opportunities in agent RL post-training — feel free to reach out by email.',
    footerLeft: '© 2026 Yizhou Zhang',
    footerRight: 'Next.js · Framer Motion · GitHub Pages',
    themeToggle: 'Toggle theme',
    langToggle: '中文',
  },
  zh: {
    name: '章一舟',
    zhName: 'Yizhou Zhang',
    role1: '博士研究生（准入学）',
    role2: '清华大学',
    nav: { about: '关于', publications: '论文发表', education: '教育经历', awards: '荣誉奖项', contact: '联系方式' },
    heroLines: [
      '预训练能够感知、',
      '理解并推理物理世界的',
      '基础模型。',
    ],
    heroBio:
      '我即将入学清华大学万科公共卫生学院攻读博士学位，目前就读于中国海洋大学数学科学学院。我的研究聚焦于物理基础模型的预训练，尤其关注物理系统中的表示学习与跨系统泛化。与此同时，我正在探索智能体强化学习（agentic RL），研究物理智能如何通过与真实世界的物理轨迹交互而在智能体中涌现。我目前正在寻找智能体强化学习后训练方向的实习机会。',
    facts: [
      { label: '现在', value: '清华大学万科公共卫生学院 准博士研究生', link: 'https://www.tsinghua.edu.cn', linkText: '清华大学' },
      { label: '方向', value: '物理基础模型预训练；智能体强化学习（Agentic RL）', link: null, linkText: null },
      { label: '此前', value: '中国海洋大学数学科学学院 本科生', link: 'https://www.ouc.edu.cn', linkText: '中国海洋大学' },
    ] as { label: string; value: string; link: string | null; linkText: string | null }[],
    pubTitle: '论文发表',
    pubSearch: '搜索标题、作者、期刊会议……',
    pubFilters: { all: '全部', journal: '期刊', conference: '会议', workshop: '工作坊' },
    pubEmpty: '没有匹配的论文，换个关键词或筛选条件试试。',
    bibtex: 'BibTeX',
    copy: '复制',
    copied: '已复制',
    linkLabels: { page: '主页', pdf: 'PDF', doi: 'DOI', code: '代码' },
    figureHint: '代表性图片位',
    figureHintPath: '将图片放入 /public',
    statusPublished: '已发表',
    statusAccepted: '已录用',
    eduTitle: '教育经历',
    edu: [
      {
        period: '2027 — 2032',
        school: '清华大学',
        url: 'https://www.tsinghua.edu.cn',
        detail: '博士研究生 · 万科公共卫生学院',
        tag: '准入学',
      },
      {
        period: '2023 — 2027',
        school: '中国海洋大学',
        url: 'https://www.ouc.edu.cn',
        detail: '本科生 · 数学科学学院',
        tag: '预计 2027 年毕业',
      },
    ],
    awardTitle: '荣誉奖项',
    awards: [
      { year: '2025', title: '国家奖学金' },
      { year: '2025', title: 'iGEM 国际基因工程大赛 金奖' },
      { year: '2025', title: '深圳杯全国大学生数学建模挑战赛 全国总决赛一等奖' },
    ] as { year: string; title: string }[],
    contactTitle: '联系方式',
    contactNote: '我正在寻求物理智能（Physical AI）与智能体强化学习（Agentic RL）方向的科研合作，以及 agent RL 后训练方向的实习机会——欢迎随时邮件联系。',
    footerLeft: '© 2026 章一舟',
    footerRight: 'Next.js · Framer Motion · GitHub Pages',
    themeToggle: '切换主题',
    langToggle: 'EN',
  },
};

export type Dict = (typeof dict)['en'];

const LangContext = createContext<{ lang: Lang; t: Dict; setLang: (l: Lang) => void }>({
  lang: 'en',
  t: dict.en,
  setLang: () => {},
});

export function LangProvider({ children }: { children: ReactNode }) {
  // English is the default; a stored preference (if any) wins.
  const [lang, setLangState] = useState<Lang>('en');

  useEffect(() => {
    const stored = localStorage.getItem('lang');
    setLangState(stored === 'zh' || stored === 'en' ? stored : 'en');
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem('lang', l);
  };

  return (
    <LangContext.Provider value={{ lang, t: dict[lang] as Dict, setLang }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);
