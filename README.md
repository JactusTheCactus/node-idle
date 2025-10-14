<div class="listingblock">
<div class="title">tsconfig.yml</div>
<div class="content">
<pre class="highlight"><code class="language-yml" data-lang="yml">_config:
  es: &amp;es ESNext
  t: &amp;t true
  f: &amp;f false
compilerOptions:
  target: *es
  module: *es
  moduleResolution: Bundler
  strict: *f
  esModuleInterop: *f
  forceConsistentCasingInFileNames: *t</code></pre>
</div>
</div>
<div class="listingblock">
<div class="title">tsconfig.json</div>
<div class="content">
<pre class="highlight"><code class="language-json" data-lang="json">{
  "_config": {
    "es": "ESNext",
    "t": true,
    "f": false
  },
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "strict": false,
    "esModuleInterop": false,
    "forceConsistentCasingInFileNames": true
  }
}</code></pre>
</div>
</div>