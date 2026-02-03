import { describe, it, expect } from 'vitest';
import {getCurrentYear, add, isWithinRange, isDateBefore, isSameDay, getHolidays, isHoliday} from "../dateUtils";
import { DATE_UNIT_TYPES } from "../constants";

describe("Date Utils", () => {

  describe("getCurrentYear", () => {
    it("should return the current year", () => {
      const currentYear = new Date().getFullYear();
      expect(getCurrentYear()).toBe(currentYear);
    });
  })

  describe("add", () => {
    it("should add days by default", () => {
      const date = new Date(2024, 0, 1); // Jan 1, 2024
      const result = add(date, 5);
      expect(result.getDate()).toBe(6);
      expect(result.getMonth()).toBe(0);
      expect(result.getFullYear()).toBe(2024);
    });

    it("should add weeks", () => {
      const date = new Date(2024, 0, 1);
      const result = add(date, 2, DATE_UNIT_TYPES.WEEKS);
      expect(result.getDate()).toBe(15);
    });

    it("should add months", () => {
      const date = new Date(2024, 0, 15);
      const result = add(date, 3, DATE_UNIT_TYPES.MONTHS);
      expect(result.getMonth()).toBe(3); // April
    });

    it("should add years", () => {
      const date = new Date(2024, 5, 15);
      const result = add(date, 2, DATE_UNIT_TYPES.YEARS);
      expect(result.getFullYear()).toBe(2026);
    });

    it("should handle negative amounts", () => {
      const date = new Date(2024, 0, 15);
      const result = add(date, -5);
      expect(result.getDate()).toBe(10);
    });

    it("should throw error for invalid date", () => {
      expect(() => add("not a date", 5)).toThrow('Invalid date provided');
      expect(() => add(null, 5)).toThrow('Invalid date provided');
      expect(() => add(new Date('invalid'), 5)).toThrow('Invalid date provided');
    });

    it("should throw error for invalid amount", () => {
      const date = new Date(2024, 0, 1);
      expect(() => add(date, "5")).toThrow('Invalid amount provided');
      expect(() => add(date, NaN)).toThrow('Invalid amount provided');
      expect(() => add(date, null)).toThrow('Invalid amount provided');
    });
  })
});


