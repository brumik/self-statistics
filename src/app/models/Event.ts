import  mongoose, { Schema, model } from  "mongoose";

export interface EventConfigurationDocument {
  name: string;
  // notifications: string[];
  fileds: Array<string | number | boolean>;
}

export interface EventDocument {
  type: string;
  values?: Array<string | number | boolean>;
  createdAt: Date;
}


