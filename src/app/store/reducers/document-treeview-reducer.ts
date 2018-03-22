import { Reducer } from 'redux';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { tassign } from 'tassign';
import { Success } from 'typescript-fsa';

import { DocumentTreeViewState, INITIAL_STATE } from '../states/document-treeview-state';
import { DocumentTreeViewActions } from '../actions/document-treeview-actions';

const getTemplateList = (state: DocumentTreeViewState, tree: any[]): DocumentTreeViewState => {
    return tassign(state, { tree: tree });
};

export const documentTreeViewReducer: Reducer<DocumentTreeViewState> = reducerWithInitialState(INITIAL_STATE)
    .case(DocumentTreeViewActions.GET_TREEVIEW_NODES.done, (state, result) => getTemplateList(state, result.result))
    .build();
