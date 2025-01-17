import CollectionsJob from "./CollectionsJob";

export default {
  start: () => {
    CollectionsJob.getInstance("*/5 * * * * *").process();
  },
};
