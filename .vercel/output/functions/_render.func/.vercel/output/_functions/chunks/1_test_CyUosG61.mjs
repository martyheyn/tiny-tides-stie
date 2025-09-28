/* empty css                         */
import { c as createComponent, r as renderTemplate, m as maybeRenderHead, u as unescapeHTML } from './astro/server_CyvEsQJY.mjs';
import 'kleur/colors';
import 'clsx';

const html = "<p class=\"text-base\">\nI reached out to Erin for a breastfeeding assessment for me and my 2 month old and she couldn’t have been more helpful. She did a body assessment of my little one and showed me exercises to do with her to help relieve tension and improve feeding. She was extremely helpful and supportive and I’ve already seen small improvements in feeding just a few days later.\n</p>";

				const frontmatter = {"id":"google-review-1","userName":"Angela","numReviews":1,"sincePost":"1 month","link":"https://maps.app.goo.gl/XhYLmFY849hf9gds8"};
				const file = "/Users/martyheyn/Documents/projects/tiny-tides/tiny-tides-site/src/pages/testamonials/1_test.md";
				const url = "/testamonials/1_test";
				function rawContent() {
					return "\n<p class=\"text-base\">\nI reached out to Erin for a breastfeeding assessment for me and my 2 month old and she couldn’t have been more helpful. She did a body assessment of my little one and showed me exercises to do with her to help relieve tension and improve feeding. She was extremely helpful and supportive and I’ve already seen small improvements in feeding just a few days later.\n</p>\n";
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
