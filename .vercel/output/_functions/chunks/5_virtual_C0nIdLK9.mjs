/* empty css                         */
import { c as createComponent, m as maybeRenderHead, u as unescapeHTML, r as renderTemplate } from './astro/server_C5DwWSlw.mjs';
import 'kleur/colors';
import 'clsx';

const html = () => "<p>After your initial evaluation, you can set up individual sessions virtually, where Erin will provide an individualized treatment plan based on your childs needs and coach you through some strategies!</p>";

				const frontmatter = {"title":"Virtual Appointment","id":"Virtual","duration":"30 - 45 minutes","price":"$100","pubDate":"2024-10-05T00:00:00.000Z","author":"Tiny Tides Brah","tags":["astro","Follow up session","services"]};
				const file = "/Users/martyheyn/Documents/projects/tiny-tides/tiny-tides-site/src/pages/services/5_virtual.md";
				const url = "/services/5_virtual";
				function rawContent() {
					return "   \n                            \n             \n                           \n             \n                   \n                         \n                                                \n   \n\nAfter your initial evaluation, you can set up individual sessions virtually, where Erin will provide an individualized treatment plan based on your childs needs and coach you through some strategies!\n";
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
