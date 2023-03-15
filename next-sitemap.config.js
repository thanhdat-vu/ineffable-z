module.exports = {
  siteUrl: "https://ineffable-z.vercel.app",
  generateRobotsTxt: true,
  exclude: ["/search"],
  async additionalSitemaps() {
    return [];
  },
};
