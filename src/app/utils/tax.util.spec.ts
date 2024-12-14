import { computeTaxValue, customsArround } from "./tax.util";

describe('Tax Utility Functions', () => {
  describe('computeTaxValue', () => {

    it('returns 0 when category does not exist', () => {
      expect(computeTaxValue('NoExists', false, 0)).toEqual(0);
    });

    it('calculates tax for Food/Medicine category', () => {
      expect(computeTaxValue('Food', false, 0)).toEqual(0);
      expect(computeTaxValue('Food', false, 5)).toEqual(0);
      expect(computeTaxValue('Food', true, 0)).toEqual(0);
      expect(computeTaxValue('Food', true, 5)).toEqual(0.25);
    });

    it('calculates tax for Electric/Perfume category', () => {
      expect(computeTaxValue('Electric', false, 0)).toEqual(0);
      expect(computeTaxValue('Electric', false, 5)).toEqual(1);
      expect(computeTaxValue('Electric', true, 0)).toEqual(0);
      expect(computeTaxValue('Electric', true, 5)).toEqual(1.25);
    });
    
    it('calculates tax for Books category', () => {
      expect(computeTaxValue('Books', false, 0)).toEqual(0);
      expect(computeTaxValue('Books', false, 5)).toEqual(0.5);
      expect(computeTaxValue('Books', true, 0)).toEqual(0);
      expect(computeTaxValue('Books', true, 5)).toEqual(0.75);
    });
  });

  describe('customsArround', () => {
    it('rounds values correctly to the nearest 0.05', () => {
      expect(customsArround(1.9)).toEqual(1.90)
      expect(customsArround(1.01)).toEqual(1.05)
      expect(customsArround(0.99)).toEqual(1)
      expect(customsArround(1.58)).toEqual(1.60)
      expect(customsArround(0.75)).toEqual(0.75)
    });
  });
});
