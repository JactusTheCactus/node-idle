<div class="listingblock">
<div class="title">tsconfig.yml</div>
<div class="content">
<pre class="highlight"><code class="language-yml" data-lang="yml">_config:
  es: &amp;es ESNext
compilerOptions:
  target: *es
  module: *es
  moduleResolution: Bundler
  strict: false
  esModuleInterop: false
  forceConsistentCasingInFileNames: true</code></pre>
</div>
</div>
<div class="listingblock">
<div class="title">tsconfig.json</div>
<div class="content">
<pre class="highlight"><code class="language-json" data-lang="json">{
  "_config": {
    "es": "ESNext"
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