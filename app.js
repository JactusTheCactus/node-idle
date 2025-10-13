process.stdin.setRawMode(true);
process.stdin.setEncoding('utf8');
const keyCallbacks = {};
process.stdin.on("data", (key) => {
    if (keyCallbacks[key]) {
        keyCallbacks[key].forEach(cb => cb(key));
    }
});
function wait(t) {
    return new Promise(resolve => setTimeout(resolve, t * 1000));
}
const onKey = (targetKey, callback) => {
    if (!keyCallbacks[targetKey])
        keyCallbacks[targetKey] = [];
    keyCallbacks[targetKey].push(callback);
    return () => keyCallbacks[targetKey] = keyCallbacks[targetKey].filter(cb => cb !== callback);
};
const format = Intl.NumberFormat('en-CA', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    useGrouping: true
});
function fmt(n) {
    return format
        .format(n);
}
const title = "game_title";
const currency = String.fromCodePoint(0x00A4);
const state = {
    run: true,
    key: "",
    bank: 0
};
const income = [
    {
        name: "Pocket-Change",
        lvl: 1,
        income: 1.5
    }
];
(async () => {
    console.clear();
    console.log(`Welcome to "${title}"!`);
    await wait(3);
    while (state.run) {
        console.clear();
        switch (true) {
            case /[0-9]/.test(String(state.key)):
                console.log(state.key);
                state.key = Number(state.key);
                if (state.key < income.length) {
                    console.log(state.key);
                    income.at(state.key).lvl++;
                }
                break;
            default:
                switch (state.key) {
                    case "q":
                        state.run = false;
                        break;
                }
                break;
        }
        state.key = "";
        onKey("q", (k) => state.key = k);
        income.forEach((_, i) => {
            onKey(i, () => state.key = i + 1);
        });
        console.log(`${currency}${fmt(state.bank)}`);
        income.forEach(i => {
            const gain = i.income ** (i.lvl - 1);
            console.log(`\t+${currency}${fmt(gain)} (${i.name} lvl. ${i.lvl})`);
            state.bank += gain;
        });
        await wait(1);
    }
    process.stdin.setRawMode(false);
    process.stdin.pause();
    process.exit(0);
})();
