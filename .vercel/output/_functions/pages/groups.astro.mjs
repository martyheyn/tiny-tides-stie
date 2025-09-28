/* empty css                                 */
import { _ as __vite_glob_0_0 } from '../chunks/1_tummy_time_D0MHXKAX.mjs';
import { _ as __vite_glob_0_1 } from '../chunks/2_intro_solids_Dk5DpMfV.mjs';
import { _ as __vite_glob_0_2 } from '../chunks/3_tiny_movers_MW3bT6Uh.mjs';
import { c as createComponent, b as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_BEGASLii.mjs';
import 'kleur/colors';
import { $ as $$Service } from '../chunks/Service_CrNIKvbG.mjs';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_DJ0Ji_q3.mjs';
export { r as renderers } from '../chunks/_@astro-renderers_BZ9dM9J6.mjs';

const $$Groups = createComponent(($$result, $$props, $$slots) => {
  const markdownFiles = /* #__PURE__ */ Object.assign({"./groups/1_tummy_time.md": __vite_glob_0_0,"./groups/2_intro_solids.md": __vite_glob_0_1,"./groups/3_tiny_movers.md": __vite_glob_0_2});
  const groups = Object.values(markdownFiles);
  const pageTitle = "Groups - OT, Lactation, Baltimore";
  const description = "Free Groups run by Tiny Tides Therapy Baltimore Pediatric Occupational Therapy";
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "pageTitle": pageTitle, "description": description }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="w-full h-full bg-primary transition-all duration-300 ease-in-out"> <div class="relative w-full h-[85vh] pt-14 md:pt-[76px]"> <img src="https://dkbi9cj3nodif.cloudfront.net/tummy_time_in_park_riverside.jpg" alt="Toddlers playing" class="w-full h-full object-cover object-center contrast-125"> <h1 class="header-title text-4xl sm:text-5xl text-white absolute w-3/5 sm:w-auto top-1/2 left-1/2 -translate-x-[50%] sm:-translate-x-[60%] bg-black/50 sm:px-4 py-2 rounded-md">
Groups
</h1> </div> <div class="w-full flex flex-col gap-y-4 px-4 md:px-12 py-8 treat-item transition-all duration-300 ease-in-out"> ${groups.map((group) => renderTemplate`${renderComponent($$result2, "Service", $$Service, { "title": group.frontmatter.title, "duration": group.frontmatter.duration, "price": group.frontmatter.price, "img": group.frontmatter.img, "id": group.frontmatter.id }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "group.Content", group.Content, {})} ` })}`)} </div> </div> ` })}`;
}, "/Users/martyheyn/Documents/projects/tiny-tides/tiny-tides-site/src/pages/groups.astro", void 0);

const $$file = "/Users/martyheyn/Documents/projects/tiny-tides/tiny-tides-site/src/pages/groups.astro";
const $$url = "/groups";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Groups,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
