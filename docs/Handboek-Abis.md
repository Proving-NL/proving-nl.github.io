# Verkoop prijs berekening

## ABIS

- **bruto** `InkBruto`: PackPrice, Catalogprijs, Adviesprijs, ListPrice, Verkoopprijs opgegeven door leverancier
- **kort**. `InkKorting`: Discount, Korting die Proving krijgt bij de leverancier op dit inkoop product / verpakking

- netto `InkNetto`: Volgt uit InkBruto - Korting (niet invoeren)

- verkoop `Bruto`: Vervalt
- marge `marge`: Vervalt


1. Als alleen netto inkoop prijs bekend, dan bruto invoeren en korting 0


## Afspraen

- Varianten
    - Advies verkoop prijs ligt vast of door ons te bepalen
        - Vaste verkoopprijs
            - korting deel van korting leverancier
        - Geen verkoopprijs
            - Verkoop * 1.6, korting
    - Klein / Groot verpakking
        - Klein

    - Grote afnemers versus kleine afnemers






1. Bij InkKorting dan `Verkoop korting` = InkoopKorting * 0.6. Dus klant krijgt 40% van de inkoop korting.
    1. Voorbeeld
        - Adviesprijs € 100,00
        - ink korting = 60%
        - inkoop = € 40,00
        - verkoop korting = 40% * 60% = 24%
        - verkoop = € 76,00
        - Marge = 90%
    1. Voorbeeld
        - Adviesprijs € 100,00
        - ink korting = 20%
        - inkoop = € 80,00
        - verkoop korting = 40% * 20% = 8%
        - verkoop = € 92,00
        - Marge = 15%
2. Geen inkoop korting dus netto inkoop bekend. Dan inkoop * 1.6. Vervolgens 18% korting.
    1. Voorbeeld
        - Inkoop € 100,00
        - Adviesprijs € 160,00
        - (ink korting = 37,5%)
        - verkoop korting = 18%
        -
        - verkoop = € 131,20
        - Marge = 31,2%


1. Groothandel (Airo)
1. Detailhandel (Airo)
1. Consument (Proving/Balie)


1. Alleen meer korting bij meer verpakking
1. Goothandel korting afhankelijk van inkoop van groothandel van meer verpakking (grote hoeveelheden)

1. Detailhandel/eindgebruiker, kosten bereken voor kleine orders c.q. Korting bij meer afname.


- unipol 2K plamuur ZB
    - 12 stuks
    - inkoop 146,50
    - marge 70%
    - Consument/detailhandel geeft hij 20%-25%
    - Groothandel geeft hij 40%-45%
    - 12-st > 40% korting
    - 1-st > 20% korting


- Alles enkel stuks inkoop > enkel stuks verkoop => 20% korting bij 60% inko kortinmg
- Alleen meerverpakkingen => 40% korting. bij 60% inko korting

- Bij verkoop meerverpakking, 67% van inkoop korting kado aan klant
- Bij verkoop enkel stuks verpakking, 33% van inkoop korting kado aan klant

- Grote firmas, bonus korting iedne jaar bij afname > 30.000 of 50.000 of bv > 10.000 (5%)
- dit is onderscheid consument, detailhandel



1. Meerverpakking is goedkoper. Voorbeeld handschoentjes.  


1. Bij InkKorting dan `Verkoop korting` = InkoopKorting * 0.6. Dus klant krijgt 40% van de inkoop korting



# ABIS/Mappen/Klanten

- Klant ID `KlantID`
- Firma `Firma`
- Tel `Telefoon`
- Mobiel `Mobiel`
- Fax `Fax`
- Omschrijving `Omschrijving`
- Leverdag `leverdag`
- RouteNr `routenr`
- VolgNr  `volgnr`
- Opmerking `opmerking`
- Afleveradres Aanhef `Aanhef`
- Afleveradres extra `Extra 1`
- Afleveradres Straat `Straat`
- Afleveradres postcode `Postcode`
- Afleveradres Plaats `Plaats`
- Factuuradres Aanhef `Aanhef 2`
- Factuuradres extra  `Extra 2`
- Factuuradres Straat `Straat 2`
- Factuuradres postcode Plaats `Plaats 2`
- Deb. nr. `DebNr`
- Vracht kosten `VrachtKosten`
- btw `btw`
- nummer `btwnummer`
- regio `regio`
- bedrijf `bedrijf`
- tekenbon `tekenbon`
- openstaand `openstaand`

# Pakbonnen

- bonnr `PakBonId`
- klant `KlantID`
- Referentie `UwRef`
- Opmerking `Opmerking`
- levering `Datum` _verzend datum_ Datum waarop de order gepakt moet worden
- route `Route` _Wijze van Levering_ 0=Default | 1=Post | 2=Visser | 3=Route | 4=Afgehaald
- volgnr `VolgNr` _Wijze van bestellen_ 1=Telefonisch | 2=WhatsApp | 3=Email Order | 4=Email | 5=Balieverkoop
- besteld `DatumBesteld`: _order datum_ Datum waarop order is opgegeven door de klant
- user `User`: _clientmanager_ EA=Erik v Asselt | EJ=Eric Joosten | AK=Arno vd Kant | FI=Frits v Ingen | BR=Jordy Broersen | PR=Balie Verkoop
- faktuur `FaktuurNr`:
- aanbieding `Aanbieding`: Order is aanbeding en wordt niet meegnomen in de leveringen
- verwerkt `Verwerkt`: Order is akkoord voor levering
- verkoop `nettoverk`
- inkoop `nettoink`
- opbrengst `opbrengst`
- `id`
- `ModifiedBy`

# Regels

- `Aantal`
- `ArtNr`
- `Eenheid`
- `Omschrijving`
- `Bruto`
- `Korting`
- `Netto`
- `Aanbieding`
- `inknetto`
- `PakBonID`
- `FaktuurNr`
- `changed`

# Producten

# ABIS Web>Shop>Producten

## Pack / Verpakking artikel

- Id `id`: Artikel nummer
- productType:
- Titel: gegenereerd titel
- Code: unieke code binen het systeem
- Eenheid: Verpakkingseenheid van het artikel (stuk | doos | zak | fles | ...)
- Inhoud: hevoeelheid / aantal inhoud
- Inhoud eenheid: eenheid van het aantal (stuks | liter | flessen | schijven | ...)
- Verzending: Wordt gegenereerd (0-1 dag=voorraad artikel | 1-4 dagen=geen voorraad artikel)

## Part / Product
- Merk:
- Code: Code welke wordt gehanteerd door fabrikant om het product uniek te identificeren
- Eenheid: Verpakkingseenheid van het product (fles | pak | doosje | ...)
- Inhoud: _nummer_ Hoeveelheid inhoud van de product verpakking
- Inhoud eenheid: Eenheid van de inhoud (liter | kg | stuks | schijven | ...)

## Inkoop / Inkoop artikel
Gegevens over het artikel wat is opgegevens als voorkeurs inkoop artikel voor het product.
- Leverancier:
- Bestelcode: Unieke code/ artikelnummer van de leverancier om het artikel te bestellen
- Eenheid: Verpakkingseenheid (doos | stuk | fles | omdoos | ...)
- Inhoud: hoeveelheid / aantal inhoud
- Inhoud eenheid: eenheid van het aantal (stuks | liter | flessen | schijven | ...)
- Verpakking prijs / `packPrice`: Standaard artikel prijs van het bestel artikel
- Stuks prijs / `partPrice`: Kostprijs per product in de verpakking (Verpakking prijs / Inhoud aantal)
- Korting `discount` [%]: Korting in procenten welke de leverancier geeft aan ons
- Korting code `discountCode`: Door leverancier gehanteerd kortingscode welke een percentage vertegenwoordigd

## ABIS Artikelen Boven
Zie ABIS PC > Artikelen > Boven scherm
## ABIS Artikelen Onder
Zie ABIS PC > Artikelen > Boven scherm
## Klant artikel
- Klant code: Klant ID uit klanten
- Korting: Korting die voor deze klant voor het artikel geld
- Prijs netto: Verkoop prijs voor klant voor artikel



# ABIS > Mappen > Artikelen

Gele balk

- artnr `ArtNr`
- merk `Merk`
- code `Code`
- omschrijving `Tekst`
- inhoud `Inhoud`
- `InhoudEenheid`
- bedrijf `Bedrijf`
- artikel groep `ArtGroep`
- maglokatie `MagLokatie`
- VOC `VOC` [gr/cm]
- veiligheidsblad `Veiligehidsblad`
- technischblad `Technischblad`
- vervallen: `vervallen`
- `Voorraad`
- `Gewicht`

Onderste balk

- artikel code `ArtNr`:
- eenheid `Eenheid`
- aantal `AantalStuks`
- leverancier `Leverancier`:
- bestel code `BestelCode`:
- EAN barcode `Barcode`
- gewicht: `Gewicht`:

- bruto `InkBruto`:
- kort. `InkKorting`:
- netto `InkNetto`:
- datum (inkoop aanpassing) `d_netto`/`inkoopLastModifiedDateTime`:
- marge `marge`:
- verkoop `Bruto`:
- datum (verkoop aanpassing) `d_netto`/`verkoopLastModifiedDateTime`:

# ABIS > Mappen > Klant artikelen

- extra omschrijving: Extra tekst die wordt toegevoegfd aan de standaard artikel tekst
- aanbieding: ?
- korting: Huidige korting die klant krijgt
- prijs klant: Huidige prijs voor de klant
- marge: Huidige marge voor de klant
- kleur: Roos geeft aan artikel gegevens gewijzigd (inkoop prijs is veranderd), wat moet er met het klant artikel gebeuren
- [ korting ]: In dit geval blijft _prijs klant_ gelijk en wordt de kortinmg aangepast / ingevuld
- [ prijs klant ]: In dit geval wordt de prijs klant aangepast waarbij de marge gelijk blijft



# Config

- Config file zie `\Alicon\Proving BD - Documenten\aliconnect\proving-nl.config\yaml` > `proving-nl.config.js.yaml`
- Config upload zie `C:\Users\Max\Alicon\Proving BD - Documenten\aliconnect\proving-nl.config` > `proving-nl.config.html`

## Import Excel sheet

- `packKeyGroup`: Naam van Leverancier (bv Rhiwa)
- `packKeyName`: Artikelnummer / code van Leverancier (bv `2975600`) bestelcode welke wordt opgegeven bij inkoop
- `partKeyGroup`: Naam van Fabrikant of Merk (bv Mirka)
- `packKeyName`: Artikelnummer / code van Fabrikant  Mark (bv `OS24105001A`) code zichtbaar op website voor identificatie product
- `partUnit`: Eenheid van het inkoop product (`omdoos` | `stuk`)
- `partContentQuantity`: Inhoud van het artikel
- `packEan`/`partEan`: EAN code van het artikel (meerverpakking / doos) / Product (enkel stuks)
- `packPrice`/`partPrice`: Prijs van artikel / product
- `description`: Omschrijving van het product

## Eigenschappen product
- `grofte`: Korrel
- `prodGroup`: Product groep
