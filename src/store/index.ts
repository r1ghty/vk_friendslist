import { atom } from '@mntm/precoil'
import { UserInfo } from '@vkontakte/vk-bridge'
import { Friend } from '../types'

export const vkUserAtom = atom<UserInfo>({} as UserInfo, 'vkUser')
export const vkUserTokenAtom = atom<string>('', 'vkUserToken')
export const friendsListAtom = atom<Array<Friend>>([] as Array<Friend>, 'friendsList')
export const selectedFriend = atom<Friend>({} as Friend, 'selectedFriend')
