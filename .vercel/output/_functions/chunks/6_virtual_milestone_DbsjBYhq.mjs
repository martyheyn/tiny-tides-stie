/* empty css                         */
import { c as createComponent, m as maybeRenderHead, u as unescapeHTML, r as renderTemplate } from './astro/server_C5DwWSlw.mjs';
import 'kleur/colors';
import 'clsx';

const html = () => "<p>A convenient, online session to assess your child’s developmental progress. We’ll review upcoming milestones, address any concerns, and provide guidance on activities to incorporate to support the next wave of your baby’s development.</p>";

				const frontmatter = {"title":"Wave Watch - Virtual Milestone Checkup","id":"virtual-milestone-heckup","duration":"30 - 45 minutes","price":"$50","pubDate":"2024-10-05T00:00:00.000Z","author":"Tiny Tides Brah","tags":["astro","virtual milestone checkup","services"]};
				const file = "/Users/martyheyn/Documents/projects/tiny-tides/tiny-tides-site/src/pages/services/6_virtual_milestone.md";
				const url = "/services/6_virtual_milestone";
				function rawContent() {
					return "   \n                                               \n                              \n                           \n            \n                   \n                         \n                                                        \n   \n\nA convenient, online session to assess your child’s developmental progress. We’ll review upcoming milestones, address any concerns, and provide guidance on activities to incorporate to support the next wave of your baby’s development.\n";
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

const __vite_glob_0_5 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
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

export { __vite_glob_0_5 as _ };
