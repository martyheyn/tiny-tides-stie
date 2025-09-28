/* empty css                                 */
import { c as createComponent, a as createAstro, m as maybeRenderHead, d as addAttribute, b as renderComponent, v as renderScript, r as renderTemplate, q as defineStyleVars } from '../chunks/astro/server_BEGASLii.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout, a as $$Logo } from '../chunks/BaseLayout_DJ0Ji_q3.mjs';
import '../chunks/index_DKHmmOtR.mjs';
import { $ as $$Image } from '../chunks/_astro_assets_CeQuBzOJ.mjs';
/* empty css                                 */
import 'clsx';
import { a as attr, C as ContactForm } from '../chunks/ContactForm_G2z3VhJK.mjs';
import { _ as __vite_glob_0_0 } from '../chunks/1_test_DoDdG8nw.mjs';
import { _ as __vite_glob_0_1 } from '../chunks/2_test_B1yoifOa.mjs';
import { _ as __vite_glob_0_2 } from '../chunks/3_test_DYdtMc2e.mjs';
import { _ as __vite_glob_0_3 } from '../chunks/4_test_CAH4NC1z.mjs';
import { _ as __vite_glob_0_4 } from '../chunks/5_test_CGqx6chU.mjs';
import { p as push, a as pop, s as stringify } from '../chunks/_@astro-renderers_BZ9dM9J6.mjs';
export { r as renderers } from '../chunks/_@astro-renderers_BZ9dM9J6.mjs';
import { e as escape_html } from '../chunks/escaping_CBnpiEl5.mjs';

const $$Astro$4 = createAstro();
const $$WhatWeTreat = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$WhatWeTreat;
  const { img, title, description, link } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="w-full flex flex-col gap-y-6 justify-between items-center service-landing-item bg-white/30 rounded-md p-6 text-[#031930bf]" data-astro-cid-kw3ubhnb> <a${addAttribute(link, "href")} class="hover:scale-[1.02] transition-all duration-200 ease-in-out" data-astro-cid-kw3ubhnb> ${renderComponent($$result, "Image", $$Image, { "src": img, "alt": "occupational therapy, lactation, infant feeding", "class": "w-36 h-36 rounded-full bg-primary object-contain p-2 shadow-xl border border-black/30", "data-astro-cid-kw3ubhnb": true })} </a> <div class="max-w-[350px] md:max-w-[300px] md:min-h-[200px] flex flex-col justify-between gap-y-2" data-astro-cid-kw3ubhnb> <a${addAttribute(link, "href")} class="hover:scale-[1.02] transition-all duration-200 ease-in-out flex justify-center items-center h-full" data-astro-cid-kw3ubhnb> <p class="text-2xl italic font-semibold text-center mb-1" data-astro-cid-kw3ubhnb>${title}</p> </a> <p class="text-center" data-astro-cid-kw3ubhnb>${description}</p> </div> </div>  ${renderScript($$result, "/Users/martyheyn/Documents/projects/tiny-tides/tiny-tides-site/src/components/WhatWeTreat.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/martyheyn/Documents/projects/tiny-tides/tiny-tides-site/src/components/WhatWeTreat.astro", void 0);

const $$Astro$3 = createAstro();
const $$Button = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Button;
  const {
    text,
    color = "#9ddcdc",
    hoverColor = "#90e8e8",
    textColor = "black",
    textSize = "text-xl"
  } = Astro2.props;
  const $$definedVars = defineStyleVars([{ color, hoverColor, textColor }]);
  return renderTemplate`${maybeRenderHead()}<button${addAttribute(`font-semibold ${textSize === "text-xl" ? "text-xl" : " text-base"}  px-6 py-3 transition-all duration-300 ease-in-out cursor-pointer rounded-md hover:scale-[1.02] shadow-lg hover:shadow-2xl`, "class")} data-astro-cid-vnzlvqnm${addAttribute($$definedVars, "style")}> ${text} </button> `;
}, "/Users/martyheyn/Documents/projects/tiny-tides/tiny-tides-site/src/components/Button.astro", void 0);

const $$Astro$2 = createAstro();
const $$WaveDivider = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$WaveDivider;
  const { placement, fill } = Astro2.props;
  const $$definedVars = defineStyleVars([{ fill }]);
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(`absolute ${placement === "bottom" ? "bottom-0" : "top-0"} left-0 w-full overflow-hidden leading-0 transform rotate-180 z-20`, "class")} data-astro-cid-5baqliqx${addAttribute($$definedVars, "style")}> <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none"${addAttribute(`relative block w-[calc(100%+1.3px)] h-[60px]`, "class")} data-astro-cid-5baqliqx${addAttribute($$definedVars, "style")}> <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" data-astro-cid-5baqliqx${addAttribute($$definedVars, "style")}></path> </svg> </div> `;
}, "/Users/martyheyn/Documents/projects/tiny-tides/tiny-tides-site/src/components/WaveDivider.astro", void 0);

const $$Astro$1 = createAstro();
const $$Step = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Step;
  const { stepNum, description } = Astro2.props;
  let delay = `${stepNum * 0.3}s`;
  const $$definedVars = defineStyleVars([{ delay }]);
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(`flex flex-col gap-y-4 justify-center items-center bg-gradient-to-r from-primary to-[#d6f1f1] w-60 h-60 rounded-full px-8 shadow-2xl step-item`, "class")} data-astro-cid-5vkjc2f4${addAttribute($$definedVars, "style")}> <h2 class="text-5xl font-semibold text-shadow" data-astro-cid-5vkjc2f4${addAttribute($$definedVars, "style")}>${stepNum}</h2> <p class="text-2xl text-center" data-astro-cid-5vkjc2f4${addAttribute($$definedVars, "style")}>${description}</p> </div>  ${renderScript($$result, "/Users/martyheyn/Documents/projects/tiny-tides/tiny-tides-site/src/components/Step.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/martyheyn/Documents/projects/tiny-tides/tiny-tides-site/src/components/Step.astro", void 0);

const BreastFeedingImg = new Proxy({"src":"/_astro/breast_feeding_icon.DuUE1jHd.png","width":456,"height":547,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/martyheyn/Documents/projects/tiny-tides/tiny-tides-site/public/assets/images/breast_feeding_icon.png";
							}
							
							return target[name];
						}
					});

const BabyFeedingImg = new Proxy({"src":"/_astro/infant_feeding_icon.DIo7Gp4Q.png","width":571,"height":437,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/martyheyn/Documents/projects/tiny-tides/tiny-tides-site/public/assets/images/infant_feeding_icon.png";
							}
							
							return target[name];
						}
					});

const BabyCrawlingImg = new Proxy({"src":"/_astro/infant_crawling_icon.xywBAqW0.png","width":598,"height":418,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/martyheyn/Documents/projects/tiny-tides/tiny-tides-site/public/assets/images/infant_crawling_icon.png";
							}
							
							return target[name];
						}
					});

const GoogleLogo = new Proxy({"src":"/_astro/google_logo.DvwGsCzP.png","width":1200,"height":406,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/martyheyn/Documents/projects/tiny-tides/tiny-tides-site/public/assets/images/google_logo.png";
							}
							
							return target[name];
						}
					});

function Testamonial($$payload, $$props) {
	push();

	let { userName, link, children } = $$props;

	$$payload.out += `<a${attr("href", link)} target="_blank"><div class="google-border cursor-pointer hover:scale-[1.015] hover:shadow-xl transition-transform duration-300 ease-in-out svelte-8uta7q"><div${attr("class", `${stringify(`flex flex-row w-[400px] h-[365px] bg-primary rounded-lg gap-x-2 p-4 relative`)} svelte-8uta7q`)}><div class="mt-1.5"><div class="w-10 h-10 bg-green-600 rounded-full flex justify-center items-center"><p class="text-white">${escape_html(userName.charAt(0).toUpperCase())}</p></div></div> <div class="flex flex-col gap-y-[2px] justify-start"><h4 class="font-bold text-lg">${escape_html(userName)}</h4> <div class="flex flex-row gap-x-2 my-1 items-center"><span><span style="clip-path: polygon(6px 0, 4.31px 3.98px, 0 4.34px, 3.28px 7.18px, 2.29px 11.4px, 6px 9.16px, 9.71px 11.4px, 8.72px 7.18px, 12px 4.34px, 7.69px 3.98px, 6px 0, 20px 0, 18.31px 3.98px, 14px 4.34px, 17.28px 7.18px, 16.29px 11.4px, 20px 9.16px, 23.71px 11.4px, 22.72px 7.18px, 26px 4.34px, 21.69px 3.98px, 20px 0, 34px 0, 32.31px 3.98px, 28px 4.34px, 31.28px 7.18px, 30.29px 11.4px, 34px 9.16px, 37.71px 11.4px, 36.72px 7.18px, 40px 4.34px, 35.69px 3.98px, 34px 0, 48px 0, 46.31px 3.98px, 42px 4.34px, 45.28px 7.18px, 44.29px 11.4px, 48px 9.16px, 51.71px 11.4px, 50.72px 7.18px, 54px 4.34px, 49.69px 3.98px, 48px 0, 62px 0, 60.31px 3.98px, 56px 4.34px, 59.28px 7.18px, 58.29px 11.4px, 62px 9.16px, 65.71px 11.4px, 64.72px 7.18px, 68px 4.34px, 63.69px 3.98px, 62px 0);" class="inline-block w-[70px] h-3 text-yellow-400 bg-yellow-400"></span></span></div> <div class="mt-1 overflow-hidden">`;
	children($$payload);
	$$payload.out += `<!----></div> <div class="absolute bottom-0 right-0 h-12 w-full bg-primary blur-md"></div></div></div></div></a>`;
	pop();
}

const $$Testamonials = createComponent(($$result, $$props, $$slots) => {
  const markdownFiles = /* #__PURE__ */ Object.assign({"../pages/testamonials/1_test.md": __vite_glob_0_0,"../pages/testamonials/2_test.md": __vite_glob_0_1,"../pages/testamonials/3_test.md": __vite_glob_0_2,"../pages/testamonials/4_test.md": __vite_glob_0_3,"../pages/testamonials/5_test.md": __vite_glob_0_4


});
  const testamonials = Object.values(markdownFiles);
  return renderTemplate`${maybeRenderHead()}<div class="py-8" data-astro-cid-ohe5teov> <div class="w-full flex justify-center items-center" data-astro-cid-ohe5teov> <a href="https://www.google.com/search?q=tiny+tides+therapy&sca_esv=6fbc5b85f7533cfa&authuser=2&sxsrf=AE3TifOxiD6J7c8zemvdRAi9NMgZqUJ4Cg%3A1758921846288&source=hp&ei=dgTXaKGbD8Tl5NoPzfumqQU&iflsig=AOw8s4IAAAAAaNcSht-bXFbXEF3v8dkVc05uNPZrEer-&oq=tiny&gs_lp=Egdnd3Mtd2l6IgR0aW55KgIIADIKECMYgAQYJxiKBTIEECMYJzIKECMYgAQYJxiKBTILEAAYgAQYkQIYigUyChAAGIAEGEMYigUyDhAuGIAEGMcBGI4FGK8BMgsQABiABBiRAhiKBTIKEAAYgAQYQxiKBTINEC4YgAQYsQMYQxiKBTITEC4YgAQYsQMY0QMYQxjHARiKBUi0EFAAWI4DcAB4AJABAJgBa6ABlgOqAQMxLjO4AQPIAQD4AQGYAgSgAqsDwgIQEAAYgAQYsQMYQxiDARiKBcICDhAuGIAEGLEDGIMBGIoFwgIOEC4YgAQYsQMY0QMYxwHCAhEQLhiABBixAxjRAxiDARjHAcICFhAuGIAEGLEDGNEDGEMYgwEYxwEYigXCAgoQLhiABBhDGIoFwgIOEAAYgAQYsQMYgwEYigXCAhAQLhiABBixAxhDGIMBGIoFwgINEAAYgAQYsQMYQxiKBZgDAJIHAzEuM6AH-D2yBwMxLjO4B6sDwgcFMC4yLjLIBw8&sclient=gws-wiz&zx=1758932855632&no_sw_cr=1#mpd=~17215919823931273635/customers/reviews&lrd=0xaa6e3ca2367183d9:0x60401a162d9db535,1,,,," target="_blank" data-astro-cid-ohe5teov> <h1 class="header-title tracking-wider text-blue-950 py-8 pb-12 flex flex-row items-center text-[32px] md:text-4xl" data-astro-cid-ohe5teov> <span class="mb-2 straight_underline z-10" data-astro-cid-ohe5teov>5.0 on</span> <span data-astro-cid-ohe5teov> ${renderComponent($$result, "Image", $$Image, { "src": GoogleLogo, "alt": "google-logo", "class": "w-[175px] sm:w-[200px] h-[44px] sm:h-[52px] px-4", "data-astro-cid-ohe5teov": true })} </span> <span class="mb-2 straight_underline z-10" data-astro-cid-ohe5teov>Reviews!</span> </h1> </a> </div> <div class="relative w-full" data-astro-cid-ohe5teov> <div class="testimonials-track flex gap-x-4" data-astro-cid-ohe5teov> ${testamonials.map((testamonial) => renderTemplate`${renderComponent($$result, "Testamonial", Testamonial, { "userName": testamonial.frontmatter.userName, "numReviews": testamonial.frontmatter.numReviews, "sincePost": testamonial.frontmatter.sincePost, "link": testamonial.frontmatter.link, "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/martyheyn/Documents/projects/tiny-tides/tiny-tides-site/src/components/Testamonial.svelte", "client:component-export": "default", "data-astro-cid-ohe5teov": true }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "testamonial.Content", testamonial.Content, { "data-astro-cid-ohe5teov": true })} ` })}`)} <!-- duplicate testimonials for seamless loop --> ${testamonials.map((testamonial) => renderTemplate`${renderComponent($$result, "Testamonial", Testamonial, { "userName": testamonial.frontmatter.userName, "numReviews": testamonial.frontmatter.numReviews, "sincePost": testamonial.frontmatter.sincePost, "link": testamonial.frontmatter.link, "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/martyheyn/Documents/projects/tiny-tides/tiny-tides-site/src/components/Testamonial.svelte", "client:component-export": "default", "data-astro-cid-ohe5teov": true }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "testamonial.Content", testamonial.Content, { "data-astro-cid-ohe5teov": true })} ` })}`)} </div> </div> </div> `;
}, "/Users/martyheyn/Documents/projects/tiny-tides/tiny-tides-site/src/components/Testamonials.astro", void 0);

const $$Astro = createAstro();
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const pageTitle = "Tiny Tides Therapy - OT, Lactation, Baltimore";
  const description = "Tiny Tides Therapy is a pediatric therapy practice in Baltimore, MD. We offer occupational therapy, lactation consulting, and feeding therapy services. Baltimore Pediatric Occupational Therapy";
  const services = [
    {
      img: BabyCrawlingImg,
      title: "Occupational Therapy",
      description: "Don\u2019t \u201Cwait it out\u201D when it comes to your baby's development! Early OT intervention can help set your little one up for success with meeting milestones and provide a strong foundation for future growth and independence.",
      link: "/what-we-treat/#occupational-therapy"
    },
    {
      img: BreastFeedingImg,
      title: "Lactation Counseling",
      description: "Breastfeeding can be TOUGH! Tiny Tides offers tailored strategies to support successful breastfeeding. Let\u2019s work together to enhance the feeding experience with your little one.",
      link: "/what-we-treat/#lactation-consulting"
    },
    {
      img: BabyFeedingImg,
      title: "Feeding Therapy",
      description: "Whether you are struggling with bottle feeding, transitioning to solids, or picky eating, Tiny Tides provides individualized support to help you and your little one reach your feeding goals.",
      link: "/what-we-treat/#transition-to-solids"
    }
  ];
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "pageTitle": pageTitle, "description": description, "data-astro-cid-j7pv25f6": true }, { "default": ($$result2) => renderTemplate`  ${maybeRenderHead()}<section class="bg-gradient-to-b from-primary to-secondary" data-astro-cid-j7pv25f6> <div class="h-[106vh] w-full relative overflow-hidden pt-14 md:pt-[76px]" data-astro-cid-j7pv25f6> <div class="relative bg-transparent md:bg-gradient-to-b md:from-primary md:to-[#c5e8e8] w-full md:w-1/2 h-full flex justify-center items-center z-20 px-4 md:px-12 rounded-b-lg" data-astro-cid-j7pv25f6> <div class="flex flex-col gap-y-4 justify-center items-center" data-astro-cid-j7pv25f6> ${renderComponent($$result2, "Logo", $$Logo, { "fill": "#172554", "width": "400px", "data-astro-cid-j7pv25f6": true })} <p class="header-title lowercase text-white md:text-blue-950" data-astro-cid-j7pv25f6> <span class="mx-1" data-astro-cid-j7pv25f6>tiny</span> <span class="mx-1" data-astro-cid-j7pv25f6>tides</span> <span class="mx-1" data-astro-cid-j7pv25f6>therapy</span> </p> <h2 class="font-header text-xl sm:text-base md:text-lg lowercase text-center text-white md:text-blue-950" data-astro-cid-j7pv25f6>
Occupational Therapy <span class="mx-1" data-astro-cid-j7pv25f6>-</span> Lactation <span class="mx-1" data-astro-cid-j7pv25f6>-</span> Feeding <span class="mx-1" data-astro-cid-j7pv25f6>-</span> Development
</h2> <div class="flex justify-center md:hidden lg:block mt-4 mb-12 md:mb-6" data-astro-cid-j7pv25f6> <a href="/contact" data-astro-cid-j7pv25f6> ${renderComponent($$result2, "Button", $$Button, { "text": "Schedule Free 15 Minute Phone Consultation", "textColor": "#173f69bf", "textSize": "text-base", "data-astro-cid-j7pv25f6": true })} </a> </div> </div> </div> <video class="absolute top-0 left-0 h-full w-full z-10 object-cover opacity-100 grayscale-[10%]" playsinline autoplay loop muted data-astro-cid-j7pv25f6> <source src="https://dkbi9cj3nodif.cloudfront.net/wave-birdeye-view.mp4" type="video/mp4" data-astro-cid-j7pv25f6> <source src="https://dkbi9cj3nodif.cloudfront.net/wave-birdeye-view.mp4" type="video/webm" data-astro-cid-j7pv25f6> <source src="https://dkbi9cj3nodif.cloudfront.net/wave-birdeye-view.mp4" type="video/ogg" data-astro-cid-j7pv25f6> </video> <div class="sticky bottom-0 bg-[linear-gradient(to_top,_#fff,_rgba(0,_0,_0,_0))] content-[''] w-full h-[15vh] block z-20" data-astro-cid-j7pv25f6></div> ${renderComponent($$result2, "WaveDivider", $$WaveDivider, { "placement": "bottom", "fill": "#fff", "data-astro-cid-j7pv25f6": true })} </div> <!-- Services --> <div class="min-h-[90vh] w-full transition-all duration-300 ease-in-out relative" data-astro-cid-j7pv25f6> <div class="sticky top-0 bg-[linear-gradient(to_bottom,_#fff,_rgba(0,_0,_0,_0))] content-[''] w-full h-[15vh] block z-20" data-astro-cid-j7pv25f6></div> <div class="py-16 px-6 lg:px-12" data-astro-cid-j7pv25f6> <div class="flex flex-col justify-center items-center gap-y-20" data-astro-cid-j7pv25f6> <h1 class="header-title text-blue-950" data-astro-cid-j7pv25f6>
For all of your pediatric, lactation, & infant feeding therapy needs!
</h1> <div class="md:max-w-6xl grid grid-cols-1 md:grid-cols-3 content-center w-full gap-y-16 md:gap-y-0 md:gap-x-4 lg:gap-x-16" data-astro-cid-j7pv25f6> ${services.map((service) => renderTemplate`${renderComponent($$result2, "WhatWeTreat", $$WhatWeTreat, { "img": service.img, "title": service.title, "description": service.description, "link": service.link, "data-astro-cid-j7pv25f6": true })}`)} </div> </div> <div class="mt-32 w-full flex flex-row justify-center transition-all ease-in-out duration-300" data-astro-cid-j7pv25f6> <div class="max-w-6xl flex flex-col gap-y-6 md:flex-row md:gap-x-8 lg:gap-x-16 justify-center" data-astro-cid-j7pv25f6> <div class="w-full md:w-1/2 flex flex-col justify-center gap-y-16 bg-white/30 rounded-lg p-6 h-full" data-astro-cid-j7pv25f6> <h1 class="header-title md:text-3xl text-center w-full max-w-3xl text-blue-950" data-astro-cid-j7pv25f6>
Providing support in Baltimore City, surrounding areas, and
                virtually
</h1> <div class="flex flex-col items-center gap-y-6" data-astro-cid-j7pv25f6> <h1 class="header-title md:text-3xl text-blue-950 text-center" data-astro-cid-j7pv25f6>
Check out our FREE groups this month
</h1> <a href="/groups" data-astro-cid-j7pv25f6> ${renderComponent($$result2, "Button", $$Button, { "text": "Get more Info About Each Individual Group", "textColor": "#173f69bf", "textSize": "text-base", "data-astro-cid-j7pv25f6": true })} </a> </div> </div> <div class="w-full md:w-1/2 flex justify-center" data-astro-cid-j7pv25f6> <img class="max-h-[600px] max-w-[500px] w-full rounded-md" src="https://dkbi9cj3nodif.cloudfront.net/october_calendar.png" alt="free group occupational therapy, lactation, infant feeding calendar" data-astro-cid-j7pv25f6> </div> </div> </div> </div> <!-- Testimonials --> <section class=" w-full py-8 px-4" data-astro-cid-j7pv25f6> ${renderComponent($$result2, "Testamonials", $$Testamonials, { "data-astro-cid-j7pv25f6": true })} </section> <!-- Steps --> <div class="py-16 pb-36" data-astro-cid-j7pv25f6> <div class="relative flex flex-col md:flex-row gap-y-12 md:gap-x-8 justify-between items-center px-8 lg:px-20 transition-all duration-300 ease-in-out" data-astro-cid-j7pv25f6> ${renderComponent($$result2, "Step", $$Step, { "stepNum": "1", "description": "Schedule a free 15 minute consultation", "data-astro-cid-j7pv25f6": true })} <div class="absolute top-[27%] md:top-[40%] md:left-[28%] hidden lg:block step-arrow-1" data-astro-cid-j7pv25f6> <svg viewBox="0 0 24 24" width="100" height="100" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" class="" data-astro-cid-j7pv25f6><path d="M21.883 12l-7.527 6.235.644.765 9-7.521-9-7.479-.645.764 7.529 6.236h-21.884v1h21.883z" data-astro-cid-j7pv25f6></path> </svg> </div> ${renderComponent($$result2, "Step", $$Step, { "stepNum": "2", "description": "Get a comprehensive in home evaluation", "data-astro-cid-j7pv25f6": true })} <div class="absolute lg:top-[40%] lg:left-[64%] hidden lg:block step-arrow-2" data-astro-cid-j7pv25f6> <svg viewBox="0 0 24 24" width="100" height="100" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" class="" data-astro-cid-j7pv25f6><path d="M21.883 12l-7.527 6.235.644.765 9-7.521-9-7.479-.645.764 7.529 6.236h-21.884v1h21.883z" data-astro-cid-j7pv25f6></path> </svg> </div> ${renderComponent($$result2, "Step", $$Step, { "stepNum": "3", "description": "Receive a personalized plan", "data-astro-cid-j7pv25f6": true })} </div> </div> ${renderComponent($$result2, "WaveDivider", $$WaveDivider, { "placement": "bottom", "fill": "#f3ffff", "data-astro-cid-j7pv25f6": true })} </div> </section>  <div class="bg-primary w-full py-16 px-4 flex justify-center" data-astro-cid-j7pv25f6> <div class="max-w-7xl lg:w-[1256px]" data-astro-cid-j7pv25f6> <div class="flex justify-center" data-astro-cid-j7pv25f6> <h1 class="header-title text-blue-950" data-astro-cid-j7pv25f6> <span class="straight_underline z-10" data-astro-cid-j7pv25f6>Get in Touch</span> </h1> </div> <div class="w-full mt-8 md:mt-12 grid grid-cols-1 md:grid-cols-2 gap-y-12 md:gap-y-0 md:gap-x-8 border border-black rounded-md transition-all duration-300 ease-in-out" data-astro-cid-j7pv25f6> <div class="w-full md:h-screen flex justify-center items-center" data-astro-cid-j7pv25f6> <img src="https://dkbi9cj3nodif.cloudfront.net/erin_baby_bounce.jpeg" alt="occupational therapy, lactation, infant feeding Toddlers playing" class="w-full h-full rounded-md object-cover" data-astro-cid-j7pv25f6> </div> <div class="flex flex-col justify-center items-center md:py-20" data-astro-cid-j7pv25f6> <p class="text-xl max-w-md px-4 md:px-8" data-astro-cid-j7pv25f6>
Submit an inquiry and we will be in touch!
</p> ${renderComponent($$result2, "ContactForm", ContactForm, { "homepage": true, "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/martyheyn/Documents/projects/tiny-tides/tiny-tides-site/src/components/ContactForm.svelte", "client:component-export": "default", "data-astro-cid-j7pv25f6": true })} </div> </div> </div> </div> ` })}  ${renderScript($$result, "/Users/martyheyn/Documents/projects/tiny-tides/tiny-tides-site/src/pages/index.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/martyheyn/Documents/projects/tiny-tides/tiny-tides-site/src/pages/index.astro", void 0);

const $$file = "/Users/martyheyn/Documents/projects/tiny-tides/tiny-tides-site/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
