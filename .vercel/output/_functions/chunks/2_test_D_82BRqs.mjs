/* empty css                         */
import { c as createComponent, m as maybeRenderHead, u as unescapeHTML, r as renderTemplate } from './astro/server_C5DwWSlw.mjs';
import 'kleur/colors';
import 'clsx';

const html = () => "<p class=\"text-base\">\nErin is a phenomenal therapist. She is holistic, parent/child centered and inclusive. As a baby therapist myself, I have a high bar when it comes to other therapists. There is nobody else I would recommend if your child is having feeding difficulties or just wanted some support on your baby’s solids journey. She is communicative and caring with the best interest of the child in mind. Erin goes above and beyond each time and there is nobody I would trust more!\n</p>";

				const frontmatter = {"id":"google-review-2","userName":"Erica","numReviews":72,"sincePost":"1 month","link":"https://maps.app.goo.gl/zbPhYq1NTxBo36CMA"};
				const file = "/Users/martyheyn/Documents/projects/tiny-tides/tiny-tides-site/src/pages/testamonials/2_test.md";
				const url = "/testamonials/2_test";
				function rawContent() {
					return "   \n                     \n                 \n              \n                    \n                                                 \n   \n\n<p class=\"text-base\">\nErin is a phenomenal therapist. She is holistic, parent/child centered and inclusive. As a baby therapist myself, I have a high bar when it comes to other therapists. There is nobody else I would recommend if your child is having feeding difficulties or just wanted some support on your baby’s solids journey. She is communicative and caring with the best interest of the child in mind. Erin goes above and beyond each time and there is nobody I would trust more!\n</p>\n";
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
