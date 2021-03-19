import { hello } from './modules/sub'
import Peer from 'skyway-js'
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
const v01 = referenceTo<HTMLVideoElement>('v01')
const v02 = referenceTo<HTMLVideoElement>('v02')

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

  // 映像表示
  v01.srcObject = await navigator.mediaDevices.getDisplayMedia({ video: true })
  v02.srcObject = await navigator.mediaDevices.getDisplayMedia({ video: true })

})()
