const parseQueryData = (queryData: any) => {
  const data = { ...queryData };
  Object.keys(data).forEach((el) => {
    if (data[el] === "true") data[el] = true;
    if (data[el] === "false") data[el] = false;
    if (data[el] === "" || data[el] === undefined || data[el] === "null" || data[el] === "undefined") data[el] = null;
    if (typeof data[el] === "string" && /^\d+$/.test(data[el].replace(/ /g, "")))
      data[el] = parseInt(data[el].replace(/ /g, ""));
    if (typeof data[el] === "string") data[el] = data[el].toUpperCase();
  });
  return data;
};

export { parseQueryData };
