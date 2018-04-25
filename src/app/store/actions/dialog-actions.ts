import { Injectable } from '@angular/core';
import actionCreatorFactory, { Action } from 'typescript-fsa';
import { NgRedux } from '@angular-redux/store';
import { FormBoxState } from '../states/formbox-state';

const actionCreator = actionCreatorFactory();

/**
 * Aktionen, die die Verarbeitung der Dokumenten-Treeview betreffen.
 */
@Injectable()
export class DialogActions {
    static DISPLAY_DIALOG = actionCreator<{url: string, height: number, width: number}>('DISPLAY_DIALOG');

    constructor(private ngRedux: NgRedux<FormBoxState>) { }

    displayDialog(url: string, height: number, width: number): Action<any> {
        const action = DialogActions.DISPLAY_DIALOG({url, height, width});

        return this.ngRedux.dispatch(action);
    }
}
