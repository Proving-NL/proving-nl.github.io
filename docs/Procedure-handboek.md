## Aanmaken order in ABIS PC

  - Alle Verkooporders worden ingevoerd door VerkoopBinnendienst (JP)
  - voor elke order wordt op klantniveau het volgende ingevuld
    - *Accountmanager*
    - *Wijze van bestellen*
    - *wijze van Levering*

      - *Accountmanager*:
        in ABIS, tijdens het maken van een order, wordt in het kopje User ingevuld welk verkoopkanaal verantwoordelijk is voor die order. Dit om een overzicht te krijgen bij wie, welke order vandaan komt. Ook om een beeld van alle Proving klanten te krijgen. welke accountmanager aan hun gekoppeld is of dat er nog een accountmanager aan ze gekoppeld moet worden.
        De Verkoopkanalen:
        Erik v Asselt (EA)
        Eric Joosten  (EJ)
        Arno vd Kant  (AK)
        Frits v Ingen (FI)
        Jordy Broersen (BR)
        Balie Verkoop  (PR)

      - *Wijze van bestellen*:
        In ABIS, vullen we onder kopje Route in, op welke wijze er besteld wordt. dit vullen we in aan de hand van een cijfer.
        De Wijze van Bestellen + code:
        Telefonisch =1
        Whatsapp    =2
        Email order =3
        Email       =4
        Balieverkoop=5

        Het verschil tussen een Emailorder en een Email:
        Emailorder: dit is een mail met een bestellijst waar heel duidelijk onze artikelnummers en producten opstaan.

        Email: Dit zijn getypte bestellingen met minder complete informatie.

        Doel hiervan is dat we bij Emailorders het gevoel hebben, dat deze klanten meer open staan om te gaan bestellen via een Webportaal. deze klanten zullen hier dus ook als eerste voor benaderd worden. JP maakt een overzicht van ongeveer 5 klanten waar we dit Portaal als eerste zouden kunnen aanbieden als test.

      - *Wijze van Levering*:
        In ABIS, vullen we onder het kopje volgnummer in, op welke wijze de order geleverd moet worden. Dit vullen we in aan de hand van een cijfer.
        de Wijze van Leveren + code:
        Default                     =0
        Transport post              =1
        Transport Visser            =2
        Transport Route             =3
        Afgehaald                   =4
## Doorsturen order Magazijn

## **Operationeel proces**   

  - na het aanmaken van de order wordt de order Geprint
  - de order wordt in het daarvoor bestemde bakje geplaatst
## Picken van order

  - de order wordt gepickt
## Leveren Order

  - de order wordt klaargemaakt voor levering volgens *wijze van Levering*
  - de order wordt geleverd
## Order Afhandelen als zijnde Geleverd

  - de order wordt afgeboekt als zijnde Geleverd
  - de order wordt Gefactureerd
    - Orders die Digitaal gefactureerd worden, hoeven we niks mee te doen.
    - Orders die per post verstuurd worden worden, nadat ze afgeboekt zijn als geleverd, automatisch uitgeprint. deze worden in bakje **(X)** verzameld en 1 x per week via de post verzonden.
