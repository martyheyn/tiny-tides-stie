import { p as push, s as stringify, b as bind_props, a as pop } from './_@astro-renderers_DX37PFz5.mjs';
/* empty css                           */
import { e as escape_html } from './escaping_CBnpiEl5.mjs';

/**
 * `<div translate={false}>` should be rendered as `<div translate="no">` and _not_
 * `<div translate="false">`, which is equivalent to `<div translate="yes">`. There
 * may be other odd cases that need to be added to this list in future
 * @type {Record<string, Map<any, string>>}
 */
const replacements = {
	translate: new Map([
		[true, 'yes'],
		[false, 'no']
	])
};

/**
 * @template V
 * @param {string} name
 * @param {V} value
 * @param {boolean} [is_boolean]
 * @returns {string}
 */
function attr(name, value, is_boolean = false) {
	if (value == null || (!value && is_boolean) || (value === '' && name === 'class')) return '';
	const normalized = (name in replacements && replacements[name].get(value)) || value;
	const assignment = is_boolean ? '' : `="${escape_html(normalized, true)}"`;
	return ` ${name}${assignment}`;
}

// Store the references to globals in case someone tries to monkey patch these, causing the below
// to de-opt (this occurs often when using popular extensions).

/**
 * @template V
 * @param {V} value
 * @param {V | (() => V)} fallback
 * @param {boolean} [lazy]
 * @returns {V}
 */
function fallback(value, fallback, lazy = false) {
	return value === undefined
		? lazy
			? /** @type {() => V} */ (fallback)()
			: /** @type {V} */ (fallback)
		: value;
}

function ContactForm($$payload, $$props) {
	push();

	let homepage = fallback($$props["homepage"], false);
	let name = "";
	let phone = "";
	let email = "";
	let birthDate = "";
	let message = "";

	let monthAhead = new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString().split("T")[0];

	$$payload.out += `<div${attr("class", `w-full flex flex-col items-center justify-center h-full gap-y-4 px-4 md:px-8 py-6 rounded-lg ${homepage ? '' : 'border border-black/20'}`)}><div class="w-full md:max-w-md"><form class="flex flex-col gap-3"><div class="flex justify-end items-center"><span class="text-black text-xs italic -mb-2">* All fields required</span></div> `;

	{
		$$payload.out += "<!--[!-->";
	}

	$$payload.out += `<!--]--> `;

	{
		$$payload.out += "<!--[!-->";
	}

	$$payload.out += `<!--]--> <div class="flex flex-col sm:flex-row gap-4"><label for="name" class="block text-sm font-semibold text-gray-800 flex-1"><span class="pl-[2px">Name</span> <input required id="name" name="name" type="text" placeholder="Name"${attr("value", name)} class="mt-[2px] py-2 text-black !bg-[#fcfeff] indent-2 border focus:outline-none focus:border-blue-300 w-full rounded-md transition duration-150 ease-in-out svelte-anrqs7"></label> <label for="phone" class="block text-sm font-semibold text-gray-800 flex-1"><span class="pl-[2px]">Phone</span> <input required id="phone" name="phone" type="tel"${attr("value", phone)} placeholder="(410) 555-5555" class="mt-[2px] py-2 text-black !bg-[#fcfeff] indent-2 border focus:outline-none focus:border-blue-300 w-full rounded-md transition duration-150 ease-in-out svelte-anrqs7"></label></div> <div class="flex flex-col sm:flex-row md:flex-col lg:flex-row gap-4"><label for="email" class="block text-sm font-semibold text-gray-800 flex-1"><span class="pl-[2px]">Email</span> <input required id="email" name="email" type="email" placeholder="Email"${attr("value", email)} class="mt-[2px] py-2 text-black !bg-[#fcfeff] indent-2 border focus:outline-none focus:border-blue-300 w-full rounded-md transition duration-150 ease-in-out svelte-anrqs7"></label> <label for="birthDate" class="block text-sm font-semibold text-gray-800 flex-1"><span class="pl-[2px]">Patient Birth Date</span> <input required id="birthDate" name="birthDate" type="date" min="2018-01-01"${attr("max", monthAhead)}${attr("value", birthDate)}${attr("class", `${stringify(`mt-[2px] py-2 text-black !bg-[#fcfeff] px-2 border focus:outline-none focus:border-blue-300
             w-full rounded-md transition duration-150 ease-in-out ${'text-gray-400'}`)} svelte-anrqs7`)}></label></div> <div><label for="hearAboutUs" class="block text-sm font-semibold text-gray-800"><span class="pl-[2px]">How did you hear about us?</span> <select required id="hearAboutUs" name="hearAboutUs" class="mt-[2px] py-2 text-black !bg-[#fcfeff] indent-2 border focus:outline-none focus:border-blue-300 w-full rounded-md transition duration-150 ease-in-out"><option value="facebook">Facebook</option><option value="instagram">Instagram</option><option value="google">Google</option><option value="friend-family">Friend or Family</option><option value="tummy-time">Tummy Time!</option><option value="flyer">Flyer</option><option value="referral">Referral</option><option value="other">Other</option></select></label></div> `;

	{
		$$payload.out += "<!--[!-->";
	}

	$$payload.out += `<!--]--> `;

	{
		$$payload.out += "<!--[!-->";
	}

	$$payload.out += `<!--]--> <div><label for="location" class="block text-sm font-semibold text-gray-800"><span class="pl-[2px]">Where do you live?</span> <select required id="location" name="location" class="mt-[2px] py-2 text-black !bg-[#fcfeff] indent-2 border focus:outline-none focus:border-blue-300 w-full rounded-md transition duration-150 ease-in-out"><option value="Fed Hill">Fed Hill</option><option value="Locust Point">Locust Point</option><option value="Canton">Canton</option><option value="Fells Point">Fells Point</option><option value="Roland Park">Roland Park</option><option value="Hampden">Hampden</option><option value="Columbia">Columbia</option><option value="Towson">Towson</option><option value="Annapolis">Annapolis</option><option value="other">Other</option></select></label></div> `;

	{
		$$payload.out += "<!--[!-->";
	}

	$$payload.out += `<!--]--> <div><label for="message" class="block text-sm font-semibold text-gray-800"><span class="pl-[2px]">Message</span> <textarea required rows="5" id="message" name="message" placeholder="Leave a short description of what you need help with." class="mt-[2px] py-2 text-black px-2 !bg-[#fcfeff] border focus:outline-none focus:border-blue-300 w-full rounded-md transition duration-150 ease-in-out">`;

	const $$body = escape_html(message);

	if ($$body) {
		$$payload.out += `${$$body}`;
	}

	$$payload.out += `</textarea></label></div> <div class="flex justify-center sm:justify-end items-center"><button${attr("class", `bg-[#85c0c0] hover:bg-[#639696] cursor-pointer px-6 py-2 transition-all duration-300 ease-in-out rounded-md text-white`)} type="submit">Submit</button></div></form></div></div>`;
	bind_props($$props, { homepage });
	pop();
}

export { ContactForm as C, attr as a };
