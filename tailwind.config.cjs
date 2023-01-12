/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		colors: {
			transparent: 'transparent',
			charade: {
				DEFAULT: '#2E3440',
				50: '#9CA5B8',
				100: '#939DB1',
				200: '#818DA5',
				300: '#6F7D98',
				400: '#616E87',
				500: '#545F75',
				600: '#485164',
				700: '#3B4252',
				800: '#2E3440',
				900: '#21262E'
			},
			snow: {
				100: '#D8DEE9',
				200: '#E5E9F0',
				300: '#ECEFF4'
			},
			frost: {
				100: '#8FBCBB',
				200: '#88C0D0',
				300: '#81A1C1',
				400: '#5E81AC'
			},
			aurora: {
				100: '#BF616A',
				200: '#D08770',
				300: '#EBCB8B',
				400: '#A3BE8C',
				500: '#B48EAD'
			}
		}
	},
	plugins: []
};
