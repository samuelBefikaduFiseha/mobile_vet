export type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string;
  category: string;
  cover_image: string | null;
  author: string;
  read_minutes: number;
  is_featured: boolean;
  published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

export type CaseStudyMetric = {
  value: string;
  label: string;
};

export type CaseStudy = {
  id: string;
  slug: string;
  title: string;
  region: string;
  region_tag: string | null;
  cover_image: string | null;
  summary: string;
  body: string;
  testimonial_quote: string | null;
  testimonial_author: string | null;
  metrics: CaseStudyMetric[];
  report_url: string | null;
  published: boolean;
  created_at: string;
  updated_at: string;
};

export type Subscriber = {
  id: string;
  email: string;
  source: string | null;
  is_active: boolean;
  created_at: string;
};

export type ContactMessage = {
  id: string;
  full_name: string;
  email: string;
  organization: string | null;
  message: string;
  status: string;
  created_at: string;
};
