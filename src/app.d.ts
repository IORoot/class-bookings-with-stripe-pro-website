/// <reference types="@sveltejs/kit" />

declare module '*.md' {
	const content: string;
	export default content;
}
