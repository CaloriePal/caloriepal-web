import { FoodItemDto, LogMealRequest, MealCategory } from '@models/nutrition';
import { useState } from 'react';

export const useAddMealForm = (onAdd: (req: LogMealRequest) => Promise<void>) => {
  const [category, setCategory] = useState<MealCategory>('Breakfast');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFood, setSelectedFood] = useState<FoodItemDto | null>(null);
  const [quantity, setQuantity] = useState('');
  const [isManual, setIsManual] = useState(false);
  const [manualFields, setManualFields] = useState({
    name: '',
    cal: '',
    pro: '',
    carb: '',
    fat: '',
  });
  const [submitting, setSubmitting] = useState(false);

  const setManualField = (field: string, value: string) =>
    setManualFields(prev => ({ ...prev, [field]: value }));

  const resetManualFields = () =>
    setManualFields({ name: '', cal: '', pro: '', carb: '', fat: '' });

  const preview =
    selectedFood && Number(quantity) > 0
      ? {
          calories: ((selectedFood.caloriesPer100g * Number(quantity)) / 100).toFixed(0),
          protein: ((selectedFood.proteinPer100g * Number(quantity)) / 100).toFixed(1),
          carbs: ((selectedFood.carbsPer100g * Number(quantity)) / 100).toFixed(1),
          fat: ((selectedFood.fatPer100g * Number(quantity)) / 100).toFixed(1),
        }
      : null;

  const canSubmit =
    !submitting &&
    (selectedFood
      ? Number(quantity) > 0
      : isManual
        ? Object.values(manualFields).every(v => v.trim())
        : false);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (selectedFood) {
        await onAdd({ category, foodItemId: selectedFood.id, quantityGrams: Number(quantity) });
      } else {
        await onAdd({
          category,
          manualName: manualFields.name.trim(),
          manualCalories: Number(manualFields.cal),
          manualProtein: Number(manualFields.pro),
          manualCarbs: Number(manualFields.carb),
          manualFat: Number(manualFields.fat),
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return {
    category,
    setCategory,
    searchTerm,
    setSearchTerm,
    selectedFood,
    setSelectedFood,
    quantity,
    setQuantity,
    isManual,
    setIsManual,
    manualFields,
    setManualField,
    resetManualFields,
    submitting,
    preview,
    canSubmit,
    handleSubmit,
  };
};
