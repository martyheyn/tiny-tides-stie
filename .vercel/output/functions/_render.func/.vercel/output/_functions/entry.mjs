import { r as renderers } from './chunks/_@astro-renderers_B5H1KkQD.mjs';
import { c as createExports } from './chunks/entrypoint_DFDymUrt.mjs';
import { manifest } from './manifest_DXw-NI1Z.mjs';

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/about.astro.mjs');
const _page2 = () => import('./pages/api/email.astro.mjs');
const _page3 = () => import('./pages/contact.astro.mjs');
const _page4 = () => import('./pages/faqs/ages.astro.mjs');
const _page5 = () => import('./pages/faqs/evaluation.astro.mjs');
const _page6 = () => import('./pages/faqs/first_visit.astro.mjs');
const _page7 = () => import('./pages/faqs/insurance.astro.mjs');
const _page8 = () => import('./pages/faqs/referral.astro.mjs');
const _page9 = () => import('./pages/faqs/virtual.astro.mjs');
const _page10 = () => import('./pages/faqs.astro.mjs');
const _page11 = () => import('./pages/services/1_developmental_milestones.astro.mjs');
const _page12 = () => import('./pages/services/2_lactation_service.astro.mjs');
const _page13 = () => import('./pages/services/3_picky_eaters.astro.mjs');
const _page14 = () => import('./pages/services.astro.mjs');
const _page15 = () => import('./pages/index.astro.mjs');

const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/about.astro", _page1],
    ["src/pages/api/email.ts", _page2],
    ["src/pages/contact.astro", _page3],
    ["src/pages/faqs/ages.md", _page4],
    ["src/pages/faqs/evaluation.md", _page5],
    ["src/pages/faqs/first_visit.md", _page6],
    ["src/pages/faqs/insurance.md", _page7],
    ["src/pages/faqs/referral.md", _page8],
    ["src/pages/faqs/virtual.md", _page9],
    ["src/pages/faqs.astro", _page10],
    ["src/pages/services/1_developmental_milestones.md", _page11],
    ["src/pages/services/2_lactation_service.md", _page12],
    ["src/pages/services/3_picky_eaters.md", _page13],
    ["src/pages/services.astro", _page14],
    ["src/pages/index.astro", _page15]
]);
const serverIslandMap = new Map();
const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "a061b8d9-5155-47ac-b214-3d7146b0345c",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;

export { __astrojsSsrVirtualEntry as default, pageMap };
