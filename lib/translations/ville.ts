import type { Lang, Localized } from "@/lib/i18n"

export const villeStrings: Record<string, Record<Lang, string>> = {
  "ville.subtitle": {
    fr: "Construisez une ville parasismique avec un budget limité. Chaque choix compte.",
    kr: "Bati yon vil ki reziste tranblemanntè ak yon bidjè limite. Chak chwa enpòtan.",
    en: "Build a seismically resilient city on a limited budget. Every choice matters.",
    es: "Construya una ciudad antisísmica con presupuesto limitado. Cada decisión cuenta.",
  },
  "ville.step.soil": { fr: "Analyse du sol", kr: "Analiz tè", en: "Soil analysis", es: "Análisis del suelo" },
  "ville.step.zone": { fr: "Zonage", kr: "Zonaj", en: "Zoning", es: "Zonificación" },
  "ville.step.materials": { fr: "Matériaux", kr: "Materyèl", en: "Materials", es: "Materiales" },
  "ville.step.simulation": { fr: "Simulation", kr: "Similasyon", en: "Simulation", es: "Simulación" },
  "ville.budget": { fr: "Budget municipal", kr: "Bidjè minisipal la", en: "Municipal budget", es: "Presupuesto municipal" },
  "ville.tip.multi": {
    fr: "Astuce : maintenez Ctrl (ou Cmd) enfoncé et cliquez pour sélectionner plusieurs parcelles.",
    kr: "Ide: Kenbe Ctrl (oswa Cmd) epi klike pou chwazi plizyè tè.",
    en: "Tip: hold Ctrl (or Cmd) and click to select multiple parcels.",
    es: "Consejo: mantén Ctrl (o Cmd) y haz clic para seleccionar varias parcelas.",
  },
  "ville.tip.single": {
    fr: "Cliquez sur une parcelle pour la modifier.",
    kr: "Klike sou yon tè pou modifye l.",
    en: "Click a parcel to edit it.",
    es: "Haz clic en una parcela para modificarla.",
  },
  "ville.foundations": { fr: "Fondations et sols", kr: "Fondasyon ak tè", en: "Foundations and soils", es: "Cimentaciones y suelos" },
  "ville.selectParcels": {
    fr: "Sélectionnez une ou plusieurs parcelles sur la carte.",
    kr: "Chwazi youn oswa plizyè tè sou kat la.",
    en: "Select one or more parcels on the map.",
    es: "Seleccione una o más parcelas en el mapa.",
  },
  "ville.parcelsSelected": { fr: "parcelles sélectionnées", kr: "tè chwazi", en: "parcels selected", es: "parcelas seleccionadas" },
  "ville.infrastructure": { fr: "Infrastructures", kr: "Enfrastrikti", en: "Infrastructure", es: "Infraestructura" },
  "ville.selectBuild": {
    fr: "Sélectionnez une parcelle pour construire.",
    kr: "Chwazi yon tè pou konstwi.",
    en: "Select a parcel to build.",
    es: "Seleccione una parcela para construir.",
  },
  "ville.insufficientBudget": { fr: "Budget insuffisant", kr: "Bidjè pa sifi", en: "Insufficient budget", es: "Presupuesto insuficiente" },
  "ville.materialsNorms": { fr: "Matériaux et normes", kr: "Materyèl ak nòm", en: "Materials and standards", es: "Materiales y normas" },
  "ville.selectExisting": {
    fr: "Sélectionnez un bâtiment existant.",
    kr: "Chwazi yon bilding ki deja la.",
    en: "Select an existing building.",
    es: "Seleccione un edificio existente.",
  },
  "ville.buildFirst": {
    fr: "Construisez d'abord un bâtiment (Étape 2).",
    kr: "Konstwi yon bilding dabò (Etap 2).",
    en: "Build a building first (Step 2).",
    es: "Construya primero un edificio (Paso 2).",
  },
  "ville.seismicTest": { fr: "Test sismique", kr: "Tès tranblemanntè", en: "Seismic test", es: "Prueba sísmica" },
  "ville.buildingsBuilt": { fr: "Bâtiments construits", kr: "Bilding konstwi", en: "Buildings built", es: "Edificios construidos" },
  "ville.triggerQuake": { fr: "DÉCLENCHER LE SÉISME", kr: "DEKLANCHE TRANBLEMANNTÈ A", en: "TRIGGER EARTHQUAKE", es: "DISPARAR SISMO" },
  "ville.resetCity": { fr: "Réinitialiser la ville", kr: "Rekòmanse vil la", en: "Reset city", es: "Reiniciar ciudad" },
  "ville.postQuake": { fr: "Bilan post-sismique", kr: "Bilan apre tranblemanntè", en: "Post-earthquake report", es: "Informe post-sísmico" },
  "ville.intact": { fr: "Intacts", kr: "An entegrite", en: "Intact", es: "Intactos" },
  "ville.damaged": { fr: "Endommagés", kr: "Domaje", en: "Damaged", es: "Dañados" },
  "ville.collapsed": { fr: "Effondrés", kr: "Tonbe", en: "Collapsed", es: "Colapsados" },
  "ville.survived": {
    fr: "de votre ville a survécu au séisme.",
    kr: "nan vil ou a siviv tranblemanntè a.",
    en: "of your city survived the earthquake.",
    es: "de su ciudad sobrevivió al sismo.",
  },
  "ville.badChoices": {
    fr: "Attention : vos choix de matériaux ou de sols étaient inadaptés.",
    kr: "Atansyon: Chwa materyèl oswa tè ou yo pa te bon.",
    en: "Warning: your material or soil choices were unsuitable.",
    es: "Atención: sus elecciones de materiales o suelos eran inadecuadas.",
  },
  "ville.resistance": { fr: "Résistance", kr: "Rezistans", en: "Resistance", es: "Resistencia" },
  "ville.cost": { fr: "Coût", kr: "Pri", en: "Cost", es: "Costo" },
}

// Labels for soil/building/construct defs
export const villeLabels = {
  soil: {
    rock: { labelFr: "Roche (stable)", labelKr: "Wòch (solid)", labelEn: "Rock (stable)", labelEs: "Roca (estable)", descFr: "Fondation solide", descKr: "Fondasyon solid", descEn: "Solid foundation", descEs: "Cimentación sólida" },
    alluvial: { labelFr: "Alluvial (risque)", labelKr: "Aluvyal (risk)", labelEn: "Alluvial (risk)", labelEs: "Aluvial (riesgo)", descFr: "Liquéfaction possible", descKr: "Likifaksyon posib", descEn: "Possible liquefaction", descEs: "Posible licuefacción" },
    coastal: { labelFr: "Côtier (très haut)", labelKr: "Kòt (risk wo)", labelEn: "Coastal (very high)", labelEs: "Costero (muy alto)", descFr: "Liquéfaction certaine, tsunamis", descKr: "Likifaksyon sèten, tsunami", descEn: "Certain liquefaction, tsunamis", descEs: "Licuefacción segura, tsunamis" },
  },
  building: {
    school: { labelFr: "École", labelKr: "Lekòl", labelEn: "School", labelEs: "Escuela" },
    house: { labelFr: "Maison", labelKr: "Kay", labelEn: "House", labelEs: "Casa" },
    hospital: { labelFr: "Hôpital", labelKr: "Lopital", labelEn: "Hospital", labelEs: "Hospital" },
    market: { labelFr: "Marché", labelKr: "Mache", labelEn: "Market", labelEs: "Mercado" },
  },
  construct: {
    parasismique: { labelFr: "Béton armé parasismique", labelKr: "Beton arme ki reziste", labelEn: "Seismic reinforced concrete", labelEs: "Concreto armado antisísmico" },
    ciment: { labelFr: "Blocs ciment non armé", labelKr: "Blòk siman san fè", labelEn: "Unreinforced cement blocks", labelEs: "Bloques de cemento sin refuerzo" },
    bois: { labelFr: "Bois", labelKr: "Bwa", labelEn: "Wood", labelEs: "Madera" },
    adobe: { labelFr: "Adobe", labelKr: "Brik tè", labelEn: "Adobe", labelEs: "Adobe" },
  },
} as const

export const villeTeclaTips: Record<string, Localized> = {
  ciment: {
    fr: "⚠️ ERREUR FATALE : Blocs ciment non armé = effondrement assuré ! SOLUTION : Maçonnerie chaînée avec poteaux + poutres béton armé à CHAQUE niveau.",
    kr: "⚠️ ERÈ FATAL: Blòk siman san fè a = bilding la ap tonbe! SOLISYON: Masonri mare ak poto ak pout an beton arme nan CHAK nivo.",
    en: "⚠️ FATAL ERROR: Unreinforced cement blocks = certain collapse! SOLUTION: Confined masonry with reinforced concrete columns and beams at EVERY level.",
    es: "⚠️ ERROR FATAL: Bloques de cemento sin refuerzo = colapso seguro. SOLUCIÓN: Mampostería confinada con columnas y vigas de concreto armado en CADA nivel.",
  },
  adobe: {
    fr: "⚠️ TRÈS FRAGILE : Adobe + séisme = catastrophe. Vérifiez : sable salé ? Terre de mauvaise qualité ? SOLUTION : Clissage (bois + mortier terre) = élasticité naturelle.",
    kr: "⚠️ TRÈ FRAJIL: Brik tè + tranblemanntè = katastwòf. Verifye: sab sale? Tè pa bon kalite? SOLISYON: Klisaj (bwa + mortye tè) bay fleksibilite natirèl.",
    en: "⚠️ VERY FRAGILE: Adobe + earthquake = catastrophe. Check: salty sand? Poor-quality soil? SOLUTION: Clissage (wood + earth mortar) = natural flexibility.",
    es: "⚠️ MUY FRÁGIL: Adobe + sismo = catástrofe. Verifique: ¿arena salada? ¿Tierra de mala calidad? SOLUCIÓN: Clissage (madera + mortero de tierra) = flexibilidad natural.",
  },
  bois: {
    fr: "✓ BON : Le bois offre de la flexibilité. ATTENTION : Vérifiez les assemblages (clous vs rivets), ancrez la toiture solidement, pas de fers lisses !",
    kr: "✓ BON: Bwa bay fleksibilite. ATANSYON: Verifye ansanblaj yo (klo vs rivet), fè tèt kay la solid, pa itilize fè lis!",
    en: "✓ GOOD: Wood offers flexibility. WARNING: Check connections (nails vs rivets), anchor the roof firmly, no smooth rebar!",
    es: "✓ BIEN: La madera ofrece flexibilidad. ATENCIÓN: Verifique uniones (clavos vs remaches), ancle bien el techo, ¡sin varillas lisas!",
  },
  parasismique: {
    fr: "✅ EXCELLENT ! Maçonnerie chaînée + béton armé de qualité = protection maximale. Vérifiez : béton compact, fers striés, pas de sable salé.",
    kr: "✅ EKSELAN! Masonri mare + bon beton arme = pwoteksyon maksimòm. Verifye: beton konpak, fè estriye, pa gen sab sale.",
    en: "✅ EXCELLENT! Confined masonry + quality reinforced concrete = maximum protection. Check: compact concrete, ribbed rebar, no salty sand.",
    es: "✅ ¡EXCELENTE! Mampostería confinada + concreto armado de calidad = máxima protección. Verifique: concreto compacto, varillas corrugadas, sin arena salada.",
  },
  null: { fr: "", kr: "", en: "", es: "" },
}
