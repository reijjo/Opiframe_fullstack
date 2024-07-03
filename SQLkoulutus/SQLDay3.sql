
-- use Northwind;

-- IF ELSE
-- LOOPIT
-- VIRHEENKƒSITTELY

-- P‰iv‰n mietelause: "Et s‰k‰‰n kauaa aikaa t‰t‰ ihmiskuntaa rasita"
-- "Viel‰ks s‰‰ki el‰t?"
-- "Ei paskempaa"

-- SQL tukee IF ELSE rakennetta

/*
CREATE OR ALTER PROCEDURE spIfTesti
	@argumentti int
AS
BEGIN
	IF @argumentti > 1000
	BEGIN
		PRINT 'Yli tontun!';
	END
	ELSE
	BEGIN
		PRINT 'Alle tontun!';
	END
END
*/

--EXECUTE dbo.spIfTesti 1500;
--EXECUTE dbo.spIfTesti 500;

-- SQL tukee looppeja WHILE rakenteella
-- BREAK katkaisee loopin ja hypp‰‰ pois
-- CONTINUE siirt‰‰ takaisin loopin alkuun
-- iteraattori rakennetaan ja arvo muutetaan k‰sin!
/*
DECLARE @muuttuja INT;
SET @muuttuja = 1;

WHILE @muuttuja <= 5
BEGIN
	PRINT @muuttuja;
	SET @muuttuja = @muuttuja + 1;
END
*/
-- BREAK esimerkki
-- BREAK k‰ytet‰‰n aina kun etsit‰‰n YHTƒ osumaa
/*
SET @muuttuja = 0;
WHILE @muuttuja <= 5
BEGIN
	SET @muuttuja = @muuttuja + 1;
	IF @muuttuja = 3
	BEGIN
		BREAK
	END
	PRINT @muuttuja;
END
*/
/*
-- CONTINUE
-- CONTINUElla hyp‰t‰‰n takaisin loopin alkuun ja loop jatkaa
-- K‰ytet‰‰n kun halutaan tietyn ehdon t‰ytt‰vi‰ toimintoja
SET @muuttuja = 0;
WHILE @muuttuja < 5
BEGIN
	SET @muuttuja = @muuttuja + 1;
	IF @muuttuja = 3
	BEGIN
		CONTINUE
	END
	PRINT @muuttuja;
END
*/

/*
-- CURSOR
-- CURSORilla k‰yd‰‰n l‰pi ker‰tty‰ resultsetti‰
-- Periaatteessa idea on saada iso RESULT SET, jota voidaan
-- perata tai muuten "s‰‰t‰‰"
-- T‰m‰ varaa muistia, joten se on suuri muistisyˆppˆ

-- T‰ss‰ luodaan pari apumuuttujaa
DECLARE 
	@productname nvarchar(40),
	@unitprice money;

-- Aluksi esitell‰‰n CURSOR
-- joka yhdistet‰‰n SQL lauseeseen (k‰yt‰nnˆss‰ SELECT)
DECLARE cursor_products CURSOR
FOR SELECT
	p.ProductName,
	p.UnitPrice
FROM dbo.Products AS p
ORDER BY p.ProductName;	

-- Seuraavaksi CURSOR avataan
-- T‰llˆin muistia varataan kursorin k‰sitteluun
-- Muistivaraus loppuu vasta kun cursor suljetaan!
OPEN cursor_products;

-- T‰ss‰ vaiheesssa osoitetaan CURSORin (result set) 
-- ensimm‰iseen recordiin.
-- FETCH NEXT lukee t‰m‰n recordin, tulos voidaan tallentaa
-- johonkin muuttujaan
FETCH NEXT FROM cursor_products INTO
	@productname,
	@unitprice;

-- CURSORia luetaan t‰st‰ eteenp‰in kunnes uusia recordeja ei
-- en‰‰ ole result setiss‰ (tarkastus @@FETCH_STATUS).
WHILE @@FETCH_STATUS = 0
	BEGIN
		PRINT @productname + ' --- ' + CONVERT(nvarchar, @unitprice);
		FETCH NEXT FROM cursor_products INTO
			@productname,
			@unitprice;
	END;

-- CURSOR suljetaan, jotta se ei k‰yt‰ muistia
CLOSE cursor_products;

-- CURSORin k‰ytt‰m‰ muistialue vapautetaan
DEALLOCATE cursor_products;

*/

-- TRY CATCH ja error
-- TRY CATCH idea on tehd‰ jotain, jolloin virhe EI saa kaataa konetta
-- esim rajapinnat, koska niiden takana oleville asioille emme voi mit‰‰n.

/*
-- Seuraava esimerkki on siis "v‰‰r‰", koska siin‰ vika on sis‰inen
CREATE OR ALTER PROCEDURE spDivideErrorCheck
	@a decimal(5,2),
	@b decimal(5,2),
	@c decimal(5,2) OUTPUT
AS
BEGIN
	BEGIN TRY
		SET @c = @a / @b;
	END TRY
	BEGIN CATCH
		SELECT ERROR_NUMBER() AS ErrorNumber  
		,ERROR_SEVERITY() AS ErrorSeverity  
		,ERROR_STATE() AS ErrorState  
		,ERROR_PROCEDURE() AS ErrorProcedure  
		,ERROR_LINE() AS ErrorLine  
		,ERROR_MESSAGE() AS ErrorMessage;  
	END CATCH
END
*/

/*
DECLARE @tulos decimal(5,2);

EXECUTE spDivideErrorCheck 22,11, @tulos OUTPUT;
EXECUTE spDivideErrorCheck 22,0, @tulos OUTPUT;

PRINT @tulos;
*/

/*
--
-- TRIGGER
--

-- TRIGGER on stored procedure
-- 1) reagoi INSERT, DELETE tai UPDATE komentoihin taulussa
-- 2) reagoi tietokannan muutoksiin CREATE, ALTER ja DROP
-- 3) reagoi k‰ytt‰jien toimintaan (LOGON)

CREATE OR ALTER TRIGGER <triggername>
ON <taulunnimi>
AFTER {}
AS
BEGIN
	<koodi t‰h‰n>
END

*/

-- luodaan triggeri, joka reagoi INSERT ja DELETE komentoihin Shippers taulussa
-- Tarvitaan audit taulu, johon muutokset otetaan talteen
-- Tarvitaan trigger, joka tallettaa muutokset audit tauluun

/*
-- STEP 1) luodaan auditointitaulu
CREATE TABLE dbo.ShippersAudit (
	-- taululla on aina oltava identity ja primary key
	AuditID int identity primary key,
	-- seuraavat kolme saraketta ovat samat kuin Shippers taulun sarakkeet
	ShipperID int NOT NULL,
	CompanyName nvarchar(40) NOT NULL,
	Phone nvarchar(24) NULL,
	-- talletetaan mik‰ toiminto tehtii shippers tauluun
	Change_time DATETIME NOT NULL,
	Operation char(3) NOT NULL,
	CHECK(operation = 'INS' OR operation = 'DEL')
);
*/

/*
-- 2) Luodaan trigger, joka kiinnitet‰‰n Shippers tauluun
CREATE OR ALTER TRIGGER dbo.trgAuditShippers
ON dbo.Shippers
-- Trigger reagoi INSERT ja DELETE komentoihin
AFTER INSERT, DELETE
AS
BEGIN
-- t‰m‰ komento suppressaa joukon ilmoituksia
-- Nyt alertteja tulee 1 per triggerin k‰yttˆ
	SET NOCOUNT ON;
	-- Talletetaan Shippers taulun kopio audit tauluun
	INSERT INTO dbo.ShippersAudit (
		-- n‰m‰ tiedot ovat Shippers taulusta
		ShipperID,
		CompanyName,
		Phone,
		-- aikaleima
		Change_time,
		-- operaation tyyppi
		Operation
	)
	SELECT
		-- lis‰tyn Shippersin ID insert taulusta
		i.ShipperID,
		-- Shippersin tietoja
		i.CompanyName,
		i.Phone,
		-- Aikaleiman haku tietokantapalvelimelta
		GETDATE(),
		-- Teimme "INS" eli insert operaation
		'INS'
	FROM 
		-- t‰m‰ on v‰liaikainen taulu, joka muodostuu
		-- teht‰ess‰ insert komentoa johonkin tauluun
		-- T‰t‰ seurataan koska trigger on kiinnitteery Shippers tauluun
		inserted as i
	UNION ALL
	SELECT
		-- lis‰tyn Shippersin ID insert taulusta
		d.ShipperID,
		-- Shippersin tietoja
		d.CompanyName,
		d.Phone,
		-- Aikaleiman haku tietokantapalvelimelta
		GETDATE(),
		-- Teimme "DEL" eli delete operaation
		'DEL'
	FROM 
		deleted as d;
END
*/
/*
INSERT INTO dbo.Shippers (CompanyName, Phone)
VALUES ('Testifirma', '123456');

DELETE FROM dbo.Shippers
WHERE ShipperID > 3;
*/

-- INSTEAD OF trigger
-- idea on ett‰ talletus yms toiminta k‰ynnist‰‰ triggerin,
-- joka tekee jotain ihan muuta

-- "perusesimerkki" on talletus viewhin
-- K‰ytt‰j‰ k‰ytt‰‰ viewta
-- Tallettaa siihen, jolloin INSTEAD OF triggeri talletaakin tauluun.
-- k‰yt‰nnˆss‰ tyˆ vaatii seuraavat asiat:
-- luodaan uusi taulu, johon uudet regionit talletetaan
-- luodaan view, jolla uudet ja vanhat regionit n‰ytet‰‰n
-- luodaan viewhin trigger, jolla talletetaan uuteen tauluun



-- 1) Luodaan taulu RegionApprovals
-- T‰ss‰ on ep‰virallisia regioneita, joita ei ole hyv‰ksytty
-- Uusi region lis‰t‰‰n t‰nne
/*
CREATE TABLE dbo.RegionApprovals (
	RegionID int IDENTITY PRIMARY KEY,
	RegionDescription nchar(50) NOT NULL
);
*/
-- 2) Luodaan view, jota k‰ytt‰j‰ k‰ytt‰‰ RegionList
-- k‰ytt‰j‰ tallettaa t‰h‰n, jolloin trigger tallettaa RegionApprovals tauluun
-- Viewssa n‰kyy onko Region virallinen/ei virallinen
/*
CREATE OR ALTER VIEW dbo.RegionList
AS
SELECT
	r.RegionDescription,
	'virallinen' AS region_status
FROM
	dbo.Region AS r
UNION
SELECT
	ra.RegionDescription,
	'ep‰virallinen' AS region_status
FROM
	dbo.RegionApprovals AS ra;
*/
/*
CREATE OR ALTER TRIGGER dbo.trgRegionList
ON dbo.RegionList
-- trigger laukeaa kun viewta yritet‰‰n tallettaa
INSTEAD OF INSERT
AS
BEGIN
	SET NOCOUNT ON;
	-- tallettaa Regionapprovals tauluun
	INSERT INTO dbo.RegionApprovals (RegionDescription)
	SELECT
		i.RegionDescription
	FROM
		inserted AS i
	WHERE
		-- RegionDescription EI saa olla jo Region taulussa
		i.RegionDescription NOT IN (
			SELECT 
				RegionDescription
			FROM
				dbo.Region
		) 
		AND
		-- RegionDescription EI saa olla jo RegionApprovals taulussa
		i.RegionDescription NOT IN (
			SELECT 
				RegionDescription
			FROM
				dbo.RegionApprovals
		) 
END
*/

/*
INSERT INTO dbo.RegionList (RegionDescription)
VALUES ('Oulu');

INSERT INTO dbo.RegionList (RegionDescription)
VALUES ('Pori');

INSERT INTO dbo.RegionList (RegionDescription)
VALUES ('Pori');
*/

-- DDL trigger 
-- T‰llainen trigger on joko tietokannan tai tietokantapalvelimen tasoinen
-- DATABASE tarkoittaa ett‰ se on tietokannan tasoinen

-- Helppo tapaus on indeksien tarkistus
-- Tarvitaan taulu, johon indeksien tiedot talletetaan
-- trigger tietokannan tasolle, joka t‰ytt‰‰ taulun
/*
-- 1) Luodaan taulu, johon index eventit logitetaan
CREATE TABLE dbo.IndexLog (
	LogID int IDENTITY PRIMARY KEY,
	IndexEvent XML NOT NULL,
	EventTime DATETIME NOT NULL,
	Creator SYSNAME NOT NULL
);
*/
/*
-- 2) Luodaan triggeri tietokannalle
CREATE OR ALTER TRIGGER trgIndexAlert
ON DATABASE
FOR
	CREATE_INDEX, ALTER_INDEX, DROP_INDEX
AS
BEGIN
	SET NOCOUNT ON;
	INSERT INTO dbo.IndexLog (
		IndexEvent,
		EventTime,
		Creator
	)
	VALUES (
		EVENTDATA(),
		GETDATE(),
		USER
	);
END
*/

/*
CREATE NONCLUSTERED INDEX nidxFirstName
ON dbo.Employees (FirstName);

CREATE NONCLUSTERED INDEX nidxLastName
ON dbo.Employees (LastName);

DROP INDEX dbo.Employees.nidxFirstName;

DROP INDEX dbo.Employees.nidxLastName;
*/

-- 1) Iltap‰iv‰n teht‰v‰
-- Tee triggeri Region tauluun, joka reagoi kun tauluun lis‰t‰‰n jotain.
-- Talleta tieto RegionAudit tauluun
/*
-- STEP 1) luodaan auditointitaulu
CREATE TABLE dbo.RegionAudit (
	AuditID int identity primary key,
	RegionID int NOT NULL,
	RegionDescription nchar(50) NOT NULL,
	Change_time DATETIME NOT NULL,
	Operation char(3) NOT NULL,
	CHECK(operation = 'INS')
);
*/

/*
-- 2) Luodaan trigger, joka kiinnitet‰‰n tauluun
CREATE OR ALTER TRIGGER dbo.trgAuditRegion
ON dbo.Region
AFTER INSERT
AS
BEGIN
	SET NOCOUNT ON;
	INSERT INTO dbo.RegionAudit (
		RegionID,
		RegionDescription,
		Change_time,
		Operation
	)
	SELECT
		i.RegionID,
		RegionDescription,
		GETDATE(),
		'INS'
	FROM 
		inserted as i
END
*/
/*
INSERT INTO dbo.Region (RegionID, RegionDescription)
VALUES (111,'Pohjanmaa');

INSERT INTO dbo.Region (RegionID, RegionDescription)
VALUES (112,'Satakunta');
*/
