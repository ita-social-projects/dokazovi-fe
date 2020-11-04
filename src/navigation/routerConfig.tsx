import MainView from "../modules/main/components/MainView";
import DirectionView from "../modules/direction/components/DirectionView";
import { RenderRoutes } from './Router'


// router cfg will go here
export const ROUTER_CONFIG = [
    { path: "/", key: "ROOT", exact: true, component: MainView },
    {
        path: "/direction",
        key: "DIRECTION",
        exact: false,
        component: RenderRoutes,
        routes: [
            {
                path: "/direction",
                key: "DIRECTION_ROOT",
                exact: true,
                component: DirectionView,
            },
            {
                path: "/direction/covid-19",
                key: "DIRECTION_COVID",
                exact: true,
                component: DirectionView,
            },
        ],
    },
];



