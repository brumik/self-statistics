import  mongoose, { Schema, model } from  "mongoose";

export interface EventConfigurationDocument {
  name: string;
  // notifications: string[];
  fields: { name: string, type: 'number' | 'text' | 'boolean' }[];
}

export interface EventDocument {
  type: string;
  values?: Array<string | number | boolean>;
  createdAt: Date;
}


