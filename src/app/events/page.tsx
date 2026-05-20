'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useLanguageStore } from '@/store/language'
import { api } from '@/lib/api'

const MONTHS_TR = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık']
const MONTHS_IT = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre']
const MONTHS_EN = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const DAYS_TR = ['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt']
const DAYS_IT = ['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab']
const DAYS_EN = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export default function EventsPage() {
  const [events, setEvents] = useState<any[]>([])
  const { language } = useLanguageStore()
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [currentDate, setCurrentDate] = useState(new Date())

  useEffect(() => {
    api.events.list().then(data => {
      setEvents(data.map((e: any) => ({ ...e, price: e.price ? parseFloat(e.price) : null })))
    })
  }, [])

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
    for (let i = 0; i < startDay; i++) daysArray.push(null)
    for (let i = 1; i <= daysInMonth; i++) daysArray.push(i)
    return daysArray
  }

  const getEventForDay = (day: number) => {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    return events.find((e: any) => e.date === dateStr)
  }

  const getTitle = (event: any) => {
    if (language === 'tr') return event.titleTr || event.titleEn
    if (language === 'it') return event.titleIt || event.titleEn
    return event.titleEn
  }

  const getDescription = (event: any) => {
    if (language === 'tr') return event.descriptionTr || event.descriptionEn
    if (language === 'it') return event.descriptionIt || event.descriptionEn
    return event.descriptionEn
  }

  const navigateMonth = (direction: number) => {
    setCurrentDate(new Date(currentYear, currentMonth + direction, 1))
  }

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="bg-primary text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">
            {language === 'tr' ? 'Etkinlikler' : language === 'it' ? 'Eventi' : 'Events & Workshops'}
          </h1>
          <p className="text-xl opacity-90">
            {language === 'tr' ? 'Çiftliğimizde ve topluluğumuzda neler oluyor' : language === 'it' ? 'Scopri cosa succede nella nostra fattoria' : 'Discover what is happening at our farm and in our community'}
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Calendar */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <button onClick={() => navigateMonth(-1)} className="p-2 hover:bg-gray-100 rounded-lg">&lt;</button>
                <h2 className="text-xl font-bold">{getMonthName()}</h2>
                <button onClick={() => navigateMonth(1)} className="p-2 hover:bg-gray-100 rounded-lg">&gt;</button>
              </div>

              <div className="grid grid-cols-7 gap-1">
                {days.map((day, i) => (
                  <div key={i} className="text-center text-sm font-medium text-gray-500 py-2">{day}</div>
                ))}
                {getDaysInMonth().map((day, i) => {
                  const event = day ? getEventForDay(day as number) : null
                  return (
                    <div key={i} className={`aspect-square p-1 ${day ? 'cursor-pointer' : ''}`}>
                      <div
                        onClick={() => day && setSelectedDate(selectedDate === `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
                          ? null : `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`)}
                        className={`h-full rounded-lg flex flex-col items-center justify-center text-sm transition-colors ${
                          event ? 'bg-primary text-white hover:bg-primary-dark' : 'hover:bg-gray-100'
                        } ${selectedDate === `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}` ? 'ring-2 ring-primary' : ''}`}
                      >
                        <span className="font-bold">{day}</span>
                        {event && <span className="text-[10px] leading-none mt-0.5 opacity-80">●</span>}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Selected Day Events */}
            {selectedDate && (
              <div className="mt-8 space-y-4">
                {events.filter((e: any) => e.date === selectedDate).length === 0 ? (
                  <p className="text-gray-500 text-center py-8">
                    {language === 'tr' ? 'Bu tarihte etkinlik bulunmamaktadır.' : language === 'it' ? 'Nessun evento in questa data.' : 'No events on this date.'}
                  </p>
                ) : (
                  events.filter((e: any) => e.date === selectedDate).map((event: any) => (
                    <div key={event.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                      <div className="grid md:grid-cols-3 gap-6">
                        <div className="relative h-48 md:h-full">
                          <Image src={event.image} alt={getTitle(event)} fill className="object-cover" />
                        </div>
                        <div className="md:col-span-2 p-6">
                          <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
                            <span>{new Date(event.date).toLocaleDateString()} at {event.time}</span>
                            <span className="text-primary font-medium">{event.location}</span>
                          </div>
                          <h3 className="text-xl font-bold mb-2">{getTitle(event)}</h3>
                          <p className="text-gray-600 mb-4">{getDescription(event)}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-2xl font-bold text-primary">{event.price ? `$${event.price}` : language === 'tr' ? 'Ücretsiz' : language === 'it' ? 'Gratuito' : 'Free'}</span>
                            <button className="btn-primary">{language === 'tr' ? 'Kayıt Ol' : language === 'it' ? 'Registrati' : 'Register'}</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          {/* Event List Sidebar */}
          <div>
            <h3 className="text-xl font-bold mb-4">
              {language === 'tr' ? 'Tüm Etkinlikler' : language === 'it' ? 'Tutti gli Eventi' : 'All Events'}
            </h3>
            <div className="space-y-4">
              {events.map((event: any) => (
                <div key={event.id} className="bg-white rounded-xl shadow-sm p-4 cursor-pointer hover:shadow-md transition-shadow"
                     onClick={() => setSelectedDate(event.date)}>
                  <div className="flex gap-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-lg flex flex-col items-center justify-center flex-shrink-0">
                      <span className="text-xl font-bold text-primary">{new Date(event.date).getDate()}</span>
                      <span className="text-xs text-primary">{months[new Date(event.date).getMonth()].substring(0, 3)}</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-sm">{getTitle(event)}</h4>
                      <p className="text-xs text-gray-500">{event.time} &bull; {event.location}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
