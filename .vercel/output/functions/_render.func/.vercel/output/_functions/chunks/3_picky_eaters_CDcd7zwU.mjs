/* empty css                         */
import { c as createComponent, r as renderTemplate, m as maybeRenderHead, u as unescapeHTML } from './astro/server_CyvEsQJY.mjs';
import 'kleur/colors';
import 'clsx';

const html = "<p>Is your little one struggling to take a bottle? Getting ready to transition to solid foods? Or maybe they are having a hard time drinking from a straw or open cup! <span class=\"font-semibold bg-blue-600/10\">Using a responsive, child-led approach, we explore sensory and oral factors that may be impacting feeding success, while guiding your family in the right direction!</span> Feeding therapy sessions are designed to support your family’s unique feeding goals and make feeding and mealtime a success!</p>";

				const frontmatter = {"title":"Transition to Solids","id":"transition-to-solids","pubDate":"2024-10-05T00:00:00.000Z","description":"Lactation service brief description","author":"Tiny Tides Brah","tags":["astro","Transition to Solids","services"]};
				const file = "/Users/martyheyn/Documents/projects/tiny-tides/tiny-tides-site/src/pages/what-we-treat/3_picky_eaters.md";
				const url = "/what-we-treat/3_picky_eaters";
				function rawContent() {
					return "\nIs your little one struggling to take a bottle? Getting ready to transition to solid foods? Or maybe they are having a hard time drinking from a straw or open cup! <span class=\" font-semibold bg-blue-600/10\">Using a responsive, child-led approach, we explore sensory and oral factors that may be impacting feeding success, while guiding your family in the right direction!</span> Feeding therapy sessions are designed to support your family’s unique feeding goals and make feeding and mealtime a success!\n";
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
