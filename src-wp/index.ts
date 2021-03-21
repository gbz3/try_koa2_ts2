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
const videoArea = referenceTo<HTMLDivElement>('video-area')
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
    const video = `<video id="${id}-v" class="embed-responsive-item" autoplay muted playsinline></video>`
    const embed = `<div class="embed-responsive embed-responsive-16by9">${video}</div>`
    const close = `<button id="${id}-x" type="button" class="close"><span>&times;</span></button>`
    videoArea.insertAdjacentHTML('beforeend', `<div id="${id}" class="col-3">${close}${embed}</div>`)
    const element = referenceTo<HTMLDivElement>(id)
    const v = referenceTo<HTMLVideoElement>(`${id}-v`)
    const mStream = await navigator.mediaDevices.getDisplayMedia({ video: true })
    if (v) v.srcObject = mStream
    const x = referenceTo<HTMLButtonElement>(`${id}-x`)
    if (x) x.onclick = () => {
      mStream.getTracks().forEach(track => track.stop())
      element.remove()
      console.log(`clicked.`)
    }
  }

})()
