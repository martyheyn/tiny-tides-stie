/* empty css                                 */
import { c as createComponent, e as renderComponent, r as renderTemplate, m as maybeRenderHead, b as addAttribute } from '../chunks/astro/server_C5DwWSlw.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_CDQXxtyS.mjs';
import { C as ContactForm } from '../chunks/ContactForm_qQhwhcu7.mjs';
export { r as renderers } from '../chunks/_@astro-renderers_DX37PFz5.mjs';

const $$Contact = createComponent(($$result, $$props, $$slots) => {
  const pageTitle = "Contact Us - Baltimore";
  const description = "Contact Tiny Tides Therapy for a free consultation, Baltimore Pediatric Occupational Therapy";
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "pageTitle": pageTitle, "description": description }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="relative w-full h-[85vh] pt-14 sm:pt-[76px]"> <img src="https://dkbi9cj3nodif.cloudfront.net/bmore_inner_harbor.jpg" alt="Toddlers playing" class="w-full h-full object-cover object-center contrast-125"> <h1 class="header-title text-4xl sm:text-5xl text-white absolute w-3/5 sm:w-auto top-1/2 left-1/2 -translate-x-[50%] sm:-translate-x-[60%] bg-black/50 sm:px-4 py-2 rounded-md">
Contact Us
</h1> </div> <div class="bg-primary py-16 px-4 md:px-8 lg:px-12 flex justify-center"> <div class="max-w-6xl"> <div class="flex flex-col h-full md:flex-row gap-y-12 md:gap-y-0 md:gap-x-6 lg:gap-x-12 justify-between items-center"> <div class="w-full md:w-1/2 h-full"> <div class="h-full flex flex-col justify-center gap-y-4 rounded-md shadow-lg bg-[#ecf7f7] border border-black/50 text-gray-900 py-4 md:py-8 px-4 md:px-6 lg:px-12"> <h1 class="text-3xl md:text-4xl"> <span class="straight_underline z-10">Reach out for support!</span> </h1> <p class="text-base">
We proudly serve families in Baltimore City, surrounding areas,
              and virtually.
<br> <br>
Getting started is simple: reach out to us through our contact form
              to share your concerns and we will work to schedule a free 15-minute
              phone consultation to talk more about how Tiny Tides can support you
              and your little one!
</p> </div> <iframe class="hidden" width="400" height="50" style="border:0" loading="lazy" allowfullscreen${addAttribute(`https://www.google.com/maps/embed/v1/place?q=place_id:ChIJt4P01q4DyIkRWOcjQqiWSAQ&key=${"AIzaSyDd1hSbR-Z3-dTA54_snDhabJUVRtH9QB4"}`, "src")}>
          </iframe> </div> <div class="w-full h-full md:w-1/2 flex justify-center"> ${renderComponent($$result2, "ContactForm", ContactForm, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/martyheyn/Documents/projects/tiny-tides/tiny-tides-site/src/components/ContactForm.svelte", "client:component-export": "default" })} </div> </div> </div> </div> ` })}`;
}, "/Users/martyheyn/Documents/projects/tiny-tides/tiny-tides-site/src/pages/contact.astro", void 0);
const $$file = "/Users/martyheyn/Documents/projects/tiny-tides/tiny-tides-site/src/pages/contact.astro";
const $$url = "/contact";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Contact,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
