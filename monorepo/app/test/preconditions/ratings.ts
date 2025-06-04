import canRateYogurtExample from "@/contract/dependencies/service-rating_examples/can-rate-yogurt.json" assert { type: "json" };
import hasRatingsYogurtExample from "@/contract/dependencies/service-rating_examples/has-ratings-yogurt.json" assert { type: "json" };
import type { Driver, StupEndpointExamplePartial } from "@/test/utils";

export const canRateYogurt = ({ driver }: { driver: Driver }) =>
  driver.stubEndpoint(canRateYogurtExample as StupEndpointExamplePartial);

export const hasRatingsYogurt = ({ driver }: { driver: Driver }) =>
  driver.stubEndpoint(hasRatingsYogurtExample as StupEndpointExamplePartial);
