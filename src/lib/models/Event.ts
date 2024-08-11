import  { Schema, model, models } from  "mongoose";

export interface IEvent {
  type: string;
  values: Array<string | number | boolean>;
  createdAt: Date;
}

const eventSchema = new Schema<IEvent>({
  type: { type: String, required: true },
  values: { type: [Schema.Types.Mixed], required: true },
  createdAt: { type: Date, default: Date.now },
});


// To avoid double lod the model we need to check first if it exists
export const Event = models.Event || model<IEvent>('Event', eventSchema);
