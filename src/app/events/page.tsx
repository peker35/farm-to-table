'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { useEventsStore, Event } from '@/store/events'
import { useLanguageStore } from '@/store/language'
import { t } from '@/data/translations'

const MONTHS_TR = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık']
const MONTHS_IT = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre']
const MONTHS_EN = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

const DAYS_TR = ['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt']
const DAYS_IT = ['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab']
const DAYS_EN = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export default function EventsPage() {
  const { events } = useEventsStore()
  const { language } = useLanguageStore()
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [currentDate, setCurrentDate] = useState(new Date())

  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()

  const months = language === 'tr' ? MONTHS_TR : language === 'it' ? MONTHS_IT : MONTHS_EN
  const days = language === 'tr' ? DAYS_TR : language === 'it' ? DAYS_IT : DAYS_EN

  const getMonthName = () => months[currentMonth] + ' ' + currentYear

  const getDaysInMonth = () => {
    const firstDay = new Date(currentYear, currentMonth, 1)
    const lastDay = new Date(currentYear, currentMonth + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startDay = firstDay.getDay()

    const daysArray: (number | null)[] = []
    for (let i = 0; i < startDay; i++) {
      daysArray.push(null)
    }
    for (let i = 1; i <= daysInMonth; i++) {
      daysArray.push(i)
    }
    return daysArray
  }

  const getEventForDay = (day: number) => {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    return events.find(e => e.date === dateStr)
  }

  const getTitle = (event: Event) => {
    if (language === 'tr') return event.title
    if (language === 'it') return event.titleIt
    return event.titleEn
  }

  const getDescription = (event: Event) => {
    if (language === 'tr') return event.description
    if (language === 'it') return event.descriptionIt
    return event.descriptionEn
  }

  const selectedEvent = selectedDate 
    ? events.find(e => e.date === selectedDate) 
    : null

  return (
    <div className="pt-20">
      <section className="bg-primary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">
            {language === 'tr' ? 'Etkinlikler' : language === 'it' ? 'Eventi' : 'Events'}
          </h1>
          <p className="text-xl opacity-90">
            {language === 'tr' ? 'Çiftlik etkinliklerine katılın' : 
             language === 'it' ? 'Partecipa agli eventi della fattoria' : 
             'Join our farm events'}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Calendar */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              {/* Month Navigation */}
              <div className="flex justify-between items-center mb-6">
                <button
                  onClick={() => setCurrentDate(new Date(currentYear, currentMonth - 1, 1))}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <h2 className="text-xl font-bold">{getMonthName()}</h2>
                <button
                  onClick={() => setCurrentDate(new Date(currentYear, currentMonth + 1, 1))}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              {/* Days Header */}
              <div className="grid grid-cols-7 gap-2 mb-4">
                {days.map((day) => (
                  <div key={day} className="text-center font-medium text-gray-500 py-2">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-2">
                {getDaysInMonth().map((day, index) => {
                  const event = day ? getEventForDay(day) : null
                  const dateStr = day ? `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}` : null
                  
                  return (
                    <div
                      key={index}
                      onClick={() => event && setSelectedDate(event.date)}
                      className={`
                        aspect-square flex items-center justify-center rounded-lg text-sm cursor-pointer transition-all
                        ${!day ? 'invisible' : ''}
                        ${event ? 'bg-primary/10 hover:bg-primary/20 text-primary font-medium' : 'hover:bg-gray-50'}
                        ${selectedDate === dateStr ? 'bg-primary text-white' : ''}
                      `}
                    >
                      {day}
                      {event && (
                        <div className="absolute w-2 h-2 bg-accent rounded-full -top-1 -right-1" />
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Upcoming Events List */}
            <div className="mt-8">
              <h3 className="text-xl font-bold mb-4">
                {language === 'tr' ? 'Yaklaşan Etkinlikler' : language === 'it' ? 'Eventi imminenti' : 'Upcoming Events'}
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {events
                  .filter(e => new Date(e.date) >= new Date())
                  .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                  .slice(0, 4)
                  .map((event) => (
                    <EventCard key={event.id} event={event} lang={language} />
                  ))}
              </div>
            </div>
          </div>

          {/* Selected Event Details */}
          <div className="lg:col-span-1">
            {selectedEvent ? (
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden sticky top-24">
                <div className="relative h-48">
                  <Image
                    src={selectedEvent.image}
                    alt={getTitle(selectedEvent)}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <span className="bg-white px-4 py-2 rounded-lg font-bold text-lg">
                      {new Date(selectedEvent.date).getDate()}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{getTitle(selectedEvent)}</h3>
                  <p className="text-gray-600 mb-4">{getDescription(selectedEvent)}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>{new Date(selectedEvent.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{selectedEvent.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>{selectedEvent.location}</span>
                    </div>
                  </div>

                  {selectedEvent.price && (
                    <div className="text-2xl font-bold text-primary mb-4">
                      ${selectedEvent.price}
                    </div>
                  )}

                  <button className="w-full btn-primary">
                    {language === 'tr' ? 'Kayıt Ol' : language === 'it' ? 'Prenota' : 'Register'}
                  </button>

                  <button
                    onClick={() => setSelectedDate(null)}
                    className="w-full mt-2 text-sm text-gray-500 hover:text-gray-700"
                  >
                    {language === 'tr' ? 'Kapat' : language === 'it' ? 'Chiudi' : 'Close'}
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 rounded-2xl p-6 text-center">
                <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-gray-500">
                  {language === 'tr' ? 'Bir etkinlik seçin' : 
                   language === 'it' ? 'Seleziona un evento' : 
                   'Select an event'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function EventCard({ event, lang }: { event: Event; lang: 'en' | 'it' | 'tr' }) {
  const getTitle = () => {
    if (lang === 'tr') return event.title
    if (lang === 'it') return event.titleIt
    return event.titleEn
  }

  const getDesc = () => {
    if (lang === 'tr') return event.description
    if (lang === 'it') return event.descriptionIt
    return event.descriptionEn
  }

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden flex">
      <div className="w-20 h-24 relative flex-shrink-0">
        <Image
          src={event.image}
          alt={getTitle()}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <p className="text-sm text-primary font-medium">
          {new Date(event.date).toLocaleDateString()}
        </p>
        <h4 className="font-semibold mb-1">{getTitle()}</h4>
        <p className="text-xs text-gray-500">{event.location}</p>
      </div>
    </div>
  )
}