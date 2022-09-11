import React from 'react'
import { FriendModal } from './FriendModal'
import { ModalRoot } from '@vkontakte/vkui'
import { Location, Router, useLocation, useRouter } from '@happysanta/router'

export const MODAL_FRIEND = 'modal_friend'

export const Modals = () => {
  const location: Location = useLocation()
  const router: Router = useRouter()

  return (
    <ModalRoot
      activeModal={location.getModalId()}
      onClose={() => router.popPage()}
    >
      <FriendModal
        id={MODAL_FRIEND}
        onClose={() => router.popPage()}
      />
    </ModalRoot>
  )
}
