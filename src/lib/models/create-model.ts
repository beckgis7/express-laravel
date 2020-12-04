import {
  SchemaDefinition,
  SchemaOptions,
  Schema,
  model,
  Document,
} from 'mongoose'

type CreateModelOptions = {
  name: string
  schema: SchemaDefinition
  options?: SchemaOptions
  hooks?: (schema: Schema) => void
}

export function createModel<T>(opts: CreateModelOptions) {
  let schema = new Schema(opts.schema, opts.options)
  opts.hooks && opts.hooks(schema)
  schema.plugin(require('mongoose-autopopulate'))
  schema.plugin(require('mongoose-hidden'))
  return model<T & Document>(opts.name, schema)
}

export function hasMany(ref: string, autopopulate: boolean = false) {
  return [
    {
      type: Schema.Types.ObjectId,
      ref: ref,
      autopopulate,
    },
  ]
}

export function hasOne(ref: string, autopopulate: boolean = false) {
  return {
    type: Schema.Types.ObjectId,
    ref: ref,
    autopopulate,
  }
}
