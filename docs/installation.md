# Installation

## angular-cli

[Node.js](https://nodejs.org) muss installiert sein.

`npm install -g @angular/cli`

Installiert [angular-cli](https://github.com/angular/angular-cli).

`npm install`

Installiert alle Abhängigkeiten des Projekts.

## Einstellungen

### Internet Explorer

Unter Extras/Internetoptionen/Erweitert/Einstellungen/Browsen müssen die Checkboxen *Skriptdebugging deaktivieren (Andere)* und *Skriptdebugging deaktivieren (Internet Explorer)* abgeschaltet sein.

Das Zertifikat für SSL muss im Internet Explorer installiert werden. ([Anleitung](https://server.arcgis.com/de/server/10.3/administer/linux/suppress-warnings-from-self-signed-certificates.htm))

### Microsoft Office

Microsoft Office muss auf das Manifest `manifest/formbox-manifest.xml` zugreifen können. Dazu muss der Ordner `manifest` im Netzwerk freigegeben werden ([Anleitung](http://praxistipps.chip.de/ordner-fuer-netzwerk-freigeben-so-funktionierts_19213)).

Der Netzwerkpfad der Freigabe muss in Microsoft Office als Trusted Catalog registriert werden (`File/Options/Trust Center/Trust Center Settings/Trusted Add-In Catalogs`).

Anschließend kann das Add-In über das Einfügen-Menü zu einem neuen Dokument hinzugefügt werden.

## Starten des Servers

`npm start`

Startet den Entwicklungsserver auf `https://localhost:4200/`.

`npm run nooffice`

Startet den Server ohne Anbindung an MS Office. Das Add-On kann über einen Browser aufgerufen werden.

## Redux DevTools

Wenn die Anwendung mit `nooffice` (s.o.) gestartet wird, muss im Browser die Extension [Redux DevTools](https://github.com/zalmoxisus/redux-devtools-extension) installiert sein.
Nach der Installation können die DevTools über das Kontextmenü (rechte Maustaste im Browserfenster) aufgerufen werden.
