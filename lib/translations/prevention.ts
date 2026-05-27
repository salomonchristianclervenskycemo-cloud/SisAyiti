import type { Lang } from "@/lib/i18n"

type L = Record<Lang, string>

export const preventionItems = {
  bese: [
    { id: 1, icon: "⬇️", title: { fr: "Baissez-vous immédiatement", kr: "Bese tèt ou imedyatman", en: "Drop down immediately", es: "Agáchate de inmediato" } satisfies L, description: { fr: "Évitez les chutes d'objets — cause majeure de blessures immédiates. Accroupissez-vous sur les genoux.", kr: "Evite objè ki tonbe — se sa ki fè pi plis blesi. Akwoupi sou jenou ou.", en: "Avoid falling objects — a major cause of immediate injury. Kneel down.", es: "Evite objetos que caen — causa principal de lesiones. Agáchate sobre las rodillas." } satisfies L },
    { id: 2, icon: "🛡️", title: { fr: "Protégez votre tête", kr: "Pwoteje tèt ou", en: "Protect your head", es: "Protege tu cabeza" } satisfies L, description: { fr: "Couvrez votre tête et vos épaules avec vos mains, un coussin ou un sac à dos.", kr: "Kouvri tèt ak zepòl ou ak men ou, yon kousen, oswa yon sak do.", en: "Cover your head and shoulders with your hands, a cushion, or a backpack.", es: "Cubre cabeza y hombros con las manos, un cojín o una mochila." } satisfies L },
    { id: 3, icon: "🚫", title: { fr: "Restez où vous êtes", kr: "Rete kote ou ye", en: "Stay where you are", es: "Quédate donde estás" } satisfies L, description: { fr: "Ne courez pas et ne sautez pas. Les mouvements brusques peuvent être dangereux.", kr: "Pa kouri, pa sote. Mouvman brus yo ka danjere.", en: "Do not run or jump. Sudden movement can be dangerous.", es: "No corras ni saltes. Los movimientos bruscos pueden ser peligrosos." } satisfies L },
  ],
  pwoteje: [
    { id: 4, icon: "🪑", title: { fr: "Sous une table solide", kr: "Anba yon tab solid", en: "Under a sturdy table", es: "Bajo una mesa sólida" } satisfies L, description: { fr: "Si possible, cherchez une table robuste. Restez dessous jusqu'à la fin des secousses.", kr: "Si posib, chèche yon tab solid. Rete anba li jiskaske sekou yo fini.", en: "If possible, get under a sturdy table. Stay there until shaking stops.", es: "Si es posible, busca una mesa resistente. Quédate hasta que cese la sacudida." } satisfies L },
    { id: 5, icon: "🏗️", title: { fr: "Contre un mur porteur", kr: "Kont yon mi sipò", en: "Against a load-bearing wall", es: "Contra un muro portante" } satisfies L, description: { fr: "Un mur porteur central (béton armé). Évitez les murs extérieurs faibles.", kr: "Yon mi sipò santral (beton arme). Evite mi deyò ki fèb.", en: "A central load-bearing wall (reinforced concrete). Avoid weak exterior walls.", es: "Un muro portante central (concreto armado). Evita muros exteriores débiles." } satisfies L },
    { id: 6, icon: "⚠️", title: { fr: "❌ NE PAS sortir pendant les secousses", kr: "❌ PA SOTI pandan sekou yo", en: "❌ Do NOT go outside during shaking", es: "❌ NO salgas durante la sacudida" } satisfies L, description: { fr: "Les débris (briques, tuiles, verre) tombent de haut. Vous êtes plus en sécurité à l'intérieur.", kr: "Debris (brik, twal, vè) tonbe soti anlè. Ou pi an sekirite andedan.", en: "Debris (bricks, tiles, glass) falls from above. You are safer indoors.", es: "Los escombros (ladrillos, tejas, vidrio) caen desde arriba. Estás más seguro adentro." } satisfies L },
    { id: 7, icon: "🪟", title: { fr: "❌ NE PAS vous approcher des fenêtres", kr: "❌ PA PWOCHE fenèt yo", en: "❌ Do NOT go near windows", es: "❌ NO te acerques a las ventanas" } satisfies L, description: { fr: "Le verre se brise et vole en éclats. Restez à l'écart des vitres.", kr: "Vè kraze epi vole an moso. Rete lwen vit yo.", en: "Glass shatters and flies. Stay away from windows.", es: "El vidrio se rompe y salta. Aléjate de las ventanas." } satisfies L },
    { id: 8, icon: "🧱", title: { fr: "❌ NE PAS rester près des murs de clôture", kr: "❌ PA RETE pre mi kloti yo", en: "❌ Do NOT stay near boundary walls", es: "❌ NO te quedes cerca de muros perimetrales" } satisfies L, description: { fr: "Les murs de clôture extérieurs s'effondrent facilement. Danger grave.", kr: "Mi kloti deyò tonbe fasilman. Gwo danje.", en: "Exterior boundary walls collapse easily. Serious danger.", es: "Los muros perimetrales colapsan fácilmente. Peligro grave." } satisfies L },
  ],
  kenbe: [
    { id: 9, icon: "💪", title: { fr: "Restez accroché(e) fermement", kr: "Kenbe fèm", en: "Hold on firmly", es: "Agárrate con firmeza" } satisfies L, description: { fr: "Ne lâchez prise que lorsque TOUTES les secousses ont cessé. Des répliques peuvent suivre.", kr: "Pa lage priz ou jiskaske TOUT sekou yo fini. Replik ka vini apre.", en: "Do not let go until ALL shaking has stopped. Aftershocks may follow.", es: "No sueltes hasta que TODA la sacudida haya cesado. Pueden venir réplicas." } satisfies L },
    { id: 10, icon: "⏱️", title: { fr: "Ondes P vs S et de surface", kr: "Vag P vs S ak sou sifas", en: "P-waves vs S and surface waves", es: "Ondas P vs S y superficiales" } satisfies L, description: { fr: "Ondes P (rapides, ~10 s) = peu destructrices. Ondes S + surface (lentes, ~30–60 s) = DÉGÂTS MAJEURS.", kr: "Vag P (rapid, ~10 segonn) pa twò destriktif. Vag S + sou sifas (~30–60 segonn) fè GWO domaj.", en: "P-waves (fast, ~10 s) = less destructive. S + surface waves (slow, ~30–60 s) = MAJOR damage.", es: "Ondas P (rápidas, ~10 s) = poco destructivas. S + superficiales (~30–60 s) = DAÑOS MAYORES." } satisfies L },
    { id: 11, icon: "💨", title: { fr: "Restez calme et respirez", kr: "Rete kalm epi respire", en: "Stay calm and breathe", es: "Mantén la calma y respira" } satisfies L, description: { fr: "La panique augmente les erreurs. Respirez profondément. Vous augmentez vos chances de survie.", kr: "Panik ogmante erè. Respire fon. Ou ogmante chans ou gen pou siviv.", en: "Panic increases mistakes. Breathe deeply. You improve your chances of survival.", es: "El pánico aumenta los errores. Respira profundo. Mejoras tus chances de supervivencia." } satisfies L },
  ],
  dangers: [
    { id: 12, icon: "⚠️", title: { fr: "Murs de clôture extérieurs", kr: "Mi kloti deyò", en: "Exterior boundary walls", es: "Muros perimetrales exteriores" } satisfies L, description: { fr: "S'effondrent très facilement pendant un séisme. Gardez une distance minimale.", kr: "Yo tonbe fasilman pandan tranblemanntè. Rete lwen yo.", en: "Collapse very easily during earthquakes. Keep minimum distance.", es: "Colapsan muy fácilmente durante un sismo. Mantén distancia mínima." } satisfies L },
    { id: 13, icon: "🏔️", title: { fr: "Mornes déforestés", kr: "Mòn deforeste", en: "Deforested hillsides", es: "Laderas deforestadas" } satisfies L, description: { fr: "Glissements de terrain amplifiés par les ondes sismiques. Danger grave en zones montagneuses.", kr: "Glisman tè ogmante ak sekou yo. Gwo danje nan zòn mòn.", en: "Landslides amplified by seismic waves. Serious danger in mountainous areas.", es: "Deslizamientos amplificados por las ondas sísmicas. Peligro grave en zonas montañosas." } satisfies L },
    { id: 14, icon: "🌊", title: { fr: "Liquéfaction en zones côtières", kr: "Likifaksyon sou kòt yo", en: "Liquefaction in coastal zones", es: "Licuefacción en zonas costeras" } satisfies L, description: { fr: "Sols saturés d'eau (Port-au-Prince, plaines côtières) perdent leur capacité portante.", kr: "Tè ki plen dlo (Pòtoprens, plenn sou kòt) pèdi fòs li pou sipòte.", en: "Water-saturated soils (Port-au-Prince, coastal plains) lose bearing capacity.", es: "Suelos saturados (Puerto Príncipe, llanuras costeras) pierden capacidad portante." } satisfies L },
    { id: 15, icon: "🔥", title: { fr: "Incendies post-sismiques", kr: "Dife apre tranblemanntè", en: "Post-earthquake fires", es: "Incendios post-sísmicos" } satisfies L, description: { fr: "Réchauds à charbon renversés. Gaz/électricité rompus. Préparez l'après-séisme.", kr: "Recho charbon tonbe. Gaz/elektrisite koupe. Prepare apre tranblemanntè a.", en: "Overturned charcoal stoves. Broken gas/electric lines. Prepare for the aftermath.", es: "Estufas de carbón volcadas. Gas/electricidad rotos. Prepárate para el aftermath." } satisfies L },
  ],
  kit: [
    { id: 16, icon: "💧", title: { fr: "Eau potable (3 jours)", kr: "Dlo potab (3 jou)", en: "Drinking water (3 days)", es: "Agua potable (3 días)" } satisfies L, description: { fr: "Au moins 3 litres par personne et par jour.", kr: "Omwen 3 lit pa moun pa jou.", en: "At least 3 liters per person per day.", es: "Al menos 3 litros por persona al día." } satisfies L },
    { id: 17, icon: "🥫", title: { fr: "Nourriture non périssable", kr: "Manje ki pa gate", en: "Non-perishable food", es: "Alimentos no perecederos" } satisfies L, description: { fr: "Conserves, barres énergétiques, ouvre-boîte manuel.", kr: "Manje nan bwat, ba enèji, ouvè-bwat manyèl.", en: "Canned food, energy bars, manual can opener.", es: "Enlatados, barras energéticas, abrelatas manual." } satisfies L },
    { id: 18, icon: "⚕️", title: { fr: "Trousse de premiers soins", kr: "Kit premye swen", en: "First aid kit", es: "Botiquín de primeros auxilios" } satisfies L, description: { fr: "Pansements, antiseptique, médicaments personnels.", kr: "Pansman, antiseptik, medikaman pèsonèl.", en: "Bandages, antiseptic, personal medications.", es: "Vendajes, antiséptico, medicamentos personales." } satisfies L },
    { id: 19, icon: "🔦", title: { fr: "Lampe de poche et radio", kr: "Flach ak radyo", en: "Flashlight and radio", es: "Linterna y radio" } satisfies L, description: { fr: "Avec piles de rechange ou à manivelle.", kr: "Ak pil rezèv oswa a manivèl.", en: "With spare batteries or hand-crank.", es: "Con pilas de repuesto o de manivela." } satisfies L },
    { id: 20, icon: "📣", title: { fr: "Sifflet", kr: "Siflè", en: "Whistle", es: "Silbato" } satisfies L, description: { fr: "Pour signaler votre présence si vous êtes bloqué.", kr: "Pou siyalize prezans ou si ou bloke.", en: "To signal your location if trapped.", es: "Para señalar tu ubicación si quedas atrapado." } satisfies L },
  ],
} as const

export const preventionStrings: Record<string, Record<Lang, string>> = {
  "prev.subtitleLong": {
    fr: "La formule de survie : Bese (baisse-toi), Pwoteje (protège-toi), Kenbe (accroche-toi). Ces trois gestes réflexes sauvent des vies.",
    kr: "Fòmil siviv: Bese, Pwoteje, Kenbe. Twa jès sa yo sove lavi.",
    en: "The survival formula: Drop, Cover, Hold On. These three reflex actions save lives.",
    es: "La fórmula de supervivencia: Agáchate, Cúbrete, Agárrate. Estos tres gestos salvan vidas.",
  },
  "prev.tab.bese": { fr: "BESE (Baisse-toi)", kr: "BESE (Bese)", en: "DROP (Get down)", es: "AGÁCHATE" },
  "prev.tab.pwoteje": { fr: "PWOTEJE (Protège-toi)", kr: "PWOTEJE (Pwoteje)", en: "COVER (Protect yourself)", es: "CÚBRETE" },
  "prev.tab.kenbe": { fr: "KENBE (Accroche-toi)", kr: "KENBE (Kenbe fèm)", en: "HOLD (Hold on)", es: "AGÁRRATE" },
  "prev.tab.dangers": { fr: "Dangers locaux", kr: "Danje lokal", en: "Local hazards", es: "Peligros locales" },
  "prev.tab.kit": { fr: "Kit de survie", kr: "Kit siviv", en: "Survival kit", es: "Kit de supervivencia" },
  "prev.progress.kit": { fr: "Préparation du kit", kr: "Preparasyon kit la", en: "Kit preparation", es: "Preparación del kit" },
  "prev.progress.gestures": { fr: "Maîtrise des gestes", kr: "Metriz jès yo", en: "Mastering the actions", es: "Dominio de los gestos" },
  "prev.progress.hint": {
    fr: "{done} sur {total} élément(s) complété(s) · Cliquez sur les cartes pour valider",
    kr: "{done} sou {total} eleman konplete · Klike sou kat yo pou valide",
    en: "{done} of {total} item(s) completed · Click cards to check off",
    es: "{done} de {total} elemento(s) completado(s) · Haz clic en las tarjetas para marcar",
  },
  "prev.reminder.title": { fr: "Rappel important", kr: "Rapèl enpòtan", en: "Important reminder", es: "Recordatorio importante" },
  "prev.reminder.body": {
    fr: "Ces consignes s'appliquent PENDANT le séisme. AVANT : préparez-vous (kit d'urgence, zones sûres). APRÈS : vérifiez les dégâts, écoutez les autorités, aidez les voisins.",
    kr: "Konsiy sa yo pou PANDAN tranblemanntè a. ANVAN: prepare tèt ou (kit ijan, zòn ki an sekirite). APRE: verifye domaj, koute otorite yo, ede vwazen yo.",
    en: "These instructions apply DURING the earthquake. BEFORE: prepare (emergency kit, safe zones). AFTER: check damage, listen to authorities, help neighbors.",
    es: "Estas instrucciones aplican DURANTE el sismo. ANTES: prepárate (kit de emergencia, zonas seguras). DESPUÉS: verifica daños, escucha autoridades, ayuda a vecinos.",
  },
}
