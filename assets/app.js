(function () {
  'use strict';
  var D = window.SITE_DATA;
  var lang = 'fr';
  var cat = 'realise';
  var lastFocus = null;
  try { if (localStorage.getItem('lang') === 'en') lang = 'en'; } catch (e) {}

  var L = function (v) { return v && typeof v === 'object' && !Array.isArray(v) ? (v[lang] || v.fr) : v; };
  var t = function (fr, en) { return lang === 'fr' ? fr : en; };
  var $ = function (id) { return document.getElementById(id); };
  var CHEV = '<svg class="chev" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 9l7 7 7-7" stroke="currentColor" stroke-width="2" fill="none"/></svg>';
  var LOCK = function (s) { return '<svg viewBox="0 0 24 24" width="' + s + '" height="' + s + '" aria-hidden="true"><path d="M7 11V8a5 5 0 0110 0v3M5 11h14v10H5z" stroke="currentColor" stroke-width="2" fill="none"/></svg>'; };
  var bullets = function (a) { return '<ul>' + (a || []).map(function (x) { return '<li>' + x + '</li>'; }).join('') + '</ul>'; };

  var TAG_EN = {"Charge-capacité": "Load-capacity", "Conduite du changement": "Change management", "Capabilité": "Capability", "Étude économique": "Economic study", "Maintenance préventive": "Preventive maintenance", "Criticité": "Criticality", "Gestion des PDR": "Spare parts management", "Standardisation": "Standardisation", "Résolution de problèmes": "Problem solving", "Prix de revient": "Cost price", "Optimisation topologique": "Topology optimisation", "Aérodynamique": "Aerodynamics", "Contrôleur de vol": "Flight controller", "Fusion de capteurs": "Sensor fusion", "Correcteur PID": "PID controller", "Fabrication additive": "Additive manufacturing", "Mécatronique": "Mechatronics", "Structure treillis": "Lattice structure", "Réalité mixte": "Mixed reality", "Tolérancement": "Tolerancing", "Scan 3D / Métrologie": "3D scanning / Metrology", "Scan 3D": "3D scanning", "Prototypage": "Prototyping", "Stérilisation": "Sterilisation", "Allègement": "Weight reduction", "Conception inclusive": "Inclusive design", "Tests utilisateur": "User testing", "Prototypage itératif": "Iterative prototyping", "Éco-conception": "Eco-design", "Dimensionnement mécanique": "Mechanical sizing", "Plans de définition": "Definition drawings", "Usinage MOCN": "CNC machining", "Commande numérique": "Numerical control", "Assemblage": "Assembly", "Fraisage": "Milling", "Analyse fonctionnelle": "Functional analysis", "Diagramme pieuvre": "Octopus diagram", "Diagramme d'Ashby": "Ashby chart", "Ashby": "Ashby chart", "Choix de matériaux": "Material selection", "Pneumatique": "Pneumatics", "Automatisation": "Automation", "Fabrication / Usinage": "Manufacturing / Machining", "Soudage": "Welding", "Conception surfacique": "Surface design", "Aéronautique": "Aeronautics", "Lecture de plans": "Drawing reading", "Robotique": "Robotics", "Conception mécanique": "Mechanical design", "Actionneurs / Servomoteur": "Actuators / Servomotor", "Bras manipulateur": "Robotic arm", "Cinématique": "Kinematics", "Simulation de mouvement": "Motion simulation", "Mécanisme articulé": "Articulated mechanism", "Conception modulaire": "Modular design", "Usinage CNC": "CNC machining", "Gravure laser": "Laser engraving", "Fabrication numérique": "Digital fabrication", "Conception paramétrique": "Parametric design", "Tenségrité": "Tensegrity", "Modélisation": "Modelling", "Industrialisation": "Industrialisation", "Analyse multicritère": "Multi-criteria analysis", "Politique industrielle": "Industrial policy", "Charge / Capacité": "Load / Capacity", "Analyse de capacité": "Capacity analysis", "Scénarios industriels": "Industrial scenarios", "Goulots d'étranglement": "Bottlenecks", "Aide à la décision": "Decision support", "Stratégie industrielle": "Industrial strategy", "Gestion de projet": "Project management", "Méthodologie": "Methodology", "Matrice décisionnelle": "Decision matrix", "Waterfall / Cycle en V": "Waterfall / V-model", "KPI / Pilotage": "KPIs / Steering", "Énergie solaire": "Solar energy", "Parties prenantes": "Stakeholders", "Analyse des risques": "Risk analysis", "Jalons & délais": "Milestones & lead times", "Consolidation des coûts": "Cost consolidation", "Kick-off / Comité": "Kick-off / Committee", "Ergonomie": "Ergonomics", "AMDEC": "FMEA", "Gamme": "Routing", "Analyse de la valeur": "Value analysis", "FabLab": "FabLab", "Logigramme": "Flowchart", "Réalisation": "Build", "Simulation": "Simulation", "CAO 3D": "3D CAD", "CAO": "CAD", "Tenségrité ": "Tensegrity", "Structures": "Structures", "Medtech": "Medtech", "Tension / Compression": "Tension / Compression", "Impression 3D": "3D printing", "Étude économique ": "Economic study", "Diagramme de Gantt": "Gantt chart", "Benchmark": "Benchmark"};
  var tagHtml = function (a) { return (a || []).map(function (x) { return '<span>' + (lang === 'en' && TAG_EN[x] || x) + '</span>'; }).join(''); };

  /* Carte de flux du parcours */
  var FLOW = [
    { edu: 'bac', exp: [] }, { edu: 'est', exp: ['mapaf'] },
    { edu: 'ensam', exp: ['ciments', 'hiolle', 'cotherm'] }, { edu: 'cesi', exp: ['sncf'] }
  ];
  var SHORT = { mapaf: 'MAPAF', ciments: 'Ciments du Maroc', hiolle: 'Hiolle Industries', cotherm: 'Cotherm', sncf: 'SNCF Réseau' };

  function renderFlow() {
    var i18nFlow = [
      [t('Bac STM', 'STM Baccalaureate'), t('Sciences de l\'ingénieur, Maroc', 'Engineering sciences, Morocco')],
      [t('DUT GMP', 'DUT, Mechanical Eng.'), 'EST Casablanca, 2020-2022'],
      [t('Ingénieur', 'Engineering degree'), t('ENSAM Rabat, 2022-2025, et Grenoble INP, 2024-2025', 'ENSAM Rabat, 2022-2025, and Grenoble INP, 2024-2025')],
      [t('Mastère spécialisé', 'Specialised Master'), 'CESI, 2025-2026, Black Belt']
    ];
    var topic = {
      mapaf: t('SMED, 2022', 'SMED, 2022'), ciments: t('Simulation CFD, 2023', 'CFD simulation, 2023'),
      hiolle: t('Maintenance préventive, 2024', 'Preventive maintenance, 2024'), cotherm: t('Ergonomie et procédé, 2025', 'Ergonomics and process, 2025'),
      sncf: t('Lean Office, 2025-2026', 'Lean Office, 2025-2026')
    };
    var html = FLOW.map(function (f, i) {
      var items = f.exp.length ? f.exp.map(function (id) {
        return '<li><button type="button" data-exp="' + id + '">' + SHORT[id] + '<small>' + topic[id] + '</small></button></li>';
      }).join('') : '<li class="empty">' + t('Socle scientifique', 'Scientific foundation') + '</li>';
      return '<li class="vsm-step" style="--i:' + i + '">' +
        '<button type="button" class="vsm-box" data-edu="' + f.edu + '"><strong>' + i18nFlow[i][0] + '</strong><span>' + i18nFlow[i][1] + '</span></button>' +
        '<ul class="vsm-data">' + items + '</ul></li>';
    }).join('');
    html += '<li class="vsm-step vsm-kaizen"><a href="#contact"><strong>' + t('Votre poste ?', 'Your role?') + '</strong><span>' + t('Premier CDI, excellence opérationnelle', 'First permanent job, operational excellence') + '</span></a></li>';
    $('vsm').innerHTML = html;
  }

  /* Expériences au format A3 */
  function renderExp() {
    $('exp-list').innerHTML = D.EXPERIENCES.map(function (e) {
      var facts = e.facts ? '<div class="facts">' + e.facts.map(function (f) { return '<div><b>' + L(f.v) + '</b><span>' + L(f.l) + '</span></div>'; }).join('') + '</div>' : '';
      var img = e.img ? '<img class="a3-img" loading="lazy" src="assets/img/' + e.img + '" alt="' + L(e.imgAlt) + '" />' : '';
      return '<article class="exp" id="exp-' + e.id + '">' +
        '<button type="button" class="exp-head" aria-expanded="false" aria-controls="a3-' + e.id + '">' +
          '<img class="exp-logo" loading="lazy" src="' + e.logo + '" alt="" />' +
          '<span><h3>' + e.company + '</h3><span class="exp-meta">' + L(e.date) + ', ' + L(e.loc) + '</span><span class="exp-meta">' + L(e.role) + '</span><span class="exp-subject">' + L(e.subject) + '</span></span>' +
          CHEV + '</button>' +
        '<div class="a3" id="a3-' + e.id + '" hidden>' +
          '<div class="a3-cell"><h4>' + t('Le problème', 'The problem') + '</h4><p>' + L(e.problem) + '</p>' + facts + img + '</div>' +
          '<div class="a3-cell"><h4>' + t('La démarche', 'The approach') + '</h4>' + bullets(L(e.approach)) + '</div>' +
          '<div class="a3-cell"><h4>' + t('Ce que j\'ai livré', 'What I delivered') + '</h4>' + bullets(L(e.delivered)) + '</div>' +
          '<div class="a3-cell a3-status"><h4>' + t('Où ça en était à la fin', 'Where it stood at the end') + '</h4><p>' + L(e.status) + '</p></div>' +
          '<div class="a3-cell a3-foot"><div class="tags">' + tagHtml(e.tags) + '</div></div>' +
        '</div></article>';
    }).join('');
  }

  /* Projets */
  function renderProjects() {
    var grid = $('proj-grid');
    grid.classList.toggle('cao', cat === 'conception');
    grid.setAttribute('aria-labelledby', 'tab-' + cat);
    grid.innerHTML = D.PROJECTS.filter(function (p) { return p.category === cat; }).map(function (p) {
      var img = p.img ? '<img class="proj-img" loading="lazy" src="assets/img/' + p.img + '" alt="" />' : '';
      var lock = p.hasDoc ? '<span class="proj-lock">' + LOCK(14) + t('Dossier en accès privé', 'Private project file') + '</span>' : '';
      var yr = /^\d/.test(p.year) ? '<span class="proj-year">' + p.year + '</span>' : '';
      return '<button type="button" class="proj" data-proj="' + p.id + '" aria-haspopup="dialog">' + img +
        '<span class="proj-body">' + yr + '<h3>' + L(p.name) + '</h3><p>' + L(p.desc) + '</p>' + lock + '</span></button>';
    }).join('');
  }

  function openProject(id) {
    var p = D.PROJECTS.filter(function (x) { return x.id === id; })[0];
    if (!p) return;
    var subj = encodeURIComponent(t('Demande de dossier : ', 'File request: ') + L(p.name).replace(/<[^>]+>/g, ''));
    var vault = p.hasDoc ? '<div class="vault">' + LOCK(26) +
      '<strong>' + t('Dossier du projet en accès privé', 'Private project file') + '</strong>' +
      '<p>' + t('Le document complet n\'est ni consultable ni téléchargeable depuis ce site. Je peux vous le présenter sur demande.', 'The full document cannot be viewed or downloaded from this site. I can present it to you on request.') + '</p>' +
      '<a href="mailto:boussaadabde@gmail.com?subject=' + subj + '">' + t('Demander le dossier par email', 'Request the file by email') + '</a></div>' : '';
    var yr = /^\d/.test(p.year) ? p.year : '';
    $('m-body').innerHTML =
      (yr ? '<span class="proj-year">' + yr + '</span>' : '') + '<h2 id="m-title">' + L(p.name) + '</h2>' +
      (p.img ? '<img class="modal-img" src="assets/img/' + p.img + '" alt="' + (L(p.imgAlt) || L(p.name)) + '" />' : '') +
      '<p class="modal-lead">' + L(p.desc) + '</p>' +
      '<h4>' + t('Réalisations', 'What was done') + '</h4><ul class="bul">' + L(p.items).map(function (x) { return '<li>' + x + '</li>'; }).join('') + '</ul>' +
      '<h4>' + t('Outils et méthodes', 'Tools and methods') + '</h4><div class="tags">' + tagHtml(p.tags) + '</div>' + vault;
    lastFocus = document.activeElement;
    $('modal').showModal();
    $('modal').scrollTop = 0;
  }

  /* Formation */
  var EDU_ORDER = ['cesi', 'grenoble', 'ensam', 'est', 'bac'];
  function renderEdu() {
    $('edu-list').innerHTML = EDU_ORDER.map(function (k) {
      var d = D.EDU[k];
      return '<article class="edu" id="edu-' + k + '">' +
        '<button type="button" class="edu-head" aria-expanded="false" aria-controls="edub-' + k + '">' +
          '<span class="edu-year">' + L(d.year) + '</span>' +
          '<span><h3>' + L(d.school) + '</h3><span class="edu-deg">' + L(d.degree) + '</span></span>' + CHEV + '</button>' +
        '<div class="edu-body" id="edub-' + k + '" hidden>' +
          '<div><h4>' + t('Cours', 'Courses') + '</h4>' + bullets(L(d.courses)) + '</div>' +
          '<div><h4>' + t('Outils', 'Tools') + '</h4><p>' + d.tools.join(', ') + '</p><h4 style="margin-top:.9rem">' + t('Compétences', 'Skills') + '</h4><p>' + L(d.skills).join(', ') + '</p></div>' +
        '</div></article>';
    }).join('');
  }

  function toggle(btn, force) {
    var open = force !== undefined ? force : btn.getAttribute('aria-expanded') !== 'true';
    btn.setAttribute('aria-expanded', String(open));
    $(btn.getAttribute('aria-controls')).hidden = !open;
  }

  /* Langue */
  function applyLang() {
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-fr]').forEach(function (el) { el.innerHTML = el.getAttribute('data-' + lang); });
    $('btn-fr').setAttribute('aria-pressed', String(lang === 'fr'));
    $('btn-en').setAttribute('aria-pressed', String(lang === 'en'));
    document.title = t('Abdessamad Boussaadah, ingénieur excellence opérationnelle', 'Abdessamad Boussaadah, operational excellence engineer');
    $('m-close').setAttribute('aria-label', t('Fermer', 'Close'));
    renderFlow(); renderExp(); renderProjects(); renderEdu();
  }
  function setLang(l) {
    lang = l;
    try { localStorage.setItem('lang', l); } catch (e) {}
    applyLang();
  }

  /* Interactions : tout passe par une seule délégation */
  document.addEventListener('click', function (ev) {
    var b = ev.target.closest('button, a');
    if (!b) return;
    if (b.id === 'btn-fr') return setLang('fr');
    if (b.id === 'btn-en') return setLang('en');
    if (b.id === 'm-close') return $('modal').close();
    if (b.classList.contains('exp-head') || b.classList.contains('edu-head')) return toggle(b);
    if (b.dataset.exp) {
      var eh = $('exp-' + b.dataset.exp).querySelector('.exp-head');
      toggle(eh, true);
      $('exp-' + b.dataset.exp).scrollIntoView();
      eh.focus({ preventScroll: true });
      return;
    }
    if (b.dataset.edu) {
      var ed = $('edu-' + b.dataset.edu).querySelector('.edu-head');
      toggle(ed, true);
      $('edu-' + b.dataset.edu).scrollIntoView();
      ed.focus({ preventScroll: true });
      return;
    }
    if (b.dataset.proj) return openProject(b.dataset.proj);
    if (b.dataset.cat) {
      cat = b.dataset.cat;
      document.querySelectorAll('.tabs [role=tab]').forEach(function (x) { x.setAttribute('aria-selected', String(x === b)); });
      renderProjects();
    }
  });
  $('modal').addEventListener('click', function (e) { if (e.target === this) this.close(); });
  $('modal').addEventListener('close', function () { if (lastFocus && lastFocus.isConnected) lastFocus.focus(); });

  applyLang();
})();
