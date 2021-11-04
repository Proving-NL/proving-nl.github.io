

# Opnemen bestelling

    - Gebruiker: Inkoop (JP), Magazijn

    1. Pak tablet
    1. Start: [abis inkooporder](https://proving-nl.aliconnect.nl/abis/inkooporder)
        - er wordt een overzicht van alle leveranciers getoond
    1. Klik op leverancier
        - er komt een lijst met alle artikelen. `Bestelaantal` staat ingesteld op aantal nog te bestellen.
    1. De artikelen staan op loopvolgorde door het magazijn, waarbij de minimale voorraad aangegeven staat.
    1. Invoeren bestelaantal
        1. Controlleer **aanwezige voorraad**, pas deze aan in de lijst (indien nodig)
        1. (Bestelaantal: Invoeren aantal te bestellen)
        1. Herhaal deze stap voor alle producten
    1. Herhaal deze stap voor alle leveranciers

# Verwerken inkoop order

    - Gebruiker: Inkoop (JP)

    1. Start: Google Chrome op PC
    1. Start: [abis inkooporder](https://proving-nl.aliconnect.nl/abis/inkooporder)
        - er wordt een overzicht van alle leveranciers getoond
    1. Selecteer leverancier
    1. Inkoop per leverancier
        1. Doe bestel advies (optie software, deze bepaald a.d.h. van min.voorraad, bestel aantal, de te bestellen aantallen)
        1. Voor alle artikelen
            1. Controleer aantallen op zaken als: voorraad, minimale bestelaantal, voordelen, franco, stafel korting enz.
            1. Bestelaantal: Controleren/Invoeren aantal te bestellen
        1. **Bestelling verzenden**
            - Er wordt een nieuw nummer uitgetrokken (referentie)
            - Er wordt een inkoop order aangemaakt met regels met aantal te bestellen (dit aantal wordt gereset naar 0 in de artikel lijst)
            - De order wordt automatisch geprint in het magazijn (afhandeling magazijn)
            - AFhandeling order zie leverancier

# Afhandeling orders na opdracht verzenden

- Airo
    1. Maak excel sheet: aantal, bestelcode, omschrijving
    1. Upload sheet naar web server
        1. Stuur email + bijlage naar `leverancier.airo.inkoopEmailAddress`
- Metalak
    1. Open: [Metalak bestellen](Metalak bestellen)
    1. [inloggen]
    1. inlognaam: `leverancier.metalak.accountname`
    1. wachtwoord: `leverancier.metalak.password`
    1. [Mijn account] (boven in scherm)
    1. [bestelling]
    1. Hier kan je zien wat er reeds in bestelling staat. Streep deze artikelen weg op je bestellijst zodat het niet dubbel besteld wordt.
    1. [home]
    1. Voeg artikel toe aan mandje
        1. Tik in de balk [zoek] het eerste artikelnummer dat je wil bestellen en toets [enter] / [zoek]
            - Aan de kleur van de bolletjes kan je de status van het artikel zien
                - Groen: in voorraad
                - Oranje:	in bestelling
                - Rood: moet speciaal besteld worden (minimaal week levertijd)
            - Is het artikel dat je wil bestellen voor de voorraad en zijn de bolletjes oranje gewoon op bestellen klikken. Dan komen ze vanzelf binnen zodra ze weer voorradig zijn bij Metalak.
            - Is het artikel dat je wil bestellen voor een klant en zijn de bolletjes oranje of rood, stuur dan een mail naar `leverancier.airo.inkoopEmailAddress` en vraag naar de verwachte levertijd zodat je de klant kan informeren.
            - Als je het artikel wil bestellen klik op [bestellen]. Het artikel komt dan in de winkelwagen terecht.
        1. Herhaal voor alle artikelen
    1. klik op [winkelwagen] (rechts boven)
    1. Controleer of artikelen en aantallen kloppen
    1. Klik op [verder] (rechts onder). Je krijgt nu het scherm met onze klantgegevens
    1. klik op [verder]
    1. referentie: `referentie` of `datum van vandaag`
    1. opmerking: `graag morgen op de route meezenden`
    1. Klik voor akkoord leveringsvoorwaarden
    1. Klik op [bestellen]
    1. Heb je nog artikelen die niet op de site staan mail deze dan naar `leverancier.airo.inkoopEmailAddress`
- Baten
    1. Maak excel sheet: aantal, bestelcode, omschrijving
    1. Upload sheet naar web server
        1. Stuur email + bijlage naar `leverancier.baten.inkoopEmailaddress`
- CAP
    1. Maak excel sheet: aantal, bestelcode, omschrijving
    1. Upload sheet naar web server
        1. Stuur email + bijlage naar `leverancier.CAP.inkoopEmailaddress`
- Carlogic
    1. Maak excel sheet: aantal, bestelcode, omschrijving
    1. Upload sheet naar web server
        1. Stuur email + bijlage naar `leverancier.Carlogic.inkoopEmailaddress`
- Chemicar
    1. Maak excel sheet: aantal, bestelcode, omschrijving
    1. Upload sheet naar web server
        1. Stuur email + bijlage naar `leverancier.Chemicar.inkoopEmailaddress`
- EMM
    1. Open: [EMM bestellen](EMM bestellen)
    1. [inloggen]
    1. inlognaam: `leverancier.EMM.accountname`
    1. wachtwoord: `leverancier.EMM.password`
    1. Tik in het balkje [zoeken] het eerste artikelnummer
    1.	Klik op het juiste artikel
    1. Voer het te bestellen aantal in
    1.	Klik op “voeg toe aan winkelwagen”
    1.	Klik op “doorgaan met bestellen”
    1.	Herhaal dit tot alle artikelen zijn ingevoerd
    1. 	Klik op “bestellen”
    1.	Ga akkoord met verkoopvoorwaarden
    1.	Klik op bestellen
    1. Zijn er nog artikelen die je niet kan vinden op de site stuur dan een mail naar: `leverancier.EMM.inkoopEmailaddress`
- Endstra
    1. Maak excel sheet: aantal, bestelcode, omschrijving
    1. Upload sheet naar web server
        1. Stuur email + bijlage naar `leverancier.Endstra.inkoopEmailaddress`
- Gerko
    1. Maak excel sheet: aantal, bestelcode, omschrijving
    1. Upload sheet naar web server
    1. Stuur email + bijlage naar `leverancier.Gerko.inkoopEmailaddress`
- Hodij
    1. Open een tabblad in Google Chrome
    1. Klik in de taakbalk op Hodij
    1. E-mail adres en wachtwoord staan reeds ingevuld:
          `leverancier.Hodij.accountname`
          `leverancier.Hodij.password`
    1. Klik op inloggen
    1. Tik bij het vergrootglas het artikel of een gedeelte ervan in
    1. Tik bij het juiste artikel het aantal in
    1. Tik bij het vergrootglas het volgende artikel in
    1. Als alle artikelen zijn ingevoerd klik dan op “bestellen” en vervolgens op “uw bestelling”
    1. Klik na controle op “bestelling afronden”
    1. Vul eventueel een referentie in (datum of klantnaam)
    1. Heb je nog vragen dan kan je die intikken bij opmerkingen.
    1. Vink de algemene voorwaarden aan
    1. Klik op “plaats order”
    1. In de mail ontvang je onmiddellijk een orderbevestiging
- JB Coatings
    1. Maak excel sheet: aantal, bestelcode, omschrijving
    1. Upload sheet naar web server
        1. Stuur email + bijlage naar `leverancier.JB-Coatings.inkoopEmailaddress`
- JBC
    1. Maak excel sheet: aantal, bestelcode, omschrijving
    1. Upload sheet naar web server
        1. Stuur email + bijlage naar `leverancier.JBC.inkoopEmailaddress`
- Majestic
    1. Maak excel sheet: aantal, bestelcode, omschrijving
    1. Upload sheet naar web server
        1. Stuur email + bijlage naar `leverancier.Majestic.inkoopEmailaddress`
- MH Tools
    1. Maak excel sheet: aantal, bestelcode, omschrijving
    1. Upload sheet naar web server
        1. Stuur email + bijlage naar `leverancier.MHTools.inkoopEmailaddress`
- MTS
    1. Maak excel sheet: aantal, bestelcode, omschrijving
    1. Upload sheet naar web server
        1. Stuur email + bijlage naar `leverancier.MTS.inkoopEmailaddress`
- Myto
    1. Maak excel sheet: aantal, bestelcode, omschrijving
    1. Upload sheet naar web server
        1. Stuur email + bijlage naar `leverancier.Myto.inkoopEmailaddress`
- Paint Supplies
    1. Maak excel sheet: aantal, bestelcode, omschrijving
    1. Upload sheet naar web server
        1. Stuur email + bijlage naar `leverancier.Paint-Supplies.inkoopEmailaddress`
- PPG
    1. Open een nieuw tabblad in Google Chrome
    1. Klik in de favorieten balk op “PPG Bestellen”
    1. Vul in bij username: `leverancier.PPG.accountname`
    1. Wachtwoord staat al ingevuld `leverancier.PPG.password`
    1. Klik op [submit]
    1. Klik op [upload order excel file]
    1. Klik op [bestand kiezen]
    1. Dubbelklik op het opgeslagen bestand
    1. Klik op “upload”
    1. Je krijgt nu een overzicht van de artikelen die je wil bestellen.
    1. Controleer of de aantallen die je wil bestellen voldoen aan de verpakkingseenheid en pas ze eventueel aan. Je moet namelijk altijd per doos bestellen.
    1. Het kan ook voorkomen dat je bij een artikel een blauw vak ziet.
    1. Dan klopt het artikelnummer niet, is de verpakkingseenheid veranderd of is het artikel uit het assortiment.
    1. Pas het   artikelnummer aan of klik in het vakje voor het artikelnummer waarmee je deze bestelregel verwijderd.
    1. Klik op [checkout]
    1. Klik op [submit order]
    1. Zodra op het scherm “Order Confirmation” verschijnt is de order geplaatst en kan je de site verlaten.
    1. Heb je nog artikelen die je op deze manier niet hebt kunnen bestellen stuur dan een mail naar `leverancier.PPG.inkoopEmailaddress`
- Rhiwa
    1. Maak excel sheet: aantal, bestelcode, omschrijving
    1. Upload sheet naar web server
        1. Stuur email + bijlage naar `leverancier.Rhiwa.inkoopEmailaddress`
- Smirdex
    1. Maak excel sheet: aantal, bestelcode, omschrijving
    1. Upload sheet naar web server
        1. Stuur email + bijlage naar `leverancier.Smirdex.inkoopEmailaddress`
- System 123
    1. Maak excel sheet: aantal, bestelcode, omschrijving
    1. Upload sheet naar web server
        1. Stuur email + bijlage naar `leverancier.System-123.inkoopEmailaddress`
- Wiltec
    1. Maak excel sheet: aantal, bestelcode, omschrijving
    1. Upload sheet naar web server
        1. Stuur email + bijlage naar `leverancier.Wiltec.inkoopEmailaddress`
- WSB
    1. Maak excel sheet: aantal, bestelcode, omschrijving
    1. Upload sheet naar web server
        1. Stuur email + bijlage naar `leverancier.WSB.inkoopEmailaddress`
