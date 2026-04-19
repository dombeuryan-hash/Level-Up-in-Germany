'use client';

import React, { useState } from 'react';
import { CORE_TEAM_MEMBERS } from '@/content/core-team';
import { MediaPicker } from '@/app/admin/components/MediaPicker';

type DbMember = {
  name: string;
  bioDe: string;
  bioEn: string;
  bioFr: string;
  linkedin: string;
  imageUrl: string;
};

type Props = {
  initialData: DbMember[];
};

type LangTab = 'fr' | 'de' | 'en';

const LANG_LABELS: Record<LangTab, string> = { fr: 'Français', de: 'Deutsch', en: 'English' };

function buildInitialState(initialData: DbMember[]): Record<string, DbMember> {
  const map: Record<string, DbMember> = {};
  for (const m of CORE_TEAM_MEMBERS) {
    const db = initialData.find((d) => d.name === m.name);
    map[m.name] = {
      name: m.name,
      bioDe: db?.bioDe ?? '',
      bioEn: db?.bioEn ?? '',
      bioFr: db?.bioFr ?? '',
      linkedin: db?.linkedin ?? '',
      imageUrl: db?.imageUrl ?? '',
    };
  }
  return map;
}

export function TeamMembersEditor({ initialData }: Props) {
  const [state, setState] = useState(() => buildInitialState(initialData));
  const [saving, setSaving] = useState<string | null>(null);
  const [saved, setSaved] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeLang, setActiveLang] = useState<LangTab>('fr');

  function update(name: string, field: keyof DbMember, value: string) {
    setState((prev) => ({
      ...prev,
      [name]: { ...prev[name], [field]: value },
    }));
  }

  async function save(name: string) {
    setSaving(name);
    setError(null);
    try {
      const res = await fetch('/api/admin/team', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(state[name]),
      });
      if (!res.ok) throw new Error('Erreur serveur');
      setSaved(name);
      setTimeout(() => setSaved(null), 2500);
    } catch {
      setError(name);
    } finally {
      setSaving(null);
    }
  }

  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent/70 mb-1">
          Who We Are
        </p>
        <h1 className="text-2xl font-bold text-white">Gestion de l&apos;équipe</h1>
        <p className="mt-2 text-sm text-white/40">
          Modifiez la photo, la biographie et le lien LinkedIn de chaque membre.
        </p>
      </div>

      {/* Lang tabs */}
      <div className="flex gap-1 mb-6 bg-white/5 rounded-xl p-1 w-fit">
        {(Object.keys(LANG_LABELS) as LangTab[]).map((lang) => (
          <button
            key={lang}
            onClick={() => setActiveLang(lang)}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeLang === lang
                ? 'bg-primary text-white shadow'
                : 'text-white/40 hover:text-white'
            }`}
          >
            {LANG_LABELS[lang]}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {CORE_TEAM_MEMBERS.map((m) => {
          const data = state[m.name];
          const bioField = `bio${activeLang.charAt(0).toUpperCase()}${activeLang.slice(1)}` as 'bioDe' | 'bioEn' | 'bioFr';
          const isSaving = saving === m.name;
          const isSaved = saved === m.name;
          const isError = error === m.name;
          const currentImage = data.imageUrl || m.image;

          return (
            <div key={m.name} className="rounded-2xl border border-white/8 bg-white/3 overflow-hidden">
              <div className="p-5 space-y-4">

                {/* Header: photo + name + save */}
                <div className="flex items-start gap-4">
                  {/* Current photo preview */}
                  <div className="relative w-14 h-18 shrink-0 rounded-xl overflow-hidden bg-gray-900 border border-white/10">
                    <img
                      src={currentImage}
                      alt={m.name}
                      className="w-full h-full object-cover object-top"
                      style={{ aspectRatio: '3/4' }}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-4 mb-1">
                      <div>
                        <p className="font-semibold text-white text-sm">{m.name}</p>
                        <p className="text-xs text-accent/70 mt-0.5">{m.role.fr}</p>
                      </div>
                      <button
                        onClick={() => save(m.name)}
                        disabled={isSaving}
                        className={`shrink-0 flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                          isSaved
                            ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                            : isError
                            ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                            : 'bg-primary/20 text-white border border-primary/30 hover:bg-primary hover:border-primary'
                        } disabled:opacity-50`}
                      >
                        {isSaving ? (
                          <>
                            <svg className="w-3 h-3 animate-spin" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                            Sauvegarde…
                          </>
                        ) : isSaved ? (
                          <>
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Sauvegardé
                          </>
                        ) : isError ? (
                          'Erreur — réessayer'
                        ) : (
                          'Sauvegarder'
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Photo picker */}
                <MediaPicker
                  label="Photo de profil"
                  value={data.imageUrl}
                  onChange={(url) => update(m.name, 'imageUrl', url)}
                  defaultCategory="team"
                />

                {/* Bio textarea */}
                <div>
                  <label className="block text-[10px] font-semibold uppercase tracking-wider text-white/30 mb-1">
                    Biographie ({LANG_LABELS[activeLang]})
                  </label>
                  <textarea
                    value={data[bioField]}
                    onChange={(e) => update(m.name, bioField, e.target.value)}
                    rows={3}
                    placeholder={`Biographie en ${LANG_LABELS[activeLang]}…`}
                    className="w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2 text-sm text-white placeholder-white/20 resize-none focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/40 transition-all"
                  />
                </div>

                {/* LinkedIn */}
                <div>
                  <label className="block text-[10px] font-semibold uppercase tracking-wider text-white/30 mb-1">
                    Lien LinkedIn
                  </label>
                  <input
                    type="url"
                    value={data.linkedin}
                    onChange={(e) => update(m.name, 'linkedin', e.target.value)}
                    placeholder="https://linkedin.com/in/…"
                    className="w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2 text-sm text-white placeholder-white/20 focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/40 transition-all"
                  />
                </div>

              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
