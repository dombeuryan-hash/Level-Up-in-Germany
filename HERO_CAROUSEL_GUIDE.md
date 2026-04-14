# 🎬 Hero Carousel Guide - Level Up in Germany

## 📋 Ce qui a été créé

✅ **Component**: `src/components/HeroCarousel.tsx`
- Carousel automatique avec transitions fade douces
- Filtre rouge dynamique overlay
- Responsive (mobile, tablet, desktop)
- Optimisé Next.js 14 avec Image component
- TypeScript pour la sécurité des types

✅ **Photos**: Copiées automatiquement vers `public/` (9 photos HPQ)

---

## 🚀 Comment utiliser le composant

### **Option 1 : Page dédiée (Recommandé)**

Crée une page nouvelle ou modifie ta page d'accueil :

```tsx
// src/app/page.tsx
import HeroCarousel from '@/components/HeroCarousel';

export default function Home() {
  return (
    <>
      <HeroCarousel
        title="1ER SALON BUSINESS ET SOCIO-CULTUREL DE LA DIASPORA CAMEROUNAISE D'EUROPE"
        subtitle="La billetterie est ouverte !!!"
        autoplayInterval={5000}
        redOpacity={0.4}
      />
      
      {/* Ton reste du contenu */}
      {/* ... autres sections ... */}
    </>
  );
}
```

### **Option 2 : Personnalisation avancée**

```tsx
<HeroCarousel
  title="Ton titre custom"
  subtitle="Ton sous-titre"
  autoplayInterval={4000}      // Vitesse du carousel (ms)
  redOpacity={0.5}              // Intensité du filtre rouge (0-1)
/>
```

**Props disponibles** :
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | string | Message long | Le titre principal |
| `subtitle` | string | "La billetterie est ouverte !!!" | Le sous-titre avec emoji |
| `autoplayInterval` | number | 5000 | Délai entre chaque slide (ms) |
| `redOpacity` | number | 0.4 | Intensité du filtre rouge (0 = transparent, 1 = opaque) |

---

## 🎨 Personnalisations possibles

### **Changer la vitesse**
```tsx
<HeroCarousel autoplayInterval={3000} />  // 3 secondes
```

### **Augmenter/diminuer le filtre rouge**
```tsx
<HeroCarousel redOpacity={0.6} />  // Plus intense
<HeroCarousel redOpacity={0.2} />  // Plus discret
```

### **Ajouter des indicateurs de slides (dots)**

Décommente les lignes du composant (ligne ~85-100) pour ajouter des points de navigation.

---

## 📸 Photos disponibles

Toutes les 9 photos du salon sont déjà chargées :

```
_DSC8917.JPG
_DSC8964.JPG
_DSC8987.JPG
_DSC9047.JPG
_DSC9106.JPG
_DSC9111.JPG
_DSC9121.JPG
_DSC9136.JPG
_DSC9141.JPG
```

**Pour ajouter plus de photos** :
1. Place-les dans `public/`
2. Ajoute le chemin dans le tableau `images` du composant :
```tsx
const images = [
  '/_DSC8917.JPG',
  // ... autres photos ...
  '/ta-nouvelle-photo.JPG',  // ← Ajoute ici
];
```

---

## ⚙️ Stack utilisé

- **Next.js 14** : App Router
- **React 18** : Composant fonctionnel avec hooks
- **Tailwind CSS** : Styling responsive
- **TypeScript** : Types sécurisés
- **Next Image** : Optimisation automatique

---

## 🎯 Fonctionnalités

✅ **Fade transitions** : Images s'estompent doucement (1s)
✅ **Autoplay** : Défile automatiquement
✅ **Responsive** : Adapté tous les écrans
✅ **Optimisé** : Images compressées automatiquement par Next.js
✅ **Accessible** : Alt text et ARIA labels
✅ **Performance** : Image prioritaire pour la 1ère slide
✅ **TypeScript** : Type-safe avec PropTypes

---

## 🔧 Troubleshooting

### **Les photos ne s'affichent pas**
→ Vérifie que les fichiers sont bien dans `/public/`
→ Redémarre le serveur dev : `npm run dev`

### **Filtre rouge pas assez visible**
→ Augmente `redOpacity` (ex: `redOpacity={0.6}`)

### **Carousel trop rapide/lent**
→ Modifie `autoplayInterval` (5000 = 5 secondes)

### **Texte pas assez visible**
→ Le `drop-shadow-lg` ajoute une ombre. Si besoin, ajoute une toile de fond supplémentaire.

---

## 📞 Next Steps

1. ✅ Importe le composant dans ta page
2. ✅ Customise le titre/sous-titre
3. ✅ Teste les animations (fade)
4. ✅ Ajuste le filtre rouge à ton goût
5. ✅ Ajoute tes propres sections après le carousel

---

**Créé le** : 2026-04-14
**Version** : 1.0
**Status** : ✅ Production Ready
