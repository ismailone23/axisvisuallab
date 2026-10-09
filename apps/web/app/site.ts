// Set SITE_URL in deployment if the public site uses a different domain.
export const siteUrl = (process.env.SITE_URL || "https://gryffindorlab.com").replace(/\/$/, "");

export const siteDescription =
  "Gryffindor Lab builds websites, apps and custom tech, and offers video editing and graphic design to help ideas stand out.";
