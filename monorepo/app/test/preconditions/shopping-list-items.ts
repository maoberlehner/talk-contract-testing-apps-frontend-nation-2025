import canAddItemExample from "@/contract/dependencies/service-shopping-list_examples/can-add-item.json" assert { type: "json" };
import hasItemsExample from "@/contract/dependencies/service-shopping-list_examples/has-items.json" assert { type: "json" };
import canDeleteItemExample from "@/contract/dependencies/service-shopping-list_examples/can-delete-item.json" assert { type: "json" };
import canToggleItemCompletedExample from "@/contract/dependencies/service-shopping-list_examples/can-toggle-item-completed.json" assert { type: "json" };
import type { Driver, StupEndpointExamplePartial } from "@/test/utils";

export const canAddItem = ({ driver }: { driver: Driver }) =>
  driver.stubEndpoint(canAddItemExample as StupEndpointExamplePartial);

export const canToggleItemCompleted = ({ driver }: { driver: Driver }) =>
  driver.stubEndpoint(
    canToggleItemCompletedExample as StupEndpointExamplePartial,
  );

export const canDeleteItem = ({ driver }: { driver: Driver }) =>
  driver.stubEndpoint(canDeleteItemExample as StupEndpointExamplePartial);

export const hasItems = ({ driver }: { driver: Driver }) =>
  driver.stubEndpoint(hasItemsExample as StupEndpointExamplePartial);
