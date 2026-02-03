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

  describe("isWithinRange", () => {

    it("should return true when the range is in range", () => {
      const date = new Date(2024, 0, 3);
      const fromDate = new Date(2024, 0, 1);
      const toDate = new Date(2024, 0, 5);
      expect(isWithinRange(date, fromDate, toDate)).toBe(true)
    })

    it("should return false when the range is in range", () => {
      const date = new Date(2024, 0, 1);
      const fromDate = new Date(2024, 0, 3);
      const toDate = new Date(2024, 0, 5);
      expect(isWithinRange(date, fromDate, toDate)).toBe(false);
    })

    it("should throw error when fromDate is after toDate", () => {
      const date = new Date(2024, 0, 1);
      const fromDate = new Date(2024, 0, 6);
      const toDate = new Date(2024, 0, 5);

      expect(() => isWithinRange(date,fromDate,toDate)).toThrow();

    })
  })

  describe("isDateBefore", () => {
    it("should return true when the date is before the comparison ", () => {
      const date = new Date(2024, 0, 1);
      const compareDate = new Date(2024, 0, 5);
      expect(isDateBefore(date,compareDate)).toBe(true);
    })
    it("should return false when the date is before the comparison and is the same day", () => {
      const date = new Date(2024, 0, 1);
      const compareDate = new Date(2024, 0, 1);
      expect(isDateBefore(date,compareDate)).toBe(false);
    })

    it("should return false when the date is after the comparison", () => {
      const date = new Date(2024, 0, 5);
      const compareDate = new Date(2024, 0, 1);
      expect(isDateBefore(date,compareDate)).toBe(false);
    })
  })
});


