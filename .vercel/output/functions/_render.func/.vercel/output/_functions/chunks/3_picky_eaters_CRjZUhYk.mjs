/* empty css                         */
import { c as createComponent, r as renderTemplate, m as maybeRenderHead, u as unescapeHTML } from './astro/server_D3OzqXDD.mjs';
import 'kleur/colors';
import 'clsx';

const html = "<p><span class=\"font-semibold bg-blue-600/10\">Do mealtimes feel like a constant negotiation or a source of stress for your family?</span> Maybe your child sticks to a handful of foods, refuses new textures, or struggles to sit at the table. Our service focuses on transforming these mealtime challenges into opportunities for growth.</p>\n<p>Using a responsive, child-led approach, we explore sensory and behavioral barriers to eating, introducing gentle strategies to expand your child’s palate. These sessions are designed to make mealtimes more relaxed and enjoyable while ensuring your child builds a healthy relationship with food. The result? A happier, more adventurous eater and a calmer dining experience for the whole family!</p>";

				const frontmatter = {"title":"Transition to Solids","pubDate":"2024-10-05T00:00:00.000Z","description":"Lactation service brief description","author":"Tiny Tides Brah","tags":["astro","Transition to Solids","services"]};
				const file = "/Users/martyheyn/Documents/projects/tiny-tides-site/src/pages/services/3_picky_eaters.md";
				const url = "/services/3_picky_eaters";
				function rawContent() {
					return "\n<span class=\" font-semibold bg-blue-600/10\">Do mealtimes feel like a constant negotiation or a source of stress for your family?</span> Maybe your child sticks to a handful of foods, refuses new textures, or struggles to sit at the table. Our service focuses on transforming these mealtime challenges into opportunities for growth.\n\nUsing a responsive, child-led approach, we explore sensory and behavioral barriers to eating, introducing gentle strategies to expand your child’s palate. These sessions are designed to make mealtimes more relaxed and enjoyable while ensuring your child builds a healthy relationship with food. The result? A happier, more adventurous eater and a calmer dining experience for the whole family!\n";
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
