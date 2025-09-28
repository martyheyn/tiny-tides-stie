/* empty css                         */
import { c as createComponent, m as maybeRenderHead, u as unescapeHTML, r as renderTemplate } from './astro/server_C5DwWSlw.mjs';
import 'kleur/colors';
import 'clsx';

const html = () => "<p>Join us for Tiny Movers Playgroup— a fun, supportive group for babies ages 6–18 months and their caregivers! Led by a pediatric occupational therapist and infant feeding &#x26; development specialist, each session includes sensory-rich play, milestone-focused activities, and opportunities to connect with other families. Come explore, learn, and grow in a welcoming, baby-friendly environment!</p>\n<p>Next Group: <span class=\"font-bold\">TBD</span></p>\n<!-- <a href=\"\">\n<button\nclass=\"font-semibold text-base px-6 py-3 transition-all duration-300 ease-in-out cursor-pointer rounded-md hover:scale-[1.02] shadow-lg hover:shadow-2xl text-black bg-[#9ddcdc] hover:bg-[#90e8e8]\">\nClick Here to Sign Up\n</button>\n<a> -->";

				const frontmatter = {"title":"Tiny Movers Playgroup","id":"tummy-time","duration":"1 hour","price":"FREE","pubDate":"2024-10-05T00:00:00.000Z","author":"Tiny Tides Brah","tags":["astro","tummy-time","services"]};
				const file = "/Users/martyheyn/Documents/projects/tiny-tides/tiny-tides-site/src/pages/groups/3_tiny_movers.md";
				const url = "/groups/3_tiny_movers";
				function rawContent() {
					return "   \n                              \n                \n                  \n             \n                   \n                         \n                                         \n   \n\nJoin us for Tiny Movers Playgroup— a fun, supportive group for babies ages 6–18 months and their caregivers! Led by a pediatric occupational therapist and infant feeding & development specialist, each session includes sensory-rich play, milestone-focused activities, and opportunities to connect with other families. Come explore, learn, and grow in a welcoming, baby-friendly environment!\n\nNext Group: <span class=\"font-bold\">TBD</span>\n\n<!-- <a href=\"\">\n<button\nclass=\"font-semibold text-base px-6 py-3 transition-all duration-300 ease-in-out cursor-pointer rounded-md hover:scale-[1.02] shadow-lg hover:shadow-2xl text-black bg-[#9ddcdc] hover:bg-[#90e8e8]\">\nClick Here to Sign Up\n</button>\n<a> -->\n";
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

const __vite_glob_0_2 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
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

export { __vite_glob_0_2 as _ };
