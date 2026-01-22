import * as React from "react"
import { type Toast, type ToastAction } from "@/components/ui/toast"

type Toast = {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastAction
}

type ToasterToast = Omit<Toast, "id"> & {
  id?: string
}

const TOAST_LIMIT = 3
const TOAST_REMOVE_DELAY = 1000000

type ToasterState = {
  toasts: Toast[]
}

let count = 0

function genId() {
  count = (count + 1) % Number.MAX_VALUE
  return count.toString()
}

const toastState: ToasterState = {
  toasts: [],
}

const listeners: ((state: ToasterState) => void)[] = []

function dispatch(action: any) {
  toastState = reducer(toastState, action)
  listeners.forEach((listener) => {
    listener(toastState)
  })
}

const reducer = (state: ToasterState, action: any) => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      }

    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      }

    case "DISMISS_TOAST": {
      const { toastId } = action
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== toastId),
      }
    }
  }
  return state
}

function toast(props: ToasterToast) {
  const id = genId()

  const update = (props: ToasterToast) => {
    dispatch({ type: "UPDATE_TOAST", toast: { ...props, id } })
  }
  const dismiss = () => {
    dispatch({ type: "DISMISS_TOAST", toastId: id })
  }

  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open: boolean) => {
        if (!open) dismiss()
      },
    },
  })

  return {
    id: id,
    dismiss,
    update,
  }
}

function useToast() {
  const [state, setState] = React.useState<ToasterState>(toastState)

  React.useEffect(() => {
    listeners.push(setState)
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [state])

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => {
      if (toastId) {
        dispatch({ type: "DISMISS_TOAST", toastId })
      } else {
        toastState.toasts.forEach((toast) => {
          dispatch({ type: "DISMISS_TOAST", toastId: toast.id })
        })
      }
    },
  }
}

export { useToast, toast }