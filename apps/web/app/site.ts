// Set SITE_URL in deployment if the public site uses a different domain.
export const siteUrl = (process.env.SITE_URL || "https://www.axisvisuallab.com").replace(/\/$/, "");

export const siteDescription =
  "Axis Visual Lab builds websites, apps and custom tech, and offers video editing and graphic design to help ideas stand out.";
