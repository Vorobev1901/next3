import { create } from 'zustand';
import { FormType } from '@/components/shared/PostForm/formSchema'

interface StoreState {
    formData: FormType | null;
    setFormData: (data: FormType) => void;
    clearFormData: () => void;
}

const useFormStore = create<StoreState>((set) => ({
    formData: null,
    setFormData: (data) => set({ formData: data }),
    clearFormData: () => set({ formData: null }),
}));

export default useFormStore;