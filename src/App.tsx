import {
    GitHubBanner,
    Refine,
    AuthBindings,
    Authenticated,
} from "@refinedev/core";
import {
    notificationProvider,
    ThemedLayoutV2,
    ErrorComponent,
    AuthPage,
    RefineThemes,
} from "@refinedev/antd";
import { dataProvider, liveProvider } from "@refinedev/supabase";
import routerProvider, {
    CatchAllNavigate,
    NavigateToResource,
    UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { ConfigProvider, notification } from "antd";
import { GoogleOutlined } from "@ant-design/icons";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import "@refinedev/antd/dist/reset.css";

import { PostList, PostCreate, PostEdit, PostShow } from "pages/posts";
import { supabaseClient } from "utility";
import {ClientList} from "./pages/clientes/list";
import {ClientCreate} from "./pages/clientes/create";
import {authProvider} from "./utility/Auth";
import {VisitList} from "./pages/visitas/list";
import {VisitCreate} from "./pages/visitas/create";
import {VisitShow} from "./pages/visitas/show";
import {TareasList} from "./pages/tareas/list";



const App: React.FC = () => {
    return (
        <BrowserRouter>
            <ConfigProvider theme={RefineThemes.Blue}>
                <Refine
                    dataProvider={dataProvider(supabaseClient)}
                    liveProvider={liveProvider(supabaseClient)}
                    routerProvider={routerProvider}
                    authProvider={authProvider}
                    resources={[
                        {
                            name: "clientes",
                            list: "/clientes",
                            create: "/clientes/create",
                            // edit: "/posts/edit/:id",
                            // show: "/posts/show/:id",
                        },
                        {
                            name: "visitas",
                            list: "/visitas",
                            create: "/visitas/create",
                            // edit: "/posts/edit/:id",
                            show: "/visitas/show/:id",
                        },
                        // {
                        //     name: "tareas",
                        //     list: "/tareas",
                        // },
                        // {
                        //     name: "posts",
                        //     list: "/posts",
                        //     create: "/posts/create",
                        //     edit: "/posts/edit/:id",
                        //     show: "/posts/show/:id",
                        // },
                    ]}
                    notificationProvider={notificationProvider}
                    /**
                     * Multiple subscriptions are currently not supported with the supabase JS client v2 and @refinedev/supabase v4.
                     * Therefore, enabling global live mode will cause unexpected behaviors.
                     * Please set `liveMode: "auto"` or `liveMode: "manual"` manually while using real-time features of refine.
                     */
                    options={{
                        liveMode: "off",
                        syncWithLocation: true,
                        warnWhenUnsavedChanges: true,
                    }}
                >
                    <Routes>
                        <Route
                            element={
                                <Authenticated
                                    fallback={<CatchAllNavigate to="/login" />}
                                >
                                    <ThemedLayoutV2>
                                        <Outlet />
                                    </ThemedLayoutV2>
                                </Authenticated>
                            }
                        >
                            <Route
                                index
                                element={
                                    <NavigateToResource resource="visitas" />
                                }
                            />
                            <Route path="/visitas">
                                <Route index element={<VisitList />} />
                                {/*<Route path="create" element={<VisitCreate />} />*/}
                                <Route path="show/:id" element={<VisitShow />} />
                            </Route>
                            <Route path="/clientes">
                                <Route index element={<ClientList />} />
                                <Route path="create" element={<ClientCreate />} />
                            </Route>
                            <Route path="/tareas/:visita">
                                <Route index element={<TareasList />} />
                                {/*<Route path="create" element={<ClientCreate />} />*/}
                            </Route>
                        </Route>

                        <Route
                            element={
                                <Authenticated fallback={<Outlet />}>
                                    <NavigateToResource resource="visitas" />
                                </Authenticated>
                            }
                        >
                            <Route
                                path="/login"
                                element={
                                    <AuthPage
                                        type="login"
                                        providers={[
                                            {
                                                name: "google",
                                                label: "Sign in with Google",
                                                icon: (
                                                    <GoogleOutlined
                                                        style={{
                                                            fontSize: 18,
                                                            lineHeight: 0,
                                                        }}
                                                    />
                                                ),
                                            },
                                        ]}
                                        formProps={{
                                            initialValues: {
                                                email: "info@refine.dev",
                                                password: "refine-supabase",
                                            },
                                        }}
                                    />
                                }
                            />
                            <Route
                                path="/register"
                                element={<AuthPage type="register" />}
                            />
                            <Route
                                path="/forgot-password"
                                element={<AuthPage type="forgotPassword" />}
                            />
                            <Route
                                path="/update-password"
                                element={<AuthPage type="updatePassword" />}
                            />
                        </Route>

                        <Route
                            element={
                                <Authenticated>
                                    <ThemedLayoutV2>
                                        <Outlet />
                                    </ThemedLayoutV2>
                                </Authenticated>
                            }
                        >
                            <Route path="*" element={<ErrorComponent />} />
                        </Route>
                    </Routes>
                    <UnsavedChangesNotifier />
                </Refine>
            </ConfigProvider>
        </BrowserRouter>
    );
};

export default App;
