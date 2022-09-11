import React, { useEffect } from 'react'
import {
  AppRoot,
  PanelHeader,
  SplitCol,
  SplitLayout,
  useAdaptivity,
  View,
  ViewWidth
} from '@vkontakte/vkui'
import '@vkontakte/vkui/dist/vkui.css'
import { Home } from './pages'
import { useSetAtomState } from '@mntm/precoil'
import { friendsListAtom, vkUserAtom, vkUserTokenAtom } from './store'
import bridge, { UserInfo } from '@vkontakte/vk-bridge'
import { Friend } from './types'
import { Location, Router, useLocation, useRouter } from '@happysanta/router'
import { PANEL_MAIN, VIEW_MAIN } from './index'
import { Modals } from './modals'

export const App: React.FC = () => {
  const location: Location = useLocation()
  const router: Router = useRouter()

  const activePanel: string = location.getViewActivePanel(VIEW_MAIN) ?? ''

  const { viewWidth } = useAdaptivity()

  const setVkUser = useSetAtomState(vkUserAtom)
  const setFriendsList = useSetAtomState(friendsListAtom)
  const setVkUserToken = useSetAtomState(vkUserTokenAtom)

  useEffect(() => {
    const load = async () => {
      const vkUser: UserInfo = await bridge.send('VKWebAppGetUserInfo')
      setVkUser(vkUser)

      const token: string = (await bridge.send('VKWebAppGetAuthToken', {
        'app_id': 51410520,
        'scope': 'friends'
      })).access_token
      setVkUserToken(token)

      const friendsList: Array<Friend> = (await bridge.send(
        'VKWebAppCallAPIMethod',
        {
          'method': 'friends.get',
          'request_id': 'main_request',
          'params':
            {
              'order': 'hints',
              'v':'5.131',
              'access_token':`${token}`,
              'fields': 'photo_200_orig,bdate,city,online,sex,nickname'
            }
        })).response.items
      setFriendsList(friendsList)
    }

    load().then()
  }, [])

  return (
    <AppRoot>
      <SplitLayout
        header={<PanelHeader separator={false} />}
        modal={Modals()}
      >
        <SplitCol spaced={viewWidth && viewWidth > ViewWidth.MOBILE}>
          <View
            id={VIEW_MAIN}
            onSwipeBack={() => router.popPage()}
            activePanel={activePanel}
          >
            <Home id={PANEL_MAIN} />
          </View>
        </SplitCol>
      </SplitLayout>
    </AppRoot>
  )
}
