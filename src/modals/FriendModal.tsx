import React from 'react'
import {
  Avatar,
  Button,
  Group,
  Header,
  InfoRow,
  ModalCard,
  ModalCardProps,
  SimpleCell
} from '@vkontakte/vkui'
import { useRouter } from '@happysanta/router'
import { useAtomValue } from '@mntm/precoil'
import { selectedFriend } from '../store'
import { Friend } from '../types'
import moment from 'moment'
import 'moment/dist/locale/ru'

export const FriendModal: React.FC<ModalCardProps> = ({ id }) => {
  const router = useRouter()

  const friend: Friend = useAtomValue(selectedFriend)

  const fullName = friend.first_name + ' ' + friend.last_name
  const url = 'https://vk.com/id' + friend.id

  return (
    <ModalCard
      id={id}
      onClose={() => router.popPage()}
      icon={
        friend.photo_200_orig ?
          <Avatar size={72} src={friend.photo_200_orig} /> : null
      }
      header={fullName}
      subheader={
        <Button
          href={url}
          mode='tertiary'
          target='_blank'
        >Открыть страницу</Button>
      }
      actions={
        <Button size='l' mode='primary' onClick={() => router.popPage()}>
          Закрыть
        </Button>
      }
    >
      <Group
        header={
          <Header mode='secondary'>
            {!friend.yourself ? 'Информация о друге' : 'Информация о себе'}
          </Header>
        }
      >
        <SimpleCell
          key='online'
        >
          <InfoRow header='Онлайн'>
            {friend.online === 1 ? 'В сети' : 'Не в сети'}
          </InfoRow>
        </SimpleCell>
        {friend.city ?
          (
            <SimpleCell
              key='city'
            >
              <InfoRow header='Город'>{friend.city.title}</InfoRow>
            </SimpleCell>
          ) : null
        }
        {friend.bdate ?
          (
            <SimpleCell
              key='bdate'
            >
              <InfoRow header='Дата рождения'>
                {moment(friend.bdate).locale('ru').format('LL')}
              </InfoRow>
            </SimpleCell>
          ) : null
        }
        <SimpleCell
          key='sex'
        >
          <InfoRow header='Пол'>
            {friend.sex === 1 ? 'Женский' : 'Мужской'}
          </InfoRow>
        </SimpleCell>
      </Group>
    </ModalCard>
  )
}