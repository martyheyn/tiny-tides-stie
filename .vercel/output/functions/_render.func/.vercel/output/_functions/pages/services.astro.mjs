/* empty css                                 */
import { _ as __vite_glob_0_0 } from '../chunks/1_discovery_ImVNRpq1.mjs';
import { _ as __vite_glob_0_1 } from '../chunks/2_evaluation_nW-Lnyfb.mjs';
import { _ as __vite_glob_0_2 } from '../chunks/3_follow_up_1PpI71TY.mjs';
import { _ as __vite_glob_0_3 } from '../chunks/4_baby_bootcamp_WGT55ydc.mjs';
import { _ as __vite_glob_0_4 } from '../chunks/5_virtual_DTHz0Af6.mjs';
import { _ as __vite_glob_0_5 } from '../chunks/6_virtual_milestone_bbgGJ2Qj.mjs';
import { c as createComponent, r as renderTemplate, e as renderComponent, m as maybeRenderHead } from '../chunks/astro/server_CyvEsQJY.mjs';
import 'kleur/colors';
import { $ as $$Service } from '../chunks/Service_CJSf8u6w.mjs';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_DR02x1_z.mjs';
export { r as renderers } from '../chunks/_@astro-renderers_bPVGQiWf.mjs';

const $$Services = createComponent(($$result, $$props, $$slots) => {
  const markdownFiles = /* #__PURE__ */ Object.assign({"./services/1_discovery.md": __vite_glob_0_0,"./services/2_evaluation.md": __vite_glob_0_1,"./services/3_follow_up.md": __vite_glob_0_2,"./services/4_baby_bootcamp.md": __vite_glob_0_3,"./services/5_virtual.md": __vite_glob_0_4,"./services/6_virtual_milestone.md": __vite_glob_0_5});
  const services = Object.values(markdownFiles);
  const pageTitle = "Services - OT, Lactation, Baltimore";
  const description = "Tiny Tides Therapy offers a variety of services to support your child\u2019s development. From feeding therapy to sensory processing, we provide individualized care to help your child reach their full potential. Baltimore Pediatric Occupational Therapy";
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "pageTitle": pageTitle, "description": description }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="w-full h-full bg-primary transition-all duration-300 ease-in-out"> <div class="relative w-full h-[85vh] pt-14 md:pt-[76px]"> <img src="https://dkbi9cj3nodif.cloudfront.net/bmore_inner_harbor.jpg" alt="Toddlers playing" class="w-full h-full object-cover object-center contrast-125"> <h1 class="header-title text-4xl sm:text-5xl text-white absolute w-3/5 sm:w-auto top-1/2 left-1/2 -translate-x-[50%] sm:-translate-x-[60%] bg-black/50 sm:px-4 py-2 rounded-md">
Services
</h1> </div> <div class="w-full flex flex-col gap-y-4 px-4 md:px-12 py-8 treat-item transition-all duration-300 ease-in-out"> ${services.map((service) => renderTemplate`${renderComponent($$result2, "Service", $$Service, { "title": service.frontmatter.title, "duration": service.frontmatter.duration, "price": service.frontmatter.price, "id": service.frontmatter.id }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "service.Content", service.Content, {})} ` })}`)} </div> </div> ` })}`;
}, "/Users/martyheyn/Documents/projects/tiny-tides/tiny-tides-site/src/pages/services.astro", void 0);

const $$file = "/Users/martyheyn/Documents/projects/tiny-tides/tiny-tides-site/src/pages/services.astro";
const $$url = "/services";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Services,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
