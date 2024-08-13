import { Schema, model, models } from "mongoose";

export interface IEventConfigField {
  name: string,
  type: 'number' | 'string' | 'boolean'
}

export interface IEventConfig {
  name: string;
  fields: IEventConfigField[];
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
}, {
  statics: {}
});

// To avoid double lod the model we need to check first if it exists
export const EventConfig = models.EventConfig || model<IEventConfig>('EventConfig', eventConfigSchema);

