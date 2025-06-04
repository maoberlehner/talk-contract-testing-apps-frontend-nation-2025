---
theme: apple-basic
layout: statement
colorSchema: light
highlighter: shiki
drawings:
  persist: false
---

# Stop Doing <span class="accent">E2E Tests!</span>

<div class="leading-12">
Write Better Tests with Contract Tests
</div>

<!--
There are two common styles of writing tests for microservices-based applications:

1. Mock everything.
2. Mock nothing.

Both methodologies lead to suboptimal tests. In this talk, we explore how we can use OpenAPI specifications to create more reliable tests in sync with our microservices. At the same time, tests relying on OpenAPI specifications are less brittle than classic E2E tests.

First, we'll learn why we must adapt our strategies to the particular type of application we build. Then, we'll look into a concrete example of using contract testing and OpenAPI specifications to ensure we can effectively test our microservices and web applications. -->

<!--
- At my previous job we started building a new application based on SPAs and Microservices
-->

---
layout: intro
---

<ol class="leading-17">
  <li>E2E tests <strong>do not work with microservices</strong>.</li>
  <li v-click>Mocking <strong>leads to false confidence</strong>.</li>
  <li v-click>How to test SSR apps <strong>using contract testing techniques</strong>.</li>
</ol>

---
layout: statement
---

<h1><span class="accent">E2E Testing</span><br>is Fine!<span v-click>*</span></h1>
<div class="leading-12" style="font-size:0.65em;" v-after>
*When working on a <strong>monolithic</strong> application.
</div>

---
layout: statement
---

<img src="/images/monolithic-architecture.png" style="width:440px">

<!--
The monolith contains the schema so our tests that ensure production readiness
must test the whole application including the schema / DB and UI.
-->

---
layout: statement
---

<img src="/images/monolithic-architecture-test.png" style="width:620px">

---
layout: statement
---

<h1><span class="accent">Microservices</span><br>Change Everything!</h1>

---
layout: statement
---

<img src="/images/microservices-architecture.png" style="width:630px">

---
layout: statement
---

<h1>Don't Do E2E Testing<br>with <span class="accent">Microservices!</span></h1>

---
layout: intro
---

<ul class="leading-17">
  <li>E2E tests become <strong>slow and flaky</strong> with microservices.</li>
  <li v-click>Services may be <strong>unavailable or unstable</strong> during testing.</li>
  <li v-click>Testing across <strong>multiple service boundaries</strong> is complex.</li>
  <li v-click>E2E tests <strong>prevent independent deployments</strong>.</li>
</ul>

---
layout: statement
---

<h1>So What About<br><span class="accent">Mocking?</span></h1>

---
layout: statement
---

<img src="/images/microservices-architecture-test-mocks.png" style="width:600px">

---
layout: intro
---

```ts {all|3-9}
// Mocking API responses in Playwright
it('should be possible to remove an item', () => [
  await page.route('https://items.xyz.com/items', async route => {
    const json = [
      { name: 'Bread', id: 1 },
      { name: 'Butter', id: 2 },
    ];
    await route.fulfill({ json });
  });

  // ...
]);
```

---
layout: statement
---

<h1>But <span class="accent">SSR Apps</span><br>are Different!</h1>

---
layout: intro
---

```tsx {all|3-4}
// app/page.tsx
export default async function Home() {
  // ❌ We can't mock server-side fetch!
  const items = await fetch("https://items.xyz.com/items");

  return <ShoppingList items={items} />;
}
```

---
layout: intro
---

```vue {all|2-3}
<script setup lang="ts">
// ❌ We can't mock server-side fetch!
const { data } = await useFetch("https://items.xyz.com/items");

// ...
</script>
```

---
layout: statement
---

<h1>Even Worse:<br><span class="accent">Mocks Lie!</span></h1>

---
layout: statement
---

<img src="/images/green-tests.avif" style="width:600px">


---
layout: intro
---

```ts
// Mocking with Playwright
it('should be possible to remove an item', () => [
  await page.route('https://items.xyz.com/items', async route => {
    const json = [
      { name: 'Bread', id: 1 }, // [!code --]
      { name: 'Butter', id: 2 },  // [!code --]
      { title: 'Bread', id: 1 }, // [!code ++]
      { title: 'Butter', id: 2 },  // [!code ++]
    ];
    await route.fulfill({ json });
  });

  // ...
]);
```

---
layout: intro
---

```ts
app.get('/items', (c) => {
  return c.json([
    {
      name: 'Bread', // [!code --]
      title: 'Bread', // [!code ++]
      id: 1,
    },
  ]);
});
```

---
layout: statement
---

<img src="/images/green-tests.avif" style="width:600px">

---
layout: statement
---

<h1><span class="accent">Contract Testing</span><br>to the Rescue!</h1>

---
layout: intro
---

<ul class="leading-17">
  <li>Services agree on <strong>API specifications</strong></li>
  <li v-click>Tests use <strong>real API contracts</strong>, not made-up mocks</li>
  <li v-click>Changes to APIs are <strong>automatically detected</strong></li>
  <li v-click>Both sides can <strong>deploy independently</strong></li>
</ul>

---
layout: statement
---

<img src="/images/contract-as-test.png" style="width:660px">

---
layout: statement
---

<img src="/images/contract.svg" style="width:300px">

---
layout: statement
---

<h1>From <span class="accent">E2E Tests</span><br>to <span class="accent">Application Tests</span></h1>

---
layout: intro
---

<ul class="leading-17">
  <li style="text-decoration: line-through;">❌ E2E Tests</li>
  <li v-click>✅ Application Tests</li>
</ul>

---
layout: intro
---

<ul class="leading-17">
  <li>Run in a <strong>real browser</strong>.</li>
  <li v-click>Interact with the app <strong>like a real user</strong>.</li>
  <li v-click>Test the entire app, making <strong>real requests</strong>...</li>
  <li v-click>... but <strong>not</strong> to real services (but stubs)!</li> 
</ul>

---
layout: statement
---

<img src="/images/shopping-list-architecture.svg" style="width:900px">

---
layout: statement
---

<img src="/images/contract-repository.svg" style="width:600px">

---
layout: statement
---

<img src="/images/shopping-list-test-stub.svg" style="width:900px">

---
layout: statement
---

<img src="/images/contract-push-service.svg" style="width:900px">

---
layout: statement
---

<img src="/images/contract-pull.svg" style="width:900px">

---
layout: statement
---

<img src="/images/contract-push.svg" style="width:900px">

---
layout: statement
---

<h1><span class="accent">Mocking</span> Creates<br>False Confidence!</h1>

---
layout: statement
---

<h1>Don't Do E2E Testing<br>with <span class="accent">Microservices!</span></h1>

---
layout: statement
---

<h1>Use <span class="accent">Contract-Based Stubs</span><br>to Test Frontend Apps!</h1>

---
layout: intro
---

<div class="leading-8">
  <span class="font-extrabold">Markus Oberlehner</span><br>
  <span style="font-size:0.5em;">Software Engineer @ Austrian Federal Computing Centre</span>
</div>

<img src="/images/qr.svg" style="width:280px;position:absolute;top:36px;right:36px;">

<div class="leading-17 mt-10">
  🦋 <a href="https://bsky.app/profile/markus.oberlehner.net">@markus.oberlehner.net</a><br>
  📚 <a href="https://goodvuetests.com">goodvuetests.com</a><br><br>
  <small><a href="https://github.com/maoberlehner/talk-contract-testing-apps-frontend-nation-2025">github.com/maoberlehner/talk-contract-testing-apps-frontend-nation-2025</a></small>
</div>
