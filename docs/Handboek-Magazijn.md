# Verkooporder Aanmaken
    - Wie: Verkoop binnendienst: John-Paul

    1. Opstarten ABIS PC
    1. Maak order (weet JP)
        1. levering: Datum van levering (standaard zelfde dataum als aanmaken order)
        1. route: _Wijze van levering_. Opties: 0=Niet ingevuld, 1=Post, 2=Visser, 3=Route, 4=Afhalen, 5=Brengen(geen route)
        1. volgnr: _Wijze van inkoop_: 1=Telefonisch, 2=Whatsapp, 3=Email-order, 4=Email-tekst, 5=Balie.
            - Email-order: dit is een mail met een bestellijst waar heel duidelijk onze artikelnummers en producten opstaan.
            - Email-tekst: Dit zijn getypte bestellingen met minder complete informatie.
            - Doel hiervan is dat we bij Emailorders het gevoel hebben, dat deze klanten meer open staan om te gaan bestellen via een Webportaal. deze klanten zullen hier dus ook als eerste voor benaderd worden. JP maakt een overzicht van ongeveer 5 klanten waar we dit Portaal als eerste zouden kunnen aanbieden als test.
        1. referentie: Klant referentie welke wordt opgegeven bij bestellen
        1. besteld: datum van bestelling
        1. user: _Naam Gebruiker_, is standaard ingevuld naam gebruiker, aanpassen naar _accountmanager_ als deze opdracht voor order geeft. Opties: EA=Erik v Asselt, EJ=Eric Joosten, AK=Arno vd Kant, FI=Frits v Ingen, BR=Broersen, BA=Balie verkoop
        1. factuur: faktuur nummer
        1. opmerking: Opmerking die geplaats wordt op pakbon 2 voor intern gebruik
        1. aanbieding: de order is een concept voorstel (offert) voor klant, geen opdracht
        1. verwerkt: Meld order gereed (dit is gelijk aan akkoord bestellen op website)
            - Order wordt geprint in magazijn
                - "Aliconnect Server Service" die controleeerd dit vinkje, zo ja maak print opdracht (pakbon) voor printer magazijn
            - Op de PC in magazijn draait de "Client Service Aliconnector" (zwart balk rechts, witte bolletje taakbalk).
                - deze check print opdrachten en print deze af indien aanwezig.

# Kleur maken

    1. Kleur maak artikel `KM.nnnn` op bon (gereed) opnemen in kleurmaak lijst.
    1. Kleur maak artikel, aparte bon. (komt direct uit printer bij pakbon). Ook op paklijst, locatie kleur mengerij
    1. Deze gaat mee binnen de kleurmakerij.
    1. kleur gereed, bon afscannen, kleur gereed

# Verkooporder ligt in printer
    1. [ ] op scherm zichtbaar aantal nieuwe orders
    1. Kijk of er bonnen in de printer ligt.
    1. Handel bonnen af die direct gepakt moeten worden (balie verkoop)

## Visser
    Visser komt ca 16:30, dus 15:00
    1. Print **paklijst Visser** (route=2, datum <= **volgende** dag)
    1. Pakken paklijst (meerder bonnen tegelijk)
        1. Einde ronde, verdeel(leg bij elkaar) gepakte producten over de juiste bonnen.
        1. Herhaal tot alles gepakt is
    1. Loop alle orders af
        1. Verpak order (mmaak 1 cmplete order in doos of bak)
        1. Laatste controle
        1. Corrigeer fouten in ABIS
        1. Scan (QR) bon als gepakt => bonen wordt  `afgemeld` > `verzonden` > `"voorraad afboeken"`, zie dashbord magazijn
    1. Draai **Zendlijst voor Visser**, inclusief aantal chemische middelen enz (voorbeeld van Jordi)
    1. Invoeren dashbord Visser
    1. Meegeven aan Visser

## Post
    Post einde dag
    1. Print **paklijst Post** (route=1, datum <= **volgende** dag)
    1. Pakken paklijst (meerder bonnen tegelijk)
        1. Einde ronde, verdeel(leg bij elkaar) gepakte producten over de juiste bonnen.
        1. Herhaal tot alles gepakt is
    1. Loop alle orders af
        1. Verpak order (mmaak 1 cmplete order in doos of bak)
        1. Laatste controle
        1. Corrigeer fouten in ABIS
        1. Scan (QR) bon als gepakt => bonen wordt `afgemeld` > `verzonden` > `"voorraad afboeken"`, zie dashbord magazijn
    1. Meegeven naar Post

## Route
    In de ochtend (start dag)
    1. Print **paklijst Route** (route=3, datum <= **print** dag)
    1. Pakken paklijst (meerder bonnen tegelijk)
        1. Einde ronde, verdeel(leg bij elkaar) gepakte producten over de juiste bonnen.
        1. Herhaal tot alles gepakt is
    1. Loop alle orders af
        1. Verpak order (mmaak 1 cmplete order in doos of bak)
        1. Laatste controle
        1. Corrigeer fouten in ABIS
        1. Scan (QR) bon als gepakt => bonen wordt  `afgemeld` > `verzonden` > `"voorraad afboeken"`, zie dashbord magazijn
    1. Print **Transportlijst + route**
    1. Mee met transport
    1. Transport uitvoeren

# Hand Factureren
    1. In ABIS bon factureren
    1. Factuur wordt geprint of verstuurd

# Verzamel Factureren
    1. Alles factureren < 2 dagen gelden `verzonden` (dus nog 2 dagen de tijd om correcties door te voeren)
    1. Dit zijn verzamel facturen
    1. Alle facturen worden geprint of digitaal verstuurd
    1. Geprinte facturen in bakje `Facturen te versturen`
    1. Geprinte facturen vouwen, in envelop en klaar leggen voor post (vul werk als iemand tijd heeft)
    1. facturen in envelop meenemen naar post

# Administratie
    1. Mieke maakt export van ABIS en import naar AFAS
    1. Mieke dashboard fakturen betaald, aangeven factuur betaald
      of
      Bank import  

# Inkooporder Geprint
    1. Pak order uit printer en stop deze in bak _Inkoop orders_

# Inkooporder Ontvangst

    Wie: magazijn

    1. Haal bijbehorende inkoop order uit bak _Inkoop orders_
    1. Controleer Bon
    1. Plaats goederen in juiste magazijn lokatie
    1. Niet inkoopbon en leverbon aan elkaar
    1. Indien levering NIET akkoord (incompleet, beschadigd, onbekende levering)
        1. Direct afgeven bon bij afdeling inkoop (John-Paul)
    1. Indien levering akkoord
        1. Plaats inkoop bon + leverbon in bak  _Inkoop orders ontvangen_
    1. Klaar

# Inkooporder Ontvangst NIET akkoord verwerken

    Wie: inkoop (JP)

    1. Bepaal wat is missgegeaan, los probleem op
    1. Corrigeer inkoop order in map `Proving - Documenten\Inkoop\Inkooporders` (indien nodig)
    1. Plaats inkoop bon + leverbon in bak  _Inkoop orders ontvangen_

# Inkooporder Ontvangst verwerken

    Wie: operation verantwoordelijke (Jordie)

    1. Haal bonnen uit bak  _Inkoop orders ontvangen_
    1. Zoek order op in map `Proving - Documenten\Inkoop\Inkooporders`
    1. Sleep order in ABIS Web (nog te bouwen door max, komt later)
    1. Controleer order nogmaals (eigen inzicht)
    1. Stop order in map _Inkoop orders_ kantoor administratie
    1. Klaar
