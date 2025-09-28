/* empty css                         */
import { c as createComponent, m as maybeRenderHead, u as unescapeHTML, r as renderTemplate } from './astro/server_BEGASLii.mjs';
import 'kleur/colors';
import 'clsx';

const html = () => "<p>After your initial evaluation, you can set up individual sessions in your home where Erin will provide an individualized treatment plan based on your childs needs.</p>\n<p>Includes:</p>\n<ul class=\"ml-2\">\n    <li class=\"flex gap-x-2 items-start\"> \n        <div class=\"min-w-[8px] w-2 h-2 bg-[#282082] rounded-full mt-3\"></div>\n        <p>Individualized treatment plan based on your childs needs</p>\n    </li>\n</ul>";

				const frontmatter = {"title":"Follow up Session","id":"follow-up-session","duration":"60 - 75 minutes","price":"$125","pubDate":"2024-10-05T00:00:00.000Z","author":"Tiny Tides Brah","tags":["astro","Follow up session","services"]};
				const file = "/Users/martyheyn/Documents/projects/tiny-tides/tiny-tides-site/src/pages/services/3_follow_up.md";
				const url = "/services/3_follow_up";
				function rawContent() {
					return "   \n                          \n                       \n                           \n             \n                   \n                         \n                                                \n   \n\nAfter your initial evaluation, you can set up individual sessions in your home where Erin will provide an individualized treatment plan based on your childs needs.\n\nIncludes:\n\n<ul class=\"ml-2\">\n    <li class=\"flex gap-x-2 items-start\"> \n        <div class=\"min-w-[8px] w-2 h-2 bg-[#282082] rounded-full mt-3\"></div>\n        <p>Individualized treatment plan based on your childs needs</p>\n    </li>\n</ul>\n";
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
