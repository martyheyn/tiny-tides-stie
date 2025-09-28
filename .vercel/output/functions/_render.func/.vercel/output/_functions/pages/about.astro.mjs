/* empty css                                 */
import { a as createAstro, c as createComponent, r as renderTemplate, m as maybeRenderHead, e as renderComponent } from '../chunks/astro/server_CyvEsQJY.mjs';
import 'kleur/colors';
import 'clsx';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_DR02x1_z.mjs';
export { r as renderers } from '../chunks/_@astro-renderers_bPVGQiWf.mjs';

const $$Astro = createAstro("https://www.tinytidestherapy.com/");
const $$Bullet = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Bullet;
  const { text } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<li class="flex gap-x-2 items-start transition-all duration-200 ease-out"> <div class="min-w-[8px] w-2 h-2 mt-2.5 bg-[#282082] rounded-full"></div> ${text} </li>`;
}, "/Users/martyheyn/Documents/projects/tiny-tides/tiny-tides-site/src/components/Bullet.astro", void 0);

const $$About = createComponent(($$result, $$props, $$slots) => {
  const pageTitle = "About - OT, Lactation, Baltimore";
  const description = "Meet Erin, the founder of Tiny Tides Therapy. She holds a Doctorate in Occupational Therapy and is a Certified Lactation Counselor. Her passion is providing holistic, functional therapy that meets families where they are, targeting specific goals to support each unique journey. Baltimore Pediatric Occupational Therapy";
  const certifications = [
    {
      title: "Infant Development:",
      items: [
        "Doctor of Occupational Therapy",
        "Infant Positioning and Handling",
        "A Holistic Approach to Supporting Sleep for Breastfeeding Dyads",
        "Certified Tummy Time! Method Provider",
        "Bodywork for Better Breastfeeding: Hands-on Modalities to Improve Feeding Readiness and Outcomes",
        "Understanding Primitive Reflexes",
        "The DIR Floortime Approach",
        "Making Sense of Meltdowns",
        "Sensory Integration and Processing 101",
        "Pediatric NDT Intensive Handling Intervention"
      ]
    },
    {
      title: "Feeding/Lactation:",
      items: [
        "Certified Lactation Counselor",
        "Tongue Ties, Breastfeeding and The Lactation Savvy Therapist-The Lactation OT",
        "Gastrointestinal System Disorders in Infancy and Childhood and their Impact on Feeding",
        "Failure to Thrive, Suboptimal Weight Gain, and The Lactation Savvy Therapist-The Lactation OT",
        "The Occupational Therapist\u2019s Role in Breastfeeding",
        "Bottle Feeding Skills: Refining Clinical Reasoning for Selection and Use-The Lactation OT",
        "Feed the Peds Certification",
        "AEIOU Approach to Feeding",
        "Mouth Moves",
        "Common Infant Digestive Health Concerns and Useful Support Strategies",
        "A Mindful Approach to Infant Tongue-Tie Care",
        "The ABCs of Ankyloglossia and Perinatal Mental Health",
        "From Feeding Tube to Fully Breastfeeding: A Case Study of Delayed Frenotomy",
        "Identifying and Addressing Compensations and Inefficient Movement Patterns in the Tongue-Tied Baby",
        "Strengthening Bonds After Frenotomy: Infant Massage As A Recovery Strategy"
      ]
    }
  ];
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "pageTitle": pageTitle, "description": description }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="w-full h-full bg-primary pt-14 sm:pt-[76px] flex flex-col items-center"> <div class="max-w-7xl"> <div class="pt-4 sm:py-4 md:py-12 px-4 sm:px-8 flex justify-center transition-all duration-300 ease-in-out"> <div class="max-w-6xl grid grid-cols-1 md:grid-cols-8 gap-y-12 md:gap-y-0 md:gap-x-4 lg:gap-x-12 transition-all duration-300 ease-in-out"> <div class="w-full flex justify-center items-start md:col-span-3"> <img src="https://dkbi9cj3nodif.cloudfront.net/erin_smile_baby.jpeg" alt="Toddlers playing" class="w-full max-w-md rounded-md object-cover object-center shadow-lg md:min-h-[675px]"> <!-- max-h-[500px] lg:min-w-[500px] lg:h-[450px] --> </div> <div class="flex flex-col gap-y-8 w-full h-full justify-center px-2 pb-12 md:col-span-5"> <h1 class="text-5xl"> <span class="straight_underline z-10">Meet Erin</span> </h1> <p>
Hi, I’m Erin, the founder of Tiny Tides Therapy. I hold a
              Doctorate in Occupational Therapy and am a Certified Lactation
              Counselor. My passion is providing holistic, functional therapy
              that meets families where they are, targeting specific goals to
              support each unique journey.
</p> <p>
At Tiny Tides, we understand that a child’s development, much like
              the ocean, comes in many waves. From feeding and meeting
              milestones to managing sensory needs, every stage of growth brings
              its own set of challenges and triumphs. I specialize in supporting
              infants through these waves of development, offering guidance in
              areas such as tummy time, breast and bottle feeding, transitioning
              to solids, oral motor dysfunction, and tongue and lip ties. I also
              work with families on sensory processing, regulation, body
              tension, and infant massage to nurture the whole child.
</p> <p>
Tiny Tides Therapy is dedicated to guiding families through all
              the waves of development, while ensuring a compassionate and
              individualized plan that fosters confidence and success. It’s my
              mission to empower families while creating a sense of community
              where families can thrive together.
</p> </div> </div> </div> <div class="w-full h-[1px] bg-black/10 px-8 mt-8 mb-12"></div> <div class="pt-4 py-12 px-4 sm:px-12 transition-all duration-300 ease-in-out"> <h1 class="text-4xl text-center"> <span class="straight_underline z-10">Trainings and Certifications:</span> </h1> <div class="py-8 grid grid-cols-1 md:grid-cols-2 gap-16"> ${certifications.map((certification) => renderTemplate`<div> <p class="mb-4 text-2xl underline text-center"> ${certification.title} </p> <ul class="flex flex-col gap-y-2 text-xl ml-2"> ${certification.items.map((item) => renderTemplate`${renderComponent($$result2, "Bullet", $$Bullet, { "text": item })}`)} </ul> </div>`)} </div> </div> <div class="pt-4 py-12 px-4 sm:px-12 transition-all duration-300 ease-in-out"> <div class="grid grid-cols-1 sm:grid-cols-3 content-center px-4 gap-y-24 sm:gap-x-12 md:gap-x-16 lg:gap-x-24 transition-all duration-300 ease-in-out"> <img src="https://dkbi9cj3nodif.cloudfront.net/certified-lactation-con.avif" alt="certified lactation pic" class="w-full place-self-center max-h-[300px] md:max-h-[250px]"> <img src="https://dkbi9cj3nodif.cloudfront.net/timmy-time-method.png" alt="tummy time method pic" class="w-full place-self-center max-h-[300px] md:max-h-[250px]"> <img src="https://dkbi9cj3nodif.cloudfront.net/feed-the-peds.png" alt="feed the peds pics" class="w-full place-self-center max-h-[300px] md:max-h-[250px]"> </div> </div> </div> </div> ` })}`;
}, "/Users/martyheyn/Documents/projects/tiny-tides/tiny-tides-site/src/pages/about.astro", void 0);

const $$file = "/Users/martyheyn/Documents/projects/tiny-tides/tiny-tides-site/src/pages/about.astro";
const $$url = "/about";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$About,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
