/* empty css                         */
import { c as createComponent, r as renderTemplate, m as maybeRenderHead, u as unescapeHTML } from './astro/server_CyvEsQJY.mjs';
import 'kleur/colors';
import 'clsx';

const html = "<p>Get confident in starting solids with your little one! This class covers signs of readiness first foods, cup and straw drinking, and practical tips to make mealtimes easier. Perfect for parents looking for expert guidance in a supportive space.</p>\n<!-- <a href=\"\">\n<button\nclass=\"font-semibold text-base px-6 py-3 transition-all duration-300 ease-in-out cursor-pointer rounded-md hover:scale-[1.02] shadow-lg hover:shadow-2xl text-black bg-[#9ddcdc] hover:bg-[#90e8e8]\">\nClick Here to Sign Up\n</button>\n<a> -->";

				const frontmatter = {"title":"Virtual Intro to Solids Class","id":"intro-to-solids","img":"https://dkbi9cj3nodif.cloudfront.net/intro-to-solids.png","duration":"1 hour","price":"$15$","pubDate":"2025-02-27T00:00:00.000Z","author":"Tiny Tides Brah","tags":["astro","intro-to-solids","services"]};
				const file = "/Users/martyheyn/Documents/projects/tiny-tides/tiny-tides-site/src/pages/groups/2_intro_solids.md";
				const url = "/groups/2_intro_solids";
				function rawContent() {
					return "\nGet confident in starting solids with your little one! This class covers signs of readiness first foods, cup and straw drinking, and practical tips to make mealtimes easier. Perfect for parents looking for expert guidance in a supportive space.\n\n<!-- <a href=\"\">\n<button\nclass=\"font-semibold text-base px-6 py-3 transition-all duration-300 ease-in-out cursor-pointer rounded-md hover:scale-[1.02] shadow-lg hover:shadow-2xl text-black bg-[#9ddcdc] hover:bg-[#90e8e8]\">\nClick Here to Sign Up\n</button>\n<a> -->\n";
				}
				function compiledContent() {
					return html;
				}
				function getHeadings() {
					return [];
				}

				const Content = createComponent((result, _props, slots) => {
					const { layout, ...content } = frontmatter;
					content.file = file;
					content.url = url;

					return renderTemplate`${maybeRenderHead()}${unescapeHTML(html)}`;
				});

const __vite_glob_0_1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	Content,
	compiledContent,
	default: Content,
	file,
	frontmatter,
	getHeadings,
	rawContent,
	url
}, Symbol.toStringTag, { value: 'Module' }));

export { __vite_glob_0_1 as _ };
