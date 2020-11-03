import DirectionView from "../modules/direction/components/DirectionView";
import MainView from "../modules/main/components/MainView";
import { RenderRoutes } from "./Router";

export const ROUTER_CONFIG = [
    {
        component: MainView,
        path: '/main',
        key: 'MAIN',
        exact: true
    },
    {
        component: RenderRoutes,
        path: '/direction',
        key: 'DIRECTION',
        exact: false,
        routes: [
            {
                component: DirectionView,
                path: '/direction',
                key: 'DIRECTION_ROOT',
                exact: true
            },
            {
                component: DirectionView,
                path: '/direction/covid19',
                key: 'DIRECTION_COVID19',
                exact: true
            }
        ]
    }
]
