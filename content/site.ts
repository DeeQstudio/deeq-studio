export const site = {
  name: "DeeQ Studio",
  url: "https://deeqstudio.com",
  email: "info@deeqstudio.com",
  location: "Bruges, Belgium",
  description: "Independent web design and creative development studio in Bruges, Belgium.",
} as const;

export const navigation = [
  { href: "/work", label: "Work" },
  { href: "/services", label: "What we do" },
  { href: "/process", label: "How it works" },
] as const;
