import DirectionView from "../modules/direction/components/DirectionView";
import MainView from "../modules/main/components/MainView";

// router cfg will go here
export const ROUTER_CONFIG = [
    {
    component: MainView,
    path: '/main'
    },
    {
    component: DirectionView,
    path: '/direction'
    }
]
