import { randomUUID } from "node:crypto";

import type { Replace } from "@/utils";
import { WeekDays } from "./week-days";

export interface HabitProps {
  title: string;
  weekDays: WeekDays;
  createdAt: Date;
}

export class Habit {
  private _id: string;
  private props: HabitProps;

  constructor(props: Replace<HabitProps, { createdAt?: Date }>, id?: string) {
    this._id = id ?? randomUUID();

    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
    };
  }

  public get id() {
    return this._id;
  }

  public get title() {
    return this.props.title;
  }

  public set title(title: string) {
    this.props.title = title;
  }

  public get weekDays() {
    return this.props.weekDays;
  }

  public set weekDays(weekDays: WeekDays) {
    this.props.weekDays = weekDays;
  }

  public get createdAt() {
    return this.props.createdAt;
  }
}
