/* empty css                         */
import { c as createComponent, r as renderTemplate, m as maybeRenderHead, u as unescapeHTML } from './astro/server_D3OzqXDD.mjs';
import 'kleur/colors';
import 'clsx';

const html = "<p>Breastfeeding your baby was <span class=\"font-semibold bg-blue-600/10\">supposed to feel natural</span>, but instead, you’re facing pain, frustration, or struggles with latching. Perhaps your baby seems fussy after feedings, or you’re worried they’re not getting enough to eat.</p>\n<p>Our lactation counseling service is designed to address these challenges head-on. Through a personalized, hands-on approach, <span class=\"font-semibold bg-blue-600/10\">we assess feeding patterns, provide techniques for improving latching, and offer strategies to make feeding more effective and comfortable</span>. This support not only helps your baby get the nutrition they need but also fosters a more peaceful and fulfilling feeding experience for both of you. With our guidance, you’ll feel confident in your ability to nourish your baby.</p>";

				const frontmatter = {"title":"Lactation Counseling","pubDate":"2024-10-05T00:00:00.000Z","description":"Lactation service brief description","author":"Tiny Tides Brah","tags":["astro","lactation counseling","services"]};
				const file = "/Users/martyheyn/Documents/projects/tiny-tides-site/src/pages/services/2_lactation_service.md";
				const url = "/services/2_lactation_service";
				function rawContent() {
					return "\nBreastfeeding your baby was <span class=\" font-semibold bg-blue-600/10\">supposed to feel natural</span>, but instead, you’re facing pain, frustration, or struggles with latching. Perhaps your baby seems fussy after feedings, or you’re worried they’re not getting enough to eat.\n\nOur lactation counseling service is designed to address these challenges head-on. Through a personalized, hands-on approach, <span class=\" font-semibold bg-blue-600/10\">we assess feeding patterns, provide techniques for improving latching, and offer strategies to make feeding more effective and comfortable</span>. This support not only helps your baby get the nutrition they need but also fosters a more peaceful and fulfilling feeding experience for both of you. With our guidance, you’ll feel confident in your ability to nourish your baby.\n";
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
