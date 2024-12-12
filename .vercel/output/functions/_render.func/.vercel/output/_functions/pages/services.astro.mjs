/* empty css                                 */
import { c as createComponent, r as renderTemplate, m as maybeRenderHead, e as addAttribute, b as createAstro, a as renderComponent, F as Fragment } from '../chunks/astro/server_D3OzqXDD.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_DIrOHDpL.mjs';
import { $ as $$Image } from '../chunks/_astro_assets_D_Cyaxof.mjs';
import 'clsx';
/* empty css                                    */
export { r as renderers } from '../chunks/_@astro-renderers_B5H1KkQD.mjs';

const BreastFeeding = new Proxy({"src":"/_astro/breast_feeding.Bay4itUa.jpg","width":4000,"height":6000,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/martyheyn/Documents/projects/tiny-tides-site/src/assets/images/breast_feeding.jpg";
							}
							
							return target[name];
						}
					});

const TummyTime = new Proxy({"src":"/_astro/erin_tummy_baby.BU5aXqS_.jpeg","width":1125,"height":1631,"format":"jpg","orientation":1}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/martyheyn/Documents/projects/tiny-tides-site/src/assets/images/erin/erin_tummy_baby.jpeg";
							}
							
							return target[name];
						}
					});

const BabyFeeding = new Proxy({"src":"/_astro/baby_seat_feeding.DN-XrRh1.jpg","width":7000,"height":4667,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/martyheyn/Documents/projects/tiny-tides-site/src/assets/images/baby_seat_feeding.jpg";
							}
							
							return target[name];
						}
					});

const $$Astro$1 = createAstro();
const $$Reasons = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Reasons;
  const { reasonsList } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="w-full flex flex-col justify-center items-center mt-12 max-w-7xl px-4 md:px-12 md:-mb-16" data-astro-cid-ezmtmb76> <h1 class="text-5xl md:text-6xl text-center" data-astro-cid-ezmtmb76>We can help with:</h1> <div class="w-full grid gap-y-6 md:gap-y-12 grid-cols-2 md:grid-cols-3 mt-8" data-astro-cid-ezmtmb76> ${reasonsList.map((reason, i) => renderTemplate`<div class="flex gap-x-2 items-center transition-all duration-200 ease-out reason-item pl-6 sm:pl-16 lg:pl-24"${addAttribute(`transition-delay: ${i * 0.075}s`, "style")} data-astro-cid-ezmtmb76> <div class="w-2 h-2 bg-[#282082] rounded-full mt-1" data-astro-cid-ezmtmb76></div> <p class="text-base md:text-lg font-semibold" data-astro-cid-ezmtmb76>${reason}</p> </div>`)} </div> </div>  `;
}, "/Users/martyheyn/Documents/projects/tiny-tides-site/src/components/Reasons.astro", void 0);

const $$Astro = createAstro();
const $$Services = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Services;
  const markdownFiles = await Astro2.glob(/* #__PURE__ */ Object.assign({"./services/1_developmental_milestones.md": () => import('../chunks/1_developmental_milestones_CPek0FQI.mjs').then(n => n._),"./services/2_lactation_service.md": () => import('../chunks/2_lactation_service_DBG4K9pO.mjs').then(n => n._),"./services/3_picky_eaters.md": () => import('../chunks/3_picky_eaters_CRjZUhYk.mjs').then(n => n._)}), () => "./services/*md");
  const services = Object.values(markdownFiles);
  const pageTitle = "Services";
  const serviceImgs = [TummyTime, BreastFeeding, BabyFeeding];
  const reasons = {
    "Developmental Milestones": [
      "Delayed rolling, crawling, sitting",
      "Difficulties with tummy time",
      "Difficulties with tracking, reaching, grasp",
      "Sensory processing difficulties",
      "Fine motor delays",
      "Difficulties with regulation",
      "Colic",
      "Sleep difficulties"
    ],
    "Lactation Counseling": [
      "Breastfeeding challenges",
      "Low milk supply",
      "Painful nursing",
      "Latch issues",
      "Fussy/colicky when nursing",
      "Slow weight gain",
      "Tongue or lip tie",
      "Clicking, coughing, choking",
      "Arching/tension when nursing",
      "Side preference when nursing",
      "Reflux, constipation, gas",
      "Bottle refusal"
    ],
    "Transition to Solids": [
      "Baby led weaning",
      "Texture aversions",
      "Picky eating",
      "Food refusal",
      "Overstuffing mouth",
      "Choking, gagging"
    ]
  };
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "pageTitle": pageTitle, "data-astro-cid-ucd2ps2b": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="w-full h-full bg-primary pt-14 md:pt-[76px]" data-astro-cid-ucd2ps2b> ${services.map((service, i) => renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "data-astro-cid-ucd2ps2b": true }, { "default": ($$result3) => renderTemplate`${i % 2 === 0 ? renderTemplate`<div class="flex flex-col items-center" data-astro-cid-ucd2ps2b> <div class="max-w-7xl" data-astro-cid-ucd2ps2b> <div class="min-h-[85vh] grid grid-cols-1 gap-y-8 md:gap-y-0 md:grid-cols-2 gap-x-8 px-4 md:px-12 pt-4 md:pt-12 pb-2" id="lactation-counseling" data-astro-cid-ucd2ps2b> <div class="w-full h-full flex justify-center items-center" data-astro-cid-ucd2ps2b> ${renderComponent($$result3, "Image", $$Image, { "src": serviceImgs[i], "alt": "Toddlers playing", "class": "w-full max-w-md rounded-md object-cover object-center shadow-lg max-h-[500px] lg:min-w-[500px] lg:h-[450px]", "data-astro-cid-ucd2ps2b": true })} </div> <div class="flex flex-col gap-y-4 w-full h-full justify-center px-4 md:px-8" data-astro-cid-ucd2ps2b> <div class="flex flex-col gap-y-4 w-full h-full justify-center" data-astro-cid-ucd2ps2b> <h1 class="text-6xl" data-astro-cid-ucd2ps2b>${service.frontmatter.title}</h1> ${renderComponent($$result3, "service.Content", service.Content, { "data-astro-cid-ucd2ps2b": true })} </div> </div> </div> <div class="w-full flex justify-center" data-astro-cid-ucd2ps2b> ${renderComponent($$result3, "Reasons", $$Reasons, { "serviceTitle": service.frontmatter.title, "reasonsList": reasons[service.frontmatter.title], "data-astro-cid-ucd2ps2b": true })} </div> </div> </div>` : renderTemplate`<div class="flex flex-col items-center" data-astro-cid-ucd2ps2b> <div class="max-w-7xl" data-astro-cid-ucd2ps2b> <div class="min-h-[85vh] grid grid-cols-1 gap-y-8 md:gap-y-0 md:grid-cols-2 gap-x-8 px-4 md:px-12 pt-4 md:pt-12 pb-2" id="lactation-counseling" data-astro-cid-ucd2ps2b> <div class="flex flex-col gap-y-4 w-full h-full justify-center px-4 md:px-8" data-astro-cid-ucd2ps2b> <div class="flex flex-col gap-y-4 w-full h-full justify-center" data-astro-cid-ucd2ps2b> <h1 class="text-6xl" data-astro-cid-ucd2ps2b>${service.frontmatter.title}</h1> ${renderComponent($$result3, "service.Content", service.Content, { "data-astro-cid-ucd2ps2b": true })} </div> </div> <div class="w-full h-full flex justify-center items-center" data-astro-cid-ucd2ps2b> ${renderComponent($$result3, "Image", $$Image, { "src": serviceImgs[i], "alt": "Toddlers playing", "class": "w-full max-w-md rounded-md object-cover object-center shadow-lg max-h-[500px] lg:min-w-[500px] lg:h-[450px]", "data-astro-cid-ucd2ps2b": true })} </div> </div> <div class="w-full flex justify-center" data-astro-cid-ucd2ps2b> ${renderComponent($$result3, "Reasons", $$Reasons, { "serviceTitle": service.frontmatter.title, "reasonsList": reasons[service.frontmatter.title], "data-astro-cid-ucd2ps2b": true })} </div> </div> </div>`}<svg class="transition duration-300 ease-in-out w-full h-full flex-no-shrink" id="svg" viewBox="0 0 1440 600" xmlns="http://www.w3.org/2000/svg" data-astro-cid-ucd2ps2b> <defs data-astro-cid-ucd2ps2b> <linearGradient id="gradient" x1="50%" y1="100%" x2="50%" y2="0%" data-astro-cid-ucd2ps2b> <stop offset="5%" stop-color="#f3ffff" data-astro-cid-ucd2ps2b></stop> <stop offset="95%" stop-color="#d0f0f0" data-astro-cid-ucd2ps2b></stop> </linearGradient> </defs> <path class="w-full" d="M 0,600 L 0,210 C 80.96666666666664,198.49487179487178 161.93333333333328,186.98974358974357 245,200 C 328.0666666666667,213.01025641025643 413.23333333333346,250.53589743589745 496,249 C 578.7666666666665,247.46410256410255 659.1333333333332,206.86666666666667 725,205 C 790.8666666666668,203.13333333333333 842.2333333333333,239.99743589743593 923,254 C 1003.7666666666667,268.00256410256407 1113.9333333333334,259.1435897435897 1205,248 C 1296.0666666666666,236.85641025641027 1368.0333333333333,223.42820512820515 1440,210 L 1440,600 L 0,600 Z" stroke="none" stroke-width="0" fill="url(#gradient)" fill-opacity="0.4" class="transition-all duration-300 ease-in-out delay-150 path-1" data-astro-cid-ucd2ps2b></path> <defs data-astro-cid-ucd2ps2b> <linearGradient id="gradient" x1="50%" y1="100%" x2="50%" y2="0%" data-astro-cid-ucd2ps2b> <stop offset="5%" stop-color="#F78DA7" data-astro-cid-ucd2ps2b></stop> <stop offset="95%" stop-color="#8ED1FC" data-astro-cid-ucd2ps2b></stop> </linearGradient> </defs> <path d="M 0,600 L 0,330 C 61.37692307692308,341.9230769230769 122.75384615384615,353.84615384615387 201,352 C 279.24615384615385,350.15384615384613 374.36153846153843,334.53846153846155 468,332 C 561.6384615384616,329.46153846153845 653.8000000000001,340.00000000000006 728,333 C 802.1999999999999,325.99999999999994 858.4384615384615,301.46153846153845 925,311 C 991.5615384615385,320.53846153846155 1068.4461538461537,364.1538461538462 1156,373 C 1243.5538461538463,381.8461538461538 1341.7769230769231,355.9230769230769 1440,330 L 1440,600 L 0,600 Z" stroke="none" stroke-width="0" fill="url(#gradient)" fill-opacity="0.53" class="transition-all duration-300 ease-in-out delay-150 path-2" data-astro-cid-ucd2ps2b></path> <defs data-astro-cid-ucd2ps2b> <linearGradient id="gradient" x1="50%" y1="100%" x2="50%" y2="0%" data-astro-cid-ucd2ps2b> <stop offset="5%" stop-color="#f3ffff" data-astro-cid-ucd2ps2b></stop> <stop offset="95%" stop-color="#f3ffff" data-astro-cid-ucd2ps2b></stop> </linearGradient> </defs> <path d="M 0,600 L 0,450 C 75.10256410256412,448.8974358974359 150.20512820512823,447.79487179487177 240,456 C 329.79487179487177,464.20512820512823 434.28205128205127,481.7179487179487 512,489 C 589.7179487179487,496.2820512820513 640.6666666666666,493.33333333333337 704,492 C 767.3333333333334,490.66666666666663 843.0512820512821,490.9487179487179 927,490 C 1010.9487179487179,489.0512820512821 1103.128205128205,486.87179487179486 1190,480 C 1276.871794871795,473.12820512820514 1358.4358974358975,461.56410256410254 1440,450 L 1440,600 L 0,600 Z" stroke="none" stroke-width="0" fill="url(#gradient)" fill-opacity="1" class="transition-all duration-300 ease-in-out delay-150 path-3" data-astro-cid-ucd2ps2b></path> </svg> ` })}`)} </div> ` })} `;
}, "/Users/martyheyn/Documents/projects/tiny-tides-site/src/pages/services.astro", void 0);

const $$file = "/Users/martyheyn/Documents/projects/tiny-tides-site/src/pages/services.astro";
const $$url = "/services";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Services,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
