import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {getCurrentYear, add, isWithinRange, isDateBefore, isSameDay, getHolidays, isHoliday} from "../dateUtils";
import { DATE_UNIT_TYPES } from "../constants";

describe("Date Utils", () => {

  describe("getCurrentYear", () => {
    beforeEach(() => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date(2024, 5, 15)); // June 15, 2024
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it("should return the current year", () => {
      expect(getCurrentYear()).toBe(2024);
    });
  });

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

  describe("isSameDay", () => {
    it("should return true if the date is the same", () => {
      const date = new Date(2024, 1, 1);
      const compareDate = new Date(2024, 1, 1);
      expect(isSameDay(date, compareDate)).toBe(true);
    })
    it("should return false if the years are different", () => {
      const date = new Date(2026, 1, 1);
      const compareDate = new Date(2024, 1, 1);
      expect(isSameDay(date, compareDate)).toBe(false);
    })
    it("should return false if the months are different", () => {
      const date = new Date(2024, 2, 1);
      const compareDate = new Date(2024, 1, 1);
      expect(isSameDay(date, compareDate)).toBe(false);
    })
    it("should return false if the days are different", () => {
      const date = new Date(2024, 1, 2);
      const compareDate = new Date(2024, 1, 1);
      expect(isSameDay(date, compareDate)).toBe(false);
    })
  })

  describe("getHolidays", () => {
    it("should return holidays with correct year", async () => {
      const holidays = await getHolidays(2025);

      holidays.forEach((holiday) => {
        expect(holiday.getFullYear()).toBe(2025);
      });
    });

    it("should return all holidays", async () => {
      const holidays = await getHolidays(2025);
      expect(holidays).toHaveLength(3);
      expect(holidays[0]).toEqual(new Date(2025, 0, 1));
      expect(holidays[1]).toEqual(new Date(2025, 11, 25));
      expect(holidays[2]).toEqual(new Date(2025, 11, 31));
    })


  })

  describe(isHoliday, () => {

    it("should return true if a date is a holiday", async () => {
      const holyday_1 = new Date(2024, 0, 1);
      const holyday_2 = new Date(2024, 11, 25);
      const holyday_3 = new Date(2024, 11, 31);
      expect(await isHoliday(holyday_1)).toEqual(true);
      expect(await isHoliday(holyday_2)).toEqual(true);
      expect(await isHoliday(holyday_3)).toEqual(true);
    })

    it("should return false if a date is a not holiday", async () => {
      const date1 = new Date(2004, 2, 4);
      const date2 = new Date(2004, 2, 5);
      expect(await isHoliday(date1)).toEqual(false);
      expect(await isHoliday(date2)).toEqual(false)
    })

  })
});


