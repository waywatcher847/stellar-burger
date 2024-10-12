import {store} from '../index';

export type AppDispatch = typeof store.dispatch;

export declare const useAppDispatch: () => import("@reduxjs/toolkit").ThunkDispatch<{
    mainApi: import("@reduxjs/toolkit/dist/query/core/apiState").CombinedState<{}, "ReduxHistoryItems" | "Companies" | "Projects" | "Posts" | "Users", "mainApi">;
    userState: {
        user: import("./api/types").IUser | null;
        loggedIn: boolean;
    };
    companyState: {
        company: import("./api/types").ICompany | null;
        companyId: string;
        apiKey: string;
    };
    reduxHistoryState: {
        parentReduxState: string;
    };
}, undefined, import("redux").AnyAction> & import("redux").Dispatch<import("redux").AnyAction>;
