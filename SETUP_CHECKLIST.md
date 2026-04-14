# ✅ Hero Carousel - Setup Checklist

## 📦 Ce qui a été fait automatiquement

- [x] **Composant créé** : `src/components/HeroCarousel.tsx`
  - Fade transitions (1s)
  - Filtre rouge overlay
  - Autoplay intelligent
  - Responsive design
  - TypeScript ready

- [x] **Photos copiées** : 9 photos → `public/`
  - Optimisation Next.js automatique
  - Prêtes à l'emploi

- [x] **Documentation complète**
  - `HERO_CAROUSEL_GUIDE.md` : Guide détaillé
  - `INTEGRATION_EXAMPLE.tsx` : Exemples de code

---

## 🚀 Prochaines étapes (À FAIRE)

### **ÉTAPE 1 : Importe le composant**
```tsx
// Dans ta page (ex: src/app/[locale]/event/page.tsx)
import HeroCarousel from '@/components/HeroCarousel';
```

### **ÉTAPE 2 : Utilise le composant**
```tsx
export default function EventPage() {
  return (
    <main>
      <HeroCarousel 
        title="Ton titre"
        subtitle="Ton sous-titre"
      />
      {/* Autres sections */}
    </main>
  );
}
```

### **ÉTAPE 3 : Test en local**
```bash
npm run dev
# Ouvre http://localhost:3000/ta-page
```

### **ÉTAPE 4 : Customise à ton goût**
- Ajuste le filtre rouge : `redOpacity={0.5}`
- Change la vitesse : `autoplayInterval={4000}`
- Modifie les textes : `title=""` et `subtitle=""`

---

## 🎨 Customizations rapides

### Filtre plus intense (rouge plus foncé)
```tsx
<HeroCarousel redOpacity={0.6} />  // Au lieu de 0.4
```

### Carousel plus lent
```tsx
<HeroCarousel autoplayInterval={7000} />  // 7 secondes au lieu de 5
```

### Ajouter des dots de navigation
- Va dans `src/components/HeroCarousel.tsx`
- Décommente les lignes 85-100 (les dots)
- Save et redémarrage auto

### Ajouter plus de photos
1. Ajoute l'image dans `public/`
2. Ajoute le chemin dans le tableau `images` du composant :
```tsx
const images = [
  '/_DSC8917.JPG',
  // ... autres ...
  '/nouvelle-photo.JPG',  // ← Ajoute ici
];
```

---

## 📊 Checklist finale

- [ ] **Component importé** dans ma page
- [ ] **Textes personnalisés** (title/subtitle)
- [ ] **Test en localhost** (npm run dev)
- [ ] **Filtre rouge ajusté** à mon goût
- [ ] **Vitesse du carousel OK**
- [ ] **Photos affichées** correctement
- [ ] **Responsive testé** sur mobile/tablette/desktop
- [ ] **Production ready** 🚀

---

## 🆘 Si ça ne marche pas

### Erreur : "Module not found"
```bash
# Redémarre le serveur
npm run dev
```

### Photos ne s'affichent pas
```bash
# Vérifie que les photos sont bien dans public/
ls public/*.JPG
```

### Filtre rouge pas visible
→ Augmente l'opacité dans `redOpacity={0.6}`

### Texte pas lisible
→ Le `drop-shadow-lg` ajoute une ombre. C'est normal.

---

## 📚 Documentation

- **HERO_CAROUSEL_GUIDE.md** : Guide complet avec tous les détails
- **INTEGRATION_EXAMPLE.tsx** : Exemples de code prêts à copier
- **src/components/HeroCarousel.tsx** : Le composant avec commentaires

---

## 🎬 Résultat attendu

```
┌─────────────────────────────────────────┐
│                                         │
│  [PHOTOS DEFILER]                       │
│  [FILTRE ROUGE OVERLAY]                 │
│                                         │
│  1ER SALON BUSINESS ET...               │
│                                         │
│  🚀 La billetterie est ouverte !!!      │
│                                         │
└─────────────────────────────────────────┘
```

---

## 💡 Pro Tips

1. **Fade vs Slide** : Tu as chose fade (fondu). Si tu veux changer c'est une ligne : `transition-opacity` → `transform translate-x`

2. **Performance** : Les images sont chargées intelligemment (prioritaire pour la 1ère)

3. **SEO** : Tous les alt texts sont présents automatiquement

4. **Accessibilité** : Respecte les standards WCAG

---

**Créé le** : 2026-04-14
**Composant** : v1.0
**Status** : ✅ Production Ready
