import { create } from 'zustand'

interface VideoStore {
  clickedVideoId: string | null
  setClickedVideoId: (id: string) => void
}

export const useVideoStore = create<VideoStore>()((set) => ({
  clickedVideoId: null,
  setClickedVideoId: (id: string) => {
    console.log('Video clicked:', id)
    set({ clickedVideoId: id })
  },
}))

