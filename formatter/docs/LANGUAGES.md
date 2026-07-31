# Supported languages

<!-- Derived from `lib/core/languages.js`, which is the source of truth for every
     field below. Change the registry, then regenerate; do not hand-edit this file. -->

The Auric Artisan Formatter recognises **253 languages** across 735 file extensions and 314 exact filenames, and registers itself for 305 VS Code language ids.

| | |
|---|---|
| Languages | **253** |
| Native tier (real parser + printer) | **33** |
| Universal tier (structural engine) | **220** |
| File extensions | 735 |
| Exact filenames | 314 |
| Filename ambiguities resolved | 15 |
| Shebang interpreters | 109 |
| Aliases | 221 |
| VS Code language ids | 305 |
| Families | 36 |
| Grammar profiles | 39 |

---

## The two tiers

Every language sits in exactly one tier. The tier is a promise about how much the
formatter is allowed to change, not a ranking of how much we like the language.

### Native — full parse and reprint

A native language has a real parser and a real printer. The source is parsed to an AST,
the AST is printed to the Wadler-style document IR, and the IR is laid out against your
`printWidth`. That means the output is *reconstructed*, not patched:

- line breaks are chosen, not preserved — a call that fits collapses, one that does not breaks;
- quotes, semicolons, trailing commas, bracket spacing and property quoting are normalised;
- comments are re-attached to the node they belong to;
- formatting is idempotent by construction, and the safety gate proves it on every run.

### Universal — structural, conservative, non-destructive

A universal language is formatted by the structural engine (`lib/languages/universal/engine.js`)
driven by a grammar profile that knows the language's block delimiters, comment forms, string
forms and continuation rules. The engine may change:

- indentation depth and indent character;
- horizontal spacing between tokens, around operators and inside brackets;
- runs of blank lines, trailing whitespace, line endings and the final newline.

It may **never** reorder, insert or delete a non-whitespace token, and it never touches the
interior of a string, heredoc or comment. If the profile cannot make sense of a construct,
the region is passed through byte-for-byte. The safety gate re-lexes both texts and compares
the significant-token streams before anything is written back, so a universal-tier format is
either an improvement in whitespace or a no-op — never a surprise.

A handful of entries (CSV, TSV, diff, `.gitignore`) are universal in name only: their profile
normalises line endings and strips trailing whitespace and stops there, because there is no
structure to impose.

---

## How a file is identified

`forFilename()` answers in this order, and stops at the first hit:

1. **Exact basename** — `Dockerfile`, `CMakeLists.txt`, `go.mod`, `.editorconfig`.
2. **Case-insensitive basename** — `makefile` as well as `Makefile`.
3. **Filename pattern** — `Dockerfile.prod`, `Jenkinsfile.ci`, `.env.production.local`, `Pulumi.dev.yaml`.
4. **Longest extension suffix** — `.d.ts` beats `.ts`, `.blade.php` beats `.php`, `jquery.min.js` is still `.js`.

`forShebang()` covers files with no useful name at all. It understands `#!/usr/bin/env`,
its `-S` split-string form and inline `VAR=value` assignments, and it strips version
suffixes, so `#!/usr/bin/env -S python3.12 -u` and `#!/usr/bin/python2` both resolve to Python.

### Declared ambiguities

Some extensions belong to more than one language and always will. The registry picks the
winner explicitly rather than letting table order decide, and exposes the runners-up through
`alternativesFor(filename)` so a caller can retry with the next candidate.

| Extension | Resolves to | Alternates | Declared |
|---|---|---|---|
| `.cl` | `common-lisp` | `opencl` | yes |
| `.cls` | `latex` | `apex`, `vb` | yes |
| `.conf` | `ini` | `nginx`, `apache`, `caddy` | yes |
| `.d` | `d` | `makefile` | yes |
| `.fs` | `fsharp` | `glsl`, `forth` | yes |
| `.h` | `c` | `cpp`, `objective-c`, `objective-cpp` | yes |
| `.l` | `common-lisp` | `lex` | yes |
| `.ll` | `llvm` | `lex` | yes |
| `.m` | `objective-c` | `matlab`, `octave`, `mercury`, `mathematica` | yes |
| `.ml` | `ocaml` | `sml` | yes |
| `.pl` | `perl` | `prolog` | yes |
| `.pp` | `puppet` | `pascal`, `delphi` | yes |
| `.sql` | `sql` | `plsql`, `tsql`, `mysql`, `postgres`, `sqlite`, `hive`, `sparksql` | yes |
| `.ts` | `typescript` | `typoscript` | yes |
| `.v` | `verilog` | `coq`, `v` | yes |

Everything else is unambiguous: `.rs` is Rust, `.ts` is TypeScript (never TypoScript),
`.py` is Python, and there is no heuristic that can change its mind halfway through a repo.

---

## Native-tier languages

| Language | Id | Parsers | Extensions |
|---|---|---|---|
| JavaScript | `javascript` | `babel`, `acorn`, `espree`, `meriyah` | `.js` `.cjs` `.mjs` `.es` `.es6` `.pac` _+1_ |
| JavaScript React | `jsx` | `babel`, `acorn` | `.jsx` |
| TypeScript | `typescript` | `typescript`, `babel-ts` | `.ts` `.mts` `.cts` `.d.ts` `.d.mts` `.d.cts` |
| TypeScript React | `tsx` | `typescript`, `babel-ts` | `.tsx` `.mtsx` |
| JSON | `json` | `json` | `.json` `.geojson` `.topojson` `.jsonld` `.importmap` `.har` _+1_ |
| JSON5 | `json5` | `json5` | `.json5` |
| JSON with Comments | `jsonc` | `jsonc`, `json` | `.jsonc` |
| JSON.stringify | `json-stringify` | `json-stringify` | `package.json` `package-lock.json` `bower.json` `.babelrc.json` |
| CSS | `css` | `css` | `.css` `.wxss` |
| SCSS | `scss` | `scss`, `css` | `.scss` |
| Less | `less` | `less`, `css` | `.less` |
| PostCSS | `postcss` | `postcss`, `css` | `.pcss` `.postcss` `.sss` |
| HTML | `html` | `html` | `.html` `.htm` `.xhtml` `.xht` `.shtml` `.html.hl` _+1_ |
| Vue | `vue` | `vue`, `html` | `.vue` |
| Svelte | `svelte` | `svelte`, `html` | `.svelte` |
| Astro | `astro` | `astro`, `html` | `.astro` |
| XML | `xml` | `xml` | `.xml` `.xsd` `.xsl` `.xslt` `.rss` `.atom` _+18_ |
| SVG | `svg` | `xml` | `.svg` `.svgz` |
| Markdown | `markdown` | `markdown` | `.md` `.markdown` `.mdown` `.mkd` `.mkdn` `.mdwn` _+5_ |
| MDX | `mdx` | `mdx`, `markdown` | `.mdx` |
| Handlebars | `handlebars` | `handlebars`, `glimmer` | `.handlebars` `.hbs` `.hbs.html` |
| YAML | `yaml` | `yaml` | `.yaml` `.yml` `.yaml.tmpl` `.mir` `.reek` `.rviz` _+4_ |
| TOML | `toml` | `toml` | `.toml` `.tml` |
| GraphQL | `graphql` | `graphql` | `.graphql` `.gql` |
| GraphQL SDL | `graphql-schema` | `graphql` | `.graphqls` `.gqls` `.sdl` |
| OpenAPI | `openapi` | `yaml`, `json` | `openapi.yaml` `openapi.yml` `openapi.json` `api.yaml` |
| AsyncAPI | `asyncapi` | `yaml`, `json` | `asyncapi.yaml` `asyncapi.yml` `asyncapi.json` |
| Swagger 2.0 | `swagger` | `yaml`, `json` | `swagger.yaml` `swagger.yml` `swagger.json` |
| RAML | `raml` | `yaml` | `.raml` |
| Docker Compose | `docker-compose` | `yaml` | `docker-compose.yml` `docker-compose.yaml` `docker-compose.override.yml` `docker-compose.override.yaml` `compose.yml` `compose.yaml` |
| Pulumi | `pulumi` | `yaml` | `Pulumi.yaml` `Pulumi.yml` |
| Ansible | `ansible` | `yaml` | `playbook.yml` `playbook.yaml` `site.yml` `site.yaml` `requirements.yml` `inventory.yml` |
| Kubernetes manifest | `kubernetes` | `yaml` | `kustomization.yaml` `kustomization.yml` `kubeconfig` |

---

## Index by family

- [JavaScript family](#javascript-family) — 6 languages
- [JSON & data notation](#json-data-notation) — 9 languages
- [Stylesheets](#stylesheets) — 6 languages
- [Markup & components](#markup-components) — 9 languages
- [Markdown](#markdown) — 2 languages
- [Prose & lightweight markup](#prose-lightweight-markup) — 6 languages
- [Typesetting](#typesetting) — 3 languages
- [Template languages](#template-languages) — 21 languages
- [Data & tabular](#data-tabular) — 8 languages
- [Version control](#version-control) — 6 languages
- [GraphQL](#graphql) — 2 languages
- [Schemas & IDL](#schemas-idl) — 12 languages
- [Databases & queries](#databases-queries) — 12 languages
- [Build systems](#build-systems) — 11 languages
- [Infrastructure as code](#infrastructure-as-code) — 14 languages
- [Server & service config](#server-service-config) — 5 languages
- [Shells & text tools](#shells-text-tools) — 12 languages
- [Python family](#python-family) — 2 languages
- [Systems languages](#systems-languages) — 18 languages
- [JVM languages](#jvm-languages) — 4 languages
- [.NET languages](#net-languages) — 3 languages
- [Scripting languages](#scripting-languages) — 6 languages
- [Functional languages](#functional-languages) — 7 languages
- [Lisp family](#lisp-family) — 8 languages
- [BEAM languages](#beam-languages) — 3 languages
- [Scientific & statistical](#scientific-statistical) — 10 languages
- [Formal methods & logic](#formal-methods-logic) — 10 languages
- [Hardware description](#hardware-description) — 3 languages
- [Shaders & GPU](#shaders-gpu) — 6 languages
- [Smart contracts](#smart-contracts) — 5 languages
- [Enterprise platforms](#enterprise-platforms) — 3 languages
- [Classic & long-lived](#classic-long-lived) — 9 languages
- [Assembly & IR](#assembly-ir) — 4 languages
- [Grammars & generators](#grammars-generators) — 3 languages
- [Diagram languages](#diagram-languages) — 3 languages
- [Test & automation DSLs](#test-automation-dsls) — 2 languages

---

## JavaScript family

_ECMAScript and its typed and compiled-to-JS dialects._

| Language | Id | Extensions | Files | Tier | Comments |
|---|---|---|---|---|---|
| JavaScript | `javascript` | `.js` `.cjs` `.mjs` `.es` `.es6` `.pac` _+1_ | `Jakefile` `jakefile` | **native** | `//` `/* … */` `/** … */`<sup>doc</sup> |
| JavaScript React | `jsx` | `.jsx` | — | **native** | `//` `/* … */` `/** … */`<sup>doc</sup> |
| TypeScript | `typescript` | `.ts` `.mts` `.cts` `.d.ts` `.d.mts` `.d.cts` | — | **native** | `//` `/* … */` `/** … */`<sup>doc</sup> |
| TypeScript React | `tsx` | `.tsx` `.mtsx` | — | **native** | `//` `/* … */` `/** … */`<sup>doc</sup> |
| CoffeeScript | `coffeescript` | `.coffee` `.litcoffee` `.coffee.md` `.iced` | `Cakefile` | universal | `#` `### … ###` |
| LiveScript | `livescript` | `.ls` | `Slakefile` | universal | `#` `/* … */` |

## JSON & data notation

_Object-notation formats with a fixed grammar._

| Language | Id | Extensions | Files | Tier | Comments |
|---|---|---|---|---|---|
| JSON | `json` | `.json` `.geojson` `.topojson` `.jsonld` `.importmap` `.har` _+1_ | `.babelrc` `.jscsrc` `.jslintrc` _+8_ | **native** | _none_ |
| JSON5 | `json5` | `.json5` | — | **native** | `//` `/* … */` |
| JSON with Comments | `jsonc` | `.jsonc` | `tsconfig.json` `jsconfig.json` `devcontainer.json` _+11_ | **native** | `//` `/* … */` |
| JSON.stringify | `json-stringify` | — | `package.json` `package-lock.json` `bower.json` _+1_ | **native** | _none_ |
| JSON Lines | `jsonl` | `.jsonl` `.ndjson` `.jsonlines` | — | universal | _none_ |
| Hjson | `hjson` | `.hjson` | — | universal | `#` `//` `/* … */` |
| EDN | `edn` | `.edn` | — | universal | `;` |
| Rusty Object Notation | `ron` | `.ron` | — | universal | `//` `/* … */` |
| KDL | `kdl` | `.kdl` | — | universal | `//` `/* … */` |

## Stylesheets

_CSS and the preprocessors that compile to it._

| Language | Id | Extensions | Files | Tier | Comments |
|---|---|---|---|---|---|
| CSS | `css` | `.css` `.wxss` | — | **native** | `/* … */` |
| SCSS | `scss` | `.scss` | — | **native** | `//` `/* … */` |
| Less | `less` | `.less` | — | **native** | `//` `/* … */` |
| PostCSS | `postcss` | `.pcss` `.postcss` `.sss` | — | **native** | `//` `/* … */` |
| Sass (indented) | `sass` | `.sass` | — | universal | `//` `/* … */` |
| Stylus | `stylus` | `.styl` `.stylus` | — | universal | `//` `/* … */` |

## Markup & components

_HTML, XML and single-file component formats._

| Language | Id | Extensions | Files | Tier | Comments |
|---|---|---|---|---|---|
| HTML | `html` | `.html` `.htm` `.xhtml` `.xht` `.shtml` `.html.hl` _+1_ | — | **native** | `<!-- … -->` |
| Vue | `vue` | `.vue` | — | **native** | `<!-- … -->` |
| Svelte | `svelte` | `.svelte` | — | **native** | `<!-- … -->` |
| Astro | `astro` | `.astro` | — | **native** | `<!-- … -->` |
| XML | `xml` | `.xml` `.xsd` `.xsl` `.xslt` `.rss` `.atom` _+18_ | `pom.xml` `web.xml` `AndroidManifest.xml` _+4_ | **native** | `<!-- … -->` |
| SVG | `svg` | `.svg` `.svgz` | — | **native** | `<!-- … -->` |
| XAML | `xaml` | `.xaml` `.axaml` `.paml` | — | universal | `<!-- … -->` |
| Document Type Definition | `dtd` | `.dtd` `.ent` `.mod` | — | universal | `<!-- … -->` |
| XQuery | `xquery` | `.xq` `.xqy` `.xquery` `.xqm` `.xql` | — | universal | `(: … :)` |

## Markdown

_Markdown and its JSX-bearing superset._

| Language | Id | Extensions | Files | Tier | Comments |
|---|---|---|---|---|---|
| Markdown | `markdown` | `.md` `.markdown` `.mdown` `.mkd` `.mkdn` `.mdwn` _+5_ | `README` `CHANGELOG` `CONTRIBUTING` _+1_ | **native** | `<!-- … -->` |
| MDX | `mdx` | `.mdx` | — | **native** | `{/* … */}` |

## Prose & lightweight markup

_Human-first document formats with structural markers._

| Language | Id | Extensions | Files | Tier | Comments |
|---|---|---|---|---|---|
| AsciiDoc | `asciidoc` | `.adoc` `.asciidoc` `.asc` | — | universal | `//` `//// … ////` |
| reStructuredText | `restructuredtext` | `.rst` `.rest` `.rst.txt` | — | universal | `..` |
| Org Mode | `org` | `.org` | — | universal | `#` `#+BEGIN_COMMENT … #+END_COMMENT` |
| Textile | `textile` | `.textile` | — | universal | `###.` |
| Creole | `creole` | `.creole` | — | universal | _none_ |
| MediaWiki | `mediawiki` | `.mediawiki` `.wiki` `.wikitext` | — | universal | `<!-- … -->` |

## Typesetting

_TeX-family document languages and their bibliographies._

| Language | Id | Extensions | Files | Tier | Comments |
|---|---|---|---|---|---|
| LaTeX | `latex` | `.tex` `.ltx` `.sty` `.cls` `.dtx` `.ins` _+2_ | — | universal | `%` `\begin{comment} … \end{comment}` |
| BibTeX | `bibtex` | `.bib` `.bibtex` | — | universal | `%` |
| Texinfo | `texinfo` | `.texi` `.texinfo` `.txi` | — | universal | `@c` `@comment` `@ignore … @end ignore` |

## Template languages

_Text templating engines that embed logic in markup._

| Language | Id | Extensions | Files | Tier | Comments |
|---|---|---|---|---|---|
| Handlebars | `handlebars` | `.handlebars` `.hbs` `.hbs.html` | — | **native** | `{{!-- … --}}` |
| Mustache | `mustache` | `.mustache` `.mst` | — | universal | `{{! … }}` |
| Twig | `twig` | `.twig` `.html.twig` `.xml.twig` | — | universal | `{# … #}` |
| Jinja | `jinja` | `.jinja` `.jinja2` `.j2` `.html.j2` `.yaml.j2` | — | universal | `{# … #}` |
| Nunjucks | `nunjucks` | `.njk` `.nunjucks` `.nunjs` | — | universal | `{# … #}` |
| Liquid | `liquid` | `.liquid` | — | universal | `{% comment %} … {% endcomment %}` |
| EJS | `ejs` | `.ejs` | — | universal | `<%# … %>` |
| ERB | `erb` | `.erb` `.rhtml` `.html.erb` `.js.erb` `.css.erb` | — | universal | `<%# … %>` |
| Pug | `pug` | `.pug` | — | universal | `//` `//-` |
| Jade | `jade` | `.jade` | — | universal | `//` `//-` |
| Haml | `haml` | `.haml` `.haml.deface` | — | universal | `-#` `/` |
| Slim | `slim` | `.slim` | — | universal | `/` `/!` |
| Razor | `razor` | `.cshtml` `.vbhtml` `.razor` | — | universal | `@* … *@` |
| Blade | `blade` | `.blade.php` `.blade` | — | universal | `{{-- … --}}` |
| Smarty | `smarty` | `.tpl` `.smarty` | — | universal | `{* … *}` |
| Velocity | `velocity` | `.vm` `.vsl` `.vtl` | — | universal | `##` `#* … *#` |
| FreeMarker | `freemarker` | `.ftl` `.ftlh` `.ftlx` | — | universal | `<#-- … -->` |
| Thymeleaf | `thymeleaf` | `.thymeleaf` `.th.html` | — | universal | `<!-- … -->` |
| JavaServer Pages | `jsp` | `.jsp` `.jspx` `.jspf` `.tag` `.tagx` | — | universal | `<%-- … --%>` |
| ASP.NET Web Forms | `aspx` | `.aspx` `.ascx` `.asax` `.ashx` `.asmx` `.asp` _+1_ | — | universal | `<%-- … --%>` |
| ColdFusion Markup | `cfml` | `.cfm` `.cfml` `.cfc` | — | universal | `<!--- … --->` |

## Data & tabular

_Configuration and record formats without executable semantics._

| Language | Id | Extensions | Files | Tier | Comments |
|---|---|---|---|---|---|
| YAML | `yaml` | `.yaml` `.yml` `.yaml.tmpl` `.mir` `.reek` `.rviz` _+4_ | `.prettierrc` `.stylelintrc` `.eslintrc` _+7_ | **native** | `#` |
| TOML | `toml` | `.toml` `.tml` | `Cargo.lock` `Gopkg.lock` `Pipfile` _+5_ | **native** | `#` |
| INI | `ini` | `.ini` `.cfg` `.conf` `.prefs` `.desktop` `.directory` _+4_ | `setup.cfg` `tox.ini` `pytest.ini` _+10_ | universal | `;` `#` |
| Java Properties | `properties` | `.properties` | `gradle.properties` `local.properties` | universal | `#` `!` |
| Dotenv | `env` | `.env` | `.env` `.env.local` `.env.example` _+5_ | universal | `#` |
| EditorConfig | `editorconfig` | — | `.editorconfig` | universal | `#` `;` |
| CSV | `csv` | `.csv` | — | universal | _none_ |
| TSV | `tsv` | `.tsv` `.tab` | — | universal | _none_ |

## Version control

_Files git itself reads and writes._

| Language | Id | Extensions | Files | Tier | Comments |
|---|---|---|---|---|---|
| Git config | `gitconfig` | `.gitconfig` | `.gitconfig` `.gitmodules` `.git-credentials` _+1_ | universal | `#` `;` |
| Git ignore | `gitignore` | `.gitignore` | `.gitignore` `.npmignore` `.dockerignore` _+7_ | universal | `#` |
| Git attributes | `gitattributes` | `.gitattributes` | `.gitattributes` | universal | `#` |
| Git commit message | `git-commit` | — | `COMMIT_EDITMSG` `MERGE_MSG` `TAG_EDITMSG` _+1_ | universal | `#` |
| Git rebase todo | `git-rebase` | — | `git-rebase-todo` | universal | `#` |
| Diff / patch | `diff` | `.diff` `.patch` `.rej` | — | universal | _none_ |

## GraphQL

_Query documents and schema definition language._

| Language | Id | Extensions | Files | Tier | Comments |
|---|---|---|---|---|---|
| GraphQL | `graphql` | `.graphql` `.gql` | — | **native** | `#` |
| GraphQL SDL | `graphql-schema` | `.graphqls` `.gqls` `.sdl` | `schema.graphql` | **native** | `#` |

## Schemas & IDL

_Interface definition languages and API descriptions._

| Language | Id | Extensions | Files | Tier | Comments |
|---|---|---|---|---|---|
| Protocol Buffers | `protobuf` | `.proto` | — | universal | `//` `/* … */` `/** … */`<sup>doc</sup> |
| Apache Thrift | `thrift` | `.thrift` | — | universal | `//` `#` `/* … */` |
| Apache Avro IDL | `avro` | `.avdl` `.avpr` | — | universal | `//` `/* … */` `/** … */`<sup>doc</sup> |
| Cap'n Proto | `capnproto` | `.capnp` | — | universal | `#` |
| FlatBuffers | `flatbuffers` | `.fbs` | — | universal | `//` `/* … */` `///`<sup>doc</sup> |
| OpenAPI | `openapi` | — | `openapi.yaml` `openapi.yml` `openapi.json` _+1_ | **native** | `#` |
| AsyncAPI | `asyncapi` | — | `asyncapi.yaml` `asyncapi.yml` `asyncapi.json` | **native** | `#` |
| Swagger 2.0 | `swagger` | — | `swagger.yaml` `swagger.yml` `swagger.json` | **native** | `#` |
| RAML | `raml` | `.raml` | — | **native** | `#` |
| ASN.1 | `asn1` | `.asn` `.asn1` | — | universal | `--` `/* … */` |
| Web IDL | `webidl` | `.webidl` `.idl` `.widl` | — | universal | `//` `/* … */` |
| CUE | `cue` | `.cue` | — | universal | `//` `/* … */` |

## Databases & queries

_SQL dialects and other query languages._

| Language | Id | Extensions | Files | Tier | Comments |
|---|---|---|---|---|---|
| SQL | `sql` | `.sql` `.ddl` `.dml` | — | universal | `--` `/* … */` |
| PL/SQL | `plsql` | `.pls` `.plb` `.pks` `.pkb` `.pck` `.plsql` _+4_ | — | universal | `--` `/* … */` |
| T-SQL | `tsql` | `.tsql` | — | universal | `--` `/* … */` |
| MySQL | `mysql` | `.mysql` | — | universal | `--` `#` `/* … */` |
| PostgreSQL | `postgres` | `.pgsql` `.psql` | — | universal | `--` `/* … */` |
| SQLite SQL | `sqlite` | `.sqlite` `.sqlite3` | — | universal | `--` `/* … */` |
| HiveQL | `hive` | `.hql` `.q` | — | universal | `--` `#` `/* … */` |
| Spark SQL | `sparksql` | `.sparksql` | — | universal | `--` `/* … */` |
| Cypher | `cypher` | `.cypher` `.cyp` `.cql` | — | universal | `//` `/* … */` |
| SPARQL | `sparql` | `.rq` `.sparql` | — | universal | `#` |
| Turtle / RDF | `turtle` | `.ttl` `.n3` `.nt` `.nq` `.trig` | — | universal | `#` |
| jq | `jq` | `.jq` | — | universal | `#` |

## Build systems

_Build definitions, task runners and dependency manifests._

| Language | Id | Extensions | Files | Tier | Comments |
|---|---|---|---|---|---|
| Makefile | `makefile` | `.mk` `.mak` `.make` | `Makefile` `makefile` `GNUmakefile` _+3_ | universal | `#` |
| CMake | `cmake` | `.cmake` `.cmake.in` | `CMakeLists.txt` `CMakeCache.txt` | universal | `#` `#[[ … ]]` |
| Meson | `meson` | — | `meson.build` `meson_options.txt` `meson.options` | universal | `#` |
| Ninja | `ninja` | `.ninja` | `build.ninja` | universal | `#` |
| Bazel | `bazel` | `.bazel` | `BUILD` `BUILD.bazel` `WORKSPACE` _+3_ | universal | `#` |
| Starlark | `starlark` | `.bzl` `.star` `.sky` | `BUCK` `TARGETS` `PACKAGE` _+1_ | universal | `#` |
| Gradle | `gradle` | `.gradle` `.gradle.kts` | `settings.gradle` `build.gradle` | universal | `//` `/* … */` `/** … */`<sup>doc</sup> |
| Apache Ant | `ant` | — | `build.xml` `ivy.xml` `ant.xml` | universal | `<!-- … -->` |
| Just | `just` | `.just` | `justfile` `Justfile` `.justfile` _+1_ | universal | `#` |
| Go module | `go-mod` | — | `go.mod` `go.sum` `go.work` _+1_ | universal | `//` `/* … */` |
| M4 | `m4` | `.m4` `.ac` | `configure.ac` `aclocal.m4` | universal | `#` `dnl` |

## Infrastructure as code

_Provisioning, orchestration and container definitions._

| Language | Id | Extensions | Files | Tier | Comments |
|---|---|---|---|---|---|
| Dockerfile | `dockerfile` | `.dockerfile` | `Dockerfile` | universal | `#` |
| Containerfile | `containerfile` | `.containerfile` | `Containerfile` | universal | `#` |
| Docker Compose | `docker-compose` | — | `docker-compose.yml` `docker-compose.yaml` `docker-compose.override.yml` _+3_ | **native** | `#` |
| Terraform | `terraform` | `.tf` `.tfvars` `.tfstate` `.tofu` | — | universal | `#` `//` `/* … */` |
| HCL | `hcl` | `.hcl` `.nomad` `.pkr.hcl` `.workflow` | `.terraformrc` `terragrunt.hcl` | universal | `#` `//` `/* … */` |
| Pulumi | `pulumi` | — | `Pulumi.yaml` `Pulumi.yml` | **native** | `#` |
| Ansible | `ansible` | — | `playbook.yml` `playbook.yaml` `site.yml` _+3_ | **native** | `#` |
| Helm chart | `helm` | — | `Chart.yaml` `Chart.lock` `values.yaml` _+1_ | universal | `#` `{{/* … */}}` |
| Kubernetes manifest | `kubernetes` | — | `kustomization.yaml` `kustomization.yml` `kubeconfig` | **native** | `#` |
| Jsonnet | `jsonnet` | `.jsonnet` `.libsonnet` | — | universal | `//` `#` `/* … */` |
| Dhall | `dhall` | `.dhall` | — | universal | `--` `{- … -}` |
| Nix | `nix` | `.nix` | `default.nix` `shell.nix` `flake.nix` _+1_ | universal | `#` `/* … */` |
| Puppet | `puppet` | `.pp` `.epp` | `Puppetfile` `Modulefile` | universal | `#` `/* … */` |
| Bicep | `bicep` | `.bicep` `.bicepparam` | — | universal | `//` `/* … */` |

## Server & service config

_Daemon configuration dialects with their own grammar._

| Language | Id | Extensions | Files | Tier | Comments |
|---|---|---|---|---|---|
| nginx | `nginx` | `.nginx` `.nginxconf` | `nginx.conf` `mime.types` `fastcgi_params` _+2_ | universal | `#` |
| Apache config | `apache` | `.htaccess` | `.htaccess` `.htpasswd` `httpd.conf` _+2_ | universal | `#` |
| Caddyfile | `caddy` | — | `Caddyfile` `Caddyfile.dev` | universal | `#` |
| systemd unit | `systemd` | `.service` `.timer` `.socket` `.mount` `.automount` `.target` _+6_ | — | universal | `#` `;` |
| TypoScript | `typoscript` | `.typoscript` `.tsconfig` | `setup.txt` `constants.txt` | universal | `#` `//` `/* … */` |

## Shells & text tools

_Command languages and stream editors._

| Language | Id | Extensions | Files | Tier | Comments |
|---|---|---|---|---|---|
| Shell script | `shellscript` | `.sh` `.ksh` `.mksh` `.command` `.tool` `.bats` _+4_ | `.profile` `.login` `.logout` _+7_ | universal | `#` |
| Bash | `bash` | `.bash` `.bashrc` `.bash_profile` | `.bashrc` `.bash_profile` `.bash_login` _+5_ | universal | `#` |
| Zsh | `zsh` | `.zsh` `.zshrc` `.zsh-theme` | `.zshrc` `.zshenv` `.zprofile` _+6_ | universal | `#` |
| Fish | `fish` | `.fish` | `config.fish` | universal | `#` |
| Nushell | `nushell` | `.nu` | `config.nu` `env.nu` | universal | `#` |
| PowerShell | `powershell` | `.ps1` `.psm1` `.psd1` `.pssc` `.psrc` | — | universal | `#` `<# … #>` `<# … #>`<sup>doc</sup> |
| Batch file | `batch` | `.bat` `.cmd` `.btm` | — | universal | `REM` `::` `rem` |
| AWK | `awk` | `.awk` `.gawk` `.mawk` `.nawk` `.auk` | — | universal | `#` |
| sed | `sed` | `.sed` | — | universal | `#` |
| AppleScript | `applescript` | `.applescript` `.scpt` `.scptd` | — | universal | `--` `#` `(* … *)` |
| AutoHotkey | `autohotkey` | `.ahk` `.ahkl` `.ah2` | — | universal | `;` `/* … */` |
| Vim script | `vimscript` | `.vim` `.vimrc` `.exrc` | `.vimrc` `_vimrc` `vimrc` _+4_ | universal | `"` |

## Python family

_Python and its compiled dialects._

| Language | Id | Extensions | Files | Tier | Comments |
|---|---|---|---|---|---|
| Python | `python` | `.py` `.pyi` `.pyw` `.pyp` `.pyt` `.rpy` _+7_ | `SConstruct` `SConscript` `wscript` _+4_ | universal | `#` `""" … """`<sup>doc</sup> |
| Cython | `cython` | `.pyx` `.pxd` `.pxi` | — | universal | `#` `""" … """`<sup>doc</sup> |

## Systems languages

_Compiled, statically typed, close to the metal._

| Language | Id | Extensions | Files | Tier | Comments |
|---|---|---|---|---|---|
| C | `c` | `.c` `.h` `.idc` `.upc` | — | universal | `//` `/* … */` `/** … */`<sup>doc</sup> |
| C++ | `cpp` | `.cpp` `.cc` `.cxx` `.c++` `.hpp` `.hh` _+8_ | — | universal | `//` `/* … */` `/** … */`<sup>doc</sup> |
| Objective-C | `objective-c` | `.m` | — | universal | `//` `/* … */` `/** … */`<sup>doc</sup> |
| Objective-C++ | `objective-cpp` | `.mm` | — | universal | `//` `/* … */` `/** … */`<sup>doc</sup> |
| Rust | `rust` | `.rs` `.rs.in` | — | universal | `//` `/* … */` `///`<sup>doc</sup> `/** … */`<sup>doc</sup> |
| Go | `go` | `.go` `.tmpl.go` | — | universal | `//` `/* … */` |
| Zig | `zig` | `.zig` `.zon` | — | universal | `//` `///`<sup>doc</sup> |
| Nim | `nim` | `.nim` `.nims` `.nimble` `.nimcfg` | — | universal | `#` `#[ … ]#` `##`<sup>doc</sup> `##[ … ]##`<sup>doc</sup> |
| Odin | `odin` | `.odin` | — | universal | `//` `/* … */` `/** … */`<sup>doc</sup> |
| V | `v` | `.vsh` `.vv` | — | universal | `//` `/* … */` |
| D | `d` | `.d` `.di` | — | universal | `//` `/* … */` `/+ … +/` `///`<sup>doc</sup> `/** … */`<sup>doc</sup> |
| Swift | `swift` | `.swift` | — | universal | `//` `/* … */` `///`<sup>doc</sup> `/** … */`<sup>doc</sup> |
| Dart | `dart` | `.dart` | — | universal | `//` `/* … */` `///`<sup>doc</sup> |
| Crystal | `crystal` | `.cr` | `shard.yml` | universal | `#` |
| Haxe | `haxe` | `.hx` `.hxml` `.hxsl` | — | universal | `//` `/* … */` `/** … */`<sup>doc</sup> |
| Vala | `vala` | `.vala` `.vapi` | — | universal | `//` `/* … */` `/** … */`<sup>doc</sup> |
| Hack | `hack` | `.hack` `.hhi` | — | universal | `//` `#` `/* … */` `/** … */`<sup>doc</sup> |
| GDScript | `gdscript` | `.gd` `.gdscript` | — | universal | `#` |

## JVM languages

_Languages whose primary target is the JVM._

| Language | Id | Extensions | Files | Tier | Comments |
|---|---|---|---|---|---|
| Java | `java` | `.java` `.jav` `.jsh` | — | universal | `//` `/* … */` `/** … */`<sup>doc</sup> |
| Kotlin | `kotlin` | `.kt` `.kts` `.ktm` | — | universal | `//` `/* … */` `/** … */`<sup>doc</sup> |
| Scala | `scala` | `.scala` `.sc` `.sbt` `.mill` | — | universal | `//` `/* … */` `/** … */`<sup>doc</sup> |
| Groovy | `groovy` | `.groovy` `.gvy` `.gy` `.gsh` `.nf` | `Jenkinsfile` `jenkinsfile` | universal | `//` `/* … */` `/** … */`<sup>doc</sup> |

## .NET languages

_Languages whose primary target is the CLR._

| Language | Id | Extensions | Files | Tier | Comments |
|---|---|---|---|---|---|
| C# | `csharp` | `.cs` `.csx` `.cake` `.linq` | — | universal | `//` `/* … */` `///`<sup>doc</sup> |
| F# | `fsharp` | `.fs` `.fsi` `.fsx` `.fsscript` | — | universal | `//` `(* … *)` `///`<sup>doc</sup> |
| Visual Basic | `vb` | `.vb` `.vbs` `.bas` `.frm` `.vba` | — | universal | `'` `REM` `'''`<sup>doc</sup> |

## Scripting languages

_Dynamic, interpreted, embedded-friendly languages._

| Language | Id | Extensions | Files | Tier | Comments |
|---|---|---|---|---|---|
| Ruby | `ruby` | `.rb` `.rbw` `.rbi` `.rake` `.gemspec` `.ru` _+6_ | `Gemfile` `Rakefile` `Guardfile` _+13_ | universal | `#` `=begin … =end` |
| PHP | `php` | `.php` `.php3` `.php4` `.php5` `.php7` `.phps` _+4_ | `.php_cs` `.php_cs.dist` `.php-cs-fixer.php` | universal | `//` `#` `/* … */` `/** … */`<sup>doc</sup> |
| Perl | `perl` | `.pl` `.pm` `.t` `.pod` `.psgi` `.plx` _+3_ | `Makefile.PL` `Build.PL` `cpanfile` _+1_ | universal | `#` `=pod … =cut` |
| Raku | `raku` | `.raku` `.rakumod` `.rakutest` `.p6` `.pl6` `.pm6` _+1_ | — | universal | `#` `=begin comment … =end comment` |
| Lua | `lua` | `.lua` `.luau` `.rockspec` `.nse` `.wlua` | `.luacheckrc` `.busted` `.luacov` | universal | `--` `--[[ … ]]` `---`<sup>doc</sup> |
| Tcl | `tcl` | `.tcl` `.tk` `.itcl` `.itk` `.tm` `.exp` | `tclIndex` `pkgIndex.tcl` | universal | `#` |

## Functional languages

_ML- and Haskell-lineage languages._

| Language | Id | Extensions | Files | Tier | Comments |
|---|---|---|---|---|---|
| Haskell | `haskell` | `.hs` `.hs-boot` `.hsc` `.lhs` | `Setup.hs` `stack.yaml` | universal | `--` `{- … -}` `{-\| … -}`<sup>doc</sup> |
| OCaml | `ocaml` | `.ml` `.mli` `.mll` `.mly` `.eliom` `.eliomi` | `dune` `dune-project` `jbuild` | universal | `(* … *)` `(** … *)`<sup>doc</sup> |
| Standard ML | `sml` | `.sml` `.sig` `.fun` `.cm` | — | universal | `(* … *)` |
| Reason | `reasonml` | `.re` `.rei` | — | universal | `//` `/* … */` `/** … */`<sup>doc</sup> |
| ReScript | `rescript` | `.res` `.resi` | `rescript.json` `bsconfig.json` | universal | `//` `/* … */` `/** … */`<sup>doc</sup> |
| Elm | `elm` | `.elm` | `elm.json` `elm-package.json` | universal | `--` `{- … -}` `{-\| … -}`<sup>doc</sup> |
| PureScript | `purescript` | `.purs` | — | universal | `--` `{- … -}` `-- \|`<sup>doc</sup> |

## Lisp family

_S-expression languages._

| Language | Id | Extensions | Files | Tier | Comments |
|---|---|---|---|---|---|
| Clojure | `clojure` | `.clj` `.cljc` `.cljd` `.boot` `.joke` | `project.clj` `build.boot` `deps.edn` | universal | `;` `;;` |
| ClojureScript | `clojurescript` | `.cljs` `.cljx` | — | universal | `;` `;;` |
| Scheme | `scheme` | `.scm` `.ss` `.sld` `.sch` `.sls` | — | universal | `;` `#\| … \|#` |
| Racket | `racket` | `.rkt` `.rktl` `.rktd` `.scrbl` | — | universal | `;` `#\| … \|#` |
| Common Lisp | `common-lisp` | `.lisp` `.lsp` `.cl` `.asd` `.l` | — | universal | `;` `#\| … \|#` |
| Emacs Lisp | `emacs-lisp` | `.el` `.elc` | `.emacs` `init.el` `early-init.el` _+3_ | universal | `;` `;;` `;;;` |
| Fennel | `fennel` | `.fnl` | — | universal | `;` |
| Janet | `janet` | `.janet` `.jdn` | — | universal | `#` |

## BEAM languages

_Languages hosted on the Erlang VM._

| Language | Id | Extensions | Files | Tier | Comments |
|---|---|---|---|---|---|
| Elixir | `elixir` | `.ex` `.exs` `.eex` `.leex` `.heex` `.sface` | `mix.exs` `mix.lock` `.formatter.exs` | universal | `#` `@doc """ … """`<sup>doc</sup> |
| Erlang | `erlang` | `.erl` `.hrl` `.escript` `.app.src` `.yrl` `.xrl` | `rebar.config` `rebar.lock` `relx.config` | universal | `%` `%%` |
| Gleam | `gleam` | `.gleam` | `gleam.toml` | universal | `//` `///`<sup>doc</sup> |

## Scientific & statistical

_Array, statistics and computer-algebra languages._

| Language | Id | Extensions | Files | Tier | Comments |
|---|---|---|---|---|---|
| R | `r` | `.r` `.rprofile` | `.Rprofile` `Rprofile` `.Rhistory` _+2_ | universal | `#` `#'` |
| Julia | `julia` | `.jl` | `Project.toml` `Manifest.toml` | universal | `#` `#= … =#` |
| MATLAB | `matlab` | `.m` | — | universal | `%` `%%` `%{ … %}` |
| GNU Octave | `octave` | `.m` | `.octaverc` | universal | `%` `#` `%{ … %}` |
| Wolfram Mathematica | `mathematica` | `.wl` `.wls` `.nb` `.wlt` `.cdf` | — | universal | `(* … *)` |
| SAS | `sas` | `.sas` `.sas7` | — | universal | `*` `/* … */` |
| Stata | `stata` | `.do` `.ado` `.doh` `.mata` `.ihlp` `.sthlp` | — | universal | `//` `*` `/* … */` |
| SPSS | `spss` | `.sps` `.spss` | — | universal | `*` `/* … */` |
| Stan | `stan` | `.stan` `.stanfunctions` | — | universal | `//` `#` `/* … */` |
| gnuplot | `gnuplot` | `.gp` `.gnuplot` `.plt` `.plot` | — | universal | `#` |

## Formal methods & logic

_Proof assistants, solvers and logic programming._

| Language | Id | Extensions | Files | Tier | Comments |
|---|---|---|---|---|---|
| Prolog | `prolog` | `.pro` `.prolog` `.yap` | — | universal | `%` `/* … */` |
| Mercury | `mercury` | `.m` `.moo` | — | universal | `%` `/* … */` |
| Coq / Rocq | `coq` | `.v` `.coq` | `_CoqProject` | universal | `(* … *)` |
| Agda | `agda` | `.agda` `.lagda` `.lagda.md` `.lagda.tex` | — | universal | `--` `{- … -}` `{-\| … -}`<sup>doc</sup> |
| Idris | `idris` | `.idr` `.lidr` `.ipkg` | — | universal | `--` `{- … -}` `{-\| … -}`<sup>doc</sup> |
| Lean | `lean` | `.lean` `.hlean` | `lakefile.lean` `lean-toolchain` | universal | `--` `/- … -/` `/-- … -/`<sup>doc</sup> |
| Isabelle | `isabelle` | `.thy` | `ROOT` `ROOTS` | universal | `(* … *)` |
| Alloy | `alloy` | `.als` | — | universal | `//` `--` `/* … */` |
| TLA+ | `tla` | `.tla` | — | universal | `\*` `(* … *)` |
| SMT-LIB | `smt2` | `.smt2` `.smt` | — | universal | `;` |

## Hardware description

_RTL and verification languages._

| Language | Id | Extensions | Files | Tier | Comments |
|---|---|---|---|---|---|
| Verilog | `verilog` | `.v` `.vh` `.veo` | — | universal | `//` `/* … */` |
| SystemVerilog | `systemverilog` | `.sv` `.svh` `.svi` `.vlog` | — | universal | `//` `/* … */` |
| VHDL | `vhdl` | `.vhd` `.vhdl` `.vho` `.vht` `.vhs` | — | universal | `--` `/* … */` |

## Shaders & GPU

_Shading languages and GPU compute dialects._

| Language | Id | Extensions | Files | Tier | Comments |
|---|---|---|---|---|---|
| GLSL | `glsl` | `.glsl` `.vert` `.frag` `.geom` `.comp` `.tesc` _+5_ | — | universal | `//` `/* … */` |
| HLSL | `hlsl` | `.hlsl` `.hlsli` `.fx` `.fxh` `.cginc` `.compute` _+1_ | — | universal | `//` `/* … */` |
| WGSL | `wgsl` | `.wgsl` | — | universal | `//` `/* … */` |
| Metal Shading Language | `metal` | `.metal` `.metallib` | — | universal | `//` `/* … */` |
| CUDA | `cuda` | `.cu` `.cuh` | — | universal | `//` `/* … */` `/** … */`<sup>doc</sup> |
| OpenCL | `opencl` | `.ocl` `.clh` | — | universal | `//` `/* … */` `/** … */`<sup>doc</sup> |

## Smart contracts

_On-chain contract languages._

| Language | Id | Extensions | Files | Tier | Comments |
|---|---|---|---|---|---|
| Solidity | `solidity` | `.sol` | — | universal | `//` `/* … */` `///`<sup>doc</sup> `/** … */`<sup>doc</sup> |
| Vyper | `vyper` | `.vy` | — | universal | `#` `""" … """`<sup>doc</sup> |
| Cairo | `cairo` | `.cairo` | `Scarb.toml` | universal | `//` `///`<sup>doc</sup> |
| Move | `move` | `.move` | `Move.toml` | universal | `//` `/* … */` `///`<sup>doc</sup> |
| Michelson | `michelson` | `.tz` | — | universal | `#` `/* … */` |

## Enterprise platforms

_Vendor-platform languages with their own toolchains._

| Language | Id | Extensions | Files | Tier | Comments |
|---|---|---|---|---|---|
| ABAP | `abap` | `.abap` `.acds` | — | universal | `*` `"` |
| Apex | `apex` | `.trigger` `.apex` `.apxc` `.apxt` | — | universal | `//` `/* … */` `/** … */`<sup>doc</sup> |
| RPG (IBM i) | `rpg` | `.rpgle` `.sqlrpgle` `.rpg` `.rpg38` `.rpgleinc` | — | universal | `//` `*` |

## Classic & long-lived

_Languages with decades of still-running code behind them._

| Language | Id | Extensions | Files | Tier | Comments |
|---|---|---|---|---|---|
| Ada | `ada` | `.adb` `.ads` `.ada` `.gpr` | — | universal | `--` |
| Fortran | `fortran` | `.f` `.for` `.f77` `.f90` `.f95` `.f03` _+5_ | — | universal | `!` `c` `C` `*` |
| COBOL | `cobol` | `.cbl` `.cob` `.cpy` `.cobol` `.ccp` `.cobc` | — | universal | `*>` `*` |
| Pascal | `pascal` | `.pas` `.p` `.pascal` `.lpr` | — | universal | `//` `{ … }` `(* … *)` |
| Delphi | `delphi` | `.dpr` `.dpk` `.dfm` `.dproj` `.lfm` | — | universal | `//` `{ … }` `(* … *)` |
| Smalltalk | `smalltalk` | `.st` `.cs.st` | — | universal | `" … "` |
| Forth | `forth` | `.fth` `.4th` `.frt` `.forth` `.fb` | — | universal | `\` `( … )` |
| REXX | `rexx` | `.rexx` `.rex` `.rx` `.nrx` | — | universal | `--` `/* … */` |
| BASIC | `basic` | `.bi` `.bb` `.qb` `.basic` | — | universal | `'` `REM` |

## Assembly & IR

_Assembly dialects and compiler intermediate representations._

| Language | Id | Extensions | Files | Tier | Comments |
|---|---|---|---|---|---|
| Assembly | `assembly` | `.asm` `.s` `.a51` `.nasm` `.inc.asm` | — | universal | `;` `#` `//` `@` `/* … */` |
| LLVM IR | `llvm` | `.ll` `.llvm` | — | universal | `;` |
| WebAssembly Text | `wat` | `.wat` `.wast` | — | universal | `;;` `(; … ;)` |
| WebAssembly | `wasm` | — | — | universal | `;;` `(; … ;)` |

## Grammars & generators

_Parser generators, macro processors and schema notations._

| Language | Id | Extensions | Files | Tier | Comments |
|---|---|---|---|---|---|
| Yacc / Bison | `yacc` | `.y` `.yy` `.ypp` `.yacc` | — | universal | `//` `/* … */` |
| Lex / Flex | `lex` | `.lex` `.flex` `.l` `.ll` | — | universal | `//` `/* … */` |
| ANTLR | `antlr` | `.g4` `.g` `.antlr` | — | universal | `//` `/* … */` `/** … */`<sup>doc</sup> |

## Diagram languages

_Text-to-picture description languages._

| Language | Id | Extensions | Files | Tier | Comments |
|---|---|---|---|---|---|
| Graphviz DOT | `dot` | `.dot` `.gv` | — | universal | `//` `#` `/* … */` |
| PlantUML | `plantuml` | `.puml` `.plantuml` `.pu` `.iuml` `.wsd` | — | universal | `'` `/' … '/` |
| Mermaid | `mermaid` | `.mmd` `.mermaid` | — | universal | `%%` |

## Test & automation DSLs

_Executable specification formats._

| Language | Id | Extensions | Files | Tier | Comments |
|---|---|---|---|---|---|
| Gherkin | `gherkin` | `.feature` `.story` | — | universal | `#` |
| Robot Framework | `robotframework` | `.robot` `.resource` | — | universal | `#` |

---

## Shebang interpreters

Recognised interpreter names, by language. Version suffixes are stripped before lookup,
so `python3.12`, `perl-5.38` and `ruby31` need no entry of their own.

| Language | Interpreters |
|---|---|
| JavaScript | `node`, `nodejs`, `bun`, `deno`, `zx`, `gjs`, `qjs` |
| CoffeeScript | `coffee` |
| LiveScript | `lsc` |
| jq | `jq` |
| Shell script | `sh`, `ash`, `dash`, `ksh`, `mksh`, `pdksh`, `rc`, `es`, `openrc-run` |
| Bash | `bash`, `rbash` |
| Zsh | `zsh` |
| Fish | `fish` |
| Nushell | `nu` |
| PowerShell | `pwsh`, `powershell` |
| AWK | `awk`, `gawk`, `mawk`, `nawk`, `busybox awk` |
| sed | `sed`, `gsed` |
| AppleScript | `osascript` |
| Python | `python`, `python2`, `python3`, `pypy`, `pypy3`, `micropython`, `uv` |
| D | `rdmd`, `dmd` |
| Swift | `swift` |
| Dart | `dart` |
| Crystal | `crystal` |
| Kotlin | `kotlin`, `kotlinc` |
| Scala | `scala`, `scala-cli`, `amm` |
| Groovy | `groovy` |
| C# | `dotnet-script` |
| F# | `dotnet fsi` |
| Ruby | `ruby`, `jruby`, `rbx`, `macruby` |
| PHP | `php` |
| Perl | `perl`, `perl5`, `miniperl` |
| Raku | `raku`, `perl6` |
| Lua | `lua`, `luajit` |
| Tcl | `tclsh`, `wish`, `expect`, `tclsh8.6` |
| Haskell | `runhaskell`, `runghc`, `stack` |
| OCaml | `ocaml`, `ocamlrun`, `ocamlscript` |
| Clojure | `clojure`, `clj`, `bb`, `lumo` |
| Scheme | `scheme`, `guile`, `chicken`, `csi`, `gosh`, `chibi-scheme` |
| Racket | `racket` |
| Common Lisp | `sbcl`, `clisp`, `ecl`, `ccl`, `lisp` |
| Fennel | `fennel` |
| Janet | `janet` |
| Elixir | `elixir` |
| Erlang | `escript` |
| R | `Rscript`, `r` |
| Julia | `julia` |
| GNU Octave | `octave`, `octave-cli` |
| Wolfram Mathematica | `wolframscript` |
| gnuplot | `gnuplot` |
| Prolog | `swipl`, `prolog`, `gprolog` |
| Forth | `gforth` |
| REXX | `rexx`, `regina` |

---

## Notes on a few entries

- **`.wasm`** is a binary format and is deliberately not claimed by any extension: the
  `wat` entry owns the WebAssembly *text* format, which is the only one a formatter has
  any business touching.
- **`json-stringify`** exists for `package.json` and friends, where npm's own writer
  defines the canonical shape; it is reachable by filename, not by extension.
- **YAML dialects** (Docker Compose, Kubernetes, Ansible, OpenAPI, AsyncAPI, Swagger,
  RAML, Pulumi) are native tier because they are plain YAML documents and are routed to
  the real YAML printer. **Helm** is not: its Go template directives are not valid YAML,
  so it is formatted structurally.
- **Comment syntax is data, not decoration.** The engine and the safety gate both read it,
  which is why Lua is `--` / `--[[ ]]`, MATLAB is `%` / `%{ %}`, Fortran is `!`, Erlang is `%`, Batch is `REM` / `::` and COBOL is `*>` — never `//`.
- **Aliases are unique across the whole table**, so `byId()` accepts a
  canonical id (`typescript`), a VS Code id, or an alias (`ts`) and always lands on one language.
