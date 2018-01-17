import { browser, by, element, promise } from 'protractor'; // tslint:disable-line

export class AppPage {
  navigateTo(): promise.Promise<string> {
    return browser.get('/');
  }

  getParagraphText(): promise.Promise<string> {
    return element(by.css('app-root h1')).getText();
  }
}
