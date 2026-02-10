# NotePlanet

Minimalistische, produktivitätsorientierte Notiz-App mit KI-Unterstützung, Offline-First-Ansatz und skalierbarer Architektur.

## Vision

NotePlanet soll sofort nutzbar sein (Blitz-Start), schnelle Notizen ermöglichen und KI-Funktionen nahtlos in den Workflow integrieren.

## Funktionsumfang

### 1) Notizen erstellen & bearbeiten
- Einfache Textnotizen (Titel + Inhalt)
- Grundlegende Bearbeitungsfunktionen (Erstellen, Bearbeiten, Löschen)
- Rich-Text-Unterstützung:
  - **Fett**, *kursiv*, <u>unterstrichen</u>
  - Aufzählungen und nummerierte Listen
  - Links (inkl. externer Quellen)

### 2) Checklisten & To-Dos
- Checkbox-Listen pro Notiz
- Aufgaben als erledigt markieren
- Auto-Status-Update bei Checkbox-Änderung

### 3) Ordner & Tagging
- Ordner für hierarchische Organisation
- Freie Tags (z. B. `Arbeit`, `Privat`, `Projekt X`)
- Kombinierte Filterung: Ordner + Tags + Zeit

### 4) KI-Zusammenfassung
- Lange Texte analysieren
- Zusammenfassung mit:
  - Kernpunkten
  - Schlüsselsätzen
- „Kurzfassung“-Button pro Notiz

### 5) Kontext-basierte KI-Suche
- Natürliche Sprache, z. B.:
  - „Zeige mir alle Notizen zum Thema Marketing von Mai bis Juni“
- Semantische Suche über alle Notizen
- Treffer mit hervorgehobener Relevanz

### 6) Sprachnotizen mit Transkription
- Audioaufnahme direkt in der App
- Automatische Sprache-zu-Text-Transkription
- Optional automatische Zusammenfassung der Transkripte

### 7) Action-Points & Next Steps
- KI erkennt Aufgaben aus Notizinhalten
- Generiert konkrete nächste Schritte
- Geeignet für Projekt- und Meeting-Notizen

### 8) Meeting-Mode
- Aufzeichnung von Besprechungen
- Automatisches Protokoll mit:
  - wichtigsten Punkten
  - Entscheidungen
  - Next Steps
- Sprechererkennung (Speaker Recognition)

### 9) Cross-Device-Sync & Offline
- Synchronisation über alle Geräte
- Offline-Nutzung mit späterem Sync
- Konfliktlösung bei gleichzeitigen Änderungen

### 10) Sicherheitsfunktionen
- Passwortschutz
- Biometrische Authentifizierung (Geräteabhängig)
- Verschlüsselung gespeicherter Daten

### 11) Intelligente Vorlagen
- KI-gestützte Vorlagen (z. B. Meeting Summary, Projektplanung)
- Eigene, wiederverwendbare Vorlagen

### 12) Predictive Tags / Smart Organisation
- KI schlägt passende Tags automatisch vor
- Verknüpft thematisch verwandte Notizen

### 13) OCR & Bild-Text-Erkennung
- Bilder importieren oder fotografieren
- Text aus Bildern extrahieren (durchsuchbar/editierbar)

### 14) Collaboration
- Echtzeit-Bearbeitung derselben Notiz
- Kommentare und Annotationen auf Abschnittsebene

## Performance- und UX-Ziele

- **Blitz-Start:** Sofortiges Erstellen/Bearbeiten nach App-Start
- **Super-schnelle KI-Antworten:** Ziel < 1–2 Sekunden für Standardanfragen
- **Minimalistisches UI:** Fokus auf Inhalt, wenig visuelle Ablenkung

## Preismodell

| Funktion | Free | Premium |
| --- | --- | --- |
| Notizen & Grundfunktionen | ✅ | ✅ |
| KI-Zusammenfassung | ❌ | ✅ |
| Transkription (Audio) | ❌ | ✅ |
| Cross-Device Sync | ❌ | ✅ |
| Collaboration | ❌ | 💰 Team-Plan |
| Sicherheit & Verschlüsselung | ❌ | ✅ Premium (mit Schutz) |

Monetarisierung:
- Abonnement (monatlich/jährlich) für Premium
- Einmalige Upgrades (z. B. OCR, Sprachnotizen)
- Team-Lizenzen für Unternehmen

## Produkt-Roadmap

### Phase 1 (Launch)
- Basisnotizen + Checklisten
- KI-Zusammenfassung
- Sprache → Text
- Tagging + grundlegende Suche
- Offline-Modus + Geräte-Sync

### Phase 2 (Scale)
- Smarter Assistant Chat
- Vorlagen
- OCR & Bild-Text-Erkennung
- Erweiterte KI-Suche
- Predictive Tags

### Phase 3 (Enterprise)
- Echtzeit-Collaboration
- Erweiterte Rechteverwaltung
- API-Integrationen (Kalender, Task-Tools)

## Technische KI-Strategie

- **On-Device-Modelle:** Für Datenschutz, geringe Latenz, lokale Vorverarbeitung
- **Cloud-Modelle:** Für komplexe Analysen, Transkription, semantische Suche
- **Hybrid-Ansatz:** On-Device Optimierung + Cloud-Fallback je nach Feature und Gerät

## Vorschlag für nächste Umsetzungsschritte

1. MVP-Stack festlegen (Web + Mobile + Backend)
2. Datenmodell definieren (Notiz, Tag, Ordner, Aufgaben, Attachments)
3. Offline-First-Sync-Engine planen
4. KI-Pipeline für Zusammenfassung/Suche/Transkription aufsetzen
5. Free/Premium-Feature-Flags integrieren
6. Security-Baseline (Verschlüsselung, Auth, Secrets Management) implementieren
