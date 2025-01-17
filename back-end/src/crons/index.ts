import CollectionsJob from "./CollectionsJob";

export default {
  start: () => {
    CollectionsJob.getInstance("*/30 * * * * *").process();
  },
};
