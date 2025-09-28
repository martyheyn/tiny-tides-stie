/* empty css                         */
import { c as createComponent, r as renderTemplate, m as maybeRenderHead, u as unescapeHTML } from './astro/server_CyvEsQJY.mjs';
import 'kleur/colors';
import 'clsx';

const html = "<p>Yes, we provide virtual consultations for certain services, such as lactation counseling and feeding guidance. Contact us to see if this option is right for your family.</p>";

				const frontmatter = {"title":"Virtual FAQ","pubDate":"2024-10-05T00:00:00.000Z","author":"Tiny Tides Brah","question":" Do you offer virtual consultations?","tags":["astro","virtual","faqs"]};
				const file = "/Users/martyheyn/Documents/projects/tiny-tides/tiny-tides-site/src/pages/faqs/virtual.md";
				const url = "/faqs/virtual";
				function rawContent() {
					return "\nYes, we provide virtual consultations for certain services, such as lactation counseling and feeding guidance. Contact us to see if this option is right for your family.\n";
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

const __vite_glob_0_4 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
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

export { __vite_glob_0_4 as _ };
