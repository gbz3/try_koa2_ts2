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
const focusArea = referenceTo<HTMLDivElement>('focus-area')
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
    const mStream = await navigator.mediaDevices.getDisplayMedia({ video: true })
    insertVideo(videoArea, mStream)
  }

})()

async function insertVideo(parent: HTMLDivElement, mStream: MediaStream) {
  const isFocused = parent.id === 'focus-area'
  const video = `<video id="${mStream.id}-v" class="embed-responsive-item" autoplay muted playsinline></video>`
  const embed = `<div class="embed-responsive embed-responsive-16by9">${video}</div>`
  const close = `<button id="${mStream.id}-x" type="button" class="close"><span>&times;</span></button>`
  parent.insertAdjacentHTML('beforeend', `<div id="${mStream.id}" class="col${isFocused? '': '-3'}">${close}${embed}</div>`)
  const child = referenceTo<HTMLDivElement>(mStream.id)
  const EVENT_CLOSE_VIDEO = 'closeVideo'
  child.addEventListener(EVENT_CLOSE_VIDEO, async () => {
    console.log('handle closeVideo event.')
    mStream.getTracks().forEach(track => track.stop())
    child.remove()
  })
  const v = referenceTo<HTMLVideoElement>(`${mStream.id}-v`)
  if (v) {
    v.srcObject = mStream
    v.onclick = () => {
      if (!isFocused) {
        console.log(`v clicked.`)
        focusArea.childNodes.forEach(e => e.dispatchEvent(new Event(EVENT_CLOSE_VIDEO, { bubbles: true })))
        insertVideo(focusArea, mStream.clone())
      }
    }
  }
  const x = referenceTo<HTMLButtonElement>(`${mStream.id}-x`)
  if (x) x.onclick = () => x.dispatchEvent(new Event(EVENT_CLOSE_VIDEO, { bubbles: true }))
}
