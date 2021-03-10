export const schemaValidator = async (schema, data) => {
  try {
    const isSchemaValid = await schema.isValid({
      ...data,
    });
    return isSchemaValid;
  } catch (error) {
    return error;
  }
};
