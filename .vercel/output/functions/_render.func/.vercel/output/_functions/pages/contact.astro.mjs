/* empty css                                 */
import { c as createComponent, r as renderTemplate, a as renderComponent, m as maybeRenderHead } from '../chunks/astro/server_D3OzqXDD.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_DIrOHDpL.mjs';
import { $ as $$Image } from '../chunks/_astro_assets_D_Cyaxof.mjs';
import { C as ContactForm } from '../chunks/ContactForm_BRFtFCTR.mjs';
export { r as renderers } from '../chunks/_@astro-renderers_B5H1KkQD.mjs';

const BaltimoreCity = new Proxy({"src":"/_astro/bmore_inner_harbor.B1s3mdw5.jpg","width":1280,"height":469,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/martyheyn/Documents/projects/tiny-tides-site/src/assets/images/bmore_inner_harbor.jpg";
							}
							
							return target[name];
						}
					});

const $$Contact = createComponent(($$result, $$props, $$slots) => {
  const pageTitle = "Contact Us";
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "pageTitle": pageTitle }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="relative w-full h-[85vh] pt-14 sm:pt-[76px]"> ${renderComponent($$result2, "Image", $$Image, { "src": BaltimoreCity, "alt": "Toddlers playing", "class": "w-full h-full object-cover object-center contrast-125" })} <h1 class="header-title text-7xl text-white absolute top-1/2 left-1/2 -translate-x-[60%] bg-black/20 px-4 py-2 rounded-md">
Contact Us
</h1> </div> <div class="bg-primary py-16 px-4 md:px-8 lg:px-12 flex justify-center"> <div class="max-w-6xl"> <div class="flex flex-col h-full md:flex-row gap-y-12 md:gap-y-0 md:gap-x-6 lg:gap-x-12 justify-between items-center"> <div class="w-full md:w-1/2 h-full"> <div class="h-full flex flex-col justify-center gap-y-4 rounded-md shadow-lg bg-secondary py-4 md:py-8 px-4 md:px-6 lg:px-12"> <h1 class="text-3xl md:text-5xl">Book an Evaluation Today!</h1> <p class="text-base">
We proudly serve families in Baltimore City and the surrounding
              areas, offering personalized care to support your child’s
              development and well-being.
<br> <br>
Getting started is simple: reach out to us through our contact form
              to share your concerns and we will work to schedule an initial evaluation.
              During the evaluation, we’ll discuss your goals, observe your child’s
              needs, and develop a customized plan to help them thrive. From there,
              we’ll schedule sessions tailored to your family’s needs, working together
              every step of the way. We’re here to make the process as smooth and
              supportive as possible for you and your child.
</p> </div> </div> <div class="w-full h-full md:w-1/2 flex justify-center"> ${renderComponent($$result2, "ContactForm", ContactForm, {})} </div> </div> </div> </div> ` })}`;
}, "/Users/martyheyn/Documents/projects/tiny-tides-site/src/pages/contact.astro", void 0);

const $$file = "/Users/martyheyn/Documents/projects/tiny-tides-site/src/pages/contact.astro";
const $$url = "/contact";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Contact,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
