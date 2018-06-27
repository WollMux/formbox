# Redux

FormBox verwendet [Redux](https://redux.js.org/), um den internen Status der Anwendung zu verwalten.

Der Status der Anwendung wird in einem Map-Objekt (FormBoxState) gespeichert. Das Statusobjekt kann beliebige Werte enthalten und kann mit anderen Objekten gegliedert werden. Statusobjekte können beliebig geschachtelt werden.

Der Status ist immutable und darf nur durch sogenannte Reducer verändert werden. Die Reducer werden analog zu den Statusobjekten geschachtelt. Bei jeder Änderung des Status wird eine Kopie des Objekts erzeugt und an Redux zurückgegeben. Mit der Funktion [tassign](https://github.com/angular-redux/tassign) können einzelne Werte in der Map verändert werden, wobei zugleich eine Kopie des gesamten Statusobjekts erzeugt wird.
Reducer verändern nur den Status und dürfen keine Geschäftslogik enthalten.

Statusänderungen werden durch Aktionen angestossen. Eine Aktion besteht aus einem Namen und einer Payload. Die Payload kann beliebige Informationen enthalten.
Im Reducer kann jede Aktion mit einer Funktion verbunden werden, die den Status verändert.

Die Anwendung kann zwei Methoden verwenden, um auf Aktionen und Statusänderungen zu reagieren.

Mit [Selektoren](https://github.com/angular-redux/store/blob/master/articles/select-pattern.md) kann die Anwendung direkt auf Änderungen des Status reagieren. Ein Selektor erzeugt ein Observable für einen bestimmten Zweig des Statusobjekts. Ein Observable funktioniert im Prinzip wie ein Eventhandler. Selektoren können in Angular direkt an die GUI angebunden werden.

Die zweite Methode verwendet sogenannte [Epics](https://github.com/angular-redux/store/blob/master/articles/epics.md). Ein Epic ist eine [Middleware](https://redux.js.org/docs/advanced/Middleware.html), die nach einer Aktion aber vor der Statusänderung aufgerufen wird. Jedes Epic ist mit einer Aktion verknüpft.
Epics dürfen Geschäftslogik enthalten und können ihrerseits Aktionen auslösen. Dadurch können Aktionen miteinander verkettet werden. Epics sind dazu da asynchrone Abläufe zu synchronisieren. Über Epics kann sichergestellt werden, das asynchrone Abläufe in einer bestimmten Reihenfolge ausgeführt werden.
Der Rückgabewert eines Epics besteht aus einem Observable, das eine oder mehrere Aktionen enthält.

Da alle Funktionen in office.js asynchron sind, müssen alle Interaktionen mit MS Office über Epics ablaufen.

FormBox verwendet [typescript-fsa](https://github.com/aikoven/typescript-fsa), um typsichere Aktionen zu erzeugen.

Für die Epics wird [redux-observable](https://github.com/redux-observable/redux-observable) verwendet.

## Redux Generator

Zum schnellen Erstellen von den für Redux benötigten Klassen gibt es einen Generator.

`npm run gen-redux -- <name>`

Mit dem Befehl werden Dateien für State, Actions, Reducers, und Epics angelegt.
Das Argument `<name>` wird dabei als Basis für die Namen der Dateien und Klassen
verwendet.

## Redux Remote Developer Tool

FormBox unterstützt die [Redux DevTools Extension](https://github.com/zalmoxisus/redux-devtools-extension) für Firefox und Chrome.
Wenn die Extension installiert ist, hat das Kontextmenü des Browsers einen Eintrag `'Redux DevTools' -> 'Open Remote DevTools'` über den man die DevTools öffnen kann.

Damit Redux-Remote-Debugging funktioniert muss eine Instanz von remotedev-server auf einem Server mit NodeJs-Installation gestartet werden.

Folgende NPM-Pakete müssen global installiert werden:

 `npm install -g remotedev-server`
 `npm install -g socketcluster`

Remote-Server starten: `remotedev --hostname=0.0.0.0 --port=12556 --protocol=https --key=/pfad_cert_key/cert.key --cert=/pfad_cert_crt/cert.crt &`

Hinweis: Evtl. muss der Port durch Portfreigabe/Firewall freigegeben werden.

Formbox baut beim Start eine Verbindung (Websockets) mit dem remotedev-server auf. Remotedev-server reicht die entsprechenden Daten an die Client-Anwendung "Redux Remote DevTools" weiter.

#### Konfiguration Redux-Remote-DevTool

###### Settings:

 `Hostname: SERVER_URL`
 `Port: 12556`
 `Use Secure connection: AN`

 Für eine erfolgreiche Verbindung zum remotedev-server benötigt Formbox ebenfalls Verbindungsdaten welche
 über environment-Variablen gesetzt werden.
 Durch setzen der environment-Variable 'reduxRemoteName' kann im RemoteDev-Tool die entsprechende Instanz (bei 'Autoselect instances') gewählt werden.

## Dokumentation

* [Redux](https://redux.js.org/)
* [Redux RemoteDev-Server](https://github.com/zalmoxisus/remotedev-server)
* [angular-redux/store](https://github.com/angular-redux/store)
* [Tutorial](https://github.com/angular-redux/store/blob/master/articles/intro-tutorial.md)
* [Ribosome](http://sustrik.github.io/ribosome/) (Codegenerator)
