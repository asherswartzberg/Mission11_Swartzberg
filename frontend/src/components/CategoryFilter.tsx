import { useEffect, useState } from 'react';
import { fetchCategories } from '../api/BooksAPI';

function CategoryFilter({
  selectedCategories,
  setSelectedCategories,
}: {
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
}) {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories', error);
      }
    };
    loadCategories();
  }, []);

  function handleCheckboxChange({ target }: { target: HTMLInputElement }) {
    const updatedCategories = selectedCategories.includes(target.value)
      ? selectedCategories.filter((x) => x !== target.value)
      : [...selectedCategories, target.value];
    setSelectedCategories(updatedCategories);
  }

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-header bg-dark text-white">
        <h6 className="mb-0 fw-bold">📂 Categories</h6>
      </div>
      <div className="card-body p-2">
        {categories.map((c) => (
          <div className="form-check" key={c}>
            <input
              className="form-check-input"
              type="checkbox"
              id={c}
              value={c}
              onChange={handleCheckboxChange}
            />
            <label className="form-check-label" htmlFor={c}>
              {c}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryFilter;