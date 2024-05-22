import type { App, Plugin } from "vue";
import { each } from "lodash-es";

// SFCWithInstall<T> 是一个类型别名，它表示一个组件，并且具有一个 install 方法
type SFCWithInstall<T> = T & Plugin;

// makeInstaller 函数接受一个 components 数组作为参数，并返回一个函数。这个返回的函数可以将 components 数组中的每个组件注册到 Vue 应用中。
export function makeInstaller(components: Plugin[]) {
    const install = (app: App) =>
        each(components, (c) => {
            app.use(c);
        });

    return install as Plugin;
}

// withInstall 函数接受一个组件作为参数，并将其转换为一个可安装的组件。它通过给组件添加一个 install 方法来实现这一点，该方法将组件注册到 Vue 应用中。
export const withInstall = <T>(component: T) => {
    (component as SFCWithInstall<T>).install = (app: App) => {
        const name = (component as any)?.name || "UnnamedComponent";
        app.component(name, component as Plugin);
    };
    return component as SFCWithInstall<T>;
};