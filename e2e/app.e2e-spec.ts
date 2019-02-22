import { YummyPage } from './app.po';

describe('yummy App', () => {
  let page: YummyPage;

  beforeEach(() => {
    page = new YummyPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
