import { Injectable } from '@angular/core';
import { Logger } from '@nsalaun/ng-logger';
import { environment } from '../../environments/environment';
import { Http, ResponseContentType } from '@angular/http';

/**
 * Service für die Formbox-Bar.
 */
@Injectable()
export class BarService {
    private formboxapi: string;

    constructor(private log: Logger, private http: Http) {
        this.formboxapi = environment.formboxapi;
    }

    /**
     * Lädt eine Liste aller serverseitig gespeicherten Dokumente.
     *
     * @returns Treeviewstruktur als Javascript-Array
     */
    async getBar(): Promise<any[]> {
        this.log.debug('BarService.getBar()');

        return this.http.get(`${this.formboxapi}/formboxbar`, { responseType: ResponseContentType.Json })
            .toPromise()
            .then(res => {
                return res.json();
            })
            .catch(error => {
                this.log.error(error);

                return undefined;
            });
    }
}
