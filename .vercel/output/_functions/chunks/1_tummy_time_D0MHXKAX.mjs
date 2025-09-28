/* empty css                         */
import { c as createComponent, m as maybeRenderHead, u as unescapeHTML, r as renderTemplate } from './astro/server_BEGASLii.mjs';
import 'kleur/colors';
import 'clsx';

const html = () => "<p>Tummy time is an essential part of your baby’s development. It helps to strengthen your baby’s neck, back, and shoulder muscles\nand promotes motor skills. Our groups are designed to provide a fun and engaging environment for your little one to explore and\ngrow. For babies from birth to pre-crawling, come join a tummy time group for a supportive environment for babies and caregivers\nto learn the basics of tummy time while connecting and socializing with other families.</p>\n<p>Its FREE!!</p>\n<p class=\"font-semibold\">\n    Every Monday 9:30 - 10:30am, alternating between: <br>\n    Latrobe Park in Locust Point, 1627 E Fort Ave, Baltimore, MD 21230 <br>\n    Riverside Park in Fed Hill, 301 E Randall St, Baltimore, MD 21230\n</p>\n<a href=\"https://tally.so/r/3j8M6a\" target=\"_blank\">\n<button class=\"font-semibold text-base px-6 py-3 transition-all duration-300 ease-in-out cursor-pointer rounded-md hover:scale-[1.02] shadow-lg hover:shadow-2xl text-black bg-[#9ddcdc] hover:bg-[#90e8e8]\">\nClick Here to Sign Up\n</button>\n</a><a></a>";

				const frontmatter = {"title":"Tummy Time Group","id":"tummy-time","img":"https://dkbi9cj3nodif.cloudfront.net/tummy-time_flyer_.png","duration":"1 hour","price":"FREE","pubDate":"2024-10-05T00:00:00.000Z","author":"Tiny Tides Brah","tags":["astro","tummy-time","services"]};
				const file = "/Users/martyheyn/Documents/projects/tiny-tides/tiny-tides-site/src/pages/groups/1_tummy_time.md";
				const url = "/groups/1_tummy_time";
				function rawContent() {
					return "   \n                         \n                \n                                                                 \n                  \n             \n                   \n                         \n                                         \n   \n\nTummy time is an essential part of your baby’s development. It helps to strengthen your baby’s neck, back, and shoulder muscles\nand promotes motor skills. Our groups are designed to provide a fun and engaging environment for your little one to explore and\ngrow. For babies from birth to pre-crawling, come join a tummy time group for a supportive environment for babies and caregivers\nto learn the basics of tummy time while connecting and socializing with other families.\n\nIts FREE!!\n\n<p class=\"font-semibold\">\n    Every Monday 9:30 - 10:30am, alternating between: <br/>\n    Latrobe Park in Locust Point, 1627 E Fort Ave, Baltimore, MD 21230 <br/>\n    Riverside Park in Fed Hill, 301 E Randall St, Baltimore, MD 21230\n</p>\n\n<a href=\"https://tally.so/r/3j8M6a\" target=\"_blank\">\n<button\nclass=\"font-semibold text-base px-6 py-3 transition-all duration-300 ease-in-out cursor-pointer rounded-md hover:scale-[1.02] shadow-lg hover:shadow-2xl text-black bg-[#9ddcdc] hover:bg-[#90e8e8]\">\nClick Here to Sign Up\n</button>\n<a>\n";
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
