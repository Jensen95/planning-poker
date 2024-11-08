import { useState } from 'react'

import './ShakeButton.scss'

type PermissionRequestFn = () => Promise<PermissionState>
type DME = typeof DeviceMotionEvent & { requestPermission: PermissionRequestFn }

const checkPermission = async () => {
  try {
    if (typeof (DeviceMotionEvent as DME).requestPermission === 'function') {
      const permissionState = await (DeviceMotionEvent as DME).requestPermission()
      return permissionState === 'granted'
    }
    return true
  } catch {
    return false
  }
}

export const ShakeButton = () => {
  const [permissionGranted, setPermissionGranted] = useState(false)
  const onClick = async () => {
    const granted = await checkPermission()
    setPermissionGranted(granted)
  }
  if (
    !('DeviceMotionEvent' in window) ||
    typeof (DeviceMotionEvent as DME).requestPermission !== 'function'
  ) {
    return null
  }

  if (permissionGranted) {
    return null
  }

  return (
    <button className="shake-button" onClick={onClick}>
      Shake it off?
    </button>
  )
}
