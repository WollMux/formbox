/**
 * Beschreibt die Struktur der Persönlichen Absenderliste.
 *
 * Wird nur für Typinformationen benötigt.
 */
export class Absender {
  id?: number;
  uid: string;
  vorname: string;
  nachname: string;
  anrede: string = undefined;
  titel: string = undefined;
  telefon: string = undefined;
  orgaTelefon: string = undefined;
  orgaFax: string = undefined;
  fax: string = undefined;
  zimmer: string = undefined;
  mail: string = undefined;
  dienstBezKurz: string = undefined;
  zustaendigkeit: string = undefined;
  funktion: string = undefined;
  referat: string = undefined;
  oberOrga: string = undefined;
  orgaName: string = undefined;
  orgaKurz: string = undefined;
  rolle: string = undefined;
  orgaLang: string = undefined;
  postanschrift: string = undefined;
  postPLZ: string = undefined;
  postOrt: string = undefined;
  dienstgebaeude: string = undefined;
  dienstgebaeudePLZ: string = undefined;
  dienstgebaeudeOrt: string = undefined;
  orgaEmail: string = undefined;
  oeffungszeiten: string = undefined;
  persErreichbarkeit: string = undefined;
  OID: string = undefined;
}
