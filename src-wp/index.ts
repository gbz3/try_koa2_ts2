import { hello } from './modules/sub'
import Peer from 'skyway-js'
import { v4 } from 'uuid'
import 'bootstrap'
import './index.scss'

hello()

const referenceTo = <T extends HTMLElement>(id: string) => {
  const idRef = document.getElementById(id)
  if (idRef == null) throw new Error(`${id} not found.`)
  return idRef as T
}

const myId = referenceTo<HTMLInputElement>('my-id')
const peerId = referenceTo<HTMLInputElement>('peer-id')
const videoArea = referenceTo<HTMLVideoElement>('video-area')
const appendDisplay = referenceTo<HTMLVideoElement>('append-display')

// see: https://github.com/microsoft/TypeScript/issues/33232
declare global {
  interface MediaDevices {
    getDisplayMedia(constraints?: MediaStreamConstraints): Promise<MediaStream>
  }
}

// 初期化
;(async () => {
  // Skyway 接続
  const skywayKeyRes = await fetch('skyway-key')
  const peer = new Peer({ key: await skywayKeyRes.text(), debug: 3 })
  // Skyway 接続成功
  peer.on('open', () => myId.value = peer.id)

  // 指定したメディアを video タグで表示
  appendDisplay.onclick = async () => {
    const id = v4()
    videoArea.insertAdjacentHTML('beforeend', `<video id="${id}" width="300px" autoplay muted playsinline></video>`)
    referenceTo<HTMLVideoElement>(id).srcObject = await navigator.mediaDevices.getDisplayMedia({ video: true })
  }

})()
