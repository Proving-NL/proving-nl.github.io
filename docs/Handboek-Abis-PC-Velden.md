# Klanten
- schema: `company`
# Fakturen
- schema: `invoice`
- **Naam (KlantID)**, `clientName`: .
- **Contactpersoon (Aanhef)**, `clientBusinessContactName`: .
- **Contact email (extra)**, `clientBusinessMailAddress`: .
- **Straat (Straat)**, `clientBusinessAddressStreet`: .
- **Postcode (postcode)**, `clientBusinessAddressPostalCode`: .
- **Plaats (Plaats)**, `clientBusinessAddressCity`: .
- **Factuur contactpersoon (Aanhef)**, `clientOtherContactName`: .
- **Factuur email (extra)**, `clientOtherMailAddress`: .
- **Postbus en Straat (Straat)**, `clientOtherAddressCity`: .
- **Korting contant (tekenbon)**, `clientKortingContant`: .
- **(Vracht kosten)**, `clientVrachtkosten`: .
# Pakbonnen
- schema: `salesorder`
- **Nr (PakBonId/bonnr)**, `nr`: _readonly_ Order nummer.
- **Naam (KlantID)**, `clientName`: _readonly_ Klant naam.
- **Referentie (Referentie)**, `ref`: Klant referentie.
- **Opmerking (Opmerking)**, `remark`: Opmerking op pakbon intern.
- **Datum besteld (besteld)**, `orderDateTime`: Datum van opdracht door klant tot levering.
- **Datum verwacht (levering)**, `plannedDateTime`: Datum van levering.
- **Wijze van levering (RouteNr)**, `routeNr`: Standaard wijze van levering.. Opties: **0**=Niet ingevuld; **1**=Post; **2**=Visser; **3**=Route; **4**=Afhalen; **5**=Brengen(geen route); 
- **Wijze van opdracht (VolgNr)**, `volgNr`: Standaard wijze van opdracht verkoop order.. Opties: **1**=Telefonisch; **2**=Whatsapp; **3**=Email-order; **4**=Email-tekst; **5**=Balie; 
- **UserName (User)**, `userName`: Naam gebruiker, naam van opdrachtgever / account manager.. Opties: **EA**=Erik v Asselt; **EJ**=Eric Joosten; **AK**=Arno vd Kant; **FI**=Frits v Ingen; **BR**=Broersen; **BA**=Balie verkoop; 
- **Faktuur nummer (faktuur)**, `invoiceNr`: _readonly_ Faktuur nummer.
- **Aanbieding (Aanbieding)**, `isQuote`: Order is aanbieding.
- **In opdracht (Verwerkt)**, `isOrder`: Order in opdracht voor levering.
- **Netto (verkoop)**, `nettoverk`: Omzet order verkoop.
- **Netto (inkoop)**, `nettoink`: Kosten inkoop.
- **Netto (opbrengst)**, `nettowinst`: Netto winst / resultaat verkoop order.
# Artikelen-Onder
- schema: `art`
