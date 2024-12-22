import { createRouter, createWebHistory } from "vue-router";
import Home from "./pages/Home.vue";
import About from "./pages/About.vue";
import Facilities from "./pages/Facilities.vue";
import BuildingDetail from "./pages/BuildingDetail.vue";

const router = createRouter({
    linkActiveClass: 'active-link',
    linkExactActiveClass: 'exact-active-link',
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "Home",
            component: Home,
            children: [
                {
                    path: "buildings/:id", // Nested route
                    name: "BuildingDetail",
                    component: BuildingDetail,
                },
            ]
        },
        {
            path: "/about",
            name: "About",
            component: About
        }
        ,
        {
            path: "/facilities",
            name: "Facilities",
            component: Facilities
        }
        ,

    ]
})

export default router;