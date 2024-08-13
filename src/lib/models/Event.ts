import  { HydratedDocument, Schema, model, models } from  "mongoose";
import { ObjectId } from "mongodb";
import { IEventConfig } from "./EventConfig";
import { IUser } from "./User";

export interface IEvent {
  type: ObjectId | IEventConfig;
  user: ObjectId | IUser;
  values: Record<string, string | number | boolean>;
  createdAt: Date;
}

export interface IEventHydrated extends HydratedDocument<IEvent> {
  type: IEventConfig;
  user: ObjectId;
}

const eventSchema = new Schema<IEvent>({
  type: { type: Schema.Types.ObjectId, ref: 'EventConfig', required: true },
  values: { type: Schema.Types.Mixed, required: true },
  createdAt: { type: Date, default: Date.now },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});


// To avoid double lod the model we need to check first if it exists
export const Event = models.Event || model<IEvent>('Event', eventSchema);
