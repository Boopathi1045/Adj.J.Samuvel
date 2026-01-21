
import { Article, Category, Milestone, PracticeArea } from './types';

export const INITIAL_ARTICLES: Article[] = [
  {
    id: '1',
    title: 'Understanding Procedural Due Process',
    excerpt: 'A deep dive into the constitutional requirements of fair legal proceedings and why they form the bedrock of our judicial system.',
    content: 'Procedural due process is a constitutional requirement that when the federal government acts in such a way that it denies a citizen of a life, liberty, or property interest, the person must be given notice, the opportunity to be heard, and a decision by a neutral decision-maker.\n\nIn the Indian context, this is deeply embedded in Article 21 of the Constitution. For a young practitioner, mastering these procedures is essential to ensuring that every client receives a fair trial. Whether in civil or criminal litigation, the adherence to these principles maintains the integrity of the judiciary.',
    category: Category.CRIMINAL,
    date: 'May 12, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=800',
    isFeatured: true
  },
  {
    id: '2',
    title: 'The Role of Mediation in Family Disputes',
    excerpt: 'Practical steps for families seeking resolution outside of the courtroom, focusing on constructive communication.',
    content: 'Mediation offers a path to resolution that is often less adversarial and more sustainable than litigation. Especially in family matters, preserving relationships while solving disputes is of paramount importance.\n\nAs an advocate, my role extends beyond the courtroom to facilitate dialogues that lead to amicable settlements. This approach not only saves time and resources for the clients but also fosters a more harmonious legal ecosystem.',
    category: Category.FAMILY,
    date: 'Apr 28, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '3',
    title: 'Navigating Local Court Procedures',
    excerpt: 'An analysis of the specific judicial protocols within the Theni District Court and regional jurisdictions.',
    content: 'Every District Court has its nuances. For clients, the legal process can be daunting. This article provides a high-level overview of how to prepare for your first court appearance and what to expect from the judicial process.\n\nFrom filing documentation to understanding the hierarchy of the bench, awareness is the first step toward justice.',
    category: Category.CIVIL,
    date: 'Apr 15, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1423592707957-3b212afa6733?auto=format&fit=crop&q=80&w=800'
  }
];

export const MILESTONES: Milestone[] = [
  {
    year: '',
    title: 'Proven Strategic Solutions',
    description: 'Consistently delivering strategic solutions through dedicated practice and meticulous research for complex legal challenges.',
    icon: 'gavel',
    badge: 'Success'
  },
  {
    year: '',
    title: 'High Court Bar Affiliate',
    description: 'Inducted into the prestigious High Court Bar Association, allowing for representation at the highest levels of the judiciary.',
    icon: 'verified',
    badge: 'Credential'
  },
  {
    year: '',
    title: 'Moot Court Excellence',
    description: 'Sharpened advocacy through rigorous moot court battles. Recognized for precision, research, and persuasive argumentation.',
    icon: 'school',
    badge: 'Advocacy'
  },
  {
    year: '',
    title: 'Published Legal Insights',
    description: 'Legal insights published across respected platforms, each article reflecting clarity, research, and practical relevance.',
    icon: 'edit_note',
    badge: 'Research'
  }
];

export const PRACTICE_AREAS: PracticeArea[] = [
  {
    title: 'Civil Litigation',
    description: 'Representing clients in property disputes, contract enforcement, and civil recovery matters.',
    imageUrl: 'https://images.unsplash.com/photo-1453928582365-b6ad33cbcf64?auto=format&fit=crop&q=80&w=400'
  },
  {
    title: 'Criminal Defense',
    description: 'Providing robust defense services and safeguarding rights across various criminal proceedings.',
    imageUrl: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=400'
  },
  {
    title: 'Family Matters',
    description: 'Compassionate and ethical counsel for matrimonial, mediation, and domestic legal issues.',
    imageUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=400'
  },
  {
    title: 'District Court Affairs',
    description: 'Expert handling of documentation and procedural affairs within the regional judicial framework.',
    imageUrl: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80&w=400'
  }
];
