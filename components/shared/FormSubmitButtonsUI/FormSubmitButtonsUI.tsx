import { Button } from '@/components/ui'
import { Loader2 } from 'lucide-react'
import { FormSubmitButtonsUIProps } from './type'

const FormSubmitButtonsUI = (props: FormSubmitButtonsUIProps) => {
    const { isValid, isDirty, isLoading } = props

    const publish = 'Опубликовать'
    const publication = 'Публикация...'
    const saveToDraft = 'Сохранить в черновик'

    return (
        <div className="relative mx-auto w-full max-w-[545px]">
            <div className="flex flex-col gap-y-2 lg:sticky lg:top-14">
                <Button type="submit" variant="default" disabled={!isValid || !isDirty || isLoading} size="sm">
                    {isLoading ? (
                        <>
                            <Loader2 size={18} className="animate-spin" />
                            <span>{publication}</span>
                        </>
                    ) : (
                        <>{publish}</>
                    )}
                </Button>
                <Button type="submit" variant="outline" size="sm">
                    {saveToDraft}
                </Button>
            </div>
        </div>
    )
}

export default FormSubmitButtonsUI
