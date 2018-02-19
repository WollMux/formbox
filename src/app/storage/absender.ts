/**
 * Beschreibt die Struktur der Persönlichen Absenderliste.
 * 
 * Wird nur für Typinformationen benötigt.
 */
export interface Absender {
  id?: number;
  uid: string;
  vorname: string;
  nachname: string;
  anrede?: string;
  titel?: string;
  telefon?: string;
  orgaTelefon?: string;
  orgaFax?: string;
  fax?: string;
  zimmer?: string;
  mail?: string;
  dienstBezKurz?: string;
  zustaendigkeit?: string;
  funktion?: string;
  referat?: string;
  oberOrga?: string;
  orgaName?: string;
  rolle?: string;
  orgaLang?: string;
  postanschrift?: string;
  postPLZ?: string;
  postOrt?: string;
  dienstgebaeude?: string;
  dienstgebaeudePLZ?: string;
  dienstgebaeudeOrt?: string;
  orgaEmail?: string;
  oeffungszeiten?: string;
  persErreichbarkeit?: string;
  OID?: string;
}
