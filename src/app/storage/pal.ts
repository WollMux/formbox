/**
 * Beschreibt die Struktur der Persönlichen Absenderliste.
 * 
 * Wird nur für Typinformationen benötigt.
 */
export interface Absender {
  id?: number;
  nachname: string;
  vorname: string;
  anrede: string;
  titel: string;
  strasse: string;
  postPLZ: string;
  postOrt: string;
  telefon: string;
  fax: string;
  email: string;
  dienstgebaeude: string;
  zimmer: string;
}
