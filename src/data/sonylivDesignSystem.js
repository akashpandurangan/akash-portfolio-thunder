/*
 * What the Sony LIV design system says about itself, transcribed from its own site (https://sony-qp-ds.vercel.app: the
 * Foundation, Components and Tokens pages, "Figma: Mobile | Sony LIV", Inter, 4px grid, dark only). The values, names and
 * sentences are the site's, copied by script from the rendered pages rather than typed, so they match it exactly, apart
 * from the few lines below that were reworded for the case study: a component description that began a sentence with a
 * lowercase prop name (Button, Badge, PosterCard, ListRow), two that cited Figma node ids and component sets instead of
 * describing the component (Card, Banner), and the Figma Variables note ("forty screens" became "every screen", which
 * the site's own wording does not support as a count).
 *
 * NOTE: the site contradicts itself in one place. Its Text section measures contrast "against surface-2 (#1A1A1A)", while its
 * Surface table gives surface-2 as #161616. Both are kept as the site has them; one of the two needs correcting there.
 */

export const DESIGN_SYSTEM_SITE = 'https://sony-qp-ds.vercel.app'

export const FOUNDATIONS = {
  "intro": "Five surface steps, white as the action colour, gold as the paywall, one type family and a 4px grid. Everything downstream inherits from this page — if a value is not defined here, it does not exist in the product.",
  "colourModel": "This is a dark-only system. Depth is expressed by lightening the surface rather than by casting shadows, and hue is rationed: white does all the work of an action colour, and gold is the only saturated accent a viewer sees on a normal browse session.",
  "principles": [
    {
      "title": "White carries priority",
      "text": "The single most important control on any screen is the white one. Because the canvas is black, white has the highest possible contrast and needs no supporting treatment."
    },
    {
      "title": "Gold means money",
      "text": "Logo, Subscribe, crown, premium content, active navigation. If an element is gold, it is either the brand or something behind the paywall."
    },
    {
      "title": "Surface means depth",
      "text": "Each step from bg to surface-4 reads as one level closer to the viewer. Shadows are a supporting cue on this canvas, never the primary one."
    }
  ],
  "colour": [
    {
      "title": "Surface",
      "text": "Sampled from the screens themselves: every value below was measured off the Figma export rather than chosen. Elevation is communicated by surface lightness, not by shadow — a card one step lighter than its parent reads as one step closer.",
      "items": [
        {
          "primitive": "neutral-950",
          "name": "bg",
          "hex": "#0A0A0A",
          "cssVar": "--color-bg",
          "use": "App background and video letterbox"
        },
        {
          "primitive": "neutral-900",
          "name": "surface-1",
          "hex": "#101010",
          "cssVar": "--color-surface-1",
          "use": "Sheets and full-page panels"
        },
        {
          "primitive": "neutral-850",
          "name": "surface-2",
          "hex": "#161616",
          "cssVar": "--color-surface-2",
          "use": "Cards, list rows, search field, secondary button"
        },
        {
          "primitive": "neutral-750",
          "name": "surface-3",
          "hex": "#282828",
          "cssVar": "--color-surface-3",
          "use": "Floating navigation and circular overlay buttons"
        },
        {
          "primitive": "neutral-750",
          "name": "surface-4",
          "hex": "#282828",
          "cssVar": "--color-surface-4",
          "use": "Pressed state and avatar placeholder"
        },
        {
          "primitive": "neutral-800",
          "name": "art-placeholder",
          "hex": "#202020",
          "cssVar": "--color-art-placeholder",
          "use": "Flat fill standing in for title art that has not been supplied"
        },
        {
          "primitive": "chip-fill",
          "name": "chip",
          "hex": "#1D1F1E90",
          "cssVar": "--color-chip",
          "use": "Chip fill — translucent, so chips read on artwork as well as on the page"
        },
        {
          "primitive": "neutral-700",
          "name": "border-subtle",
          "hex": "#303030",
          "cssVar": "--color-border-subtle",
          "use": "Hairline dividers between rows"
        },
        {
          "primitive": "neutral-600",
          "name": "border-strong",
          "hex": "#404040",
          "cssVar": "--color-border-strong",
          "use": "Selected chip outline, focus ring"
        }
      ],
      "note": ""
    },
    {
      "title": "Action",
      "text": "White is the primary action colour. The highest-priority button on any screen is the white one, and there is never more than one per view.",
      "items": [
        {
          "primitive": "white",
          "name": "action-primary",
          "hex": "#FFFFFF",
          "cssVar": "--color-action-primary",
          "use": "Primary button fill, active tab indicator, progress fill"
        },
        {
          "primitive": "black",
          "name": "action-on-primary",
          "hex": "#000000",
          "cssVar": "--color-action-on-primary",
          "use": "Label and icon sitting on a white button"
        },
        {
          "primitive": "neutral-850",
          "name": "action-secondary",
          "hex": "#161616",
          "cssVar": "--color-action-secondary",
          "use": "Secondary button fill — same step as surface-2, named separately so intent is explicit"
        },
        {
          "primitive": "neutral-200",
          "name": "action-muted",
          "hex": "#CFCFCF",
          "cssVar": "--color-action-muted",
          "use": "The soft-white play button that sits on artwork, where full white would glare"
        }
      ],
      "note": ""
    },
    {
      "title": "Brand",
      "text": "Yellow is the paywall. It marks the logo, the Subscribe affordance, premium content and the active navigation item — nothing else. Violet appears only inside the Upgrade badge gradient.",
      "items": [
        {
          "primitive": "yellow-500",
          "name": "gold",
          "hex": "#FFD600",
          "cssVar": "--color-gold",
          "use": "Logo, Subscribe label, crown, IMDB rating, active nav icon"
        },
        {
          "primitive": "yellow-300",
          "name": "gold-muted",
          "hex": "#FFEC28",
          "cssVar": "--color-gold-muted",
          "use": "The lighter yellow in the logo mark and on bright artwork"
        },
        {
          "primitive": "yellow-700",
          "name": "gold-dim",
          "hex": "#C9A800",
          "cssVar": "--color-gold-dim",
          "use": "Pressed state of a yellow affordance"
        },
        {
          "primitive": "violet-600",
          "name": "premium-start",
          "hex": "#7818B4",
          "cssVar": "--color-premium-start",
          "use": "Upgrade badge gradient, start stop"
        },
        {
          "primitive": "magenta-600",
          "name": "premium-end",
          "hex": "#A21CAF",
          "cssVar": "--color-premium-end",
          "use": "Upgrade badge gradient, end stop"
        },
        {
          "primitive": "red-500",
          "name": "live",
          "hex": "#F53131",
          "cssVar": "--color-live",
          "use": "The dot on the LIVE badge — the only red in the system, reserved for live broadcast"
        }
      ],
      "note": ""
    },
    {
      "title": "Text",
      "text": "Four steps. text-disabled sits below the WCAG AA threshold by design and is therefore only ever used for non-essential text that is duplicated elsewhere on the same row.",
      "items": [
        {
          "primitive": "white",
          "name": "text-primary",
          "hex": "#FFFFFF",
          "cssVar": "--color-text-primary",
          "use": "Titles, button labels, list row titles"
        },
        {
          "primitive": "neutral-300",
          "name": "text-secondary",
          "hex": "#ACACAC",
          "cssVar": "--color-text-secondary",
          "use": "Synopsis, metadata rows, inactive tab labels"
        },
        {
          "primitive": "neutral-400",
          "name": "text-tertiary",
          "hex": "#8C8E8E",
          "cssVar": "--color-text-tertiary",
          "use": "Row subtitles, file sizes, inactive nav icons"
        },
        {
          "primitive": "neutral-500",
          "name": "text-disabled",
          "hex": "#5C5C5C",
          "cssVar": "--color-text-disabled",
          "use": "Unavailable download, placeholder text"
        }
      ],
      "note": "Ratios are measured against surface-2 (#1A1A1A), the most common text background in the product. text-primary through text-tertiary clear WCAG AA for body text; text-disabled does not, and is therefore limited to labels whose meaning is available elsewhere on the same row."
    }
  ],
  "typeIntro": "Inter at eight sizes. Every line height is a multiple of 4, so a paragraph and a stack of cards land on the same grid.",
  "typeScale": [
    {
      "name": "display-24",
      "spec": "24/32 · 700",
      "use": "Detail title without title art, empty-state headline"
    },
    {
      "name": "title-20",
      "spec": "20/28 · 600",
      "use": "Screen title — Profiles, My Download"
    },
    {
      "name": "title-18",
      "spec": "18/24 · 500",
      "use": "Settings row title, premium plan name"
    },
    {
      "name": "title-16",
      "spec": "16/24 · 600",
      "use": "Section header, primary button label, episode title"
    },
    {
      "name": "label-14",
      "spec": "14/20 · 500",
      "use": "Chip label, tab label, card title, status-bar clock"
    },
    {
      "name": "body-14",
      "spec": "14/20 · 400",
      "use": "Synopsis and descriptive paragraphs"
    },
    {
      "name": "body-12",
      "spec": "12/16 · 400",
      "use": "Metadata row, row subtitle, episode numbering"
    },
    {
      "name": "caption-10",
      "spec": "10/16 · 600",
      "use": "Badge text, certification tag"
    }
  ],
  "weights": [
    {
      "name": "Regular 400",
      "use": "Body copy and metadata"
    },
    {
      "name": "Medium 500",
      "use": "Chips, tabs, settings titles"
    },
    {
      "name": "SemiBold 600",
      "use": "Section headers and buttons"
    },
    {
      "name": "Bold 700",
      "use": "Screen titles and empty-state headlines"
    }
  ],
  "spacing": {
    "text": "A 4px base with a 16px screen gutter. space-1 (2px) is the single exception to the scale and exists only for optical icon alignment — it never appears in layout.",
    "items": [
      {
        "name": "space-0",
        "px": "0px",
        "use": "Flush edges and full-bleed media"
      },
      {
        "name": "space-1",
        "px": "2px",
        "use": "Optical icon nudge — the single sub-4 exception"
      },
      {
        "name": "space-2",
        "px": "4px",
        "use": "Icon to label inside a chip or badge"
      },
      {
        "name": "space-3",
        "px": "8px",
        "use": "Gap between cards in a horizontal rail"
      },
      {
        "name": "space-4",
        "px": "12px",
        "use": "List row inner padding, chip horizontal padding"
      },
      {
        "name": "space-5",
        "px": "16px",
        "use": "Screen gutter — the default on every screen"
      },
      {
        "name": "space-6",
        "px": "20px",
        "use": "Section header to its content"
      },
      {
        "name": "space-7",
        "px": "24px",
        "use": "Between stacked cards"
      },
      {
        "name": "space-8",
        "px": "32px",
        "use": "Between content sections"
      },
      {
        "name": "space-10",
        "px": "40px",
        "use": "Above a primary call to action"
      },
      {
        "name": "space-12",
        "px": "48px",
        "use": "Empty-state vertical rhythm"
      },
      {
        "name": "space-16",
        "px": "64px",
        "use": "Reserved area beneath the floating navigation"
      }
    ]
  },
  "radius": {
    "text": "Radius encodes distance from the page. Flat media is square, cards round gently, and anything that floats free of the layout is a pill.",
    "items": [
      {
        "name": "radius-none",
        "px": "0px",
        "use": "Full-bleed video surface"
      },
      {
        "name": "radius-sm",
        "px": "4px",
        "use": "Progress track"
      },
      {
        "name": "radius-md",
        "px": "8px",
        "use": "Poster card, episode thumbnail, backdrop"
      },
      {
        "name": "radius-lg",
        "px": "12px",
        "use": "Primary and secondary buttons, download thumbnail"
      },
      {
        "name": "radius-xl",
        "px": "16px",
        "use": "Category chip, settings row, hero card"
      },
      {
        "name": "radius-2xl",
        "px": "20px",
        "use": "Featured hero, subscription card"
      },
      {
        "name": "radius-3xl",
        "px": "28px",
        "use": "Floating bottom navigation"
      },
      {
        "name": "radius-pill",
        "px": "999px",
        "use": "Filter chip, search field, avatar, circular button"
      }
    ]
  },
  "elevation": {
    "text": "On a black canvas a shadow only reads when the surface above it is lighter, so every elevation is paired with a surface step. Most of the product uses none at all.",
    "items": [
      {
        "name": "shadow-e1",
        "use": "Badge or chip resting on artwork"
      },
      {
        "name": "shadow-e2",
        "use": "Card lifted off the page canvas"
      },
      {
        "name": "shadow-e3",
        "use": "Sheets and modals"
      },
      {
        "name": "shadow-nav",
        "use": "The floating bottom navigation, and nothing else"
      }
    ]
  },
  "iconography": {
    "text": "Drawn on a 24px grid. Navigation and brand glyphs are solid so they hold their shape at small sizes against artwork; controls are outlined at 1.8px. Icons inherit colour from their parent, so a nav icon becomes gold simply by being active."
  },
  "layout": {
    "text": "Every screen is designed at 412 × 917. Content sits inside a 16px gutter; horizontal rails deliberately break it so a clipped card signals that the row scrolls.",
    "items": [
      {
        "value": "412 × 917",
        "name": "Frame",
        "use": "Design and hand-off size"
      },
      {
        "value": "16px",
        "name": "Gutter",
        "use": "Left and right on all content"
      },
      {
        "value": "96px",
        "name": "Nav reserve",
        "use": "Scroll padding below content"
      },
      {
        "value": "8–10px",
        "name": "Rail gap",
        "use": "Between cards in a row"
      },
      {
        "value": "28px",
        "name": "Section gap",
        "use": "Between two rails"
      },
      {
        "value": "44px",
        "name": "Touch target",
        "use": "Minimum for every control"
      }
    ]
  }
}

export const COMPONENTS = {
  "intro": "Component library",
  "items": [
    {
      "name": "Button",
      "text": "Four variants cover the full hierarchy of a screen. The primary variant is the white gradient and the single highest-priority action in a view; subscribe carries the gold paywall label; secondary is the neutral alternative; ghost is for low-stakes dismissal.",
      "do": [
        "Keep exactly one primary button per screen — it is the anchor the eye lands on first.",
        "Pair Watch Free Episode (primary) with Subscribe Now (subscribe) in that order.",
        "Give full-width CTAs radius lg so they sit in the same family as the cards above them."
      ],
      "dont": [
        "Don't use gold as a button fill — gold is a label colour on a dark fill, never a background.",
        "Don't place two primary buttons side by side; demote one to secondary.",
        "Don't shrink a full-width CTA below size lg — it stops reading as the main action."
      ]
    },
    {
      "name": "Chip",
      "text": "One component covers category chips on Home, filter chips on Search and season chips on Detail. Shape carries the meaning: rounded chips navigate to a catalogue, pill chips filter the view you are already in.",
      "do": [
        "Show selection with the inset ring so the row keeps an even rhythm of fills.",
        "Keep the first filter chip as the unfiltered default and select it on entry.",
        "Let chip rows bleed past the screen gutter so a clipped chip signals more to scroll."
      ],
      "dont": [
        "Don't fill a selected chip with white — that weight belongs to the primary button.",
        "Don't mix pill and rounded chips in the same row.",
        "Don't wrap chips onto a second line in a scrolling rail."
      ]
    },
    {
      "name": "Badge",
      "text": "Small status markers with fixed meanings. The onMedia badge sits on artwork and carries its own scrim; premium is the only place the purple gradient appears; certification is the regulatory tag in the corner of a backdrop.",
      "do": [
        "Use onMedia for any badge that overlaps artwork so it stays legible on unpredictable images.",
        "Reserve premium for the Upgrade affordance on the subscription card.",
        "Keep certification badges bottom-left, where regional regulators expect them."
      ],
      "dont": [
        "Don't invent new tones — a new meaning needs a new token, not an ad-hoc colour.",
        "Don't stack more than one badge in the same corner of a card.",
        "Don't use premium to mean 'new' — gold and purple are not interchangeable."
      ]
    },
    {
      "name": "Card",
      "text": "The catalogue card. Its property names match the Figma component, so a spec and an implementation can be compared without translation: tags is the New Release pill, play is the corner wash and belowText toggles the caption.",
      "do": [
        "Pick the ratio by content type — 2:3 is the catalogue, 16:9 is a moment inside a title.",
        "Let the size ramp choose the width; the overlay scales are tied to it.",
        "Pass progress on a resumable card — it is the only thing that says you can carry on."
      ],
      "dont": [
        "Don't use circle outside 1:1; the crop assumes a square source and drops every badge.",
        "Don't expect a caption on 2:3 or 1:1 — those sets are bare artwork in Figma.",
        "Don't combine play with progress; the continue variant owns the centre of the card."
      ]
    },
    {
      "name": "Banner",
      "text": "The full-bleed promo, in three ratios. All three carry a 2px white border; the hero is its own composition with a blurred tag, title art and a larger action pair, while 16:9 and 1:1 share one bottom bar.",
      "do": [
        "Keep one banner per screen — a second competes with the first for the same job.",
        "Supply real title art named after the show and drop keyArt.",
        "Use hero at the top of a screen and the short ratios inside a rail."
      ],
      "dont": [
        "Don't put a banner and a large Card side by side; they read as the same weight.",
        "Don't stack the actions on 16:9 — only 1:1 does that, and only because it is square.",
        "Don't drop the 2px border; it is what separates the banner from the page on dark artwork."
      ]
    },
    {
      "name": "PosterCard",
      "text": "The 2:3 portrait card used by every rail and search grid. Set fluid to drop the fixed width so it can fill a three-column grid, and rank to render the oversized numeral used on Trending rows.",
      "do": [
        "Keep the 2:3 ratio fixed — the grid depends on every poster being the same shape.",
        "Use the crown for entitlement and the badge for recency; they answer different questions.",
        "Let the rank numeral overhang the bottom edge so it reads as a treatment, not a label."
      ],
      "dont": [
        "Don't add a title below a poster inside a grid; the key art carries the name.",
        "Don't combine rank with newRelease — two attention marks cancel each other out.",
        "Don't set a poster narrower than 96px; the badge stops fitting."
      ]
    },
    {
      "name": "LandscapeCard",
      "text": "The 16:9 continue-watching card. The progress track is the reason this shape exists — a title with no resume point belongs in a PosterCard instead.",
      "do": [
        "Always pass progress — the card is meaningless without a resume point.",
        "Keep the overflow menu on the card, not on a long-press, so it is discoverable.",
        "Use remaining time rather than percentage; it is what viewers actually decide on."
      ],
      "dont": [
        "Don't use this card for titles the viewer has not started.",
        "Don't hide the play affordance — it is the target most people aim for.",
        "Don't let the title wrap to two lines; truncate instead."
      ]
    },
    {
      "name": "Rail + SectionHeader",
      "text": "The pairing that builds the browse experience. The rail intentionally bleeds past the 16px screen gutter so a partially visible card signals that the row scrolls.",
      "do": [
        "Give every rail a header — an unlabelled row of posters has no meaning.",
        "Keep 16px between the header and the rail, and 28px between rails.",
        "Use the chevron only when there is a full collection page to open."
      ],
      "dont": [
        "Don't clip the rail to the gutter; the overflow is what communicates scrollability.",
        "Don't mix poster and landscape cards inside one rail.",
        "Don't nest a rail inside another horizontally scrolling container."
      ]
    },
    {
      "name": "ListRow",
      "text": "One row covering settings, account and any icon-title-subtitle list. Set bare to remove the card fill for lists that are separated by dividers rather than gaps.",
      "do": [
        "Write subtitles that say what the row contains, not what it is called again.",
        "Group rows into sets of three to five with 32px between groups.",
        "Keep the chevron whenever the row opens another screen."
      ],
      "dont": [
        "Don't put a switch and a chevron on the same row — pick one interaction.",
        "Don't let a title wrap; shorten the label instead.",
        "Don't mix bare and filled rows within a single group."
      ]
    },
    {
      "name": "SearchField",
      "text": "A single pill covering the empty, focused and submitted states of search. The quoted hint is an example query, not a label, and disappears the moment the viewer types.",
      "do": [
        "Keep the microphone visible in every state — voice is a primary entry path on mobile.",
        "Show the submitted query in quotes so results clearly belong to it.",
        "Keep the field pinned above the results while they scroll."
      ],
      "dont": [
        "Don't replace the placeholder with a long instruction.",
        "Don't remove the leading magnifier when the field has focus.",
        "Don't animate the field into the header; it stays a consistent target."
      ]
    },
    {
      "name": "TabBar",
      "text": "Evenly divided underline tabs used on the detail screen. The indicator is white, not gold — gold is reserved for the paywall, and position is not a paid feature.",
      "do": [
        "Divide the available width evenly so the tab row reads as one control.",
        "Keep Episodes first — it is what most viewers came for.",
        "Change only the content below the rule when a tab changes."
      ],
      "dont": [
        "Don't colour the active indicator gold.",
        "Don't use tabs for filtering; that is what chips are for.",
        "Don't exceed four tabs at 412px — labels start truncating."
      ]
    },
    {
      "name": "BottomNav + StatusBar",
      "text": "The navigation floats over content instead of docking to the edge, so artwork continues to the bottom of the display. It is absolutely positioned and expects a relative parent; screens reserve 96px beneath their content for it.",
      "do": [
        "Reserve 96px of scroll padding beneath page content so the last row clears the bar.",
        "Keep all five destinations visible at all times.",
        "Mark the active item with gold plus the glow — colour alone is not enough at this size."
      ],
      "dont": [
        "Don't add labels under the icons; the pill is sized for glyphs only.",
        "Don't hide the navigation on scroll — it is the only way back out of a screen.",
        "Don't reorder the destinations between screens."
      ]
    },
    {
      "name": "MetaRow + ProgressBar",
      "text": "MetaRow lays out the two metadata lines on a detail screen: ratings separated by vertical rules, catalogue facts separated by dots. ProgressBar is the 4px resume track.",
      "do": [
        "Put ratings on the first line and catalogue facts on the second.",
        "Keep the track at 30% white so it stays visible over any artwork.",
        "Centre both metadata lines under the title art."
      ],
      "dont": [
        "Don't mix rules and dots in one line.",
        "Don't exceed six facts on the catalogue line.",
        "Don't animate the progress track on first paint."
      ]
    },
    {
      "name": "CircleButton + Avatar",
      "text": "CircleButton is the round control that sits on artwork — back, add-to-list, play. Avatar is square-rounded on the profile picker and circular everywhere else.",
      "do": [
        "Always pass a label to CircleButton — the icon alone gives screen readers nothing.",
        "Keep overlay buttons at 34–40px so they clear the 44px touch target with their padding.",
        "Mark the active profile with the white ring, not by scaling the avatar."
      ],
      "dont": [
        "Don't put a solid CircleButton on a light area of artwork.",
        "Don't use square avatars outside the profile picker.",
        "Don't tint the avatar ring gold; that reads as a paid state."
      ]
    },
    {
      "name": "EmptyState",
      "text": "One illustration, one sentence of cause, one way out. Used on Downloads today and available to any screen that can legitimately hold nothing.",
      "do": [
        "Explain what will appear here once the viewer acts.",
        "Give exactly one action, styled as the primary button.",
        "Centre the block vertically in the available space."
      ],
      "dont": [
        "Don't apologise or blame the viewer for the empty screen.",
        "Don't offer two competing actions.",
        "Don't reuse a content illustration; empty states have their own greyscale set."
      ]
    }
  ]
}

export const TOKENS = {
  "intro": "One source, three formats",
  "notes": [
    "W3C Design Tokens (DTCG) format, which both the Figma Variables import plugins and Tokens Studio read. Two colour collections: primitive holds the raw ramp, semantic aliases it by reference, so repainting the product is a change to one primitive rather than to every screen. Download the file from the design system site, then open the plugin in Figma and choose Import.",
    "Gradients. Variables support only Color, Number, String and Boolean, so the three gradients are omitted from the file. Create them as Figma paint styles from the values on the Foundations page.",
    "Composite type styles. Each step of the type scale is exported as separate font.size, font.lineHeight and font.weight numbers. Build the Figma text styles on top of those numbers so the two stay linked.",
    "Drop this into src/index.css directly after @import 'tailwindcss'. Every token becomes a utility: bg-surface-2, text-text-secondary, rounded-2xl, text-title-16."
  ]
}
