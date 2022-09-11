import bridge from '@vkontakte/vk-bridge'

bridge.subscribe(e => {
  if (e.detail.type === 'VKWebAppUpdateConfig') {
    const scheme: string = e.detail.data.scheme || 'client_light'
    document.body.setAttribute('scheme', scheme)
  }
})

bridge.send('VKWebAppInit').then()
