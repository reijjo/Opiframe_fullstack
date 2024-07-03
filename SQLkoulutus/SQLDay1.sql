use Northwind;


-- t‰m‰ on kommentti

/*
-- CRUD
Create 
Read
Update
Delete
*/

/*
//
// READ toteutetaan komennolla SELECT
//
*/
-- SELECT * FROM dbo.Customers;
-- SELECT ContactName, Address, City FROM dbo.Customers;

-- 1) Hae kaikki tiedot Tyˆntekijˆist‰
-- SELECT * FROM dbo.Employees;
-- SELECT LastName FROM dbo.Employees;

-- 2) Hae kaikki tuotenimet Tuotteista
-- SELECT ProductName FROM dbo.Products;

-- Hae kaikki tuotenimet ja yksikkˆhinnat tuotteista
-- SELECT ProductName, UnitPrice FROM dbo.Products;


-- Haetaan yksi kappale kutakin erillist‰ tietoa 
-- SELECT DISTINCT komennolla
-- eli millaisia eri arvoja on t‰ss‰ sarakkeessa

-- SELECT Country FROM dbo.Customers;
-- SELECT DISTINCT Country FROM dbo.Customers;

-- SELECT DISTINCT UnitPrice FROM dbo.Products;
/*
SELECT DISTINCT toimii periaatteessa monella sarakkeella
Ole varovainen sarakkeiden valinnassa!

SELECT DISTINCT City, Country from dbo.Customers;
SELECT DISTINCT City from dbo.Customers;
*/


-- Tietoa voidaan hakea ehdolla WHERE
-- SELECT * FROM dbo.Customers WHERE Country='Finland';

-- 3) Hae kaikki saksalaiset asiakkaat
-- SELECT * FROM dbo.Customers WHERE Country='Germany';

-- 4) Miss‰ Ranskan kaupungeissa on asiakkaita?
-- SELECT DISTINCT City FROM dbo.Customers WHERE Country='France';

-- AND, OR ja NOT mahdollistavat monimutkaisempia WHERE ehtoja
-- AND = kumpikin on totta
-- OR = ainakin yksi on totta
-- NOT = ehto ei ole totta (tultava ehdon eteen)

-- 5) N‰yt‰ kaikki suomalaiset asiakkaat, jotka ovat helsinkil‰isi‰
-- SELECT * FROM dbo.Customers WHERE Country='Finland' AND City='Helsinki';

-- 6) N‰yt‰ kaikki saksalaiset ja suomalaiset asiakkaat
-- SELECT * FROM dbo.Customers WHERE Country='Finland' OR Country='Germany';

-- 7) N‰yt‰ kaikki ranskalaiset asiakkaat paitsi pariisilaiset
-- SELECT * FROM dbo.Customers WHERE Country='France' AND NOT City='Paris';
-- SELECT * FROM dbo.Customers WHERE Country='France' AND City !='Paris';

-- ORDER BY mahdollistaa hakemisen j‰rjestyksess‰
-- pilkku erottaa j‰rjestyksen
-- ASC (pienin ensin) default asetus
-- DESC k‰‰nt‰‰ j‰rjestyksen (suurin ensin)
-- SELECT * FROM dbo.Products ORDER BY UnitPrice;
-- SELECT * FROM dbo.Products ORDER BY UnitPrice DESC;
-- SELECT * FROM dbo.Products ORDER BY CategoryID, UnitPrice;

-- 8) N‰yt‰ kaikki asiakkaat osoitteen, kaupungin ja maan mukaisessa j‰rjestyksess‰.
-- SELECT * FROM dbo.Customers ORDER BY Country, City, Address;

/*
//
// Tietokantaan lis‰t‰‰n INSERT INTO komennolla
//
*/

-- SELECT * FROM dbo.Shippers;

/*
-- INSERT INTO <table> VALUES (<arvot t‰h‰n>)
-- kaikkiin sarakkeisiin arvo
INSERT INTO dbo.Shippers
VALUES ('Jannenauto', '123456');
*/

/*
-- INSERT INTO <table>(<t‰ytett‰v‰t sarakkeet>) VALUES (<arvot t‰h‰n>)
-- Osa sarakkeista voidaan j‰tt‰‰ tyhjiksi
INSERT INTO dbo.Shippers (CompanyName)
VALUES ('Kirsinauto');
- Kirsinauton Phone on nyt NULL
INSERT INTO dbo.Shippers (Phone)
VALUES ('123456789');
--ei onnistu, koska CompanyName on not null tyyppinen
*/





-- NULL tarkoittaa ett‰ tietokannan recordiin ei tullut arvoa
-- Se on tyhj‰ arvo
-- SELECT * FROM dbo.Shippers WHERE Phone IS NULL;
-- SELECT * FROM dbo.Shippers WHERE Phone IS NOT NULL;

/*
-- muistialue t‰yttyy seuraavasti
/a = tiedon loppumerkki 
/o = muistialueen loppumerkki

1 ---> 1 /a /o
'' --> /a /o
NULL --> /o
*/

/*
-- Tietokantaan voi toki tallettaa "" eli tyhj‰n merkin
INSERT INTO dbo.Shippers (CompanyName, Phone)
VALUES ('Minnanauto', '');
-- Kirsinauton Phone on nyt ''
INSERT INTO dbo.Shippers (CompanyName, Phone)
VALUES ('Feikkiauto', 'NULL');
*/
--SELECT * FROM dbo.Shippers WHERE Phone='';

--SELECT * FROM dbo.Region;
--SELECT * FROM dbo.Territories;

-- 9) Lis‰‰ uusi region nimelt‰ 'Suomi' Region tauluun
-- INSERT INTO dbo.Region VALUES (5,'Suomi');

-- 10) Lis‰‰ uusi territorio 'Pori' Territories taulukkoon
-- INSERT INTO dbo.Territories VALUES (1234,'Pori',5);
-- 11) Lis‰‰ uusi territorio 'Pori' Territories taulukkoon
-- INSERT INTO dbo.Territories VALUES (4321,'Pori',5);

/*
//
// UPDATE p‰ivitt‰‰ olemassa olevaa tietoa
//
*/
-- UPDATE <taulunnimi> SET <sarake>=<arvo> WHERE <ehto>
--UPDATE dbo.Territories SET TerritoryDescription='Oulu' WHERE TerritoryID=4321;

/*
//
// DELETE tuhoaa tiedon
//
*/

-- Nyt tarkkana kuin porkkana!
-- DELETE FROM <taulunnimi> WHERE <ehto>
-- DELETE FROM dbo.Territories WHERE RegionID=5;
-- DELETE FROM dbo.Region WHERE RegionID=5;

-- 12) Tuhoa luomasi rivit Shippers taulusta
-- SELECT * FROM dbo.Shippers WHERE ShipperID > 3;
-- DELETE FROM dbo.Shippers WHERE ShipperID > 3;

-- TRANSACTIONS are commands that can be restored
/*
BEGIN TRANSACTION;
SELECT * FROM dbo.Shippers;
DELETE FROM dbo.Shippers WHERE ShipperID > 3;
SELECT * FROM dbo.Shippers;
ROLLBACK;
SELECT * FROM dbo.Shippers;
*/
/*
BEGIN TRANSACTION;
SELECT * FROM dbo.Shippers;
DELETE FROM dbo.Shippers WHERE ShipperID > 3;
SELECT * FROM dbo.Shippers;
COMMIT TRANSACTION;
SELECT * FROM dbo.Shippers;
*/

-- Erilaisia k‰skyj‰

--TOP n‰ytt‰‰ n‰in monta ensimm‰ist‰
-- SELECT TOP 8 * FROM dbo.Customers;
-- SELECT TOP 25 percent * FROM dbo.Customers;

--MIN ja MAX n‰ytt‰v‰t pienimm‰n ja suurimman arvon
--SELECT MIN(UnitPrice) FROM dbo.Products;
--SELECT MAX(UnitPrice) FROM dbo.Products;

--COUNT on lukum‰‰r‰
--SELECT COUNT(unitPrice) FROM dbo.Products;

--AVG on keskiarvo

--SUM on sarakkeiden yhteenlaskettu arvo

-- LIKE mahdollistaa haun osalla tiedosta
-- % vaihteleva m‰‰r‰ vapaavalintaisia merkkej‰
-- _ yksi vapaavalintainen
-- SELECT * FROM dbo.Customers WHERE Country LIKE 'Fra%';

-- IN(<joukko arvoja>) kuuluu joukkoon
-- SELECT * FROM dbo.Customers WHERE Country IN ('Finland','USA', 'Bangladesh');

-- BETWEEN <arvo> AND <arvo>
--SELECT * FROM dbo.Products WHERE UnitPrice BETWEEN 20 AND 30 ORDER BY UnitPrice;

-- AS on alias, joka mahdollistaa palautettavan rivin manipuloinnin
-- SELECT FirstName + ' ' + LastName AS kokonimi FROM dbo.Employees;
-- SELECT COUNT(Country) AS Lukum‰‰r‰ FROM dbo.Customers;
-- SELECT ContactTitle + '\n' + ContactName + '\n' + Address + ',' + Postalcode + ' ' + City + '\n' + Country AS LabelAddress FROM dbo.Customers;

/*
//
// JOIN yhdist‰‰ monta taulua
//
*/

-- Miksi? Meill‰ on kaksi perus casea
-- 1) Kokoamme tiedon monesta l‰hteest‰ (taulusta).
-- T‰llˆin teemme yleens‰ INNER JOIN

/*
INSERT INTO dbo.Customers (CustomerID, ContactName, CompanyName)
VALUES (1234,'Janne', 'kokeilufirma');
INSERT INTO dbo.Customers (CustomerID, ContactName, CompanyName)
VALUES (4321,'Minna', 'kokeilufirma');

INSERT INTO dbo.Orders (EmployeeID)
VALUES (1);

INSERT INTO dbo.Orders (EmployeeID)
VALUES (2);
*/

/*
-- INNER JOIN hakee kaikki ne tilaukset ja asiakastiedot
-- joissa tilaukselle lˆytyy asiakas
SELECT Orders.OrderID, Customers.ContactName
FROM Orders
INNER JOIN Customers ON Orders.CustomerID = Customers.CustomerID;
*/
/*
-- FULL JOIN hakee kaikki tilaukset ja asiakastiedot
-- vaikka tilaukselle ei olisi asiakasta
-- ja vaikka asiakkaalle ei ole tilausta
-- T‰t‰ tilannetta ei saisi tapahtua!
SELECT Orders.OrderID, Customers.ContactName
FROM Orders
FULL JOIN Customers ON Orders.CustomerID = Customers.CustomerID;
*/

-- 2) Yksi taulu on p‰‰asiallinen tieto ja muu tieto mahdollisesti t‰ydent‰‰ sit‰
-- T‰llˆin teemme yleens‰ LEFT JOIN

/*
SELECT Orders.OrderID, Customers.ContactName
FROM Orders
LEFT JOIN Customers ON Orders.CustomerID = Customers.CustomerID;
*/





