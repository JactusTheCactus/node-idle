<div class="listingblock">
<div class="title">Idle Game</div>
<div class="content">
<pre class="highlightjs highlight"><code class="language-js hljs" data-lang="js">process.stdin.setRawMode(true);
process.stdin.setEncoding('utf8');
const keyCallbacks: Record&lt;string, Function[]&gt; = {}
process.stdin.on("data", (key: string) =&gt; {
	if (keyCallbacks[key]) {
		keyCallbacks[key].forEach(cb =&gt; cb(key))
	}
})
function wait(t: number) {
	return new Promise(resolve =&gt; setTimeout(resolve, t * 1000))
}
const onKey = (targetKey: string | number, callback: Function) =&gt; {
	if (!keyCallbacks[targetKey]) keyCallbacks[targetKey] = []
	keyCallbacks[targetKey].push(callback)
	return () =&gt; keyCallbacks[targetKey] = keyCallbacks[targetKey].filter(cb =&gt; cb !== callback)
}
const format = Intl.NumberFormat('en-CA', {
	minimumFractionDigits: 2,
	maximumFractionDigits: 2,
	useGrouping: true
})
function fmt(n: number): string {
	return format.format(n)
}
const title = "Idle Game"
class State {
	run: boolean
	keys: Array&lt;string | number&gt;
	bank: number
	job: boolean
	constructor() {
		this.run = true
		this.keys = []
		this.bank = 0
		this.job = false
	}
	quit() {
		this.run = false
	}
	newKey(key: string | number) {
		if (!this.keys.includes(String(key))) {
			this.keys.push(String(key))
		}
	}
}
class Collector {
	name: string
	lvl: number
	income: number
	price: number
	constructor(name: string, income: number, price: number) {
		this.name = name
		this.lvl = 1
		this.income = income
		this.price = price
	}
	get cost() {
		return this.price ** (this.lvl - 1)
	}
	get gain() {
		return this.income ** (this.lvl - 1)
	}
}
function main() {
	const currency: string = String.fromCodePoint(0x00A4)
	const game = new State()
	const income: Collector[] = [
		new Collector("Pocket-Change", 1.5, 1.5)
	];
	(async () =&gt; {
		console.clear()
		console.log(`Welcome to "${title}"!`)
		await wait(3)
		while (game.run) {
			console.clear()
			switch (true) {
				case /\d/.test(String(game.keys[0])):
					if (!game.job) {
						game.job = true
						game.keys[0] = Number(game.keys[0])
						if (game.keys[0] &lt; income.length) {
							const n = income.at(game.keys[0])
							if (game.bank &gt;= n.cost) {
								console.log(`${fmt(game.bank)} - ${fmt(n.cost)}`)
								n.lvl++
								game.bank -= n.cost
							}
						}
					}
					break
				default:
					switch (game.keys[0]) {
						case "q":
							game.quit()
							break
					}
					break
			}
			game.job = false
			game.keys.shift()
			onKey("q", (k: string) =&gt; game.newKey(k))
			income.forEach((_, i) =&gt; {
				onKey(String(i + 1).replace(/\d*(\d)/, "$1"), () =&gt; game.newKey(String(i)))
			})
			console.log(`${currency}${fmt(game.bank)}`)
			income.forEach((n, i) =&gt; {
				console.log([
					`\t+${currency}${fmt(n.gain)}`,
					`[${i + 1}]`,
					`(-${currency}${fmt(n.cost)})`,
					`${n.name}`,
					`lvl. ${n.lvl}`
				].join(" "))
				game.bank += n.gain
			})
			await wait(1)
		}
		process.stdin.setRawMode(false);
		process.stdin.pause();
		process.exit(0);
	})()
}
main()</code></pre>
</div>
</div>