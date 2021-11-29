# Product

Product: `3M 255P Hookit Goud Schuurschijven 150mm Klittenband 15 gaten - 100 stuks`

- ProductID: `1001`
- **Merk**: `3M` => merk code, b.v. merk `Colad` wordt `col`, selectie lijst
- **Code**: `51391`
- ArtNr oud: `51391`
- **ArtNr**: `3m-51391`, volgt uit merk en code
- Tekst oud: `Hookit Cubitron II schuurstr. 70MMX127MM P240`
- Tekst: `Hookit Cubitron II schuurstrook 70mm x 127mm P240` => afmetingen `70mm` bij `127mm`
- Inhoud (verpakking product): `50`
- InhoudEenheid (eenheid inhoud bv stuks/liter): `stuks`
- ArtGroep oud: `Schuur-/ Poets-/ Slijpmaterialen`
- ArtGroep: `schuurstroken` wordt selectie veld

Resulteerd in product `3M 51391 Hookit Cubitron II schuurstr. 70mm x 127mm P240 50 stuks`

# Artikel

wat wij verkopend en een klant bij ons kan bestellen

1. `3m-51391-1`, _laten we de 1 weg?_
    - Uit product volgt, productID: `1001`
        - **Merk**: `3M` => merk code, b.v. merk `Colad` wordt `col`, selectie lijst
        - **Code**: `51391`
        - **ArtNr**: `3m-51391`, volgt uit merk en code
        - Tekst: `Hookit Cubitron II schuurstrook 70mm x 127mm P240` => afmetingen `70mm` bij `127mm`
        - Inhoud: `50`
        - InhoudEnheid: `stuks`
    - ArtikelNummer: `1900001`
    - Aantal (verpakking artikel): `1`
    - Eenheid: `stuks`
    - ArtikelCode: `Merkcode` -  `Product ArtNr` - `Aantal verpakking` = `3m-51391-1` zie boven, ? 1 wel niet
    - EAN Barcode: `4046719940714`
    - Komt te vervallen
        - Leverancier: `Naam van standaard leverancier` _komt te vervallen_
        - BestelCode: `Bestelcode bij standaard leverancier` _komt te vervallen_
    - Inkoop
        - Minimale voorraad: `0`, dus artikel wordt niet opgenomen bij een bestel advies
        - Bestel hoeveelheid: `1`
    - Voorraad beheer
        - Begin voorraad: `10`
        - Begin voorraad ingevoerd: `1-6-2021`
        - Voorraad: volgt uit begin voorrraad + inkoop - verkoop vanaf datum ingevoerd
    - Verkoop
        - listprice / Catalogusprijs: Standaard verkoop prijs fabrikant
        - Verkoop korting (website): Standaard verkoop korting op website (0 of meer, geen waarde is artikel niet op website)
    - Klant verkoop
        - Klant korting: Klant specifiek korting (0 of hoger, artikel wordt opgenomen in winkelmandje)
1. `3m-51391-12`
    - Uit product volgt, ...
    - ArtikelNummer: `1900002`
    - Aantal (verpakking artikel): `12`
    - Eenheid (verpakking artikel): `doos`
    - ArtikelCode: `Merkcode` -  `Product ArtNr` - `Aantal verpakking` = `3m-51391-12` zie boven, ? 1 wel niet
    - barcode: `NIET 404...` alleen invoeren als verpakking eigen barcode heeft
    - Leverancier: _komt te vervallen_
    - BestelCode: _komt te vervallen_
    - Minimale voorraad: `2`. Dit is de voorraad waartoe minimaal wordt aangevuld als er wordt besteld
    - Bestel hoeveelheid: `1`. Dit is het aantal wat minimaal wordt besteld




# Inkoop

1. Inkoop product `1`
    - Leverancier: `Metalak` => LeverancierId: `2341324`, KlantId: `metalak` (was `Metalak B.V.`)
    - Ordercode (artikelcode/artikelnummer/..): ``
    - Eenheid (verpakking artikel): `doos`
    - ArtikelCode: `Merkcode` -  `Product ArtNr` - `Aantal verpakking` = `3m-51391-12` zie boven, ? 1 wel niet
    - barcode: `NIET 404...` alleen invoeren als verpakking eigen barcode heeft
    - Leverancier: _komt te vervallen_
    - BestelCode: _komt te vervallen_

Voorbeeld
1. Inkoop bij PaintShop.nl
    - Inkoop artikel id: `1`
    - Leverancier: `paintshop`
    - ordercode: `3M51391`
    - artcode: `3m-51391-1`
    - inkoopprijs (voor enkel stuks verpakking): `1.50`
1. Inkoop bij Metalak B.V.
    - Inkoop artikel id: `2`
    - Leverancier: `metalak`
    - ordercode: `3M51391/12`
    - artcode: `3m-51391-12`
    - inkoopprijs (voor meer verpakking): `12.00`
1. Inkoop bij Metalak B.V.
    - Inkoop artikel id: `3`
    - Leverancier: `emm`
    - ordercode: `51391-3m-12`
    - artcode: `3m-51391-12`
    - inkoopprijs (voor meer verpakking): `10.20`



# Order


# Order regel

- ArtikelNummer: `1900001`
- ArtikelCode: `3m-51391-12`
- Aantal: `3`, aantal keer dat verpakking is verkocht
- Stuksprijs: `12.00`, dit is de prijs die wordt overgenomen uit artikel bestand of klant artikel bestand. Kan handmatig worden aangepast door verkoper. Alleen in portal intern
- Tekstregel oud: Wordt opgebouwd bij aanmaken regel als Merk + Tekst + Inhoud + Eenheid. Hele regel kan daarna handmatig worden aangepast.
- Tekstregel: Is altijd **Merk** + **Tekst** + **Inhoud** + **Eenheid** + (**verpakking**) + **aantal** + `st`. Er kan handmatig extra informatie worden toegevoegd. B.v. kleur van lak, of andere opties. Deze opties zijn alleen beschikbaar indien opgegeven.
- Set oplossing
    1. Stofzuiger aantal `1`, korting: `100`%, prijs: `250.00` (set prijs), opmerking (`set aanbieding`)
    1. Slang aantal `1`, korting: `100`%, prijs: 23.00 (standaard korting, klant kosrting, speciale korting)
    1. Zak aantal `2`, korting: `100`%, prijs: 3.00 (standaard korting, klant kosrting, speciale korting)



# I1000
Vervalt?
- Transport kosten, hebben eigen artikelen
- Kleurmengerij: krijgen artikelen per groepering (actie Jordie/Marcel. Kleur enz worden invoer velden
- Set verkoop, zie voorbeeld




- Excel import
  	- merk: `3M`
    - code: `51391`
    - verpak aantal: `12`
    - => artcode `3m-51391-12`
