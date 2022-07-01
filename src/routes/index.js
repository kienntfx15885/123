

import Add from "~/components/store/pages/Add";
import Delete from "~/components/store/pages/Patch";
import Depart from "~/components/store/pages/Depart";
import Home from "~/components/store/pages/Home";
import Salary from "~/components/store/pages/Salary";


const publicRoutes = [
    {path: '/', component: Home},
    {path: '/departments', component: Depart},
    {path: '/salary', component: Salary},
    {path: '/add', component: Add},
    {path: '/delete', component: Delete}
];

export { publicRoutes };
