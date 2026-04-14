import type { Locale } from '@/i18n/config';

export type WhoWeAreStrings = {
  title: string;
  intro: string;
  story: {
    heading: string;
    lines: string[];
    /** Highlight block (the central question) */
    highlight: string;
    afterHighlight: string[];
  };
  vision: {
    heading: string;
    paragraphs: string[];
  };
  team: {
    heading: string;
    lead: string;
  };
  ctaContact: string;
};

const de: WhoWeAreStrings = {
  title: 'Wer wir sind',
  intro:
    'Acht Menschen. Eine Überzeugung. Eine Gemeinschaft, die sich weigert, alleine zu starten.',
  story: {
    heading: 'Unsere Geschichte',
    lines: [
      'Wir haben es selbst erlebt — die Ankunft in einem neuen Land, die Stille eines leeren Zimmers, das Gefühl, wieder ganz von vorne zu beginnen. Ein neues System, eine neue Sprache, neue Codes.',
      'Aber was uns am meisten getroffen hat: Das Wissen war da. Die Menschen, die es schon geschafft hatten, gab es. Nur die Verbindung fehlte.',
    ],
    highlight: 'Warum kämpft jeder allein, wenn die Antworten nur einen Schritt entfernt sind?',
    afterHighlight: [
      'Diese Frage hat uns nicht losgelassen. Also haben wir gehandelt.',
      'Wir haben Level Up in Germany gegründet — nicht als Organisation, sondern als Versprechen: Niemand muss diesen Weg allein gehen.',
    ],
  },
  vision: {
    heading: 'Unsere Vision',
    paragraphs: [
      'Wir schaffen, was gefehlt hat:',
      'Eine Brücke.',
      'Zwischen denen, die auf dem Weg zum Erfolg sind, und denen, die schon weiter sind.',
      'Ein Raum, in dem Erfahrung weitergegeben wird, Fehler weniger werden und Chancen erreichbar werden.',
      'Vorankommen — vor allem aber: beschleunigen. Gemeinsam.',
    ],
  },
  team: {
    heading: 'Die Menschen hinter der Bewegung',
    lead: 'Acht engagierte Menschen, getragen von einer starken Überzeugung: Eine vernetzte Diaspora kann weiterkommen und noch stärker strahlen.',
  },
  ctaContact: 'Kontakt',
};

const en: WhoWeAreStrings = {
  title: 'Who we are',
  intro:
    'Eight people. One conviction. A community that refuses to start alone.',
  story: {
    heading: 'Our story',
    lines: [
      'We lived it ourselves — arriving in a new country, the silence of an empty room, the weight of starting over. A new system, a new language, new rules.',
      'But what struck us most wasn\'t the difficulty. It was the waste. The knowledge existed. The people who had figured it out were right there. The connection just wasn\'t.',
    ],
    highlight: 'Why does everyone fight alone when the answers are only one step away?',
    afterHighlight: [
      'That question wouldn\'t let us go. So we did something about it.',
      'We built Level Up in Germany — not as an organisation, but as a promise: no one has to walk this path alone.',
    ],
  },
  vision: {
    heading: 'Our vision',
    paragraphs: [
      'To create what was missing:',
      'A bridge.',
      'Between those on the path to success and those who have already moved forward.',
      'A space where experience is passed on, mistakes shrink, and opportunities become within reach.',
      'To move forward — but above all, to accelerate. Together.',
    ],
  },
  team: {
    heading: 'The people behind the movement',
    lead: 'Eight committed people, united by a strong belief: a connected diaspora can go further and shine even brighter.',
  },
  ctaContact: 'Contact',
};

const fr: WhoWeAreStrings = {
  title: 'Qui sommes-nous ?',
  intro:
    'Huit personnes. Une conviction. Une communauté qui refuse de commencer seule.',
  story: {
    heading: 'Notre histoire',
    lines: [
      'Nous l\'avons vécu nous-mêmes — l\'arrivée dans un nouveau pays, le silence d\'une chambre vide, le poids de tout recommencer. Un nouveau système, une nouvelle langue, de nouveaux codes.',
      'Mais ce qui nous a frappés, ce n\'était pas la difficulté. C\'était le gâchis. Le savoir existait. Les personnes qui avaient trouvé leur voie étaient là. Il manquait juste la connexion.',
    ],
    highlight: 'Pourquoi se bat-on seul quand les réponses ne sont qu\'à un pas ?',
    afterHighlight: [
      'Cette question ne nous a pas lâchés. Alors nous avons agi.',
      'Nous avons construit Level Up in Germany — non pas comme une organisation, mais comme une promesse : personne ne devrait marcher seul sur ce chemin.',
    ],
  },
  vision: {
    heading: 'Notre vision',
    paragraphs: [
      'Créer ce qui manquait :',
      'Un pont.',
      'Entre ceux qui sont sur le chemin du succès et ceux qui ont déjà avancé.',
      'Un espace où l\u2019expérience se transmet, où les erreurs se réduisent, où les opportunités deviennent accessibles.',
      'Avancer, mais surtout — accélérer. Ensemble.',
    ],
  },
  team: {
    heading: 'Les personnes derrière le mouvement',
    lead: 'Huit personnes engagées, portées par une conviction forte : une diaspora connectée peut aller plus loin et briller encore plus fort.',
  },
  ctaContact: 'Contact',
};

export const whoWeAreContent: Record<Locale, WhoWeAreStrings> = {
  de,
  en,
  fr,
};
