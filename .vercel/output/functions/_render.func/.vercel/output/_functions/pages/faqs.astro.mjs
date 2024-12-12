/* empty css                                 */
import { c as createComponent, r as renderTemplate, a as renderComponent, b as createAstro, m as maybeRenderHead } from '../chunks/astro/server_D3OzqXDD.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_DIrOHDpL.mjs';
import { e as ensure_array_like } from '../chunks/_@astro-renderers_B5H1KkQD.mjs';
export { r as renderers } from '../chunks/_@astro-renderers_B5H1KkQD.mjs';
import { e as escape_html } from '../chunks/escaping_CBnpiEl5.mjs';
import { DEV } from 'esm-env';

const regex_return_characters = /\r/g;

/**
 * @param {string} str
 * @returns {string}
 */
function hash(str) {
	str = str.replace(regex_return_characters, '');
	let hash = 5381;
	let i = str.length;

	while (i--) hash = ((hash << 5) - hash) ^ str.charCodeAt(i);
	return (hash >>> 0).toString(36);
}

/**
 * @param {string} value
 */
function html(value) {
	var html = String(value ?? '');
	var open = DEV ? `<!--${hash(html)}-->` : '<!---->';
	return open + html + '<!---->';
}

function Faq($$payload, $$props) {
	let { faqs } = $$props;
	let selectedFaq = 0;
	const each_array = ensure_array_like(faqs);

	$$payload.out += `<div><!--[-->`;

	for (let i = 0, $$length = each_array.length; i < $$length; i++) {
		let { frontmatter, content } = each_array[i];

		$$payload.out += `<div class="w-full bg-secondary text-black my-2 px-4 rounded-md"><div class="flex gap-x-6 justify-between items-center py-2"><p class="text-base md:text-xl font-medium">${escape_html(frontmatter.question)}</p> <button class="cursor-pointer hover:scale-[1.10] transition-all duration-300 ease-in-out" aria-label="Toggle FAQ">`;

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
			$$payload.out += `<div class="py-2"><p>${html(content)}</p></div>`;
		} else {
			$$payload.out += "<!--[!-->";
		}

		$$payload.out += `<!--]--></div>`;
	}

	$$payload.out += `<!--]--></div>`;
}

const $$Astro = createAstro();
const $$Faqs = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Faqs;
  const pageTitle = "FAQs";
  const markdownFiles = await Astro2.glob(/* #__PURE__ */ Object.assign({"./faqs/ages.md": () => import('../chunks/ages_CF6OE_rz.mjs').then(n => n._),"./faqs/evaluation.md": () => import('../chunks/evaluation_D6E-3aPC.mjs').then(n => n._),"./faqs/first_visit.md": () => import('../chunks/first_visit_BRAq9sw0.mjs').then(n => n._),"./faqs/insurance.md": () => import('../chunks/insurance_D-Vd9Qi-.mjs').then(n => n._),"./faqs/referral.md": () => import('../chunks/referral_B20Xbtg3.mjs').then(n => n._),"./faqs/virtual.md": () => import('../chunks/virtual_BPgHBaUB.mjs').then(n => n._)}), () => "./faqs/*md");
  const faqs = markdownFiles.map((file) => ({
    slug: file.url,
    // Auto-generated slug for the file
    content: file.compiledContent(),
    // Markdown HTML content
    frontmatter: file.frontmatter
    // Frontmatter data
  }));
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "pageTitle": pageTitle }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="w-full bg-primary pt-14 md:pt-[76px] flex justify-center"> <div class="flex flex-col max-w-2xl items-center justify-center my-8 px-4 transition-all duration-300 ease-in-out"> <h1 class="header-title mb-4 md:mb-8 text-center">FAQs</h1> ${renderComponent($$result2, "Faq", Faq, { "client:load": true, "faqs": faqs, "client:component-hydration": "load", "client:component-path": "/Users/martyheyn/Documents/projects/tiny-tides-site/src/components/Faq.svelte", "client:component-export": "default" })} </div> </div> ` })}`;
}, "/Users/martyheyn/Documents/projects/tiny-tides-site/src/pages/faqs.astro", void 0);

const $$file = "/Users/martyheyn/Documents/projects/tiny-tides-site/src/pages/faqs.astro";
const $$url = "/faqs";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Faqs,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
