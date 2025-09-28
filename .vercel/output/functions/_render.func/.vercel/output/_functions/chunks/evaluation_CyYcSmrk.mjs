/* empty css                         */
import { c as createComponent, r as renderTemplate, m as maybeRenderHead, u as unescapeHTML } from './astro/server_CyvEsQJY.mjs';
import 'kleur/colors';
import 'clsx';

const html = "<p>The initial evaluation includes a detailed discussion of your concerns, observation of your child’s skills, and a collaborative plan to address your goals.</p>";

				const frontmatter = {"title":"Evaluation FAQ","pubDate":"2024-10-05T00:00:00.000Z","author":"Tiny Tides Brah","question":"What happens during the initial evaluation?","tags":["astro","evaluation","faqs"]};
				const file = "/Users/martyheyn/Documents/projects/tiny-tides/tiny-tides-site/src/pages/faqs/evaluation.md";
				const url = "/faqs/evaluation";
				function rawContent() {
					return "\nThe initial evaluation includes a detailed discussion of your concerns, observation of your child’s skills, and a collaborative plan to address your goals.\n";
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
