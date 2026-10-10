// Match the primary domain configured in hosting (the apex redirects to www).
export const siteUrl = (process.env.SITE_URL || "https://www.gryffindorlab.com").replace(/\/$/, "");

export const siteDescription =
  "Gryffindor Lab builds websites, apps and custom tech, and offers video editing and graphic design to help ideas stand out.";
