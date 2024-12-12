/* empty css                         */
import { c as createComponent, r as renderTemplate, m as maybeRenderHead, u as unescapeHTML } from './astro/server_D3OzqXDD.mjs';
import 'kleur/colors';
import 'clsx';

const html = "<p>While some insurance providers may require a referral, it is not always necessary. We recommend checking with your insurance company or contacting us for guidance.</p>";

				const frontmatter = {"title":"Referral FAQ","pubDate":"2024-10-05T00:00:00.000Z","author":"Tiny Tides Brah","question":"Do I need a referral from my pediatrician to work with you?","tags":["astro","referral","faqs"]};
				const file = "/Users/martyheyn/Documents/projects/tiny-tides-site/src/pages/faqs/referral.md";
				const url = "/faqs/referral";
				function rawContent() {
					return "\nWhile some insurance providers may require a referral, it is not always necessary. We recommend checking with your insurance company or contacting us for guidance.\n";
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

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
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

export { _page as _ };
