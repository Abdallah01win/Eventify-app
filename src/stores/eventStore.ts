import { axios } from '@/plugins'
import type { Event } from '@/types'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import { useAuthStore } from './authStore'

export const useEventStore = defineStore('event', () => {
  const authStore = useAuthStore()

  const events = ref<Event[]>([])

  const fetch = () => {
    return new Promise((resolve, reject) => {
      axios.get('events').then(
        ({ data }) => {
          events.value = data.data.items
          resolve(true)
        },
        () => reject()
      )
    })
  }

  const create = (eventData: Partial<Event>) => {
    return new Promise((resolve, reject) => {
      axios.post('events', eventData).then(
        () => resolve(true),
        () => reject()
      )
    })
  }

  const update = (id: number, eventData: Partial<Event>) => {
    return new Promise((resolve, reject) => {
      axios.put(`events/${id}`, eventData).then(
        () => resolve(true),
        () => reject()
      )
    })
  }

  const destroy = (id: number) => {
    return new Promise((resolve, reject) => {
      axios.delete(`events/${id}`).then(
        () => resolve(true),
        () => reject()
      )
    })
  }

  const join = (id: number) => {
    return new Promise((resolve, reject) => {
      axios.post(`events/join/${id}`).then(
        () => {
          fetch().then(
            () => resolve(true),
            () => reject()
          )
        },
        () => reject()
      )
    })
  }

  const leave = (id: number) => {
    return new Promise((resolve, reject) => {
      axios.post(`events/leave/${id}`).then(
        () => {
          fetch().then(
            () => resolve(true),
            () => reject()
          )
        },
        () => reject()
      )
    })
  }

  const getUserEvents = computed(() =>
    events.value.filter((e) => e.userId === authStore.user?.id || e.participants.length)
  )

  const getExploreEvents = computed(() =>
    events.value.filter((e) => e.userId !== authStore.user?.id && !e.participants.length)
  )

  return {
    events,
    fetch,
    create,
    update,
    destroy,
    join,
    leave,
    getUserEvents,
    getExploreEvents
  }
})
