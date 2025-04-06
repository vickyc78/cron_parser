// test/CronParser.test.ts
import CronParser from '../cron_parser';

describe('CronParser', () => {
    test('should expand cron string', () => {
        const parser = new CronParser("*/15 0 1,15 * 1-5 /usr/bin/find");
        const result = parser.parse();
console.log("result",result)
        expect(result).toEqual(expect.stringContaining("Minute         0 15 30 45"));
        expect(result).toEqual(expect.stringContaining("Hour           0"));
        expect(result).toEqual(expect.stringContaining("Day of Month   1 15"));
        expect(result).toEqual(expect.stringContaining("Month          1 2 3 4 5 6 7 8 9 10 11 12"));
        expect(result).toEqual(expect.stringContaining("Day of Week    1 2 3 4 5"));
    });

    test('should throw error for invalid cron string', () => {
        expect(() => {
            new CronParser("invalid cron string").parse();
        }).toThrow(
            "Invalid cron string. It must have 5 time fields followed by a command."
        );
    });
});
