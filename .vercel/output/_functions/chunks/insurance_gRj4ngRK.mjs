/* empty css                         */
import { c as createComponent, m as maybeRenderHead, u as unescapeHTML, r as renderTemplate } from './astro/server_BEGASLii.mjs';
import 'kleur/colors';
import 'clsx';

const html = () => "<p>Tiny Tides Therapy is an out-of-network clinic and each session is paid for at time of service via debit/credit card, FSA (flexible spending account) or HSA (health savings account) card. While all services provided by Tiny Tides Therapy are covered under out-of-network benefits by insurance, Tiny Tides Therapy does not guarantee reimbursement by insurance companies.</p>";

				const frontmatter = {"title":"Insurance FAQ","pubDate":"2024-10-05T00:00:00.000Z","author":"Tiny Tides Brah","question":"Do you take Insurance?","tags":["astro","insurance","faqs"]};
				const file = "/Users/martyheyn/Documents/projects/tiny-tides/tiny-tides-site/src/pages/faqs/insurance.md";
				const url = "/faqs/insurance";
				function rawContent() {
					return "   \n                      \n                   \n                         \n                                  \n                                    \n   \n\nTiny Tides Therapy is an out-of-network clinic and each session is paid for at time of service via debit/credit card, FSA (flexible spending account) or HSA (health savings account) card. While all services provided by Tiny Tides Therapy are covered under out-of-network benefits by insurance, Tiny Tides Therapy does not guarantee reimbursement by insurance companies.\n";
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
