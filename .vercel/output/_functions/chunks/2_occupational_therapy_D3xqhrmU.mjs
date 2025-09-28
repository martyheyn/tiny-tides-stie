/* empty css                         */
import { c as createComponent, m as maybeRenderHead, u as unescapeHTML, r as renderTemplate } from './astro/server_BEGASLii.mjs';
import 'kleur/colors';
import 'clsx';

const html = () => "<p>Wondering what pediatric occupational therapy (OT) is and how it helps babies? <span class=\"font-semibold bg-blue-600/10\">Occupational therapy for infants focuses on supporting babies in developing essential skills they need for growth, comfort, and exploration.</span> From building motor skills, easing feeding challenges, to supporting sensory processing and regulation, OT helps babies reach key milestones at their own pace. With gentle, guided activities, Dr. Erin works to boost strength, coordination, regulation, and overall development so babies can make big waves!</p>";

				const frontmatter = {"title":"Occupational Therapy","id":"occupational-therapy","pubDate":"2024-10-05T00:00:00.000Z","description":"Lactation service brief description","author":"Tiny Tides Brah","tags":["astro","occupational therapy","services"]};
				const file = "/Users/martyheyn/Documents/projects/tiny-tides/tiny-tides-site/src/pages/what-we-treat/2_occupational_therapy.md";
				const url = "/what-we-treat/2_occupational_therapy";
				function rawContent() {
					return "   \n                             \n                          \n                   \n                                                  \n                         \n                                                   \n   \n\nWondering what pediatric occupational therapy (OT) is and how it helps babies? <span class=\" font-semibold bg-blue-600/10\">Occupational therapy for infants focuses on supporting babies in developing essential skills they need for growth, comfort, and exploration.</span> From building motor skills, easing feeding challenges, to supporting sensory processing and regulation, OT helps babies reach key milestones at their own pace. With gentle, guided activities, Dr. Erin works to boost strength, coordination, regulation, and overall development so babies can make big waves!\n";
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
