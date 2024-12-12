/* empty css                                 */
import { c as createComponent, r as renderTemplate, m as maybeRenderHead, e as addAttribute, a as renderComponent, b as createAstro, h as defineStyleVars } from '../chunks/astro/server_D3OzqXDD.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_DIrOHDpL.mjs';
import { $ as $$Image } from '../chunks/_astro_assets_D_Cyaxof.mjs';
/* empty css                                 */
import 'clsx';
import { C as ContactForm } from '../chunks/ContactForm_BRFtFCTR.mjs';
export { r as renderers } from '../chunks/_@astro-renderers_B5H1KkQD.mjs';

const $$Astro$4 = createAstro();
const $$ServicesLanding = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$ServicesLanding;
  const { img, title, description, link } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="w-full flex flex-col gap-y-6 justify-between items-center service-landing-item" data-astro-cid-dbzxxhcy> <a${addAttribute(link, "href")} class="hover:scale-[1.02] transition-all duration-200 ease-in-out" data-astro-cid-dbzxxhcy> ${renderComponent($$result, "Image", $$Image, { "src": img, "alt": "Toddlers playing", "class": "w-36 h-36 rounded-full bg-[#e7e1d1]", "data-astro-cid-dbzxxhcy": true })} </a> <div class="max-w-[350px] md:max-w-[300px] md:min-h-[200px] flex flex-col justify-between gap-y-2" data-astro-cid-dbzxxhcy> <a${addAttribute(link, "href")} class="hover:scale-[1.02] transition-all duration-200 ease-in-out flex justify-center items-center h-full" data-astro-cid-dbzxxhcy> <p class="text-2xl italic font-semibold text-center mb-1" data-astro-cid-dbzxxhcy>${title}</p> </a> <p class="text-center" data-astro-cid-dbzxxhcy>${description}</p> </div> </div>  `;
}, "/Users/martyheyn/Documents/projects/tiny-tides-site/src/components/ServicesLanding.astro", void 0);

const $$Astro$3 = createAstro();
const $$Button = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Button;
  const {
    text,
    color = "#9ddcdc",
    hoverColor = "#90e8e8",
    textColor = "black"
  } = Astro2.props;
  const $$definedVars = defineStyleVars([{ color, hoverColor, textColor }]);
  return renderTemplate`${maybeRenderHead()}<button class="font-semibold px-6 py-3 transition-all duration-300 ease-in-out cursor-pointer rounded-md hover:scale-[1.02] shadow-lg hover:shadow-2xl" data-astro-cid-vnzlvqnm${addAttribute($$definedVars, "style")}> ${text} </button> `;
}, "/Users/martyheyn/Documents/projects/tiny-tides-site/src/components/Button.astro", void 0);

const $$Astro$2 = createAstro();
const $$WaveDivider = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$WaveDivider;
  const { placement, fill } = Astro2.props;
  const $$definedVars = defineStyleVars([{ fill }]);
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(`absolute ${placement === "bottom" ? "bottom-0" : "top-0"} left-0 w-full overflow-hidden leading-0 transform rotate-180 z-20`, "class")} data-astro-cid-5baqliqx${addAttribute($$definedVars, "style")}> <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none"${addAttribute(`relative block w-[calc(100%+1.3px)] h-[60px]`, "class")} data-astro-cid-5baqliqx${addAttribute($$definedVars, "style")}> <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" data-astro-cid-5baqliqx${addAttribute($$definedVars, "style")}></path> </svg> </div> `;
}, "/Users/martyheyn/Documents/projects/tiny-tides-site/src/components/WaveDivider.astro", void 0);

const WaveVideo = "/_astro/wave-birdeye-view.DrMAv8sC.mp4";

const ToddlersPlaying = new Proxy({"src":"/_astro/toddlers-playing.efizLE3b.png","width":1024,"height":1024,"format":"webp"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/martyheyn/Documents/projects/tiny-tides-site/src/assets/images/toddlers-playing.png";
							}
							
							return target[name];
						}
					});

const BreastFeeding = new Proxy({"src":"/_astro/baby_breastfeeding.cOfR3-3L.png","width":500,"height":500,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/martyheyn/Documents/projects/tiny-tides-site/src/assets/images/baby_breastfeeding.png";
							}
							
							return target[name];
						}
					});

const BabyEating = new Proxy({"src":"/_astro/baby-eating.Ds5u5oIw.png","width":500,"height":500,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/martyheyn/Documents/projects/tiny-tides-site/src/assets/images/baby-eating.png";
							}
							
							return target[name];
						}
					});

const ErinBabyBounce = new Proxy({"src":"/_astro/erin_baby_bounce.D4IzqIUX.jpeg","width":1125,"height":1468,"format":"jpg","orientation":1}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/martyheyn/Documents/projects/tiny-tides-site/src/assets/images/erin/erin_baby_bounce.jpeg";
							}
							
							return target[name];
						}
					});

const $$Astro$1 = createAstro();
const $$Step = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Step;
  const { stepNum, description } = Astro2.props;
  let delay = `${stepNum * 0.3}s`;
  const $$definedVars = defineStyleVars([{ delay }]);
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(`flex flex-col gap-y-6 justify-center items-center bg-gradient-to-r from-primary to-[#d6f1f1] w-60 h-60 rounded-2xl px-8 shadow-2xl step-item`, "class")} data-astro-cid-5vkjc2f4${addAttribute($$definedVars, "style")}> <h2 class="text-5xl font-semibold text-shadow" data-astro-cid-5vkjc2f4${addAttribute($$definedVars, "style")}>${stepNum}</h2> <p class="text-xl italic text-center" data-astro-cid-5vkjc2f4${addAttribute($$definedVars, "style")}>${description}</p> </div>  `;
}, "/Users/martyheyn/Documents/projects/tiny-tides-site/src/components/Step.astro", void 0);

const $$Astro = createAstro();
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const pageTitle = "Home Page";
  const services = [
    {
      img: BreastFeeding,
      title: "Lactation Counseling",
      description: "Feeding challenges can make the early days with your baby stressful. Tiny Tides offers tailored support to help you achieve a comfortable, effective feeding routine",
      link: "/services/#lactation-counseling"
    },
    {
      img: ToddlersPlaying,
      title: "Developmental Milestones",
      description: "Concerns about missed milestones can cause worry. Tiny Tides assesses and supports each child\u2019s unique needs, encouraging steady progress in a warm environment",
      link: "/services/#developmental-milestones"
    },
    {
      img: BabyEating,
      title: "Transition to Solids",
      description: "Mealtime struggles with picky eating can frustrate both kids and parents. Tiny Tides uses a gentle, child-led approach to make meals more enjoyable and nutritious",
      link: "/services/#picky-eaters"
    }
  ];
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "pageTitle": pageTitle, "data-astro-cid-j7pv25f6": true }, { "default": ($$result2) => renderTemplate`  ${maybeRenderHead()}<section class="bg-gradient-to-b from-primary to-secondary" data-astro-cid-j7pv25f6> <div class="h-[106vh] w-full relative overflow-hidden pt-14 md:pt-[76px]" data-astro-cid-j7pv25f6> <div class="relative bg-transparent md:bg-gradient-to-b md:from-primary md:to-[#c5e8e8] flex flex-col w-full md:w-1/2 h-full justify-center items-center z-20 px-4 md:px-12 rounded-b-lg" data-astro-cid-j7pv25f6> <h1 class="header-title text-8xl mb-6 text-center text-white md:text-black" data-astro-cid-j7pv25f6> <span class="text-[100px]" data-astro-cid-j7pv25f6>Tiny Tides</span> <br data-astro-cid-j7pv25f6> Therapy
</h1> <h1 class="text-4xl text-center my-2 md:my-4 text-white md:text-black" data-astro-cid-j7pv25f6>
Pediatric Occupational Therapy <span class="px-0" data-astro-cid-j7pv25f6>,</span> Lactation <span class="px-1" data-astro-cid-j7pv25f6>&</span> Feeding
</h1> <div class="flex justify-center md:hidden lg:block mt-4 mb-12 md:mb-6" data-astro-cid-j7pv25f6> <a href="/contact" data-astro-cid-j7pv25f6> ${renderComponent($$result2, "Button", $$Button, { "text": "Schedule Free Consultation", "data-astro-cid-j7pv25f6": true })} </a> </div> </div> <video class="absolute top-0 left-0 h-full w-full z-10 object-cover opacity-100 grayscale-[10%]" autoplay loop muted data-astro-cid-j7pv25f6> <source${addAttribute(WaveVideo, "src")} type="video/mp4" data-astro-cid-j7pv25f6> <source${addAttribute(WaveVideo, "src")} type="video/ogg" data-astro-cid-j7pv25f6> </video> <div class="sticky bottom-0 bg-[linear-gradient(to_top,_#fff,_rgba(0,_0,_0,_0))] content-[''] w-full h-[15vh] block z-20" data-astro-cid-j7pv25f6></div> ${renderComponent($$result2, "WaveDivider", $$WaveDivider, { "placement": "bottom", "fill": "#fff", "data-astro-cid-j7pv25f6": true })} </div> <!-- Services --> <div class="min-h-[90vh] w-full transition-all duration-300 ease-in-out relative" data-astro-cid-j7pv25f6> <div class="sticky top-0 bg-[linear-gradient(to_bottom,_#fff,_rgba(0,_0,_0,_0))] content-[''] w-full h-[15vh] block z-20" data-astro-cid-j7pv25f6></div> <div class="py-16 px-6 md:px-12" data-astro-cid-j7pv25f6> <div class="flex flex-col justify-center items-center gap-y-20" data-astro-cid-j7pv25f6> <h1 class="header-title" data-astro-cid-j7pv25f6>For all your pedatric therapy needs</h1> <div class="md:max-w-6xl grid grid-cols-1 md:grid-cols-3 content-center w-full gap-y-16 md:gap-y-0 md:gap-x-16" data-astro-cid-j7pv25f6> ${services.map((service) => renderTemplate`${renderComponent($$result2, "ServicesLanding", $$ServicesLanding, { "img": service.img, "title": service.title, "description": service.description, "link": service.link, "data-astro-cid-j7pv25f6": true })}`)} </div> </div> <h4 class="text-center mt-32 text-4xl" data-astro-cid-j7pv25f6>
Serving Families in Baltimore City and Surrounding Areas
</h4> <div class="flex justify-center mt-24" data-astro-cid-j7pv25f6> <a href="/contact" data-astro-cid-j7pv25f6> ${renderComponent($$result2, "Button", $$Button, { "text": "Book Consultation Now", "color": "#f3ffff", "hoverColor": "#fff", "textColor": "black", "data-astro-cid-j7pv25f6": true })} </a> </div> </div> <!-- Steps --> <div class="py-16 pb-36" data-astro-cid-j7pv25f6> <div class="relative flex flex-col md:flex-row gap-y-12 md:gap-x-8 justify-between items-center px-8 lg:px-20 transition-all duration-300 ease-in-out" data-astro-cid-j7pv25f6> ${renderComponent($$result2, "Step", $$Step, { "stepNum": "1", "description": "Schedule a free consultation", "data-astro-cid-j7pv25f6": true })} <div class="absolute top-[27%] md:top-[40%] md:left-[31%] hidden lg:block step-arrow-1" data-astro-cid-j7pv25f6> <svg viewBox="0 0 24 24" width="72" height="72" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" class="" data-astro-cid-j7pv25f6><path d="M21.883 12l-7.527 6.235.644.765 9-7.521-9-7.479-.645.764 7.529 6.236h-21.884v1h21.883z" data-astro-cid-j7pv25f6></path> </svg> </div> ${renderComponent($$result2, "Step", $$Step, { "stepNum": "2", "description": "Get a comprehensive evaluation", "data-astro-cid-j7pv25f6": true })} <div class="absolute lg:top-[40%] lg:left-[62%] hidden lg:block step-arrow-2" data-astro-cid-j7pv25f6> <svg viewBox="0 0 24 24" width="72" height="72" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" class="" data-astro-cid-j7pv25f6><path d="M21.883 12l-7.527 6.235.644.765 9-7.521-9-7.479-.645.764 7.529 6.236h-21.884v1h21.883z" data-astro-cid-j7pv25f6></path> </svg> </div> ${renderComponent($$result2, "Step", $$Step, { "stepNum": "3", "description": "Receive a personalized plan", "data-astro-cid-j7pv25f6": true })} </div> </div> ${renderComponent($$result2, "WaveDivider", $$WaveDivider, { "placement": "bottom", "fill": "#f3ffff", "data-astro-cid-j7pv25f6": true })} </div> </section>   <div class="bg-primary pt-24 w-full py-16 px-4 flex justify-center" data-astro-cid-j7pv25f6> <div class="max-w-7xl lg:w-[1256px]" data-astro-cid-j7pv25f6> <div class="flex justify-center" data-astro-cid-j7pv25f6> <h1 class="header-title" data-astro-cid-j7pv25f6>Get in Touch</h1> </div> <div class="w-full mt-8 md:mt-12 grid grid-cols-1 md:grid-cols-2 gap-y-12 md:gap-y-0 md:gap-x-8 border border-black rounded-md transition-all duration-300 ease-in-out" data-astro-cid-j7pv25f6> <div class="w-full md:h-screen flex justify-center items-center" data-astro-cid-j7pv25f6> ${renderComponent($$result2, "Image", $$Image, { "src": ErinBabyBounce, "alt": "Toddlers playing", "class": "w-full h-full rounded-md object-cover", "data-astro-cid-j7pv25f6": true })} </div> <div class="flex flex-col justify-center items-center md:py-20" data-astro-cid-j7pv25f6> <p class="text-xl max-w-md px-4 md:px-8" data-astro-cid-j7pv25f6>
Submit an inquiry and we will reach back out to you!
</p> ${renderComponent($$result2, "ContactForm", ContactForm, { "homepage": true, "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/martyheyn/Documents/projects/tiny-tides-site/src/components/ContactForm.svelte", "client:component-export": "default", "data-astro-cid-j7pv25f6": true })} </div> </div> </div> </div> ` })}  `;
}, "/Users/martyheyn/Documents/projects/tiny-tides-site/src/pages/index.astro", void 0);

const $$file = "/Users/martyheyn/Documents/projects/tiny-tides-site/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
