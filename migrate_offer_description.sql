-- Migration pour changer le type de la colonne description de VARCHAR à TEXT
ALTER TABLE offers ALTER COLUMN description TYPE TEXT;
