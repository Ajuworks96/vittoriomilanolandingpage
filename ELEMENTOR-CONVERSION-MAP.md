# ELEMENTOR CONVERSION MAP — VITTORIO MILANO

This blueprint details how to convert every section of the **Vittorio Milano** luxury website into **WordPress Elementor Flexbox Containers and Widgets**.

---

## GLOBAL ELEMENTOR SETTINGS

### 1. Elementor Global Colors
- **Primary Dark**: `#600C03` (Royal Burgundy)
- **Deep Dark**: `#380601` (Burgundy Dark)
- **Secondary / Accent**: `#C9A45C` (Muted Antique Gold)
- **Background Light**: `#FAF8F1` (Ivory Light)
- **Container Light**: `#F4EEDC` (Warm Ivory)
- **Text Dark**: `#281A18`
- **Text Muted**: `#756C62`

### 2. Elementor Global Fonts
- **Primary Heading (Serif)**: `Cormorant Garamond` (Weights: 300 Italic)
- **Secondary Body / UI (Sans-Serif)**: `Montserrat` or `Manrope` (Weights: 300, 400, 500, 600)

### 3. Container & Layout Defaults
- **Content Width**: `1320px`
- **Default Section Padding (Desktop)**: Top `120px`, Bottom `120px`
- **Default Section Padding (Mobile)**: Top `70px`, Bottom `70px`

---

## SECTION-BY-SECTION CONVERSION MAPPING

### SECTION 01 — HEADER
- **HTML Container**: `<header class="site-header">`
- **Elementor Structure**:
  ```
  Container (Full Width, Fixed Position, Z-Index 1000)
   └── Container (Boxed 1320px, Flex Row, Space-Between)
        ├── Brand Logo (Site Logo / Image Widget + Heading Widget)
        ├── Navigation (Nav Menu Widget — Inline, Uppercase, Gold Hover)
        └── Actions Container (Flex Row)
             ├── Phone Icon + Link (Text Editor / Icon Box Widget)
             └── Button Widget (.btn-outline-gold)
  ```
- **Widgets Used**: Nav Menu, Image, Button, Icon Box.
- **CSS Classes**: `.site-header`, `.brand-logo`, `.main-nav`, `.nav-link`, `.btn-outline-gold`.
- **Responsive Setting**: Mobile Menu Toggle activates Hamburger drawer at `< 1024px`.

---

### SECTION 02 — HERO (ASYMMETRIC EDITORIAL SPLIT)
- **HTML Container**: `<section class="section section-hero">`
- **Elementor Structure**:
  ```
  Container (Full Width, Min-Height 100vh, Dark Burgundy Background #1B0607)
   └── Inner Container (Boxed 1320px, 2 Columns Flex Grid, Align Center)
        ├── Left Column: Text & Narrative Container (60% Width)
        │     ├── Crest Icon + Eyebrow Container (SARTORIA ITALIANA · MILANO & DUBAI)
        │     ├── Heading Widget (H1: Bespoke Perfection, Hand-Tailored for Legacy.)
        │     ├── Text Editor Widget (Subtitle Narrative)
        │     ├── Buttons Container (Flex Row: .btn-gold + .btn-outline-gold)
        │     └── Embedded Metrics Strip (Flex Row: 40+ Years, 100% Full Canvas, Milano · Dubai)
        └── Right Column: Framed Portrait Container (40% Width)
              ├── Image Widget (Portrait Bespoke Suit Photo, Gold Border)
              └── Floating Seal Badge Widget (.hero-seal-badge: PURE BESPOKE · HANDMADE IN MILANO)
  ```
- **Widgets Used**: Image, Heading, Text Editor, Button, Icon, Inner Container / Flexbox Grid.
- **Background**: Deep Burgundy (`#1B0607`) with Radial Glow overlay.
- **CSS Classes**: `.section-hero`, `.hero-container`, `.hero-text-col`, `.hero-title`, `.hero-metrics-strip`, `.hero-portrait-frame`, `.hero-seal-badge`.

---

### SECTION 03 — BRAND PHILOSOPHY (ASYMMETRIC EDITORIAL MANIFESTO)
- **HTML Container**: `<section class="section section-philosophy">`
- **Elementor Structure**:
  ```
  Container (Full Width, Background Warm Ivory #FAF8F1)
   └── Inner Container (Boxed 1320px, 2 Columns Flex Grid, Align Center)
        ├── Left Column: Manifesto & Story Container (60% Width)
        │     ├── Crest Icon + Eyebrow Container (MANIFESTO DI ELEGANZA)
        │     ├── Heading Widget (H2: "True luxury cannot be mass-produced...")
        │     ├── Text Editor Widget (Heritage Philosophy Narrative)
        │     └── Signature Block Container (Gold Hairline + Master Cutter Title)
        └── Right Column: Framed Master Quote Card Container (40% Width)
              └── Card Container (.philosophy-seal-card: Core Values + Quote + Handcrafted Guarantee)
  ```
- **Widgets Used**: Icon, Heading, Text Editor, Container.
- **CSS Classes**: `.section-philosophy`, `.philosophy-split-container`, `.philosophy-headline`, `.philosophy-seal-card`, `.signature-name`.

---

### SECTION 04 — EDITORIAL CREDIBILITY BENCHMARKS
- **HTML Container**: `<section class="section section-stats">`
- **Elementor Structure**:
  ```
  Container (Full Width, Background Dark Burgundy #1B0607)
   └── Inner Container (Boxed 1320px, 4 Columns Flex Grid)
        ├── Card 1: Counter Widget (01 · 60+ Hours + Subdesc)
        ├── Card 2: Counter Widget (02 · 26+ Measurements + Subdesc)
        ├── Card 3: Counter Widget (03 · 5,000+ Silk Stitches + Subdesc)
        └── Card 4: Counter Widget (04 · 100% Full Canvas + Subdesc)
  ```
- **Widgets Used**: Counter Widget / Heading + Text Editor, Flexbox Grid.
- **CSS Classes**: `.section-stats`, `.editorial-stats-grid`, `.editorial-stat-card`, `.stat-number`, `.stat-label`.

---

### SECTION 05 — CRAFTSMANSHIP FEATURE CARDS (HORIZONTAL EDITORIAL ROWS)
- **HTML Container**: `<section class="section section-craft">`
- **Elementor Structure**:
  ```
  Container (Full Width, Background Warm Ivory #FAF8F1)
   └── Inner Container (Boxed 1320px, Flex Column Rows)
        ├── Section Header Container (Eyebrow: HALLMARKS OF PERFECTION + H2: The Anatomy of Bespoke)
        └── Editorial Rows Container (4 Horizontal Row Items: Numeral 01-04 + Title + Description + Image)
  ```
- **Widgets Used**: Heading Widget, Text Editor, Image Widget, Flexbox Row Container.
- **CSS Classes**: `.section-craft`, `.editorial-craft-rows`, `.craft-editorial-row`, `.craft-row-num`, `.craft-title`, `.craft-row-img`.

---

### SECTION 06 — STORY & MASTERY SPREAD
- **HTML Container**: `<section class="section section-story">`
- **Elementor Structure**:
  ```
  Container (Full Width, Background Dark Burgundy)
   └── Inner Container (Boxed 1320px, 2 Columns Flex Row, Vertical Align Center)
        ├── Column 1 (Left Image + Floating Badge Container)
        │     ├── Image Widget (Master Tailor Photo)
        │     └── Badge Container (40+ Years of Mastery)
        └── Column 2 (Right Text Content)
              ├── Heading Widget (Eyebrow: THE MILANESE HERITAGE)
              ├── Heading Widget (H2: Sartorial Mastery Passed...)
              ├── Divider Widget (Gold Line)
              ├── Text Editor Widget (Paragraphs)
              └── Button Widget (.btn-gold)
  ```
- **Widgets Used**: Image, Heading, Divider, Text Editor, Button.
- **CSS Classes**: `.section-story`, `.story-badge`, `.story-title`, `.story-paragraph`.

---

### SECTION 07 — THE BESPOKE JOURNEY (EXECUTIVE STEP CARDS GRID)
- **HTML Container**: `<section class="section section-process">`
- **Elementor Structure**:
  ```
  Container (Full Width, Background Dark Burgundy #1B0607)
   └── Inner Container (Boxed 1320px, 3 Columns Flex Grid)
        ├── Section Header Container (Eyebrow: THE BESPOKE JOURNEY + H2: Six Steps to Sartorial Perfection)
        └── Executive Step Cards Grid (6 Cards: Numeral 01-06 + Milestone Tag + Heading + Subtitle + Description)
  ```
- **Widgets Used**: Heading Widget, Text Editor, Flexbox Grid Container.
- **CSS Classes**: `.section-process`, `.executive-process-grid`, `.executive-step-card`, `.step-card-num`, `.step-card-title`.

---

### SECTION 08 — SIGNATURE COLLECTION CATALOGUE
- **HTML Container**: `<section class="section section-collection">`
- **Elementor Structure**:
  ```
  Container (Boxed 1320px, Background Warm Ivory)
   ├── Section Header Container
   ├── Filter Buttons Container (Inline Flex Buttons: ALL, BUSINESS, BLACK TIE...)
   └── Product Grid Container (4 Columns Grid)
        └── Repeater / Product Card Containers
             ├── Image Widget + Tag Badge
             ├── Category Subtitle
             ├── Product Heading
             ├── Specs Text
             └── Link / CTA Button
  ```
- **Widgets Used**: Portfolio Widget / Grid Container, Filter Buttons, Card Container.
- **CSS Classes**: `.section-collection`, `.filter-btn`, `.product-card`, `.product-image`, `.product-title`.

---

### SECTION 09 — MATERIAL & FABRIC LIBRARY
- **HTML Container**: `<section class="section section-materials">`
- **Elementor Structure**:
  ```
  Container (Boxed 1320px, Background Ivory Light)
   ├── Section Header Container
   └── Fabric Grid Container (4 Columns Flex Row / Grid)
        └── Fabric Cards (Image + Mill Tag + Name + Weight Spec)
  ```
- **Widgets Used**: Image Box, Heading, Text Editor.
- **CSS Classes**: `.section-materials`, `.fabric-card`, `.fabric-thumb`, `.fabric-mill`, `.fabric-name`.

---

### SECTION 10 — BESPOKE SERVICE MENU (LIGHT IVORY EDITORIAL)
- **HTML Container**: `<section class="section section-services">`
- **Elementor Structure**:
  ```
  Container (Full Width, Background Warm Ivory #FAF8F1)
   └── Inner Container (Boxed 1320px, 3 Columns Flex Grid)
        ├── Tier 1 Container: Semi-Bespoke (Roman Numeral I + Heading + Features List + .btn-outline-dark)
        ├── Tier 2 Container: Pure Bespoke (Featured Badge + Roman Numeral II + Heading + Features List + .btn-burgundy)
        └── Tier 3 Container: Atelier Royal (Roman Numeral III + Heading + Features List + .btn-outline-dark)
  ```
- **Widgets Used**: Price Table / Card Container, Heading Widget, Icon List / Custom Text Editor, Button Widget.
- **CSS Classes**: `.section-services`, `.editorial-menu-card`, `.editorial-menu-card.featured`, `.tier-roman-num`, `.diamond-bullet`.

---

### SECTION 11 — PRESS & TESTIMONIALS
- **HTML Container**: `<section class="section section-testimonials">`
- **Elementor Structure**:
  ```
  Container (Boxed 1320px, Background Warm Ivory)
   ├── Section Header Container
   └── Testimonials Grid (3 Columns Flex Row)
        └── Testimonial Containers (Quote Icon + Review Text + Author Name & Source)
  ```
- **Widgets Used**: Testimonial Carousel / Testimonial Box Widget.
- **CSS Classes**: `.section-testimonials`, `.testimonial-card`, `.testimonial-text`, `.author-name`.

---

### SECTION 12 — WHY CHOOSE US (EDITORIAL PILLARS ARCHITECTURE)
- **HTML Container**: `<section class="section section-why-us">`
- **Elementor Structure**:
  ```
  Container (Full Width, Background Dark Burgundy #1B0607)
   └── Inner Container (Boxed 1320px, 3 Columns Flex Grid)
        ├── Section Header Container (Eyebrow: THE VITTORIO STANDARDS + H2: Pillars of Uncompromising Sartoria)
        └── Pillars Grid (6 Column Items: Index Number 01-06 + Tag + Heading + Description)
  ```
- **Widgets Used**: Heading Widget, Text Editor, Flexbox Grid.
- **CSS Classes**: `.section-why-us`, `.pillars-editorial-grid`, `.pillar-item`, `.pillar-num`, `.pillar-tag`, `.pillar-title`.

---

### SECTION 13 — PRIVATE FITTING CONSULTATION SUITE (EDITORIAL DUAL-PANEL)
- **HTML Container**: `<section class="section section-contact">`
- **Elementor Structure**:
  ```
  Container (Full Width, Background Warm Ivory #FAF8F1)
   └── Inner Container (Boxed 1320px, 2 Columns Flex Grid, Align Top)
        ├── Left Column: Atelier Narrative & Concierge Info Panel (45% Width)
        │     ├── Concierge Badge Container (ATELIER CONCIERGE · DUBAI & MILANO)
        │     ├── Heading Widget (H2: Begin Your Sartorial Journey)
        │     ├── Divider Widget (Gold Line)
        │     ├── Text Editor Widget (Consultation Description)
        │     ├── Concierge Info Box (.concierge-info-box: Direct Line, VIP WhatsApp, Hours)
        │     └── Confidentiality Tag (Discreet & Confidential Sartorial Services)
        └── Right Column: Minimalist Booking Form Panel (55% Width)
              └── Elementor Form Card Container (.editorial-form)
                   ├── Form Step Tag (PRIVATE CONSULTATION REQUEST)
                   ├── Field 1: Full Name (Text)
                   ├── Field 2: Phone Number (Tel)
                   ├── Field 3: Email Address (Email)
                   ├── Field 4: Service of Interest (Select Dropdown)
                   ├── Field 5: Fitting Location (Select Dropdown)
                   ├── Field 6: Preferred Date (Date)
                   ├── Field 7: Preferred Time (Select Dropdown)
                   ├── Field 8: Notes (Textarea)
                   └── Submit Button (.btn-burgundy — CONFIRM CONSULTATION REQUEST)
  ```
- **Widgets Used**: Heading, Text Editor, Icon Box, Elementor Form Widget, Flexbox Container.
- **CSS Classes**: `.section-contact`, `.contact-container`, `.contact-info-panel`, `.concierge-info-box`, `.editorial-form`, `.btn-burgundy`.

---

### SECTION 14 — FOOTER & FLOATING WHATSAPP ACTION
- **HTML Container**: `<footer class="site-footer">`
- **Elementor Structure**:
  ```
  Container (Full Width, Background Dark Burgundy, Border Top Gold)
   └── Inner Container (Boxed 1320px)
        ├── Grid Container (4 Columns: Brand Logo & Desc, House Links, Visit Info, Connect Links)
        ├── Divider Widget
        ├── Bottom Container (Copyright Left, Cities Right)
        └── Floating Button Widget (Fixed Position Bottom Right — WhatsApp Icon)
  ```
- **Widgets Used**: Nav Menu, Icon, Text Editor, Button.
- **CSS Classes**: `.site-footer`, `.footer-grid`, `.footer-title`, `.footer-link`, `.whatsapp-float`.

