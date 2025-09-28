/* empty css                         */
import { c as createComponent, r as renderTemplate, m as maybeRenderHead, u as unescapeHTML } from './astro/server_CyvEsQJY.mjs';
import 'kleur/colors';
import 'clsx';

const html = "<p><span class=\"font-semibold bg-blue-600/10\">Breastfeeding is not easy!</span> There are so many factors that influence successful feeding. <span class=\"font-semibold bg-blue-600/10\">As a certified lactation counselor and pediatric feeding specialist, Erin can help determine what may be impacting your breastfeeding experience.</span> Erin’s personalized approach addresses latch, positioning, oral motor skills, maternal factors, digestion, body tension, and any other factors that may be affecting feeding. With Erin’s guidance and support, you will feel confident with your feeding plan and goals!</p>";

				const frontmatter = {"title":"Lactation Counseling","id":"lactation-consulting","pubDate":"2024-10-05T00:00:00.000Z","description":"Lactation service brief description","author":"Tiny Tides Brah","tags":["astro","lactation counseling","services"]};
				const file = "/Users/martyheyn/Documents/projects/tiny-tides/tiny-tides-site/src/pages/what-we-treat/1_lactation_service.md";
				const url = "/what-we-treat/1_lactation_service";
				function rawContent() {
					return "\n<span class=\" font-semibold bg-blue-600/10\">Breastfeeding is not easy!</span> There are so many factors that influence successful feeding. <span class=\" font-semibold bg-blue-600/10\">As a certified lactation counselor and pediatric feeding specialist, Erin can help determine what may be impacting your breastfeeding experience.</span> Erin’s personalized approach addresses latch, positioning, oral motor skills, maternal factors, digestion, body tension, and any other factors that may be affecting feeding. With Erin’s guidance and support, you will feel confident with your feeding plan and goals!\n";
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

const __vite_glob_0_0 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
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

export { __vite_glob_0_0 as _ };
