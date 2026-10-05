# v3 Produktionsauftrag, Stand 05.10.2026

Basis: Branch deploy/experience-lab-v3-continue, Ausgangscommit 256b7ea (codex/adjust-scroll-sequence-for-text-moments, entspricht dem Stand auf ldt-inc.com). Frühere Claude Branch deploy/experience-lab-v1 (84b8fd6) ist darin enthalten und bleibt unverändert.
Die v3 MD liegt außerhalb des Repos (LDT INC EXPERIENCE LAB/LDT_INC_Claude_Produktionsauftrag_v3_2026-10-01.md). QA Skripte liegen im Experience Lab unter qa/ (v3_copy, v3_qa02, v3_m06, v3_kbd, v3_hash, v3_contrast, v3_frames, v3_rm).

## Bestand erhalten (Codex und frühere Claude Arbeit)
Libre Baskerville, Layer 1 Operating System (Codex Fassung), Connect Lesephasen, Explore schwarz mit Linienfigur, Systemnavigation mit türkiser Code Pille, kompakte Header, Abschlussfooter, Legal, Sitemap, /another-perspective/, Contact. Delivery QA-01 (Core first Pfad, dl-dp), People QA-02, Workshops Trio und Themen, Fokus und Touch Regeln, Technology Kopfabstand verkleinert (Codex 256b7ea).

## Neu in diesem Durchlauf
- Commercial Architecture D F05: Notiz WHAT IT KEEPS liegt nicht mehr auf der Leader Linie.
- Customers D.2 F04: Label NOW STOPPED lesbar (#595959).
- Kontrast: Proposition Evidence Labels und Unterzeile auf 4.5:1.

## Geprüft lokal auf dem aktuellen Stand (Chrome headless, 1440 x 900 bzw. 390 x 844)
Copy 1433 Zeilen (nur 5 bekannte Klickzustände abweichend), QA-02 6 von 6, Rauchtest 26 Ansichten, Direktaufruf, Reload, Zurück, Tastatur 444 Elemente mit Fokusring, Touch Ziele mobil ohne Verstoß, Reduced Motion alle 15 Layer ohne verdeckten Text (nur inaktive Auswahlvarianten, bewusst ausgeblendet), Kontrast Desktop und mobil (verbleibende Treffer sind Outline Schrift, Dekor oder Text auf Verlauf).

## Durchlauf 05.10. Storytelling und Kurzbildschirm (970 x 510)
Alle 133 Frames bei 970 x 510 aufgenommen, Kollisionsdetektor (qa/v3_overlap.py) und Sichtung. Echte Textkollisionen behoben: Proposition A-F06, A-F07, A-F09 (Erklärzeilen in einem Fluss, pz-tx), People C.1-F03 (Rollenfigur unter der Aussage auf kleinen Schirmen). Erzählfolge je Seite geprüft: Auftakt, Spannung, Lesart, Konsequenz und Übergang sind in Bestand und Reihenfolge verständlich, keine Textlücken. Frei von Eingriff: Advantage, Positioning, Expansion, Markets, Operations, Technology, Decisions, Delivery, Commercial Architecture, Partnerships (keine Kollision beim 970er Sichten, Struktur nach Vertrag).

## Durchlauf 05.10. (2): Kollisionen und Figur
Behoben und bei 970 x 510, 1280 x 720 und 390 x 844 gesichtet: Proposition A-F14 (Bereichsnamen unter der Ergebniszeile), A-F06/A-F07/A-F09 mobil (Textblock in voller Breite statt schmaler Spalte), Customers D.2-F05 (Labels nebeneinander, Zeilen unter der Zeitleiste mit Mindestabstand), Revenue D.1-F07 (Skalenlabels mit Mindestabstand, eigene Spalte), People C.1-F03 (Rollenfigur sichtbar, zeigt Auswahl Clarity und Access: Innenkreis 58 Prozent, vier Rücklaufpunkte).
Verbleibende Detektor Meldungen bei 970 x 510 (19, Schwelle .35) einzeln gesichtet: eng gesetzte Display Typografie und Kickerzeilen, keine Lesbarkeitskollision (A.1-F05, C.3-F06, C.2-F11, A+B-F07, C-F05, D.2-F01).
Layer 1 und Workshops narrativ geprüft: Auftakt, Realitäten, Connect, System, Proof, Transformation, Ways (LEAD lead, DRIVE Explore, TEACH Workshops), Contact (Email, LinkedIn) vorhanden in v3 Reihenfolge, Codex Gestaltung unverändert.

## Offen
- Revenue D.1-F07 mobil: Wort "New business" oben leicht angeschnitten (390 x 844), Bestand, nicht behoben.
- Kontrast Messnachweis für Outline Schrift und Text auf Verlauf fehlt (Messmethode unterstützt es nicht).
- Frames bei 1280 x 720 und mobil nur für die korrigierten Frames gesichtet, nicht alle 133.
- Preview Abnahme Frame für Frame durch Lena.
## Freigabe ausstehend
ADD-01 bis 04, Workshop Ergebniszeilen, Screenreader Satz Delivery F06 (Entwurf: "Core first does not depend on the late approval and goes live on 1 November. The remaining scope still depends on the approval and follows on 8 November.").
