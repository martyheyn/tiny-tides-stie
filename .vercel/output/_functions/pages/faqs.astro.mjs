/* empty css                                 */
import { _ as __vite_glob_0_0 } from '../chunks/ages_DQSLqtm8.mjs';
import { _ as __vite_glob_0_1 } from '../chunks/evaluation_Cizj9ejc.mjs';
import { _ as __vite_glob_0_2 } from '../chunks/first_visit_cMW3p85Q.mjs';
import { _ as __vite_glob_0_3 } from '../chunks/insurance_gRj4ngRK.mjs';
import { _ as __vite_glob_0_4 } from '../chunks/virtual_Chh6yEQ6.mjs';
import { c as createComponent, b as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_BEGASLii.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_DL9vzG4q.mjs';
import { e as ensure_array_like } from '../chunks/_@astro-renderers_BZ9dM9J6.mjs';
export { r as renderers } from '../chunks/_@astro-renderers_BZ9dM9J6.mjs';
import { e as escape_html } from '../chunks/escaping_CBnpiEl5.mjs';

/**
 * @param {string} value
 */
function html(value) {
	var html = String(value ?? '');
	var open = '<!---->';
	return open + html + '<!---->';
}

function Faq($$payload, $$props) {
	let { faqs } = $$props;
	let selectedFaq = 0;
	const each_array = ensure_array_like(faqs);

	$$payload.out += `<div><!--[-->`;

	for (let i = 0, $$length = each_array.length; i < $$length; i++) {
		let { frontmatter, html: html$1 } = each_array[i];

		$$payload.out += `<div class="w-full bg-secondary text-black my-2 px-4 rounded-md"><div class="flex gap-x-6 justify-between items-center py-2"><p class="text-lg md:text-xl font-semibold">${escape_html(frontmatter.question)}</p> <button class="cursor-pointer hover:scale-[1.10] transition-all duration-300 ease-in-out" aria-label="Toggle FAQ">`;

		if (selectedFaq !== i) {
			$$payload.out += "<!--[-->";
			$$payload.out += `<svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M11 11v-11h1v11h11v1h-11v11h-1v-11h-11v-1h11z"></path></svg>`;
		} else {
			$$payload.out += "<!--[!-->";
		}

		$$payload.out += `<!--]--> `;

		if (selectedFaq === i) {
			$$payload.out += "<!--[-->";
			$$payload.out += `<svg class="w-6 h-6" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m21 11.75c0-.414-.336-.75-.75-.75h-16.5c-.414 0-.75.336-.75.75s.336.75.75.75h16.5c.414 0 .75-.336.75-.75z" fill-rule="nonzero"></path></svg>`;
		} else {
			$$payload.out += "<!--[!-->";
		}

		$$payload.out += `<!--]--></button></div> `;

		if (selectedFaq === i) {
			$$payload.out += "<!--[-->";
			$$payload.out += `<div class="py-2"><p>${html(html$1)}</p></div>`;
		} else {
			$$payload.out += "<!--[!-->";
		}

		$$payload.out += `<!--]--></div>`;
	}

	$$payload.out += `<!--]--></div>`;
}

const $$Faqs = createComponent(async ($$result, $$props, $$slots) => {
  const pageTitle = "FAQs - OT, Lactation, Baltimore";
  const description = "Frequently asked questions about Tiny Tides Therapy, Baltimore Pediatric Occupational Therapy";
  const markdownFiles = /* #__PURE__ */ Object.assign({"./faqs/ages.md": __vite_glob_0_0,"./faqs/evaluation.md": __vite_glob_0_1,"./faqs/first_visit.md": __vite_glob_0_2,"./faqs/insurance.md": __vite_glob_0_3,"./faqs/virtual.md": __vite_glob_0_4});
  const faqs = await Promise.all(
    Object.values(markdownFiles).map(async (file) => ({
      slug: file.url,
      html: await file.compiledContent(),
      // 👈 await here
      frontmatter: file.frontmatter
    }))
  );
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "pageTitle": pageTitle, "description": description }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="w-full bg-primary pt-14 md:pt-[76px] min-h-screen flex justify-center"> <div class="flex flex-col max-w-2xl items-center justify-center my-8 px-4 transition-all duration-300 ease-in-out"> <h1 class="header-title mb-4 md:mb-8 text-center"> <span class="straight_underline z-10">FAQs</span> </h1> ${renderComponent($$result2, "Faq", Faq, { "client:load": true, "faqs": faqs, "client:component-hydration": "load", "client:component-path": "/Users/martyheyn/Documents/projects/tiny-tides/tiny-tides-site/src/components/Faq.svelte", "client:component-export": "default" })} </div> </div> ` })}`;
}, "/Users/martyheyn/Documents/projects/tiny-tides/tiny-tides-site/src/pages/faqs.astro", void 0);

const $$file = "/Users/martyheyn/Documents/projects/tiny-tides/tiny-tides-site/src/pages/faqs.astro";
const $$url = "/faqs";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Faqs,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
