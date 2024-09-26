import { Suspense } from 'react';
import { Metadata } from 'next';

// Constants
import { ROUTER } from '@/constants/router';

// Types
import { SearchParams } from '@/types/search-params';

// Components
import { CategoryList, CategoryListSkeleton } from '@/ui/category';

// Custom query params for demo error handling
type CustomSearchParams = SearchParams & {
  showError?: string;
};

type CategoryListPageProps = {
  searchParams?: CustomSearchParams;
};

export const metadata: Metadata = {
  title: 'Category Listing',
};

const CategoryListPage = ({ searchParams }: CategoryListPageProps) => {
  const showError = searchParams?.showError || '';
  const demoError = showError === 'true';

  return (
    <main className="">
      <h1 className="text-lg text-center uppercase font-semibold">
        List Category
      </h1>

      <div className="px-6">
        <Suspense key={ROUTER.CATEGORY} fallback={<CategoryListSkeleton />}>
          <CategoryList showError={demoError} />
        </Suspense>
      </div>
    </main>
  );
};

export default CategoryListPage;
