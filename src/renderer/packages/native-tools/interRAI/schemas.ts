export const INTERRAI_REPORT_SCHEMA_FORMAT = {
  A_AdministrativeDaten: {
    name: "string",
    vorname: "string",
    geschlecht: "integer (1=Männlich, 2=Weiblich, 3=Andere)",
    geburtsdatum: "string (date in format JJJJ-MM-TT)",
    zivilstand: "integer (1=Ledig, 2=Verheiratet/Partnerschaft, 4=Geschieden, 3=Verwitwet)",
    nummern: {
      versichertenNummer: "string",
      interneFallnummer: "string"
    },
    wohnort: "string",
    versicherungen: {
      grundversicherung: "string",
      zusatzversicherung: "string",
      invalidenUnfallMilitar: "string"
    },
    beurteilungsgrund: "integer (1=Erstassessment, 2=Reassessment, 3=Wiedereintritt, 4=Reassessment Statusveränderung, 6=Einsatzabbruch, 7=Andere)",
    beginnBedarfsabklaerung: "string (date in format JJJJ-MM-TT)",
    zielePerson: "string (Primäres Behandlungsziel)",
    wohnsituation: "integer (1=Privathaus/Eigentums-/Mietwohnung/gemietetes Zimmer, 2=Wohnung mit integrierten Dienstleistungen, 3=Einrichtung für Personen mit psychischen Problemen (z.B. Wohngruppen), 4=Wohngemeinschaft für Personen mit körperlicher Behinderung, 5=Einrichtung für Personen mit geistiger Behinderung, 6=Psychiatrische Klinik oder Abteilung, 7=Obdachlos (mit oder ohne Obdachlosenunterkunft), 8=Alters- und Pflegeheim, 9=Rehabilitationsklinik/-abteilung, 10=Hospiz/Palliativstation, 11=Akutklinik, 12=Justizvollzugsanstalt, 13=Sonstiges)",
    formZusammenleben: {
      form: "integer (1=Alleine, 2=Ausschliesslich mit Partner, 3=Mit Partner und anderen (Kinder, Eltern, Freunde), 4=Mit Kindern ohne Partner, 5=Mit Eltern oder Erziehungsberechtigten, 6=Mit Geschwistern, 7=Mit anderen Verwandten, 8=Mit einem oder mehreren Nicht-Verwandten)",
      neuZusammengezogen: "integer (0=Nein, 1=Ja)",
      wunschAndersLeben: "integer (0=Nein, 1=Ja andere Wohnung, 2=Ja andere Einrichtung)"
    },
    letzterSpitalaufenthalt: "integer (0=Kein in letzten 90T, 1=Vor 31-90T, 2=Vor 15-30T, 3=Vor 8-14T, 4=Letzte 7T, 5=Aktuell hospitalisiert)",
    individuellePraezisierungen: "string"
  },
  B_AufnahmeVorgeschichte: {
    datumEroeffnungDossier: "string (date in format JJJJ-MM-TT)",
    staatsangehoerigkeit: "integer (1=Schweiz, 2=Andere)",
    staatsangehoerigkeitAndere: "string",
    sprache: "integer (1=Schweizerdeutsch, 2=Französisch, 3=Italienisch, 4=Rätoromanisch, 5=Hochdeutsch, 6=Englisch, 7=Portugiesisch, 8=Spanisch, 9=Albanisch, 10=Kroatisch, 11=Serbisch, 12=Arabisch, 13=Kurdisch, 14=Türkisch, 15=Tamilisch, 16=Chinesisch, 17=Russisch, 18=Hindi, 19=Tigrinya, 20=Somalisch, 21=Andere, welche?)",
    uebersetzerNotwendig: "integer (0=Nein, 1=Ja)",
    wohnVorgeschichte5Jahre: {
      altersPflegeheim: "integer (0=Nein, 1=Ja)",
      begleitetesBetreutesWohnen: "integer (0=Nein, 1=Ja)",
      psychiatrischeEinrichtung: "integer (0=Nein, 1=Ja)",
      psychiatrischeKlinik: "integer (0=Nein, 1=Ja)",
      einrichtungGeistigeBehinderung: "integer (0=Nein, 1=Ja)"
    },
    individuellePraezisierungen: "string"
  },
  C_KognitiveFaehigkeiten: {
    entscheidungsfaehigkeit: "integer (0=Unabhängig - Entscheidungen sind konsistent, vernünftig und sinnvoll, 1=Veränderte Unabhängigkeit - einige Schwierigkeiten in neuen unbekannten Situationen, 2=Leichte Beeinträchtigung - in spezifischen wiederkehrenden Situationen unzuverlässig/gefährlich, braucht Anleitung und Überwachung, 3=Mittlere Beeinträchtigung - Entscheidungen durchwegs unzuverlässig oder gefährlich, i.d.R. Unterstützung erforderlich, 4=Schwere Beeinträchtigung - trifft selten/nie Entscheidungen, 5=Kein wahrnehmbares Bewusstsein, komatöser Status)",
    gedaechtnis: {
      kurzzeit: "integer (0=Ja, Gedächtnis funktioniert; 1=Gedächtnisprobleme)",
      handlung: "integer (0=Nein, 1=Ja)",
      situativ: "integer (0=Nein, 1=Ja)"
    },
    schwankungenBewusstsein: {
      leichtAblenkbar: "integer (0=Nein, 1=Ja)",
      episodenUnzusammenhaengend: "integer (0=Nein, 1=Ja)",
      tagesschwankungen: "integer (0=Nein, 1=Ja)"
    },
    akuteAenderungKognition: "integer (0=Nein, 1=Ja)",
    aenderungEntscheidungsfaehigkeit90T: "integer (0=Verbessert, 1=Keine Änderung, 2=Verschlechtert, 8=Unsicher)",
    individuellePraezisierungen: "string"
  },
  D_KommunikationSehen: {
    sichVerstaendlichMachen: "integer (0=Ist verständlich, 1=Ist normalerweise verständlich - Schwierigkeiten Worte zu finden/Gedanken zu beenden, aber mit genug Zeit keine Rückfragen nötig, 2=Ist meistens verständlich - Unterstützung üblicherweise erforderlich, 3=Manchmal verständlich - beschränkte Fähigkeit konkrete Wünsche zu äussern, 4=Selten oder nie verständlich)",
    andereVerstehen: "integer (0=Versteht - klare Auffassungsgabe, 1=Versteht andere normalerweise - verpasst wenige Bruchstücke, versteht das Meiste, 2=Versteht andere meistens - versteht mit Hilfe von Erläuterungen/Wiederholungen das Meiste, 3=Versteht andere manchmal - reagiert nur auf einfache direkte Fragen, 4=Versteht selten oder nie)",
    hoeren: "integer (Mit Hörhilfe, falls benutzt. 0=Ausreichend - keine Probleme normalen Gesprächen zu folgen, 1=Leichte Schwierigkeiten - Mühe in gewissen Umgebungen (leise Sprache oder >2m Entfernung), 2=Mittlere Schwierigkeiten - Schwierigkeiten normale Gespräche zu hören, auf ruhige Umgebung angewiesen, 3=Grosse Schwierigkeiten - in allen Situationen, Gegenüber muss laut/deutlich/langsam sprechen oder nur Gemurmel wahrnehmbar, 4=Hört nichts)",
    sehen: "integer (Bei angemessener Beleuchtung, falls nötig mit Sehhilfen. 0=Ausreichend - sieht kleine Details inkl. gewöhnlicher Druckbuchstaben, 1=Leichte Schwierigkeiten - sieht grosse Druckbuchstaben, aber keine gewöhnlichen, 2=Mittlere Schwierigkeiten - eingeschränktes Sehvermögen, kann aber Gegenstände in Umgebung identifizieren, 3=Grosse Schwierigkeiten - erkennt Gegenstände kaum, sieht nur Licht/Farben/Umrisse, 4=Kein Sehvermögen)",
    individuellePraezisierungen: "string"
  },
  E_StimmungVerhalten: {
    depressiveAnzeichen: {
      negativeAeusserungen: "integer|string (0=Nicht vorhanden, 1=Vorhanden nicht in letzten 3T, 2=1-2 Tage, 3=Täglich, X=keine Antwort)",
      anhaltenderAerger: "integer|string (0=Nicht vorhanden, 1=Vorhanden nicht in letzten 3T, 2=1-2 Tage, 3=Täglich, X=keine Antwort)",
      unrealistischeAengste: "integer|string (0=Nicht vorhanden, 1=Vorhanden nicht in letzten 3T, 2=1-2 Tage, 3=Täglich, X=keine Antwort)",
      sorgeGesundheit: "integer|string (0=Nicht vorhanden, 1=Vorhanden nicht in letzten 3T, 2=1-2 Tage, 3=Täglich, X=keine Antwort)",
      wiederholteAengstlicheBeschwerden: "integer|string (0=Nicht vorhanden, 1=Vorhanden nicht in letzten 3T, 2=1-2 Tage, 3=Täglich, X=keine Antwort)",
      traurigeMimik: "integer|string (0=Nicht vorhanden, 1=Vorhanden nicht in letzten 3T, 2=1-2 Tage, 3=Täglich, X=keine Antwort)",
      weinerlich: "integer|string (0=Nicht vorhanden, 1=Vorhanden nicht in letzten 3T, 2=1-2 Tage, 3=Täglich, X=keine Antwort)",
      wiederkehrendeAeusserungenSchreckliches: "integer|string (0=Nicht vorhanden, 1=Vorhanden nicht in letzten 3T, 2=1-2 Tage, 3=Täglich, X=keine Antwort)",
      rueckzugAktivitaeten: "integer|string (0=Nicht vorhanden, 1=Vorhanden nicht in letzten 3T, 2=1-2 Tage, 3=Täglich, X=keine Antwort)",
      verminderteSozialeInteraktion: "integer|string (0=Nicht vorhanden, 1=Vorhanden nicht in letzten 3T, 2=1-2 Tage, 3=Täglich, X=keine Antwort)",
      mangelndeLebensfreude: "integer|string (0=Nicht vorhanden, 1=Vorhanden nicht in letzten 3T, 2=1-2 Tage, 3=Täglich, X=keine Antwort)"
    },
    selbstdeklariertStimmung: {
      wenigInteresse: "integer|string (0=Nicht in letzten 3T, 1=Vorhanden aber nicht täglich, 2=1-2 Tage, 3=Täglich, 8=keine Antwort)",
      aengstlich: "integer|string (0=Nicht in letzten 3T, 1=Vorhanden aber nicht täglich, 2=1-2 Tage, 3=Täglich, 8=keine Antwort)",
      traurig: "integer|string (0=Nicht in letzten 3T, 1=Vorhanden aber nicht täglich, 2=1-2 Tage, 3=Täglich, 8=keine Antwort)"
    },
    verhaltensauffaelligkeiten: {
      umherirren: "integer|string (0=Nicht vorhanden, 1=Vorhanden nicht in letzten 3T, 2=1-2 Tage, 3=Täglich, X=keine Antwort)",
      verbaleAggressivitaet: "integer|string (0=Nicht vorhanden, 1=Vorhanden nicht in letzten 3T, 2=1-2 Tage, 3=Täglich, X=keine Antwort)",
      koerperlAggressivitaet: "integer|string (0=Nicht vorhanden, 1=Vorhanden nicht in letzten 3T, 2=1-2 Tage, 3=Täglich, X=keine Antwort)",
      storendesVerhalten: "integer|string (0=Nicht vorhanden, 1=Vorhanden nicht in letzten 3T, 2=1-2 Tage, 3=Täglich, X=keine Antwort)",
      unangemessenesVerhalten: "integer|string (0=Nicht vorhanden, 1=Vorhanden nicht in letzten 3T, 2=1-2 Tage, 3=Täglich, X=keine Antwort)",
      widersetztBehandlung: "integer|string (0=Nicht vorhanden, 1=Vorhanden nicht in letzten 3T, 2=1-2 Tage, 3=Täglich, X=keine Antwort)"
    },
    individuellePraezisierungen: "string"
  },
  F_PsychosocialesWohlbefinden: {
    sozialeBeziehungen: {
      teilnahmeSozialeAktivitaeten: "integer (0=Keine, 1=Länger als 30 Tage her, 2=Zwischen 8 und 30 Tagen her, 3=Zwischen 4 und 7 Tagen her, 4=In den letzten 3 Tagen, 8=Nicht bestimmbar, X=Person gibt keine Antwort)",
      besucheBekannteFamilie: "integer (0=Keine, 1=Länger als 30 Tage her, 2=Zwischen 8 und 30 Tagen her, 3=Zwischen 4 und 7 Tagen her, 4=In den letzten 3 Tagen, 8=Nicht bestimmbar, X=Person gibt keine Antwort)",
      andereKontakte: "integer (0=Keine, 1=Länger als 30 Tage her, 2=Zwischen 8 und 30 Tagen her, 3=Zwischen 4 und 7 Tagen her, 4=In den letzten 3 Tagen, 8=Nicht bestimmbar, X=Person gibt keine Antwort)",
      konfliktFamilieFreunde: "integer (0=Nein, 1=Ja)",
      furchtVorFamilie: "integer (0=Nein, 1=Ja)",
      vernachlaessigtMisshandelt: "integer (0=Nein, 1=Ja)"
    },
    einsamkeit: "integer (0=Nein, 1=Ja)",
    aenderungSozialeAktivitaeten90T: "integer (0=Kein Rückgang, 1=Rückgang leidet nicht, 2=Rückgang leidet darunter)",
    dauerAlleinseins: "integer|string (0=<1Std, 1=1-2Std, 2=>2Std<8Std, 3=≥8Std, X=keine Antwort)",
    belastendeEreignisse90T: "integer (0=Nein, 1=Ja)",
    individuellePraezisierungen: "string"
  },
  G_KoerperlicheFunktionen: {
    IADL: {
      mahlzeitenZubereitung: {
        effektiv: "integer (0=Unabhängig, 1=Vorbereitung, 2=Aufsicht, 3=Begrenzte Hilfe, 4=Verstärkte Hilfe, 5=Umfassende Hilfe, 6=Vollständige Hilfe, 8=nicht vorgekommen)",
        vermutet: "integer (0=Unabhängig, 1=Vorbereitung, 2=Aufsicht, 3=Begrenzte Hilfe, 4=Verstärkte Hilfe, 5=Umfassende Hilfe, 6=Vollständige Hilfe, 8=nicht vorgekommen)"
      },
      hausarbeit: {
        effektiv: "integer (0=Unabhängig, 1=Vorbereitung, 2=Aufsicht, 3=Begrenzte Hilfe, 4=Verstärkte Hilfe, 5=Umfassende Hilfe, 6=Vollständige Hilfe, 8=nicht vorgekommen)",
        vermutet: "integer (0=Unabhängig, 1=Vorbereitung, 2=Aufsicht, 3=Begrenzte Hilfe, 4=Verstärkte Hilfe, 5=Umfassende Hilfe, 6=Vollständige Hilfe, 8=nicht vorgekommen)"
      },
      geldVerwalten: {
        effektiv: "integer (0=Unabhängig, 1=Vorbereitung, 2=Aufsicht, 3=Begrenzte Hilfe, 4=Verstärkte Hilfe, 5=Umfassende Hilfe, 6=Vollständige Hilfe, 8=nicht vorgekommen)",
        vermutet: "integer (0=Unabhängig, 1=Vorbereitung, 2=Aufsicht, 3=Begrenzte Hilfe, 4=Verstärkte Hilfe, 5=Umfassende Hilfe, 6=Vollständige Hilfe, 8=nicht vorgekommen)"
      },
      medikamenteHandhaben: {
        effektiv: "integer (0=Unabhängig, 1=Vorbereitung, 2=Aufsicht, 3=Begrenzte Hilfe, 4=Verstärkte Hilfe, 5=Umfassende Hilfe, 6=Vollständige Hilfe, 8=nicht vorgekommen)",
        vermutet: "integer (0=Unabhängig, 1=Vorbereitung, 2=Aufsicht, 3=Begrenzte Hilfe, 4=Verstärkte Hilfe, 5=Umfassende Hilfe, 6=Vollständige Hilfe, 8=nicht vorgekommen)"
      },
      telefonieren: {
        effektiv: "integer (0=Unabhängig, 1=Vorbereitung, 2=Aufsicht, 3=Begrenzte Hilfe, 4=Verstärkte Hilfe, 5=Umfassende Hilfe, 6=Vollständige Hilfe, 8=nicht vorgekommen)",
        vermutet: "integer (0=Unabhängig, 1=Vorbereitung, 2=Aufsicht, 3=Begrenzte Hilfe, 4=Verstärkte Hilfe, 5=Umfassende Hilfe, 6=Vollständige Hilfe, 8=nicht vorgekommen)"
      },
      treppenBenutzen: {
        effektiv: "integer (0=Unabhängig, 1=Vorbereitung, 2=Aufsicht, 3=Begrenzte Hilfe, 4=Verstärkte Hilfe, 5=Umfassende Hilfe, 6=Vollständige Hilfe, 8=nicht vorgekommen)",
        vermutet: "integer (0=Unabhängig, 1=Vorbereitung, 2=Aufsicht, 3=Begrenzte Hilfe, 4=Verstärkte Hilfe, 5=Umfassende Hilfe, 6=Vollständige Hilfe, 8=nicht vorgekommen)"
      },
      einkaufen: {
        effektiv: "integer (0=Unabhängig, 1=Vorbereitung, 2=Aufsicht, 3=Begrenzte Hilfe, 4=Verstärkte Hilfe, 5=Umfassende Hilfe, 6=Vollständige Hilfe, 8=nicht vorgekommen)",
        vermutet: "integer (0=Unabhängig, 1=Vorbereitung, 2=Aufsicht, 3=Begrenzte Hilfe, 4=Verstärkte Hilfe, 5=Umfassende Hilfe, 6=Vollständige Hilfe, 8=nicht vorgekommen)"
      },
      verkehrsmittelNutzen: {
        effektiv: "integer (0=Unabhängig, 1=Vorbereitung, 2=Aufsicht, 3=Begrenzte Hilfe, 4=Verstärkte Hilfe, 5=Umfassende Hilfe, 6=Vollständige Hilfe, 8=nicht vorgekommen)",
        vermutet: "integer (0=Unabhängig, 1=Vorbereitung, 2=Aufsicht, 3=Begrenzte Hilfe, 4=Verstärkte Hilfe, 5=Umfassende Hilfe, 6=Vollständige Hilfe, 8=nicht vorgekommen)"
      }
    },
    BADL: {
      badDusche: "integer (0=Unabhängig, 1=Gegenstand bereitgestellt, 2=Aufsicht, 3=Begrenzte Hilfe, 4=Verstärkte Hilfe, 5=Umfassende Hilfe, 6=Vollständige Hilfe, 8=nicht vorgekommen)",
      persoenlicheHygiene: "integer (0=Unabhängig, 1=Gegenstand bereitgestellt, 2=Aufsicht, 3=Begrenzte Hilfe, 4=Verstärkte Hilfe, 5=Umfassende Hilfe, 6=Vollständige Hilfe, 8=nicht vorgekommen)",
      oberkoeperAnziehen: "integer (0=Unabhängig, 1=Gegenstand bereitgestellt, 2=Aufsicht, 3=Begrenzte Hilfe, 4=Verstärkte Hilfe, 5=Umfassende Hilfe, 6=Vollständige Hilfe, 8=nicht vorgekommen)",
      unterkoeperAnziehen: "integer (0=Unabhängig, 1=Gegenstand bereitgestellt, 2=Aufsicht, 3=Begrenzte Hilfe, 4=Verstärkte Hilfe, 5=Umfassende Hilfe, 6=Vollständige Hilfe, 8=nicht vorgekommen)",
      gehen: "integer (0=Unabhängig, 1=Gegenstand bereitgestellt, 2=Aufsicht, 3=Begrenzte Hilfe, 4=Verstärkte Hilfe, 5=Umfassende Hilfe, 6=Vollständige Hilfe, 8=nicht vorgekommen)",
      fortbewegungGleicheEtage: "integer (0=Unabhängig, 1=Gegenstand bereitgestellt, 2=Aufsicht, 3=Begrenzte Hilfe, 4=Verstärkte Hilfe, 5=Umfassende Hilfe, 6=Vollständige Hilfe, 8=nicht vorgekommen)",
      transferToilette: "integer (0=Unabhängig, 1=Gegenstand bereitgestellt, 2=Aufsicht, 3=Begrenzte Hilfe, 4=Verstärkte Hilfe, 5=Umfassende Hilfe, 6=Vollständige Hilfe, 8=nicht vorgekommen)",
      toilettenBenutzung: "integer (0=Unabhängig, 1=Gegenstand bereitgestellt, 2=Aufsicht, 3=Begrenzte Hilfe, 4=Verstärkte Hilfe, 5=Umfassende Hilfe, 6=Vollständige Hilfe, 8=nicht vorgekommen)",
      mobilitaetImBett: "integer (0=Unabhängig, 1=Gegenstand bereitgestellt, 2=Aufsicht, 3=Begrenzte Hilfe, 4=Verstärkte Hilfe, 5=Umfassende Hilfe, 6=Vollständige Hilfe, 8=nicht vorgekommen)",
      essenTrinken: "integer (0=Unabhängig, 1=Gegenstand bereitgestellt, 2=Aufsicht, 3=Begrenzte Hilfe, 4=Verstärkte Hilfe, 5=Umfassende Hilfe, 6=Vollständige Hilfe, 8=nicht vorgekommen)"
    },
    fortbewegung: {
      innenraum: "integer (0=Geht ohne Hilfsmittel, 1=Geht mit Hilfsmittel (z.B. Stock, Krücke, Gehhilfe, schiebt Rollstuhl vor sich her), 2=Rollstuhl (mechanisch oder elektrisch)/Elektro-Scooter, 3=Person ist bettlägerig)",
      gehDistanz3T: "integer (0=Person ist nicht gegangen, 1=Weniger als 5 Meter, 2=5-49 Meter, 3=50-99 Meter, 4=100 Meter oder mehr, 5=1 Kilometer oder mehr)",
      rollstuhlDistanz3T: "integer (0=Person wurde von anderen geschoben, 1=Benutzt elektrischen Rollstuhl/Scooter, 2=Fährt selbständig weniger als 5 Meter, 3=Fährt selbständig 5-49 Meter, 4=Fährt selbständig 50-99 Meter, 5=Fährt selbständig 100 Meter oder mehr, 8=Keine Rollstuhlbenutzung)"
    },
    ausdauer: {
      stundenAktivitaet3T: "integer (0=Keine, 1=Weniger als 1 Std, 2=1-2 Stunden, 3=3-4 Stunden, 4=Mehr als 4 Stunden)",
      aussenaufenthalte3T: "integer (0=Person verlässt das Haus nie, 1=Haus in letzten 3 Tagen nicht verlassen, verlässt es sonst regelmässig, 2=An 1 oder 2 Tagen, 3=An allen 3 Tagen)"
    },
    rehabilitationsPotential: {
      personGlaubt: "integer (0=Nein, 1=Ja)",
      fachleuteGlauben: "integer (0=Nein, 1=Ja)"
    },
    aenderungBADL90T: "integer (0=Verbessert, 1=Keine Änderung, 2=Verschlechtert, 8=Unsicher)",
    autoFahren90T: "integer (0=Nein, 1=Ja)",
    individuellePraezisierungen: "string"
  },
  H_Kontinenz: {
    blasenkontinenz: "integer (0=Kontinent - vollständige Kontrolle, kein Katheter/Hilfsmittel, 1=Kontinent mit Katheter oder Stoma in letzten 3 Tagen, 2=Selten inkontinent - nicht inkontinent in letzten 3 Tagen aber hatte schon Episoden, 3=Teilweise inkontinent - aber nicht täglich, 4=Häufig inkontinent - täglich, aber mit Restkontrolle, 5=Inkontinent - keine Restkontrolle, 8=Nicht aufgetreten - keine Urinentleerungen in letzten 3 Tagen)",
    hilfsmittelUrin: "integer (0=Keine, 1=Kondomkatheter, 2=Dauerkatheter, 3=Stoma)",
    darmkontinenz: "integer (0=Kontinent - vollständige Kontrolle, kein Stoma/Hilfsmittel, 1=Kontinent mit Stoma - kontrolliert in letzten 3 Tagen, 2=Selten inkontinent - nicht inkontinent in letzten 3 Tagen aber hatte schon Episoden, 3=Teilweise inkontinent - aber nicht täglich, 4=Häufig inkontinent - täglich, aber mit Restkontrolle, 5=Inkontinent - keine Restkontrolle, 8=Nicht aufgetreten - keine Darmentleerung in letzten 3 Tagen)",
    inkontinenzeinlagen: "integer (0=Nein, 1=Ja)",
    individuellePraezisierungen: "string"
  },
  I_MedizinischeDiagnosen: {
    schriftlicheDiagnosenBekannt: "integer (0=Nein, 1=Ja)",
    diagnosen: {
      muskuloskeletal: {
        hueftfraktur30T: "integer (1=Hauptdiagnose/aktive Behandlung, 2=Diagnose vorhanden aktive Behandlung, 3=Diagnose vorhanden keine aktive Behandlung)",
        andereFrakturen: "integer (1=Hauptdiagnose/aktive Behandlung, 2=Diagnose vorhanden aktive Behandlung, 3=Diagnose vorhanden keine aktive Behandlung)"
      },
      neurologisch: {
        alzheimer: "integer (1=Hauptdiagnose/aktive Behandlung, 2=Diagnose vorhanden aktive Behandlung, 3=Diagnose vorhanden keine aktive Behandlung)",
        andereDemenz: "integer (1=Hauptdiagnose/aktive Behandlung, 2=Diagnose vorhanden aktive Behandlung, 3=Diagnose vorhanden keine aktive Behandlung)",
        hemiplegie: "integer (1=Hauptdiagnose/aktive Behandlung, 2=Diagnose vorhanden aktive Behandlung, 3=Diagnose vorhanden keine aktive Behandlung)",
        multipleSklerose: "integer (1=Hauptdiagnose/aktive Behandlung, 2=Diagnose vorhanden aktive Behandlung, 3=Diagnose vorhanden keine aktive Behandlung)",
        paraplegie: "integer (1=Hauptdiagnose/aktive Behandlung, 2=Diagnose vorhanden aktive Behandlung, 3=Diagnose vorhanden keine aktive Behandlung)",
        parkinson: "integer (1=Hauptdiagnose/aktive Behandlung, 2=Diagnose vorhanden aktive Behandlung, 3=Diagnose vorhanden keine aktive Behandlung)",
        tetraplegie: "integer (1=Hauptdiagnose/aktive Behandlung, 2=Diagnose vorhanden aktive Behandlung, 3=Diagnose vorhanden keine aktive Behandlung)",
        CVI: "integer (1=Hauptdiagnose/aktive Behandlung, 2=Diagnose vorhanden aktive Behandlung, 3=Diagnose vorhanden keine aktive Behandlung)"
      },
      herzLunge: {
        KHK: "integer (1=Hauptdiagnose/aktive Behandlung, 2=Diagnose vorhanden aktive Behandlung, 3=Diagnose vorhanden keine aktive Behandlung)",
        COPD: "integer (1=Hauptdiagnose/aktive Behandlung, 2=Diagnose vorhanden aktive Behandlung, 3=Diagnose vorhanden keine aktive Behandlung)",
        herzinsuffizienz: "integer (1=Hauptdiagnose/aktive Behandlung, 2=Diagnose vorhanden aktive Behandlung, 3=Diagnose vorhanden keine aktive Behandlung)"
      },
      psychiatrisch: {
        angststoerungen: "integer (1=Hauptdiagnose/aktive Behandlung, 2=Diagnose vorhanden aktive Behandlung, 3=Diagnose vorhanden keine aktive Behandlung)",
        bipolar: "integer (1=Hauptdiagnose/aktive Behandlung, 2=Diagnose vorhanden aktive Behandlung, 3=Diagnose vorhanden keine aktive Behandlung)",
        depression: "integer (1=Hauptdiagnose/aktive Behandlung, 2=Diagnose vorhanden aktive Behandlung, 3=Diagnose vorhanden keine aktive Behandlung)",
        schizophrenie: "integer (1=Hauptdiagnose/aktive Behandlung, 2=Diagnose vorhanden aktive Behandlung, 3=Diagnose vorhanden keine aktive Behandlung)"
      },
      infektionen: {
        pneumonie: "integer (1=Hauptdiagnose/aktive Behandlung, 2=Diagnose vorhanden aktive Behandlung, 3=Diagnose vorhanden keine aktive Behandlung)",
        harnwegsinfektion30T: "integer (1=Hauptdiagnose/aktive Behandlung, 2=Diagnose vorhanden aktive Behandlung, 3=Diagnose vorhanden keine aktive Behandlung)"
      },
      andere: {
        krebserkrankung: "integer (1=Hauptdiagnose/aktive Behandlung, 2=Diagnose vorhanden aktive Behandlung, 3=Diagnose vorhanden keine aktive Behandlung)",
        diabetesMellitus: "integer (1=Hauptdiagnose/aktive Behandlung, 2=Diagnose vorhanden aktive Behandlung, 3=Diagnose vorhanden keine aktive Behandlung)"
      },
      weitereDiagnosen: [
        {
          bezeichnung: "string",
          code: "integer (1=Hauptdiagnose/aktive Behandlung, 2=Diagnose vorhanden aktive Behandlung, 3=Diagnose vorhanden keine aktive Behandlung)"
        }
      ]
    },
    individuellePraezisierungen: "string"
  },
  J_Gesundheitszustand: {
    stuerze: {
      anzahl: "integer (0=kein, 1=ein, 2=zwei oder mehr)",
      letzten30T: "integer (0=Nein, 1=Ja)",
      vor31bis90T: "integer (0=Nein, 1=Ja)",
      vor91bis180T: "integer (0=Nein, 1=Ja)",
      aktuell3T: "integer (0=Nein, 1=Ja)"
    },
    gesundheitsproblemeHaeufigkeit3T: "integer (0=Nicht vorhanden, 1=Vorhanden, zeigten sich jedoch nicht in letzten 3 Tagen, 2=Zeigten sich an 1 Tag der letzten 3 Tage, 3=Zeigten sich an 2 Tagen der letzten 3 Tage, 4=Zeigten sich täglich in letzten 3 Tagen)",
    gleichgewichtProbleme: {
      nichtAufstehen: "integer (0=Nein, 1=Ja)",
      nichtUmdrehen: "integer (0=Nein, 1=Ja)",
      schwindel: "integer (0=Nein, 1=Ja)",
      unsichererGang: "integer (0=Nein, 1=Ja)"
    },
    herzLunge: {
      brustschmerz: "integer (0=Nein, 1=Ja)",
      atemwegssekreteAbhusten: "integer (0=Nein, 1=Ja)"
    },
    psychiatrischeSymptome: {
      formaleDenksstoerung: "integer (0=Nein, 1=Ja)",
      wahnvorstellungen: "integer (0=Nein, 1=Ja)",
      halluzinationen: "integer (0=Nein, 1=Ja)"
    },
    neurologisch: {
      aphasie: "integer (0=Nein, 1=Ja)"
    },
    magenDarm: {
      sauresAufstossen: "integer (0=Nein, 1=Ja)",
      verstopfung: "integer (0=Nein, 1=Ja)",
      durchfall: "integer (0=Nein, 1=Ja)",
      erbrechen: "integer (0=Nein, 1=Ja)"
    },
    schlafprobleme: {
      einDurchschlaf: "integer (0=Nein, 1=Ja)",
      zuvielSchlaf: "integer (0=Nein, 1=Ja)"
    },
    andere: {
      aspiration: "integer (0=Nein, 1=Ja)",
      fieber: "integer (0=Nein, 1=Ja)",
      hygiene: "integer (0=Nein, 1=Ja)",
      periphereOedeme: "integer (0=Nein, 1=Ja)"
    },
    dyspnoe: "integer (0=Nicht vorhanden, 1=Nicht vorhanden in Ruhe aber bei mittlerer Anstrengung vorhanden, 2=Nicht vorhanden in Ruhe aber bei alltäglicher leichter Anstrengung vorhanden, 3=In Ruhe vorhanden)",
    fatigue: "integer (0=Keine Müdigkeit, 1=Leichte - verminderte Energie, führt jedoch normale Alltagsaktivitäten aus, 2=Mittlere - wegen verminderter Energie nicht fähig normale Alltagsaktivitäten zu Ende zu führen, 3=Grosse - wegen verminderter Energie unfähig einige normale Alltagsaktivitäten zu beginnen, 4=Unfähigkeit, jegliche normale Alltagsaktivität zu beginnen wegen verminderter Energie)",
    schmerzen: {
      haeufigkeit: "integer (0=Keine Schmerzen, 1=Vorhanden, zeigte sich jedoch nicht in letzten 3 Tagen, 2=Zeigte sich an 1 oder 2 Tagen in letzten 3 Tagen, 3=Zeigte sich täglich in letzten 3 Tagen)",
      intensitaet: "integer (0=Keine Schmerzen, 1=Leichte Schmerzen, 2=Mittlere Schmerzen, 3=Starke Schmerzen, 4=Perioden mit unerträglichem Schmerz)",
      episoden: "integer (0=Keine Schmerzen, 1=Eine einzelne Schmerzepisode in letzten 3 Tagen, 2=Periodische Schmerzen in letzten 3 Tagen, 3=Konstante Schmerzen in letzten 3 Tagen)",
      schmerzdurchbruch: "integer (0=Nein, 1=Ja)",
      schmerzkontrolle: "integer (0=Schmerzen sind kein Thema, 1=Schmerzintensität ist erträgbar, keine Schmerztherapie/Anpassung nötig, 2=Schmerzen sind durch Therapie ausreichend kontrolliert, 3=Schmerzen sind kontrolliert wenn Therapie befolgt, wird aber nicht immer befolgt, 4=Schmerztherapie befolgt, aber Schmerzkontrolle nicht ausreichend, 5=Keine Schmerztherapie vorhanden, Schmerzen nicht ausreichend kontrolliert)"
    },
    instabilerKrankheitszustand: {
      gesamt: "integer (0=Nein, 1=Ja)",
      destabilisiertKognitionBadlIadlStimmung: "integer (0=Nein, 1=Ja)",
      akuteExazerbation: "integer (0=Nein, 1=Ja)",
      terminalerZustand: "integer (0=Nein, 1=Ja)"
    },
    selbstbeurteilungGesundheit: "integer|string (0=Ausgezeichnet, 1=Gut, 2=Mässig, 3=Schlecht, 8=keine Antwort)",
    tabakAlkohol: {
      rauchTaeglich: "integer (0=Nein, 1=Nicht in letzten 3 Tagen, normalerweise aber täglich, 2=Ja)",
      alkohol14T: "integer (Höchste Anzahl Getränke bei einem Anlass in letzten 14 Tagen. 0=Keine, 1=1, 2=2-4, 3=5 oder mehr)"
    },
    individuellePraezisierungen: "string"
  },
  K_MundErnaehrungsstatus: {
    groesseCm: "number",
    gewichtKg: "number",
    ernaehrungsprobleme: {
      vorhanden: "integer (Item 2 header: Ernährungsprobleme 0=Nein, 1=Ja)",
      gewichtsverlust: "integer (0=Nein, 1=Ja)",
      dehydration: "integer (0=Nein, 1=Ja)",
      fluessigkeitZuWenig: "integer (0=Nein, 1=Ja)",
      fluessigkeitsverlustUebersteigt: "integer (0=Nein, 1=Ja)"
    },
    ernaehrungsform: "integer (0=Normal - kann alle Formen von Nahrung schlucken, 1=Veränderte Speisen für unabhängige Aufnahme erforderlich, 2=Braucht Spezialzubereitung um feste Speisen zu schlucken (z.B. gehackt/breiig), 3=Braucht Spezialzubereitung von flüssiger Nahrung (z.B. verdickte Flüssigkeiten), 4=Kann nur pürierte Nahrung UND verdickte Flüssigkeit zu sich nehmen, 5=Kombination von oraler und parenteraler-/oder Sondenernährung, 6=Ausschliesslich nasogastrische Sondenernährung, 7=Abdominale Sondenernährung (z.B. PEG-Sonde), 8=Ausschliesslich parenterale Ernährung, alle Formen (z.B. TPN), 9=Aktivität kam während der ganzen Periode nicht vor)",
    mundZahnstatus: {
      vorhanden: "integer (Item 4 header: Mund- und Zahnstatus 0=Nein, 1=Ja)",
      zahnprothese: "integer (0=Nein, 1=Ja)",
      schlechtZaehne: "integer (0=Nein, 1=Ja)",
      mundtrockenheit: "integer (0=Nein, 1=Ja)",
      kauprobleme: "integer (0=Nein, 1=Ja)"
    },
    individuellePraezisierungen: "string"
  },
  L_Haut: {
    dekubitusSchweregrad: "integer (0=Kein Dekubitus vorhanden, 1=Ständige Rötung der Haut, 2=Teilweiser Verlust von Hautschichten, 3=Tiefe Krater in der Haut, 4=Vollständiger Verlust aller Hautschichten, Muskel und/oder Knochen und/oder Sehne sichtbar, 5=Keine Einstufung möglich (z.B. Dominanz von grossflächigen Nekrosen))",
    fruehererDekubitus: "integer (0=Nein, 1=Ja)",
    andereUlcera: "integer (0=Nein, 1=Ja)",
    hautverletzungen: "integer (0=Nein, 1=Ja)",
    hautrisseSchnittwunden: "integer (0=Nein, 1=Ja)",
    andereHautprobleme: "integer (0=Nein, 1=Ja)",
    fussprobleme: "integer (0=Keine Fussprobleme, 1=Fussprobleme vorhanden, keine Beeinträchtigung beim Gehen, 2=Fussprobleme beeinträchtigen das Gehen, 3=Fussprobleme verhindern das Gehen, 4=Fussprobleme, Person geht aber aufgrund anderer Probleme nicht)",
    individuellePraezisierungen: "string"
  },
  M_Medikamente: {
    totalAnzahlMedikamente: "integer",
    medikamentenliste: "integer (1=Liste vorhanden, 2=Muss erstellt werden, 3=Nicht erforderlich)",
    medikamentenallergien: "integer (0=Nein, 1=Ja)",
    zuverlaessigkeitEinnahme: "integer (0=Immer, 1=≥80%, 2=<80%, 8=Keine Medikamente)",
    individuellePraezisierungen: "string"
  },
  N_Behandlungen: {
    behandlungen: {
      chemotherapie: "integer (0=Weder geplant noch durchgeführt, 1=Geplant nicht durchgeführt, 2=1-2x in letzten 3T, 3=Täglich)",
      dialyse: "integer (0=Weder geplant noch durchgeführt, 1=Geplant nicht durchgeführt, 2=1-2x in letzten 3T, 3=Täglich)",
      infektionskontrolle: "integer (0=Weder geplant noch durchgeführt, 1=Geplant nicht durchgeführt, 2=1-2x in letzten 3T, 3=Täglich)",
      intravenoesMedikament: "integer (0=Weder geplant noch durchgeführt, 1=Geplant nicht durchgeführt, 2=1-2x in letzten 3T, 3=Täglich)",
      sauerstoff: "integer (0=Weder geplant noch durchgeführt, 1=Geplant nicht durchgeführt, 2=1-2x in letzten 3T, 3=Täglich)",
      bestrahlung: "integer (0=Weder geplant noch durchgeführt, 1=Geplant nicht durchgeführt, 2=1-2x in letzten 3T, 3=Täglich)",
      absaugenAtemwege: "integer (0=Weder geplant noch durchgeführt, 1=Geplant nicht durchgeführt, 2=1-2x in letzten 3T, 3=Täglich)",
      tracheostomiePflege: "integer (0=Weder geplant noch durchgeführt, 1=Geplant nicht durchgeführt, 2=1-2x in letzten 3T, 3=Täglich)",
      transfusion: "integer (0=Weder geplant noch durchgeführt, 1=Geplant nicht durchgeführt, 2=1-2x in letzten 3T, 3=Täglich)",
      beatmung: "integer (0=Weder geplant noch durchgeführt, 1=Geplant nicht durchgeführt, 2=1-2x in letzten 3T, 3=Täglich)",
      wundbehandlung: "integer (0=Weder geplant noch durchgeführt, 1=Geplant nicht durchgeführt, 2=1-2x in letzten 3T, 3=Täglich)",
      blasentraining: "integer (0=Weder geplant noch durchgeführt, 1=Geplant nicht durchgeführt, 2=1-2x in letzten 3T, 3=Täglich)",
      palliativpflege: "integer (0=Weder geplant noch durchgeführt, 1=Geplant nicht durchgeführt, 2=1-2x in letzten 3T, 3=Täglich)",
      umlagerung: "integer (0=Weder geplant noch durchgeführt, 1=Geplant nicht durchgeführt, 2=1-2x in letzten 3T, 3=Täglich)"
    },
    formalHilfsnetz: {
      faGeFaBe: "integer (0=Nein, 1=Ja)",
      pflegefachperson: "integer (0=Nein, 1=Ja)",
      haushilfe: "integer (0=Nein, 1=Ja)",
      mahlzeitendienst: "integer (0=Nein, 1=Ja)",
      physiotherapie: "integer (0=Nein, 1=Ja)",
      ergotherapie: "integer (0=Nein, 1=Ja)",
      logopaedie: "integer (0=Nein, 1=Ja)",
      psychotherapie: "integer (0=Nein, 1=Ja)",
      sozialarbeit: "integer (0=Nein, 1=Ja)",
      andereFachkraefte: "integer (0=Nein, 1=Ja)"
    },
    spitalNotfallArzt90T: {
      stationaereHospitalisation: "integer (minimum 0)",
      notfallKonsultation: "integer (minimum 0)",
      arztbesuche: "integer (minimum 0)"
    },
    koerperlicheFixierung: "integer (0=Nein, 1=Ja)",
    individuellePraezisierungen: "string"
  },
  O_Verfuegungen: {
    begleitVertretungsBeistand: "integer|string (0=Nein, 1=Ja, X=keine Antwort)",
    patientenverfuegung: "integer|string (0=Nein, 1=Ja, X=keine Antwort)",
    individuellePraezisierungen: "string"
  },
  P_InformelleUnterstuetzung: {
    informelleHelferVorhanden: "integer (0=Nein, 1=Ja)",
    anzahlHelfer: "integer (minimum 0)",
    situationHilfspersonen: {
      nichtMehrInDerLage: "integer (0=Nein, 1=Ja)",
      belastetWuetendDeprimiert: "integer (0=Nein, 1=Ja)",
      ueberfordertMitKrankheit: "integer (0=Nein, 1=Ja)"
    },
    informelleBetreuungsstunden3T: "number",
    starkeUnterstuetzendeBeziehung: "integer (0=Nein, 1=Ja)",
    individuellePraezisierungen: "string"
  },
  Q_Wohnumgebung: {
    wohnumgebungRisiken: {
      vorhanden: "integer (Item 1 header: Wohnumgebung 0=Nein, 1=Ja)",
      baufaelligZustand: "integer (0=Nein, 1=Ja)",
      vernachlaessigtZustand: "integer (0=Nein, 1=Ja)",
      ungenuegendesHeizen: "integer (0=Nein, 1=Ja)",
      sicherheitsrisiken: "integer (0=Nein, 1=Ja)",
      eingeschraenkterZugang: "integer (0=Nein, 1=Ja)"
    },
    behindertengerechteWohnung: "integer (0=Nein, 1=Ja)",
    wohnumfeld: {
      notfallUnterstuetzung: "integer (0=Nein, 1=Ja)",
      lebensmittelNahe: "integer (0=Nein, 1=Ja)",
      hauslieferungMoeglich: "integer (0=Nein, 1=Ja)"
    },
    finanzielleEinschraenkungen: "integer|string (0=Nein, 1=Ja, X=keine Antwort)",
    individuellePraezisierungen: "string"
  },
  R_Entlassungsaussichten: {
    pflegezielErreicht90T: "integer (0=Nein, 1=Ja)",
    aenderungSelbstaendigkeit90T: "integer (0=Verbessert, 1=Keine Änderung, 2=Verschlechtert)",
    individuellePraezisierungen: "string"
  },
  S_AssessmentInformationen: {
    datumAssessment: "string (date in format JJJJ-MM-TT)",
    evaluatorIn: "string",
    datumAbschluss: "string (date in format JJJJ-MM-TT)",
    abschliessendePerson: "string"
  },
  aenderungsprotokoll: "string"
}