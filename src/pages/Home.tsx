import React from 'react'
import {
  Avatar,
  Group, Header,
  Panel,
  PanelHeader,
  PanelProps,
  SimpleCell, Title
} from '@vkontakte/vkui'
import { UserInfo } from '@vkontakte/vk-bridge'
import { useAtomValue, useSetAtomState } from '@mntm/precoil'
import { friendsListAtom, vkUserAtom, selectedFriend } from '../store'
import { Friend } from '../types'
import { useRouter } from '@happysanta/router'
import { MODAL_FRIEND } from '../modals'

export const Home: React.FC<PanelProps> = () => {
  const setSelectedFriend = useSetAtomState(selectedFriend)
  const vkUser: UserInfo = useAtomValue(vkUserAtom)
  const friendsList: Array<Friend>  = useAtomValue(friendsListAtom)
  const router = useRouter()

  return (
    <Panel>
      <PanelHeader>Список друзей</PanelHeader>
      <Group>
        <Header mode='secondary'>Твой аккаунт</Header>
        <SimpleCell
          before={
            <Avatar size={72} src={vkUser.photo_200} />
          }
          onClick={() => {
            const meMyselfAndI: Friend = {
              ...vkUser,
              yourself: true,
              photo_200_orig: vkUser.photo_200
            } as unknown as Friend

            setSelectedFriend(meMyselfAndI)

            router.pushModal(MODAL_FRIEND)
          }}
        >
          {vkUser.first_name} {vkUser.last_name}
        </SimpleCell>
      </Group>
      <Group>
        <Header mode='secondary'>Твои друзья</Header>
        {
          friendsList ? friendsList.map((friend, index) => (
            <SimpleCell
              key={index}
              before={
                <Avatar size={56} src={friend.photo_200_orig} />
              }
              onClick={() => {
                setSelectedFriend(friend)
                router.pushModal(MODAL_FRIEND)
              }}
              description={friend.online === 1 ? 'В сети' : 'Не в сети'}
            >
              {friend.first_name} {friend.last_name}
            </SimpleCell>
          )) : (
            <div style={{ padding: 20 }}>
              <Title level='3' weight='bold' >У тебя нет друзей :(</Title>
            </div>
          )
        }
      </Group>
    </Panel>
  )
}
