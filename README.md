```typescript
const config = {
	game: {
		title: "untitled_idle_game"
	}
}
function fmt(input: string | any[] | { [key: string]: any }) {
	if (input === null) {
		return
	} else if (typeof input === "string") {
		return input.replace(/^(.*?)$/g, "&lt;$1&gt;")
	} else if (Array.isArray(input)) {
		return input.map(i => fmt(i))
	} else if (typeof input === "object") {
		return Object.fromEntries(
			Object
				.entries(input)
				.map(([k, v]) => [k, fmt(v)])
		)
	} else {
		return input
	}
}
export { 
	config,
	fmt 
}
```