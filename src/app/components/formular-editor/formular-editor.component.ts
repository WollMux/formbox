import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/shareReplay';
import { Logger } from '@nsalaun/ng-logger';
import { ITreeOptions, TREE_ACTIONS, TreeComponent, TreeNode } from 'angular-tree-component';
import { select, select$ } from '@angular-redux/store';
import { FormularEditorActions } from '../../store/actions/formular-editor-actions';
import { Form } from '../../data/forms/form';
import { Subscription } from 'rxjs/Subscription';
import { formularEditorReducer } from '../../store/reducers/formular-editor-reducer';
import { Tab } from '../../data/forms/tab';
import { Container } from '../../data/forms/container';
import { Tabs } from '../../data/forms/tabs';

@Component({
  selector: 'app-formular-editor',
  templateUrl: './formular-editor.component.html',
  styleUrls: ['./formular-editor.component.css']
})
export class FormularEditorComponent implements OnInit, OnDestroy {

  @ViewChild('tree') tree: TreeComponent;
  @select$(['formularEditor', 'form'], ob => ob.shareReplay()) form: Observable<Form>;
  @select(['formularEditor', 'isEdit']) isEdit: Observable<string[]>;

  options: ITreeOptions = {
    idField: 'id',
    displayField: 'title',
    childrenField: 'controls',
    allowDrag: node => {
      return !node.isRoot;
    },
    allowDrop: (element, { parent, index }) => {
      if (element.data instanceof Tab || element.type === 'tab') {
        return parent.data instanceof Tabs;
      } else {
        return !(parent.data instanceof Tabs) && ((parent.data instanceof Container) || (parent.data instanceof Form));
      }
    },
    actionMapping: {
      mouse: {
        drop: (tree, node, $event, {from, to}) => {
          // Es muss zwischen den Fällen if) neues Control und else) Control verschieben unterschieden werden
          if (from.type) {
            this.actions.add(from.type, to.parent.data.id, to.index);
          } else {
            this.actions.move(from.data, to.parent.data.id, to.index);
          }
        }
      }
    }
  };

  private subscription: Subscription;

  constructor(
    private log: Logger,
    private actions: FormularEditorActions
  ) {
  }

  ngOnInit(): void {
    this.subscription = this.form.subscribe(form => {
      if (this.tree && this.tree.treeModel) {
        this.tree.treeModel.update();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  showEditor(id: any): void {
    this.actions.edit(id);
  }

  hideEditor(id: any): void {
    this.actions.hide(id);
  }

  update(value: any): void {
    this.actions.update(value);
  }

  remove(node: TreeNode): void {
    this.actions.remove(node.data.id, node.data.ccid);
  }

  createForm(): void {
    this.actions.create();
  }

  addTab(node: TreeNode): void {
    this.actions.add('tab', node.data.id, node.children.length);
    node.expand();
  }
}
