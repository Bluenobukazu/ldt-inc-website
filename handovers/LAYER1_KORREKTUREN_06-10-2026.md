# Layer 1 Korrekturen, 06.10.2026

Ausgangscommit: 4b63c66 (Branch deploy/experience-lab-v3-continue).

## Texte (IST zu SOLL)

1. Connect (index.html, .j-connect): "Multiple realities are read as one connected business system." wird zu "Multiple realities, read as one connected business system." Betonung "business system." unveraendert. Zweiter Text unveraendert.
2. Proof (index.html, .lede): "Experience moves between emerging concepts and established organisations, across brand-led, hospitality, cultural and commercial environments." wird zu "From emerging concepts to established organizations, across brand-led businesses, hospitality, culture and commerce."
3. Transformation (index.html, #tAnchor .when): "Engagements typically begin when vision, operations and commercial reality have outgrown the structure holding them together." wird zu "Vision, operations and commercial reality need a structure that brings them together." (Die separate Seite When to engage, .en-k, bleibt unveraendert.)
4. System CTA (home.js, beide Fassungen os-cl und cm-gq): "Every part of the system opens its own page." wird zu "Start with the overview, then explore each area in depth."

## Scrollverhalten

5. System zu Proof: neue Klasse body.system-exit (home.js, Journey inst 0). Solange eine sichtbare Systemflaeche (.cm-target) die rechte Kapitelnavigation beruehren wuerde, bleibt sie ausgeblendet (explore.css). Desktop 1440 x 900: Navigation kehrt etwa 540 px nach Ende der Pin Phase zurueck, vorher lag sie ueber Delivery und Commercial Architecture. Mobil unveraendert (dort steht #railM links oben).
6. Transformation (home.js, buildTransform): die Phase mit verstreuten Begriffen ist gestrafft (Drift .5 auf .36, Begriffsfolge .1 auf .07, Wipe .54 auf .40, alles danach um .14 vorgezogen). Zusammenfuehrung, Reihenfolge und Endzustand unveraendert. "My role is to connect those layers." erscheint ab .52 waehrend der Zusammenfuehrung, Untertext und Link ab .66. Scrolllaenge 2.6 auf 2.25 Bildschirmhoehen (nur der entfernte Anteil).

## Geprueft lokal (Stand vor Preview)

1440 x 900 und 970 x 510: Connect Text, Entry Text, System Ende, Proof Text, kein Horizontalueberlauf der Viewports, Konsole ohne Fehler. 1440 x 900: Transformation in acht Zustaenden, Rail Sichtbarkeit in 12 Scrollschritten. 390 x 844: Transformation Zustaende.
Offen: Preview Abnahme, 1280 x 720, Tastatur, Reduced Motion, Gesamtdurchlauf.
Beobachtung (auch im Ausgangsstand vorhanden): in der headless Mobil Emulation sind die Woerter in den schwarzen Bloecken der Transformation Endansicht ausgeblendet (clipLabels setzt visibility hidden). Auf echtem Geraet bzw. Preview pruefen.

## Connect Feintuning (Lena, 06.10.)

Befund: zu viel Scrollweg in Connect, und das Grau zu Weiss folgte nicht dem Lesen.
Aenderung (home.js, home.css v305): beide Connect Aussagen werden in Woerter zerlegt (wordsOf), Woerter starten grau (.3) und werden beim Scrollen in Leserichtung weiss (Stagger), danach kurze weisse Haltephase. Haltephasen HOLDS .3/.3 auf .14/.16. Gesamtstrecke der Journey bei 1440 x 900 von 5556 auf etwa 4611 px, 970 x 510 von 3148 auf 2613 px. Entry Text startet jetzt bei Deckkraft 0 und blendet ein, danach wird er weiss. Reduced Motion: Woerter sofort weiss.
Lokal geprueft: 1440 x 900, 970 x 510, 390 x 844 (Umbruch, Weisszustand), Konsole ohne Fehler. Preview Abnahme offen.

## Layer 1 Final Clean QA (06.10.)

Fund und Korrektur: Die Seite war nach dem Transformation Abschnitt 6000 px breit (Hintergrundflaechen der Staende), programmatisch horizontal scrollbar. In der Mobil Emulation weitete sich dadurch der Viewport (innerWidth 390 auf 1560), dadurch blendete clipLabels die Woerter in den schwarzen Transformation Bloecken aus. Korrektur: html{overflow-x:clip} (site.css v59, in allen fuenf Seiten hochgezaehlt). Danach scrollWidth gleich Viewport bei 1440 und 390 (auch Reduced Motion), Woerter in den Bloecken sichtbar, Seitenhoehe unveraendert.
Geprueft lokal: Konsole ohne Fehler (1440, 1280, 970, 390, RM), keine Gedankenstriche im sichtbaren Text, Tab Lauf 70 Stopps (alle Ringe sichtbar, alle im Bild), Rail vor/zurueck ohne Ueberlagerung dauerhaft (Ausblenden beim Rueckwaertsscrollen mit .6 s Einblendung), 24 Stopp Durchlauf bei 1440.
Beobachtungen, nicht geaendert: sieh Bericht an Lena (Ladegewicht, TTF Schriften, Zip Datei in assets/fonts, Frame Zeiten nur Software Rendering).

## Aufraeumen und Schriften (06.10.)

1. Zip Datei assets/fonts/Libre-Baskerville_Webfonts.zip entfernt (nirgends referenziert, Commit a08f087).
2. Libre Baskerville: acht WOFF2 Dateien neben den TTF erzeugt (identische Glyphen und Zeichentabelle, 62 Prozent kleiner, z. B. Regular 152 KB auf 54 KB). site.css (v60) nennt WOFF2 zuerst, TTF als Rueckfall. Preload in index.html und workshops/index.html auf die WOFF2 Dateien. Darstellung unveraendert: Pixelvergleich vorher/nachher bei 1440 x 900 an vier Stellen (Connect, Proof, Ways, Contact), Textbereiche pixelgleich, Abweichungen nur in animierten Flaechen (Navigation, Ringe).

## Nachladen der Layer 2 Stile (06.10.)

index.html: die 14 Stylesheets der Deep Dives (proposition, l2, advantage, positioning, markets, people, technology, decisions, customers, revenue, commercial, operations, expansion, delivery) laden jetzt ohne den ersten Bildaufbau zu blockieren (media="print" mit onload Umschaltung, Attribut data-dd). Ein Skript im Head schaltet sie sofort scharf, wenn die Adresse einen Hash traegt (direkter Deep Dive Aufruf). site, home, explore, layer1 und landing bleiben blockierend. Die Deep Dive Skripte bleiben unveraendert (nur etwa 120 KB, Reihenfolge Abhaengigkeit zu home.js, Nutzen klein).
Geprueft lokal, 1440 x 900: Layer 1 pixelgleich an vier Stellen (nur animierte Ringe weichen ab), Deep Dives direkt per Adresse (Proposition, Revenue, People, Delivery) und nach dem Laden geoeffnet (Customers, Technology) im Endzustand gleich wie vorher. Gedrosselte Ladezeit (4G Profil, drei Laeufe, grosse Streuung): erste Darstellung Median 3456 ms auf 2948 ms, nur Richtwert.

## Experience 05.1 Final Copy (06.10.)

Ausgangscommit f44192a. Alle 13 Textersetzungen wortgleich in index.html (#experience): Hero (xe-k "Same business judgment.", xe-lead, xe-bwf), Achse (xe-axis), Purple Fashion Magazine, Commercial depth ("Pricing strategy and architecture"), Independent practice (Atelier Zeile mit "2016–2023." wie freigegeben, xe-ptxt, xe-psub), Business Stages (Ueberschrift, "Established organization"), Creative (Label "Creative and cultural experience", xe-csub). Alles andere unveraendert. Dieselbe Zeile "Established organisation" in When to engage (#engage, home.js) bewusst nicht angefasst (ausserhalb des Auftrags).
Lokale Layoutkorrektur: nur eine. Das Datum "2016–2023." steht in einem nowrap Span (.xe .xe-atel .nb, layer1.css v7), damit es in der schmalen Spalte nicht allein als Waise umbricht.
Geprueft lokal (Chrome headless, frische Instanz): 1440 x 900, 1280 x 720, 970 x 510, 390 x 844 (Aufnahmen aller geaenderten Bereiche), kein horizontaler Ueberlauf des Overlays, Oeffnen ueber 05.1, Direktaufruf #experience, Reload, Back (landet auf #proof), Back Button, Lead und Contact vom Ende der Seite, Tab Lauf im Overlay (Fokusring sichtbar, Fokus bleibt im Overlay), Reduced Motion (Text, kein Ueberlauf), Konsole ohne Fehler. Hinweis: Mobil meldet die Ueberschrift "Experience" (xe-h) 8 px Ueberstand der Schriftbreite im eigenen Kasten, ohne sichtbaren Anschnitt, bereits im Ausgangsstand.
Offen: Preview Abnahme (Freigabelink nicht lesbar, siehe Chat).

## Deep Dives Proposition bis People, sprachlicher Feinschliff (07.10.)

Ausgangscommit 29be96b. Vollstaendige Textdifferenz: handovers/V3_TEXTDIFFERENZ_05-10-2026.md, Abschnitt "Deep Dives Proposition, Advantage, ... (07.10.2026)". Kurz: American English in allen sieben Seiten inklusive SVG Beschriftung (proposition.js v3) und Screenreader Texten; Advantage ad-stm (Wiederholung des Untertitels ersetzt durch Einleitung in die vier Fragen); People Hero (Frage statt Wiederholung, natuerliche Grafikregel). Alles andere bewusst erhalten (Begruendung dort).
Lokal geprueft (headless Chrome): komplette Scrolldurchlaeufe vorwaerts (alle Frames im Schritt 0.8 Fensterhoehe) und rueckwaerts (Stichprobe) aller sieben Seiten bei 1440 x 900 und 390 x 844: kein horizontaler Ueberlauf, keine Konsolenfehler. Gemeldete Randelemente sind gewollte Dekoration (Proposition Punktfeld, Expansion Kreisbogen der Markets Bruecke). Geaenderte Lesemomente zusaetzlich bei 970 x 510 und 1280 x 720 angesehen (nur 970 genau gesichtet), Reduced Motion bei 1440 x 900 (geaenderte Momente und People Durchlauf). QA-02 People mit echten Klicks (v3_qa02_toggle.py): bad 0.
Nicht geprueft lokal: Tastaturfokus und Kontrast der geaenderten Texte als eigene Messung (Schrift, Farbe, Groesse unveraendert, nur Wortlaut), Rueckwaerts Durchlauf nur in Stichproben.
