export interface InterRAIInput {
  A_AdministrativeDaten?: {
    name?: string,
    vorname?: string,
    geschlecht?: string,
    geburtsdatum?: string,
    zivilstand?: string,
    nummern?: {
      versichertenNummer?: string,
      interneFallnummer?: string
    },
    wohnort?: string,
    versicherungen?: {
      grundversicherung?: string,
      zusatzversicherung?: string,
      invalidenUnfallMilitar?: string
    },
    beurteilungsgrund?: string,
    beginnBedarfsabklaerung?: string,
    zielePerson?: string,
    wohnsituation?: string,
    formZusammenleben?: {
      form?: string,
      neuZusammengezogen?: string,
      wunschAndersLeben?: string
    },
    letzterSpitalaufenthalt?: string,
    individuellePraezisierungen?: string
  },
  B_AufnahmeVorgeschichte?: {
    datumEroeffnungDossier?: string,
    staatsangehoerigkeit?: string,
    staatsangehoerigkeitAndere?: string,
    sprache?: string,
    uebersetzerNotwendig?: string,
    wohnVorgeschichte5Jahre?: {
      altersPflegeheim?: string,
      begleitetesBetreutesWohnen?: string,
      psychiatrischeEinrichtung?: string,
      psychiatrischeKlinik?: string,
      einrichtungGeistigeBehinderung?: string
    },
    individuellePraezisierungen?: string
  },
  C_KognitiveFaehigkeiten?: {
    entscheidungsfaehigkeit?: string,
    gedaechtnis?: {
      kurzzeit?: string,
      handlung?: string,
      situativ?: string
    },
    schwankungenBewusstsein?: {
      leichtAblenkbar?: string,
      episodenUnzusammenhaengend?: string,
      tagesschwankungen?: string
    },
    akuteAenderungKognition?: string,
    aenderungEntscheidungsfaehigkeit90T?: string,
    individuellePraezisierungen?: string
  },
  D_KommunikationSehen?: {
    sichVerstaendlichMachen?: string,
    andereVerstehen?: string,
    hoeren?: string,
    sehen?: string,
    individuellePraezisierungen?: string
  },
  E_StimmungVerhalten?: {
    depressiveAnzeichen?: {
      negativeAeusserungen?: string,
      anhaltenderAerger?: string,
      unrealistischeAengste?: string,
      sorgeGesundheit?: string,
      wiederholteAengstlicheBeschwerden?: string,
      traurigeMimik?: string,
      weinerlich?: string,
      wiederkehrendeAeusserungenSchreckliches?: string,
      rueckzugAktivitaeten?: string,
      verminderteSozialeInteraktion?: string,
      mangelndeLebensfreude?: string
    },
    selbstdeklariertStimmung?: {
      wenigInteresse?: string,
      aengstlich?: string,
      traurig?: string
    },
    verhaltensauffaelligkeiten?: {
      umherirren?: string,
      verbaleAggressivitaet?: string,
      koerperlAggressivitaet?: string,
      storendesVerhalten?: string,
      unangemessenesVerhalten?: string,
      widersetztBehandlung?: string
    },
    individuellePraezisierungen?: string
  },
  F_PsychosocialesWohlbefinden?: {
    sozialeBeziehungen?: {
      teilnahmeSozialeAktivitaeten?: string,
      besucheBekannteFamilie?: string,
      andereKontakte?: string,
      konfliktFamilieFreunde?: string,
      furchtVorFamilie?: string,
      vernachlaessigtMisshandelt?: string
    },
    einsamkeit?: string,
    aenderungSozialeAktivitaeten90T?: string,
    dauerAlleinseins?: string,
    belastendeEreignisse90T?: string,
    individuellePraezisierungen?: string
  },
  G_KoerperlicheFunktionen?: {
    IADL?: {
      mahlzeitenZubereitung?: {
        effektiv?: string,
        vermutet?: string
      },
      hausarbeit?: {
        effektiv?: string,
        vermutet?: string
      },
      geldVerwalten?: {
        effektiv?: string,
        vermutet?: string
      },
      medikamenteHandhaben?: {
        effektiv?: string,
        vermutet?: string
      },
      telefonieren?: {
        effektiv?: string,
        vermutet?: string
      },
      treppenBenutzen?: {
        effektiv?: string,
        vermutet?: string
      },
      einkaufen?: {
        effektiv?: string,
        vermutet?: string
      },
      verkehrsmittelNutzen?: {
        effektiv?: string,
        vermutet?: string
      }
    },
    BADL?: {
      badDusche?: string,
      persoenlicheHygiene?: string,
      oberkoeperAnziehen?: string,
      unterkoeperAnziehen?: string,
      gehen?: string,
      fortbewegungGleicheEtage?: string,
      transferToilette?: string,
      toilettenBenutzung?: string,
      mobilitaetImBett?: string,
      essenTrinken?: string
    },
    fortbewegung?: {
      innenraum?: string,
      gehDistanz3T?: string,
      rollstuhlDistanz3T?: string
    },
    ausdauer?: {
      stundenAktivitaet3T?: string,
      aussenaufenthalte3T?: string
    },
    rehabilitationsPotential?: {
      personGlaubt?: string,
      fachleuteGlauben?: string
    },
    aenderungBADL90T?: string,
    autoFahren90T?: string,
    individuellePraezisierungen?: string
  },
  H_Kontinenz?: {
    blasenkontinenz?: string,
    hilfsmittelUrin?: string,
    darmkontinenz?: string,
    inkontinenzeinlagen?: string,
    individuellePraezisierungen?: string
  },
  I_MedizinischeDiagnosen?: {
    schriftlicheDiagnosenBekannt?: string,
    diagnosen?: {
      muskuloskeletal?: {
        hueftfraktur30T?: string,
        andereFrakturen?: string
      },
      neurologisch?: {
        alzheimer?: string,
        andereDemenz?: string,
        hemiplegie?: string,
        multipleSklerose?: string,
        paraplegie?: string,
        parkinson?: string,
        tetraplegie?: string,
        CVI?: string
      },
      herzLunge?: {
        KHK?: string,
        COPD?: string,
        herzinsuffizienz?: string
      },
      psychiatrisch?: {
        angststoerungen?: string,
        bipolar?: string,
        depression?: string,
        schizophrenie?: string
      },
      infektionen?: {
        pneumonie?: string,
        harnwegsinfektion30T?: string
      },
      andere?: {
        krebserkrankung?: string,
        diabetesMellitus?: string
      },
      weitereDiagnosen?: [
        {
          bezeichnung?: string,
          code?: string
        }
      ]
    },
    individuellePraezisierungen?: string
  },
  J_Gesundheitszustand?: {
    stuerze?: {
      anzahl?: string,
      letzten30T?: string,
      vor31bis90T?: string,
      vor91bis180T?: string,
      aktuell3T?: string
    },
    gesundheitsproblemeHaeufigkeit3T?: string,
    gleichgewichtProbleme?: {
      nichtAufstehen?: string,
      nichtUmdrehen?: string,
      schwindel?: string,
      unsichererGang?: string
    },
    herzLunge?: {
      brustschmerz?: string,
      atemwegssekreteAbhusten?: string
    },
    psychiatrischeSymptome?: {
      formaleDenksstoerung?: string,
      wahnvorstellungen?: string,
      halluzinationen?: string
    },
    neurologisch?: {
      aphasie?: string
    },
    magenDarm?: {
      sauresAufstossen?: string,
      verstopfung?: string,
      durchfall?: string,
      erbrechen?: string
    },
    schlafprobleme?: {
      einDurchschlaf?: string,
      zuvielSchlaf?: string
    },
    andere?: {
      aspiration?: string,
      fieber?: string,
      hygiene?: string,
      periphereOedeme?: string
    },
    dyspnoe?: string,
    fatigue?: string,
    schmerzen?: {
      haeufigkeit?: string,
      intensitaet?: string,
      episoden?: string,
      schmerzdurchbruch?: string,
      schmerzkontrolle?: string
    },
    instabilerKrankheitszustand?: {
      gesamt?: string,
      destabilisiertKognitionBadlIadlStimmung?: string,
      akuteExazerbation?: string,
      terminalerZustand?: string
    },
    selbstbeurteilungGesundheit?: string,
    tabakAlkohol?: {
      rauchTaeglich?: string,
      alkohol14T?: string
    },
    individuellePraezisierungen?: string
  },
  K_MundErnaehrungsstatus?: {
    groesseCm?: string,
    gewichtKg?: string,
    ernaehrungsprobleme?: {
      vorhanden?: string,
      gewichtsverlust?: string,
      dehydration?: string,
      fluessigkeitZuWenig?: string,
      fluessigkeitsverlustUebersteigt?: string
    },
    ernaehrungsform?: string,
    mundZahnstatus?: {
      vorhanden?: string,
      zahnprothese?: string,
      schlechtZaehne?: string,
      mundtrockenheit?: string,
      kauprobleme?: string
    },
    individuellePraezisierungen?: string
  },
  L_Haut?: {
    dekubitusSchweregrad?: string,
    fruehererDekubitus?: string,
    andereUlcera?: string,
    hautverletzungen?: string,
    hautrisseSchnittwunden?: string,
    andereHautprobleme?: string,
    fussprobleme?: string,
    individuellePraezisierungen?: string
  },
  M_Medikamente?: {
    totalAnzahlMedikamente?: string,
    medikamentenliste?: string,
    medikamentenallergien?: string,
    zuverlaessigkeitEinnahme?: string,
    individuellePraezisierungen?: string
  },
  N_Behandlungen?: {
    behandlungen?: {
      chemotherapie?: string,
      dialyse?: string,
      infektionskontrolle?: string,
      intravenoesMedikament?: string,
      sauerstoff?: string,
      bestrahlung?: string,
      absaugenAtemwege?: string,
      tracheostomiePflege?: string,
      transfusion?: string,
      beatmung?: string,
      wundbehandlung?: string,
      blasentraining?: string,
      palliativpflege?: string,
      umlagerung?: string
    },
    formalHilfsnetz?: {
      faGeFaBe?: string,
      pflegefachperson?: string,
      haushilfe?: string,
      mahlzeitendienst?: string,
      physiotherapie?: string,
      ergotherapie?: string,
      logopaedie?: string,
      psychotherapie?: string,
      sozialarbeit?: string,
      andereFachkraefte?: string
    },
    spitalNotfallArzt90T?: {
      stationaereHospitalisation?: string,
      notfallKonsultation?: string,
      arztbesuche?: string
    },
    koerperlicheFixierung?: string,
    individuellePraezisierungen?: string
  },
  O_Verfuegungen?: {
    begleitVertretungsBeistand?: string,
    patientenverfuegung?: string,
    individuellePraezisierungen?: string
  },
  P_InformelleUnterstuetzung?: {
    informelleHelferVorhanden?: string,
    anzahlHelfer?: string,
    situationHilfspersonen?: {
      nichtMehrInDerLage?: string,
      belastetWuetendDeprimiert?: string,
      ueberfordertMitKrankheit?: string
    },
    informelleBetreuungsstunden3T?: string,
    starkeUnterstuetzendeBeziehung?: string,
    individuellePraezisierungen?: string
  },
  Q_Wohnumgebung?: {
    wohnumgebungRisiken?: {
      vorhanden?: string,
      baufaelligZustand?: string,
      vernachlaessigtZustand?: string,
      ungenuegendesHeizen?: string,
      sicherheitsrisiken?: string,
      eingeschraenkterZugang?: string
    },
    behindertengerechteWohnung?: string,
    wohnumfeld?: {
      notfallUnterstuetzung?: string,
      lebensmittelNahe?: string,
      hauslieferungMoeglich?: string
    },
    finanzielleEinschraenkungen?: string,
    individuellePraezisierungen?: string
  },
  R_Entlassungsaussichten?: {
    pflegezielErreicht90T?: string,
    aenderungSelbstaendigkeit90T?: string,
    individuellePraezisierungen?: string
  },
  S_AssessmentInformationen?: {
    datumAssessment?: string,
    evaluatorIn?: string,
    datumAbschluss?: string,
    abschliessendePerson?: string
  },
  aenderungsprotokoll?: string
}