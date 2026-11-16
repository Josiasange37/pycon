# About page surface

**Route:** `/about`  
**Status:** Shipped; code-led redesign, with no approved comp.  
**Scope:** This note records this route's expression of the existing site system. It is not a site-wide design specification.

## Direction

Tell PyCon Cameroon’s story through its community, mission, values, organisers, partner network and care. Echo the homepage’s Cameroon palette and editorial typography without copying its composition or assets. Give About its own photography and keep the page warm, people-centered and documentary in feel.

## Shipped expression

- Open on a sun-yellow field with a large typographic statement and an offset three-photo mosaic from the 2026 edition.
- Move from the Python Cameroon user group and recent community facts into a navy mission section, a ruled values list, and river-blue organiser portraits.
- Set the partner network on open cream paper: bare partner marks, ruled rows, four columns on wide screens and two on mobile. Retain community names and the supplied 2026 marks, including UbuCon Cameroon.
- End the About content with the code-of-conduct section on river blue and a sun-yellow CTA. This gives the care message its own clear field before the navy site footer.
- Preserve the established palette and type roles: sun yellow, river blue, warm paper and cream, night navy and ink; bold sans-serif display type with serif editorial accents. The page also supplies dark-theme color remapping.

## Keep in this surface

- Keep the story order and its focus on people, participation and care.
- Keep the partner wall open and logo-led rather than turning marks into cards; retain its four-to-two column change and visible row rules.
- Keep the code-of-conduct CTA on river blue with the yellow button, distinct from the navy footer.
- Keep partner identities and marks intact, and continue treating the 2026 conference details as historical context.

## Implementation and review

- Route composition: `app/about/page.tsx`
- Hero: `components/AboutHero.tsx`, `components/AboutHero.module.css`
- Story, values, team, partner wall and conduct: `components/AboutSections.tsx`, `components/AboutSections.module.css`
- Shared palette and typography tokens are defined in `app/globals.css`; this note does not redefine them.
- Review captures: `.impeccable/review/about/desktop.png`, `mobile.png`, `partners-desktop.png`, `partners-mobile.png`, `conduct-desktop.png`, `conduct-mobile.png`, and `team-mobile.png`.
