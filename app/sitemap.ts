import type { MetadataRoute } from "next";

const routes = ["", "/precios", "/metodologia", "/app/mapa", "/contacto", "/terminos", "/privacidad"];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://rentiq-ten.vercel.app";
  const now = new Date();

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/precios" ? 0.9 : 0.6
  }));
}
