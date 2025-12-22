/*
 * @see: https://github.com/colinhacks/zod/discussions/1953#discussioncomment-5695528
 */
import { z } from "zod";
export const getSchemaDefaults = <T extends z.ZodTypeAny>(
  schema: z.AnyZodObject | z.ZodEffects<any>,
): z.infer<T> => {
  // Check if it's a ZodEffect using _def property instead of instanceof
  if (schema._def?.typeName === "ZodEffects") {
    const innerType = (schema as any).innerType?.();
    // Check if it's a recursive ZodEffect
    if (innerType?._def?.typeName === "ZodEffects") {
      return getSchemaDefaults(innerType);
    }
    // return schema inner shape as a fresh zodObject
    if (innerType?.shape) {
      return getSchemaDefaults(z.ZodObject.create(innerType.shape));
    }
  }

  function getDefaultValue(schema: z.ZodTypeAny): unknown {
    const typeName = schema._def?.typeName;
    
    if (typeName === "ZodDefault") {
      return schema._def.defaultValue();
    }
    // return an empty array if it is
    if (typeName === "ZodArray") {
      return [];
    }
    // return an empty string if it is
    if (typeName === "ZodString") {
      return "";
    }
    // return an content of object recursivly
    if (typeName === "ZodObject") {
      return getSchemaDefaults(schema);
    }

    if (!("innerType" in schema._def)) {
      return undefined;
    }
    return getDefaultValue(schema._def.innerType);
  }

  // Handle case where shape might not exist
  if (!schema.shape) {
    return {} as z.infer<T>;
  }
  
  return Object.fromEntries(
    Object.entries(schema.shape).map(([key, value]) => {
      return [key, getDefaultValue(value as z.ZodTypeAny)];
    }),
  );
};
