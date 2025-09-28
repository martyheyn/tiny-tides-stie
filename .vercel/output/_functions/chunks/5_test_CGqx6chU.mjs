/* empty css                         */
import { c as createComponent, m as maybeRenderHead, u as unescapeHTML, r as renderTemplate } from './astro/server_BEGASLii.mjs';
import 'kleur/colors';
import 'clsx';

const html = () => "<p class=\"text-base\">\nI’ve been bringing my almost 5 month old to Erin’s tummy time group in Latrobe and Riverside parks for a couple months now. She is so knowledgeable and it’s amazing of her to accommodate the group setting for free. We’ve met other local parents and babies as well which has been great! We also participated in the virtual Intro to Solids course she holds every month or so, and now feel fully equipped to start solids soon! If we ever have any issues with our baby’s motor or feeding development, I would definitely seek out one on one help with Erin in the future. Check out Tiny Tides if you have a baby and live on the south Baltimore peninsula.\n</p>";

				const frontmatter = {"id":"google-review-5","userName":"Taylor","numReviews":4,"sincePost":"1 month","link":"https://maps.app.goo.gl/FcVxxWAEdv97p1sY7"};
				const file = "/Users/martyheyn/Documents/projects/tiny-tides/tiny-tides-site/src/pages/testamonials/5_test.md";
				const url = "/testamonials/5_test";
				function rawContent() {
					return "   \n                     \n                  \n             \n                    \n                                                 \n   \n\n<p class=\"text-base\">\nI’ve been bringing my almost 5 month old to Erin’s tummy time group in Latrobe and Riverside parks for a couple months now. She is so knowledgeable and it’s amazing of her to accommodate the group setting for free. We’ve met other local parents and babies as well which has been great! We also participated in the virtual Intro to Solids course she holds every month or so, and now feel fully equipped to start solids soon! If we ever have any issues with our baby’s motor or feeding development, I would definitely seek out one on one help with Erin in the future. Check out Tiny Tides if you have a baby and live on the south Baltimore peninsula.\n</p>\n";
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

const __vite_glob_0_4 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
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

export { __vite_glob_0_4 as _ };
