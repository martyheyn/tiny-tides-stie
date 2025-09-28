import { r as renderers } from './chunks/_@astro-renderers_DX37PFz5.mjs';
import { c as createExports } from './chunks/entrypoint_BUUlQ1QC.mjs';
import { manifest } from './manifest_Cvb-bI2e.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/about.astro.mjs');
const _page2 = () => import('./pages/api/email.astro.mjs');
const _page3 = () => import('./pages/contact.astro.mjs');
const _page4 = () => import('./pages/faqs/ages.astro.mjs');
const _page5 = () => import('./pages/faqs/evaluation.astro.mjs');
const _page6 = () => import('./pages/faqs/first_visit.astro.mjs');
const _page7 = () => import('./pages/faqs/insurance.astro.mjs');
const _page8 = () => import('./pages/faqs/virtual.astro.mjs');
const _page9 = () => import('./pages/faqs.astro.mjs');
const _page10 = () => import('./pages/groups/1_tummy_time.astro.mjs');
const _page11 = () => import('./pages/groups/2_intro_solids.astro.mjs');
const _page12 = () => import('./pages/groups/3_tiny_movers.astro.mjs');
const _page13 = () => import('./pages/groups.astro.mjs');
const _page14 = () => import('./pages/services/1_discovery.astro.mjs');
const _page15 = () => import('./pages/services/2_evaluation.astro.mjs');
const _page16 = () => import('./pages/services/3_follow_up.astro.mjs');
const _page17 = () => import('./pages/services/4_baby_bootcamp.astro.mjs');
const _page18 = () => import('./pages/services/5_virtual.astro.mjs');
const _page19 = () => import('./pages/services/6_virtual_milestone.astro.mjs');
const _page20 = () => import('./pages/services.astro.mjs');
const _page21 = () => import('./pages/testamonials/1_test.astro.mjs');
const _page22 = () => import('./pages/testamonials/2_test.astro.mjs');
const _page23 = () => import('./pages/testamonials/3_test.astro.mjs');
const _page24 = () => import('./pages/testamonials/4_test.astro.mjs');
const _page25 = () => import('./pages/testamonials/5_test.astro.mjs');
const _page26 = () => import('./pages/what-we-treat/1_lactation_service.astro.mjs');
const _page27 = () => import('./pages/what-we-treat/2_occupational_therapy.astro.mjs');
const _page28 = () => import('./pages/what-we-treat/3_picky_eaters.astro.mjs');
const _page29 = () => import('./pages/what-we-treat.astro.mjs');
const _page30 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/about.astro", _page1],
    ["src/pages/api/email.ts", _page2],
    ["src/pages/contact.astro", _page3],
    ["src/pages/faqs/ages.md", _page4],
    ["src/pages/faqs/evaluation.md", _page5],
    ["src/pages/faqs/first_visit.md", _page6],
    ["src/pages/faqs/insurance.md", _page7],
    ["src/pages/faqs/virtual.md", _page8],
    ["src/pages/faqs.astro", _page9],
    ["src/pages/groups/1_tummy_time.md", _page10],
    ["src/pages/groups/2_intro_solids.md", _page11],
    ["src/pages/groups/3_tiny_movers.md", _page12],
    ["src/pages/groups.astro", _page13],
    ["src/pages/services/1_discovery.md", _page14],
    ["src/pages/services/2_evaluation.md", _page15],
    ["src/pages/services/3_follow_up.md", _page16],
    ["src/pages/services/4_baby_bootcamp.md", _page17],
    ["src/pages/services/5_virtual.md", _page18],
    ["src/pages/services/6_virtual_milestone.md", _page19],
    ["src/pages/services.astro", _page20],
    ["src/pages/testamonials/1_test.md", _page21],
    ["src/pages/testamonials/2_test.md", _page22],
    ["src/pages/testamonials/3_test.md", _page23],
    ["src/pages/testamonials/4_test.md", _page24],
    ["src/pages/testamonials/5_test.md", _page25],
    ["src/pages/what-we-treat/1_lactation_service.md", _page26],
    ["src/pages/what-we-treat/2_occupational_therapy.md", _page27],
    ["src/pages/what-we-treat/3_picky_eaters.md", _page28],
    ["src/pages/what-we-treat.astro", _page29],
    ["src/pages/index.astro", _page30]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./_noop-actions.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "0dcb2fb5-6e30-4fc6-b06f-36bc11217def",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;

export { __astrojsSsrVirtualEntry as default, pageMap };
