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
