/* empty css                         */
import { c as createComponent, r as renderTemplate, m as maybeRenderHead, u as unescapeHTML } from './astro/server_CyvEsQJY.mjs';
import 'kleur/colors';
import 'clsx';

const html = "<p>Includes:</p>\n<ul class=\"ml-2\">\n    <li class=\"flex gap-x-2 items-start transition-all duration-200 ease-out\"> \n        <div class=\"min-w-[8px] w-2 h-2 bg-[#282082] rounded-full mt-3\"></div>\n        <p>Erin will come to your house for up to 3 hours to provide support with feeding, diaper changes, sleep, wake windows</p>\n    </li>\n    <li class=\"flex gap-x-2 items-start transition-all duration-200 ease-out\"> \n        <div class=\"min-w-[8px] w-2 h-2 mt-2.5 bg-[#282082] rounded-full\"></div>\n        <p>Individualized activity plan to support development</p>\n    </li>\n</ul>";

				const frontmatter = {"title":"Baby Bootcamp","id":"baby-bootcamp","duration":"Up to 3 hours","price":"$300","pubDate":"2024-10-05T00:00:00.000Z","author":"Tiny Tides Brah","tags":["astro","baby-bootcamp","services"]};
				const file = "/Users/martyheyn/Documents/projects/tiny-tides/tiny-tides-site/src/pages/services/4_baby_bootcamp.md";
				const url = "/services/4_baby_bootcamp";
				function rawContent() {
					return "\nIncludes:\n\n<ul class=\"ml-2\">\n    <li class=\"flex gap-x-2 items-start transition-all duration-200 ease-out\"> \n        <div class=\"min-w-[8px] w-2 h-2 bg-[#282082] rounded-full mt-3\"></div>\n        <p>Erin will come to your house for up to 3 hours to provide support with feeding, diaper changes, sleep, wake windows</p>\n    </li>\n    <li class=\"flex gap-x-2 items-start transition-all duration-200 ease-out\"> \n        <div class=\"min-w-[8px] w-2 h-2 mt-2.5 bg-[#282082] rounded-full\"></div>\n        <p>Individualized activity plan to support development</p>\n    </li>\n</ul>\n";
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
