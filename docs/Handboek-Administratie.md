Handboek met procedures voor administratie

- Facturen die binnen komen worden door Mieke gecontroleerd met de bonnen die in map **(X)** zitten
  Facturen die binnenkomen zonder Bon: **Actie Mieke>Jordie**
- Facturen worden Betaald


# Afas

## Export

### Openstaande debiteuren

1. asjdhfakjshdflkjha
1. asjdhfakjshdflkjha
1. [Opstarten ABIS Web](Handboek-Order-afhandeling#Opstarten-ABIS-Web)

# Exporteren Facturen Abisweb>AFAS

    1. Open ABIS web applicatie (Proving bureaublad)
    1. Slecteer Facturatie > Actueel
    1. Zoek op "*"
    1. Nu heb je een overzicht van alle openstaande facturen.
    1. Vink bij Filter "Heeft Debiteur NR" hokje "0" aan
    1. Nu heb je een overzicht van alle openstaande facturen zonder debiteurnummer
    1. klik op een klant.
    1. Klik Rechts in beeld op ">4. Administratie " om dit veld te openen
    1. Vul bij het veldje "Debiteur NR" het Debiteurnummer in (vind je in AFAS)
        1. Open op PC Mieke Chrome
        1. Klik in de Bookmarkbalk op het icoontje van AFAS
        1. Voer het wachtwoord in
        1. bevestig met telefoon van Mieke
        1. klik op Accepteren
        1. klik in het Veld "Debiteur" het kopje "debiteur" aan
        1. klik op "Naam"
        1. typ de naam in van de klant die je zoekt
        1. het debiteurnummer vind je links van de naam van de klanten
    1. Doe dit voor alle klanten zonder Debiteurnummer
    1. Ververs de Pagina (F5)
    1. Vink bij Filter "Heeft Debiteur NR" hokje "1" aan
    1. Nu heb je een overzicht van alle openstaande facturen inclusief debiteurnummer
    1.



# Automatisch inboeken facturen van ABIS naar Afas

    1. Ga naar ABIS WEB
    2. Administratie > Export Facturen Airo / Proving
    a. zie Links onder [facturen-abis-….CSV]
    3. Ga naar Afas
    4. Inrichting > Import grootboek > Financiele mutatie
    5. [x] Import via bestaande definitie en/of wijzigen bestaande definitie
    6. [ Volgende ]
    7. > Profit financieel, ABIS Facturen import, Import financiele mutatie
    8. [ Volgende ]
    9. [ Volgende ]
    10. Bestandsnaam: […]
    11. Downloads > `facturen-abis-….csv`
    12. [ Open ]
    13. [ Volgende ]
    14. [ Volgende ]
    15. [ Volgende ]
    16. [ Volgende ]
    17. [ Voltooien ]
    18. Er bestaat al …
    19. [ Ja ]
    20. Importeren van bestand…
    Importeer regel 1…150
    21. Import uitgevoerd
    22. [ OK ]
    23. [ Voltooien ]

# Controleren
    1. Afas > Uitvoer > Rapport
    2. Dagboekjournaal (Profit)
    3. Dagboek vanaf: `10`
    4. Dagboek t/m: `10`
    5. Datum van: `datum laatste factuur`
    6. [ Voltooien ]
    7. Alles controleren


# Boeken Openstaande debiteuren
    1. Afas > Debiteur > Overzicht > Openstaande posten
        2. Menu boven [>] > Gegevens exporteren naar Excel
        3. Mijn bestanden > Openstaande posten debiteuren
        4. Dubbel-klik op `Openstaande posten debiteuren`, laatste datum
        5. Downloads > Airo / Proving
        6. [ Save ]
        1. Vervangen
        1. [ Yes ]
        1. [X] Verwijderen
        1. [ Ja ]
        7. [ x ] Sluiten
        8. [ x ] Sluiten
    9. Abis Web > Administratie > Afas > Import
        10. Deze pc > Downloads > Airo / Proving > Import
        1. `Openstaande posten debiteuren.xlsx`
        11. [ Openen ]


# Betalingsherinneringen

    1. Abis Web > Administratie > Facturen Actueel
    1. Zoek: `*`
    1. Filter: **Is vervallen** = `1`
    1. Filter: **Naam** = `klant naam`
    1. Lijst > Facturen > Herinneren
    1. Melding: Herinnering verstuurd
    1. [ OK ]
