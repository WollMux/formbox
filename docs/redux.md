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

## Redux Developer Tool

FormBox unterstützt die [Redux DevTools Extension](https://github.com/zalmoxisus/redux-devtools-extension) für Firefox und Chrome. Dafür muss FormBox im Browser gestartet werden.
Wenn die Extension installiert ist, hat das Kontextmenü des Browsers einen Eintrag 'Redux DevTools' über den man die DevTools öffnen kann.

## Dokumentation

* [Redux](https://redux.js.org/)
* [angular-redux/store](https://github.com/angular-redux/store)
* [Tutorial](https://github.com/angular-redux/store/blob/master/articles/intro-tutorial.md)
