-- Mobile Vet — Supabase schema
-- Run this in the Supabase SQL editor (or psql) once per project.

-- ──────────────────────────────────────────────────────────────────────────
-- Helpers
-- ──────────────────────────────────────────────────────────────────────────
create extension if not exists "pgcrypto";

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ──────────────────────────────────────────────────────────────────────────
-- posts (blog articles)
-- ──────────────────────────────────────────────────────────────────────────
create table if not exists public.posts (
  id            uuid primary key default gen_random_uuid(),
  slug          text not null unique,
  title         text not null,
  excerpt       text,
  content       text not null,
  category      text not null default 'Field Stories',
  cover_image   text,
  author        text not null default 'Mobile Vet Team',
  read_minutes  integer not null default 5,
  is_featured   boolean not null default false,
  published     boolean not null default false,
  published_at  timestamptz,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

drop trigger if exists trg_posts_updated_at on public.posts;
create trigger trg_posts_updated_at
before update on public.posts
for each row execute procedure public.set_updated_at();

create index if not exists posts_published_at_idx
  on public.posts (published_at desc);
create index if not exists posts_category_idx on public.posts (category);

-- ──────────────────────────────────────────────────────────────────────────
-- case_studies
-- ──────────────────────────────────────────────────────────────────────────
create table if not exists public.case_studies (
  id              uuid primary key default gen_random_uuid(),
  slug            text not null unique,
  title           text not null,
  region          text not null,
  region_tag      text,
  cover_image     text,
  summary         text not null,
  body            text not null,
  testimonial_quote text,
  testimonial_author text,
  metrics         jsonb not null default '[]'::jsonb,
  report_url      text,
  published       boolean not null default true,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

drop trigger if exists trg_case_studies_updated_at on public.case_studies;
create trigger trg_case_studies_updated_at
before update on public.case_studies
for each row execute procedure public.set_updated_at();

-- ──────────────────────────────────────────────────────────────────────────
-- subscribers (newsletter)
-- ──────────────────────────────────────────────────────────────────────────
create table if not exists public.subscribers (
  id          uuid primary key default gen_random_uuid(),
  email       text not null unique,
  source      text default 'blog',
  is_active   boolean not null default true,
  created_at  timestamptz not null default now()
);

-- ──────────────────────────────────────────────────────────────────────────
-- contact_messages (from home contact form)
-- ──────────────────────────────────────────────────────────────────────────
create table if not exists public.contact_messages (
  id            uuid primary key default gen_random_uuid(),
  full_name     text not null,
  email         text not null,
  organization  text,
  message       text not null,
  status        text not null default 'new',
  created_at    timestamptz not null default now()
);

-- ──────────────────────────────────────────────────────────────────────────
-- Row level security
--
-- We expose only published rows to the public anon role and let the
-- service-role key (used in server actions) do everything else.
-- ──────────────────────────────────────────────────────────────────────────
alter table public.posts          enable row level security;
alter table public.case_studies   enable row level security;
alter table public.subscribers    enable row level security;
alter table public.contact_messages enable row level security;

drop policy if exists "Public can read published posts" on public.posts;
create policy "Public can read published posts"
  on public.posts for select
  using (published = true);

drop policy if exists "Public can read published case studies" on public.case_studies;
create policy "Public can read published case studies"
  on public.case_studies for select
  using (published = true);

drop policy if exists "Public can subscribe" on public.subscribers;
create policy "Public can subscribe"
  on public.subscribers for insert
  with check (true);

drop policy if exists "Public can send contact message" on public.contact_messages;
create policy "Public can send contact message"
  on public.contact_messages for insert
  with check (true);

-- ──────────────────────────────────────────────────────────────────────────
-- Seed content (optional, only inserted if table is empty).
-- ──────────────────────────────────────────────────────────────────────────
insert into public.posts (
  slug, title, excerpt, content, category, cover_image, author,
  read_minutes, is_featured, published, published_at
)
select
  'borena-early-warning-2025',
  'How Early Warnings Saved 2,000 Heads of Cattle in Borena During the 2025 Drought',
  'Satellite data flagged abnormal vegetation decline three weeks before traditional indicators. The result: strategic herd splitting, early market sales, and zero mortality in enrolled households compared to 30% losses in neighbouring communities.',
  E'When NDVI signals turned red across southern Borena in March 2025, our team had a difficult question: would farmers act on a warning that contradicted what their own eyes were telling them? The grass still looked green. Skies still promised rain.\n\nOver the next three weeks Mobile Vet sent 400 pastoralist families a sequence of SMS and USSD nudges in Afaan Oromo. Each message paired the satellite signal with one concrete next step — split the herd, walk north to Gelbo, sell the weak animals at the Jillo market before prices fell.\n\nBy the end of the dry season, enrolled households had recorded zero mortality. Matched control communities lost about 30% of their herds. This is the story of how the alerts were generated, why elders chose to trust them, and what we learned about pairing satellite intelligence with traditional pasture knowledge.',
  'Field Stories',
  'https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=1600&q=80',
  'Dr. Abebe Kebede',
  8,
  true,
  true,
  now() - interval '6 days'
where not exists (select 1 from public.posts);

insert into public.posts (
  slug, title, excerpt, content, category, cover_image, author,
  read_minutes, published, published_at
)
select * from (values
  (
    'meet-fatuma-somali-pastoralist',
    'Meet Fatuma: A Somali Region Pastoralist Using Mobile Vet for the First Time',
    '"I used to lose animals every dry season because I waited too long to move. Now my phone tells me when the grass is running out before my eyes can see it."',
    E'Fatuma Mohamed has herded camels for thirty years near Jijiga. This is her first season with Mobile Vet — and the first dry season she has not lost an animal.\n\nShe walks us through what the SMS alerts actually look like on her Nokia, the questions she asked the field team before agreeing to tag her herd, and the cultural protocols she insisted on for the women in her community.',
    'Field Stories',
    'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=80',
    'Mobile Vet Field Team',
    6,
    true,
    now() - interval '12 days'
  ),
  (
    'training-drought-model-20-years',
    'How We Trained Our Drought Prediction Model on 20 Years of Ethiopian Satellite Data',
    'Our ML team explains the data pipeline: from NASA MODIS vegetation indices to localised risk scores delivered via USSD to basic mobile phones.',
    E'Predicting drought in the Horn of Africa is not a problem of data availability — it is a problem of data fusion. This deep-dive walks through how Mobile Vet stitches NASA MODIS NDVI, CHIRPS rainfall estimates, ERA5 surface temperatures and ground-station observations into a single per-woreda risk score, and why every score that ships to a farmer has to be co-signed by a regional veterinary officer.',
    'Technology',
    'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80',
    'ML Engineering',
    9,
    true,
    now() - interval '25 days'
  ),
  (
    'cbpp-containment-afar',
    'Contagious Bovine Pleuropneumonia (CBPP) Outbreak Contained in Afar: A Case Study',
    'Real-time alert networks and digital vaccination records helped veterinary teams contain a CBPP outbreak within a 15km radius instead of the typical 50km spread.',
    E'When the first cough was reported at the Awash Fentale clinic, the regional response normally would have taken three days. With Mobile Vet, the radius was geofenced and 1,200 animals were vaccinated within 18 hours.',
    'Livestock Health',
    'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1600&q=80',
    'Dr. Mohamed Hassan',
    7,
    true,
    now() - interval '38 days'
  ),
  (
    'ethiopia-livestock-identification-policy',
    'Ethiopia''s New Livestock Identification Policy: What It Means for Pastoralist Financial Inclusion',
    'How the 2026 National Livestock Traceability Framework creates the regulatory foundation for digital collateral and index-based insurance.',
    E'For the first time, a national framework formally recognises digital livestock identity as proof of ownership. Here is what changes for banks, insurers and farmers — and what is still missing.',
    'Policy',
    'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1600&q=80',
    'Policy Team',
    10,
    true,
    now() - interval '48 days'
  ),
  (
    'chirps-rainfall-pipeline',
    'From CHIRPS Rainfall Data to Farmer Action: Our Geospatial Pipeline Explained',
    'A technical deep-dive into how we process satellite rainfall estimates, combine them with ground-station data, and generate pasture forecasts.',
    E'CHIRPS gives us 5km-resolution rainfall. Pastoralists graze across territories an order of magnitude smaller. Here is how we downscale, validate and turn it into a single sentence on a Nokia.',
    'Technology',
    'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1600&q=80',
    'Geospatial Team',
    8,
    true,
    now() - interval '60 days'
  ),
  (
    'community-engagement-borena',
    'Building Trust in Technology: Community Engagement Lessons from Borena',
    'Why we spent three months listening before deploying tags. The cultural protocols, elder consultations, and gender considerations that shaped our rollout.',
    E'Tagging an animal is not a technical decision. It is a cultural one. These are the lessons we learned from elders, women''s groups and youth in Dillo before a single ear tag was clipped.',
    'Field Stories',
    'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1600&q=80',
    'Community Engagement',
    6,
    true,
    now() - interval '76 days'
  )
) as v(slug,title,excerpt,content,category,cover_image,author,read_minutes,published,published_at)
where not exists (select 1 from public.posts where posts.slug = v.slug);

insert into public.case_studies (
  slug, title, region, region_tag, cover_image, summary, body,
  testimonial_quote, testimonial_author, metrics
)
select * from (values
  (
    'borena-drought-early-warning',
    'Drought Early Warning: From Reactive Crisis to Proactive Herd Management',
    'Borena',
    'Borena Zone, Oromia',
    'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=80',
    'In collaboration with the Borena Zone Pastoralist Office and a local NGO, Mobile Vet deployed 4,500 RFID-GPS tags and 3 LoRaWAN base stations to test whether satellite-based drought alerts could change farmer behaviour before visible pasture degradation.',
    E'Working across 18 woredas in Borena Zone, the pilot combined satellite NDVI, CHIRPS rainfall and field reports from veterinary extension workers. Alerts were issued in Afaan Oromo via SMS and USSD, paired with three concrete recommendations per message: where to move, what to sell, and when to vaccinate.',
    'Before Mobile Vet, we only moved when we saw animals dying. Last season, my phone told me to move three weeks earlier than normal. I sold 20 weak animals at good prices and moved my core herd to better grazing. I lost zero animals while my neighbour lost 15.',
    'Guyo Boru, Pastoralist, Dillo Woreda, Borena',
    '[{"value":"28%","label":"Reduction in drought-related mortality vs. control group"},{"value":"14 days","label":"Average early warning lead time"},{"value":"94%","label":"Farmers who acted on SMS alerts"},{"value":"450km","label":"Total herd movement tracked"}]'::jsonb
  ),
  (
    'afar-livestock-collateral',
    'Digital Traceability Unlocks First Livestock Collateral Loans for Pastoralists',
    'Afar',
    'Afar Region',
    'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?auto=format&fit=crop&w=1600&q=80',
    'Working with a regional microfinance institution and the Afar Regional Veterinary Services, Mobile Vet created digital livestock passports for 2,800 animals across 180 households. These verified records enabled the first-ever livestock-collateralised credit products in the region.',
    E'The pilot paired RFID-GPS tag data with veterinary verification and consent-based sharing to a regional microfinance partner. Loan officers could verify ownership, valuation and vaccination status directly from the platform without leaving the office.',
    'I have owned cattle for 20 years but never could get a loan because banks said I had no proof of ownership. Now my phone shows every animal I own, its vaccinations, and its value. I got a 15,000 ETB loan to buy feed during the dry season.',
    'Amira Ali, Pastoralist, Awash Fentale Woreda, Afar',
    '[{"value":"180","label":"Households with verified digital records"},{"value":"2,800","label":"Animals registered as loan collateral"},{"value":"1.2M ETB","label":"Total credit disbursed"},{"value":"98%","label":"Loan repayment rate (vs. 72% regional average)"}]'::jsonb
  ),
  (
    'somali-cbpp-containment',
    'Containment of CBPP Outbreak Through Real-Time Alert Networks',
    'Somali',
    'Somali Region',
    'https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?auto=format&fit=crop&w=1600&q=80',
    'A Contagious Bovine Pleuropneumonia outbreak detected in Jijiga zone triggered automated quarantine alerts to all registered farmers within a 25km radius and coordinated vaccination logistics through Mobile Vet''s veterinary network.',
    E'Within 18 hours of the first clinic report, all farmers in the affected radius received quarantine instructions and vaccination appointment slots. The veterinary team treated the outbreak as a single connected event rather than a sequence of unrelated cases.',
    'The speed was unlike anything we have seen. Normally, by the time we hear about an outbreak, it has already spread across three kebeles. This time, we had vaccination teams on site before most farmers even knew there was a risk.',
    'Dr. Mohamed Hassan, Regional Veterinary Coordinator, Somali Region',
    '[{"value":"18 hours","label":"From first clinic report to regional alert"},{"value":"1,200","label":"Animals vaccinated within alert zone"},{"value":"15km","label":"Containment radius (vs. 50km typical)"},{"value":"0","label":"Secondary outbreak clusters"}]'::jsonb
  )
) as v(slug,title,region,region_tag,cover_image,summary,body,testimonial_quote,testimonial_author,metrics)
where not exists (select 1 from public.case_studies where case_studies.slug = v.slug);
