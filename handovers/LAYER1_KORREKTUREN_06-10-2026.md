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
