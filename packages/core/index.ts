import { makeInstaller } from "@cz-element/utils";
import components from './components'
import '@cz-element/theme/index.css'

const installer = makeInstaller(components)

export * from '@cz-element/components'
export default installer