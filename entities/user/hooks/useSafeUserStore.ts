import { useSyncExternalStore } from "react";
import { useUserStore } from "../store";
import type { IUserState } from "../types";

export function useSafeUserStore<T>(selector: (state: IUserState) => T): T {
	const store = useUserStore;
	const selectedState = useSyncExternalStore(
		store.subscribe,
		() => selector(store.getState()),
		() => selector(store.getState())
	);
	return selectedState;
}
