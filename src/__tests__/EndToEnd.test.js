import { expect } from '@jest/globals';
import puppeteer from 'puppeteer';

describe('show/hide event details', () => {
    let browser;
    let page;
    beforeAll(async () => {
      browser = await puppeteer.launch();
      page = await browser.newPage();
      await page.goto('http://localhost:3000/');
      await page.waitForSelector('.event-container');
    });
  
    afterAll(() => {
      browser.close();
    });
  
    test('An event element is collapsed by default', async () => {
      const eventDetails = await page.$('.event-container .details');
      expect(eventDetails).toBeNull();
    });
  
    test('User can expand an event to see details', async () => {
      await page.click('.event-container .details-button');
      const eventDetails = await page.$('.event-container .details');
      expect(eventDetails).toBeDefined();
    });

    test('User can collapse an event to hide details', async () => {
        await page.click('.event-container .details-button');
        const eventDetails = await page.$('.event-container .details');
        expect(eventDetails).toBeNull();
      });
  });