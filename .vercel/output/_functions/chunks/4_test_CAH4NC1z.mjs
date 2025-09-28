/* empty css                         */
import { c as createComponent, m as maybeRenderHead, u as unescapeHTML, r as renderTemplate } from './astro/server_BEGASLii.mjs';
import 'kleur/colors';
import 'clsx';

const html = () => "<p class=\"text-base\">\nErin was amazing working with my 3 month old! She taught us so many skills to help with mobility, eventually crawling, and walking. She also supported us when staring solids which can be so scary but she was a wonderful resource. I can’t recommend her enough!!\n</p>";

				const frontmatter = {"id":"google-review-4","userName":"Madeline","numReviews":3,"sincePost":"1 month","link":"https://maps.app.goo.gl/1W5aBU1L8mHayn1cA"};
				const file = "/Users/martyheyn/Documents/projects/tiny-tides/tiny-tides-site/src/pages/testamonials/4_test.md";
				const url = "/testamonials/4_test";
				function rawContent() {
					return "   \n                     \n                    \n             \n                    \n                                                 \n   \n\n<p class=\"text-base\">\nErin was amazing working with my 3 month old! She taught us so many skills to help with mobility, eventually crawling, and walking. She also supported us when staring solids which can be so scary but she was a wonderful resource. I can’t recommend her enough!!\n</p>\n";
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

const __vite_glob_0_3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
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

export { __vite_glob_0_3 as _ };
