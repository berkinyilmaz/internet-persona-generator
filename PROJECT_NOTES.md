# Day 29 — Internet Persona Generator

30 günde 30 proje serisinin 29. günü. Bir aesthetic seç, sana username + bio + renk paleti + traits + signature içeren tam bir "internet kimliği" üretsin.

---

## Konsept

Slidelardaki anlatı: internet seni zaten belirli bir "vibe" ile algılıyor. Bu proje, o vibe'ı oyuncak gibi keşfetmeni sağlıyor — bir aesthetic seçiyorsun, sistem o aesthetic'e özel **elle yazılmış** kelime havuzlarından bir online kimlik üretiyor. Rastgele kelime karışımı değil; her aesthetic'in kendi tonu, kendi tipografisi, kendi rengi var.

---

## Tasarım Dili (seri ile birebir)

`timestamp-converter` ve `nickname-generator` ile aynı:

- **Dark-first** zemin: `#0a0a0c` + üstte hafif radial gradient
- **Tek aksan rengi**: indigo `#6366f1` (kaydedilenler için pink `#f472b6` — `nickname-generator`'daki gibi)
- **Surface katmanları**: `--surface`, `--surface-2`, `--surface-hover` — yumuşak border + soft shadow
- **Köşeler**: 20px (büyük kartlar) / 14px (input/segment) / pill (CTA & etiketler)
- **Tipografi**: Inter (Google Fonts), monospace `@username` ve hex değerleri için
- **Micro-interactions**: 180ms ease — hover'da subtle translateY + glow
- **İkonlar**: thin-line SVG, 12–14px stroke 1.5–1.6
- **Pure CSS + CSS custom properties** (Tailwind YOK)

Persona kartı için ekstra: aksan-renkli sol-üst radial glow (`::before` ile), tipografide büyük mono username odak noktası, italik bio.

---

## Stack

| Katman | Seçim | Neden |
|---|---|---|
| Framework | React 19 + Vite 5 | Serideki standart |
| Styling | Pure CSS + design tokens | `timestamp-converter` ile aynı |
| State | `useState` + `useMemo` + `useCallback` | Tek dosyada yönetilebilir |
| Persistence | `localStorage` (saved personas) | Server yok |
| Font | Inter (400/500/600/700) | Seri stack'i |

---

## Özellikler

1. **10 aesthetic** (her birinde elle yazılmış havuzlar)
   - Dark Academia · Cottagecore · Y2K · Cyberpunk · Vaporwave · Minimalist · Soft Girl · Dreamcore · Goblincore · Coastal
2. **Username üretimi** — her aesthetic'in `prefixes / cores / suffixes` setine göre 5 farklı kombinasyon kalıbı
3. **Bio üretimi** — her aesthetic için 3 farklı kategoride 6+ cümle parçası, " · " ile birleşir
4. **Renk paleti** — aesthetic başına 3 farklı 4'lü palette, rastgele seçilir
5. **4 trait chip** — aesthetic'in havuzundan benzersiz seçim
6. **Signature satırı** — kısa motto / aura
7. **Surprise me** — rastgele aesthetic'e atlar
8. **Full persona copy** — tek tuşla hepsini panoya yazar
9. **Save & local persist** — en fazla 24 saved persona, `localStorage`'da
10. **Swatch tap-to-copy** — herhangi bir renk üzerine tıkla, hex panoya gider

---

## Mimari Notlar

### Dosya yapısı
```
internet-persona-generator/
├── index.html
├── package.json
├── vite.config.js
├── README.md
├── PROJECT_NOTES.md  ← bu dosya
└── src/
    ├── main.jsx        (React mount)
    ├── App.jsx         (tüm UI + üretim mantığı + aesthetic data)
    └── styles.css      (design tokens + komponent stilleri)
```

### Üretim algoritması
- `generateUsername(parts)` — 5 farklı mod arasında rastgele seçim (`prefix+core`, `core+suffix`, `core+num`, `prefix+core+suffix`, `core_core`)
- `generateBio(bioParts)` — 3 ayrı kategori havuzundan birer cümle parçası, " · " ile birleştirilir
- `pickUnique(arr, n)` — traits için tekrarsız seçim
- `generatePersona(aestheticId)` — yukarıdakileri birleştirip tam persona objesi döndürür

### Veri yapısı (her aesthetic için)
```js
{
  id, label, icon,
  aura,                           // alt başlık / mood
  palettes: [[hex,hex,hex,hex], ...],
  username: { prefixes, cores, suffixes },
  bioParts: [[...phrases1], [...phrases2], [...phrases3]],  // 3 kategori
  traits: [...],                  // chip havuzu
  signatures: [...],              // motto havuzu
}
```

### State şeması
```js
{
  aestheticId: 'dark-academia',   // aktif aesthetic
  persona: { ... } | null,        // mevcut üretilen persona
  saved: Persona[],               // localStorage senkronu (max 24)
  copied: boolean,                // copy feedback
  showSaved: boolean,             // saved panel açık mı
}
```

### Erişilebilirlik
- Tüm butonlarda `aria-label` veya görünür metin
- Aesthetic chip'lerde `aria-pressed`
- `:focus-visible` ile aksan-renkli focus ring
- Swatch'larda `title` ile hex bilgisi
- Klavye ile tam navigasyon

---

## Yapı / Bileşenler

- **Header** — başlık + Saved toggle (count pill ile)
- **Aesthetic grid** (5×2 desktop, 3×4 tablet, 2×5 mobile) — chip görünümünde aesthetic seçici + "Surprise me"
- **Persona card** — büyük, gradient surface, aksan glow
  - Aesthetic pill + aura
  - Büyük mono `@username` + alt başlık
  - Bio (italik tırnak içinde)
  - 4'lü swatch (tıklayınca hex kopya)
  - Trait chip'ler
  - Signature satırı
- **Action row** — Regenerate (primary) · Copy · Save · hint
- **Saved panel** (toggle ile açılır) — Clear all + grid (username + aesthetic + mini swatches + remove)
- **Credit footer**

---

## Tamamlandı / Test

- `npm install` — temiz (61 paket)
- `npm run build` — temiz (367ms, 10.43kB CSS gzip 2.62kB, 212.82kB JS gzip 68.44kB)
- `npm run dev` — port 5173 dolu olduğu için otomatik 5174'e düştü, **200 OK** döndü
- Responsive: 720px (3-col aesthetic grid) ve 600px (2-col, action stack) breakpoint'leri test edildi
- Klavye ile tam navigasyon mümkün

---

## Sonraki Adımlar (opsiyonel)

- Persona kartını PNG/SVG export — Instagram story formatında
- Profile picture / avatar üretimi (aesthetic renklerine göre gradient blob)
- "Cross-aesthetic" mode — iki aesthetic'i karıştırarak hibrit persona
- URL'de aestheticId + seed paylaşımı (kalıcı persona linkleri)
- Slide içerikleri için statik export sayfası
