import { SelectorField, useCityTrigger } from '@/components/shared'
import { FormEventHandler } from 'react'
import { Props } from './type'

const CityFieldBlock = (props: Props) => {
    const { control, getValues, setValue, clearErrors } = props

    // Getting context
    const { trigger, data, isMutating } = useCityTrigger();

    const onChangeCity: FormEventHandler<HTMLInputElement> = async (event) => {
        const countryId = getValues('country')!.id
        const query = event.currentTarget.value
        console.log(countryId, query)
        await trigger({
            countryId,
            query,
        })
    }

    const config = {
        name: 'city' as const,
        title: 'Город',
        label: 'Выберите город',
        placeholder: 'Поиск города...',
        commandEmpty: 'Город не найден',
        tooltip: 'Откроется после выбора страны',
        disabled: !getValues('country'),
    }

    return (
        <SelectorField
            control={control}
            setValue={setValue}
            clearErrors={clearErrors}
            items={data?.data || []}
            onChangeValue={onChangeCity}
            isLoading={isMutating}
            disabled={config.disabled}
            name={config.name}
            label={config.label}
            title={config.title}
            placeholder={config.placeholder}
            commandEmpty={config.commandEmpty}
            tooltip={config.tooltip}
        />
    )
}

export default CityFieldBlock
