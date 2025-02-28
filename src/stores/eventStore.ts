import { axios } from '@/plugins'
import type { Event } from '@/types'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useEventStore = defineStore('event', () => {
  const events = ref<Event[]>([])

  const fetch = () => {
    return new Promise((resolve, reject) => {
      axios
        .get('events')
        .then(({ data }) => {
          events.value = data.data.items
          resolve(true)
        })
        .catch(() => reject())
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

  const remove = (id: number) => {
    return new Promise((resolve, reject) => {
      axios.delete(`events/${id}`).then(
        () => resolve(true),
        () => reject()
      )
    })
  }

  const join = (id: number) => {
    return new Promise((resolve, reject) => {
      axios.post(`events/${id}/join`).then(
        () => resolve(true),
        () => reject()
      )
    })
  }

  return {
    events,
    fetch,
    create,
    update,
    remove,
    join
  }
})
