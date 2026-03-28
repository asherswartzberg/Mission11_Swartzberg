import { useState } from 'react';
import CategoryFilter from '../components/CategoryFilter';
import BookList from '../components/Booklist';
import WelcomeBand from '../components/WelcomeBand';

function StorePage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  return (
    <div className="bg-light min-vh-100">
      <WelcomeBand />
      <div className="container">
        <div className="row g-4">
          {/* Sidebar */}
          <div className="col-12 col-md-3">
            <div className="sticky-top" style={{ top: '1rem' }}>
              <CategoryFilter
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
              />
            </div>
          </div>
          {/* Book list */}
          <div className="col-12 col-md-9">
            <BookList selectedCategories={selectedCategories} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default StorePage;