export type NavigationLink = {
  label: string;
  href: string;
  external?: boolean;
};
export const footerNavigation: { title: string; links: NavigationLink[] }[] = [
  {
    title: "Conference",
    links: [
      { label: "Theme Details", href: "/theme" },
      { label: "Committee Topics", href: "/topics" },
      { label: "Transportation", href: "/transportation" },
      { label: "Schedule", href: "/schedule" },
      { label: "About BISZMUN", href: "/about" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
  {
    title: "Participate",
    links: [
      { label: "Eligibility", href: "/eligibility" },
      { label: "Fees", href: "/fees" },
      { label: "Registration", href: "/registration" },
      { label: "My BISZMUN", href: "https://my.biszmun.org", external: true },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Participant Handbook", href: "" },
      { label: "Guide", href: "" },
      { label: "Rules", href: "" },
      { label: "FAQs", href: "" },
    ],
  },
];
