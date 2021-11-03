

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
