/* empty css                         */
import { c as createComponent, m as maybeRenderHead, u as unescapeHTML, r as renderTemplate } from './astro/server_BEGASLii.mjs';
import 'kleur/colors';
import 'clsx';

const html = () => "<p>We specialize in working with infants, toddlers, and young children, focusing on feeding, eating, and developmental milestones from birth through 24 months.</p>";

				const frontmatter = {"title":"Ages FAQ","pubDate":"2024-10-05T00:00:00.000Z","author":"Tiny Tides Brah","question":"What ages do you work with?","tags":["astro","ages","faqs"]};
				const file = "/Users/martyheyn/Documents/projects/tiny-tides/tiny-tides-site/src/pages/faqs/ages.md";
				const url = "/faqs/ages";
				function rawContent() {
					return "   \n                 \n                   \n                         \n                                       \n                               \n   \n\nWe specialize in working with infants, toddlers, and young children, focusing on feeding, eating, and developmental milestones from birth through 24 months.\n";
				}
				async function compiledContent() {
					return await html();
				}
				function getHeadings() {
					return [];
				}

				const Content = createComponent((result, _props, slots) => {
					const { layout, ...content } = frontmatter;
					content.file = file;
					content.url = url;

					return renderTemplate`<meta charset="utf-8">${maybeRenderHead()}${unescapeHTML(html())}`;
				});

const __vite_glob_0_0 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
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

export { __vite_glob_0_0 as _ };
