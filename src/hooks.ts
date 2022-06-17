import cookie from 'cookie';

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
	const cookies = cookie.parse(event.request.headers.get('cookie') || '');

	const state = JSON.parse(cookies.state || JSON.stringify({}));

	event.locals = { state };

	const response = await resolve(event);
	response.headers.set('x-custom-header', 'potato');

	return response;
}
