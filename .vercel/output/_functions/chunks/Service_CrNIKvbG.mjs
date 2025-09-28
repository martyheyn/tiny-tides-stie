import { c as createComponent, a as createAstro, m as maybeRenderHead, d as addAttribute, e as renderSlot, r as renderTemplate } from './astro/server_BEGASLii.mjs';
import 'kleur/colors';
import 'clsx';

const $$Astro = createAstro();
const $$Service = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Service;
  const { title, id, img } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="flex flex-col gap-y-6 lg:flex-row lg:gap-x-12 bg-[#ecf7f7] shadow-lg border border-black/50 rounded-md p-6
     transition-all duration-300 ease-in-out hover:scale-[1.002]"${addAttribute(id, "id")}> <div class="lg:w-1/2 flex flex-col gap-y-6"> <a href="/contact"> <h4 class="text-4xl w-fit hover:scale-[1.01] hover:shadow-sm transition-all duration-300 ease-in-out"> <span class="straight_underline z-10"> ${title} </span> </h4> </a> <div class="flex flex-col gap-y-4 h-full justify-start text-xl mt-2 md:mt-0"> ${renderSlot($$result, $$slots["default"])} </div> </div> <div class="lg:w-1/2 flex justify-center"> ${img && renderTemplate`<img class="max-w-[425px] w-full"${addAttribute(img, "src")}${addAttribute(`${title}, occupational therapy, lactation, infant feeding`, "alt")}>`} </div> </div>`;
}, "/Users/martyheyn/Documents/projects/tiny-tides/tiny-tides-site/src/components/Service.astro", void 0);

export { $$Service as $ };
