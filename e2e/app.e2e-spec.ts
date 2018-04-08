import { WhatslynncodingPage } from './app.po';

describe('whatslynncoding App', function() {
  let page: WhatslynncodingPage;

  beforeEach(() => {
    page = new WhatslynncodingPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
