
use Northwind;

/*

SQL tietokannan performanssin kannalta t‰rkein asia on hyvin tehty indeksointi. Lue seuraavassa j‰rjestyksess‰:
https://stackoverflow.com/questions/1108/how-does-database-indexing-work
http://opensourceforgeeks.blogspot.fi/2017/05/how-does-database-indexing-work.html
http://opensourceforgeeks.blogspot.fi/2017/09/understanding-database-indexes-part-2.html
https://stackoverflow.com/questions/1156/how-do-i-index-a-database-column

Paras yksitt‰inen l‰hde indeksointiin:
https://use-the-index-luke.com/

https://www.geeksforgeeks.org/nosql-data-architecture-patterns/

https://github.com/microsoft/sql-server-samples/tree/master/samples/databases/northwind-pubs
*/

-- Tehd‰‰n CLUSTERED INDEX
-- K‰ytet‰‰n jotain taulua, jolle tehd‰‰n index
/*
-- STEP 1) Tehd‰‰n oma taulu, johon lis‰t‰‰n roskaa
CREATE TABLE dbo.IndexTest (
	TestID int NOT NULL,
	TestName varchar(50)
);
*/
/*
INSERT INTO dbo.IndexTest (TestID, TestName)
VALUES
	(111,'Tupu'),
	(112,'Hupu'),
	(113,'Lupu'),
	(114,'Aku'),
	(115,'Iines');
*/

-- STEP 2) haetaan tietoa ja katsotaan nopeutta
-- Display estimated execution plan
-- ƒl‰ aja seuraavaa koodia
/*
SELECT 
	it.TestID,
	it.TestName
FROM dbo.IndexTest as it;
*/
-- STEP 3) lis‰t‰‰n prim‰‰ri avain ja sitten index
/*
ALTER TABLE dbo.IndexTest
ADD PRIMARY KEY(TestID);
*/
/*
CREATE CLUSTERED INDEX ixTestName 
ON dbo.IndexTest (TestName);
*/
-- STEP 4) haetaan tietoa ja katsotaan nopeutta
/*
SELECT 
	TestID,
	TestName
FROM dbo.IndexTest 
WHERE TestID = 113;
*/

-- Esimerkki 2

SELECT 
	TestID,
	TestName
FROM dbo.IndexTest 
WHERE TestName = 'Aku';

/*
CREATE INDEX ixTestName 
ON dbo.IndexTest (TestName);
*/




