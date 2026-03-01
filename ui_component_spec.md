# Lamis Nasser Portfolio - UI Component Specification & Redesign Guide

This document provides a comprehensive UI analysis and component specification for the `Lamees-Portfolio` index page. It is structured to help you easily understand the existing architecture, maintain design consistency, and efficiently insert, delete, or redesign UI components.

---

## 1. Global Architecture & Design System

### Technology Stack
*   **CSS Framework:** Bootstrap 5.3.2 (Grid system, utilities, core components)
*   **Icons:** Font Awesome 6.4.0
*   **Typography:** Google Fonts (Playfair Display for headings, Inter for body text)
*   **Animations:** AOS (Animate On Scroll) library (`data-aos="fade-up"`)

### Design Tokens (Custom CSS Classes)
*   **Color Palette (Rose Theme):**
    *   Backgrounds: `bg-light-rose`, `bg-soft-rose`, `bg-white`
    *   Text: `text-deep-rose`, `text-muted-rose`
    *   Buttons: `btn-primary-rose`, `btn-outline-rose`, `btn-secondary-outline`
*   **Typography:**
    *   Headings: `display-heading`, `section-heading`, `card-heading`, `role-title`, `service-title`
    *   Body: `brand-text`, `nav-text`, `body-large`, `body-text`
*   **Spacing Utilities (Custom Comfort Scale):**
    *   Padding/Margin: `py-comfort-xl`, `mb-comfort`, `mb-comfort-lg`, `mb-comfort-xxl`, `mt-comfort`, `mt-comfort-lg`, `mt-comfort-xl`
    *   Grid Gaps: `g-comfort`, `g-comfort-lg`
*   **Visual Elements:** `shadow-soft`, `rounded-elegant`

---

## 2. Universal Section Template

Almost every major section in the page follows a strict, highly reusable pattern. **Use this template when inserting a NEW section:**

```html
<!-- Replace [section-id], [section-class], and [bg-color] (e.g., bg-white or bg-soft-rose) -->
<section id="[section-id]" class="[section-class] bg-[color] py-comfort-xl">
    <div class="container">
        
        <!-- 1. Section Header -->
        <div class="row">
            <div class="col-12">
                <div class="text-center mb-comfort-xxl">
                    <h2 class="section-heading mb-comfort">Section Title</h2>
                    <p class="body-large text-muted-rose">Section subtitle providing context.</p>
                </div>
            </div>
        </div>

        <!-- 2. Main Content Grid/Row -->
        <div class="row">
            <!-- Insert Component Cards Here (Use Bootstrap col-* classes) -->
        </div>

        <!-- 3. Optional Summary CTA -->
        <div class="row mt-comfort-xl">
            <div class="col-12 text-center">
                <div class="summary-cta text-center">
                    <p class="body-text mb-comfort">Call to action text</p>
                    <a href="#link" class="btn btn-primary-rose">Action Button</a>
                </div>
            </div>
        </div>

    </div>
</section>
```

---

## 3. Component Library Specification

### 3.1 Navigation (`nav.navbar`)
*   **Structure:** Bootstrap sticky top navbar (`navbar-expand-lg sticky-top shadow-soft bg-light-rose`).
*   **Elements:** Brand logo/text, toggle button for mobile, link list (`nav-item`), CTA button (`btn-primary-rose`).
*   **Modification:** Add new links by duplicating a `<li class="nav-item">` block. Changing the active state requires moving the `active` class to the appropriate `nav-link`.

### 3.2 Hero Section (`.hero-section`)
*   **Structure:** 2-column layout (`col-lg-6` for text, `col-lg-6` for image) vertically centered (`align-items-center min-vh-75`).
*   **Elements:** `h1.display-heading`, `p.body-large`, `.cta-group` (buttons), `.contained-visual` (image wrapper with `shadow-soft`).

### 3.3 Static Card Components (Skills & Services)
Both Skills and Services use grid-based cards.
*   **Skill Cards (`.skill-group-card`):**
    *   **Header:** `.skill-group-header` > `.skill-icon` + `h3.skill-group-title`.
    *   **Body:** `.skill-badges` wrapper containing multiple `span.skill-badge` elements. Use `.highlight-badge` for emphasis.
*   **Service Cards (`.service-card`):**
    *   **Layout:** Stacked single column (`col-12 col-lg-10 col-xl-8`).
    *   **Elements:** `.service-header` (icon + title + keywords), `.service-description`, `.service-features` (ul/li with check icons), and `.service-cta` (quote button + delivery timeline).

### 3.4 Experience Timeline (`.experience-timeline`)
*   **Structure:** A vertical list of `.experience-item` wrappers.
*   **Card Structure (`.experience-card`):**
    *   **Header:** `.experience-header` contains `.company-logo`, text block (`.role-title`, `.company-name`, timeline), and optional `.experience-status`.
    *   **Body:** `.experience-content` wrapping an `ul.achievement-list`.
    *   **Footer:** `.experience-tags` containing `.skill-tag` spans.
*   **Insertion/Deletion:** Easily add or remove a job by duplicating or deleting an entire `<div class="experience-item">...</div>` block.

### 3.5 Projects Showcase (`.project-showcase`)
*   **Layout:** Alternating left/right image layout. This is achieved using Bootstrap's flex ordering (`order-lg-1` and `order-lg-2`).
*   **Visual Side:** `.project-visual` > `.project-image-container`. Includes `.project-type-badge` overlay (absolute positioned).
*   **Content Side:** `.project-content` > `.project-meta`, `h3.project-title`, `.project-impact`, `.project-description`. May include `.project-skills` or `.project-highlights` metrics blocks.
*   **Alternation Logic:**
    *   *Image Left, Text Right:* Visual `<div class="col-lg-6">`, Content `<div class="col-lg-6">`
    *   *Text Left, Image Right:* Visual `<div class="col-lg-6 order-lg-2">`, Content `<div class="col-lg-6 order-lg-1">`

### 3.6 Contact Section (`.detailed-contact-section`)
*   **Layout:** 2-column split inside a `.detailed-contact-wrapper`.
    *   Left (`col-lg-6`): Contact details list (`.contact-method-card`), location info, response guarantee.
    *   Right (`col-lg-6`): Form container (`.contact-form-section`).
*   **Form Inputs:** Standard Bootstrap `.form-control` inputs with custom spacing (`mb-comfort`).
*   **Feedback:** Form includes `.invalid-feedback` divs for HTML5 validation and a hidden `#successMessage` state handled via JS.

---

## 4. Workflows for Modification

### How to INSERT a New Component/Section
1.  Identify the nature of the data (Is it list-based? Card-based? A hero element?).
2.  Copy the **Universal Section Template** from Section 2.
3.  Choose an existing UI component (e.g., if you want an "Awards" section, the `.experience-card` or `.project-showcase` are likely the best visual matches).
4.  Copy the HTML block for that specific card/item and paste it inside the Main Content Grid of your new section.
5.  Update IDs, Classes, and content.

### How to DELETE a Component/Section
1.  Locate the top-level `<section id="...">` for sections, or the specific item wrapper (e.g., `.experience-item`, `.col-lg-4`) for individual cards.
2.  Remove the entire block.
3.  **Check for broken links:** If you delete an entire section (e.g., `#services`), make sure to remove any `href="#services"` links from the Navigation bar and Footer.

### How to REDESIGN a Component
1.  **Structure:** Alter the Bootstrap grid classes (e.g., change `col-lg-4` to `col-lg-6` to move from a 3-column to a 2-column layout).
2.  **Appearance:** If changing colors or borders, stick to substituting the active CSS variables/classes (e.g., switch `bg-white` to `bg-soft-rose`).
3.  **To build entirely new styles:** Add the new styles to `style.css` rather than using inline styles, utilizing the pre-existing variables to maintain design consistency.
