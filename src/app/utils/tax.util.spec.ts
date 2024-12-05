import { computeTaxValue, customsArround } from "./tax.util";

describe('Tax util', () => {
  it('Build Tax value with category not exists', () => {
    expect(computeTaxValue('NoExists', false, 0)).toEqual(0);
  });
  it('Build Tax value with Food/Medecine category', () => {
    expect(computeTaxValue('Food', false, 0)).toEqual(0);
    expect(computeTaxValue('Food', false, 5)).toEqual(0);
    expect(computeTaxValue('Food', true, 0)).toEqual(0);
    expect(computeTaxValue('Food', true, 5)).toEqual(0.25);
  });
  it('Build Tax value with Electric/Parfum category', () => {
    expect(computeTaxValue('Electric', false, 0)).toEqual(0);
    expect(computeTaxValue('Electric', false, 5)).toEqual(1);
    expect(computeTaxValue('Electric', true, 0)).toEqual(0);
    expect(computeTaxValue('Electric', true, 5)).toEqual(1.25);
  });
  it('Build Tax value with Books category', () => {
    expect(computeTaxValue('Books', false, 0)).toEqual(0);
    expect(computeTaxValue('Books', false, 5)).toEqual(0.5);
    expect(computeTaxValue('Books', true, 0)).toEqual(0);
    expect(computeTaxValue('Books', true, 5)).toEqual(0.75);
  });
  it('Customs around to 0.5', () => {
    expect(customsArround(1.9)).toEqual(1.90)
    expect(customsArround(1.01)).toEqual(1.05)
    expect(customsArround(0.99)).toEqual(1)
    expect(customsArround(1.58)).toEqual(1.60)
    expect(customsArround(0.75)).toEqual(0.75)
  });
});
