# Interests photos

Each folder here is one section of the Interests page (`/interests`), and
every image in a folder shows up in that section's slideshow.

| Folder        | Section     |
| ------------- | ----------- |
| `books/`      | Books       |
| `games/`      | Video games |
| `basketball/` | Basketball  |
| `movies/`     | Movies      |

## Adding or removing photos

Drop an image file into the folder, or delete one. That's it: there's no
list to update. The site picks the files up the next time it's built (or
straight away while `npm run dev` is running).

A folder with no images shows "Photos coming soon". A folder with one image
shows it on its own, without the arrows and dots.

## Supported formats

`.jpg`, `.jpeg`, `.png`, `.webp`, `.avif` and `.gif` (upper or lower case).
Anything else in a folder, like this README or `.gitkeep`, is ignored.

## Choosing the order

Photos appear in filename order. Start each name with a number to control
it, for example:

```
01-golden-son.jpg
02-morning-star.jpg
10-dark-age.jpg
```

Numbers are compared as numbers, so `2-` comes before `10-`.

## Alt text comes from the filename

The description screen readers announce is made from the filename, with the
number, the extension and the dashes or underscores removed. So
`01-golden-son-cover.jpg` is described as "golden son cover". Give files
names that say what's in the picture rather than `IMG_2034.jpg`.

## What size works best

- **Any shape, up to about 1200px on the longest side.** The frame is a
  square (1:1, up to 560px wide), and every picture shows in full inside
  it, never cropped. A square one fills the frame; a landscape one sits in
  the middle with empty space above and below, and a tall one with empty
  space at the sides. That space is the page's background colour, so it
  blends in, in light and dark mode. Anything much smaller than about
  560px on its longest side may look soft.
- **Under ~500KB** each. Exporting as `.webp` or `.jpg` at around 80% quality
  usually gets there.
- Photos show with **no caption**. The filename only becomes the alt text
  (see above), which screen readers announce but isn't shown on the page.

## Adding a new interest

1. Create a new folder here, e.g. `music/`, and put photos in it.
2. Add one line to `src/components/interests/interests.config.ts`:
   `{ slug: 'music', title: 'Music' },`. The position in that list is the
   position on the page.

To remove an interest, delete its line (and the folder, if you like).
