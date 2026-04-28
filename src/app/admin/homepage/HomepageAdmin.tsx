'use client';

import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import SiteConfigAdmin from './SiteConfigAdmin';

// ── Constants ──────────────────────────────────────────────────────────────────

const SITE_ROUTES = [
  { label: 'Accueil', value: '/' },
  { label: 'À propos', value: '/about' },
  { label: 'Événements', value: '/events' },
  { label: 'Conférence annuelle', value: '/annual-conference' },
  { label: 'Workshops', value: '/programme/workshops' },
  { label: 'Mentoring', value: '/programme/mentoring' },
  { label: 'Partenaires', value: '/partners' },
  { label: 'Contact', value: '/contact' },
  { label: 'Newsletter', value: '/newsletter' },
  { label: 'Devenir membre', value: '/membership' },
  { label: 'Blog & Impact', value: '/blog-impact' },
  { label: 'Rejoindre', value: '/join' },
  { label: 'Services', value: '/services' },
  { label: 'Sponsor & Dons', value: '/sponsor-donate' },
  { label: 'Qui sommes-nous', value: '/who-we-are' },
  { label: 'Galerie communauté', value: '/community' },
];

const COLOR_VARIANTS = [
  { value: 'red', label: 'Rouge', preview: 'bg-[#8c1a1a]' },
  { value: 'yellow', label: 'Jaune', preview: 'bg-[#e98c0b]' },
  { value: 'white', label: 'Blanc', preview: 'bg-white border border-white/30' },
  { value: 'black', label: 'Noir', preview: 'bg-[#0f0606]' },
  { value: 'outline-white', label: 'Contour blanc', preview: 'border-2 border-white bg-transparent' },
  { value: 'outline-red', label: 'Contour rouge', preview: 'border-2 border-[#8c1a1a] bg-transparent' },
];

// ── Types ──────────────────────────────────────────────────────────────────────

interface HeroSlide {
  id: string;
  imageUrl: string;
  isMain: boolean;
  titleFr: string | null;
  titleDe: string | null;
  titleEn: string | null;
  subtitleFr: string | null;
  subtitleDe: string | null;
  subtitleEn: string | null;
  altTextFr: string | null;
  altTextDe: string | null;
  altTextEn: string | null;
  linkType: string | null;
  linkTarget: string | null;
  isActive: boolean;
  sortOrder: number;
}

interface HomeButton {
  id: string;
  labelFr: string;
  labelDe: string;
  labelEn: string;
  linkType: string;
  linkTarget: string;
  colorVariant: string;
  displayOrder: number;
  isActive: boolean;
  isPrimary: boolean;
  openInNewTab: boolean;
}

// ── Shared UI ──────────────────────────────────────────────────────────────────

const inputCls =
  'w-full rounded-lg bg-white/[0.08] border border-white/10 text-white placeholder-white/25 px-3 py-2 text-sm focus:outline-none focus:border-accent/50 transition';
const labelCls = 'block text-[11px] font-bold uppercase tracking-wider text-white/40 mb-1';
const sectionCls = 'rounded-2xl border border-white/10 bg-white/[0.03] p-5';

function LangBlock({
  lang, labelFr, labelDe, labelEn,
  frValue, deValue, enValue,
  onFr, onDe, onEn,
  rows = 1,
}: {
  lang?: string;
  labelFr: string; labelDe: string; labelEn: string;
  frValue: string; deValue: string; enValue: string;
  onFr: (v: string) => void; onDe: (v: string) => void; onEn: (v: string) => void;
  rows?: number;
}) {
  const Tag = rows > 1 ? 'textarea' : 'input';
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      {[
        { lbl: labelFr, val: frValue, onChange: onFr, flag: '🇫🇷' },
        { lbl: labelDe, val: deValue, onChange: onDe, flag: '🇩🇪' },
        { lbl: labelEn, val: enValue, onChange: onEn, flag: '🇬🇧' },
      ].map(({ lbl, val, onChange, flag }) => (
        <div key={flag}>
          <label className={labelCls}>{flag} {lbl}</label>
          {rows > 1 ? (
            <textarea
              value={val}
              onChange={(e) => onChange(e.target.value)}
              rows={rows}
              className={`${inputCls} resize-none`}
            />
          ) : (
            <input
              type="text"
              value={val}
              onChange={(e) => onChange(e.target.value)}
              className={inputCls}
            />
          )}
        </div>
      ))}
    </div>
  );
}

// ── Empty slide / button forms ─────────────────────────────────────────────────

function emptySlide(): Omit<HeroSlide, 'id'> {
  return {
    imageUrl: '', isMain: false,
    titleFr: '', titleDe: '', titleEn: '',
    subtitleFr: '', subtitleDe: '', subtitleEn: '',
    altTextFr: '', altTextDe: '', altTextEn: '',
    linkType: 'internal', linkTarget: '',
    isActive: true, sortOrder: 0,
  };
}

function emptyButton(): Omit<HomeButton, 'id'> {
  return {
    labelFr: '', labelDe: '', labelEn: '',
    linkType: 'internal', linkTarget: '',
    colorVariant: 'red',
    displayOrder: 0,
    isActive: true,
    isPrimary: false,
    openInNewTab: false,
  };
}

// ═══════════════════════════════════════════════════════════════════════════════
// Hero Section Admin
// ═══════════════════════════════════════════════════════════════════════════════

function HeroAdmin() {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editId, setEditId] = useState<string | 'new' | null>(null);
  const [form, setForm] = useState<Omit<HeroSlide, 'id'>>(emptySlide());
  const [msg, setMsg] = useState<{ type: 'ok' | 'err'; text: string } | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/hero');
      const data = await res.json();
      setSlides(Array.isArray(data) ? data : []);
    } catch {
      setSlides([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  function flash(type: 'ok' | 'err', text: string) {
    setMsg({ type, text });
    setTimeout(() => setMsg(null), 3500);
  }

  function openNew() {
    setForm(emptySlide());
    setEditId('new');
  }

  function openEdit(s: HeroSlide) {
    const { id, ...rest } = s;
    setForm({
      ...rest,
      titleFr: rest.titleFr ?? '',
      titleDe: rest.titleDe ?? '',
      titleEn: rest.titleEn ?? '',
      subtitleFr: rest.subtitleFr ?? '',
      subtitleDe: rest.subtitleDe ?? '',
      subtitleEn: rest.subtitleEn ?? '',
      altTextFr: rest.altTextFr ?? '',
      altTextDe: rest.altTextDe ?? '',
      altTextEn: rest.altTextEn ?? '',
      linkType: rest.linkType ?? 'internal',
      linkTarget: rest.linkTarget ?? '',
    });
    setEditId(id);
  }

  async function saveSlide() {
    if (!form.imageUrl.trim()) { flash('err', "L'URL de l'image est requise."); return; }
    setSaving(true);
    try {
      const url = editId === 'new' ? '/api/admin/hero' : `/api/admin/hero/${editId}`;
      const method = editId === 'new' ? 'POST' : 'PATCH';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      flash('ok', editId === 'new' ? 'Image ajoutée !' : 'Modifications enregistrées !');
      setEditId(null);
      load();
    } catch {
      flash('err', 'Erreur lors de la sauvegarde.');
    } finally {
      setSaving(false);
    }
  }

  async function deleteSlide(id: string) {
    if (!confirm('Supprimer cette image du carousel ?')) return;
    await fetch(`/api/admin/hero/${id}`, { method: 'DELETE' });
    flash('ok', 'Image supprimée.');
    load();
  }

  async function setMain(id: string) {
    await fetch(`/api/admin/hero/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isMain: true }),
    });
    flash('ok', 'Image principale définie.');
    load();
  }

  async function toggleActive(s: HeroSlide) {
    await fetch(`/api/admin/hero/${s.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isActive: !s.isActive }),
    });
    load();
  }

  const set = (key: keyof typeof form) => (v: string | boolean | number) => setForm((f) => ({ ...f, [key]: v }));

  return (
    <div className="space-y-6">
      {/* Header row */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-white">Images du carousel Hero</h2>
          <p className="text-xs text-white/40 mt-0.5">{slides.length} image{slides.length !== 1 ? 's' : ''} configurée{slides.length !== 1 ? 's' : ''}</p>
        </div>
        {editId !== 'new' && (
          <button
            onClick={openNew}
            className="flex items-center gap-2 rounded-xl bg-accent px-4 py-2 text-sm font-bold text-white hover:bg-accent/80 transition"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Ajouter une image
          </button>
        )}
      </div>

      {/* Flash */}
      {msg && (
        <div className={`rounded-xl px-4 py-2.5 text-sm font-medium ${
          msg.type === 'ok' ? 'bg-emerald-500/15 text-emerald-400' : 'bg-red-500/15 text-red-400'
        }`}>
          {msg.text}
        </div>
      )}

      {/* Add / Edit form */}
      {editId !== null && (
        <div className={`${sectionCls} border-accent/30 space-y-5`}>
          <div className="flex items-center justify-between">
            <p className="text-sm font-bold text-accent">
              {editId === 'new' ? '+ Nouvelle image' : 'Modifier l\'image'}
            </p>
            <button onClick={() => setEditId(null)} className="text-white/40 hover:text-white/80 text-xs">
              Annuler
            </button>
          </div>

          {/* Image URL */}
          <div>
            <label className={labelCls}>URL de l'image *</label>
            <input
              type="text"
              value={form.imageUrl}
              onChange={(e) => set('imageUrl')(e.target.value)}
              placeholder="/hero-pic/photo.jpg  ou  https://..."
              className={inputCls}
            />
            {form.imageUrl && (
              <div className="mt-2 relative h-24 w-40 rounded-lg overflow-hidden border border-white/10">
                <Image src={form.imageUrl} alt="preview" fill className="object-cover" unoptimized />
              </div>
            )}
          </div>

          {/* Titles */}
          <div>
            <p className={`${labelCls} mb-2`}>Titre principal (optionnel)</p>
            <LangBlock
              labelFr="Titre FR" labelDe="Titre DE" labelEn="Titre EN"
              frValue={form.titleFr ?? ''} deValue={form.titleDe ?? ''} enValue={form.titleEn ?? ''}
              onFr={(v) => set('titleFr')(v)} onDe={(v) => set('titleDe')(v)} onEn={(v) => set('titleEn')(v)}
            />
          </div>

          {/* Subtitles */}
          <div>
            <p className={`${labelCls} mb-2`}>Sous-titre (optionnel)</p>
            <LangBlock
              labelFr="Sous-titre FR" labelDe="Sous-titre DE" labelEn="Sous-titre EN"
              frValue={form.subtitleFr ?? ''} deValue={form.subtitleDe ?? ''} enValue={form.subtitleEn ?? ''}
              onFr={(v) => set('subtitleFr')(v)} onDe={(v) => set('subtitleDe')(v)} onEn={(v) => set('subtitleEn')(v)}
              rows={2}
            />
          </div>

          {/* Alt texts */}
          <div>
            <p className={`${labelCls} mb-2`}>Texte alternatif (accessibilité)</p>
            <LangBlock
              labelFr="Alt FR" labelDe="Alt DE" labelEn="Alt EN"
              frValue={form.altTextFr ?? ''} deValue={form.altTextDe ?? ''} enValue={form.altTextEn ?? ''}
              onFr={(v) => set('altTextFr')(v)} onDe={(v) => set('altTextDe')(v)} onEn={(v) => set('altTextEn')(v)}
            />
          </div>

          {/* Link */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className={labelCls}>Type de lien</label>
              <select
                value={form.linkType ?? 'internal'}
                onChange={(e) => set('linkType')(e.target.value)}
                className={inputCls}
              >
                <option value="internal">Interne (route du site)</option>
                <option value="external">Externe (URL complète)</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className={labelCls}>Destination</label>
              {form.linkType === 'internal' ? (
                <select
                  value={form.linkTarget ?? ''}
                  onChange={(e) => set('linkTarget')(e.target.value)}
                  className={inputCls}
                >
                  <option value="">— Aucun lien —</option>
                  {SITE_ROUTES.map((r) => (
                    <option key={r.value} value={r.value}>{r.label} ({r.value})</option>
                  ))}
                </select>
              ) : (
                <input
                  type="url"
                  value={form.linkTarget ?? ''}
                  onChange={(e) => set('linkTarget')(e.target.value)}
                  placeholder="https://..."
                  className={inputCls}
                />
              )}
            </div>
          </div>

          {/* Options */}
          <div className="flex flex-wrap items-center gap-4">
            <div>
              <label className={labelCls}>Ordre d'affichage</label>
              <input
                type="number"
                value={form.sortOrder}
                onChange={(e) => set('sortOrder')(parseInt(e.target.value) || 0)}
                className={`${inputCls} w-24`}
              />
            </div>
            <label className="flex items-center gap-2 cursor-pointer select-none mt-4">
              <div
                onClick={() => set('isMain')(!form.isMain)}
                className={`relative h-5 w-9 rounded-full transition-colors ${form.isMain ? 'bg-yellow-500' : 'bg-white/10'}`}
              >
                <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${form.isMain ? 'translate-x-4' : 'translate-x-0.5'}`} />
              </div>
              <span className="text-xs font-semibold text-white/60">Image principale</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer select-none mt-4">
              <div
                onClick={() => set('isActive')(!form.isActive)}
                className={`relative h-5 w-9 rounded-full transition-colors ${form.isActive ? 'bg-emerald-500' : 'bg-white/10'}`}
              >
                <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${form.isActive ? 'translate-x-4' : 'translate-x-0.5'}`} />
              </div>
              <span className="text-xs font-semibold text-white/60">Active</span>
            </label>
          </div>

          {/* Save */}
          <button
            onClick={saveSlide}
            disabled={saving}
            className="w-full rounded-xl bg-primary py-2.5 text-sm font-bold text-white hover:bg-primary/80 disabled:opacity-50 transition"
          >
            {saving ? 'Enregistrement…' : editId === 'new' ? 'Ajouter l\'image' : 'Enregistrer les modifications'}
          </button>
        </div>
      )}

      {/* Slide grid */}
      {loading ? (
        <div className="text-center py-12 text-white/30 text-sm">Chargement…</div>
      ) : slides.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/10 py-12 text-center">
          <p className="text-white/30 text-sm mb-3">Aucune image configurée.</p>
          <p className="text-white/20 text-xs">Le carousel utilisera les images par défaut du site.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {slides.map((s) => (
            <div
              key={s.id}
              className={`rounded-2xl border overflow-hidden ${
                s.isMain ? 'border-yellow-500/50' : s.isActive ? 'border-white/10' : 'border-white/5 opacity-60'
              } bg-white/[0.03]`}
            >
              {/* Image */}
              <div className="relative h-36 bg-black/40">
                <Image src={s.imageUrl} alt={s.altTextFr ?? ''} fill className="object-cover" unoptimized />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute top-2 left-2 flex gap-1.5">
                  {s.isMain && (
                    <span className="rounded-full bg-yellow-500 px-2 py-0.5 text-[10px] font-bold text-black">
                      ★ Principale
                    </span>
                  )}
                  {!s.isActive && (
                    <span className="rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-semibold text-white/60">
                      Désactivée
                    </span>
                  )}
                </div>
                <div className="absolute bottom-2 right-2 text-[10px] text-white/40 font-mono bg-black/40 rounded px-1.5 py-0.5">
                  #{s.sortOrder}
                </div>
              </div>

              {/* Content */}
              <div className="p-3 space-y-1.5">
                {(s.titleFr || s.titleEn) && (
                  <p className="text-xs font-semibold text-white/80 truncate">{s.titleFr || s.titleEn}</p>
                )}
                {s.linkTarget && (
                  <p className="text-[11px] text-accent/70 truncate">→ {s.linkTarget}</p>
                )}

                {/* Actions */}
                <div className="flex items-center gap-2 pt-1.5">
                  {!s.isMain && (
                    <button
                      onClick={() => setMain(s.id)}
                      className="flex-1 rounded-lg border border-yellow-500/30 py-1.5 text-[11px] font-semibold text-yellow-400 hover:bg-yellow-500/10 transition"
                    >
                      Définir principale
                    </button>
                  )}
                  <button
                    onClick={() => toggleActive(s)}
                    className={`rounded-lg border px-2.5 py-1.5 text-[11px] font-semibold transition ${
                      s.isActive
                        ? 'border-white/10 text-white/40 hover:text-white/70'
                        : 'border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10'
                    }`}
                  >
                    {s.isActive ? 'Désactiver' : 'Activer'}
                  </button>
                  <button
                    onClick={() => openEdit(s)}
                    className="rounded-lg border border-white/10 px-2.5 py-1.5 text-[11px] font-semibold text-white/60 hover:text-white transition"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => deleteSlide(s.id)}
                    className="rounded-lg border border-red-500/20 px-2.5 py-1.5 text-[11px] font-semibold text-red-400/70 hover:text-red-400 transition"
                  >
                    ✕
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Info */}
      <div className="rounded-xl border border-white/8 bg-white/[0.02] p-4 text-xs text-white/30 space-y-1">
        <p>• Si aucune image n'est configurée, le carousel utilise les images par défaut du site.</p>
        <p>• L'image "Principale" apparaît en premier dans le carousel.</p>
        <p>• Les titres/sous-titres remplacent les textes du site si renseignés. Sinon les traductions du site s'appliquent.</p>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// Buttons Section Admin
// ═══════════════════════════════════════════════════════════════════════════════

function ButtonsAdmin() {
  const [buttons, setButtons] = useState<HomeButton[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editId, setEditId] = useState<string | 'new' | null>(null);
  const [form, setForm] = useState<Omit<HomeButton, 'id'>>(emptyButton());
  const [msg, setMsg] = useState<{ type: 'ok' | 'err'; text: string } | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/buttons');
      const data = await res.json();
      setButtons(Array.isArray(data) ? data : []);
    } catch {
      setButtons([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  function flash(type: 'ok' | 'err', text: string) {
    setMsg({ type, text });
    setTimeout(() => setMsg(null), 3500);
  }

  function openNew() {
    const maxOrder = buttons.length > 0 ? Math.max(...buttons.map((b) => b.displayOrder)) + 1 : 0;
    setForm({ ...emptyButton(), displayOrder: maxOrder });
    setEditId('new');
  }

  function openEdit(b: HomeButton) {
    const { id, ...rest } = b;
    setForm(rest);
    setEditId(id);
  }

  const set = (key: keyof typeof form) => (v: string | boolean | number) =>
    setForm((f) => ({ ...f, [key]: v }));

  async function saveButton() {
    if (!form.labelFr.trim() || !form.labelEn.trim() || !form.labelDe.trim()) {
      flash('err', 'Les libellés en FR, DE et EN sont requis.'); return;
    }
    if (!form.linkTarget.trim()) {
      flash('err', 'La destination du lien est requise.'); return;
    }
    // Basic external URL validation
    if (form.linkType === 'external' && !/^https?:\/\/.+/.test(form.linkTarget)) {
      flash('err', 'Le lien externe doit commencer par https://'); return;
    }
    setSaving(true);
    try {
      const url = editId === 'new' ? '/api/admin/buttons' : `/api/admin/buttons/${editId}`;
      const method = editId === 'new' ? 'POST' : 'PATCH';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      flash('ok', editId === 'new' ? 'Bouton ajouté !' : 'Bouton mis à jour !');
      setEditId(null);
      load();
    } catch {
      flash('err', 'Erreur lors de la sauvegarde.');
    } finally {
      setSaving(false);
    }
  }

  async function deleteButton(id: string) {
    if (!confirm('Supprimer ce bouton ?')) return;
    await fetch(`/api/admin/buttons/${id}`, { method: 'DELETE' });
    flash('ok', 'Bouton supprimé.');
    load();
  }

  async function toggleActive(b: HomeButton) {
    await fetch(`/api/admin/buttons/${b.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isActive: !b.isActive }),
    });
    load();
  }

  async function moveOrder(b: HomeButton, dir: -1 | 1) {
    const newOrder = b.displayOrder + dir;
    await fetch(`/api/admin/buttons/${b.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ displayOrder: newOrder }),
    });
    load();
  }

  const colorDot = (v: string) =>
    COLOR_VARIANTS.find((c) => c.value === v)?.preview ?? 'bg-white/20';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-white">Boutons de la page d'accueil</h2>
          <p className="text-xs text-white/40 mt-0.5">{buttons.length} bouton{buttons.length !== 1 ? 's' : ''} configuré{buttons.length !== 1 ? 's' : ''}</p>
        </div>
        {editId !== 'new' && (
          <button
            onClick={openNew}
            className="flex items-center gap-2 rounded-xl bg-accent px-4 py-2 text-sm font-bold text-white hover:bg-accent/80 transition"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Ajouter un bouton
          </button>
        )}
      </div>

      {/* Flash */}
      {msg && (
        <div className={`rounded-xl px-4 py-2.5 text-sm font-medium ${
          msg.type === 'ok' ? 'bg-emerald-500/15 text-emerald-400' : 'bg-red-500/15 text-red-400'
        }`}>
          {msg.text}
        </div>
      )}

      {/* Add / Edit form */}
      {editId !== null && (
        <div className={`${sectionCls} border-accent/30 space-y-5`}>
          <div className="flex items-center justify-between">
            <p className="text-sm font-bold text-accent">
              {editId === 'new' ? '+ Nouveau bouton' : 'Modifier le bouton'}
            </p>
            <button onClick={() => setEditId(null)} className="text-white/40 hover:text-white/80 text-xs">
              Annuler
            </button>
          </div>

          {/* Labels */}
          <div>
            <p className={`${labelCls} mb-2`}>Libellé du bouton *</p>
            <LangBlock
              labelFr="Libellé FR" labelDe="Libellé DE" labelEn="Libellé EN"
              frValue={form.labelFr} deValue={form.labelDe} enValue={form.labelEn}
              onFr={(v) => set('labelFr')(v)} onDe={(v) => set('labelDe')(v)} onEn={(v) => set('labelEn')(v)}
            />
          </div>

          {/* Link */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className={labelCls}>Type de lien</label>
              <select
                value={form.linkType}
                onChange={(e) => set('linkType')(e.target.value)}
                className={inputCls}
              >
                <option value="internal">Interne</option>
                <option value="external">Externe</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className={labelCls}>Destination *</label>
              {form.linkType === 'internal' ? (
                <select
                  value={form.linkTarget}
                  onChange={(e) => set('linkTarget')(e.target.value)}
                  className={inputCls}
                >
                  <option value="">— Choisir une page —</option>
                  {SITE_ROUTES.map((r) => (
                    <option key={r.value} value={r.value}>{r.label} ({r.value})</option>
                  ))}
                </select>
              ) : (
                <input
                  type="url"
                  value={form.linkTarget}
                  onChange={(e) => set('linkTarget')(e.target.value)}
                  placeholder="https://..."
                  className={inputCls}
                />
              )}
            </div>
          </div>

          {/* Color */}
          <div>
            <label className={labelCls}>Couleur du bouton</label>
            <div className="flex flex-wrap gap-2 mt-2">
              {COLOR_VARIANTS.map((c) => (
                <button
                  key={c.value}
                  type="button"
                  onClick={() => set('colorVariant')(c.value)}
                  className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-sm font-medium transition ${
                    form.colorVariant === c.value
                      ? 'border-accent/60 bg-accent/15 text-white'
                      : 'border-white/10 text-white/50 hover:border-white/20 hover:text-white/80'
                  }`}
                >
                  <span className={`h-4 w-4 rounded-full shrink-0 ${c.preview}`} />
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* Options */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <label className={labelCls}>Ordre</label>
              <input
                type="number"
                value={form.displayOrder}
                onChange={(e) => set('displayOrder')(parseInt(e.target.value) || 0)}
                className={inputCls}
              />
            </div>
            {[
              { key: 'isPrimary', label: 'Bouton principal', color: 'bg-yellow-500' },
              { key: 'isActive', label: 'Actif', color: 'bg-emerald-500' },
              { key: 'openInNewTab', label: 'Nouvel onglet', color: 'bg-blue-500' },
            ].map(({ key, label, color }) => (
              <label key={key} className="flex flex-col gap-1.5 cursor-pointer select-none">
                <span className={labelCls}>{label}</span>
                <div
                  onClick={() => set(key as keyof typeof form)(!form[key as keyof typeof form])}
                  className={`relative h-5 w-9 rounded-full transition-colors ${
                    form[key as keyof typeof form] ? color : 'bg-white/10'
                  }`}
                >
                  <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${
                    form[key as keyof typeof form] ? 'translate-x-4' : 'translate-x-0.5'
                  }`} />
                </div>
              </label>
            ))}
          </div>

          <button
            onClick={saveButton}
            disabled={saving}
            className="w-full rounded-xl bg-primary py-2.5 text-sm font-bold text-white hover:bg-primary/80 disabled:opacity-50 transition"
          >
            {saving ? 'Enregistrement…' : editId === 'new' ? 'Ajouter le bouton' : 'Enregistrer'}
          </button>
        </div>
      )}

      {/* Button list */}
      {loading ? (
        <div className="text-center py-12 text-white/30 text-sm">Chargement…</div>
      ) : buttons.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/10 py-12 text-center">
          <p className="text-white/30 text-sm mb-2">Aucun bouton configuré.</p>
          <p className="text-white/20 text-xs">Les boutons par défaut du site s'afficheront sur la page d'accueil.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {buttons.map((b, i) => {
            const colorConf = COLOR_VARIANTS.find((c) => c.value === b.colorVariant);
            return (
              <div
                key={b.id}
                className={`flex items-center gap-3 rounded-2xl border px-4 py-3 transition ${
                  b.isActive ? 'border-white/10 bg-white/[0.03]' : 'border-white/5 bg-white/[0.01] opacity-50'
                }`}
              >
                {/* Order controls */}
                <div className="flex flex-col gap-0.5 shrink-0">
                  <button
                    onClick={() => moveOrder(b, -1)}
                    disabled={i === 0}
                    className="h-5 w-5 flex items-center justify-center rounded text-white/30 hover:text-white/70 disabled:opacity-20 text-xs"
                  >
                    ▲
                  </button>
                  <button
                    onClick={() => moveOrder(b, 1)}
                    disabled={i === buttons.length - 1}
                    className="h-5 w-5 flex items-center justify-center rounded text-white/30 hover:text-white/70 disabled:opacity-20 text-xs"
                  >
                    ▼
                  </button>
                </div>

                {/* Color dot */}
                <span className={`h-5 w-5 rounded-full shrink-0 ${colorConf?.preview ?? 'bg-white/20'}`} />

                {/* Labels */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-semibold text-white truncate">{b.labelFr}</span>
                    <span className="text-[11px] text-white/30">/</span>
                    <span className="text-[11px] text-white/50 truncate">{b.labelDe}</span>
                    <span className="text-[11px] text-white/30">/</span>
                    <span className="text-[11px] text-white/50 truncate">{b.labelEn}</span>
                    {b.isPrimary && (
                      <span className="rounded-full bg-yellow-500/15 px-2 py-0.5 text-[10px] font-bold text-yellow-400">
                        Principal
                      </span>
                    )}
                    {b.openInNewTab && (
                      <span className="rounded-full bg-blue-500/15 px-2 py-0.5 text-[10px] font-semibold text-blue-400">
                        ↗ Nouvel onglet
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-white/30 truncate mt-0.5">
                    {b.linkType === 'external' ? '🔗' : '→'} {b.linkTarget}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => toggleActive(b)}
                    className={`rounded-lg border px-2.5 py-1.5 text-[11px] font-semibold transition ${
                      b.isActive
                        ? 'border-white/10 text-white/40 hover:text-white/60'
                        : 'border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10'
                    }`}
                  >
                    {b.isActive ? 'Désactiver' : 'Activer'}
                  </button>
                  <button
                    onClick={() => openEdit(b)}
                    className="rounded-lg border border-white/10 px-2.5 py-1.5 text-[11px] font-semibold text-white/60 hover:text-white transition"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => deleteButton(b.id)}
                    className="rounded-lg border border-red-500/20 px-2.5 py-1.5 text-[11px] font-semibold text-red-400/70 hover:text-red-400 transition"
                  >
                    ✕
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Info */}
      <div className="rounded-xl border border-white/8 bg-white/[0.02] p-4 text-xs text-white/30 space-y-1">
        <p>• Les boutons désactivés n'apparaissent pas sur la page d'accueil.</p>
        <p>• Le bouton "Principal" s'affiche en premier et de façon plus proéminente.</p>
        <p>• Si aucun bouton n'est configuré, les boutons par défaut du site s'affichent.</p>
        <p>• Les flèches ▲▼ permettent de réordonner les boutons.</p>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// Main component — tabbed
// ═══════════════════════════════════════════════════════════════════════════════

export default function HomepageAdmin() {
  const [tab, setTab] = useState<'hero' | 'buttons' | 'site'>('hero');

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="border-b border-white/8 pb-5">
        <p className="text-[0.65rem] font-bold uppercase tracking-[0.3em] text-accent/60 mb-1">
          Configuration
        </p>
        <h1 className="text-2xl font-bold text-white">Page d'accueil</h1>
        <p className="text-sm text-white/40 mt-1">
          Gérez dynamiquement le carousel Hero et les boutons de la page d'accueil.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 rounded-xl bg-white/[0.04] border border-white/8 p-1 w-fit">
        {[
          { key: 'hero', label: 'Images Hero', icon: '🖼️' },
          { key: 'buttons', label: 'Boutons CTA', icon: '🔘' },
          { key: 'site', label: 'Header & Membership', icon: '⚙️' },
        ].map(({ key, label, icon }) => (
          <button
            key={key}
            onClick={() => setTab(key as 'hero' | 'buttons' | 'site')}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-all ${
              tab === key
                ? 'bg-accent text-white shadow'
                : 'text-white/40 hover:text-white/70'
            }`}
          >
            <span>{icon}</span>
            {label}
          </button>
        ))}
      </div>

      {/* Content */}
      {tab === 'hero' ? <HeroAdmin /> : tab === 'buttons' ? <ButtonsAdmin /> : <SiteConfigAdmin />}
    </div>
  );
}
