export class WeekDays {
  private readonly content: number[];

  private validateWeekDays(content: number[]) {
    const isLengthValid = content.length >= 1 && content.length <= 7; // 1-7 days
    const isContentValid = content.every(
      (weekDay) => weekDay >= 0 && weekDay <= 6,
    ); // 0 => sunday && 6 => saturday

    return isLengthValid && isContentValid;
  }

  constructor(content: number[]) {
    const isValid = this.validateWeekDays(content);

    if (!isValid) {
      throw new Error("WeekDays must have 1-7 days with numbers from 0 to 6");
    }

    this.content = content;
  }

  public get value() {
    return this.content;
  }
}
