import { SelectorField, useCityTrigger } from '@/components/shared'
import { CountryFieldBlockProps } from './type'
import { getAllCountries } from '@/services/api'
import { SelectorOption } from '@/components/shared/PostForm/type'
import useSWR from 'swr'

const CountryFieldBlock = (props: CountryFieldBlockProps) => {
    const { control, getValues, setValue, clearErrors } = props

    // Getting countries
    const {
        data,
        isLoading,
    }: {
        data: { data: SelectorOption[] }
        isLoading: boolean
    } = useSWR('/api/countries', getAllCountries, { fallbackData: { data: [] } })

    const { trigger } = useCityTrigger();

    const onSelectCountry = async () => {
        const countryId = getValues('country')!.id
        const query = ''
        setValue('city', undefined)
        await trigger({
            countryId,
            query,
        })
    }

    const config = {
        name: 'country' as const,
        title: 'Город',
        label: 'Выберите страну',
        placeholder: 'Поиск страны...',
        commandEmpty: 'Страна не найдена',
        tooltip: 'Откроется после выбора страны',
    }

    return (
        <SelectorField
            control={control}
            setValue={setValue}
            clearErrors={clearErrors}
            items={data.data}
            onSelectValue={onSelectCountry}
            isLoading={isLoading}
            name={config.name}
            label={config.label}
            title={config.title}
            placeholder={config.placeholder}
            commandEmpty={config.commandEmpty}
            tooltip={config.tooltip}
        />
    )
}

export default CountryFieldBlock
