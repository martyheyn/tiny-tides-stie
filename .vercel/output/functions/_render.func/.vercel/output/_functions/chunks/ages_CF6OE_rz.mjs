/* empty css                         */
import { c as createComponent, r as renderTemplate, m as maybeRenderHead, u as unescapeHTML } from './astro/server_D3OzqXDD.mjs';
import 'kleur/colors';
import 'clsx';

const html = "<p>We specialize in working with infants, toddlers, and young children, focusing on feeding, eating, and developmental milestones from birth through early childhood.</p>";

				const frontmatter = {"title":"Ages FAQ","pubDate":"2024-10-05T00:00:00.000Z","author":"Tiny Tides Brah","question":"What ages do you work with?","tags":["astro","ages","faqs"]};
				const file = "/Users/martyheyn/Documents/projects/tiny-tides-site/src/pages/faqs/ages.md";
				const url = "/faqs/ages";
				function rawContent() {
					return "\nWe specialize in working with infants, toddlers, and young children, focusing on feeding, eating, and developmental milestones from birth through early childhood.\n";
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

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
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

export { _page as _ };
