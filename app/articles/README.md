# Articles Section

This directory contains in-depth articles about audio production, mixing, and mastering topics.

## Current Articles

### 1. Everything to Know About Compression
**Route**: `/articles/compression`  
**Word Count**: ~3,781 words  
**Visual References**: 15 plugin images  
**Status**: ✅ Complete (LEV-8)

**Topics Covered**:
- Essential compression parameters (attack, release, knee, ratio, threshold, dynamic range, makeup gain, transient)
- Hardware emulation vs. net new digital compressors
- FET, Optical, VCA, Variable-Mu, and hybrid compression topologies
- Instrument-specific compression settings (vocals, bass, drums, guitars, mix bus)
- Expert perspectives from Butch Vig, Andrew Scheps, Chris Lord-Alge, Bob Clearmountain, and Sylvia Massy
- Advanced techniques (parallel, sidechain, serial, upward compression)
- Common mistakes and solutions

**Featured Plugins**:
- FabFilter Pro-C 3
- UAD 1176
- Waves CLA-76
- Waves API 2500
- UAD SSL 4000 G
- Waves SSL G-Master
- FabFilter Saturn 2
- Soundtoys Decapitator
- UAD Precision Limiter

## Article Structure

Each article follows this component structure:

```tsx
export default function ArticlePage() {
  return (
    <main className="articleMain">
      <article className="articleContent">
        <header className="articleHeader">
          {/* Back link, title, meta */}
        </header>

        <section className="articleSection">
          {/* Content sections */}
        </section>

        <footer className="articleFooter">
          {/* Related links, navigation */}
        </footer>
      </article>
    </main>
  );
}
```

## Styling Classes

Articles use these CSS classes from `globals.css`:

- `.articleMain` - Outer container
- `.articleContent` - Article card
- `.articleHeader` - Title and metadata
- `.articleBackLink` - Navigation links
- `.articleSection` - Content sections
- `.articleImageWrapper` - Image containers
- `.articleImage` - Next.js Image components
- `.articleImageCaption` - Image captions
- `.articleQuote` - Blockquotes for quotes
- `.pluginGrid` - Recommended plugin grid
- `.pluginCard` - Individual plugin cards
- `.articleFooter` - Footer with links

All classes support light and dark themes via `[data-theme="dark"]` selectors.

## Adding New Articles

### 1. Create Article Directory
```bash
mkdir -p app/articles/[article-slug]
```

### 2. Create page.tsx
```tsx
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Article Title",
  description: "Article description for SEO",
};

export default function ArticlePage() {
  // Article component
}
```

### 3. Add Images (if needed)
Place article-specific images in:
```
public/assets/articles/[article-slug]/
```

Or reference existing plugin/sheet images:
```
public/assets/plugins/
public/assets/sheets/
```

### 4. Update Home Page
Add article to the feature grid in `app/page.tsx` or create a dedicated articles index.

### 5. Build and Test
```bash
npm run build
```

Verify static generation succeeds and article renders at `/articles/[slug]`.

## Content Guidelines

### Word Count
- Minimum: 2,000 words for comprehensive topics
- Recommended: 2,500-4,000 words for in-depth coverage

### Visual References
- Minimum: 10 images/diagrams
- Use existing plugin images from `/public/assets/plugins/`
- Add custom diagrams to `/public/assets/articles/[slug]/`

### Structure
- **Introduction** (200-400 words): Set context and purpose
- **Main Sections** (1,500-3,000 words): Core technical content
- **Expert Perspectives** (300-500 words): Industry insights
- **Practical Examples** (400-600 words): Real-world applications
- **Conclusion** (150-300 words): Summary and next steps

### Tone
- Professional but approachable
- Technical accuracy with practical context
- Assume reader has basic Logic Pro knowledge
- Define technical terms on first use

### SEO
- Clear, descriptive title (50-60 characters)
- Compelling meta description (150-160 characters)
- Proper heading hierarchy (h1 → h2 → h3 → h4)
- Descriptive image alt text

## Integration Points

### Home Page
Articles are surfaced on the home page feature grid:
```tsx
<Link href="/articles/compression" className="introFeatureCard">
  <span className="introFeatureIcon">📖</span>
  <h3>In-Depth Articles</h3>
  <p>Comprehensive guides covering compression, EQ, and mixing.</p>
</Link>
```

### Sheet Cross-References
Link to relevant articles from instrument sheets:
```tsx
<Link href="/articles/compression">
  Learn more about compression techniques →
</Link>
```

### Footer
Consider adding "Articles" link to site footer for discoverability.

## Future Articles (Ideas)

- **EQ Fundamentals** - Filters, shelves, parametric EQ, dynamic EQ
- **Reverb Deep Dive** - Algorithmic vs. convolution, pre-delay, decay
- **Saturation & Harmonic Distortion** - Tape, tube, console, digital
- **Mixing with Sends & Buses** - Parallel processing, routing strategies
- **Mastering Workflow** - Loudness, limiting, final polish
- **Vocal Production** - Recording, tuning, timing, effects chains
- **Drum Programming** - Sequencing, humanization, layering
- **Mix Bus Processing** - Glue, color, final polish
- **Stereo Imaging** - Width, depth, mono compatibility
- **Reference Mixing** - Using references, level matching, comparative listening

## Maintenance

- Update plugin recommendations as new versions release
- Refresh expert quotes and techniques as industry evolves
- Add new visual references when better examples become available
- Check internal links when sheet structure changes
- Verify build succeeds after Next.js updates
