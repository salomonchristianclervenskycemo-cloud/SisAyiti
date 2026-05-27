export type ModuleId =
  | "home"
  | "comprendre"
  | "labo"
  | "ville"
  | "carte"
  | "prevention"
  | "multirisques"
  | "diagnostic"
  | "actualite"

/** URL slug for each module (home = root `/`). */
export const MODULE_SLUGS: Record<ModuleId, string> = {
  home: "",
  comprendre: "comprendre",
  labo: "labo",
  ville: "ville",
  carte: "carte",
  prevention: "prevention",
  multirisques: "multirisques",
  diagnostic: "diagnostic",
  actualite: "actualite",
}

const SLUG_TO_MODULE = Object.fromEntries(
  (Object.entries(MODULE_SLUGS) as [ModuleId, string][])
    .filter(([, slug]) => slug !== "")
    .map(([id, slug]) => [slug, id])
) as Record<string, ModuleId>

export function moduleFromSlug(slug: string | undefined): ModuleId | null {
  if (!slug) return "home"
  return SLUG_TO_MODULE[slug] ?? null
}

export function slugFromModule(module: ModuleId): string {
  const slug = MODULE_SLUGS[module]
  return slug ? `/${slug}` : "/"
}

export function isModuleId(value: string): value is ModuleId {
  return value in MODULE_SLUGS
}
