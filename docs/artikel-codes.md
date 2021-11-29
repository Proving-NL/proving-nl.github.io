


# Artikelen

## Product (ABIS geel)

- ArtNr: `artNr`
- Merk: `merk`
- Code: `code`
- Tekst: `tekst`
- Inhoud: `inhoud`
- InhoudEenheid: `inhoudEenheid`
- Gewicht: `gewicht`
- VOC: `voc`
- MagLokatie: `magLokatie`
- ArtGroep: `artGroep`
- Bedrijf: `bedrijf`
- Voorraad: `voorraad`
- Veiligheidsblad: `x`
- Technischbal: `x`

## (Inkoop) Artikel

- Artikel code: Product `artNr`
- Eenheid: `eenheid`
- Aantal: `aantalStuks`
- Leverancier: `leverancier`:
- Bestel code: `bestelCode`:
- EAN barcode: `barCode`:
- Gewicht: `gewicht`:
- Bruto: `inkBruto`:
- Kort.: `inkKorting`:
- Netto: `inkNetto`:
- Datum (inkoop aanpassing): `d_netto`: `inkoopLastModifiedDateTime`:
- Marge: `marge`:
- Verkoop: `bruto`:
- Datum (verkoop aanpassing): `d_netto`: `verkoopLastModifiedDateTime`:

## Inkoop Artikel

- Leverancier (supplier) Code: `supCode`:
- Leverancier Artikel Code: `supArtCode`:
- Leverancier Catalogus (list) Prijs €: `supListPrice`:
- Leverancier Inkoop Korting %: `supDiscount`:
- Leverancier Netto Prijs €: `supNetPrice`:

# Aantekeningen

- **Bruto stuksprijs**: Verkoop prijs per eenheid,
- **Bruto prijs**: Verkoop prijs verpakking
- **Netto prijs**: Verkoop prijs per eenheid,


- 1 st €1,10
- 12 st €1,03    14
- 1 doos (12st) **12,00** (**1,00**/st) (**13,56** incl btw)

- listPrice (24,00),
- korting/discountPerc 50%, discount 12,00
- klant-korting 60%, klant-discount 24,00
- pack = doos, packQuantity 12, packPrice = 12,00, _unitPrice = 1,00_, fatPrice = 13,56


-





- `net` netto wordt genoemd
- `unit` Part / Unit
- `pack` Package

# Data velden

- `listPrice`: **Bruto Prijs** `catalogPrice`: Catalogus lijst prijs van het product / verpakking `cp`

- `unitPrice`: **Stuks prijs** _eenheidsprijs_ `partPrice`: eenheidsprijs, prijs van 1 artikel in een meer verpakking zoals doos

- `netPrice`: **Netto Prijs** _netto ex_
- `fatPrice`: **Netto Incl BTW Prijs** _netto_

inkoop prijs

verpakking / unit

- `client` `customer` Klant
- `discount` Korting
- Klant korting: `clientDiscount`, `customerDiscount`
- Inkoop korting: `purchaseDiscount`,



- `packPrice`: Prijs van de verpakking
- `packQuantity`: Aantal units/producten in de verapkking




# Artikel code

    1. Fabrikant/Merk:
    1. Fabrikant/Merk code:
    1. Aantal stuks:
    1. Leverancier: Indien gelijk aan Fabrikant/Merk negeren

## Voorbeelden

    - `Airo, Thinner AA, 1ltr, T3.00.0001` (ingekocht bij Airo)
        - **Product**
        - ArtNr: `AIR.T3.00.0001`
            - Merk: `AIR` (Airo)
            - Code: `T3.00.0001`
        - Tekst: `Airo, Thinner, AA`
        - Inhoud: `1`
        - InhoudEenheid: `ltr`
        - _Product tekst_: `Airo, Thinner, AA, 1ltr`
        - **Artikel**
        - (ArtNr: `AIR.T3.00.0001`)
        - Eenheid: `stuk`
        - AantalStuks: `1`
        - Leverancier: `AIR` (Airo)
        - Bestelcode: `T3.00.0001`
        - _ArtCode_: ArtNr + AantalStuks + Leverancier: `AIR.T3.00.0001.1.AIR`
        - _Titel_: `Airo, Thinner AA, 1ltr`
    - `3M, Hookit goud schijven 200mm P320, 00166` (ingekocht bij EMM)
        - **Product**
        - ArtNr: `3M.00166`
            - Merk: `3M`
            - Code: `00166`
        - (Tekst: `Hookit goud schijven 200mm P320`)
        - Tekst: `3M, Hookit, Goud, schuurschijf, 200mm, P320`
        - Inhoud:
        - InhoudEenheid:
        - _Product tekst_: `3M, Hookit, Goud, schuurschijf, 200mm, P320`
        - **Artikel**
        - (Artikel code: ArtNr: `3M.00166`)
        - Eenheid: `doos`
        - AantalStuks: `50`
        - Leverancier: `MTL` (Metalak)
        - Bestelcode: `3M00166` (let op: zonder punt, kan anders zijn dan ArtNr)
        - _ArtCode_: ArtNr + AantalStuks + Leverancier: `3M.00166.50.MTL`
        - _Titel_: `Hookit goud schijven 200mm P320, doos, 50st`
    - `Motip, Anti Roest Waxcoating spray, 500ml, 00129, doos, 6st`
        - **Product**
        - ArtNr: `MOT.00129`
            - Merk: `MOT`
            - Code: `00129`
        - (Tekst: `Anti Roest Waxcoating spray`)
        - Tekst: `Motip, Anti Roest Waxcoating spray`
        - Inhoud: `500`
        - InhoudEenheid: `ml`
        - _Product tekst_: `Motip, Anti Roest Waxcoating spray, 500ml, 00129`
        - **Artikel**
        - (Artikel code: ArtNr: `MOT.00129`)
        - Eenheid: `doos`
        - AantalStuks: `6`
        - Leverancier: `MOT` (MotipDupli)
        - Bestelcode: `00129-6`
        - _ArtCode_: `MOT.00129.6.MOT`
        - _Titel_: `Motip, Anti Roest Waxcoating spray, 500ml, 00129, doos, 6st`
    - `Motip, Anti Roest Waxcoating spray, 500ml, 00129`
        - **Product**
        - ArtNr: `MOT.00129`
        - **Artikel**
        - (Artikel code: ArtNr: `MOT.00129`)
        - Eenheid: `stuk`
        - AantalStuks: `1`
        - Leverancier: `BAT` (Baten)
        - Bestelcode: `00129`
        - _ArtCode_: `MOT.00129.1.BAT`
        - _Titel_: `Motip, Anti Roest Waxcoating spray, 500ml, 00129`



    - `3M, Hookit goud schijven, 200mm, P320, 6 gaten, 00166`
        - Merk: `3M`
        - Tekst: `Hookit goud schijven 200mm gaten 6 P320`
        - _Afmeting_: `200mm`, letop: afmetingen altijd kleine letters mm/cm/m/mtr
        - _Korrel_: `P320`, letop: korrel altijd hoofdletter P
        - _Gaten_: `6`, letop: gaten altijd tekst `gaten` voor het aantal
        - Code: `00166`
    - `3M, Hookit, Goud, Schuurschijf, 200mm, P320, gaten 6, 00166`
        - Tekst: `3M, Hookit, Goud, Schuurschijf, 200mm, P320, gaten 6, 00166`
        - Merk: `3M`
        - Soort: `Hookit`
        - Type: `Goud`
        - Product: `Schuurschijf`
        - Afmeting: `200mm`, letop: afmetingen altijd kleine letters mm/cm/m/mtr
        - Korrel: `P320`, letop: korrel altijd hoofdletter P
        - Gaten: `6`, letop: gaten altijd tekst `gaten` voor het aantal
        - Code: `00166`
    - `3M, Hookit, Goud, Schuurschijf, 200mm, P320, gaten 6, 00166, doos, 6 stuks`
        - Tekst: `3M, Hookit, Goud, Schuurschijf, 200mm, P320, gaten 6, 00166`
        - Merk: `3M`
        - Soort: `Hookit`
        - Type: `Goud`
        - Product: `Schuurschijf`
        - Afmeting: `200mm`, letop: afmetingen altijd kleine letters mm/cm/m/mtr
        - Korrel: `P320`, letop: korrel altijd hoofdletter P
        - Gaten: `6`, letop: gaten altijd tekst `gaten` voor het aantal


# Artikel groep

1. Kop 1, Linker lijst, Hoofdgroep
1. Kop 2, rechter lijst
1. Kop 3, Product groep
1. Product namen

- `Non-paint/Schuurmaterialen/Schuurschijven`
- `Non-paint/Plamuren/Kitten`
- `Non-paint/Machines/Poetsen`
- `Paint/Lak/Grondlak`

 1. Kop 1,

    **Voorbewerken**

        **Reinigen**
            Ontvetters/Thinners
            Poetspapier

          **Plamuren**
              Plamuur
                1-k
                2-K
              Plamuurmessen
              Controle

    **Lakproces**
        **Maskeren**
            Maskeerpapier
            Papierdispensers
            Maskeerfoliesysteem
            Foliedispensers
            Maskeerfoliesysteem
            Maskeertap
        **Schuren**
            Mobiel schuursysteem
            Schuurmateriaal
              Schijven
              Stroken
              Blokken
              Scuff
            Schuurmachines
              Elektrisch
              Pneumatisch
            Stofzuigers
            Accesoires stofzuiger
        **Oppervlaktebehandeling**
            Pompvloeistofspuiten
            Kleefdoeken
            Ontvettingsdoeken
            Ontvetters
        **Lakvoorbereiding**
            Mengbekers
            Roerstokjes
            Lakcontrole
            Inzetbekers
            Spuitstaaltjes
            Filters
        **Spuiten**
            Non Paint
              Snaplid systeem
              Spuitpistolen
              Accesoires
            Paint
              Primers/Grondverfen
              Blanke lakken
              Acryl verdunners
              Etch Primers
              Mengkleuren
                  Readymix
                  Thinner-basis
                  Water-basis
                  industrieel
              Wash Primers              
        **Poetsen**
            Poetsmiddellen
            Foampads
            Poetsdoeken
            Spot Repair
            Poetsmachines

    **Persoonlijke Bescherming**
        **Overalls**
        **Handschoenen**
        **Handreiniging**
        **Maskers**
        **Hoofbescherming**

    **Spuitbussen**
        Maatwerk
        Primers
        Blanke lak
          1-K
          2-K
        Pre-fill
        Overig

    **Werkplaatsinrichting**
        Spuitcabine
          Plafondfilters
          Paintstop
        Schragen  


# Merk

- 3M: 3M
- AC: AC
- AGU: AirGunza
- AIR: Airo
- ALL: Allway
- AMC: Amercoat
- AML: Amerlock
- AND: Andrea
- ANI: Ani
- ANS: Ansell
- APL: Aplex
- APP: Applied
- AQU: Aquamax
- AQE: Aquamax extra
- ASG: ASG
- ASS: Assilex
- ATL: Atlas
- AUT: Autoplex
- BAH: Bahco
- BIO: Bio
- BLA: Black Diamond
- BOD: BodyMagic
- CAP: CAP
- CSY: Car System
- CBO: carbon
- CBR: CarBrite
- CRA: Cars Rallye
- CTO: Cartool
- CEN: Central
- CHE: Chemicar
- CLE: Cleantec
- CM : CM
- CMT: CMT
- COL: Colad
- CMA: Color Matic
- CMA: Colormatic
- CLR: Colour
- COL: Columbus
- CMN: Commandant
- CMP: compact
- COP: Copenhagen
- COX: Cox
- CRE: Creeper
- CRP: Crepe
- CRO: Cromax
- DEB: De Beer
- DEJ: De Jong
- DEV: De Vilbiss
- DEB: Debrasel
- DEK: Dekalin
- DEL: Delta
- DLP: Delta Plus
- DTY: Deltalyo
- DEV: DeVilbiss
- DIN: Dinitrol
- DRA: Draeger
- DUA: Dual
- DUP: Dupli color
- DUP: Dupli-color
- DPN: DuPont
- DUR: Duro
- DYM: Dymo
- DYN: dynabrade
- DYN: Dynabride
- EAG: Eagle
- ECL: Eclipse
- ECO: eco
- ELT: Elten
- EMI: Eminent
- END: Endstra
- EP : EP Vernici
- EQU: Equalizer
- ERP: ERP
- ESG: ESG
- EUR: Euro
- EVE: Evercoat
- EXC: Exclusive Color
- FAR: Farecla
- FEI: Fein
- FER: Ferro
- FES: Festool
- FIL: Filgraf
- FLP: Fillon pichon
- FIN: Finixa
- FIN: Finxia
- FIR: First Choice
- FLE: Flex
- FOL: Follex
- FÖR: Förster
- FRI: Friess
- FUT: Futura
- FTP: Future paint
- G3 : G3
- GER: Gerco
- GER: Gerko
- GSN: Gerson
- GSI: GSI
- GTI: GTI
- HAM: Hamach
- HEM: Hempel
- HKL: Herkules
- HER: Hermes
- HIO: Hiolit
- HIS: Histor
- HUT: Hutchens
- HUT: Hutchins
- HYD: Hydra
- HYD: Hydro
- IKS: IKS
- IMP: Impro
- IM-: Im-pro
- IND: Indasa
- INP: INP
- ITC: Interchem
- INT: intergreen
- IRP: IRP
- IRT: IRT
- ITA: Itas
- IWA: Iwata
- JUM: Jumbo
- JW: JW
- KEM: Kem
- KTL: Kematyl
- KEM: Kemtex
- KIM: Kimberley Clark
- KIM: Kimberly Clark
- KIM: Kimberly-Clark
- KIN: Kindbox
- KLE: Kleen-all
- KLI: Klingspor
- KLU: Kluthe
- KOV: Kovax
- KPC: KPC
- KS : KS Tools
- LES: Lesonal
- LET: Let Set
- LIO: Lion
- LOC: Loctite
- LUB: Lubri
- LVL: LVL
- LYO: Lyon
- MAH: Mahotec
- MAJ: Majestic
- MGL: Marigold
- MAR: Marston
- MAX: Max Meyer
- MAX: Maxair
- MAX: MaxMeyer
- MEG: Meguro
- MFX: Metaflux
- MET: Metalino
- MH: MH
- MIA: Miarco
- MIL: Milwaukee
- MIP: Mipa
- MIR: Mirka
- MKN: Mirkon
- MLN: Mirlon
- MOL: Moldex
- MOT: Motip
- MS4: MS4
- M-S: M-safe
- MUL: Multi sorb
- NES: Neskrid
- NEX: Nexa
- NOB: Nobelair
- OLF: Olfa
- ORI: Orion
- OTT: Otto
- OXX: Oxxa
- PAR: Parker
- PEV: Pevastar
- PG: PG
- PHI: Philips
- PLI: Pliogrip
- POR: Portwest
- PP : PP
- PPG: PPG
- PEV: Prevastar
- PRE: Prevost
- PCN: Procaneutre
- PCR: Procar
- PFL: Proflow
- PGN: ProGun
- PMK: Promask
- PSH: Proshield
- PTK: Protek
- PTX: Protex
- PUM: Puma
- RED: Redbrick
- RLN: Rhilan
- RMX: Rhimex
- RTX: Rhitex
- RHI: Rhiwa
- RTX: Ritex
- RM: RM
- ROD: Rodac
- RON: RoninTools
- RSI: RSI
- RUP: Rupes
- SAG: Sagola
- SAL: Saline
- SAM: Sam
- SAT: Sata
- STJ: Satajet
- SCO: Scott
- SEL: Selemix
- SEM: SEM
- SHA: Shark
- SHI: shield
- SHO: Showa
- SIA: Sia
- SIA: Siaair
- SIA: siacar
- SIA: Siacarbon
- SIA: Siadrive
- SIA: Siafast
- SIA: Siaflex
- SIA: Siamet
- SIA: Siaprime
- SIA: Siarexx
- SIA: Siaron
- SIA: Siarun
- SIA: Siaspeed
- SIA: Siawat
- SIC: Sicad
- SIG: Sigma
- SIG: Sigmadur
- SIL: Silco
- SLI: Slipson
- SMA: Smart
- SMI: Smirdex
- SOF: Softex
- SOL: Solarus
- SON: Sonax
- SPE: Speedy
- SPE: Speedy P
- SPI: Spies Hecker
- SPR: Spralac
- SMT: Spraymaster
- SMX: Spraymax
- SPR: Sprint
- STA: Standox
- STA: Star
- STA: Starchem
- SBL: Staubli
- STE: Steinel
- SUM: Sumake
- SUN: Sundström
- SUP: Super brush
- SYS: System
- T42: T4281
- T48: T489
- TAN: Tander
- TEC: Techno
- TEC: Tecmec
- TER: Terodem
- TER: Terokal
- TER: Terolan
- TER: Teroson
- TER: Terostat
- TER: Terotex
- TEX: Tex Rope
- TIP: Tip-It
- TIT: Tite
- TOR: Tork
- TOU: Touch&Tuff
- TWI: twin lock
- TYV: Tyvek Pro
- UF-: UF-Texco
- UNI: Uni
- UNM: Unimark
- UVE: Uvex
- VAL: Valresa
- VAT: Vattex
- VEC: Veconor
- VIL: Viledon
- VIN: Vinol
- VT: VT
- WAL: Walcom
- WIB: Wibeco
- WIL: Wilkerson
- WIL: Wiltec
- WOM: Womi
- WPK: WPKA
- WPT: Wpt
- WYP: Wypall
- ZAN: Zandleven
- ZWE: Zweihorn


# Leveranciers

- ABR: Abraon
- AIR: Airo
- AIB: Airo Belgie
- AIC: Airo Chemie
- AJC: A.J. Coatings
- ALE: AliExpress
- ALI: all-in
- ALP: Allpro
- ALR: Alrotec
- AMI: AMI
- ANI: Ani
- ANN: Annest Iwata
- APC: APC
- AUT: Autoplex
- AVD: AVD Zevenaar
- BAS: BASF
- BAT: Baten
- BES: Besselink
- BIE: Biesheuvel
- BOR: Boromat
- BRE: Brezan Arnhem
- BVL: Ben v. Laerhoven
- CAP: CAP
- CAR: Carlogic
- CEZ: Cezet
- CHE: Chemicar
- CCO: Color & Coatings
- CUP: ColorUp
- DBO: De Boer
- DJO: DeJong
- DEL: Delta Plus
- DER: Derbo
- DIT: Ditoma
- DOZ: Dozon
- DS8: DS80
- DYN: Dynabrade
- ECO: ECoatings
- ECT: EcoTools
- EMM: EMM
- END: Endstra
- EUR: EuroProducts
- GAM: Gami
- GRC: Gerco
- GRK: Gerko
- HAK: HakoSmart
- HER: Hermes
- HOD: Hodij
- HOR: Horn & Bauer
- HOZ: Hoza
- HUT: Hütter
- ICI: Icico
- INP: INP
- INT: Interchem
- IWA: Iwata
- JBC: JB Coatings
- JBS: JBCsolutions
- KEM: Kemtex
- KIL: Kilinclar
- KLU: Kluthe
- KMT: Kematyl
- KOO: Koopman
- KRI: Kristal
- KRO: Kroonint
- KST: KStools
- LEV: Levico
- LYR: Lyreco
- MAH: Mahotec
- MAI: Maiburg
- MAJ: Majestic
- MAK: Makro
- MAR: Marchand
- MEG: MegaColor
- MET: Metaaltechniek
- MHT: MHtools
- MIR: Mirka
- MOL: MolCoatings
- MOT: MotipDupli
- MTL: Metalak
- MTS: MTS
- MUS: Mus
- MYT: Myto
- NIE: Niemeyer
- NON: nonpaint24
- OCT: Octopus
- OKC: OKCoatings
- ORA: Orapi
- OTT: Ottoseal
- OXI: OxidCoatings
- PAI: PaintSupplies
- PCA: Procar
- PFI: ProFinal
- PLA: PlasticIndustrie
- PPG: PPG
- RAJ: RajaPack
- RHI: Rhiwa
- RIE: Ried
- ROD: Rodac
- RUP: Rupe
- RPS: Rupes
- SER: ServiceBest
- SHI: SHI
- SIC: Sicad
- SMI: Smirdex
- SPE: Spectrum
- SPI: Spijker
- STA: Starchem
- STE: Sterko
- SYS: System
- THV: TerHoeven
- THR: TerHorst
- TIP: TipPoint
- TWI: Twimva
- UNI: Unimark
- VAL: Valo
- VEN: Ventex
- VIS: Visa
- VOC: Vocor Tools
- WER: WerkplaatsService
- WIB: Wibeco
- WIC: Wico
- WIL: Wiltec
- WIN: Winters
- WPT: WPT
- WSB: WSB
