import { InterRAIInput } from "./InterRAIInput";

export const createInterRAIContent = (input: InterRAIInput) => ({
  "blocks": [
    {
      "type": "heading",
      "text": "interRAI HC Schweiz",
      "level": 1
    },
    {
      "type": "paragraph",
      "text": "Bedarfsabklärungsinstrument - Beobachtungsperiode 3 Tage",
      "italic": true,
      "spacing": {
        "after": 200
      }
    },
    {
      "type": "paragraph",
      "text": "Dieses Dokument bildet die vollständige Feldstruktur des interRAI HC Formulars ab. Jede Tabelle listet die Felder eines Bereichs mit ihrem JSON-Pfad, der Kodierung/Optionen sowie einer leeren Spalte zum Eintragen des Werts.",
      "spacing": {
        "after": 300
      }
    },
    {
      "type": "divider"
    },
    {
      "type": "heading",
      "text": "Bereich A: Administrative Daten und Beurteilungsgrund",
      "level": 2
    },
    {
      "type": "table",
      "headers": [
        "Feld",
        "JSON-Pfad",
        "Kodierung/Optionen",
        "Wert"
      ],
      "rows": [
        [
          "Name",
          "A_AdministrativeDaten.name",
          "Freitext",
          input.A_AdministrativeDaten?.name ?? ""
        ],
        [
          "Vorname",
          "A_AdministrativeDaten.vorname",
          "Freitext",
          input.A_AdministrativeDaten?.vorname ?? ""
        ],
        [
          "Geschlecht",
          "A_AdministrativeDaten.geschlecht",
          "1=Männlich, 2=Weiblich, 3=Andere",
          input.A_AdministrativeDaten?.geschlecht ?? ""
        ],
        [
          "Geburtsdatum",
          "A_AdministrativeDaten.geburtsdatum",
          "Datum (JJJJ-MM-TT)",
          input.A_AdministrativeDaten?.geburtsdatum ?? ""
        ],
        [
          "Zivilstand",
          "A_AdministrativeDaten.zivilstand",
          "1=Ledig, 2=Verheiratet/Partnerschaft, 4=Geschieden, 3=Verwitwet",
          input.A_AdministrativeDaten?.zivilstand ?? ""
        ],
        [
          "Nummern - Versicherten Nummer",
          "A_AdministrativeDaten.nummern.versichertenNummer",
          "Freitext",
          input.A_AdministrativeDaten?.nummern?.versichertenNummer ?? ""
        ],
        [
          "Nummern - Interne Fallnummer",
          "A_AdministrativeDaten.nummern.interneFallnummer",
          "Freitext",
          input.A_AdministrativeDaten?.nummern?.interneFallnummer ?? ""
        ],
        [
          "Wohnort",
          "A_AdministrativeDaten.wohnort",
          "Freitext",
          input.A_AdministrativeDaten?.wohnort ?? ""
        ],
        [
          "Versicherungen - Grundversicherung",
          "A_AdministrativeDaten.versicherungen.grundversicherung",
          "Freitext",
          input.A_AdministrativeDaten?.versicherungen?.grundversicherung ?? ""
        ],
        [
          "Versicherungen - Zusatzversicherung",
          "A_AdministrativeDaten.versicherungen.zusatzversicherung",
          "Freitext",
          input.A_AdministrativeDaten?.versicherungen?.zusatzversicherung ?? ""
        ],
        [
          "Versicherungen - Invaliden Unfall Militar",
          "A_AdministrativeDaten.versicherungen.invalidenUnfallMilitar",
          "Freitext",
          input.A_AdministrativeDaten?.versicherungen?.invalidenUnfallMilitar ?? ""
        ],
        [
          "Beurteilungsgrund",
          "A_AdministrativeDaten.beurteilungsgrund",
          "1=Erstassessment, 2=Reassessment, 3=Wiedereintritt, 4=Reassessment Statusveränderung, 6=Einsatzabbruch, 7=Andere",
          input.A_AdministrativeDaten?.beurteilungsgrund ?? ""
        ],
        [
          "Beginn Bedarfsabklaerung",
          "A_AdministrativeDaten.beginnBedarfsabklaerung",
          "Datum (JJJJ-MM-TT)",
          input.A_AdministrativeDaten?.beginnBedarfsabklaerung ?? ""
        ],
        [
          "Ziele Person",
          "A_AdministrativeDaten.zielePerson",
          "Primäres Behandlungsziel",
          input.A_AdministrativeDaten?.zielePerson ?? ""
        ],
        [
          "Wohnsituation",
          "A_AdministrativeDaten.wohnsituation",
          "1=Privathaus/Eigentums-/Mietwohnung/gemietetes Zimmer, 2=Wohnung mit integrierten Dienstleistungen, 3=Einrichtung für Personen mit psychischen Problemen (z.B. Wohngruppen), 4=Wohngemeinschaft für Personen mit körperlicher Behinderung, 5=Einrichtung für Personen mit geistiger Behinderung, 6=Psychiatrische Klinik oder Abteilung, 7=Obdachlos (mit oder ohne Obdachlosenunterkunft), 8=Alters- und Pflegeheim, 9=Rehabilitationsklinik/-abteilung, 10=Hospiz/Palliativstation, 11=Akutklinik, 12=Justizvollzugsanstalt, 13=Sonstiges",
          input.A_AdministrativeDaten?.wohnsituation ?? ""
        ],
        [
          "Form Zusammenleben - Form",
          "A_AdministrativeDaten.formZusammenleben.form",
          "1=Alleine, 2=Ausschliesslich mit Partner, 3=Mit Partner und anderen (Kinder, Eltern, Freunde), 4=Mit Kindern ohne Partner, 5=Mit Eltern oder Erziehungsberechtigten, 6=Mit Geschwistern, 7=Mit anderen Verwandten, 8=Mit einem oder mehreren Nicht-Verwandten",
          input.A_AdministrativeDaten?.formZusammenleben?.form ?? ""
        ],
        [
          "Form Zusammenleben - Neu Zusammengezogen",
          "A_AdministrativeDaten.formZusammenleben.neuZusammengezogen",
          "0=Nein, 1=Ja",
          input.A_AdministrativeDaten?.formZusammenleben?.neuZusammengezogen ?? ""
        ],
        [
          "Form Zusammenleben - Wunsch Anders Leben",
          "A_AdministrativeDaten.formZusammenleben.wunschAndersLeben",
          "0=Nein, 1=Ja andere Wohnung, 2=Ja andere Einrichtung",
          input.A_AdministrativeDaten?.formZusammenleben?.wunschAndersLeben ?? ""
        ],
        [
          "Letzter Spitalaufenthalt",
          "A_AdministrativeDaten.letzterSpitalaufenthalt",
          "0=Kein in letzten 90T, 1=Vor 31-90T, 2=Vor 15-30T, 3=Vor 8-14T, 4=Letzte 7T, 5=Aktuell hospitalisiert",
          input.A_AdministrativeDaten?.letzterSpitalaufenthalt ?? ""
        ],
        [
          "Individuelle Praezisierungen",
          "A_AdministrativeDaten.individuellePraezisierungen",
          "Freitext",
          input.A_AdministrativeDaten?.individuellePraezisierungen ?? ""
        ]
      ],
      "columnWidths": [
        1900,
        2500,
        3160,
        1800
      ],
      "width": 9360,
      "headerShading": true,
      "borders": true
    },
    {
      "type": "pageBreak"
    },
    {
      "type": "heading",
      "text": "Bereich B: Aufnahme und Vorgeschichte",
      "level": 2
    },
    {
      "type": "table",
      "headers": [
        "Feld",
        "JSON-Pfad",
        "Kodierung/Optionen",
        "Wert"
      ],
      "rows": [
        [
          "Datum Eroeffnung Dossier",
          "B_AufnahmeVorgeschichte.datumEroeffnungDossier",
          "Datum (JJJJ-MM-TT)",
          input.B_AufnahmeVorgeschichte?.datumEroeffnungDossier ?? ""
        ],
        [
          "Staatsangehoerigkeit",
          "B_AufnahmeVorgeschichte.staatsangehoerigkeit",
          "1=Schweiz, 2=Andere",
          input.B_AufnahmeVorgeschichte?.staatsangehoerigkeit ?? ""
        ],
        [
          "Staatsangehoerigkeit Andere",
          "B_AufnahmeVorgeschichte.staatsangehoerigkeitAndere",
          "Freitext",
          input.B_AufnahmeVorgeschichte?.staatsangehoerigkeitAndere ?? ""
        ],
        [
          "Sprache",
          "B_AufnahmeVorgeschichte.sprache",
          "1=Schweizerdeutsch, 2=Französisch, 3=Italienisch, 4=Rätoromanisch, 5=Hochdeutsch, 6=Englisch, 7=Portugiesisch, 8=Spanisch, 9=Albanisch, 10=Kroatisch, 11=Serbisch, 12=Arabisch, 13=Kurdisch, 14=Türkisch, 15=Tamilisch, 16=Chinesisch, 17=Russisch, 18=Hindi, 19=Tigrinya, 20=Somalisch, 21=Andere, welche?",
          input.B_AufnahmeVorgeschichte?.sprache ?? ""
        ],
        [
          "Uebersetzer Notwendig",
          "B_AufnahmeVorgeschichte.uebersetzerNotwendig",
          "0=Nein, 1=Ja",
          input.B_AufnahmeVorgeschichte?.uebersetzerNotwendig ?? ""
        ],
        [
          "Wohn Vorgeschichte 5 Jahre - Alters Pflegeheim",
          "B_AufnahmeVorgeschichte.wohnVorgeschichte5Jahre.altersPflegeheim",
          "0=Nein, 1=Ja",
          input.B_AufnahmeVorgeschichte?.wohnVorgeschichte5Jahre?.altersPflegeheim ?? ""
        ],
        [
          "Wohn Vorgeschichte 5 Jahre - Begleitetes Betreutes Wohnen",
          "B_AufnahmeVorgeschichte.wohnVorgeschichte5Jahre.begleitetesBetreutesWohnen",
          "0=Nein, 1=Ja",
          input.B_AufnahmeVorgeschichte?.wohnVorgeschichte5Jahre?.begleitetesBetreutesWohnen ?? ""
        ],
        [
          "Wohn Vorgeschichte 5 Jahre - Psychiatrische Einrichtung",
          "B_AufnahmeVorgeschichte.wohnVorgeschichte5Jahre.psychiatrischeEinrichtung",
          "0=Nein, 1=Ja",
          input.B_AufnahmeVorgeschichte?.wohnVorgeschichte5Jahre?.psychiatrischeEinrichtung ?? ""
        ],
        [
          "Wohn Vorgeschichte 5 Jahre - Psychiatrische Klinik",
          "B_AufnahmeVorgeschichte.wohnVorgeschichte5Jahre.psychiatrischeKlinik",
          "0=Nein, 1=Ja",
          input.B_AufnahmeVorgeschichte?.wohnVorgeschichte5Jahre?.psychiatrischeKlinik ?? ""
        ],
        [
          "Wohn Vorgeschichte 5 Jahre - Einrichtung Geistige Behinderung",
          "B_AufnahmeVorgeschichte.wohnVorgeschichte5Jahre.einrichtungGeistigeBehinderung",
          "0=Nein, 1=Ja",
          input.B_AufnahmeVorgeschichte?.wohnVorgeschichte5Jahre?.einrichtungGeistigeBehinderung ?? ""
        ],
        [
          "Individuelle Praezisierungen",
          "B_AufnahmeVorgeschichte.individuellePraezisierungen",
          "Freitext",
          input.B_AufnahmeVorgeschichte?.individuellePraezisierungen ?? ""
        ]
      ],
      "columnWidths": [
        1900,
        2500,
        3160,
        1800
      ],
      "width": 9360,
      "headerShading": true,
      "borders": true
    },
    {
      "type": "pageBreak"
    },
    {
      "type": "heading",
      "text": "Bereich C: Kognitive Fähigkeiten",
      "level": 2
    },
    {
      "type": "table",
      "headers": [
        "Feld",
        "JSON-Pfad",
        "Kodierung/Optionen",
        "Wert"
      ],
      "rows": [
        [
          "Entscheidungsfaehigkeit",
          "C_KognitiveFaehigkeiten.entscheidungsfaehigkeit",
          "0=Unabhängig - Entscheidungen sind konsistent, vernünftig und sinnvoll, 1=Veränderte Unabhängigkeit - einige Schwierigkeiten in neuen unbekannten Situationen, 2=Leichte Beeinträchtigung - in spezifischen wiederkehrenden Situationen unzuverlässig/gefährlich, braucht Anleitung und Überwachung, 3=Mittlere Beeinträchtigung - Entscheidungen durchwegs unzuverlässig oder gefährlich, i.d.R. Unterstützung erforderlich, 4=Schwere Beeinträchtigung - trifft selten/nie Entscheidungen, 5=Kein wahrnehmbares Bewusstsein, komatöser Status",
          input.C_KognitiveFaehigkeiten?.entscheidungsfaehigkeit ?? ""
        ],
        [
          "Gedaechtnis - Kurzzeit",
          "C_KognitiveFaehigkeiten.gedaechtnis.kurzzeit",
          "0=Ja, Gedächtnis funktioniert; 1=Gedächtnisprobleme",
          input.C_KognitiveFaehigkeiten?.gedaechtnis?.kurzzeit ?? ""
        ],
        [
          "Gedaechtnis - Handlung",
          "C_KognitiveFaehigkeiten.gedaechtnis.handlung",
          "0=Nein, 1=Ja",
          input.C_KognitiveFaehigkeiten?.gedaechtnis?.handlung ?? ""
        ],
        [
          "Gedaechtnis - Situativ",
          "C_KognitiveFaehigkeiten.gedaechtnis.situativ",
          "0=Nein, 1=Ja",
          input.C_KognitiveFaehigkeiten?.gedaechtnis?.situativ ?? ""
        ],
        [
          "Schwankungen Bewusstsein - Leicht Ablenkbar",
          "C_KognitiveFaehigkeiten.schwankungenBewusstsein.leichtAblenkbar",
          "0=Nein, 1=Ja",
          input.C_KognitiveFaehigkeiten?.schwankungenBewusstsein?.leichtAblenkbar ?? ""
        ],
        [
          "Schwankungen Bewusstsein - Episoden Unzusammenhaengend",
          "C_KognitiveFaehigkeiten.schwankungenBewusstsein.episodenUnzusammenhaengend",
          "0=Nein, 1=Ja",
          input.C_KognitiveFaehigkeiten?.schwankungenBewusstsein?.episodenUnzusammenhaengend ?? ""
        ],
        [
          "Schwankungen Bewusstsein - Tagesschwankungen",
          "C_KognitiveFaehigkeiten.schwankungenBewusstsein.tagesschwankungen",
          "0=Nein, 1=Ja",
          input.C_KognitiveFaehigkeiten?.schwankungenBewusstsein?.tagesschwankungen ?? ""
        ],
        [
          "Akute Aenderung Kognition",
          "C_KognitiveFaehigkeiten.akuteAenderungKognition",
          "0=Nein, 1=Ja",
          input.C_KognitiveFaehigkeiten?.akuteAenderungKognition ?? ""
        ],
        [
          "Aenderung Entscheidungsfaehigkeit 90 T",
          "C_KognitiveFaehigkeiten.aenderungEntscheidungsfaehigkeit90T",
          "0=Verbessert, 1=Keine Änderung, 2=Verschlechtert, 8=Unsicher",
          input.C_KognitiveFaehigkeiten?.aenderungEntscheidungsfaehigkeit90T ?? ""
        ],
        [
          "Individuelle Praezisierungen",
          "C_KognitiveFaehigkeiten.individuellePraezisierungen",
          "Freitext",
          input.C_KognitiveFaehigkeiten?.individuellePraezisierungen ?? ""
        ]
      ],
      "columnWidths": [
        1900,
        2500,
        3160,
        1800
      ],
      "width": 9360,
      "headerShading": true,
      "borders": true
    },
    {
      "type": "pageBreak"
    },
    {
      "type": "heading",
      "text": "Bereich D: Kommunikation und Sehen",
      "level": 2
    },
    {
      "type": "table",
      "headers": [
        "Feld",
        "JSON-Pfad",
        "Kodierung/Optionen",
        "Wert"
      ],
      "rows": [
        [
          "Sich Verstaendlich Machen",
          "D_KommunikationSehen.sichVerstaendlichMachen",
          "0=Ist verständlich, 1=Ist normalerweise verständlich - Schwierigkeiten Worte zu finden/Gedanken zu beenden, aber mit genug Zeit keine Rückfragen nötig, 2=Ist meistens verständlich - Unterstützung üblicherweise erforderlich, 3=Manchmal verständlich - beschränkte Fähigkeit konkrete Wünsche zu äussern, 4=Selten oder nie verständlich",
          input.D_KommunikationSehen?.sichVerstaendlichMachen ?? ""
        ],
        [
          "Andere Verstehen",
          "D_KommunikationSehen.andereVerstehen",
          "0=Versteht - klare Auffassungsgabe, 1=Versteht andere normalerweise - verpasst wenige Bruchstücke, versteht das Meiste, 2=Versteht andere meistens - versteht mit Hilfe von Erläuterungen/Wiederholungen das Meiste, 3=Versteht andere manchmal - reagiert nur auf einfache direkte Fragen, 4=Versteht selten oder nie",
          input.D_KommunikationSehen?.andereVerstehen ?? ""
        ],
        [
          "Hoeren",
          "D_KommunikationSehen.hoeren",
          "Mit Hörhilfe, falls benutzt. 0=Ausreichend - keine Probleme normalen Gesprächen zu folgen, 1=Leichte Schwierigkeiten - Mühe in gewissen Umgebungen (leise Sprache oder >2m Entfernung), 2=Mittlere Schwierigkeiten - Schwierigkeiten normale Gespräche zu hören, auf ruhige Umgebung angewiesen, 3=Grosse Schwierigkeiten - in allen Situationen, Gegenüber muss laut/deutlich/langsam sprechen oder nur Gemurmel wahrnehmbar, 4=Hört nichts",
          input.D_KommunikationSehen?.hoeren ?? ""
        ],
        [
          "Sehen",
          "D_KommunikationSehen.sehen",
          "Bei angemessener Beleuchtung, falls nötig mit Sehhilfen. 0=Ausreichend - sieht kleine Details inkl. gewöhnlicher Druckbuchstaben, 1=Leichte Schwierigkeiten - sieht grosse Druckbuchstaben, aber keine gewöhnlichen, 2=Mittlere Schwierigkeiten - eingeschränktes Sehvermögen, kann aber Gegenstände in Umgebung identifizieren, 3=Grosse Schwierigkeiten - erkennt Gegenstände kaum, sieht nur Licht/Farben/Umrisse, 4=Kein Sehvermögen",
          input.D_KommunikationSehen?.sehen ?? ""
        ],
        [
          "Individuelle Praezisierungen",
          "D_KommunikationSehen.individuellePraezisierungen",
          "Freitext",
          input.D_KommunikationSehen?.individuellePraezisierungen ?? ""
        ]
      ],
      "columnWidths": [
        1900,
        2500,
        3160,
        1800
      ],
      "width": 9360,
      "headerShading": true,
      "borders": true
    },
    {
      "type": "pageBreak"
    },
    {
      "type": "heading",
      "text": "Bereich E: Stimmungslage und Verhalten",
      "level": 2
    },
    {
      "type": "table",
      "headers": [
        "Feld",
        "JSON-Pfad",
        "Kodierung/Optionen",
        "Wert"
      ],
      "rows": [
        [
          "Depressive Anzeichen - Negative Aeusserungen",
          "E_StimmungVerhalten.depressiveAnzeichen.negativeAeusserungen",
          "0=Nicht vorhanden, 1=Vorhanden nicht in letzten 3T, 2=1-2 Tage, 3=Täglich, X=keine Antwort",
          input.E_StimmungVerhalten?.depressiveAnzeichen?.negativeAeusserungen ?? ""
        ],
        [
          "Depressive Anzeichen - Anhaltender Aerger",
          "E_StimmungVerhalten.depressiveAnzeichen.anhaltenderAerger",
          "0=Nicht vorhanden, 1=Vorhanden nicht in letzten 3T, 2=1-2 Tage, 3=Täglich, X=keine Antwort",
          input.E_StimmungVerhalten?.depressiveAnzeichen?.anhaltenderAerger ?? ""
        ],
        [
          "Depressive Anzeichen - Unrealistische Aengste",
          "E_StimmungVerhalten.depressiveAnzeichen.unrealistischeAengste",
          "0=Nicht vorhanden, 1=Vorhanden nicht in letzten 3T, 2=1-2 Tage, 3=Täglich, X=keine Antwort",
          input.E_StimmungVerhalten?.depressiveAnzeichen?.unrealistischeAengste ?? ""
        ],
        [
          "Depressive Anzeichen - Sorge Gesundheit",
          "E_StimmungVerhalten.depressiveAnzeichen.sorgeGesundheit",
          "0=Nicht vorhanden, 1=Vorhanden nicht in letzten 3T, 2=1-2 Tage, 3=Täglich, X=keine Antwort",
          input.E_StimmungVerhalten?.depressiveAnzeichen?.sorgeGesundheit ?? ""
        ],
        [
          "Depressive Anzeichen - Wiederholte Aengstliche Beschwerden",
          "E_StimmungVerhalten.depressiveAnzeichen.wiederholteAengstlicheBeschwerden",
          "0=Nicht vorhanden, 1=Vorhanden nicht in letzten 3T, 2=1-2 Tage, 3=Täglich, X=keine Antwort",
          input.E_StimmungVerhalten?.depressiveAnzeichen?.wiederholteAengstlicheBeschwerden ?? ""
        ],
        [
          "Depressive Anzeichen - Traurige Mimik",
          "E_StimmungVerhalten.depressiveAnzeichen.traurigeMimik",
          "0=Nicht vorhanden, 1=Vorhanden nicht in letzten 3T, 2=1-2 Tage, 3=Täglich, X=keine Antwort",
          input.E_StimmungVerhalten?.depressiveAnzeichen?.traurigeMimik ?? ""
        ],
        [
          "Depressive Anzeichen - Weinerlich",
          "E_StimmungVerhalten.depressiveAnzeichen.weinerlich",
          "0=Nicht vorhanden, 1=Vorhanden nicht in letzten 3T, 2=1-2 Tage, 3=Täglich, X=keine Antwort",
          input.E_StimmungVerhalten?.depressiveAnzeichen?.weinerlich ?? ""
        ],
        [
          "Depressive Anzeichen - Wiederkehrende Aeusserungen Schreckliches",
          "E_StimmungVerhalten.depressiveAnzeichen.wiederkehrendeAeusserungenSchreckliches",
          "0=Nicht vorhanden, 1=Vorhanden nicht in letzten 3T, 2=1-2 Tage, 3=Täglich, X=keine Antwort",
          input.E_StimmungVerhalten?.depressiveAnzeichen?.wiederkehrendeAeusserungenSchreckliches ?? ""
        ],
        [
          "Depressive Anzeichen - Rueckzug Aktivitaeten",
          "E_StimmungVerhalten.depressiveAnzeichen.rueckzugAktivitaeten",
          "0=Nicht vorhanden, 1=Vorhanden nicht in letzten 3T, 2=1-2 Tage, 3=Täglich, X=keine Antwort",
          input.E_StimmungVerhalten?.depressiveAnzeichen?.rueckzugAktivitaeten ?? ""
        ],
        [
          "Depressive Anzeichen - Verminderte Soziale Interaktion",
          "E_StimmungVerhalten.depressiveAnzeichen.verminderteSozialeInteraktion",
          "0=Nicht vorhanden, 1=Vorhanden nicht in letzten 3T, 2=1-2 Tage, 3=Täglich, X=keine Antwort",
          input.E_StimmungVerhalten?.depressiveAnzeichen?.verminderteSozialeInteraktion ?? ""
        ],
        [
          "Depressive Anzeichen - Mangelnde Lebensfreude",
          "E_StimmungVerhalten.depressiveAnzeichen.mangelndeLebensfreude",
          "0=Nicht vorhanden, 1=Vorhanden nicht in letzten 3T, 2=1-2 Tage, 3=Täglich, X=keine Antwort",
          input.E_StimmungVerhalten?.depressiveAnzeichen?.mangelndeLebensfreude ?? ""
        ],
        [
          "Selbstdeklariert Stimmung - Wenig Interesse",
          "E_StimmungVerhalten.selbstdeklariertStimmung.wenigInteresse",
          "0=Nicht in letzten 3T, 1=Vorhanden aber nicht täglich, 2=1-2 Tage, 3=Täglich, 8=keine Antwort",
          input.E_StimmungVerhalten?.selbstdeklariertStimmung?.wenigInteresse ?? ""
        ],
        [
          "Selbstdeklariert Stimmung - Aengstlich",
          "E_StimmungVerhalten.selbstdeklariertStimmung.aengstlich",
          "0=Nicht in letzten 3T, 1=Vorhanden aber nicht täglich, 2=1-2 Tage, 3=Täglich, 8=keine Antwort",
          input.E_StimmungVerhalten?.selbstdeklariertStimmung?.aengstlich ?? ""
        ],
        [
          "Selbstdeklariert Stimmung - Traurig",
          "E_StimmungVerhalten.selbstdeklariertStimmung.traurig",
          "0=Nicht in letzten 3T, 1=Vorhanden aber nicht täglich, 2=1-2 Tage, 3=Täglich, 8=keine Antwort",
          input.E_StimmungVerhalten?.selbstdeklariertStimmung?.traurig ?? ""
        ],
        [
          "Verhaltensauffaelligkeiten - Umherirren",
          "E_StimmungVerhalten.verhaltensauffaelligkeiten.umherirren",
          "0=Nicht vorhanden, 1=Vorhanden nicht in letzten 3T, 2=1-2 Tage, 3=Täglich, X=keine Antwort",
          input.E_StimmungVerhalten?.verhaltensauffaelligkeiten?.umherirren ?? ""
        ],
        [
          "Verhaltensauffaelligkeiten - Verbale Aggressivitaet",
          "E_StimmungVerhalten.verhaltensauffaelligkeiten.verbaleAggressivitaet",
          "0=Nicht vorhanden, 1=Vorhanden nicht in letzten 3T, 2=1-2 Tage, 3=Täglich, X=keine Antwort",
          input.E_StimmungVerhalten?.verhaltensauffaelligkeiten?.verbaleAggressivitaet ?? ""
        ],
        [
          "Verhaltensauffaelligkeiten - Koerperl Aggressivitaet",
          "E_StimmungVerhalten.verhaltensauffaelligkeiten.koerperlAggressivitaet",
          "0=Nicht vorhanden, 1=Vorhanden nicht in letzten 3T, 2=1-2 Tage, 3=Täglich, X=keine Antwort",
          input.E_StimmungVerhalten?.verhaltensauffaelligkeiten?.koerperlAggressivitaet ?? ""
        ],
        [
          "Verhaltensauffaelligkeiten - Storendes Verhalten",
          "E_StimmungVerhalten.verhaltensauffaelligkeiten.storendesVerhalten",
          "0=Nicht vorhanden, 1=Vorhanden nicht in letzten 3T, 2=1-2 Tage, 3=Täglich, X=keine Antwort",
          input.E_StimmungVerhalten?.verhaltensauffaelligkeiten?.storendesVerhalten ?? ""
        ],
        [
          "Verhaltensauffaelligkeiten - Unangemessenes Verhalten",
          "E_StimmungVerhalten.verhaltensauffaelligkeiten.unangemessenesVerhalten",
          "0=Nicht vorhanden, 1=Vorhanden nicht in letzten 3T, 2=1-2 Tage, 3=Täglich, X=keine Antwort",
          input.E_StimmungVerhalten?.verhaltensauffaelligkeiten?.unangemessenesVerhalten ?? ""
        ],
        [
          "Verhaltensauffaelligkeiten - Widersetzt Behandlung",
          "E_StimmungVerhalten.verhaltensauffaelligkeiten.widersetztBehandlung",
          "0=Nicht vorhanden, 1=Vorhanden nicht in letzten 3T, 2=1-2 Tage, 3=Täglich, X=keine Antwort",
          input.E_StimmungVerhalten?.verhaltensauffaelligkeiten?.widersetztBehandlung ?? ""
        ],
        [
          "Individuelle Praezisierungen",
          "E_StimmungVerhalten.individuellePraezisierungen",
          "Freitext",
          input.E_StimmungVerhalten?.individuellePraezisierungen ?? ""
        ]
      ],
      "columnWidths": [
        1900,
        2500,
        3160,
        1800
      ],
      "width": 9360,
      "headerShading": true,
      "borders": true
    },
    {
      "type": "pageBreak"
    },
    {
      "type": "heading",
      "text": "Bereich F: Psychosoziales Wohlbefinden",
      "level": 2
    },
    {
      "type": "table",
      "headers": [
        "Feld",
        "JSON-Pfad",
        "Kodierung/Optionen",
        "Wert"
      ],
      "rows": [
        [
          "Soziale Beziehungen - Teilnahme Soziale Aktivitaeten",
          "F_PsychosocialesWohlbefinden.sozialeBeziehungen.teilnahmeSozialeAktivitaeten",
          "0=Keine, 1=Länger als 30 Tage her, 2=Zwischen 8 und 30 Tagen her, 3=Zwischen 4 und 7 Tagen her, 4=In den letzten 3 Tagen, 8=Nicht bestimmbar, X=Person gibt keine Antwort",
          input.F_PsychosocialesWohlbefinden?.sozialeBeziehungen?.teilnahmeSozialeAktivitaeten ?? ""
        ],
        [
          "Soziale Beziehungen - Besuche Bekannte Familie",
          "F_PsychosocialesWohlbefinden.sozialeBeziehungen.besucheBekannteFamilie",
          "0=Keine, 1=Länger als 30 Tage her, 2=Zwischen 8 und 30 Tagen her, 3=Zwischen 4 und 7 Tagen her, 4=In den letzten 3 Tagen, 8=Nicht bestimmbar, X=Person gibt keine Antwort",
          input.F_PsychosocialesWohlbefinden?.sozialeBeziehungen?.besucheBekannteFamilie ?? ""
        ],
        [
          "Soziale Beziehungen - Andere Kontakte",
          "F_PsychosocialesWohlbefinden.sozialeBeziehungen.andereKontakte",
          "0=Keine, 1=Länger als 30 Tage her, 2=Zwischen 8 und 30 Tagen her, 3=Zwischen 4 und 7 Tagen her, 4=In den letzten 3 Tagen, 8=Nicht bestimmbar, X=Person gibt keine Antwort",
          input.F_PsychosocialesWohlbefinden?.sozialeBeziehungen?.andereKontakte ?? ""
        ],
        [
          "Soziale Beziehungen - Konflikt Familie Freunde",
          "F_PsychosocialesWohlbefinden.sozialeBeziehungen.konfliktFamilieFreunde",
          "0=Nein, 1=Ja",
          input.F_PsychosocialesWohlbefinden?.sozialeBeziehungen?.konfliktFamilieFreunde ?? ""
        ],
        [
          "Soziale Beziehungen - Furcht Vor Familie",
          "F_PsychosocialesWohlbefinden.sozialeBeziehungen.furchtVorFamilie",
          "0=Nein, 1=Ja",
          input.F_PsychosocialesWohlbefinden?.sozialeBeziehungen?.furchtVorFamilie ?? ""
        ],
        [
          "Soziale Beziehungen - Vernachlaessigt Misshandelt",
          "F_PsychosocialesWohlbefinden.sozialeBeziehungen.vernachlaessigtMisshandelt",
          "0=Nein, 1=Ja",
          input.F_PsychosocialesWohlbefinden?.sozialeBeziehungen?.vernachlaessigtMisshandelt ?? ""
        ],
        [
          "Einsamkeit",
          "F_PsychosocialesWohlbefinden.einsamkeit",
          "0=Nein, 1=Ja",
          input.F_PsychosocialesWohlbefinden?.einsamkeit ?? ""
        ],
        [
          "Aenderung Soziale Aktivitaeten 90 T",
          "F_PsychosocialesWohlbefinden.aenderungSozialeAktivitaeten90T",
          "0=Kein Rückgang, 1=Rückgang leidet nicht, 2=Rückgang leidet darunter",
          input.F_PsychosocialesWohlbefinden?.aenderungSozialeAktivitaeten90T ?? ""
        ],
        [
          "Dauer Alleinseins",
          "F_PsychosocialesWohlbefinden.dauerAlleinseins",
          "0=<1Std, 1=1-2Std, 2=>2Std<8Std, 3=≥8Std, X=keine Antwort",
          input.F_PsychosocialesWohlbefinden?.dauerAlleinseins ?? ""
        ],
        [
          "Belastende Ereignisse 90 T",
          "F_PsychosocialesWohlbefinden.belastendeEreignisse90T",
          "0=Nein, 1=Ja",
          input.F_PsychosocialesWohlbefinden?.belastendeEreignisse90T ?? ""
        ],
        [
          "Individuelle Praezisierungen",
          "F_PsychosocialesWohlbefinden.individuellePraezisierungen",
          "Freitext",
          input.F_PsychosocialesWohlbefinden?.individuellePraezisierungen ?? ""
        ]
      ],
      "columnWidths": [
        1900,
        2500,
        3160,
        1800
      ],
      "width": 9360,
      "headerShading": true,
      "borders": true
    },
    {
      "type": "pageBreak"
    },
    {
      "type": "heading",
      "text": "Bereich G: Körperliche Funktionsfähigkeiten",
      "level": 2
    },
    {
      "type": "table",
      "headers": [
        "Feld",
        "JSON-Pfad",
        "Kodierung/Optionen",
        "Wert"
      ],
      "rows": [
        [
          "IADL - Mahlzeiten Zubereitung - Effektiv",
          "G_KoerperlicheFunktionen.IADL.mahlzeitenZubereitung.effektiv",
          "0=Unabhängig, 1=Vorbereitung, 2=Aufsicht, 3=Begrenzte Hilfe, 4=Verstärkte Hilfe, 5=Umfassende Hilfe, 6=Vollständige Hilfe, 8=nicht vorgekommen",
          input.G_KoerperlicheFunktionen?.IADL?.mahlzeitenZubereitung?.effektiv ?? ""
        ],
        [
          "IADL - Mahlzeiten Zubereitung - Vermutet",
          "G_KoerperlicheFunktionen.IADL.mahlzeitenZubereitung.vermutet",
          "0=Unabhängig, 1=Vorbereitung, 2=Aufsicht, 3=Begrenzte Hilfe, 4=Verstärkte Hilfe, 5=Umfassende Hilfe, 6=Vollständige Hilfe, 8=nicht vorgekommen",
          input.G_KoerperlicheFunktionen?.IADL?.mahlzeitenZubereitung?.vermutet ?? ""
        ],
        [
          "IADL - Hausarbeit - Effektiv",
          "G_KoerperlicheFunktionen.IADL.hausarbeit.effektiv",
          "0=Unabhängig, 1=Vorbereitung, 2=Aufsicht, 3=Begrenzte Hilfe, 4=Verstärkte Hilfe, 5=Umfassende Hilfe, 6=Vollständige Hilfe, 8=nicht vorgekommen",
          input.G_KoerperlicheFunktionen?.IADL?.hausarbeit?.effektiv ?? ""
        ],
        [
          "IADL - Hausarbeit - Vermutet",
          "G_KoerperlicheFunktionen.IADL.hausarbeit.vermutet",
          "0=Unabhängig, 1=Vorbereitung, 2=Aufsicht, 3=Begrenzte Hilfe, 4=Verstärkte Hilfe, 5=Umfassende Hilfe, 6=Vollständige Hilfe, 8=nicht vorgekommen",
          input.G_KoerperlicheFunktionen?.IADL?.hausarbeit?.vermutet ?? ""
        ],
        [
          "IADL - Geld Verwalten - Effektiv",
          "G_KoerperlicheFunktionen.IADL.geldVerwalten.effektiv",
          "0=Unabhängig, 1=Vorbereitung, 2=Aufsicht, 3=Begrenzte Hilfe, 4=Verstärkte Hilfe, 5=Umfassende Hilfe, 6=Vollständige Hilfe, 8=nicht vorgekommen",
          input.G_KoerperlicheFunktionen?.IADL?.geldVerwalten?.effektiv ?? ""
        ],
        [
          "IADL - Geld Verwalten - Vermutet",
          "G_KoerperlicheFunktionen.IADL.geldVerwalten.vermutet",
          "0=Unabhängig, 1=Vorbereitung, 2=Aufsicht, 3=Begrenzte Hilfe, 4=Verstärkte Hilfe, 5=Umfassende Hilfe, 6=Vollständige Hilfe, 8=nicht vorgekommen",
          input.G_KoerperlicheFunktionen?.IADL?.geldVerwalten?.vermutet ?? ""
        ],
        [
          "IADL - Medikamente Handhaben - Effektiv",
          "G_KoerperlicheFunktionen.IADL.medikamenteHandhaben.effektiv",
          "0=Unabhängig, 1=Vorbereitung, 2=Aufsicht, 3=Begrenzte Hilfe, 4=Verstärkte Hilfe, 5=Umfassende Hilfe, 6=Vollständige Hilfe, 8=nicht vorgekommen",
          input.G_KoerperlicheFunktionen?.IADL?.medikamenteHandhaben?.effektiv ?? ""
        ],
        [
          "IADL - Medikamente Handhaben - Vermutet",
          "G_KoerperlicheFunktionen.IADL.medikamenteHandhaben.vermutet",
          "0=Unabhängig, 1=Vorbereitung, 2=Aufsicht, 3=Begrenzte Hilfe, 4=Verstärkte Hilfe, 5=Umfassende Hilfe, 6=Vollständige Hilfe, 8=nicht vorgekommen",
          input.G_KoerperlicheFunktionen?.IADL?.medikamenteHandhaben?.vermutet ?? ""
        ],
        [
          "IADL - Telefonieren - Effektiv",
          "G_KoerperlicheFunktionen.IADL.telefonieren.effektiv",
          "0=Unabhängig, 1=Vorbereitung, 2=Aufsicht, 3=Begrenzte Hilfe, 4=Verstärkte Hilfe, 5=Umfassende Hilfe, 6=Vollständige Hilfe, 8=nicht vorgekommen",
          input.G_KoerperlicheFunktionen?.IADL?.telefonieren?.effektiv ?? ""
        ],
        [
          "IADL - Telefonieren - Vermutet",
          "G_KoerperlicheFunktionen.IADL.telefonieren.vermutet",
          "0=Unabhängig, 1=Vorbereitung, 2=Aufsicht, 3=Begrenzte Hilfe, 4=Verstärkte Hilfe, 5=Umfassende Hilfe, 6=Vollständige Hilfe, 8=nicht vorgekommen",
          input.G_KoerperlicheFunktionen?.IADL?.telefonieren?.vermutet ?? ""
        ],
        [
          "IADL - Treppen Benutzen - Effektiv",
          "G_KoerperlicheFunktionen.IADL.treppenBenutzen.effektiv",
          "0=Unabhängig, 1=Vorbereitung, 2=Aufsicht, 3=Begrenzte Hilfe, 4=Verstärkte Hilfe, 5=Umfassende Hilfe, 6=Vollständige Hilfe, 8=nicht vorgekommen",
          input.G_KoerperlicheFunktionen?.IADL?.treppenBenutzen?.effektiv ?? ""
        ],
        [
          "IADL - Treppen Benutzen - Vermutet",
          "G_KoerperlicheFunktionen.IADL.treppenBenutzen.vermutet",
          "0=Unabhängig, 1=Vorbereitung, 2=Aufsicht, 3=Begrenzte Hilfe, 4=Verstärkte Hilfe, 5=Umfassende Hilfe, 6=Vollständige Hilfe, 8=nicht vorgekommen",
          input.G_KoerperlicheFunktionen?.IADL?.treppenBenutzen?.vermutet ?? ""
        ],
        [
          "IADL - Einkaufen - Effektiv",
          "G_KoerperlicheFunktionen.IADL.einkaufen.effektiv",
          "0=Unabhängig, 1=Vorbereitung, 2=Aufsicht, 3=Begrenzte Hilfe, 4=Verstärkte Hilfe, 5=Umfassende Hilfe, 6=Vollständige Hilfe, 8=nicht vorgekommen",
          input.G_KoerperlicheFunktionen?.IADL?.einkaufen?.effektiv ?? ""
        ],
        [
          "IADL - Einkaufen - Vermutet",
          "G_KoerperlicheFunktionen.IADL.einkaufen.vermutet",
          "0=Unabhängig, 1=Vorbereitung, 2=Aufsicht, 3=Begrenzte Hilfe, 4=Verstärkte Hilfe, 5=Umfassende Hilfe, 6=Vollständige Hilfe, 8=nicht vorgekommen",
          input.G_KoerperlicheFunktionen?.IADL?.einkaufen?.vermutet ?? ""
        ],
        [
          "IADL - Verkehrsmittel Nutzen - Effektiv",
          "G_KoerperlicheFunktionen.IADL.verkehrsmittelNutzen.effektiv",
          "0=Unabhängig, 1=Vorbereitung, 2=Aufsicht, 3=Begrenzte Hilfe, 4=Verstärkte Hilfe, 5=Umfassende Hilfe, 6=Vollständige Hilfe, 8=nicht vorgekommen",
          input.G_KoerperlicheFunktionen?.IADL?.verkehrsmittelNutzen?.effektiv ?? ""
        ],
        [
          "IADL - Verkehrsmittel Nutzen - Vermutet",
          "G_KoerperlicheFunktionen.IADL.verkehrsmittelNutzen.vermutet",
          "0=Unabhängig, 1=Vorbereitung, 2=Aufsicht, 3=Begrenzte Hilfe, 4=Verstärkte Hilfe, 5=Umfassende Hilfe, 6=Vollständige Hilfe, 8=nicht vorgekommen",
          input.G_KoerperlicheFunktionen?.IADL?.verkehrsmittelNutzen?.vermutet ?? ""
        ],
        [
          "BADL - Bad Dusche",
          "G_KoerperlicheFunktionen.BADL.badDusche",
          "0=Unabhängig, 1=Gegenstand bereitgestellt, 2=Aufsicht, 3=Begrenzte Hilfe, 4=Verstärkte Hilfe, 5=Umfassende Hilfe, 6=Vollständige Hilfe, 8=nicht vorgekommen",
          input.G_KoerperlicheFunktionen?.BADL?.badDusche ?? ""
        ],
        [
          "BADL - Persoenliche Hygiene",
          "G_KoerperlicheFunktionen.BADL.persoenlicheHygiene",
          "0=Unabhängig, 1=Gegenstand bereitgestellt, 2=Aufsicht, 3=Begrenzte Hilfe, 4=Verstärkte Hilfe, 5=Umfassende Hilfe, 6=Vollständige Hilfe, 8=nicht vorgekommen",
          input.G_KoerperlicheFunktionen?.BADL?.persoenlicheHygiene ?? ""
        ],
        [
          "BADL - Oberkoeper Anziehen",
          "G_KoerperlicheFunktionen.BADL.oberkoeperAnziehen",
          "0=Unabhängig, 1=Gegenstand bereitgestellt, 2=Aufsicht, 3=Begrenzte Hilfe, 4=Verstärkte Hilfe, 5=Umfassende Hilfe, 6=Vollständige Hilfe, 8=nicht vorgekommen",
          input.G_KoerperlicheFunktionen?.BADL?.oberkoeperAnziehen ?? ""
        ],
        [
          "BADL - Unterkoeper Anziehen",
          "G_KoerperlicheFunktionen.BADL.unterkoeperAnziehen",
          "0=Unabhängig, 1=Gegenstand bereitgestellt, 2=Aufsicht, 3=Begrenzte Hilfe, 4=Verstärkte Hilfe, 5=Umfassende Hilfe, 6=Vollständige Hilfe, 8=nicht vorgekommen",
          input.G_KoerperlicheFunktionen?.BADL?.unterkoeperAnziehen ?? ""
        ],
        [
          "BADL - Gehen",
          "G_KoerperlicheFunktionen.BADL.gehen",
          "0=Unabhängig, 1=Gegenstand bereitgestellt, 2=Aufsicht, 3=Begrenzte Hilfe, 4=Verstärkte Hilfe, 5=Umfassende Hilfe, 6=Vollständige Hilfe, 8=nicht vorgekommen",
          input.G_KoerperlicheFunktionen?.BADL?.gehen ?? ""
        ],
        [
          "BADL - Fortbewegung Gleiche Etage",
          "G_KoerperlicheFunktionen.BADL.fortbewegungGleicheEtage",
          "0=Unabhängig, 1=Gegenstand bereitgestellt, 2=Aufsicht, 3=Begrenzte Hilfe, 4=Verstärkte Hilfe, 5=Umfassende Hilfe, 6=Vollständige Hilfe, 8=nicht vorgekommen",
          input.G_KoerperlicheFunktionen?.BADL?.fortbewegungGleicheEtage ?? ""
        ],
        [
          "BADL - Transfer Toilette",
          "G_KoerperlicheFunktionen.BADL.transferToilette",
          "0=Unabhängig, 1=Gegenstand bereitgestellt, 2=Aufsicht, 3=Begrenzte Hilfe, 4=Verstärkte Hilfe, 5=Umfassende Hilfe, 6=Vollständige Hilfe, 8=nicht vorgekommen",
          input.G_KoerperlicheFunktionen?.BADL?.transferToilette ?? ""
        ],
        [
          "BADL - Toiletten Benutzung",
          "G_KoerperlicheFunktionen.BADL.toilettenBenutzung",
          "0=Unabhängig, 1=Gegenstand bereitgestellt, 2=Aufsicht, 3=Begrenzte Hilfe, 4=Verstärkte Hilfe, 5=Umfassende Hilfe, 6=Vollständige Hilfe, 8=nicht vorgekommen",
          input.G_KoerperlicheFunktionen?.BADL?.toilettenBenutzung ?? ""
        ],
        [
          "BADL - Mobilitaet Im Bett",
          "G_KoerperlicheFunktionen.BADL.mobilitaetImBett",
          "0=Unabhängig, 1=Gegenstand bereitgestellt, 2=Aufsicht, 3=Begrenzte Hilfe, 4=Verstärkte Hilfe, 5=Umfassende Hilfe, 6=Vollständige Hilfe, 8=nicht vorgekommen",
          input.G_KoerperlicheFunktionen?.BADL?.mobilitaetImBett ?? ""
        ],
        [
          "BADL - Essen Trinken",
          "G_KoerperlicheFunktionen.BADL.essenTrinken",
          "0=Unabhängig, 1=Gegenstand bereitgestellt, 2=Aufsicht, 3=Begrenzte Hilfe, 4=Verstärkte Hilfe, 5=Umfassende Hilfe, 6=Vollständige Hilfe, 8=nicht vorgekommen",
          input.G_KoerperlicheFunktionen?.BADL?.essenTrinken ?? ""
        ],
        [
          "Fortbewegung - Innenraum",
          "G_KoerperlicheFunktionen.fortbewegung.innenraum",
          "0=Geht ohne Hilfsmittel, 1=Geht mit Hilfsmittel (z.B. Stock, Krücke, Gehhilfe, schiebt Rollstuhl vor sich her), 2=Rollstuhl (mechanisch oder elektrisch)/Elektro-Scooter, 3=Person ist bettlägerig",
          input.G_KoerperlicheFunktionen?.fortbewegung?.innenraum ?? ""
        ],
        [
          "Fortbewegung - Geh Distanz 3 T",
          "G_KoerperlicheFunktionen.fortbewegung.gehDistanz3T",
          "0=Person ist nicht gegangen, 1=Weniger als 5 Meter, 2=5-49 Meter, 3=50-99 Meter, 4=100 Meter oder mehr, 5=1 Kilometer oder mehr",
          input.G_KoerperlicheFunktionen?.fortbewegung?.gehDistanz3T ?? ""
        ],
        [
          "Fortbewegung - Rollstuhl Distanz 3 T",
          "G_KoerperlicheFunktionen.fortbewegung.rollstuhlDistanz3T",
          "0=Person wurde von anderen geschoben, 1=Benutzt elektrischen Rollstuhl/Scooter, 2=Fährt selbständig weniger als 5 Meter, 3=Fährt selbständig 5-49 Meter, 4=Fährt selbständig 50-99 Meter, 5=Fährt selbständig 100 Meter oder mehr, 8=Keine Rollstuhlbenutzung",
          input.G_KoerperlicheFunktionen?.fortbewegung?.rollstuhlDistanz3T ?? ""
        ],
        [
          "Ausdauer - Stunden Aktivitaet 3 T",
          "G_KoerperlicheFunktionen.ausdauer.stundenAktivitaet3T",
          "0=Keine, 1=Weniger als 1 Std, 2=1-2 Stunden, 3=3-4 Stunden, 4=Mehr als 4 Stunden",
          input.G_KoerperlicheFunktionen?.ausdauer?.stundenAktivitaet3T ?? ""
        ],
        [
          "Ausdauer - Aussenaufenthalte 3 T",
          "G_KoerperlicheFunktionen.ausdauer.aussenaufenthalte3T",
          "0=Person verlässt das Haus nie, 1=Haus in letzten 3 Tagen nicht verlassen, verlässt es sonst regelmässig, 2=An 1 oder 2 Tagen, 3=An allen 3 Tagen",
          input.G_KoerperlicheFunktionen?.ausdauer?.aussenaufenthalte3T ?? ""
        ],
        [
          "Rehabilitations Potential - Person Glaubt",
          "G_KoerperlicheFunktionen.rehabilitationsPotential.personGlaubt",
          "0=Nein, 1=Ja",
          input.G_KoerperlicheFunktionen?.rehabilitationsPotential?.personGlaubt ?? ""
        ],
        [
          "Rehabilitations Potential - Fachleute Glauben",
          "G_KoerperlicheFunktionen.rehabilitationsPotential.fachleuteGlauben",
          "0=Nein, 1=Ja",
          input.G_KoerperlicheFunktionen?.rehabilitationsPotential?.fachleuteGlauben ?? ""
        ],
        [
          "Aenderung BADL 90 T",
          "G_KoerperlicheFunktionen.aenderungBADL90T",
          "0=Verbessert, 1=Keine Änderung, 2=Verschlechtert, 8=Unsicher",
          input.G_KoerperlicheFunktionen?.aenderungBADL90T ?? ""
        ],
        [
          "Auto Fahren 90 T",
          "G_KoerperlicheFunktionen.autoFahren90T",
          "0=Nein, 1=Ja",
          input.G_KoerperlicheFunktionen?.autoFahren90T ?? ""
        ],
        [
          "Individuelle Praezisierungen",
          "G_KoerperlicheFunktionen.individuellePraezisierungen",
          "Freitext",
          input.G_KoerperlicheFunktionen?.individuellePraezisierungen ?? ""
        ]
      ],
      "columnWidths": [
        1900,
        2500,
        3160,
        1800
      ],
      "width": 9360,
      "headerShading": true,
      "borders": true
    },
    {
      "type": "pageBreak"
    },
    {
      "type": "heading",
      "text": "Bereich H: Kontinenz",
      "level": 2
    },
    {
      "type": "table",
      "headers": [
        "Feld",
        "JSON-Pfad",
        "Kodierung/Optionen",
        "Wert"
      ],
      "rows": [
        [
          "Blasenkontinenz",
          "H_Kontinenz.blasenkontinenz",
          "0=Kontinent - vollständige Kontrolle, kein Katheter/Hilfsmittel, 1=Kontinent mit Katheter oder Stoma in letzten 3 Tagen, 2=Selten inkontinent - nicht inkontinent in letzten 3 Tagen aber hatte schon Episoden, 3=Teilweise inkontinent - aber nicht täglich, 4=Häufig inkontinent - täglich, aber mit Restkontrolle, 5=Inkontinent - keine Restkontrolle, 8=Nicht aufgetreten - keine Urinentleerungen in letzten 3 Tagen",
          input.H_Kontinenz?.blasenkontinenz ?? ""
        ],
        [
          "Hilfsmittel Urin",
          "H_Kontinenz.hilfsmittelUrin",
          "0=Keine, 1=Kondomkatheter, 2=Dauerkatheter, 3=Stoma",
          input.H_Kontinenz?.hilfsmittelUrin ?? ""
        ],
        [
          "Darmkontinenz",
          "H_Kontinenz.darmkontinenz",
          "0=Kontinent - vollständige Kontrolle, kein Stoma/Hilfsmittel, 1=Kontinent mit Stoma - kontrolliert in letzten 3 Tagen, 2=Selten inkontinent - nicht inkontinent in letzten 3 Tagen aber hatte schon Episoden, 3=Teilweise inkontinent - aber nicht täglich, 4=Häufig inkontinent - täglich, aber mit Restkontrolle, 5=Inkontinent - keine Restkontrolle, 8=Nicht aufgetreten - keine Darmentleerung in letzten 3 Tagen",
          input.H_Kontinenz?.darmkontinenz ?? ""
        ],
        [
          "Inkontinenzeinlagen",
          "H_Kontinenz.inkontinenzeinlagen",
          "0=Nein, 1=Ja",
          input.H_Kontinenz?.inkontinenzeinlagen ?? ""
        ],
        [
          "Individuelle Praezisierungen",
          "H_Kontinenz.individuellePraezisierungen",
          "Freitext",
          input.H_Kontinenz?.individuellePraezisierungen ?? ""
        ]
      ],
      "columnWidths": [
        1900,
        2500,
        3160,
        1800
      ],
      "width": 9360,
      "headerShading": true,
      "borders": true
    },
    {
      "type": "pageBreak"
    },
    {
      "type": "heading",
      "text": "Bereich I: Medizinische Diagnosen",
      "level": 2
    },
    {
      "type": "table",
      "headers": [
        "Feld",
        "JSON-Pfad",
        "Kodierung/Optionen",
        "Wert"
      ],
      "rows": [
        [
          "Schriftliche Diagnosen Bekannt",
          "I_MedizinischeDiagnosen.schriftlicheDiagnosenBekannt",
          "0=Nein, 1=Ja",
          input.I_MedizinischeDiagnosen?.schriftlicheDiagnosenBekannt ?? ""
        ],
        [
          "Diagnosen - Muskuloskeletal - Hueftfraktur 30 T",
          "I_MedizinischeDiagnosen.diagnosen.muskuloskeletal.hueftfraktur30T",
          "1=Hauptdiagnose/aktive Behandlung, 2=Diagnose vorhanden aktive Behandlung, 3=Diagnose vorhanden keine aktive Behandlung",
          input.I_MedizinischeDiagnosen?.diagnosen?.muskuloskeletal?.hueftfraktur30T ?? ""
        ],
        [
          "Diagnosen - Muskuloskeletal - Andere Frakturen",
          "I_MedizinischeDiagnosen.diagnosen.muskuloskeletal.andereFrakturen",
          "1=Hauptdiagnose/aktive Behandlung, 2=Diagnose vorhanden aktive Behandlung, 3=Diagnose vorhanden keine aktive Behandlung",
          input.I_MedizinischeDiagnosen?.diagnosen?.muskuloskeletal?.andereFrakturen ?? ""
        ],
        [
          "Diagnosen - Neurologisch - Alzheimer",
          "I_MedizinischeDiagnosen.diagnosen.neurologisch.alzheimer",
          "1=Hauptdiagnose/aktive Behandlung, 2=Diagnose vorhanden aktive Behandlung, 3=Diagnose vorhanden keine aktive Behandlung",
          input.I_MedizinischeDiagnosen?.diagnosen?.neurologisch?.alzheimer ?? ""
        ],
        [
          "Diagnosen - Neurologisch - Andere Demenz",
          "I_MedizinischeDiagnosen.diagnosen.neurologisch.andereDemenz",
          "1=Hauptdiagnose/aktive Behandlung, 2=Diagnose vorhanden aktive Behandlung, 3=Diagnose vorhanden keine aktive Behandlung",
          input.I_MedizinischeDiagnosen?.diagnosen?.neurologisch?.andereDemenz ?? ""
        ],
        [
          "Diagnosen - Neurologisch - Hemiplegie",
          "I_MedizinischeDiagnosen.diagnosen.neurologisch.hemiplegie",
          "1=Hauptdiagnose/aktive Behandlung, 2=Diagnose vorhanden aktive Behandlung, 3=Diagnose vorhanden keine aktive Behandlung",
          input.I_MedizinischeDiagnosen?.diagnosen?.neurologisch?.hemiplegie ?? ""
        ],
        [
          "Diagnosen - Neurologisch - Multiple Sklerose",
          "I_MedizinischeDiagnosen.diagnosen.neurologisch.multipleSklerose",
          "1=Hauptdiagnose/aktive Behandlung, 2=Diagnose vorhanden aktive Behandlung, 3=Diagnose vorhanden keine aktive Behandlung",
          input.I_MedizinischeDiagnosen?.diagnosen?.neurologisch?.multipleSklerose ?? ""
        ],
        [
          "Diagnosen - Neurologisch - Paraplegie",
          "I_MedizinischeDiagnosen.diagnosen.neurologisch.paraplegie",
          "1=Hauptdiagnose/aktive Behandlung, 2=Diagnose vorhanden aktive Behandlung, 3=Diagnose vorhanden keine aktive Behandlung",
          input.I_MedizinischeDiagnosen?.diagnosen?.neurologisch?.paraplegie ?? ""
        ],
        [
          "Diagnosen - Neurologisch - Parkinson",
          "I_MedizinischeDiagnosen.diagnosen.neurologisch.parkinson",
          "1=Hauptdiagnose/aktive Behandlung, 2=Diagnose vorhanden aktive Behandlung, 3=Diagnose vorhanden keine aktive Behandlung",
          input.I_MedizinischeDiagnosen?.diagnosen?.neurologisch?.parkinson ?? ""
        ],
        [
          "Diagnosen - Neurologisch - Tetraplegie",
          "I_MedizinischeDiagnosen.diagnosen.neurologisch.tetraplegie",
          "1=Hauptdiagnose/aktive Behandlung, 2=Diagnose vorhanden aktive Behandlung, 3=Diagnose vorhanden keine aktive Behandlung",
          input.I_MedizinischeDiagnosen?.diagnosen?.neurologisch?.tetraplegie ?? ""
        ],
        [
          "Diagnosen - Neurologisch - CVI",
          "I_MedizinischeDiagnosen.diagnosen.neurologisch.CVI",
          "1=Hauptdiagnose/aktive Behandlung, 2=Diagnose vorhanden aktive Behandlung, 3=Diagnose vorhanden keine aktive Behandlung",
          input.I_MedizinischeDiagnosen?.diagnosen?.neurologisch?.CVI ?? ""
        ],
        [
          "Diagnosen - Herz Lunge - KHK",
          "I_MedizinischeDiagnosen.diagnosen.herzLunge.KHK",
          "1=Hauptdiagnose/aktive Behandlung, 2=Diagnose vorhanden aktive Behandlung, 3=Diagnose vorhanden keine aktive Behandlung",
          input.I_MedizinischeDiagnosen?.diagnosen?.herzLunge?.KHK ?? ""
        ],
        [
          "Diagnosen - Herz Lunge - COPD",
          "I_MedizinischeDiagnosen.diagnosen.herzLunge.COPD",
          "1=Hauptdiagnose/aktive Behandlung, 2=Diagnose vorhanden aktive Behandlung, 3=Diagnose vorhanden keine aktive Behandlung",
          input.I_MedizinischeDiagnosen?.diagnosen?.herzLunge?.COPD ?? ""
        ],
        [
          "Diagnosen - Herz Lunge - Herzinsuffizienz",
          "I_MedizinischeDiagnosen.diagnosen.herzLunge.herzinsuffizienz",
          "1=Hauptdiagnose/aktive Behandlung, 2=Diagnose vorhanden aktive Behandlung, 3=Diagnose vorhanden keine aktive Behandlung",
          input.I_MedizinischeDiagnosen?.diagnosen?.herzLunge?.herzinsuffizienz ?? ""
        ],
        [
          "Diagnosen - Psychiatrisch - Angststoerungen",
          "I_MedizinischeDiagnosen.diagnosen.psychiatrisch.angststoerungen",
          "1=Hauptdiagnose/aktive Behandlung, 2=Diagnose vorhanden aktive Behandlung, 3=Diagnose vorhanden keine aktive Behandlung",
          input.I_MedizinischeDiagnosen?.diagnosen?.psychiatrisch?.angststoerungen ?? ""
        ],
        [
          "Diagnosen - Psychiatrisch - Bipolar",
          "I_MedizinischeDiagnosen.diagnosen.psychiatrisch.bipolar",
          "1=Hauptdiagnose/aktive Behandlung, 2=Diagnose vorhanden aktive Behandlung, 3=Diagnose vorhanden keine aktive Behandlung",
          input.I_MedizinischeDiagnosen?.diagnosen?.psychiatrisch?.bipolar ?? ""
        ],
        [
          "Diagnosen - Psychiatrisch - Depression",
          "I_MedizinischeDiagnosen.diagnosen.psychiatrisch.depression",
          "1=Hauptdiagnose/aktive Behandlung, 2=Diagnose vorhanden aktive Behandlung, 3=Diagnose vorhanden keine aktive Behandlung",
          input.I_MedizinischeDiagnosen?.diagnosen?.psychiatrisch?.depression ?? ""
        ],
        [
          "Diagnosen - Psychiatrisch - Schizophrenie",
          "I_MedizinischeDiagnosen.diagnosen.psychiatrisch.schizophrenie",
          "1=Hauptdiagnose/aktive Behandlung, 2=Diagnose vorhanden aktive Behandlung, 3=Diagnose vorhanden keine aktive Behandlung",
          input.I_MedizinischeDiagnosen?.diagnosen?.psychiatrisch?.schizophrenie ?? ""
        ],
        [
          "Diagnosen - Infektionen - Pneumonie",
          "I_MedizinischeDiagnosen.diagnosen.infektionen.pneumonie",
          "1=Hauptdiagnose/aktive Behandlung, 2=Diagnose vorhanden aktive Behandlung, 3=Diagnose vorhanden keine aktive Behandlung",
          input.I_MedizinischeDiagnosen?.diagnosen?.infektionen?.pneumonie ?? ""
        ],
        [
          "Diagnosen - Infektionen - Harnwegsinfektion 30 T",
          "I_MedizinischeDiagnosen.diagnosen.infektionen.harnwegsinfektion30T",
          "1=Hauptdiagnose/aktive Behandlung, 2=Diagnose vorhanden aktive Behandlung, 3=Diagnose vorhanden keine aktive Behandlung",
          input.I_MedizinischeDiagnosen?.diagnosen?.infektionen?.harnwegsinfektion30T ?? ""
        ],
        [
          "Diagnosen - Andere - Krebserkrankung",
          "I_MedizinischeDiagnosen.diagnosen.andere.krebserkrankung",
          "1=Hauptdiagnose/aktive Behandlung, 2=Diagnose vorhanden aktive Behandlung, 3=Diagnose vorhanden keine aktive Behandlung",
          input.I_MedizinischeDiagnosen?.diagnosen?.andere?.krebserkrankung ?? ""
        ],
        [
          "Diagnosen - Andere - Diabetes Mellitus",
          "I_MedizinischeDiagnosen.diagnosen.andere.diabetesMellitus",
          "1=Hauptdiagnose/aktive Behandlung, 2=Diagnose vorhanden aktive Behandlung, 3=Diagnose vorhanden keine aktive Behandlung",
          input.I_MedizinischeDiagnosen?.diagnosen?.andere?.diabetesMellitus ?? ""
        ],
        [
          "Individuelle Praezisierungen",
          "I_MedizinischeDiagnosen.individuellePraezisierungen",
          "Freitext",
          input.I_MedizinischeDiagnosen?.individuellePraezisierungen ?? ""
        ]
      ],
      "columnWidths": [
        1900,
        2500,
        3160,
        1800
      ],
      "width": 9360,
      "headerShading": true,
      "borders": true
    },
    {
      "type": "paragraph",
      "text": "Diagnosen - Weitere Diagnosen (I_MedizinischeDiagnosen.diagnosen.weitereDiagnosen) — Liste/Array.",
      "bold": true,
      "spacing": {
        "before": 200,
        "after": 100
      }
    },
    {
      "type": "table",
      "headers": [
        "Feld (pro Eintrag)",
        "JSON-Pfad",
        "Kodierung/Optionen",
        "Wert"
      ],
      "rows": handleDiagnoses(input.I_MedizinischeDiagnosen?.diagnosen?.weitereDiagnosen ?? []),
      "columnWidths": [
        1900,
        2500,
        3160,
        1800
      ],
      "width": 9360,
      "headerShading": true,
      "borders": true
    },
    {
      "type": "pageBreak"
    },
    {
      "type": "heading",
      "text": "Bereich J: Gesundheitszustand",
      "level": 2
    },
    {
      "type": "table",
      "headers": [
        "Feld",
        "JSON-Pfad",
        "Kodierung/Optionen",
        "Wert"
      ],
      "rows": [
        [
          "Stuerze - Anzahl",
          "J_Gesundheitszustand.stuerze.anzahl",
          "0=kein, 1=ein, 2=zwei oder mehr",
          input.J_Gesundheitszustand?.stuerze?.anzahl ?? ""
        ],
        [
          "Stuerze - Letzten 30 T",
          "J_Gesundheitszustand.stuerze.letzten30T",
          "0=Nein, 1=Ja",
          input.J_Gesundheitszustand?.stuerze?.letzten30T ?? ""
        ],
        [
          "Stuerze - Vor 31 bis 90 T",
          "J_Gesundheitszustand.stuerze.vor31bis90T",
          "0=Nein, 1=Ja",
          input.J_Gesundheitszustand?.stuerze?.vor31bis90T ?? ""
        ],
        [
          "Stuerze - Vor 91 bis 180 T",
          "J_Gesundheitszustand.stuerze.vor91bis180T",
          "0=Nein, 1=Ja",
          input.J_Gesundheitszustand?.stuerze?.vor91bis180T ?? ""
        ],
        [
          "Stuerze - Aktuell 3 T",
          "J_Gesundheitszustand.stuerze.aktuell3T",
          "0=Nein, 1=Ja",
          input.J_Gesundheitszustand?.stuerze?.aktuell3T ?? ""
        ],
        [
          "Gesundheitsprobleme Haeufigkeit 3 T",
          "J_Gesundheitszustand.gesundheitsproblemeHaeufigkeit3T",
          "0=Nicht vorhanden, 1=Vorhanden, zeigten sich jedoch nicht in letzten 3 Tagen, 2=Zeigten sich an 1 Tag der letzten 3 Tage, 3=Zeigten sich an 2 Tagen der letzten 3 Tage, 4=Zeigten sich täglich in letzten 3 Tagen",
          input.J_Gesundheitszustand?.gesundheitsproblemeHaeufigkeit3T ?? ""
        ],
        [
          "Gleichgewicht Probleme - Nicht Aufstehen",
          "J_Gesundheitszustand.gleichgewichtProbleme.nichtAufstehen",
          "0=Nein, 1=Ja",
          input.J_Gesundheitszustand?.gleichgewichtProbleme?.nichtAufstehen ?? ""
        ],
        [
          "Gleichgewicht Probleme - Nicht Umdrehen",
          "J_Gesundheitszustand.gleichgewichtProbleme.nichtUmdrehen",
          "0=Nein, 1=Ja",
          input.J_Gesundheitszustand?.gleichgewichtProbleme?.nichtUmdrehen ?? ""
        ],
        [
          "Gleichgewicht Probleme - Schwindel",
          "J_Gesundheitszustand.gleichgewichtProbleme.schwindel",
          "0=Nein, 1=Ja",
          input.J_Gesundheitszustand?.gleichgewichtProbleme?.schwindel ?? ""
        ],
        [
          "Gleichgewicht Probleme - Unsicherer Gang",
          "J_Gesundheitszustand.gleichgewichtProbleme.unsichererGang",
          "0=Nein, 1=Ja",
          input.J_Gesundheitszustand?.gleichgewichtProbleme?.unsichererGang ?? ""
        ],
        [
          "Herz Lunge - Brustschmerz",
          "J_Gesundheitszustand.herzLunge.brustschmerz",
          "0=Nein, 1=Ja",
          input.J_Gesundheitszustand?.herzLunge?.brustschmerz ?? ""
        ],
        [
          "Herz Lunge - Atemwegssekrete Abhusten",
          "J_Gesundheitszustand.herzLunge.atemwegssekreteAbhusten",
          "0=Nein, 1=Ja",
          input.J_Gesundheitszustand?.herzLunge?.atemwegssekreteAbhusten ?? ""
        ],
        [
          "Psychiatrische Symptome - Formale Denksstoerung",
          "J_Gesundheitszustand.psychiatrischeSymptome.formaleDenksstoerung",
          "0=Nein, 1=Ja",
          input.J_Gesundheitszustand?.psychiatrischeSymptome?.formaleDenksstoerung ?? ""
        ],
        [
          "Psychiatrische Symptome - Wahnvorstellungen",
          "J_Gesundheitszustand.psychiatrischeSymptome.wahnvorstellungen",
          "0=Nein, 1=Ja",
          input.J_Gesundheitszustand?.psychiatrischeSymptome?.wahnvorstellungen ?? ""
        ],
        [
          "Psychiatrische Symptome - Halluzinationen",
          "J_Gesundheitszustand.psychiatrischeSymptome.halluzinationen",
          "0=Nein, 1=Ja",
          input.J_Gesundheitszustand?.psychiatrischeSymptome?.halluzinationen ?? ""
        ],
        [
          "Neurologisch - Aphasie",
          "J_Gesundheitszustand.neurologisch.aphasie",
          "0=Nein, 1=Ja",
          input.J_Gesundheitszustand?.neurologisch?.aphasie ?? ""
        ],
        [
          "Magen Darm - Saures Aufstossen",
          "J_Gesundheitszustand.magenDarm.sauresAufstossen",
          "0=Nein, 1=Ja",
          input.J_Gesundheitszustand?.magenDarm?.sauresAufstossen ?? ""
        ],
        [
          "Magen Darm - Verstopfung",
          "J_Gesundheitszustand.magenDarm.verstopfung",
          "0=Nein, 1=Ja",
          input.J_Gesundheitszustand?.magenDarm?.verstopfung ?? ""
        ],
        [
          "Magen Darm - Durchfall",
          "J_Gesundheitszustand.magenDarm.durchfall",
          "0=Nein, 1=Ja",
          input.J_Gesundheitszustand?.magenDarm?.durchfall ?? ""
        ],
        [
          "Magen Darm - Erbrechen",
          "J_Gesundheitszustand.magenDarm.erbrechen",
          "0=Nein, 1=Ja",
          input.J_Gesundheitszustand?.magenDarm?.erbrechen ?? ""
        ],
        [
          "Schlafprobleme - Ein Durchschlaf",
          "J_Gesundheitszustand.schlafprobleme.einDurchschlaf",
          "0=Nein, 1=Ja",
          input.J_Gesundheitszustand?.schlafprobleme?.einDurchschlaf ?? ""
        ],
        [
          "Schlafprobleme - Zuviel Schlaf",
          "J_Gesundheitszustand.schlafprobleme.zuvielSchlaf",
          "0=Nein, 1=Ja",
          input.J_Gesundheitszustand?.schlafprobleme?.zuvielSchlaf ?? ""
        ],
        [
          "Andere - Aspiration",
          "J_Gesundheitszustand.andere.aspiration",
          "0=Nein, 1=Ja",
          input.J_Gesundheitszustand?.andere?.aspiration ?? ""
        ],
        [
          "Andere - Fieber",
          "J_Gesundheitszustand.andere.fieber",
          "0=Nein, 1=Ja",
          input.J_Gesundheitszustand?.andere?.fieber ?? ""
        ],
        [
          "Andere - Hygiene",
          "J_Gesundheitszustand.andere.hygiene",
          "0=Nein, 1=Ja",
          input.J_Gesundheitszustand?.andere?.hygiene ?? ""
        ],
        [
          "Andere - Periphere Oedeme",
          "J_Gesundheitszustand.andere.periphereOedeme",
          "0=Nein, 1=Ja",
          input.J_Gesundheitszustand?.andere?.periphereOedeme ?? ""
        ],
        [
          "Dyspnoe",
          "J_Gesundheitszustand.dyspnoe",
          "0=Nicht vorhanden, 1=Nicht vorhanden in Ruhe aber bei mittlerer Anstrengung vorhanden, 2=Nicht vorhanden in Ruhe aber bei alltäglicher leichter Anstrengung vorhanden, 3=In Ruhe vorhanden",
          input.J_Gesundheitszustand?.dyspnoe ?? ""
        ],
        [
          "Fatigue",
          "J_Gesundheitszustand.fatigue",
          "0=Keine Müdigkeit, 1=Leichte - verminderte Energie, führt jedoch normale Alltagsaktivitäten aus, 2=Mittlere - wegen verminderter Energie nicht fähig normale Alltagsaktivitäten zu Ende zu führen, 3=Grosse - wegen verminderter Energie unfähig einige normale Alltagsaktivitäten zu beginnen, 4=Unfähigkeit, jegliche normale Alltagsaktivität zu beginnen wegen verminderter Energie",
          input.J_Gesundheitszustand?.fatigue ?? ""
        ],
        [
          "Schmerzen - Haeufigkeit",
          "J_Gesundheitszustand.schmerzen.haeufigkeit",
          "0=Keine Schmerzen, 1=Vorhanden, zeigte sich jedoch nicht in letzten 3 Tagen, 2=Zeigte sich an 1 oder 2 Tagen in letzten 3 Tagen, 3=Zeigte sich täglich in letzten 3 Tagen",
          input.J_Gesundheitszustand?.schmerzen?.haeufigkeit ?? ""
        ],
        [
          "Schmerzen - Intensitaet",
          "J_Gesundheitszustand.schmerzen.intensitaet",
          "0=Keine Schmerzen, 1=Leichte Schmerzen, 2=Mittlere Schmerzen, 3=Starke Schmerzen, 4=Perioden mit unerträglichem Schmerz",
          input.J_Gesundheitszustand?.schmerzen?.intensitaet ?? ""
        ],
        [
          "Schmerzen - Episoden",
          "J_Gesundheitszustand.schmerzen.episoden",
          "0=Keine Schmerzen, 1=Eine einzelne Schmerzepisode in letzten 3 Tagen, 2=Periodische Schmerzen in letzten 3 Tagen, 3=Konstante Schmerzen in letzten 3 Tagen",
          input.J_Gesundheitszustand?.schmerzen?.episoden ?? ""
        ],
        [
          "Schmerzen - Schmerzdurchbruch",
          "J_Gesundheitszustand.schmerzen.schmerzdurchbruch",
          "0=Nein, 1=Ja",
          input.J_Gesundheitszustand?.schmerzen?.schmerzdurchbruch ?? ""
        ],
        [
          "Schmerzen - Schmerzkontrolle",
          "J_Gesundheitszustand.schmerzen.schmerzkontrolle",
          "0=Schmerzen sind kein Thema, 1=Schmerzintensität ist erträgbar, keine Schmerztherapie/Anpassung nötig, 2=Schmerzen sind durch Therapie ausreichend kontrolliert, 3=Schmerzen sind kontrolliert wenn Therapie befolgt, wird aber nicht immer befolgt, 4=Schmerztherapie befolgt, aber Schmerzkontrolle nicht ausreichend, 5=Keine Schmerztherapie vorhanden, Schmerzen nicht ausreichend kontrolliert",
          input.J_Gesundheitszustand?.schmerzen?.schmerzkontrolle ?? ""
        ],
        [
          "Instabiler Krankheitszustand - Gesamt",
          "J_Gesundheitszustand.instabilerKrankheitszustand.gesamt",
          "0=Nein, 1=Ja",
          input.J_Gesundheitszustand?.instabilerKrankheitszustand?.gesamt ?? ""
        ],
        [
          "Instabiler Krankheitszustand - Destabilisiert Kognition Badl Iadl Stimmung",
          "J_Gesundheitszustand.instabilerKrankheitszustand.destabilisiertKognitionBadlIadlStimmung",
          "0=Nein, 1=Ja",
          input.J_Gesundheitszustand?.instabilerKrankheitszustand?.destabilisiertKognitionBadlIadlStimmung ?? ""
        ],
        [
          "Instabiler Krankheitszustand - Akute Exazerbation",
          "J_Gesundheitszustand.instabilerKrankheitszustand.akuteExazerbation",
          "0=Nein, 1=Ja",
          input.J_Gesundheitszustand?.instabilerKrankheitszustand?.akuteExazerbation ?? ""
        ],
        [
          "Instabiler Krankheitszustand - Terminaler Zustand",
          "J_Gesundheitszustand.instabilerKrankheitszustand.terminalerZustand",
          "0=Nein, 1=Ja",
          input.J_Gesundheitszustand?.instabilerKrankheitszustand?.terminalerZustand ?? ""
        ],
        [
          "Selbstbeurteilung Gesundheit",
          "J_Gesundheitszustand.selbstbeurteilungGesundheit",
          "0=Ausgezeichnet, 1=Gut, 2=Mässig, 3=Schlecht, 8=keine Antwort",
          input.J_Gesundheitszustand?.selbstbeurteilungGesundheit ?? ""
        ],
        [
          "Tabak Alkohol - Rauch Taeglich",
          "J_Gesundheitszustand.tabakAlkohol.rauchTaeglich",
          "0=Nein, 1=Nicht in letzten 3 Tagen, normalerweise aber täglich, 2=Ja",
          input.J_Gesundheitszustand?.tabakAlkohol?.rauchTaeglich ?? ""
        ],
        [
          "Tabak Alkohol - Alkohol 14 T",
          "J_Gesundheitszustand.tabakAlkohol.alkohol14T",
          "Höchste Anzahl Getränke bei einem Anlass in letzten 14 Tagen. 0=Keine, 1=1, 2=2-4, 3=5 oder mehr",
          input.J_Gesundheitszustand?.tabakAlkohol?.alkohol14T ?? ""
        ],
        [
          "Individuelle Praezisierungen",
          "J_Gesundheitszustand.individuellePraezisierungen",
          "Freitext",
          input.J_Gesundheitszustand?.individuellePraezisierungen ?? ""
        ]
      ],
      "columnWidths": [
        1900,
        2500,
        3160,
        1800
      ],
      "width": 9360,
      "headerShading": true,
      "borders": true
    },
    {
      "type": "pageBreak"
    },
    {
      "type": "heading",
      "text": "Bereich K: Mund- und Ernährungsstatus",
      "level": 2
    },
    {
      "type": "table",
      "headers": [
        "Feld",
        "JSON-Pfad",
        "Kodierung/Optionen",
        "Wert"
      ],
      "rows": [
        [
          "Groesse Cm",
          "K_MundErnaehrungsstatus.groesseCm",
          "Zahl",
          input.K_MundErnaehrungsstatus?.groesseCm ?? ""
        ],
        [
          "Gewicht Kg",
          "K_MundErnaehrungsstatus.gewichtKg",
          "Zahl",
          input.K_MundErnaehrungsstatus?.gewichtKg ?? ""
        ],
        [
          "Ernaehrungsprobleme - Vorhanden",
          "K_MundErnaehrungsstatus.ernaehrungsprobleme.vorhanden",
          "Item 2 header: Ernährungsprobleme 0=Nein, 1=Ja",
          input.K_MundErnaehrungsstatus?.ernaehrungsprobleme?.vorhanden ?? ""
        ],
        [
          "Ernaehrungsprobleme - Gewichtsverlust",
          "K_MundErnaehrungsstatus.ernaehrungsprobleme.gewichtsverlust",
          "0=Nein, 1=Ja",
          input.K_MundErnaehrungsstatus?.ernaehrungsprobleme?.gewichtsverlust ?? ""
        ],
        [
          "Ernaehrungsprobleme - Dehydration",
          "K_MundErnaehrungsstatus.ernaehrungsprobleme.dehydration",
          "0=Nein, 1=Ja",
          input.K_MundErnaehrungsstatus?.ernaehrungsprobleme?.dehydration ?? ""
        ],
        [
          "Ernaehrungsprobleme - Fluessigkeit Zu Wenig",
          "K_MundErnaehrungsstatus.ernaehrungsprobleme.fluessigkeitZuWenig",
          "0=Nein, 1=Ja",
          input.K_MundErnaehrungsstatus?.ernaehrungsprobleme?.fluessigkeitZuWenig ?? ""
        ],
        [
          "Ernaehrungsprobleme - Fluessigkeitsverlust Uebersteigt",
          "K_MundErnaehrungsstatus.ernaehrungsprobleme.fluessigkeitsverlustUebersteigt",
          "0=Nein, 1=Ja",
          input.K_MundErnaehrungsstatus?.ernaehrungsprobleme?.fluessigkeitsverlustUebersteigt ?? ""
        ],
        [
          "Ernaehrungsform",
          "K_MundErnaehrungsstatus.ernaehrungsform",
          "0=Normal - kann alle Formen von Nahrung schlucken, 1=Veränderte Speisen für unabhängige Aufnahme erforderlich, 2=Braucht Spezialzubereitung um feste Speisen zu schlucken (z.B. gehackt/breiig), 3=Braucht Spezialzubereitung von flüssiger Nahrung (z.B. verdickte Flüssigkeiten), 4=Kann nur pürierte Nahrung UND verdickte Flüssigkeit zu sich nehmen, 5=Kombination von oraler und parenteraler-/oder Sondenernährung, 6=Ausschliesslich nasogastrische Sondenernährung, 7=Abdominale Sondenernährung (z.B. PEG-Sonde), 8=Ausschliesslich parenterale Ernährung, alle Formen (z.B. TPN), 9=Aktivität kam während der ganzen Periode nicht vor",
          input.K_MundErnaehrungsstatus?.ernaehrungsform ?? ""
        ],
        [
          "Mund Zahnstatus - Vorhanden",
          "K_MundErnaehrungsstatus.mundZahnstatus.vorhanden",
          "Item 4 header: Mund- und Zahnstatus 0=Nein, 1=Ja",
          input.K_MundErnaehrungsstatus?.mundZahnstatus?.vorhanden ?? ""
        ],
        [
          "Mund Zahnstatus - Zahnprothese",
          "K_MundErnaehrungsstatus.mundZahnstatus.zahnprothese",
          "0=Nein, 1=Ja",
          input.K_MundErnaehrungsstatus?.mundZahnstatus?.zahnprothese ?? ""
        ],
        [
          "Mund Zahnstatus - Schlecht Zaehne",
          "K_MundErnaehrungsstatus.mundZahnstatus.schlechtZaehne",
          "0=Nein, 1=Ja",
          input.K_MundErnaehrungsstatus?.mundZahnstatus?.schlechtZaehne ?? ""
        ],
        [
          "Mund Zahnstatus - Mundtrockenheit",
          "K_MundErnaehrungsstatus.mundZahnstatus.mundtrockenheit",
          "0=Nein, 1=Ja",
          input.K_MundErnaehrungsstatus?.mundZahnstatus?.mundtrockenheit ?? ""
        ],
        [
          "Mund Zahnstatus - Kauprobleme",
          "K_MundErnaehrungsstatus.mundZahnstatus.kauprobleme",
          "0=Nein, 1=Ja",
          input.K_MundErnaehrungsstatus?.mundZahnstatus?.kauprobleme ?? ""
        ],
        [
          "Individuelle Praezisierungen",
          "K_MundErnaehrungsstatus.individuellePraezisierungen",
          "Freitext",
          input.K_MundErnaehrungsstatus?.individuellePraezisierungen ?? ""
        ]
      ],
      "columnWidths": [
        1900,
        2500,
        3160,
        1800
      ],
      "width": 9360,
      "headerShading": true,
      "borders": true
    },
    {
      "type": "pageBreak"
    },
    {
      "type": "heading",
      "text": "Bereich L: Zustand der Haut",
      "level": 2
    },
    {
      "type": "table",
      "headers": [
        "Feld",
        "JSON-Pfad",
        "Kodierung/Optionen",
        "Wert"
      ],
      "rows": [
        [
          "Dekubitus Schweregrad",
          "L_Haut.dekubitusSchweregrad",
          "0=Kein Dekubitus vorhanden, 1=Ständige Rötung der Haut, 2=Teilweiser Verlust von Hautschichten, 3=Tiefe Krater in der Haut, 4=Vollständiger Verlust aller Hautschichten, Muskel und/oder Knochen und/oder Sehne sichtbar, 5=Keine Einstufung möglich (z.B. Dominanz von grossflächigen Nekrosen)",
          input.L_Haut?.dekubitusSchweregrad ?? ""
        ],
        [
          "Frueherer Dekubitus",
          "L_Haut.fruehererDekubitus",
          "0=Nein, 1=Ja",
          input.L_Haut?.fruehererDekubitus ?? ""
        ],
        [
          "Andere Ulcera",
          "L_Haut.andereUlcera",
          "0=Nein, 1=Ja",
          input.L_Haut?.andereUlcera ?? ""
        ],
        [
          "Hautverletzungen",
          "L_Haut.hautverletzungen",
          "0=Nein, 1=Ja",
          input.L_Haut?.hautverletzungen ?? ""
        ],
        [
          "Hautrisse Schnittwunden",
          "L_Haut.hautrisseSchnittwunden",
          "0=Nein, 1=Ja",
          input.L_Haut?.hautrisseSchnittwunden ?? ""
        ],
        [
          "Andere Hautprobleme",
          "L_Haut.andereHautprobleme",
          "0=Nein, 1=Ja",
          input.L_Haut?.andereHautprobleme ?? ""
        ],
        [
          "Fussprobleme",
          "L_Haut.fussprobleme",
          "0=Keine Fussprobleme, 1=Fussprobleme vorhanden, keine Beeinträchtigung beim Gehen, 2=Fussprobleme beeinträchtigen das Gehen, 3=Fussprobleme verhindern das Gehen, 4=Fussprobleme, Person geht aber aufgrund anderer Probleme nicht",
          input.L_Haut?.fussprobleme ?? ""
        ],
        [
          "Individuelle Praezisierungen",
          "L_Haut.individuellePraezisierungen",
          "Freitext",
          input.L_Haut?.individuellePraezisierungen ?? ""
        ]
      ],
      "columnWidths": [
        1900,
        2500,
        3160,
        1800
      ],
      "width": 9360,
      "headerShading": true,
      "borders": true
    },
    {
      "type": "pageBreak"
    },
    {
      "type": "heading",
      "text": "Bereich M: Medikamente",
      "level": 2
    },
    {
      "type": "table",
      "headers": [
        "Feld",
        "JSON-Pfad",
        "Kodierung/Optionen",
        "Wert"
      ],
      "rows": [
        [
          "Total Anzahl Medikamente",
          "M_Medikamente.totalAnzahlMedikamente",
          "Ganzzahl",
          input.M_Medikamente?.totalAnzahlMedikamente ?? ""
        ],
        [
          "Medikamentenliste",
          "M_Medikamente.medikamentenliste",
          "1=Liste vorhanden, 2=Muss erstellt werden, 3=Nicht erforderlich",
          input.M_Medikamente?.medikamentenliste ?? ""
        ],
        [
          "Medikamentenallergien",
          "M_Medikamente.medikamentenallergien",
          "0=Nein, 1=Ja",
          input.M_Medikamente?.medikamentenallergien ?? ""
        ],
        [
          "Zuverlaessigkeit Einnahme",
          "M_Medikamente.zuverlaessigkeitEinnahme",
          "0=Immer, 1=≥80%, 2=<80%, 8=Keine Medikamente",
          input.M_Medikamente?.zuverlaessigkeitEinnahme ?? ""
        ],
        [
          "Individuelle Praezisierungen",
          "M_Medikamente.individuellePraezisierungen",
          "Freitext",
          input.M_Medikamente?.individuellePraezisierungen ?? ""
        ]
      ],
      "columnWidths": [
        1900,
        2500,
        3160,
        1800
      ],
      "width": 9360,
      "headerShading": true,
      "borders": true
    },
    {
      "type": "pageBreak"
    },
    {
      "type": "heading",
      "text": "Bereich N: Behandlungen (letzte 3 Tage / geplant)",
      "level": 2
    },
    {
      "type": "table",
      "headers": [
        "Feld",
        "JSON-Pfad",
        "Kodierung/Optionen",
        "Wert"
      ],
      "rows": [
        [
          "Behandlungen - Chemotherapie",
          "N_Behandlungen.behandlungen.chemotherapie",
          "0=Weder geplant noch durchgeführt, 1=Geplant nicht durchgeführt, 2=1-2x in letzten 3T, 3=Täglich",
          input.N_Behandlungen?.behandlungen?.chemotherapie ?? ""
        ],
        [
          "Behandlungen - Dialyse",
          "N_Behandlungen.behandlungen.dialyse",
          "0=Weder geplant noch durchgeführt, 1=Geplant nicht durchgeführt, 2=1-2x in letzten 3T, 3=Täglich",
          input.N_Behandlungen?.behandlungen?.dialyse ?? ""
        ],
        [
          "Behandlungen - Infektionskontrolle",
          "N_Behandlungen.behandlungen.infektionskontrolle",
          "0=Weder geplant noch durchgeführt, 1=Geplant nicht durchgeführt, 2=1-2x in letzten 3T, 3=Täglich",
          input.N_Behandlungen?.behandlungen?.infektionskontrolle ?? ""
        ],
        [
          "Behandlungen - Intravenoes Medikament",
          "N_Behandlungen.behandlungen.intravenoesMedikament",
          "0=Weder geplant noch durchgeführt, 1=Geplant nicht durchgeführt, 2=1-2x in letzten 3T, 3=Täglich",
          input.N_Behandlungen?.behandlungen?.intravenoesMedikament ?? ""
        ],
        [
          "Behandlungen - Sauerstoff",
          "N_Behandlungen.behandlungen.sauerstoff",
          "0=Weder geplant noch durchgeführt, 1=Geplant nicht durchgeführt, 2=1-2x in letzten 3T, 3=Täglich",
          input.N_Behandlungen?.behandlungen?.sauerstoff ?? ""
        ],
        [
          "Behandlungen - Bestrahlung",
          "N_Behandlungen.behandlungen.bestrahlung",
          "0=Weder geplant noch durchgeführt, 1=Geplant nicht durchgeführt, 2=1-2x in letzten 3T, 3=Täglich",
          input.N_Behandlungen?.behandlungen?.bestrahlung ?? ""
        ],
        [
          "Behandlungen - Absaugen Atemwege",
          "N_Behandlungen.behandlungen.absaugenAtemwege",
          "0=Weder geplant noch durchgeführt, 1=Geplant nicht durchgeführt, 2=1-2x in letzten 3T, 3=Täglich",
          input.N_Behandlungen?.behandlungen?.absaugenAtemwege ?? ""
        ],
        [
          "Behandlungen - Tracheostomie Pflege",
          "N_Behandlungen.behandlungen.tracheostomiePflege",
          "0=Weder geplant noch durchgeführt, 1=Geplant nicht durchgeführt, 2=1-2x in letzten 3T, 3=Täglich",
          input.N_Behandlungen?.behandlungen?.tracheostomiePflege ?? ""
        ],
        [
          "Behandlungen - Transfusion",
          "N_Behandlungen.behandlungen.transfusion",
          "0=Weder geplant noch durchgeführt, 1=Geplant nicht durchgeführt, 2=1-2x in letzten 3T, 3=Täglich",
          input.N_Behandlungen?.behandlungen?.transfusion ?? ""
        ],
        [
          "Behandlungen - Beatmung",
          "N_Behandlungen.behandlungen.beatmung",
          "0=Weder geplant noch durchgeführt, 1=Geplant nicht durchgeführt, 2=1-2x in letzten 3T, 3=Täglich",
          input.N_Behandlungen?.behandlungen?.beatmung ?? ""
        ],
        [
          "Behandlungen - Wundbehandlung",
          "N_Behandlungen.behandlungen.wundbehandlung",
          "0=Weder geplant noch durchgeführt, 1=Geplant nicht durchgeführt, 2=1-2x in letzten 3T, 3=Täglich",
          input.N_Behandlungen?.behandlungen?.wundbehandlung ?? ""
        ],
        [
          "Behandlungen - Blasentraining",
          "N_Behandlungen.behandlungen.blasentraining",
          "0=Weder geplant noch durchgeführt, 1=Geplant nicht durchgeführt, 2=1-2x in letzten 3T, 3=Täglich",
          input.N_Behandlungen?.behandlungen?.blasentraining ?? ""
        ],
        [
          "Behandlungen - Palliativpflege",
          "N_Behandlungen.behandlungen.palliativpflege",
          "0=Weder geplant noch durchgeführt, 1=Geplant nicht durchgeführt, 2=1-2x in letzten 3T, 3=Täglich",
          input.N_Behandlungen?.behandlungen?.palliativpflege ?? ""
        ],
        [
          "Behandlungen - Umlagerung",
          "N_Behandlungen.behandlungen.umlagerung",
          "0=Weder geplant noch durchgeführt, 1=Geplant nicht durchgeführt, 2=1-2x in letzten 3T, 3=Täglich",
          input.N_Behandlungen?.behandlungen?.umlagerung ?? ""
        ],
        [
          "Formal Hilfsnetz - Fa Ge Fa Be",
          "N_Behandlungen.formalHilfsnetz.faGeFaBe",
          "0=Nein, 1=Ja",
          input.N_Behandlungen?.formalHilfsnetz?.faGeFaBe ?? ""
        ],
        [
          "Formal Hilfsnetz - Pflegefachperson",
          "N_Behandlungen.formalHilfsnetz.pflegefachperson",
          "0=Nein, 1=Ja",
          input.N_Behandlungen?.formalHilfsnetz?.pflegefachperson ?? ""
        ],
        [
          "Formal Hilfsnetz - Haushilfe",
          "N_Behandlungen.formalHilfsnetz.haushilfe",
          "0=Nein, 1=Ja",
          input.N_Behandlungen?.formalHilfsnetz?.haushilfe ?? ""
        ],
        [
          "Formal Hilfsnetz - Mahlzeitendienst",
          "N_Behandlungen.formalHilfsnetz.mahlzeitendienst",
          "0=Nein, 1=Ja",
          input.N_Behandlungen?.formalHilfsnetz?.mahlzeitendienst ?? ""
        ],
        [
          "Formal Hilfsnetz - Physiotherapie",
          "N_Behandlungen.formalHilfsnetz.physiotherapie",
          "0=Nein, 1=Ja",
          input.N_Behandlungen?.formalHilfsnetz?.physiotherapie ?? ""
        ],
        [
          "Formal Hilfsnetz - Ergotherapie",
          "N_Behandlungen.formalHilfsnetz.ergotherapie",
          "0=Nein, 1=Ja",
          input.N_Behandlungen?.formalHilfsnetz?.ergotherapie ?? ""
        ],
        [
          "Formal Hilfsnetz - Logopaedie",
          "N_Behandlungen.formalHilfsnetz.logopaedie",
          "0=Nein, 1=Ja",
          input.N_Behandlungen?.formalHilfsnetz?.logopaedie ?? ""
        ],
        [
          "Formal Hilfsnetz - Psychotherapie",
          "N_Behandlungen.formalHilfsnetz.psychotherapie",
          "0=Nein, 1=Ja",
          input.N_Behandlungen?.formalHilfsnetz?.psychotherapie ?? ""
        ],
        [
          "Formal Hilfsnetz - Sozialarbeit",
          "N_Behandlungen.formalHilfsnetz.sozialarbeit",
          "0=Nein, 1=Ja",
          input.N_Behandlungen?.formalHilfsnetz?.sozialarbeit ?? ""
        ],
        [
          "Formal Hilfsnetz - Andere Fachkraefte",
          "N_Behandlungen.formalHilfsnetz.andereFachkraefte",
          "0=Nein, 1=Ja",
          input.N_Behandlungen?.formalHilfsnetz?.andereFachkraefte ?? ""
        ],
        [
          "Spital Notfall Arzt 90 T - Stationaere Hospitalisation",
          "N_Behandlungen.spitalNotfallArzt90T.stationaereHospitalisation",
          "Ganzzahl",
          input.N_Behandlungen?.spitalNotfallArzt90T?.stationaereHospitalisation ?? ""
        ],
        [
          "Spital Notfall Arzt 90 T - Notfall Konsultation",
          "N_Behandlungen.spitalNotfallArzt90T.notfallKonsultation",
          "Ganzzahl",
          input.N_Behandlungen?.spitalNotfallArzt90T?.notfallKonsultation ?? ""
        ],
        [
          "Spital Notfall Arzt 90 T - Arztbesuche",
          "N_Behandlungen.spitalNotfallArzt90T.arztbesuche",
          "Ganzzahl",
          input.N_Behandlungen?.spitalNotfallArzt90T?.arztbesuche ?? ""
        ],
        [
          "Koerperliche Fixierung",
          "N_Behandlungen.koerperlicheFixierung",
          "0=Nein, 1=Ja",
          input.N_Behandlungen?.koerperlicheFixierung ?? ""
        ],
        [
          "Individuelle Praezisierungen",
          "N_Behandlungen.individuellePraezisierungen",
          "Freitext",
          input.N_Behandlungen?.individuellePraezisierungen ?? ""
        ]
      ],
      "columnWidths": [
        1900,
        2500,
        3160,
        1800
      ],
      "width": 9360,
      "headerShading": true,
      "borders": true
    },
    {
      "type": "pageBreak"
    },
    {
      "type": "heading",
      "text": "Bereich O: Verantwortungen, Verfügungen",
      "level": 2
    },
    {
      "type": "table",
      "headers": [
        "Feld",
        "JSON-Pfad",
        "Kodierung/Optionen",
        "Wert"
      ],
      "rows": [
        [
          "Begleit Vertretungs Beistand",
          "O_Verfuegungen.begleitVertretungsBeistand",
          "0=Nein, 1=Ja, X=keine Antwort",
          input.O_Verfuegungen?.begleitVertretungsBeistand ?? ""
        ],
        [
          "Patientenverfuegung",
          "O_Verfuegungen.patientenverfuegung",
          "0=Nein, 1=Ja, X=keine Antwort",
          input.O_Verfuegungen?.patientenverfuegung ?? ""
        ],
        [
          "Individuelle Praezisierungen",
          "O_Verfuegungen.individuellePraezisierungen",
          "Freitext",
          input.O_Verfuegungen?.individuellePraezisierungen ?? ""
        ]
      ],
      "columnWidths": [
        1900,
        2500,
        3160,
        1800
      ],
      "width": 9360,
      "headerShading": true,
      "borders": true
    },
    {
      "type": "pageBreak"
    },
    {
      "type": "heading",
      "text": "Bereich P: Informelle Unterstützung",
      "level": 2
    },
    {
      "type": "table",
      "headers": [
        "Feld",
        "JSON-Pfad",
        "Kodierung/Optionen",
        "Wert"
      ],
      "rows": [
        [
          "Informelle Helfer Vorhanden",
          "P_InformelleUnterstuetzung.informelleHelferVorhanden",
          "0=Nein, 1=Ja",
          input.P_InformelleUnterstuetzung?.informelleHelferVorhanden ?? ""
        ],
        [
          "Anzahl Helfer",
          "P_InformelleUnterstuetzung.anzahlHelfer",
          "Ganzzahl",
          input.P_InformelleUnterstuetzung?.anzahlHelfer ?? ""
        ],
        [
          "Situation Hilfspersonen - Nicht Mehr In Der Lage",
          "P_InformelleUnterstuetzung.situationHilfspersonen.nichtMehrInDerLage",
          "0=Nein, 1=Ja",
          input.P_InformelleUnterstuetzung?.situationHilfspersonen?.nichtMehrInDerLage ?? ""
        ],
        [
          "Situation Hilfspersonen - Belastet Wuetend Deprimiert",
          "P_InformelleUnterstuetzung.situationHilfspersonen.belastetWuetendDeprimiert",
          "0=Nein, 1=Ja",
          input.P_InformelleUnterstuetzung?.situationHilfspersonen?.belastetWuetendDeprimiert ?? ""
        ],
        [
          "Situation Hilfspersonen - Ueberfordert Mit Krankheit",
          "P_InformelleUnterstuetzung.situationHilfspersonen.ueberfordertMitKrankheit",
          "0=Nein, 1=Ja",
          input.P_InformelleUnterstuetzung?.situationHilfspersonen?.ueberfordertMitKrankheit ?? ""
        ],
        [
          "Informelle Betreuungsstunden 3 T",
          "P_InformelleUnterstuetzung.informelleBetreuungsstunden3T",
          "Zahl",
          input.P_InformelleUnterstuetzung?.informelleBetreuungsstunden3T ?? ""
        ],
        [
          "Starke Unterstuetzende Beziehung",
          "P_InformelleUnterstuetzung.starkeUnterstuetzendeBeziehung",
          "0=Nein, 1=Ja",
          input.P_InformelleUnterstuetzung?.starkeUnterstuetzendeBeziehung ?? ""
        ],
        [
          "Individuelle Praezisierungen",
          "P_InformelleUnterstuetzung.individuellePraezisierungen",
          "Freitext",
          input.P_InformelleUnterstuetzung?.individuellePraezisierungen ?? ""
        ]
      ],
      "columnWidths": [
        1900,
        2500,
        3160,
        1800
      ],
      "width": 9360,
      "headerShading": true,
      "borders": true
    },
    {
      "type": "pageBreak"
    },
    {
      "type": "heading",
      "text": "Bereich Q: Wohnumgebungsabklärung",
      "level": 2
    },
    {
      "type": "table",
      "headers": [
        "Feld",
        "JSON-Pfad",
        "Kodierung/Optionen",
        "Wert"
      ],
      "rows": [
        [
          "Wohnumgebung Risiken - Vorhanden",
          "Q_Wohnumgebung.wohnumgebungRisiken.vorhanden",
          "Item 1 header: Wohnumgebung 0=Nein, 1=Ja",
          input.Q_Wohnumgebung?.wohnumgebungRisiken?.vorhanden ?? ""
        ],
        [
          "Wohnumgebung Risiken - Baufaellig Zustand",
          "Q_Wohnumgebung.wohnumgebungRisiken.baufaelligZustand",
          "0=Nein, 1=Ja",
          input.Q_Wohnumgebung?.wohnumgebungRisiken?.baufaelligZustand ?? ""
        ],
        [
          "Wohnumgebung Risiken - Vernachlaessigt Zustand",
          "Q_Wohnumgebung.wohnumgebungRisiken.vernachlaessigtZustand",
          "0=Nein, 1=Ja",
          input.Q_Wohnumgebung?.wohnumgebungRisiken?.vernachlaessigtZustand ?? ""
        ],
        [
          "Wohnumgebung Risiken - Ungenuegendes Heizen",
          "Q_Wohnumgebung.wohnumgebungRisiken.ungenuegendesHeizen",
          "0=Nein, 1=Ja",
          input.Q_Wohnumgebung?.wohnumgebungRisiken?.ungenuegendesHeizen ?? ""
        ],
        [
          "Wohnumgebung Risiken - Sicherheitsrisiken",
          "Q_Wohnumgebung.wohnumgebungRisiken.sicherheitsrisiken",
          "0=Nein, 1=Ja",
          input.Q_Wohnumgebung?.wohnumgebungRisiken?.sicherheitsrisiken ?? ""
        ],
        [
          "Wohnumgebung Risiken - Eingeschraenkter Zugang",
          "Q_Wohnumgebung.wohnumgebungRisiken.eingeschraenkterZugang",
          "0=Nein, 1=Ja",
          input.Q_Wohnumgebung?.wohnumgebungRisiken?.eingeschraenkterZugang ?? ""
        ],
        [
          "Behindertengerechte Wohnung",
          "Q_Wohnumgebung.behindertengerechteWohnung",
          "0=Nein, 1=Ja",
          input.Q_Wohnumgebung?.behindertengerechteWohnung ?? ""
        ],
        [
          "Wohnumfeld - Notfall Unterstuetzung",
          "Q_Wohnumgebung.wohnumfeld.notfallUnterstuetzung",
          "0=Nein, 1=Ja",
          input.Q_Wohnumgebung?.wohnumfeld?.notfallUnterstuetzung ?? ""
        ],
        [
          "Wohnumfeld - Lebensmittel Nahe",
          "Q_Wohnumgebung.wohnumfeld.lebensmittelNahe",
          "0=Nein, 1=Ja",
          input.Q_Wohnumgebung?.wohnumfeld?.lebensmittelNahe ?? ""
        ],
        [
          "Wohnumfeld - Hauslieferung Moeglich",
          "Q_Wohnumgebung.wohnumfeld.hauslieferungMoeglich",
          "0=Nein, 1=Ja",
          input.Q_Wohnumgebung?.wohnumfeld?.hauslieferungMoeglich ?? ""
        ],
        [
          "Finanzielle Einschraenkungen",
          "Q_Wohnumgebung.finanzielleEinschraenkungen",
          "0=Nein, 1=Ja, X=keine Antwort",
          input.Q_Wohnumgebung?.finanzielleEinschraenkungen ?? ""
        ],
        [
          "Individuelle Praezisierungen",
          "Q_Wohnumgebung.individuellePraezisierungen",
          "Freitext",
          input.Q_Wohnumgebung?.individuellePraezisierungen ?? ""
        ]
      ],
      "columnWidths": [
        1900,
        2500,
        3160,
        1800
      ],
      "width": 9360,
      "headerShading": true,
      "borders": true
    },
    {
      "type": "pageBreak"
    },
    {
      "type": "heading",
      "text": "Bereich R: Entlassungsaussichten und allgemeiner Zustand",
      "level": 2
    },
    {
      "type": "table",
      "headers": [
        "Feld",
        "JSON-Pfad",
        "Kodierung/Optionen",
        "Wert"
      ],
      "rows": [
        [
          "Pflegeziel Erreicht 90 T",
          "R_Entlassungsaussichten.pflegezielErreicht90T",
          "0=Nein, 1=Ja",
          input.R_Entlassungsaussichten?.pflegezielErreicht90T ?? ""
        ],
        [
          "Aenderung Selbstaendigkeit 90 T",
          "R_Entlassungsaussichten.aenderungSelbstaendigkeit90T",
          "0=Verbessert, 1=Keine Änderung, 2=Verschlechtert",
          input.R_Entlassungsaussichten?.aenderungSelbstaendigkeit90T ?? ""
        ],
        [
          "Individuelle Praezisierungen",
          "R_Entlassungsaussichten.individuellePraezisierungen",
          "Freitext",
          input.R_Entlassungsaussichten?.individuellePraezisierungen ?? ""
        ]
      ],
      "columnWidths": [
        1900,
        2500,
        3160,
        1800
      ],
      "width": 9360,
      "headerShading": true,
      "borders": true
    },
    {
      "type": "pageBreak"
    },
    {
      "type": "heading",
      "text": "Bereich S: Assessment-Informationen",
      "level": 2
    },
    {
      "type": "table",
      "headers": [
        "Feld",
        "JSON-Pfad",
        "Kodierung/Optionen",
        "Wert"
      ],
      "rows": [
        [
          "Datum Assessment",
          "S_AssessmentInformationen.datumAssessment",
          "Datum (JJJJ-MM-TT)",
          input.S_AssessmentInformationen?.datumAssessment ?? ""
        ],
        [
          "Evaluator In",
          "S_AssessmentInformationen.evaluatorIn",
          "Freitext",
          input.S_AssessmentInformationen?.evaluatorIn ?? ""
        ],
        [
          "Datum Abschluss",
          "S_AssessmentInformationen.datumAbschluss",
          "Datum (JJJJ-MM-TT)",
          input.S_AssessmentInformationen?.datumAbschluss ?? ""
        ],
        [
          "Abschliessende Person",
          "S_AssessmentInformationen.abschliessendePerson",
          "Freitext",
          input.S_AssessmentInformationen?.abschliessendePerson ?? ""
        ]
      ],
      "columnWidths": [
        1900,
        2500,
        3160,
        1800
      ],
      "width": 9360,
      "headerShading": true,
      "borders": true
    },
    {
      "type": "pageBreak"
    },
    {
      "type": "heading",
      "text": "Aenderungsprotokoll",
      "level": 2
    },
    {
      "type": "table",
      "headers": [
        "Feld",
        "JSON-Pfad",
        "Kodierung/Optionen",
        "Wert"
      ],
      "rows": [
        [
          "Aenderungsprotokoll",
          "aenderungsprotokoll",
          "Freitext",
          ""
        ]
      ],
      "columnWidths": [
        1900,
        2500,
        3160,
        1800
      ],
      "width": 9360,
      "headerShading": true,
      "borders": true
    }
  ],
  "metadata": {
    "title": "interRAI HC Schweiz - Formularstruktur",
    "author": "interRAI HC Automation",
    "margin": {
      "top": 1440,
      "right": 1080,
      "bottom": 1440,
      "left": 1080
    }
  }
})

function handleDiagnoses(weitereDiagnosen: {code?: string | null, bezeichnung?: string | null}[]) {
  if (!weitereDiagnosen.length) {
    return [[
      "Bezeichnung",
      "I_MedizinischeDiagnosen.diagnosen.weitereDiagnosen[].bezeichnung",
      "Freitext",
      ""
    ],
    [
      "Code",
      "I_MedizinischeDiagnosen.diagnosen.weitereDiagnosen[].code",
      "1=Hauptdiagnose/aktive Behandlung, 2=Diagnose vorhanden aktive Behandlung, 3=Diagnose vorhanden keine aktive Behandlung",
      ""
    ]]
  }
  const results = [];
  for (const diagnosis of weitereDiagnosen) {
    results.push([
      "Bezeichnung",
      "I_MedizinischeDiagnosen.diagnosen.weitereDiagnosen[].bezeichnung",
      "Freitext",
      diagnosis.bezeichnung ?? ""
    ])
    results.push([
      "Code",
      "I_MedizinischeDiagnosen.diagnosen.weitereDiagnosen[].code",
      "1=Hauptdiagnose/aktive Behandlung, 2=Diagnose vorhanden aktive Behandlung, 3=Diagnose vorhanden keine aktive Behandlung",
      diagnosis.code ?? ""
    ])
  }
  return results;
}