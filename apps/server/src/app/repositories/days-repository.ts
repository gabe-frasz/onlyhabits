export interface Day {
  id: string;
  date: Date;
}

export interface DaysRepository {
  findOne: (date: Date, userId: string) => Promise<Day | null>;
  create: (date: Date, userId: string) => Promise<Day>;
}
