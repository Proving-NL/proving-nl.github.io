# Afspraken

- Klant vervallen => opmerking = `vervallen` of in ABIS WEB archived date time = `datum van vandaag`


1. Betaald: betaaldDT of betaaldatum
1. Geboekt: geboektDT of boekdatum
1. Gefactureerd: factuurdatum of factuurnr of faktuurnr
1. Verwerkt: datumverwerkt
1. Geleverd: leverdatum
1. Verzonden: verstuurdDT
1. Gepakt: orderpickDateTime
1. Geprint: datumgeprint
1. Opdracht: verwerkt
1. Mandje: NIET verwerkt
1. Aanbieding: aanbieding en NIET verwerkt
1. Onbekend: overig



# Paklijst
1. Open Orders
2. Zoek `*`
3. Filter > Order Status > Opdracht
3. Filter > Route Nr > 1 = Post, 2 = Visser
4. [Paklijst]

# Faktureren
1. Open Orders
2. Zoek `*`
3. Filter > Order Status > Factureren
3. Filter > Naam Klant > (optioneel)
4. [Factureren]




# Menu


# Orders > Aanbieding

- aanbieding=AAN, verwerkt=UIT
- Wat moet hiermee gebeuren?
- Indien vervallen, dan opruimen. Voorstel is: regels wissen, bon wissen

# Orders > Winkelmandje

- aanbieding=UIT, verwerkt=UIT
- Nieuwe bon, geen opdracht, dus in bewerking, geen vinkje
- winkelmandje, niet besteld
- Voorstel, indien vervallen, regels wissen en bon wissen.

# Orders > Printen

- printDateTime=LEEG en verwerkt=AAN
- met vinkje, maar nog niet geprint

# Orders > Pakken

- pickDateTime=LEEG en printDateTime=INGEVULD

# Orders > Verzenden
- sendDateTime=LEEG en pickDateTime=INGEVULD

# Orders > Verzonden
- deliverDateTime=LEEG en sendDateTime=INGEVULD

# Orders > Geleverd
- faktuurnr=LEEG en deliverDateTime=INGEVULD
- Deze kunnen worden gefactureerd

# Orders > Factureren
- verwerkt=1 and aanbieding <> 1 and isnull(factuurnr,0) = 0 and isnull(faktuurnr,0) = 0
- Deze kunnen worden geboekt in Afas
- Dit via export




# Orders > Gefactureerd
- boek datum=LEEG en factuur nr=INGEVULD
- Deze kunnen worden geboekt in Afas
- Dit via export

# Orders > Geboekt
- betaald datum=LEEG en boek datum=INGEVULD
- Openstaande bonnen (zie ook openstaande facturen)

# Orders > Geboekt
- betaald datum=INGEVULD
- Bonnen gereed

# Orders > Alles
- alles



## Bij paklijst





1. printDateTime wordt ingevuld
1. pickDateTime wordt ingevuld
1. sendDateTime wordt ingevuld
1. deliverDateTime wordt ingevuld
