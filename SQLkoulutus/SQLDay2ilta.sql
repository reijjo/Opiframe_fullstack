/*
use Northwind;
*/

/*
--
-- STORED PROCEDURE
--

CREATE OR ALTER PROCEDURE <storedprocedurename>
AS
BEGIN
	<koodi tähän>
END

-- Koodi ajetaan komennolla EXECUTE
EXECUTE <proseduurinnimi>
EXEC <proseduurinnimi>
*/

/*
CREATE OR ALTER PROCEDURE spHelloWorld
AS
BEGIN
	PRINT 'Hello World!';
END
*/

-- Luotu proseduuri laukaistaan käskyllä EXECUTE tai EXEC
-- EXECUTE dbo.spHelloWorld;
/*
CREATE OR ALTER PROCEDURE spGetEmployees
AS
BEGIN
	SELECT * FROM dbo.Employees;
	PRINT 'spGetEmployees ajettu!';
END
*/
-- EXEC dbo.spGetEmployees;

-- stored procedurella voi olla argumentteja

/*
CREATE OR ALTER PROCEDURE spGetProducts 
	@minprice MONEY
AS
BEGIN
	SELECT * 
	FROM dbo.Products AS p
	WHERE p.UnitPrice >= @minprice
	ORDER BY p.UnitPrice;
END
*/

-- EXECUTE spGetProducts 20.00
-- EXECUTE spGetProducts @minprice = 30.00;
/*
CREATE OR ALTER PROCEDURE spGetProducts 
	@minprice money,
	@maxprice money
AS
BEGIN
	SELECT * FROM dbo.Products AS p
	WHERE p.UnitPrice >= @minprice AND p.UnitPrice <= @maxprice
	ORDER BY p.UnitPrice;
END
*/

-- EXEC spGetProducts @minprice = 20.00, @maxprice = 50.00;
/*
CREATE OR ALTER PROCEDURE spGetProducts 
	@minprice money,
	@maxprice money,
	@productname nvarchar(40)
AS
BEGIN
	SELECT * FROM dbo.Products AS p
	WHERE p.UnitPrice >= @minprice AND 
	p.UnitPrice <= @maxprice AND
	p.ProductName LIKE @productname + '%'
	ORDER BY p.UnitPrice;
END
*/
-- EXECUTE spGetProducts 1.00, 1000.00, 'A';

-- stored procedure tukee default argumentteja

/*
CREATE OR ALTER PROCEDURE spGetProducts 
	@minprice money = 0.00,
	@maxprice money = NULL,
	@productname nvarchar(40) = ''
AS
BEGIN
	SELECT * FROM dbo.Products AS p
	WHERE p.UnitPrice >= @minprice AND 
	(@maxprice IS NULL OR p.UnitPrice <= @maxprice) AND
	p.ProductName LIKE @productname + '%'
	ORDER BY p.UnitPrice;
END
*/

-- EXECUTE spGetProducts @maxprice = 10.00;
-- EXECUTE spGetProducts @maxprice = 10.00, @productname = 'T';
-- EXECUTE spGetProducts;

-- SQL koodauksessa käytetään muuttujia yleisesti.
-- Stored procedure voi käyttää muuttujia...
/*
-- Muuttuja esitellään DECLARE komennolla
DECLARE @minimumstock smallint;

-- Esitellylle muuttujalle voidaan antaa arvo SET komennolla
SET @minimumstock = 50;

-- muuttujaa voi käyttää SQL-lauseissa
SELECT * FROM dbo.Products as p
WHERE p.UnitsInStock >= @minimumstock
ORDER BY p.UnitsInStock;
*/

-- muuttuja voi saada arvon komennolta
/*
DECLARE @totalunitstocked smallint;
SET @totalunitstocked = 0;

-- muuttuja voi saada arvon SQL-komennolta, joka on suluissa
SET @totalunitstocked = (
	SELECT SUM(p.UnitsInStock)
	FROM dbo.Products AS p
);

-- muuttujan arvo voidaan laskea kahdella tavalla
SELECT @totalunitstocked;
PRINT @totalunitstocked;
*/
/*
-- muuttuja voi olla stored proceduren sisällä
CREATE OR ALTER PROCEDURE spGetProductsByDiscontinued
	@discontinued bit = 0
AS
BEGIN
	-- paikallinen muuttuja
/*
	Lue tästä VARCHAR ja NVARCHAR käytön eroista
	https://www.java67.com/2021/08/difference-between-varchar-and-nvarchar.html#:~:text=1.,for%20example%2C%20N'John.
*/
	DECLARE @productlist nvarchar(MAX);
	SET @productlist = '';
	SELECT
		@productlist = @productlist + p.ProductName + CHAR(10)
/*
 Lue tämä: https://www.petefreitag.com/item/863.cfm
*/
	FROM dbo.Products AS p
	WHERE p.Discontinued = @discontinued
	ORDER BY p.ProductName;

	PRINT @productlist;
END
*/
--EXECUTE spGetProductsByDiscontinued;
--EXECUTE spGetProductsByDiscontinued 1;

-- stored procedure voi palauttaa arvon
-- tässä käytetään varattua sanaa OUTPUT
/*
CREATE OR ALTER PROCEDURE spGetProductsByDiscontinued
	@discontinued bit = 0,
	@product_count int OUTPUT
AS
BEGIN
	SELECT
		p.ProductName,
		p.UnitPrice
	FROM dbo.Products AS p
	WHERE p.Discontinued = @discontinued
	ORDER BY p.ProductName;

	-- ilmoitetaan rivien kokonaislukumäärä
	-- @@ROWCOUNT on varattu sana
	SELECT @product_count = @@ROWCOUNT;
END
*/
/*
-- Luodaan muuttuja, jonne stored procedure palauttaa arvon
DECLARE @tulos int;
SET @tulos = 0;

-- stored proceduren kutsussa on oltava OUTPUT
-- merkitty muuttuja, jonne tulos tallennetaan
EXECUTE spGetProductsByDiscontinued 
	@discontinued = 0,
	@product_count = @tulos OUTPUT;

-- muuttujan arvo voidaan nyt ilmoittaa
SELECT @tulos;
*/
/*
Iltapäivän tehtävä:
2) luo stored procedure, joka toteuttaa seuraat toiminnat:
a) Se palauttaa Products taulusta varastossa olevien
tuotteiden kokonaisarvon
b) Se tulostaa proceduren sisällä tuotteiden nimet 
ja hinnat
Extra) Pidä myös huolta, että koodi ottaa huomioon
onko tuote discontinued kyllä/ei ja tulostaa ensin
käytössä olevat ja sitten ei käytössä olevat tuotteet.

/*
CREATE OR ALTER PROCEDURE spGetProductsTotalValue
	@discontinued int,
	@totalvalue int OUTPUT
AS
BEGIN
	DECLARE @dummy nvarchar(max);
	SET @dummy = '';

	SET @totalvalue = ( SELECT
		SUM(p.UnitPrice)
	FROM dbo.Products AS p
	WHERE p.Discontinued = @discontinued );

	SELECT 
		@dummy = @dummy + p.ProductName + ' ' + CONVERT(nvarchar, p.UnitPrice) + CHAR(10)
	FROM dbo.Products AS p
	WHERE p.Discontinued = @discontinued;

	PRINT @dummy;	

	print @totalvalue;
END
*/

/*
DECLARE @tulos int;
SET @tulos = 0;

EXECUTE spGetProductsTotalValue 1, @totalvalue = @tulos OUTPUT;

SELECT @tulos;
*/

