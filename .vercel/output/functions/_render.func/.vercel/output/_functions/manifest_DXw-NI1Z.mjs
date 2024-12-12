import 'cookie';
import 'kleur/colors';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_Bcp1VkiK.mjs';
import 'es-module-lexer';
import { d as decodeKey } from './chunks/astro/server_D3OzqXDD.mjs';
import 'clsx';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///Users/martyheyn/Documents/projects/tiny-tides-site/","adapterName":"@astrojs/vercel/serverless","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.DzEfYrSA.js"}],"styles":[{"type":"external","src":"/_astro/about.D2DeBGNQ.css"},{"type":"external","src":"/_astro/about.Do4eSa31.css"}],"routeData":{"route":"/about","isIndex":false,"type":"page","pattern":"^\\/about\\/?$","segments":[[{"content":"about","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/about.astro","pathname":"/about","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/email","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/email\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"email","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/email.ts","pathname":"/api/email","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.DzEfYrSA.js"}],"styles":[{"type":"external","src":"/_astro/about.D2DeBGNQ.css"},{"type":"external","src":"/_astro/about.Do4eSa31.css"},{"type":"inline","content":"input.svelte-anrqs7:-webkit-autofill{box-shadow:0 0 0 1000px #fcfeff inset!important;-webkit-text-fill-color:black!important;-webkit-transition:background-color .5s ease-in-out,color .5s ease-in-out;transition:background-color .5s ease-in-out,color .5s ease-in-out}\n"}],"routeData":{"route":"/contact","isIndex":false,"type":"page","pattern":"^\\/contact\\/?$","segments":[[{"content":"contact","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/contact.astro","pathname":"/contact","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/about.D2DeBGNQ.css"}],"routeData":{"route":"/faqs/ages","isIndex":false,"type":"page","pattern":"^\\/faqs\\/ages\\/?$","segments":[[{"content":"faqs","dynamic":false,"spread":false}],[{"content":"ages","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/faqs/ages.md","pathname":"/faqs/ages","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/about.D2DeBGNQ.css"}],"routeData":{"route":"/faqs/evaluation","isIndex":false,"type":"page","pattern":"^\\/faqs\\/evaluation\\/?$","segments":[[{"content":"faqs","dynamic":false,"spread":false}],[{"content":"evaluation","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/faqs/evaluation.md","pathname":"/faqs/evaluation","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/about.D2DeBGNQ.css"}],"routeData":{"route":"/faqs/first_visit","isIndex":false,"type":"page","pattern":"^\\/faqs\\/first_visit\\/?$","segments":[[{"content":"faqs","dynamic":false,"spread":false}],[{"content":"first_visit","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/faqs/first_visit.md","pathname":"/faqs/first_visit","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/about.D2DeBGNQ.css"}],"routeData":{"route":"/faqs/insurance","isIndex":false,"type":"page","pattern":"^\\/faqs\\/insurance\\/?$","segments":[[{"content":"faqs","dynamic":false,"spread":false}],[{"content":"insurance","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/faqs/insurance.md","pathname":"/faqs/insurance","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/about.D2DeBGNQ.css"}],"routeData":{"route":"/faqs/referral","isIndex":false,"type":"page","pattern":"^\\/faqs\\/referral\\/?$","segments":[[{"content":"faqs","dynamic":false,"spread":false}],[{"content":"referral","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/faqs/referral.md","pathname":"/faqs/referral","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/about.D2DeBGNQ.css"}],"routeData":{"route":"/faqs/virtual","isIndex":false,"type":"page","pattern":"^\\/faqs\\/virtual\\/?$","segments":[[{"content":"faqs","dynamic":false,"spread":false}],[{"content":"virtual","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/faqs/virtual.md","pathname":"/faqs/virtual","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.DzEfYrSA.js"}],"styles":[{"type":"external","src":"/_astro/about.D2DeBGNQ.css"},{"type":"external","src":"/_astro/about.Do4eSa31.css"}],"routeData":{"route":"/faqs","isIndex":false,"type":"page","pattern":"^\\/faqs\\/?$","segments":[[{"content":"faqs","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/faqs.astro","pathname":"/faqs","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/about.D2DeBGNQ.css"}],"routeData":{"route":"/services/1_developmental_milestones","isIndex":false,"type":"page","pattern":"^\\/services\\/1_developmental_milestones\\/?$","segments":[[{"content":"services","dynamic":false,"spread":false}],[{"content":"1_developmental_milestones","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/services/1_developmental_milestones.md","pathname":"/services/1_developmental_milestones","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/about.D2DeBGNQ.css"}],"routeData":{"route":"/services/2_lactation_service","isIndex":false,"type":"page","pattern":"^\\/services\\/2_lactation_service\\/?$","segments":[[{"content":"services","dynamic":false,"spread":false}],[{"content":"2_lactation_service","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/services/2_lactation_service.md","pathname":"/services/2_lactation_service","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/about.D2DeBGNQ.css"}],"routeData":{"route":"/services/3_picky_eaters","isIndex":false,"type":"page","pattern":"^\\/services\\/3_picky_eaters\\/?$","segments":[[{"content":"services","dynamic":false,"spread":false}],[{"content":"3_picky_eaters","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/services/3_picky_eaters.md","pathname":"/services/3_picky_eaters","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.DCKmF8uI.js"}],"styles":[{"type":"external","src":"/_astro/about.D2DeBGNQ.css"},{"type":"external","src":"/_astro/about.Do4eSa31.css"},{"type":"external","src":"/_astro/services.DK3oEaqC.css"}],"routeData":{"route":"/services","isIndex":false,"type":"page","pattern":"^\\/services\\/?$","segments":[[{"content":"services","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/services.astro","pathname":"/services","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.BH72FMEG.js"}],"styles":[{"type":"external","src":"/_astro/about.D2DeBGNQ.css"},{"type":"external","src":"/_astro/about.Do4eSa31.css"},{"type":"inline","content":".service-landing-item[data-astro-cid-dbzxxhcy]{opacity:0;transform:translateY(44px);transition:all .3s ease-in-out}.service-landing-item[data-astro-cid-dbzxxhcy].in-view{opacity:1;transform:translateY(0);transition:all .3s ease-in-out}button[data-astro-cid-vnzlvqnm]{background-color:var(--color);color:var(--textColor)}button[data-astro-cid-vnzlvqnm]:hover{background-color:var(--hoverColor)}path[data-astro-cid-5baqliqx]{fill:var(--fill)}.step-item[data-astro-cid-5vkjc2f4]{opacity:0;transform:translate(-44px);transition:all .3s ease-in-out var(--delay)}@media screen and (max-width: 640px){.step-item[data-astro-cid-5vkjc2f4]{transition:all .3s ease-in-out}}.step-item[data-astro-cid-5vkjc2f4].in-view{opacity:1;transform:translate(0)}.step-arrow-1[data-astro-cid-j7pv25f6]{opacity:0;transform:translate(-44px);transition:all .3s ease-in-out .45s}.step-arrow-2[data-astro-cid-j7pv25f6]{opacity:0;transform:translate(-44px);transition:all .3s ease-in-out .75s}.step-arrow-1[data-astro-cid-j7pv25f6].in-view,.step-arrow-2[data-astro-cid-j7pv25f6].in-view{opacity:1;transform:translate(0)}\ninput.svelte-anrqs7:-webkit-autofill{box-shadow:0 0 0 1000px #fcfeff inset!important;-webkit-text-fill-color:black!important;-webkit-transition:background-color .5s ease-in-out,color .5s ease-in-out;transition:background-color .5s ease-in-out,color .5s ease-in-out}\n"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/Users/martyheyn/Documents/projects/tiny-tides-site/src/pages/about.astro",{"propagation":"none","containsHead":true}],["/Users/martyheyn/Documents/projects/tiny-tides-site/src/pages/contact.astro",{"propagation":"none","containsHead":true}],["/Users/martyheyn/Documents/projects/tiny-tides-site/src/pages/faqs.astro",{"propagation":"none","containsHead":true}],["/Users/martyheyn/Documents/projects/tiny-tides-site/src/pages/index.astro",{"propagation":"none","containsHead":true}],["/Users/martyheyn/Documents/projects/tiny-tides-site/src/pages/services.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(o,t)=>{let i=async()=>{await(await o())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000noop-middleware":"_noop-middleware.mjs","\u0000@astro-page:src/pages/faqs/ages@_@md":"pages/faqs/ages.astro.mjs","\u0000@astro-page:src/pages/faqs/evaluation@_@md":"pages/faqs/evaluation.astro.mjs","\u0000@astro-page:src/pages/faqs/first_visit@_@md":"pages/faqs/first_visit.astro.mjs","\u0000@astro-page:src/pages/faqs/insurance@_@md":"pages/faqs/insurance.astro.mjs","\u0000@astro-page:src/pages/faqs/referral@_@md":"pages/faqs/referral.astro.mjs","\u0000@astro-page:src/pages/faqs/virtual@_@md":"pages/faqs/virtual.astro.mjs","\u0000@astro-page:src/pages/services/1_developmental_milestones@_@md":"pages/services/1_developmental_milestones.astro.mjs","\u0000@astro-page:src/pages/services/2_lactation_service@_@md":"pages/services/2_lactation_service.astro.mjs","\u0000@astro-page:src/pages/services/3_picky_eaters@_@md":"pages/services/3_picky_eaters.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astro-page:src/pages/about@_@astro":"pages/about.astro.mjs","\u0000@astro-page:src/pages/contact@_@astro":"pages/contact.astro.mjs","\u0000@astro-page:src/pages/api/email@_@ts":"pages/api/email.astro.mjs","\u0000@astro-page:src/pages/faqs@_@astro":"pages/faqs.astro.mjs","\u0000@astro-page:src/pages/services@_@astro":"pages/services.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astro-renderers":"renderers.mjs","/Users/martyheyn/Documents/projects/tiny-tides-site/node_modules/astro/dist/env/setup.js":"chunks/astro/env-setup_Cr6XTFvb.mjs","\u0000@astrojs-manifest":"manifest_DXw-NI1Z.mjs","/astro/hoisted.js?q=1":"_astro/hoisted.DCKmF8uI.js","@astrojs/svelte/client.js":"_astro/client.svelte.BzMAYCS2.js","/Users/martyheyn/Documents/projects/tiny-tides-site/src/components/Faq.svelte":"_astro/Faq.BpUjbf5X.js","/astro/hoisted.js?q=0":"_astro/hoisted.BH72FMEG.js","/Users/martyheyn/Documents/projects/tiny-tides-site/src/components/ContactForm.svelte":"_astro/ContactForm.D0QmP-IT.js","/astro/hoisted.js?q=2":"_astro/hoisted.DzEfYrSA.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/erin_smile_baby.gbndlVYa.jpeg","/_astro/bmore_inner_harbor.B1s3mdw5.jpg","/_astro/erin_tummy_baby.BU5aXqS_.jpeg","/_astro/toddlers-playing.efizLE3b.png","/_astro/erin_baby_bounce.D4IzqIUX.jpeg","/_astro/baby_breastfeeding.cOfR3-3L.png","/_astro/baby-eating.Ds5u5oIw.png","/_astro/breast_feeding.Bay4itUa.jpg","/_astro/baby_seat_feeding.DN-XrRh1.jpg","/_astro/wave-birdeye-view.DrMAv8sC.mp4","/_astro/about.D2DeBGNQ.css","/_astro/about.Do4eSa31.css","/_astro/services.DK3oEaqC.css","/favicon.svg","/_astro/ContactForm.D0QmP-IT.js","/_astro/Faq.BpUjbf5X.js","/_astro/client.svelte.BzMAYCS2.js","/_astro/contact.DbUwZAfM.css","/_astro/hoisted.BH72FMEG.js","/_astro/hoisted.DCKmF8uI.js","/_astro/hoisted.DzEfYrSA.js","/_astro/index.CRwXqkFU.js","/_astro/proxy.BUpS6nU2.js","/_astro/render.D1SLWvYd.js"],"buildFormat":"directory","checkOrigin":false,"serverIslandNameMap":[],"key":"ehrl1B2zqMMyPxt2KlMztMnmDqEq7wbCmBHPXRydA84=","experimentalEnvGetSecretEnabled":false});

export { manifest };
