import { FetcherWithComponents } from "react-router-dom";
import { useEffectNoInitial } from "./useEffectNoInitial";
import { useStoreAlerts } from "./useStoreAlerts";

const useAlert = (fetcher: FetcherWithComponents<any>, additionalFunction?: Function) => {
  const { addSuccessAlert, addErrorAlert } = useStoreAlerts();
  useEffectNoInitial(() => {
    if (fetcher.data?.state?.success) addSuccessAlert(fetcher.data?.state?.message);
    if (fetcher.data?.state?.error) addErrorAlert(fetcher.data?.state?.message);
    if (additionalFunction) additionalFunction();
  }, [fetcher.data]);
};

export { useAlert };
