/* empty css                         */
import { c as createComponent, m as maybeRenderHead, u as unescapeHTML, r as renderTemplate } from './astro/server_C5DwWSlw.mjs';
import 'kleur/colors';
import 'clsx';

const html = () => "<p>Includes:</p>\n<ul class=\"ml-2\">\n    <li class=\"flex gap-x-2 items-start\">\n        <div class=\"min-w-[8px] w-2 h-2 bg-[#282082] rounded-full mt-3\"></div>\n        <p>Thorough review of pregnancy and birth history</p>\n    </li>\n    <li class=\"flex gap-x-2 items-start\"> <div class=\"min-w-[8px] w-2 h-2 bg-[#282082] rounded-full mt-3\"></div> <p>Assessment of breast or bottle feeding</p></li>\n    <li class=\"flex gap-x-2 items-start\"> <div class=\"min-w-[8px] w-2 h-2 bg-[#282082] rounded-full mt-3\"></div> <p>Holistic, whole body assessment of your baby’s feeding skills, oral motor skills, and general development</p></li>\n    <li class=\"flex gap-x-2 items-start\"> <div class=\"min-w-[8px] w-2 h-2 bg-[#282082] rounded-full mt-3\"></div> <p>Problem solving and trouble shooting any challenges with feeding</p></li>\n    <li class=\"flex gap-x-2 items-start\"> <div class=\"min-w-[8px] w-2 h-2 bg-[#282082] rounded-full mt-3\"></div> <p>Identifying underlying cause of reflux, gas, and other digestive symptoms</p></li>\n    <li class=\"flex gap-x-2 items-start\"> <div class=\"min-w-[8px] w-2 h-2 bg-[#282082] rounded-full mt-3\"></div> <p>Written summary and recommendations to support feeding at home</p></li>\n</ul>";

				const frontmatter = {"title":"Initial Evaluation","id":"evaluation","duration":"60 - 90 minutes","price":"$200","pubDate":"2024-10-05T00:00:00.000Z","author":"Tiny Tides Brah","tags":["astro","Initial Infant Feeding/Development Evaluation","services"]};
				const file = "/Users/martyheyn/Documents/projects/tiny-tides/tiny-tides-site/src/pages/services/2_evaluation.md";
				const url = "/services/2_evaluation";
				function rawContent() {
					return "   \n                           \n                \n                           \n             \n                   \n                         \n                                                                            \n   \n\nIncludes:\n\n<ul class=\"ml-2\">\n    <li class=\"flex gap-x-2 items-start\">\n        <div class=\"min-w-[8px] w-2 h-2 bg-[#282082] rounded-full mt-3\"></div>\n        <p>Thorough review of pregnancy and birth history</p>\n    </li>\n    <li class=\"flex gap-x-2 items-start\"> <div class=\"min-w-[8px] w-2 h-2 bg-[#282082] rounded-full mt-3\"></div> <p>Assessment of breast or bottle feeding</p></li>\n    <li class=\"flex gap-x-2 items-start\"> <div class=\"min-w-[8px] w-2 h-2 bg-[#282082] rounded-full mt-3\"></div> <p>Holistic, whole body assessment of your baby’s feeding skills, oral motor skills, and general development</p></li>\n    <li class=\"flex gap-x-2 items-start\"> <div class=\"min-w-[8px] w-2 h-2 bg-[#282082] rounded-full mt-3\"></div> <p>Problem solving and trouble shooting any challenges with feeding</p></li>\n    <li class=\"flex gap-x-2 items-start\"> <div class=\"min-w-[8px] w-2 h-2 bg-[#282082] rounded-full mt-3\"></div> <p>Identifying underlying cause of reflux, gas, and other digestive symptoms</p></li>\n    <li class=\"flex gap-x-2 items-start\"> <div class=\"min-w-[8px] w-2 h-2 bg-[#282082] rounded-full mt-3\"></div> <p>Written summary and recommendations to support feeding at home</p></li>\n</ul>\n";
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
