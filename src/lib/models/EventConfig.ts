import { HydratedDocument, ObjectId, Schema, model, models } from "mongoose";
import { IUser } from "./User";

export interface IEventConfigField {
  name: string;
  type: 'number' | 'string' | 'boolean';
}

export interface IEventConfig {
  name: string;
  fields: IEventConfigField[];
  user: ObjectId | IUser;
}

export interface IEventConfigHydrated extends HydratedDocument<IEventConfig> {
  user: ObjectId;
}

const eventConfigSchema = new Schema<IEventConfig>({
  name: { type: String, required: true },
  fields: {
    type: [{
      name: { type: String, required: true },
      type: { type: Schema.Types.Mixed, required: true }
    }],
    required: true
  },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

// To avoid double lod the model we need to check first if it exists
export const EventConfig = models.EventConfig || model<IEventConfig>('EventConfig', eventConfigSchema);

