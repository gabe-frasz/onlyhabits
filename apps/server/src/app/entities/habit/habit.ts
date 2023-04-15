import { randomUUID } from "node:crypto";

import type { Replace } from "@/utils";
import { WeekDays } from "./week-days";

export interface HabitProps {
  userId: string;
  title: string;
  weekDays: WeekDays;
  createdAt: Date;
}

export class Habit {
  private _id: string;
  private props: HabitProps;

  private validateTitle(title: string) {
    if (title.trim() === "")
      throw new Error("Habit title should not be an empty string");
  }

  constructor(props: Replace<HabitProps, { createdAt?: Date }>, id?: string) {
    this._id = id ?? randomUUID();

    this.validateTitle(props.title);

    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
    };
  }

  public get id() {
    return this._id;
  }

  public get userId() {
    return this.props.userId;
  }

  public get title() {
    return this.props.title;
  }

  public set title(title: string) {
    this.validateTitle(title);

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
