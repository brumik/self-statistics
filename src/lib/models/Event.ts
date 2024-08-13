import  { HydratedDocument, Schema, model, models } from  "mongoose";
import { ObjectId } from "mongodb";
import { IEventConfig } from "./EventConfig";

export interface IEvent {
  type: ObjectId | IEventConfig;
  values: Record<string, string | number | boolean>;
  createdAt: Date;
}

export interface IEventHydrated extends HydratedDocument<IEvent> {
  type: IEventConfig;
}

const eventSchema = new Schema<IEvent>({
  type: { type: Schema.Types.ObjectId, ref: 'EventConfig', required: true },
  values: { type: Schema.Types.Mixed, required: true },
  createdAt: { type: Date, default: Date.now },
});


// To avoid double lod the model we need to check first if it exists
export const Event = models.Event || model<IEvent>('Event', eventSchema);
