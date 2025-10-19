const config = fmt({
    game: {
        title: "%%untitled_idle_game",
        test: "{{ game.title }}"
    }
});
function fmt(input) {
    if (input === null) {
        return;
    }
    else if (typeof input === "string") {
        return input.replace(/^%%(.*?)$/g, "<code>&lt;$1&gt;</code>");
    }
    else if (Array.isArray(input)) {
        return input.map(i => fmt(i));
    }
    else if (typeof input === "object") {
        return Object.fromEntries(Object
            .entries(input)
            .map(([k, v]) => [k, fmt(v)]));
    }
    else {
        return input;
    }
}
export { config, fmt };
