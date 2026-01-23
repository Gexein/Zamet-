import { useNavigationState } from "@react-navigation/native";

function getActiveRoute(state: any): any {
	if (!state || !state.routes || state.index === undefined) return null;
	
	const route = state.routes[state.index];
	if (!route) return null;
	
	//тут чекаем, что у маршрута нет вложенной навигации, если есть - вызываем функцию рекурсивно до конца
	if (route.state) {
		return getActiveRoute(route.state);
	}
	return route;
}

export default function useGetActiveRoute() {
	const navigationState = useNavigationState((state) => state);
	const activeRoute = getActiveRoute(navigationState);

	return {
		activeRoute,
		getActiveRoute,
		getRouteParams: () => activeRoute?.params,
		getRouteName: () => activeRoute?.name,
	};
}
