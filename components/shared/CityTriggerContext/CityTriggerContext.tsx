'use client'

import { createContext, useContext, ReactNode } from 'react'
import useSWRMutation from 'swr/mutation'
import { getCitiesByCountryId } from '@/services/api'

interface CityData {
    id: string
    name: string
    intName: string
}

interface TriggerContextType {
    trigger: (data: { countryId: string; query: string }) => Promise<void>
    isMutating: boolean
    data: { data: CityData[] | [] }
}

interface TriggerProviderProps {
    children: ReactNode
}

// Создаем контекст
const CityTriggerContext = createContext<TriggerContextType | undefined>(undefined)

export const CityTriggerProvider = ({ children }: TriggerProviderProps) => {
    // Getting Cities
    const { trigger, isMutating, data } = useSWRMutation('/api/cities', getCitiesByCountryId)

    return <CityTriggerContext.Provider value={{ trigger, isMutating, data }}>{children}</CityTriggerContext.Provider>
}

// Хук для доступа к trigger
export const useCityTrigger = (): TriggerContextType => {
    const context = useContext(CityTriggerContext)
    if (!context) {
        throw new Error('useTrigger must be used within a TriggerProvider')
    }
    return context
}
