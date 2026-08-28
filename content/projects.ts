export type Project = {
  slug: "de-kweker" | "kwartier-west";
  name: string;
  eyebrow: string;
  summary: string;
  liveUrl: string;
  image: string;
  imageAlt: string;
  ogImage: string;
};

export const projects: Record<Project["slug"], Project> = {
  "de-kweker": {
    slug: "de-kweker",
    name: "De Kweker",
    eyebrow: "Artist · media · live · booking",
    summary: "One official digital home for releases, live dates, media and booking.",
    liveUrl: "https://www.kwkr.be/",
    image: "/media/kwkr-hero.webp",
    imageAlt: "De Kweker digital platform",
    ogImage: "/media/kwkr-hero.webp"
  },
  "kwartier-west": {
    slug: "kwartier-west",
    name: "Kwartier West",
    eyebrow: "Collective · events · booking",
    summary: "A connected platform where Tekno and Hip hop keep their own way in.",
    liveUrl: "https://kwartierwest.be/",
    image: "/media/kwartier-west-og.webp",
    imageAlt: "Kwartier West platform",
    ogImage: "/media/kwartier-west-social.jpg"
  }
};
