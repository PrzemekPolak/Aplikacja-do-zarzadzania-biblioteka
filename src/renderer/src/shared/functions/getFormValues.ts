export const getFormValues = async (request: any, additionalData?: any) => {
  let formData = {};
  if (request) formData = Object.fromEntries(await request.formData());
  if (additionalData)
    Object.keys(additionalData).forEach((key) => {
      formData[key] = additionalData[key];
    });
  return formData;
};
