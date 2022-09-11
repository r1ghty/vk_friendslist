import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './App'
import './bridge'
import { Page, Router, RouterContext } from '@happysanta/router'
import { AdaptivityProvider, ConfigProvider } from '@vkontakte/vkui'

export const PAGE_MAIN = '/'
export const PANEL_MAIN = 'panel_main'
export const VIEW_MAIN = 'view_main'

const routes = {
  [PAGE_MAIN]: new Page(PANEL_MAIN, VIEW_MAIN)
}

const router = new Router(routes)

router.start()

ReactDOM.render(
  <RouterContext.Provider value={router}>
    <ConfigProvider isWebView={true}>
      <AdaptivityProvider>
        <App />
      </AdaptivityProvider>
    </ConfigProvider>
  </RouterContext.Provider>,
  document.getElementById('root')
)

if (process.env.NODE_ENV === 'development') import('./eruda')
