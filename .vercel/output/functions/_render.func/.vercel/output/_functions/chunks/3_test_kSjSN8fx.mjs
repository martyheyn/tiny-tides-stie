/* empty css                         */
import { c as createComponent, r as renderTemplate, m as maybeRenderHead, u as unescapeHTML } from './astro/server_CyvEsQJY.mjs';
import 'kleur/colors';
import 'clsx';

const html = "<p class=\"text-base\">\nErin from Tiny Tides came to our home to do a full assessment to help our little one with breastfeeding and gas. Home visits are so convenient! She assessed my daughter from head to toe and was able to teach me some easy exercises and massages to do with her to improve feeding. She even took videos of me practicing the exercises for me to refer back to and sent them to me via email along with a full assessment report. It was SO helpful. We are already seeing improvements. Tiny Tides also has a free tummy time group for infants, which I found really helpful during my parental leave. We learned all the tummy time basics, and it allowed me to socialize with other parents who had infants at a similar stage.\n</p>";

				const frontmatter = {"id":"google-review-3","userName":"Taylor","numReviews":2,"sincePost":"1 week","link":"https://maps.app.goo.gl/seSzpV1Ff7n543d86"};
				const file = "/Users/martyheyn/Documents/projects/tiny-tides/tiny-tides-site/src/pages/testamonials/3_test.md";
				const url = "/testamonials/3_test";
				function rawContent() {
					return "\n<p class=\"text-base\">\nErin from Tiny Tides came to our home to do a full assessment to help our little one with breastfeeding and gas. Home visits are so convenient! She assessed my daughter from head to toe and was able to teach me some easy exercises and massages to do with her to improve feeding. She even took videos of me practicing the exercises for me to refer back to and sent them to me via email along with a full assessment report. It was SO helpful. We are already seeing improvements. Tiny Tides also has a free tummy time group for infants, which I found really helpful during my parental leave. We learned all the tummy time basics, and it allowed me to socialize with other parents who had infants at a similar stage.\n</p>\n";
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
