/*
 *	Sequence
 */
CREATE SEQUENCE tutorial_seq
INCREMENT BY 2
START WITH 1000
CACHE 3
NO CYCLE;

SELECT NEXTVAL('tutorial_seq');

CREATE TABLE stud(
	name	VARCHAR(20),
	grade 	INT DEFAULT 2,
	rno 	INT NOT NULL DEFAULT nextval('tutorial_seq'));
	
--when delete table or column, the sequence automatically deleted
ALTER SEQUENCE tutorial_seq OWNED BY stud.rno;

INSERT INTO stud (name, GRADE, rno) values ('Person1', 5, 10);

SELECT * FROM stud;

INSERT INTO stud values ('person2'), ('person3'), ('person4');

SELECT * FROM stud;

DROP TABLE stud;

--Error
SELECT NEXTVAL('tutorial_seq');


/*
 * ENUM
 */
 
 CREATE TYPE SHORT_DAY AS ENUM (
	'SUN',
	'MON',
	'TUE',
	'WED',
	'THU',
	'FRI',
	'SAT'
 );

 CREATE TABLE tutorial_enum (
	incident_number SERIAL,
	incident_day SHORT_DAY
 );
 
 SELECT * FROM tutorial_enum_incident_number_seq;  
 
 INSERT INTO tutorial_enum (incident_day) VALUES ('WED'), ('MON'),('FRI');
 
 SELECT * FROM tutorial_enum WHERE incident_day  >= 'WED';
 
 --Error
 INSERT INTO tutorial_enum (incident_day) VALUES ('fri')
 
 
 /*
  * UUID
  */
  
CREATE EXTENSION "uuid-ossp";

SELECT UUID_GENERATE_V4() AS one, UUID_GENERATE_V4() AS two;

CREATE TABLE tutorial_uuid(rno INT, uid UUID DEFAULT UUID_GENERATE_V4());

INSERT INTO tutorial_uuid (rno) VALUES (1);

SELECT * FROM tutorial_uuid;

/*
 * Arrays
 */
 
 CREATE TABLE tutorial_arrays (name varchar(10), grade_percentage INT[][]);
 
 INSERT INTO tutorial_arrays (name, grade_percentage) VALUES
	('nages', '{{1,90},{2,93},{3,40}}'),
	('vijay', '{{1,30}, {2,100}, {3,100}}')

SELECT * FROM tutorial_arrays 
SELECT grade_percentage[1:3][2:2] FROM tutorial_arrays
SELECT grade_percentage[1:3][2:2] FROM tutorial_arrays WHERE grade_percentage[2][2] > 93

 
/*
 * Composite types
 */
 
 CREATE TYPE complex_number AS (
	r INT,
	i INT
);

CREATE TABLE tutorial_composite_types(sno INT, c_no COMPLEX_NUMBER);

INSERT INTO tutorial_composite_types  VALUES (1, ROW(2,3));
INSERT INTO tutorial_composite_types  VALUES (1, ROW(4,2));

SELECT * FROM tutorial_composite_types;
SELECT * FROM tutorial_composite_types WHERE (c_no).i > (c_no).r

