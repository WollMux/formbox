import { Component, OnInit } from '@angular/core';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { DocumentTreeViewActions } from '../../store/actions/document-treeview-actions';
import { TemplateActions } from '../../store/actions/template-actions';
import { OfficeService } from '../../services/office.service';
import { ITreeOptions, KEYS, TREE_ACTIONS } from 'angular-tree-component';
import { ITreeNode } from 'angular-tree-component/dist/defs/api';
import { Logger } from '@nsalaun/ng-logger';
import { Router } from '@angular/router';
import { TemplateService } from '../../services/template.service';

@Component({
  selector: 'app-document-treeview',
  templateUrl: './document-treeview.component.html',
  styleUrls: ['./document-treeview.component.css']
})
export class DocumentTreeviewComponent implements OnInit {
  @select(['documentTree', 'tree']) documentTree: Observable<any[]>;

  options: ITreeOptions = {
    isExpandedField: 'expanded',
    actionMapping: {
      keys: {
        [KEYS.ENTER]: (tree, node, $event) => {
          node.expandeAll();
        }
      }
    },
    allowDrag: (node: ITreeNode) => {
      return true;
    },
    allowDrop: (element, { parent, index }) => {
      return true;
    },
    animateExpand: true,
    animateSpeed: 10,
    animateAcceleration: 1.2
  };

  constructor(
    private log: Logger,
    private router: Router,
    private treeActions: DocumentTreeViewActions,
    private templateActions: TemplateActions,
    private templateService: TemplateService,
    private officeService: OfficeService
  ) { }

  async ngOnInit(): Promise<void> {
    this.treeActions.getTemplateList();
  }

  showThumb = (node: ITreeNode) => {
    this.showDialog(node.data.name);
  }

  nodeClicked = (node: ITreeNode) => {
    this.templateService.getTemplateUrl(node.data.name).then(url => {
      this.log.debug(url);
      this.templateService.getFileAsBase64(url).then(base64 => {
        this.templateActions.openTemplate(base64);
      });
    });
  }

  getNodeIsExpandedClass = (node: ITreeNode): any => {
    if (node.isExpanded) {
      return 'glyphicon glyphicon-minus';
    }

    return 'glyphicon glyphicon-plus';
  }

  isRootNode = (node: ITreeNode): any => {
    if (node.isRoot) {
      return 'root-node';
    }
  }

  nodeDblClick = (tree, node, $event) => {
    if (node.hasChildren) {
      TREE_ACTIONS.TOGGLE_EXPANDED(tree, node, $event);
    }
  }

  showDialog(name: string): void {
    const baseUrl = `${location.protocol}//${location.hostname}:${location.port}`;
    let url = '';

    switch (name) {
      case 'Externer Briefkopf':
        url = `${baseUrl}/assets/html_thumbs/externer_briefkopf.html`;
        break;

        default:
        break;
    }

    this.officeService.openDialog(url, 80, 30);
  }
}
