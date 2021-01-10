import CryptoJS from "crypto-js"
import { decodeJWT } from "../configs/helper"

export function auth() {
  let data, token
  token = localStorage.token
  if (token) {
    data = decodeJWT(token)
  }
  return data.user
}

export function isImage(extension) {
  switch (extension) {
    case "png":
    case "jpg":
    case "jpeg":
    case "gif":
    case "svg":
    case "bmp":
      return true
    default:
  }
  return false
}

export function validateEmail(email) {
  const regexp = /[a-zA-z-0-9_]+@[a-zA-Z]+\.(com|net|org)$/
  const result = regexp.test(email)
  if (result == false) {
    return true
  }
  return false
}

export function bytesToSize(bytes) {
  if (bytes == 0) return "0 Byte"
  var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))
  return Math.round(bytes / Math.pow(1024, i), 2)
}

export function arrayBufferToWordArray(ab) {
  let i8a = new Uint8Array(ab)
  let a = []
  for (var i = 0; i < i8a.length; i += 4) {
    a.push((i8a[i] << 24) | (i8a[i + 1] << 16) | (i8a[i + 2] << 8) | i8a[i + 3])
  }
  return CryptoJS.lib.WordArray.create(a, i8a.length)
}
