'use client';

import { useEffect, useState } from 'react';

type SiteConfig = {
  headerLogoUrl: string;
  headerJoinLabelFr: string;
  headerJoinLabelDe: string;
  headerJoinLabelEn: string;
  headerJoinLink: string;
  headerJoinOpenInNewTab: boolean;
  headerSponsorLabelFr: string;
  headerSponsorLabelDe: string;
  headerSponsorLabelEn: string;
  headerSponsorLink: string;
  headerSponsorOpenInNewTab: boolean;
  membershipHeroHeadingFr: string;
  membershipHeroHeadingDe: string;
  membershipHeroHeadingEn: string;
  membershipHeroSubFr: string;
  membershipHeroSubDe: string;
  membershipHeroSubEn: string;
  membershipHeroBgUrl: string;
};

const inputCls =
  'w-full rounded-lg bg-white/[0.08] border border-white/10 text-white placeholder-white/25 px-3 py-2 text-sm focus:outline-none focus:border-accent/50 transition';
const labelCls = 'block text-[11px] font-bold uppercase tracking-wider text-white/40 mb-1';
const sectionCls = 'rounded-2xl border border-white/10 bg-white/[0.03] p-5';

function emptyConfig(): SiteConfig {
  return {
    headerLogoUrl: '',
    headerJoinLabelFr: 'Rejoindre',
    headerJoinLabelDe: 'Mitglied werden',
    headerJoinLabelEn: 'Join',
    headerJoinLink: '/contact',
    headerJoinOpenInNewTab: false,
    headerSponsorLabelFr: 'Sponsor / Don',
    headerSponsorLabelDe: 'Sponsor / Spenden',
    headerSponsorLabelEn: 'Sponsor / Donate',
    headerSponsorLink: '/sponsor-donate',
    headerSponsorOpenInNewTab: false,
    membershipHeroHeadingFr: 'Devenir membre',
    membershipHeroHeadingDe: 'Mitglied werden',
    membershipHeroHeadingEn: 'Become a member',
    membershipHeroSubFr: 'Rejoignez notre association et contribuez a faire grandir Level Up in Germany.',
    membershipHeroSubDe: 'Treten Sie unserem Verein bei und helfen Sie Level Up in Germany zu wachsen.',
    membershipHeroSubEn: 'Join our association and help Level Up in Germany grow.',
    membershipHeroBgUrl: '',
  };
}

export default function SiteConfigAdmin() {
  const [form, setForm] = useState<SiteConfig>(emptyConfig());
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{ type: 'ok' | 'err'; text: string } | null>(null);

  function flash(type: 'ok' | 'err', text: string) {
    setMsg({ type, text });
    setTimeout(() => setMsg(null), 3500);
  }

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch('/api/admin/site-config');
        const data = await res.json();
        if (!mounted) return;
        setForm((prev) => ({
          ...prev,
          headerLogoUrl: data?.headerLogoUrl ?? prev.headerLogoUrl,
          headerJoinLabelFr: data?.headerJoinLabelFr ?? prev.headerJoinLabelFr,
          headerJoinLabelDe: data?.headerJoinLabelDe ?? prev.headerJoinLabelDe,
          headerJoinLabelEn: data?.headerJoinLabelEn ?? prev.headerJoinLabelEn,
          headerJoinLink: data?.headerJoinLink ?? prev.headerJoinLink,
          headerJoinOpenInNewTab: !!data?.headerJoinOpenInNewTab,
          headerSponsorLabelFr: data?.headerSponsorLabelFr ?? prev.headerSponsorLabelFr,
          headerSponsorLabelDe: data?.headerSponsorLabelDe ?? prev.headerSponsorLabelDe,
          headerSponsorLabelEn: data?.headerSponsorLabelEn ?? prev.headerSponsorLabelEn,
          headerSponsorLink: data?.headerSponsorLink ?? prev.headerSponsorLink,
          headerSponsorOpenInNewTab: !!data?.headerSponsorOpenInNewTab,
          membershipHeroHeadingFr: data?.membershipHeroHeadingFr ?? prev.membershipHeroHeadingFr,
          membershipHeroHeadingDe: data?.membershipHeroHeadingDe ?? prev.membershipHeroHeadingDe,
          membershipHeroHeadingEn: data?.membershipHeroHeadingEn ?? prev.membershipHeroHeadingEn,
          membershipHeroSubFr: data?.membershipHeroSubFr ?? prev.membershipHeroSubFr,
          membershipHeroSubDe: data?.membershipHeroSubDe ?? prev.membershipHeroSubDe,
          membershipHeroSubEn: data?.membershipHeroSubEn ?? prev.membershipHeroSubEn,
          membershipHeroBgUrl: data?.membershipHeroBgUrl ?? prev.membershipHeroBgUrl,
        }));
      } catch {
        flash('err', 'Erreur lors du chargement de la configuration.');
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const set = (key: keyof SiteConfig) => (v: string | boolean) =>
    setForm((f) => ({ ...f, [key]: v }));

  async function save() {
    setSaving(true);
    try {
      const res = await fetch('/api/admin/site-config', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      flash('ok', 'Configuration enregistree.');
    } catch {
      flash('err', 'Erreur lors de la sauvegarde.');
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <div className="text-center py-12 text-white/30 text-sm">Chargement…</div>;
  }

  return (
    <div className="space-y-6">
      {msg && (
        <div className={`rounded-xl px-4 py-2.5 text-sm font-medium ${
          msg.type === 'ok' ? 'bg-emerald-500/15 text-emerald-400' : 'bg-red-500/15 text-red-400'
        }`}>
          {msg.text}
        </div>
      )}

      <div className={sectionCls}>
        <h2 className="text-lg font-bold text-white mb-4">Barre Header</h2>

        <div className="space-y-4">
          <div>
            <label className={labelCls}>URL logo (optionnel)</label>
            <input
              type="text"
              value={form.headerLogoUrl}
              onChange={(e) => set('headerLogoUrl')(e.target.value)}
              placeholder="/logo_neu.png ou https://..."
              className={inputCls}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Lien bouton Rejoindre</label>
              <input
                type="text"
                value={form.headerJoinLink}
                onChange={(e) => set('headerJoinLink')(e.target.value)}
                placeholder="/contact"
                className={inputCls}
              />
            </div>
            <div>
              <label className={labelCls}>Lien bouton Sponsor / Don</label>
              <input
                type="text"
                value={form.headerSponsorLink}
                onChange={(e) => set('headerSponsorLink')(e.target.value)}
                placeholder="/sponsor-donate"
                className={inputCls}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className={labelCls}>Label Rejoindre FR</label>
              <input type="text" value={form.headerJoinLabelFr} onChange={(e) => set('headerJoinLabelFr')(e.target.value)} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Label Rejoindre DE</label>
              <input type="text" value={form.headerJoinLabelDe} onChange={(e) => set('headerJoinLabelDe')(e.target.value)} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Label Rejoindre EN</label>
              <input type="text" value={form.headerJoinLabelEn} onChange={(e) => set('headerJoinLabelEn')(e.target.value)} className={inputCls} />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className={labelCls}>Label Sponsor FR</label>
              <input type="text" value={form.headerSponsorLabelFr} onChange={(e) => set('headerSponsorLabelFr')(e.target.value)} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Label Sponsor DE</label>
              <input type="text" value={form.headerSponsorLabelDe} onChange={(e) => set('headerSponsorLabelDe')(e.target.value)} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Label Sponsor EN</label>
              <input type="text" value={form.headerSponsorLabelEn} onChange={(e) => set('headerSponsorLabelEn')(e.target.value)} className={inputCls} />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-1">
            <label className="flex items-center gap-2 text-xs text-white/60">
              <input
                type="checkbox"
                checked={form.headerJoinOpenInNewTab}
                onChange={(e) => set('headerJoinOpenInNewTab')(e.target.checked)}
              />
              Rejoindre: ouvrir dans un nouvel onglet
            </label>
            <label className="flex items-center gap-2 text-xs text-white/60">
              <input
                type="checkbox"
                checked={form.headerSponsorOpenInNewTab}
                onChange={(e) => set('headerSponsorOpenInNewTab')(e.target.checked)}
              />
              Sponsor: ouvrir dans un nouvel onglet
            </label>
          </div>
        </div>
      </div>

      <div className={sectionCls}>
        <h2 className="text-lg font-bold text-white mb-4">Hero page Membership</h2>

        <div className="space-y-4">
          <div>
            <label className={labelCls}>Image de fond (optionnel)</label>
            <input
              type="text"
              value={form.membershipHeroBgUrl}
              onChange={(e) => set('membershipHeroBgUrl')(e.target.value)}
              placeholder="/hero-pic/membership.jpg ou https://..."
              className={inputCls}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className={labelCls}>Titre FR</label>
              <input type="text" value={form.membershipHeroHeadingFr} onChange={(e) => set('membershipHeroHeadingFr')(e.target.value)} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Titre DE</label>
              <input type="text" value={form.membershipHeroHeadingDe} onChange={(e) => set('membershipHeroHeadingDe')(e.target.value)} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Titre EN</label>
              <input type="text" value={form.membershipHeroHeadingEn} onChange={(e) => set('membershipHeroHeadingEn')(e.target.value)} className={inputCls} />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className={labelCls}>Sous-titre FR</label>
              <textarea value={form.membershipHeroSubFr} onChange={(e) => set('membershipHeroSubFr')(e.target.value)} rows={3} className={`${inputCls} resize-none`} />
            </div>
            <div>
              <label className={labelCls}>Sous-titre DE</label>
              <textarea value={form.membershipHeroSubDe} onChange={(e) => set('membershipHeroSubDe')(e.target.value)} rows={3} className={`${inputCls} resize-none`} />
            </div>
            <div>
              <label className={labelCls}>Sous-titre EN</label>
              <textarea value={form.membershipHeroSubEn} onChange={(e) => set('membershipHeroSubEn')(e.target.value)} rows={3} className={`${inputCls} resize-none`} />
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={save}
        disabled={saving}
        className="w-full rounded-xl bg-primary py-2.5 text-sm font-bold text-white hover:bg-primary/80 disabled:opacity-50 transition"
      >
        {saving ? 'Enregistrement…' : 'Enregistrer la configuration'}
      </button>
    </div>
  );
}
