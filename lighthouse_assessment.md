# Lighthouse Full Assessment Report

> Generated for the Lamees Portfolio index page to guide future suggestions and hotfixes.

## Core Metrics (Scores out of 100)

- **Performance:** 53
- **Accessibility:** 89
- **Best Practices:** 96
- **SEO:** 91

## Detailed Audit Findings & Suggestions

### Largest Contentful Paint (Score: 0 / 100)
**Description:** Largest Contentful Paint marks the time at which the largest text or image is painted. [Learn more about the Largest Contentful Paint metric](https://developer.chrome.com/docs/lighthouse/performance/lighthouse-largest-contentful-paint/)


### Browser errors were logged to the console (Score: 0 / 100)
**Description:** Errors logged to the console indicate unresolved problems. They can come from network request failures and other browser concerns. [Learn more about this errors in console diagnostic audit](https://developer.chrome.com/docs/lighthouse/best-practices/errors-in-console/)

**Key Offenders / Suggestions:**

### Avoid large layout shifts (Score: 0 / 100)
**Description:** These are the largest layout shifts observed on the page. Each table item represents a single layout shift, and shows the element that shifted the most. Below each item are possible root causes that led to the layout shift. Some of these layout shifts may not be included in the CLS metric value due to [windowing](https://web.dev/articles/cls#what_is_cls). [Learn how to improve CLS](https://web.dev/articles/optimize-cls)

**Key Offenders / Suggestions:**
- `<div class="col-lg-6">`

### Buttons do not have an accessible name (Score: 0 / 100)
**Description:** When a button doesn't have an accessible name, screen readers announce it as "button", making it unusable for users who rely on screen readers. [Learn how to make buttons more accessible](https://dequeuniversity.com/rules/axe/4.11/button-name).

**Key Offenders / Suggestions:**
- `<button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">`

### Background and foreground colors do not have a sufficient contrast ratio. (Score: 0 / 100)
**Description:** Low-contrast text is difficult or impossible for many users to read. [Learn how to provide sufficient color contrast](https://dequeuniversity.com/rules/axe/4.11/color-contrast).

**Key Offenders / Suggestions:**
- `<p class="body-large text-muted-rose mb-comfort-lg">`
- `<a href="#work" class="btn btn-primary-rose btn-comfort me-3">`
- `<a href="#contact" class="btn btn-outline-rose btn-comfort">`
- `<p class="body-large text-muted-rose">`
- `<h3 class="skill-group-title">`

### Heading elements are not in a sequentially-descending order (Score: 0 / 100)
**Description:** Properly ordered headings that do not skip levels convey the semantic structure of the page, making it easier to navigate and understand when using assistive technologies. [Learn more about heading order](https://dequeuniversity.com/rules/axe/4.11/heading-order).

**Key Offenders / Suggestions:**
- `<h5 class="footer-title">`

### Document does not have a main landmark. (Score: 0 / 100)
**Description:** One main landmark helps screen reader users navigate a web page. [Learn more about landmarks](https://dequeuniversity.com/rules/axe/4.11/landmark-one-main).

**Key Offenders / Suggestions:**
- `<html lang="en">`

### Minify CSS (Score: 0 / 100)
**Description:** Minifying CSS files can reduce network payload sizes. [Learn how to minify CSS](https://developer.chrome.com/docs/lighthouse/performance/unminified-css/).

**Key Offenders / Suggestions:**
- http://localhost:8080/about.css (Wasted Bytes: 21.64 KB)
- http://localhost:8080/style.css (Wasted Bytes: 12.94 KB)

### Minify JavaScript (Score: 0 / 100)
**Description:** Minifying JavaScript files can reduce payload sizes and script parse time. [Learn how to minify JavaScript](https://developer.chrome.com/docs/lighthouse/performance/unminified-javascript/).

**Key Offenders / Suggestions:**
- http://localhost:8080/about.js (Wasted Bytes: 21.98 KB)

### Reduce unused CSS (Score: 0 / 100)
**Description:** Reduce unused rules from stylesheets and defer CSS not used for above-the-fold content to decrease bytes consumed by network activity. [Learn how to reduce unused CSS](https://developer.chrome.com/docs/lighthouse/performance/unused-css-rules/).

**Key Offenders / Suggestions:**
- http://localhost:8080/about.css (Wasted Bytes: 58.17 KB)
- http://localhost:8080/style.css (Wasted Bytes: 18.53 KB)
- https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css (Wasted Bytes: 18.31 KB)
- https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css (Wasted Bytes: 17.96 KB)

### Reduce unused JavaScript (Score: 0 / 100)
**Description:** Reduce unused JavaScript and defer loading scripts until they are required to decrease bytes consumed by network activity. [Learn how to reduce unused JavaScript](https://developer.chrome.com/docs/lighthouse/performance/unused-javascript/).

**Key Offenders / Suggestions:**
- http://localhost:8080/about.js (Wasted Bytes: 45.17 KB)

### Document does not have a meta description (Score: 0 / 100)
**Description:** Meta descriptions may be included in search results to concisely summarize page content. [Learn more about the meta description](https://developer.chrome.com/docs/lighthouse/seo/meta-description/).


### Use efficient cache lifetimes (Score: 0 / 100)
**Description:** A long cache lifetime can speed up repeat visits to your page. [Learn more about caching](https://developer.chrome.com/docs/performance/insights/cache).

**Key Offenders / Suggestions:**
- http://localhost:8080/assets/images/farq_harf.jpg (Wasted Bytes: 334.63 KB)
- http://localhost:8080/assets/images/zamalek.jpg (Wasted Bytes: 84.71 KB)
- http://localhost:8080/assets/images/headshot.jpg (Wasted Bytes: 74.89 KB)
- http://localhost:8080/about.css (Wasted Bytes: 62.56 KB)
- http://localhost:8080/about.js (Wasted Bytes: 53.53 KB)

### Layout shift culprits (Score: 0 / 100)
**Description:** Layout shifts occur when elements move absent any user interaction. [Investigate the causes of layout shifts](https://developer.chrome.com/docs/performance/insights/cls-culprit), such as elements being added, removed, or their fonts changing as the page loads.

**Key Offenders / Suggestions:**

### Font display (Score: 0 / 100)
**Description:** Consider setting [font-display](https://developer.chrome.com/docs/performance/insights/font-display) to swap or optional to ensure text is consistently visible. swap can be further optimized to mitigate layout shifts with [font metric overrides](https://developer.chrome.com/blog/font-fallbacks).

**Key Offenders / Suggestions:**
- https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/webfonts/fa-regular-400.woff2 (Wasted Time: 235 ms)
- https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/webfonts/fa-solid-900.woff2 (Wasted Time: 230 ms)
- https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/webfonts/fa-brands-400.woff2 (Wasted Time: 180 ms)

### Forced reflow (Score: 0 / 100)
**Description:** A forced reflow occurs when JavaScript queries geometric properties (such as offsetWidth) after styles have been invalidated by a change to the DOM state. This can result in poor performance. Learn more about [forced reflows](https://developer.chrome.com/docs/performance/insights/forced-reflow) and possible mitigations.

**Key Offenders / Suggestions:**

### Improve image delivery (Score: 0 / 100)
**Description:** Reducing the download time of images can improve the perceived load time of the page and LCP. [Learn more about optimizing image size](https://developer.chrome.com/docs/performance/insights/image-delivery)

**Key Offenders / Suggestions:**
- `<img src="assets/images/headshot.jpg" alt="Professional headshot" class="img-fluid rounded-elegant shadow-soft">`

### LCP request discovery (Score: 0 / 100)
**Description:** [Optimize LCP](https://developer.chrome.com/docs/performance/insights/lcp-discovery) by making the LCP image discoverable from the HTML immediately, and avoiding lazy-loading

**Key Offenders / Suggestions:**

### Network dependency tree (Score: 0 / 100)
**Description:** [Avoid chaining critical requests](https://developer.chrome.com/docs/performance/insights/network-dependency-tree) by reducing the length of chains, reducing the download size of resources, or deferring the download of unnecessary resources to improve page load.

**Key Offenders / Suggestions:**

### Render blocking requests (Score: 0 / 100)
**Description:** Requests are blocking the page's initial render, which may delay LCP. [Deferring or inlining](https://developer.chrome.com/docs/performance/insights/render-blocking) can move these network requests out of the critical path.

**Key Offenders / Suggestions:**
- https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css (Wasted Time: 1520 ms)
- https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap (Wasted Time: 903 ms)
- https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css (Wasted Time: 1383 ms)
- http://localhost:8080/about.css (Wasted Time: 2739 ms)
- http://localhost:8080/style.css (Wasted Time: 1384 ms)

### First Contentful Paint (Score: 2 / 100)
**Description:** First Contentful Paint marks the time at which the first text or image is painted. [Learn more about the First Contentful Paint metric](https://developer.chrome.com/docs/lighthouse/performance/first-contentful-paint/).


### Time to Interactive (Score: 22 / 100)
**Description:** Time to Interactive is the amount of time it takes for the page to become fully interactive. [Learn more about the Time to Interactive metric](https://developer.chrome.com/docs/lighthouse/performance/interactive/).


### Speed Index (Score: 40 / 100)
**Description:** Speed Index shows how quickly the contents of a page are visibly populated. [Learn more about the Speed Index metric](https://developer.chrome.com/docs/lighthouse/performance/speed-index/).


### Minimize main-thread work (Score: 50 / 100)
**Description:** Consider reducing the time spent parsing, compiling and executing JS. You may find delivering smaller JS payloads helps with this. [Learn how to minimize main-thread work](https://developer.chrome.com/docs/lighthouse/performance/mainthread-work-breakdown/)

**Key Offenders / Suggestions:**
- "group":"styleLayout","groupLabel":"Style & Layout","duration":2737.484
- "group":"other","groupLabel":"Other","duration":1221.2799999999893
- "group":"paintCompositeRender","groupLabel":"Rendering","duration":324.0279999999997
- "group":"parseHTML","groupLabel":"Parse HTML & CSS","duration":141.90000000000003
- "group":"scriptEvaluation","groupLabel":"Script Evaluation","duration":99.33599999999993

### Image elements do not have explicit `width` and `height` (Score: 50 / 100)
**Description:** Set an explicit width and height on image elements to reduce layout shifts and improve CLS. [Learn how to set image dimensions](https://web.dev/articles/optimize-cls#images_without_dimensions)

**Key Offenders / Suggestions:**
- `<img src="assets/images/farq_harf.jpg" alt="Farq Harf graduation project campaign materials" class="project-image">`
- `<img src="assets/images/launchbox.jpg" alt="Lunchbox startup brand strategy materials" class="project-image">`
- `<img src="assets/images/headshot.jpg" alt="Professional headshot" class="img-fluid rounded-elegant shadow-soft">`
- `<img src="assets/images/zamalek.jpg" alt="Zamalek Sporting Club reputation management campaign" class="project-image">`

### Document request latency (Score: 50 / 100)
**Description:** Your first network request is the most important. [Reduce its latency](https://developer.chrome.com/docs/performance/insights/document-latency) by avoiding redirects, ensuring a fast server response, and enabling text compression.


### Cumulative Layout Shift (Score: 76 / 100)
**Description:** Cumulative Layout Shift measures the movement of visible elements within the viewport. [Learn more about the Cumulative Layout Shift metric](https://web.dev/articles/cls).

**Key Offenders / Suggestions:**
- "cumulativeLayoutShiftMainFrame":0.1495853859388463,"newEngineResultDiffered":false

