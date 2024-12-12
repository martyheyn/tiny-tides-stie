/* empty css                                 */
import { c as createComponent, r as renderTemplate, a as renderComponent, m as maybeRenderHead } from '../chunks/astro/server_D3OzqXDD.mjs';
import 'kleur/colors';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_DIrOHDpL.mjs';
import { $ as $$Image } from '../chunks/_astro_assets_D_Cyaxof.mjs';
export { r as renderers } from '../chunks/_@astro-renderers_B5H1KkQD.mjs';

const ErinSmileBaby = new Proxy({"src":"/_astro/erin_smile_baby.gbndlVYa.jpeg","width":1125,"height":1479,"format":"jpg","orientation":1}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/martyheyn/Documents/projects/tiny-tides-site/src/assets/images/erin/erin_smile_baby.jpeg";
							}
							
							return target[name];
						}
					});

const $$About = createComponent(($$result, $$props, $$slots) => {
  const pageTitle = "About";
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "pageTitle": pageTitle }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="w-full h-full bg-primary pt-14 sm:pt-[76px]"> <div class="pt-4 sm:py-4 md:py-12 px-4 sm:px-8 flex justify-center transition-all duration-300 ease-in-out"> <div class="max-w-6xl grid grid-cols-1 md:grid-cols-8 gap-y-12 md:gap-y-0 md:gap-x-4 lg:gap-x-12 transition-all duration-300 ease-in-out"> <div class="w-full flex justify-center items-start md:col-span-3"> ${renderComponent($$result2, "Image", $$Image, { "src": ErinSmileBaby, "alt": "Toddlers playing", "class": "w-full max-w-md rounded-md object-cover object-center shadow-lg md:min-h-[675px]" })} <!-- max-h-[500px] lg:min-w-[500px] lg:h-[450px] --> </div> <div class="flex flex-col gap-y-8 w-full h-full justify-center px-2 pb-12 md:col-span-5"> <h1 class="text-7xl">Meet Erin</h1> <p>
My journey to becoming a specialist in infant feeding began during
            my occupational therapy studies. One day, my professor shared a
            story about a caregiver who cried tears of joy because their baby
            finally latched and fed comfortably for the first time. My immediate
            thought was, "This is incredible! I want to help families like
            that!" I’ve always been inspired by the opportunity to make such a
            profound difference in someone’s life. After graduating, I pursued
            additional training in infant feeding and lactation support,
            refining my skills through certifications and hands-on experience.
            The trust families place in me to address sensitive feeding
            challenges, from latch issues to bottle refusal, is the driving
            force behind my work. I spend my days openly discussing feeding,
            sensory needs, and family dynamics to empower caregivers with the
            tools and knowledge they need to succeed. These struggles are
            common, but they’re not something you have to endure alone—together,
            we can create a path toward a calmer, happier feeding journey.
</p> <p>
I currently live in Baltimore county with my partner. Outside of the
            clinic, you will find me doing yoga, trying a new Baltimore
            restaurant or at a local coffee shop.
</p> </div> </div> </div> </div> ` })}`;
}, "/Users/martyheyn/Documents/projects/tiny-tides-site/src/pages/about.astro", void 0);

const $$file = "/Users/martyheyn/Documents/projects/tiny-tides-site/src/pages/about.astro";
const $$url = "/about";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$About,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
