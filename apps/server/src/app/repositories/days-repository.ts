interface Day {
  id: string;
  date: Date;
}

export interface DaysRepository {
  findOne: (date: Date) => Promise<Day | null>;
  create: (date: Date) => Promise<Day>;
}
