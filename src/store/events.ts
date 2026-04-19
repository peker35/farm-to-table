import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Event {
  id: string
  title: string
  titleEn: string
  titleIt: string
  description: string
  descriptionEn: string
  descriptionIt: string
  date: string
  time: string
  location: string
  price: number | null
  image: string
}

interface EventsStore {
  events: Event[]
  addEvent: (event: Omit<Event, 'id'>) => void
  updateEvent: (id: string, event: Partial<Event>) => void
  deleteEvent: (id: string) => void
  getEvents: () => Event[]
}

const initialEvents: Event[] = [
  {
    id: '1',
    title: 'Çiftlik Turu',
    titleEn: 'Farm Tour',
    titleIt: 'Tour della Fattoria',
    description: 'Çiftliğimizi ziyaret edin ve üretim sürecini görün.',
    descriptionEn: 'Visit our farm and see the production process.',
    descriptionIt: 'Visitate la nostra fattoria e vedete il processo.',
    date: '2026-04-25',
    time: '10:00',
    location: 'Hilltop Farm',
    price: 25,
    image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=400'
  },
  {
    id: '2',
    title: 'Ekmek Yapım Atölyesi',
    titleEn: 'Bread Making Workshop',
    titleIt: 'Corso di Panificazione',
    description: 'Uzman fırıncılarımızla ekmek yapmayı öğrenin.',
    descriptionEn: 'Learn to make bread with our expert bakers.',
    descriptionIt: 'Imparate a fare il pane con i nostri panettieri.',
    date: '2026-05-02',
    time: '14:00',
    location: 'She Wolf Bakery',
    price: 45,
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400'
  },
  {
    id: '3',
    title: 'Organik Pazartesi',
    titleEn: 'Organic Monday',
    titleIt: 'Lunedì Biologico',
    description: 'Her Pazartesi organik ürünlerde %20 indirim!',
    descriptionEn: '20% off on organic products every Monday!',
    descriptionIt: '20% di sconto sui prodotti biologici ogni lunedì!',
    date: '2026-05-05',
    time: '09:00',
    location: 'All Stores',
    price: null,
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400'
  },
  {
    id: '4',
    title: 'Yemek Pişirme Kursu',
    titleEn: 'Cooking Class',
    titleIt: 'Corso di Cucina',
    description: 'Yerel malzemelerle lezzetli yemekler pişirin.',
    descriptionEn: 'Cook delicious meals with local ingredients.',
    descriptionIt: 'Cucinate pasti deliziosi con ingredienti locali.',
    date: '2026-05-10',
    time: '18:00',
    location: 'Farm Kitchen',
    price: 65,
    image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=400'
  },
  {
    id: '5',
    title: 'Yerel Üretici Pazarı',
    titleEn: 'Local Producers Market',
    titleIt: 'Mercato dei Produttori Locali',
    description: 'Yerel üreticilerle tanışın ve ürünlerini keşfedin.',
    descriptionEn: 'Meet local producers and discover their products.',
    descriptionIt: 'Incontrare i produttori locali e scoprire i loro prodotti.',
    date: '2026-05-15',
    time: '10:00',
    location: 'Brooklyn Venue',
    price: null,
    image: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=400'
  },
]

export const useEventsStore = create<EventsStore>()(
  persist(
    (set, get) => ({
      events: initialEvents,

      addEvent: (event) => {
        const newEvent: Event = {
          ...event,
          id: Date.now().toString()
        }
        set({ events: [...get().events, newEvent] })
      },

      updateEvent: (id, updatedEvent) => {
        set({
          events: get().events.map(e => 
            e.id === id ? { ...e, ...updatedEvent } : e
          )
        })
      },

      deleteEvent: (id) => {
        set({ events: get().events.filter(e => e.id !== id) })
      },

      getEvents: () => get().events,
    }),
    {
      name: 'farm-events',
    }
  )
)