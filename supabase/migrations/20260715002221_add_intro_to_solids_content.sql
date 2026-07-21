-- Real content for Intro to Solids, replacing the placeholder chapter/video
-- seeded in 00000000000000_initial_schema.sql. Each chapter is exactly one
-- video (per source files in tiny-tides-course-vids/intro_solids/imovie-chapters/optimized),
-- uploaded to S3 under the `intro-to-solids/<slug>.mp4` key, served through the
-- CloudFront distribution already configured in CF_COURSE_VID_DOMAIN.
--
-- NOTE: "choking-and-allergens" assumes the source filename
-- "tiny-tastes-9---choking-and-allegrins.mp4" is a typo for "allergens" --
-- confirm before uploading to S3 under this key.

delete from public.video
where course_id = '4f246168-7ca8-4544-a9f4-3d496f3aea00'
  and slug = 'play-with-food';

delete from public.section
where course_id = '4f246168-7ca8-4544-a9f4-3d496f3aea00'
  and slug = 'eat-this';

with sections as (
  insert into public.section (course_id, slug, label, section_order)
  values
    ('4f246168-7ca8-4544-a9f4-3d496f3aea00', 'intro', 'Intro', 1),
    ('4f246168-7ca8-4544-a9f4-3d496f3aea00', 'signs-of-readiness-and-pre-feeding-activities', 'Signs of Readiness and Pre-Feeding Activities', 2),
    ('4f246168-7ca8-4544-a9f4-3d496f3aea00', 'seating-and-positioning', 'Seating and Positioning', 3),
    ('4f246168-7ca8-4544-a9f4-3d496f3aea00', 'responsive-feeding-and-rules-of-solids', 'Responsive Feeding and Rules of Solids', 4),
    ('4f246168-7ca8-4544-a9f4-3d496f3aea00', 'methods-of-solids-and-food-examples', 'Methods of Solids and Food Examples', 5),
    ('4f246168-7ca8-4544-a9f4-3d496f3aea00', 'babies-eating-food', 'Babies Eating Food', 6),
    ('4f246168-7ca8-4544-a9f4-3d496f3aea00', 'materials-for-getting-started', 'Materials for Getting Started', 7),
    ('4f246168-7ca8-4544-a9f4-3d496f3aea00', 'cup-and-straw-drinking', 'Cup and Straw Drinking', 8),
    ('4f246168-7ca8-4544-a9f4-3d496f3aea00', 'choking-and-allergens', 'Choking and Allergens', 9),
    ('4f246168-7ca8-4544-a9f4-3d496f3aea00', 'chewing-and-oral-motor-skills', 'Chewing and Oral Motor Skills', 10),
    ('4f246168-7ca8-4544-a9f4-3d496f3aea00', 'activities-at-home-and-when-to-seek-help', 'Activities at Home and When to Seek Help', 11),
    ('4f246168-7ca8-4544-a9f4-3d496f3aea00', 'conclusion', 'Conclusion', 12)
  returning id, slug
)
insert into public.video (course_id, section_id, slug, name, host_url, length, video_order)
select
  '4f246168-7ca8-4544-a9f4-3d496f3aea00',
  sections.id,
  v.slug,
  v.name,
  'intro-to-solids/' || v.slug || '.mp4',
  v.length,
  1
from sections
join (
  values
    ('intro', 'Intro', 116),
    ('signs-of-readiness-and-pre-feeding-activities', 'Signs of Readiness and Pre-Feeding Activities', 95),
    ('seating-and-positioning', 'Seating and Positioning', 259),
    ('responsive-feeding-and-rules-of-solids', 'Responsive Feeding and Rules of Solids', 355),
    ('methods-of-solids-and-food-examples', 'Methods of Solids and Food Examples', 720),
    ('babies-eating-food', 'Babies Eating Food', 303),
    ('materials-for-getting-started', 'Materials for Getting Started', 179),
    ('cup-and-straw-drinking', 'Cup and Straw Drinking', 349),
    ('choking-and-allergens', 'Choking and Allergens', 323),
    ('chewing-and-oral-motor-skills', 'Chewing and Oral Motor Skills', 80),
    ('activities-at-home-and-when-to-seek-help', 'Activities at Home and When to Seek Help', 168),
    ('conclusion', 'Conclusion', 22)
) as v (slug, name, length)
  on v.slug = sections.slug;
