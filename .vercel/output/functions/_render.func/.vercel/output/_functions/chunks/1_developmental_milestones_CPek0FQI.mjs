/* empty css                         */
import { c as createComponent, r as renderTemplate, m as maybeRenderHead, u as unescapeHTML } from './astro/server_D3OzqXDD.mjs';
import 'kleur/colors';
import 'clsx';

const html = "<p>You’ve noticed your toddler isn’t walking, talking, or engaging like other kids their age, and it’s hard not to worry. Maybe they struggle with balance, coordination, or completing simple tasks you think they should have mastered.</p>\n<p><span class=\"font-semibold bg-blue-600/10\">Our developmental milestone service identifies where your child may need support and creates a plan to help them build critical skills.</span> Through engaging, play-based activities tailored to your child’s unique needs, we foster progress in areas like motor skills, communication, and self-care. These sessions not only help your child catch up but also boost their confidence and independence. With this service, you’ll see your toddler thrive at their own pace.</p>";

				const frontmatter = {"title":"Developmental Milestones","pubDate":"2024-10-05T00:00:00.000Z","description":"Lactation service brief description","author":"Tiny Tides Brah","tags":["astro","developmental milestones","services"]};
				const file = "/Users/martyheyn/Documents/projects/tiny-tides-site/src/pages/services/1_developmental_milestones.md";
				const url = "/services/1_developmental_milestones";
				function rawContent() {
					return "\nYou’ve noticed your toddler isn’t walking, talking, or engaging like other kids their age, and it’s hard not to worry. Maybe they struggle with balance, coordination, or completing simple tasks you think they should have mastered.\n\n<span class=\" font-semibold bg-blue-600/10\">Our developmental milestone service identifies where your child may need support and creates a plan to help them build critical skills.</span> Through engaging, play-based activities tailored to your child’s unique needs, we foster progress in areas like motor skills, communication, and self-care. These sessions not only help your child catch up but also boost their confidence and independence. With this service, you’ll see your toddler thrive at their own pace.\n";
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
