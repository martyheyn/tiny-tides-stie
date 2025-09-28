/* empty css                         */
import { c as createComponent, r as renderTemplate, m as maybeRenderHead, u as unescapeHTML } from './astro/server_CyvEsQJY.mjs';
import 'kleur/colors';
import 'clsx';

const html = "<p>During your first visit we will perform a comprehensive evaluation of your current symptoms to determine the cause and contributing factors. As a result, we will establish an evidence-based, patient-centered plan of care to return you to your best self.</p>";

				const frontmatter = {"title":"First Visit FAQ","pubDate":"2024-10-05T00:00:00.000Z","author":"Tiny Tides Brah","question":"What should I expect at the first visit?","tags":["astro","first_visit","faqs"]};
				const file = "/Users/martyheyn/Documents/projects/tiny-tides/tiny-tides-site/src/pages/faqs/first_visit.md";
				const url = "/faqs/first_visit";
				function rawContent() {
					return "\nDuring your first visit we will perform a comprehensive evaluation of your current symptoms to determine the cause and contributing factors. As a result, we will establish an evidence-based, patient-centered plan of care to return you to your best self.\n";
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

const __vite_glob_0_2 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
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

export { __vite_glob_0_2 as _ };
