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

## Narrativer Abgleich je Frame (Sichtprüfung 1440 x 900 und 970 x 510, Frames mit Änderung markiert)

Methode: jeder Frame im Browser geöffnet und gesichtet; Besucherkenntnis aus der v3 MD gegen die tatsächliche Grafik und den Erklärtext abgeglichen. Das ist eine Sichtprüfung durch Claude, keine menschliche Abnahme. Frames ohne Änderung erfüllen die Position von Grafik, Erklärtext und Frage im Bild.

| Frame | Besucherkenntnis (v3) | Vertrag | Änderung |
|---|---|---|---|
| prop A-F01 | Das Angebot ist nur so stark wie der Betrieb, der es trägt. | erfüllt (Sicht) | keine |
| prop A-F02 | Ein Unternehmen existiert als Angebot, Organisation und Ökonomie. | erfüllt (Sicht) | keine |
| prop A-F03 | Die Proposition trägt, wenn alle drei Bedingungen zusammenpassen. | erfüllt (Sicht) | keine |
| prop A-F04 | Es gibt fünf unterscheidbare Arten des Auseinanderlaufens. | erfüllt (Sicht) | keine |
| prop A-F05 | Zusätzliche Angebote können Organisation und Marge belasten. | erfüllt (Sicht) | keine |
| prop A-F06 | Ein Angebot, das nur durch Heldentaten funktioniert, ist nicht Routine. | erfüllt nach Änderung | Erklärzeilen in einem Textfluss (Kollision 970, mobil) |
| prop A-F07 | Wachstum muss den ursprünglichen Wert weiter tragen. | erfüllt nach Änderung | wie A-F06 |
| prop A-F08 | Nachfrage und Lieferfähigkeit reichen ohne tragfähige Ökonomie nicht. | erfüllt (Sicht) | keine |
| prop A-F09 | Teams können fleißig an unterschiedlichen Geschäftsversprechen arbeiten. | erfüllt nach Änderung | wie A-F06 |
| prop A-F10 | Die Arbeit schützt eine starke Idee vor ihrer gewachsenen Komplexität. | erfüllt (Sicht) | keine |
| prop A-F11 | Entscheidungen beruhen auf Marge, Zeitverwendung und Produktbeitrag. | erfüllt (Sicht) | keine |
| prop A-F12 | Die Auswahl ist eine begründete Führungsentscheidung. | erfüllt (Sicht) | keine |
| prop A-F13 | Lena macht Trade-offs klar und schafft Bedingungen, unter denen sie halten. | erfüllt (Sicht) | keine |
| prop A-F14 | MaHalla belegt Größe, COO-/P&L-Verantwortung und Transformation. | erfüllt nach Änderung | Bereichsnamen unter Ergebniszeile |
| prop A-F15 | Dasselbe Urteil wirkt in unterschiedlichen Arbeitskontexten. | erfüllt (Sicht) | keine |
| prop A-F16 | Advantage, Positioning und Delivery vertiefen drei unterschiedliche Fragen. | erfüllt nach Änderung | Zielcodes als Pillen über den Namen (Desktop und mobil) |
| prop A-F17 | Nicht passende Zusage und Betrieb erfordern Trade-offs. | erfüllt (Sicht) | keine |
| adva A.1-F01 | Unterschiedlichkeit wird erst durch eine veränderte Wahl zum Vorteil. | erfüllt (Sicht) | keine |
| adva A.1-F02 | Nicht jede Besonderheit begründet die Kundenwahl. | erfüllt (Sicht) | keine |
| adva A.1-F03 | Different und Chosen sind zwei getrennte Hürden. | erfüllt (Sicht) | keine |
| adva A.1-F04 | Der Vorteil muss im Alltag halten und tief genug verankert sein. | erfüllt (Sicht) | keine |
| adva A.1-F05 | Wachstum kann die falsche Differenz verstärken. | erfüllt (Sicht) | keine |
| adva A.1-F06 | Der Wahlgrund wird durch People, Routines, Suppliers, Pricing und Margin getragen oder geschwächt. | erfüllt (Sicht) | keine |
| adva A.1-F07 | Die Erfahrung umfasst Produkt, Partnerschaften und Vertrieb. | erfüllt (Sicht) | keine |
| adva A.1-F08 | Advantage verbindet tragfähige Proposition und Marktposition. | erfüllt (Sicht) | keine |
| adva A.1-F09 | Der eigene Wahlgrund verdient einen Test. | erfüllt (Sicht) | keine |
| posi A+B-F01 | Derselbe Betrieb wird in unterschiedlichen Vergleichsrahmen anders gelesen. | erfüllt (Sicht) | keine |
| posi A+B-F02 | Kundenvergleich kann von der benannten Kategorie abweichen. | erfüllt (Sicht) | keine |
| posi A+B-F03 | Consultant und Couple vergleichen denselben Ort nach unterschiedlichen Erwartungen. | erfüllt (Sicht) | keine |
| posi A+B-F04 | Sechs einzeln plausible Entscheidungen können eine andere Position erzeugen. | erfüllt (Sicht) | keine |
| posi A+B-F05 | Positionierung zeigt sich in kommerzieller Realität. | erfüllt (Sicht) | keine |
| posi A+B-F06 | Lena hat direkt an Price, Channel und Product gearbeitet. | erfüllt (Sicht) | keine |
| posi A+B-F07 | Eine Position muss einen Kontextwechsel überstehen. | erfüllt (Sicht) | keine |
| expa B-F01 | Wachstum verändert die Bedingungen des Betriebs. | erfüllt (Sicht) | keine |
| expa B-F02 | Kopieren überträgt nicht automatisch die tragenden Bedingungen. | erfüllt (Sicht) | keine |
| expa B-F03 | Distanz und Volumen machen Konzentrationen sichtbar. | erfüllt (Sicht) | keine |
| expa B-F04 | Wachstum benötigt gezielte Veränderung bei erkennbarem Kern. | erfüllt (Sicht) | keine |
| expa B-F05 | Orders verlangen, dass die gesamte operative Kette mitträgt. | erfüllt (Sicht) | keine |
| expa B-F06 | Expansionsbereitschaft sagt noch nicht, welcher Markt passt. | erfüllt nach Änderung | Kreislinie hinter der Frage |
| mark B.1-F01 | Marktzugang hängt von Bedingungen zwischen Betrieb und Kunde ab. | erfüllt (Sicht) | keine |
| mark B.1-F02 | Geografische Nähe garantiert keine ähnliche Geschäftsrealität. | erfüllt (Sicht) | keine |
| mark B.1-F03 | Fashion, B2B, Hospitality und Culture setzen unterschiedliche Zugangsbedingungen. | erfüllt (Sicht) | keine |
| mark B.1-F04 | Die Route verändert Kundensicht, Kontrolle und Kosten. | erfüllt (Sicht) | keine |
| mark B.1-F05 | Erfahrung ist marktspezifische Arbeit über 37 Märkte. | erfüllt (Sicht) | keine |
| mark B.1-F06 | Lena hat Distribution, Showrooms, Direct wholesale und Product introduction bearbeitet. | erfüllt (Sicht) | keine |
| mark B.1-F07 | Markt- und Routenwahl erzeugen betriebliche Zusagen. | erfüllt (Sicht) | keine |
| oper C-F01 | Eine gesunde Operation muss täglich viele Rhythmen gleichzeitig tragen. | erfüllt (Sicht) | keine |
| oper C-F02 | Probleme entstehen oft zwischen leistungsfähigen Funktionen. | erfüllt (Sicht) | keine |
| oper C-F03 | Ein Signal kann Risiko oder Möglichkeit sein, abhängig vom frühen Lesen. | erfüllt (Sicht) | keine |
| oper C-F04 | Situatives Urteil ist etwas anderes als wöchentliche Systemkompensation. | erfüllt (Sicht) | keine |
| oper C-F05 | Struktur muss ausreichend tragen, ohne selbst zum Hindernis zu werden. | erfüllt (Sicht) | keine |
| oper C-F06 | MaHalla verband viele Formate in einer COO-verantworteten Operation. | erfüllt (Sicht) | keine |
| oper C-F07 | Orders und Produktkonzepte müssen durch unterschiedliche operative Ketten getragen werden. | erfüllt (Sicht) | keine |
| oper C-F08 | People tragen, Technology erweitert, Decisions richtet aus; Delivery prüft das Zusammenspiel. | erfüllt nach Änderung | Plus Kreise überdecken Namen nicht |
| peop C.1-F01 | Wenige Personen können mehr tragen, als ihre Rolle vermuten lässt. | erfüllt (Sicht) | keine |
| peop C.1-F02 | Eine besetzte Rolle kann Arbeit trotzdem zurückgeben. | erfüllt (Sicht) | keine |
| peop C.1-F03 | Context, Clarity, Capability, Confidence, Access und Outcome ermöglichen Verantwortung. | erfüllt nach Änderung | Rollenfigur sichtbar, Auswahl, Figur und Missing Zeile gleiche Menge (Klicktest) |
| peop C.1-F04 | Ein Team verteilt Wissen, Kontext und Verantwortung statt alles durch eine Person zu führen. | erfüllt (Sicht) | keine |
| peop C.1-F05 | Kultur zeigt sich an Verhalten unter Belastung. | erfüllt (Sicht) | keine |
| peop C.1-F06 | Informelles Wissen ist Stärke und mögliche Konzentration. | erfüllt (Sicht) | keine |
| peop C.1-F07 | Wissen kann geteilt werden, ohne die erfahrene Person kleiner zu machen. | erfüllt (Sicht) | keine |
| peop C.1-F08 | Mehr Personen bedeuten nicht automatisch mehr gemeinsame Kapazität. | erfüllt (Sicht) | keine |
| peop C.1-F09 | Die passende People-Struktur hängt vom Geschäftsraum ab. | erfüllt (Sicht) | keine |
| peop C.1-F10 | Lena hat Teams geführt, funktionsübergreifend ausgerichtet und für Umsetzung befähigt. | erfüllt (Sicht) | keine |
| peop C.1-F11 | Lena liest Arbeit, Wissen und Rückläufe; Technology und Decisions ergänzen diese Betrachtung. | erfüllt (Sicht) | keine |
| tech C.2-F01 | Technologie wird am getragenen Arbeitsprozess beurteilt. | erfüllt (Sicht) | keine |
| tech C.2-F02 | Zusätzliche Tools können Komplexität nur verlagern. | erfüllt (Sicht) | keine |
| tech C.2-F03 | Manuelle Berührungen können steigen oder sinken, abhängig vom Systemdesign. | erfüllt (Sicht) | keine |
| tech C.2-F04 | Stabile Wiederholung kann systemgetragen werden; Ausnahmen verlangen Urteil. | erfüllt (Sicht) | keine |
| tech C.2-F05 | Lena beobachtet zuerst, identifiziert stabile Wiederholung und übergibt genau diese. | erfüllt (Sicht) | keine |
| tech C.2-F06 | Werkzeuge haben Rollen, Lena die letzte Entscheidung. | erfüllt (Sicht) | keine |
| tech C.2-F07 | Die Website ist ein unter Lenas Leitung erstelltes Arbeitsbeispiel. | erfüllt (Sicht) | keine |
| tech C.2-F08 | Mehrere Werkzeuge brauchen einen eindeutigen Eigentümer für denselben Zustand. | erfüllt (Sicht) | keine |
| tech C.2-F09 | Zustände müssen eindeutig, Schritte nachvollziehbar und wiederherstellbar sein. | erfüllt (Sicht) | keine |
| tech C.2-F10 | Dasselbe Prinzip beantwortet unterschiedliche betriebliche Fehlerstellen. | erfüllt (Sicht) | keine |
| tech C.2-F11 | Technologiearbeit begann mit realen Wholesale-Prozessen vor AI. | erfüllt (Sicht) | keine |
| tech C.2-F12 | Technologie trägt Arbeit, bestimmt aber nicht, was wichtig ist. | erfüllt (Sicht) | keine |
| deci C.3-F01 | Aktivität kann ohne Richtung bleiben. | erfüllt (Sicht) | keine |
| deci C.3-F02 | Zuerst muss die konkrete Entscheidung mit Scope und Deadline benannt werden. | erfüllt (Sicht) | keine |
| deci C.3-F03 | Entscheidungen benötigen unterschiedliche Autorität nach Gewicht und Reversibilität. | erfüllt (Sicht) | keine |
| deci C.3-F04 | Material input und Context helfen einem klaren Mandat zu entscheiden. | erfüllt (Sicht) | keine |
| deci C.3-F05 | Eskalation braucht eine relevante Schwelle. | erfüllt (Sicht) | keine |
| deci C.3-F06 | Eine Entscheidung muss geschlossen sein und nachfolgendes Handeln ändern. | erfüllt (Sicht) | keine |
| deci C.3-F07 | Lena verantwortete kommerzielle Entscheidungen und koordinierte Spezialwissen sowie externe Freigaben. | erfüllt (Sicht) | keine |
| deci C.3-F08 | Entscheidung wird erst durch Ausführung relevant. | erfüllt (Sicht) | keine |
| deli C+D-F01 | Erfüllung zählt beim Empfänger der Zusage. | erfüllt (Sicht) | keine |
| deli C+D-F02 | Eine lieferbare Zusage braucht präzise Bedingungen. | erfüllt (Sicht) | keine |
| deli C+D-F03 | Confirmed und assumed sind unterschiedliche Zustände. | erfüllt (Sicht) | keine |
| deli C+D-F04 | Die Begründung muss mit Datum und Scope durch Übergaben reisen. | erfüllt nach Änderung | Core first Bahn (QA-01) |
| deli C+D-F05 | Frühes Erkennen einer gebrochenen Bedingung eröffnet Handlungsraum. | erfüllt nach Änderung | Approval Linie zu 08 Nov (QA-01) |
| deli C+D-F06 | Zusage kann offen neu vereinbart oder still kostenwirksam verändert werden. | erfüllt nach Änderung | Core first / verbleibender Scope getrennt (QA-01) |
| deli C+D-F07 | Order, neues Angebot und Live-Moment haben verschiedene Flexibilität. | erfüllt (Sicht) | keine |
| deli C+D-F08 | Interner Taskabschluss ist nicht Empfängererfüllung. | erfüllt (Sicht) | keine |
| deli C+D-F09 | Ankunft muss auf Inhalt, Standard und Teamfähigkeit geprüft werden. | erfüllt (Sicht) | keine |
| deli C+D-F10 | Gelerntes verändert die nächste Verpflichtung. | erfüllt (Sicht) | keine |
| deli C+D-F11 | Das kommerzielle Modell muss um das verlässlich Leistbare gebaut werden. | erfüllt (Sicht) | keine |
| comm D-F01 | Dasselbe Angebot kann durch seine Bedingungen stark oder schwach werden. | erfüllt (Sicht) | keine |
| comm D-F02 | Historisch plausible Entscheidungen gelten heute gleichzeitig. | erfüllt (Sicht) | keine |
| comm D-F03 | Regionsexklusivität plus Direktvertrieb oder Fixscope plus Extras können sich widersprechen. | erfüllt (Sicht) | keine |
| comm D-F04 | Margensignal kann auf eine frühere Preisentscheidung zurückgehen. | erfüllt (Sicht) | keine |
| comm D-F05 | Umsatzvolumen und verbleibender Beitrag sind verschieden. | erfüllt nach Änderung | WHAT IT KEEPS neben Leader Linie |
| comm D-F06 | Ein Reset klärt Trade-offs, ohne alle Spannungen oder Umsatzverluste zu beseitigen. | erfüllt (Sicht) | keine |
| comm D-F07 | Die Struktur verlangt getrennte Prüfung von Erlöslogik und Beziehungen. | erfüllt (Sicht) | keine |
| reve D.1-F01 | Gesamterlös muss nach seinen Quellen gelesen werden. | erfüllt (Sicht) | keine |
| reve D.1-F02 | Gleiches Total kann Konzentration, Wiederholung oder Einmalprojekte bedeuten. | erfüllt (Sicht) | keine |
| reve D.1-F03 | Earned, Confirmed, Expected und Potential sind unterschiedliche Planungssicherheit. | erfüllt (Sicht) | keine |
| reve D.1-F04 | Ein kaum verändertes Total kann fallendes Repeat und steigendes New verbergen. | erfüllt (Sicht) | keine |
| reve D.1-F05 | Eine positive Quelle rechtfertigt je nach Evidenz unterschiedliche Eingriffe. | erfüllt (Sicht) | keine |
| reve D.1-F06 | Frühes Lesen von Sell-in und Reorders kann Rangeentscheidungen beeinflussen. | erfüllt (Sicht) | keine |
| reve D.1-F07 | Ein Gewinn kann Basisverlust verdecken oder neue Abhängigkeit schaffen. | erfüllt nach Änderung | Skalenlabels Mindestabstand, eigene Spalte, mobil nicht angeschnitten |
| reve D.1-F08 | Planbarkeit, Wachstumsbasis und Abhängigkeit sind drei Lesarten derselben Daten. | erfüllt (Sicht) | keine |
| reve D.1-F09 | Erlöslogik hängt von Kunden- und Partnerbeziehungen ab. | erfüllt (Sicht) | keine |
| cust D.2-F01 | Customer bezeichnet unterschiedliche Beziehungen. | erfüllt (Sicht) | keine |
| cust D.2-F02 | Bestehende Leistung und erwartete Beziehung können auseinanderliegen. | erfüllt (Sicht) | keine |
| cust D.2-F03 | Antwortzeit ist eine konkrete Beziehungserfahrung. | erfüllt (Sicht) | keine |
| cust D.2-F04 | Fehlende Initiierung ist nicht gleich ausbleibende Antwort. | erfüllt nach Änderung | NOW STOPPED lesbar |
| cust D.2-F05 | Lena liest Verlauf vor Bedeutung. | erfüllt nach Änderung | Labels nebeneinander, Mindestabstand Zeitleisten Zeilen |
| cust D.2-F06 | Ein Widerspruch führt zu gezielter Kontextprüfung. | erfüllt (Sicht) | keine |
| cust D.2-F07 | Interesse kann bestehen, obwohl der übliche Ansprechpartner fehlt. | erfüllt (Sicht) | keine |
| cust D.2-F08 | Ein Anruf kann präziser passen als eine große Maßnahme. | erfüllt (Sicht) | keine |
| cust D.2-F09 | Eine veränderte Beziehung verlangt erneute Erwartungsklärung. | erfüllt (Sicht) | keine |
| cust D.2-F10 | Partner sind eine weitere tragende Beziehung. | erfüllt (Sicht) | keine |
| part D.3-F01 | Zwei eigenständige Beiträge können eine neue gemeinsame Möglichkeit schaffen. | erfüllt (Sicht) | keine |
| part D.3-F02 | Partnership ist eine von sechs Routen für einen bestimmten Capability gap. | erfüllt (Sicht) | keine |
| part D.3-F03 | Die Beiträge müssen einen funktionierenden Werttausch ermöglichen. | erfüllt (Sicht) | keine |
| part D.3-F04 | Gemeinsamer Wert ist eine neue Kombination, nicht bloß Addition. | erfüllt (Sicht) | keine |
| part D.3-F05 | Access, Speed, Reach und Exclusivity bringen unterschiedliche Trade-offs. | erfüllt (Sicht) | keine |
| part D.3-F06 | Ein Vertrag ersetzt kein Operating Model. | erfüllt (Sicht) | keine |
| part D.3-F07 | Sechs betriebliche Bedingungen machen die Beziehung arbeitsfähig. | erfüllt (Sicht) | keine |
| part D.3-F08 | Unter Belastung zeigen sich konkrete Beziehungsmuster. | erfüllt (Sicht) | keine |
| part D.3-F09 | Lena liest Muster und greift an den operativen Bedingungen an. | erfüllt (Sicht) | keine |
| part D.3-F10 | Fortsetzen, Vertiefen oder Beenden sind bewusste Optionen. | erfüllt (Sicht) | keine |
| part D.3-F11 | Revenue, Customers, Markets und Delivery vertiefen unterschiedliche Partnerschaftsbedingungen. | erfüllt (Sicht) | keine |

## Offene Kontrastbefunde: keine ungeklärten. Pixelmessung (qa/v3_pixel.py) an 14 zuvor gemeldeten Stellen: alle zwischen 5.7 und 21.0 zu 1.


## Durchlauf 05.10. (3): Redaktionelle Freigabe, narrative Prüfung je Seite

Neue Lage: Die Copy-Sperre (wortgleich, M07, "Textentscheidung: ERHALTEN") ist ausser in den Codex-Bereichen aufgehoben. Texte, Fragen und Grafikbeschriftungen dürfen narrativ überarbeitet werden. Fakten bleiben verbindlich, ADD-01 bis 04, Workshop-Ergebnisentwürfe und der Delivery-F06-Screenreader-Satz bleiben separat ausstehend.

Prüfraster je Seite: Situation | was Lena erkennt | Entscheidung oder Intervention | Konsequenz | Übergang. Grundlage: Sichtung der Seiten im Browser (Layer 1 bei 1440 gescrollt, alle Deep Dives bei 390 und 1280, Teile bei 970 und 1440; Partnerships auf Desktop erst jetzt durch echtes Scrollen, siehe Korrektur unten).

### Narrative Bewertung und Änderungen

| Seite | Bewertung | Textänderung (Vorher / Nachher) | Grafik oder Layout |
|---|---|---|---|
| Layer 1 | Auftakt, Complexity, Connect, System, Proof, Transformation, Ways to Work, Contact folgen einem klaren Bogen. Complexity trägt nur Titel und Grafik, der Satz dazu steht erst in Connect. Geschützte Bereiche nicht angefasst. | Proof: "organizations" / "organisations" (einheitlich britisch) | keine. Vorschlag: einen kurzen Satz zur Complexity-Grafik prüfen (ausstehend, Codex-Bereich Connect-Folge) |
| Workshops | Reihenfolge Frage, Herkunft der Frameworks, fünf Frameworks, Formate, Umfelder, Kontakt trägt. | keine | keine |
| Proposition | Situation (drei Existenzen), Drift in fünf Formen, Eingriff, Belege tragen. Lena-Bezug im Eingriff war unpersönlich. | A-F10: "The work is rarely" / "My work is rarely" | Bridge-Codes A-F16 als Pillen (früher) |
| Advantage | Vier Tests, Wachstum, Operation, Belege tragen. Bei "Reinforced" wiederholte der Untertext die Aussage. | A.1-F04: "The advantage has to hold in everyday delivery." / "It has to work on an ordinary day, without heroics." | Bridge-Pille A.1-F08 |
| Positioning | Wahrnehmung, Vergleich, Hotel-Szenario, Position wird unterlaufen, Belege tragen. Die Prüfregel war unpersönlich. | A+B-F05: "Brand intent meets its test in the price list, ..." / "I test brand intent against the price list, ..." | Bridge-Pille A+B-F07 |
| Expansion | Nicht Replikation, Abhängigkeiten, selektiver Wandel tragen. Es fehlte, was Lena daraus entscheidet. | B-F04 neu: "I decide what stays core before the business scales, so everything else can change without losing it." | B-F01 bis B-F04: Labels mit Halo, Speichen laufen nicht mehr durch die Schrift. Bridge-Pille B-F06 |
| Markets | Reichweite, Bedingungen, Route, Belege tragen. Regel der Route war unpersönlich. | B.1-F04: "Commitment can deepen as the evidence does." / "I let commitment deepen as the evidence does." | Bridge-Pille B.1-F07 |
| Operations | Rhythmus, System, Signale, Eingriff, Struktur, Belege tragen. | keine | C-F04: Punktreihen beginnen rechts der Titel (mobil) |
| People | Rolle, Bedarf, Team, Kultur, Kapazität, Praxis tragen. | keine | C.1-F03: Figur ab 1400 px Breite unter den Bedingungen (bei 1280 überdeckte sie "The outcome") |
| Technology | Last der Technik, Automatisierung, Wahrheit mit einem Eigentümer, Praxis tragen. | keine | C.2-F03, C.2-F06 mobil: Label und Satz laufen nicht mehr zusammen |
| Decisions | Entscheidung benennen, Gewicht, Input gegen Autorität, Schwelle, Commitment tragen. | keine | C.3-F08: Eyebrow der Brücke einzeilig statt vier schmale Zeilen |
| Delivery | Versprechen, Szenario, Bedingungen, Übergaben, Ausnahme, Entscheidung tragen (stark in Ich-Form). | keine | keine |
| Commercial Architecture | Offer, Entscheidungen im Zusammenspiel, Konto, Konsequenz tragen. | keine | D-F01, D-F02 mobil: Labels weiter ausserhalb der Platten, Kernlabel mit schwarzem Grund |
| Revenue | Summe, drei Geschäfte, Planbarkeit, Signal, Abhängigkeit tragen. | keine | D.1-F04 mobil: "THIS YEAR" nicht mehr abgeschnitten. D.1-F07: Kopf auf Abstand zur Skala, "New business" mobil nicht mehr angeschnitten |
| Customers | Label, Erwartung, Initiative, Kontext, Antwort tragen. In D.2-F05 war die Aussage kleiner als ihre Erklärung. | keine | D.2-F05: Aussage grösser als Erklärung. D.2-F04: Labels nicht mehr übereinander |
| Partnerships | Ablauf Interdependenz bis Entscheidung trägt. Lena-Bezug stand fast nur im Eingriff. | D.3-F02: "Define the capability gap first, ..." / "I define the capability gap first, ..." | D.3-F03: "Different contributions. One workable value exchange." / "I look for different contributions that form one workable value exchange." D.3-F05: "What did we gain, what did we give up, ..." / "What did each side gain, what did it give up, ..." |

Vollständige Textdifferenz: handovers/V3_TEXTDIFFERENZ_05-10-2026.md.

### Korrektur zu früheren Angaben
Bei Partnerships sind die Anker pm-s1 bis pm-s7 auf Desktop Marker ohne Höhe. Meine früheren Frame-Aufnahmen D.3-F01 bis F10 zeigten dort alle denselben Einstieg. Diese Frames sind erst jetzt per Scroll in 1440 x 900 gesichtet worden. Bei 1280 x 720 und 970 x 510 liegen Scroll-Aufnahmen vor (qa/shots/fr/sc*), aber nur 1440 wurde ausgewertet. Bei D.3-F07 war der Satz in der weissen Leiste rechts abgeschnitten, jetzt vollständig.

### Geschützte Codex-Bereiche
Operating-System-Moment mit Linienzeichnung, Explore, Systemnavigation, Navigation und Codes, Header und Seitenleiste, Kapitelnavigation, Connect-Folge, Contact, Footer, Sitemap, Another Perspective, Legal, Libre Baskerville: nicht verändert. Hinweis: /another-perspective/ schreibt "organizations", "Programs" und "organization" (amerikanisch), die übrige Website britisch. Als Vorschlag dokumentiert, nicht geändert.

### Weiterhin ausstehend
ADD-01 bis 04, Workshop-Ergebnisentwürfe, Delivery-F06-Screenreader-Satz. Menschliche Seitenprüfung durch Lena.

### QA Durchlauf 05.10. (3), Stand bf87aee
Bestanden (lokal, 127.0.0.1): Rauchtest 26 Ansichten (bad 0, die erste Ansicht scheitert bei kaltem Start gelegentlich und besteht beim Wiederholen), Direktaufruf, Reload und Zurück (bad 0), QA-02 inklusive Umschalttest (2 Zustände geprüft, Figur, Fehlt-Zeile und zweite Figur identisch), Touch-Ziele 390 x 844 (keine Verstösse), echter Tab-Lauf (444 Elemente, alle mit Fokusring), Reduced Motion (kein versteckter Text, kein horizontaler Scroll), Pixelkontrast an 6 Stellen (mindestens 7,0:1).
Sichtung im Browser: geänderte Frames bei 390, 970 (Revenue D.1-F07), 1280 und 1440. Alle 133 Frames bei 390 und 1280 per Kontaktbogen, Partnerships Desktop nur bei 1440 ausgewertet.
Preview (ldt-inc-git-deploy-experience-lab-v1): neuer Stand ausgeliefert, Expansion B-F04 mit neuer Zeile und Label-Halo geprüft, keine Konsolenfehler. Weitere Seiten dort nicht einzeln gesichtet.
Nicht bestanden oder offen:
- Skript v3_m06.py focus meldet viele Elemente (Navigation, Index, Codes). Der echte Tab-Lauf zeigt für dieselben Elemente einen Ring. Ich werte das Skript als unzuverlässig, habe es aber nicht weiter untersucht.
- DOM-Kontrast meldet 1,00 für "Our contribution" (Partnerships, per Pixel 21:1 geprüft) und für "This is often where I enter" im System-Overlay mobil (nicht per Pixel nachgemessen, Codex-Bereich).
- 970 x 510: nur Revenue D.1-F07 und die bereits früher korrigierten Frames neu gesichtet. Nach den heutigen Änderungen kein erneuter 970er Lauf.
- Textvorschlag Layer 1: Der Complexity-Grafik fehlt ein erklärender Satz. Nicht umgesetzt, weil die Connect-Folge geschützt ist.


## Seitenübersicht 06.10. (maßgebliche Tabelle, ersetzt die Seitentabelle vom 05.10. (3))

Status: K = narrativ korrigiert und geprüft, U = narrativ geprüft und unverändert. Alle Spalten beziehen sich auf den Stand dieses Durchlaufs. Die frameweise Vertragsprüfung steht in der Frame-Tabelle weiter oben, die Textdifferenz in V3_TEXTDIFFERENZ_05-10-2026.md.

| Seite | Erzählfolge und Lena-Beitrag | Befund | Änderung (Frame) | Erkenntnis für den Besucher | QA und Status |
|---|---|---|---|---|---|
| Layer 1 | Auftakt, Complexity, Connect, System, Proof, Transformation ("My role is to connect those layers"), Ways to Work, Contact. Lena spricht in Connect und Transformation. | Die Complexity-Grafik steht ohne eigenen Satz, der erklärende Satz kommt erst in Connect. | Proof: "organisations" (einheitlich britisch). Vorschlag: einen Satz zur Grafik, Connect-Folge geschützt. | Der Besucher versteht: Komplexität wird zu einem System, Lena verbindet die Schichten. | Smoke, Hash, Tab, Touch bestanden (lokal). Status K, Vorschlag offen |
| Experience | MaHalla, Nina Ricci, Rick Owens, Purple, Mandate, Wirkung, Praxis, kreative Fluenz, Schluss. Lena als COO und Verantwortliche je Kontext. | Gesichtet in 1440 Scrollzuständen: Jede Karte nennt Rolle, Umfeld und Wirkung, die Kennzahlen stehen als Spannen. Keine Lücke. | keine | Derselbe Betriebssinn trägt in sehr verschiedenen Umfeldern. | Gesichtet 1440. Status U |
| When to engage | Ausgangslage (Vision, Betrieb, Kommerz überholen die Struktur), dann drei Anlässe mit je einer Figur. | Grafik und Text zeigen dieselben drei Situationen. Ein Satz zu Lenas Vorgehen fehlt, würde aber Wiederholung zu Lead erzeugen. | keine | Der Besucher erkennt, in welcher Lage ein Einsatz beginnt. | Gesichtet 1440. Status U |
| Lead | "I take responsibility inside the business", Mandate, sechs Leistungen mit Zeitleiste. | Verantwortung ist konkret in der Liste. | keine | Lead heisst Verantwortung für Ergebnis, Entscheidungsstruktur und Umsetzung. | Gesichtet 1440. Status U |
| Workshops | Frage, Herkunft (20+), fünf Frameworks mit Matrix, Formate, Umfelder, Kontakt. | Die Reihenfolge von Frage zu Format trägt, die Matrix erklärt, welche Frage jedes Framework beantwortet. | keine | Der Besucher versteht Frameworks, Format und den Einstieg über den Kontext. | Gesichtet 1440. Status U |
| Proposition | Ein Angebot existiert dreimal, Ausrichtung, fünf Drifts, Eingriff, Beleg MaHalla. | Der Eingriff war unpersönlich formuliert. | A-F10: "My work is rarely to find a new idea." Codes A-F16 | Das Problem liegt selten in der Idee, sondern im gewachsenen Betrieb darum. | Gesichtet 390, 970, 1440. Status K |
| Advantage | Vier Tests, Wachstum, Wahlgrund in die Operation, Beleg. | Bei "Reinforced" wiederholte der Untertext die Aussage. | A.1-F04: "It has to work on an ordinary day, without heroics." Bridge A.1-F08 | Ein Vorteil muss im Alltag halten, nicht nur beim Verkauf. | Gesichtet 390, 1280, 1440. Status K |
| Positioning | Wahrnehmung, Vergleichsrahmen, Hotel, unterlaufene Position, Beleg. | Die Prüfregel stand ohne Lena. | A+B-F05: "I test brand intent against the price list, the account list and the order book." Bridge A+B-F07 | Position wird an Preisliste, Accounts und Orders geprüft. | Gesichtet 390, 1280, 1440. Status K |
| Expansion | Nicht Replikation, Abhängigkeiten, selektiver Wandel, Beleg. | Es fehlte, was Lena entscheidet. Beschriftungen wurden von Speichen durchkreuzt. | B-F04 neue Zeile "I decide what stays core ..." B-F01 bis B-F04 Label-Halo | Der Kern wird vor dem Wachstum festgelegt, der Rest darf sich ändern. | Gesichtet 390, 1280, 1440 und auf Preview. Status K |
| Markets | Distanz, Realität je Markt, Route, 37 Märkte, Brücke. | Die Routenregel war unpersönlich. | B.1-F04: "I let commitment deepen as the evidence does." Bridge B.1-F07 | Die Route entscheidet, was man sieht, steuert und behält. | Gesichtet 390, 1280, 1440. Status K |
| Operations | Rhythmus, System, Signale, Eingriff, Struktur, drei Realitäten. | Signale und Eingriff tragen. | C-F04 mobil Punktreihen versetzt | Gesunde Betriebe müssen jeden Morgen wieder funktionieren. | Gesichtet 390, 1280, 1440. Status K (nur Layout) |
| People | Rolle, Bedarf, Team, Kultur, Wissen, Kapazität, Praxis. | Figur überdeckte bei 1280 "The outcome". | C.1-F03 Figur ab 1400 px unterhalb | Rolle und Verantwortung sind zwei Dinge. | QA-02 siehe unten. Status K |
| Technology | Last, Automatisierung, eine Wahrheit, Rollen der Werkzeuge. | Label liefen mobil in die Sätze. | C.2-F03, C.2-F06 Abstände | Technik trägt Arbeit, Urteil bleibt bei Lena. | Gesichtet 390, 1280, 1440. Status K (nur Layout) |
| Decisions | Entscheidung benennen, Gewicht, Input und Autorität, Schwelle, Commitment. | Brückenzeile brach in vier Zeilen. | C.3-F08 Eyebrow einzeilig | Eine Entscheidung ist erst fertig, wenn sie schliesst. | Gesichtet 390, 1280, 1440. Status K (nur Layout) |
| Delivery | Versprechen, Szenario, Bedingungen, Übergaben, Ausnahme, Schutz, Art des Versprechens. | Die Geschichte trägt: Szenario wird durchgehend in Ich-Form verfolgt. | keine | Ein Versprechen gilt erst, wenn es ankommt. | QA-01 siehe unten. Status U |
| Commercial Architecture | Ein Angebot, Entscheidungen im Zusammenspiel, Problem zeigt sich später, Konto, Konsequenz. | Grafik und Text erklären denselben Zusammenhang. | D-F01, D-F02 mobil Labels weiter aussen | Gute Einzelentscheidungen können sich gegenseitig aufheben. | Gesichtet 390, 1280, 1440. Status K (nur Layout) |
| Revenue | Summe, drei Geschäfte, planbar, Signal, Reflex, Abhängigkeit. | Mobil waren "THIS YEAR" und "New business" angeschnitten. | D.1-F04, D.1-F07 | Eine Summe sagt nicht, worauf sie beruht. | Gesichtet 390, 970, 1280, 1440. Status K (nur Layout) |
| Customers | Label, Erwartung, Initiative, Kontext, Antwort. | In D.2-F05 war die Aussage kleiner als ihre Erklärung. | D.2-F05 Grösse, D.2-F04 Labels | Schweigen heisst noch nicht Desinteresse. | Gesichtet 390, 1280, 1440. Status K |
| Partnerships | Interdependenz, Route, Partnerwahl, Gemeinsamer Wert, Trade-offs, Betrieb, Druck, Eingriff, Entscheidung. | Lena-Bezug stand fast nur im Eingriff. | D.3-F02, D.3-F03, D.3-F05 Texte. D.3-F07 Satz in der Leiste vollständig | Eine Partnerschaft wird im Betrieb getestet. | Echte Scrollzustände 970, 1280, 1440 gesichtet (nach Leistenfix). Status K |
| Explore (Overlay, mobil) | Systemkarten mit Eintrittssatz. | Der Satz "This is often where I enter" war mobil schwarz auf schwarz. | Farbe weiss, Layout nicht angefasst | Wo Lena einsteigt. | Gemessen und gesichtet. Status K |

### QA-02 Nachweis, Zuordnung
- Vollständiger Zustandsnachweis (14 Klicks, alle Zustände) auf Stand 3500c55 (05.10. (1)).
- Seitdem People nur im Layout verändert (Figur unterhalb ab 1400 px, keine Logik). Danach: 2 Zustände per echtem Klick (Stand bf87aee) und Vollauswahl, Reload, Zustandsabfolge.
- Auf der Preview wird der Zustandsablauf am Ende dieses Durchlaufs erneut geprüft (siehe unten).

### QA Abschluss 06.10., Stand ed87f68 (Preview ldt-inc-git-deploy-experience-lab-v1)
Auf der veröffentlichten Preview geprüft (Skripte qa/v3_preview.py, v3_qa01_preview.py, v3_qa02_toggle.py, v3_flow.py über qa/v3_on_preview.py):
- Geänderte Text- und Grafikstellen, 19 Frames bei 1440 x 900 und 390 x 844: alle 8 Textänderungen im DOM vorhanden, Layout-Frames gesichtet, keine Konsolenfehler. Nicht auf der Preview gesichtet: 970 x 510 und 1280 x 720 (dort nur lokal).
- QA-01 (Delivery): Vertrag im DOM bei 1280 und 390 bestanden (Approval 20 Oct auf 27 Oct, Commitment live 01 Nov auf 08 Nov, Core first 01 Nov unabhängig, Rest hängt an der Freigabe, Changed openly gegen Changed quietly). Bilder von dl-ex und dl-ad gesichtet.
- QA-02 (People): 14 echte Klicks nacheinander, jeder Zustand mit Fehlt-Zeile, Figurenradius und beiden Figuren identisch (bad 0). Damit ist der Zustandsnachweis auf dem veröffentlichten Stand vollständig.
- Experience-Durchlauf: Landing, Contact erreichbar am Seitenende (E-Mail, LinkedIn), Explore öffnen, Deep Dive öffnen, Zurück, Brückenlink in Customers vorhanden, Desktop und mobil, keine Konsolenfehler. Das ist ein Funktionsdurchlauf, keine Neubewertung der Gestaltung der geschützten Module.
- Partnerships 970 x 510 und 1280 x 720: echte Scrollzustände nach dem Leistenfix gesichtet, Satz in der weissen Leiste vollständig.
- Fokus: v3_m06.py focus war ein Prüfskriptfehler (Fokus per Code löst :focus-visible nicht aus). Echter Tab-Lauf auf Customers, Partnerships und Explore (77 Elemente): alle mit Ring, alle :focus-visible. Skript mit Hinweis versehen.
- Kontrast "This is often where I enter": echter Fehler mobil (schwarz auf schwarz, unsichtbar), behoben (weiss). Desktop war weiss. Ein Reveal-Zwischenstand existiert dort nicht, der Satz steht im Mobil-Layout statisch am Seitenende des Overlays.

Verbleibend sichtbar (nicht behoben):
- Commercial Architecture D-F01 mobil: Der Rand einer Platte berührt noch die Labels "What is agreed" und "How it is bought".
- Partnerships D.3-F08 (Lena intervention): Die Karte "Lena intervention" berührt das Ende des Satzes. Die Karte wiederholt zudem das Label darüber.
- Layer 1: Satz zur Complexity-Grafik (Vorschlag, geschützt). Mobil steht der Eintrittssatz im Explore-Overlay am Ende der Seite, möglicherweise sollte er oben stehen (Vorschlag, Codex-Bereich).
- 970 x 510: kein vollständiger Neulauf nach den Änderungen vom 05. und 06.10.

## Letzter Abschlussdurchgang 06.10. (Code-Stand 7810079)

Umgesetzt:
- Commercial Architecture D-F01 und D-F02 mobil: Die Labels "What is agreed" und "How it is bought" liegen unterhalb der Plattenränder, "What is included" darüber. Schrift nicht verkleinert, Copy und Grafik unverändert. Beim Preview-Lauf bei 970 x 510 fiel auf, dass die mobile Verschiebung auf schmalen Desktop-Grafiken "What it earns" an die Notiz von "How it is bought" schob. Daher: mobile Verschiebung nur bis 760 px Fensterbreite, bei kleinen Desktop-Fenstern eigene Abstände und das Kernlabel "The offer" mit schwarzem Grund (bei 970 x 510 war das T vom hellen Plattenrand verdeckt).
- Partnerships D.3-F08: Die Karte rückt 40 Einheiten nach unten und berührt den Satz nicht mehr. Die doppelte Beschriftung ist aufgelöst: Über dem Satz bleibt "Lena intervention", die Karte heisst jetzt "Operating condition" (der Begriff steht im Satz selbst, nichts Neues erfunden). Textdifferenz: Karte "Lena intervention" wird "Operating condition", Desktop und Mobil.

Geprüft auf der Preview (ldt-inc-git-deploy-experience-lab-v1), 970 x 510, 1280 x 720, 1440 x 900, 390 x 844:
- 20 Frames je Größe, alle seit 3500c55 geänderten Text- und Layoutbereiche (advantage A.1-F04, commercial D-F01 und D-F02, customers D.2-F04 und D.2-F05, decisions C.3-F08, expansion B-F04, markets B.1-F04, operations C-F04, partnerships D.3-F02, F03, F05, F08, people C.1-F03, positioning A+B-F05, proposition A-F10, revenue D.1-F04 und D.1-F07, technology C.2-F03 und C.2-F06): 80 Aufnahmen ohne Konsolenfehler, die 9 geänderten Texte je Größe im DOM vorhanden (36 von 36).
- Gesichtet: Commercial D-F01, D-F02 und Partnerships D.3-F08 in allen vier Grössen, die übrigen Frames bei 970 und 1280 per Kontaktbogen und bei 390 und 1440 aus dem vorigen Lauf.
- Funktionscheck Desktop und mobil: Landing, Contact erreichbar, Explore, Deep Dive, Zurück, Brückenlink, keine Konsolenfehler. Der erste mobile Lauf brach wegen eines Startfehlers des Prüfwerkzeugs ab, die Wiederholung bestand.

Offen, nicht in diesem Durchgang umgesetzt:
- Revenue D.1-F07 bei 970 x 510: Die gestrichelte Skalenlinie "Last year" läuft durch die Oberkante der Outline-Zeile "New business". Das ist inhaltlich gewollt (die Linie markiert das Vorjahresniveau innerhalb des New-business-Anteils), wirkt bei dieser Fensterhöhe aber eng.
- Partnerships D.3-F11 mobil: In der Liste "Related deep dives" bricht "C + D" vor "Delivery" in zwei Zeilen um.
- Commercial D-F02 bei 970 x 510: Eine Plattenkante berührt knapp die Unterseite des Labels "What is agreed" in einem Animationszustand.
- Vorschläge zu geschützten Bereichen, nicht umgesetzt: Satz zur Complexity-Grafik auf Layer 1, Eintrittssatz im Explore-Overlay mobil nach oben, britische Schreibweise auf /another-perspective/.
- Ausstehende Textfreigaben: ADD-01 bis 04, Workshop-Ergebnisentwürfe, Screenreader-Satz für Delivery F06.
