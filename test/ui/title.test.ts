import { expect } from 'chai';
import { browser } from 'protractor';

describe('Given a SDET learning protractor', () => {
  describe('when open Google Page', () => {
    before(async () => {
      await browser.get('http://host.docker.internal:8080');
    });
    after(async () => {
      // borrar usuario
    });

    it('then should have a title', async () => {
      expect(await browser.getTitle()).to.equal('Atsea Shop');
    });
  });
});
